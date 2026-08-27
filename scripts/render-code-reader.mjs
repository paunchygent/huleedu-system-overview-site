import { execFile } from "node:child_process";
import { lstat, mkdir, readFile, realpath, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import hljs from "highlight.js";
import { marked } from "marked";

const runFile = promisify(execFile);
const utf8 = new TextDecoder("utf-8", { fatal: true });
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const codebergRepository = "https://codeberg.org/paunchygent/huleedu-research-code";
const fullRevision = /^[0-9a-f]{40}$/;
const safePathPart = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
const languageByExtension = new Map([
  [".json", "json"],
  [".md", "markdown"],
  [".mjs", "javascript"],
  [".py", "python"],
  [".yml", "yaml"],
  [".yaml", "yaml"],
]);

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const readArguments = (argumentsList) => {
  const values = new Map();
  for (let index = 0; index < argumentsList.length; index += 2) {
    const name = argumentsList[index];
    const value = argumentsList[index + 1];
    if (!["--repo", "--revision", "--output"].includes(name) || !value || values.has(name)) {
      throw new Error("Usage: npm run code:render -- --repo <local-repository> --revision <full-sha> [--output <directory>]");
    }
    values.set(name, value);
  }
  if (!values.has("--repo") || !values.has("--revision")) {
    throw new Error("Usage: npm run code:render -- --repo <local-repository> --revision <full-sha> [--output <directory>]");
  }
  return values;
};

const runGit = async (repository, argumentsList) => {
  const { stdout } = await runFile("git", argumentsList, {
    cwd: repository,
    encoding: "buffer",
    maxBuffer: 2 * 1024 * 1024,
  });
  return stdout;
};

const decodeText = (content, sourcePath) => {
  if (content.includes(0)) {
    throw new Error(`Refusing unsafe NUL content in ${sourcePath}`);
  }
  try {
    return utf8.decode(content);
  } catch {
    throw new Error(`Refusing non-UTF-8 content in ${sourcePath}`);
  }
};

const decodeGitTree = (content) => {
  try {
    return utf8.decode(content);
  } catch {
    throw new Error("Refusing a repository tree with non-UTF-8 paths");
  }
};

const validateRepository = async (repository, revision) => {
  if (!fullRevision.test(revision)) {
    throw new Error("Revision must be a full 40-character lowercase SHA");
  }
  const localRoot = await realpath(repository);
  const gitRoot = decodeText(await runGit(localRoot, ["rev-parse", "--show-toplevel"]), "repository").trim();
  if (localRoot !== await realpath(gitRoot)) {
    throw new Error("Repository input must name the local repository root");
  }
  const head = decodeText(await runGit(localRoot, ["rev-parse", "HEAD"]), "repository").trim();
  if (head !== revision) {
    throw new Error(`Repository HEAD is ${head}; expected ${revision}`);
  }
  const status = decodeText(await runGit(localRoot, ["status", "--porcelain=v1"]), "repository");
  if (status) {
    throw new Error("Repository tree is dirty; commit or remove local changes before rendering");
  }
  return localRoot;
};

const readCommittedFiles = async (repository, revision) => {
  const tree = decodeGitTree(
    await runGit(repository, ["ls-tree", "-r", "-z", "--long", revision]),
  );
  return tree.split("\0").filter(Boolean).map((entry) => {
    const separator = entry.indexOf("\t");
    const [mode, type] = entry.slice(0, separator).split(" ");
    const sourcePath = entry.slice(separator + 1);
    const parts = sourcePath.split("/");
    if (
      separator < 0 ||
      type !== "blob" ||
      !["100644", "100755"].includes(mode) ||
      parts.length === 0 ||
      parts.some((part) => !safePathPart.test(part))
    ) {
      throw new Error(`Refusing unsafe tree entry: ${sourcePath}`);
    }
    return { sourcePath, parts };
  });
};

const sourceUrl = (revision, parts) =>
  `/code/${revision}/source/${parts.map(encodeURIComponent).join("/")}.html`;

const codebergUrl = (revision, parts) =>
  `${codebergRepository}/src/commit/${revision}/${parts.map(encodeURIComponent).join("/")}`;

const readSource = async (repository, revision, sourcePath) => {
  const content = await runGit(repository, ["show", `${revision}:${sourcePath}`]);
  if (content.length > 1024 * 1024) {
    throw new Error(`Refusing ${sourcePath}: source files must be at most 1 MiB`);
  }
  return decodeText(content, sourcePath);
};

const languageFor = (sourcePath) => languageByExtension.get(path.extname(sourcePath)) ?? null;

const splitHighlightedLines = (highlighted) => {
  const lines = [""];
  const openSpans = [];
  const tokens = highlighted.split(/(<span class="[^"]+">|<\/span>|\n)/);
  for (const token of tokens) {
    if (token === "\n") {
      lines[lines.length - 1] += "</span>".repeat(openSpans.length);
      lines.push(openSpans.join(""));
    } else if (token.startsWith("<span class=")) {
      openSpans.push(token);
      lines[lines.length - 1] += token;
    } else if (token === "</span>") {
      if (openSpans.length === 0) throw new Error("Syntax highlighter returned unbalanced markup");
      openSpans.pop();
      lines[lines.length - 1] += token;
    } else {
      lines[lines.length - 1] += token;
    }
  }
  if (openSpans.length !== 0) throw new Error("Syntax highlighter returned unbalanced markup");
  return lines;
};

const renderLines = (source, language) => {
  const lineCount = source.endsWith("\n")
    ? source.slice(0, -1).split("\n").length
    : source.split("\n").length;
  const highlighted = language
    ? hljs.highlight(source, { language }).value
    : escapeHtml(source);
  const lines = splitHighlightedLines(highlighted).slice(0, lineCount);
  return lines
    .map(
      (line, index) => `<span class="code-line" id="L${index + 1}">
  <a class="line-number" href="#L${index + 1}" aria-label="Line ${index + 1}">${index + 1}</a>
  <span class="source-text">${line}</span>
</span>`,
    )
    .join("\n");
};

const layout = ({ title, revision, body }) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | HuleEdu research code</title>
  <link rel="icon" href="/favicon.svg">
  <link rel="stylesheet" href="/code/code.css">
</head>
<body>
  <header class="site-header"><a href="/huleedu-system-overview/">HuleEdu research</a><a href="${codebergRepository}">Codeberg</a></header>
  <main class="reader-layout">
    <aside class="revision-rail" aria-label="Public revision"><a href="${codebergRepository}/commit/${revision}">${revision}</a></aside>
    <section class="reader-content">${body}</section>
  </main>
</body>
</html>
`;

const renderIndex = async (revision, files, readme) => {
  const tree = files
    .map(({ sourcePath, parts }) => `<li style="--depth:${parts.length - 1}"><a href="${sourceUrl(revision, parts)}">${escapeHtml(sourcePath)}</a></li>`)
    .join("\n");
  const readmeHtml = await marked.parse(escapeHtml(readme), { gfm: true, breaks: false });
  return layout({
    title: "Code",
    revision,
    body: `<section class="readme">${readmeHtml}</section>
      <p class="provenance">Revision <a href="${codebergRepository}/commit/${revision}">${revision}</a></p>
      <section aria-labelledby="tree-title"><h2 id="tree-title">Repository tree</h2><ul class="tree">${tree}</ul></section>`,
  });
};

const renderSourcePage = (revision, file, source) => layout({
  title: file.sourcePath,
  revision,
  body: `<p class="eyebrow"><a href="/code/">Code</a> / ${escapeHtml(file.sourcePath)}</p>
    <h1>${escapeHtml(file.sourcePath)}</h1>
    <p class="provenance"><a href="${codebergUrl(revision, file.parts)}">View this file on Codeberg</a></p>
    <pre class="source-code"><code>${renderLines(source, languageFor(file.sourcePath))}</code></pre>`,
});

const stylesheet = `:root { color: #111; background: #efeee9; font-family: "PT Serif", Charter, Georgia, serif; }
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; }
a { color: #173e70; text-decoration-thickness: .08em; text-underline-offset: .16em; }
a:focus-visible { outline: 3px solid #b35c17; outline-offset: 3px; }
.site-header { display: flex; justify-content: space-between; gap: 1rem; max-width: 1120px; margin: 0 auto; padding: 1rem clamp(1.25rem, 5vw, 4rem); font-size: .9rem; }
.reader-layout { display: grid; grid-template-columns: minmax(10rem, 14rem) minmax(0, 1fr); max-width: 1120px; min-height: calc(100vh - 3rem); margin: 0 auto; background: #fff; }
.revision-rail { padding: 2rem 1rem; border-right: 1px solid #c8c8c8; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .72rem; line-height: 1.4; overflow-wrap: anywhere; }
.reader-content { min-width: 0; padding: clamp(2rem, 5vw, 4.5rem); }
h1 { max-width: 22ch; margin: 0 0 1rem; font-size: clamp(2rem, 5vw, 3rem); line-height: 1.08; letter-spacing: -.025em; }
h2 { margin-top: 3rem; font-size: 1.25rem; }
p, li { line-height: 1.65; }
.eyebrow, .provenance { color: #454545; font-size: .92rem; }
.readme { max-width: 48rem; }
.readme code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .9em; }
.tree { padding: 0; list-style: none; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .84rem; }
.tree li { padding-left: calc(var(--depth) * 1.15rem); overflow-wrap: anywhere; }
.source-code { overflow-x: auto; margin: 2rem 0; padding: 1rem 0; border-top: 1px solid #c8c8c8; border-bottom: 1px solid #c8c8c8; background: #fbfbfa; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .82rem; line-height: 1.55; tab-size: 4; }
.code-line { display: grid; grid-template-columns: 4rem max-content; min-width: max-content; scroll-margin-top: 1rem; }
.code-line:target { background: #fff1d6; }
.line-number { padding-right: 1rem; color: #66788c; text-align: right; user-select: none; }
.source-text { padding-right: 1.25rem; white-space: pre; }
.hljs-keyword, .hljs-title, .hljs-attr { color: #173e70; }
.hljs-string, .hljs-number { color: #7a4317; }
.hljs-comment { color: #6b6b6b; }
@media (max-width: 700px) { .reader-layout { grid-template-columns: 1fr; } .revision-rail { border-right: 0; border-bottom: 1px solid #c8c8c8; padding: .8rem 1.25rem; } .reader-content { padding: 2rem 1.25rem 4rem; } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto; } }
`;

const outputDirectory = async (repository, requestedOutput) => {
  if (!requestedOutput) return path.join(repositoryRoot, "public", "code");
  const outputRoot = path.resolve(requestedOutput);
  const physicalOutput = path.join(await realpath(path.dirname(outputRoot)), path.basename(outputRoot));
  const relativeOutput = path.relative(repository, physicalOutput);
  const outputParts = relativeOutput.split(path.sep);
  if (
    !relativeOutput ||
    relativeOutput.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativeOutput) ||
    outputParts.some((part) => !safePathPart.test(part))
  ) {
    throw new Error("Optional output directory must be a new child of the local repository");
  }
  try {
    await lstat(physicalOutput);
  } catch (error) {
    if (error.code === "ENOENT") return physicalOutput;
    throw error;
  }
  throw new Error("Optional output directory must not already exist");
};

const main = async () => {
  const argumentsMap = readArguments(process.argv.slice(2));
  const revision = argumentsMap.get("--revision");
  const repository = await validateRepository(argumentsMap.get("--repo"), revision);
  const requestedOutput = argumentsMap.get("--output");
  const outputRoot = await outputDirectory(repository, requestedOutput);
  const files = await readCommittedFiles(repository, revision);
  const readmeFile = files.find((file) => file.sourcePath === "public_research_code/README.md");
  if (!readmeFile) {
    throw new Error("Refusing repository without public_research_code/README.md");
  }
  const sources = await Promise.all(files.map(async (file) => [file, await readSource(repository, revision, file.sourcePath)]));
  const revisionRoot = path.join(outputRoot, revision);
  if (!requestedOutput) await rm(outputRoot, { recursive: true, force: true });
  await mkdir(path.join(revisionRoot, "source"), { recursive: true });
  await writeFile(path.join(outputRoot, "code.css"), stylesheet);
  await writeFile(path.join(outputRoot, "index.html"), await renderIndex(revision, files, sources.find(([file]) => file === readmeFile)[1]));
  for (const [file, source] of sources) {
    const outputFile = path.join(revisionRoot, "source", ...file.parts) + ".html";
    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(outputFile, renderSourcePage(revision, file, source));
  }
  await writeFile(
    path.join(outputRoot, "reader-manifest.json"),
    `${JSON.stringify({ schemaVersion: 1, revision, readmePath: readmeFile.sourcePath, files: files.map(({ sourcePath }) => sourcePath) }, null, 2)}\n`,
  );
  console.log(`Rendered ${files.length} committed files for ${revision}.`);
};

await main();
