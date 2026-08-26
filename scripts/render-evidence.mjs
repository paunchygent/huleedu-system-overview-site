import { marked } from "marked";
import { cp, copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const evidenceRoot = path.join(repositoryRoot, "evidence");
const outputRoot = path.join(repositoryRoot, "public", "evidence");
const manifest = JSON.parse(
  await readFile(path.join(evidenceRoot, "manifest.json"), "utf8"),
);

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const headingSlug = (value) =>
  value
    .normalize("NFKD")
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~[\]()]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const addHeadingAnchors = (markdown) => {
  let inFence = false;
  const seen = new Map();
  return markdown
    .split("\n")
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      const match = /^(#{1,6})\s+(.+)$/.exec(line);
      if (!match) return line;
      const base = headingSlug(match[2]) || "section";
      const occurrence = (seen.get(base) ?? 0) + 1;
      seen.set(base, occurrence);
      const id = occurrence === 1 ? base : `${base}-${occurrence}`;
      return `<span id="${id}"></span>\n${line}`;
    })
    .join("\n");
};

const stripFrontmatter = (markdown) =>
  markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");

const sourceLinks = new Map(
  manifest.documents.map((document) => [path.basename(document.sourcePath), document.slug]),
);

const rewritePublishedLinks = (markdown) => {
  let rewritten = markdown;
  for (const [filename, slug] of sourceLinks) {
    rewritten = rewritten.replaceAll(`](${filename})`, `](/evidence/${slug}/)`);
  }
  return rewritten;
};

const renderPage = (document, body) => {
  const title = escapeHtml(document.title);
  const sourcePath = escapeHtml(document.sourcePath);
  const sourceRevision = escapeHtml(document.sourceRevision);
  const slug = escapeHtml(document.slug);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | HuleEdu</title>
  <link rel="icon" href="/favicon.svg">
  <link rel="stylesheet" href="/evidence/evidence.css">
  <link rel="canonical" href="https://research.hule.education/evidence/${slug}/">
</head>
<body>
  <header class="page-header">
    <a class="back-link" href="/huleedu-system-overview/">HuleEdu system overview</a>
    <h1>${title}</h1>
    <p class="source-line"><a href="/evidence/source/${slug}.md">Markdown source</a> · <code>${sourcePath}</code> · <code>${sourceRevision}</code></p>
  </header>
  <main>
    <article class="markdown-body">${body}</article>
  </main>
</body>
</html>
`;
};

await rm(outputRoot, { recursive: true, force: true });
await mkdir(path.join(outputRoot, "source"), { recursive: true });
await copyFile(path.join(evidenceRoot, "evidence.css"), path.join(outputRoot, "evidence.css"));
await cp(path.join(evidenceRoot, "assets"), outputRoot, { recursive: true, force: true });

for (const document of manifest.documents) {
  const sourcePath = path.join(evidenceRoot, "source", `${document.slug}.md`);
  const source = await readFile(sourcePath, "utf8");
  const markdown = addHeadingAnchors(rewritePublishedLinks(stripFrontmatter(source)));
  const body = await marked.parse(markdown, { gfm: true, breaks: false });
  const destination = path.join(outputRoot, document.slug);
  await mkdir(destination, { recursive: true });
  await writeFile(path.join(destination, "index.html"), renderPage(document, body));
  await copyFile(sourcePath, path.join(outputRoot, "source", `${document.slug}.md`));
}

console.log(`Rendered ${manifest.documents.length} evidence pages.`);
