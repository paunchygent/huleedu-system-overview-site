import { access, lstat, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fullRevision = /^[0-9a-f]{40}$/;
const safePathPart = /^[A-Za-z0-9_.-]+$/;
const usage = "Usage: npm run code:validate -- [--output-root <absolute-existing-directory>]";

const readArguments = (argumentsList) => {
  if (argumentsList.length === 0) return null;
  if (argumentsList.length !== 2 || argumentsList[0] !== "--output-root" || !argumentsList[1]) {
    throw new Error(usage);
  }
  return argumentsList[1];
};

const externalOutputDirectory = async (requestedOutput) => {
  if (!path.isAbsolute(requestedOutput) || path.normalize(requestedOutput) !== requestedOutput) {
    throw new Error("Output root must be an absolute normalized path");
  }
  const parsed = path.parse(requestedOutput);
  if (requestedOutput === parsed.root) {
    throw new Error("Output root must not name a filesystem root");
  }

  let current = parsed.root;
  for (const part of path.relative(parsed.root, requestedOutput).split(path.sep)) {
    current = path.join(current, part);
    let entry;
    try {
      entry = await lstat(current);
    } catch (error) {
      if (error.code === "ENOENT") {
        throw new Error(`Output root must name an existing directory: ${current}`);
      }
      throw error;
    }
    if (entry.isSymbolicLink()) {
      throw new Error(`Output root contains a symlink component: ${current}`);
    }
    if (!entry.isDirectory()) {
      throw new Error(`Output root component is not a directory: ${current}`);
    }
  }
  return requestedOutput;
};

const requestedOutput = readArguments(process.argv.slice(2));
const outputRoot = requestedOutput
  ? await externalOutputDirectory(requestedOutput)
  : path.join(repositoryRoot, "public", "code");

const manifest = JSON.parse(await readFile(path.join(outputRoot, "reader-manifest.json"), "utf8"));
if (!fullRevision.test(manifest.revision) || !Array.isArray(manifest.files) || manifest.files.length === 0) {
  throw new Error("Generated code reader manifest does not declare a complete public revision");
}

const index = await readFile(path.join(outputRoot, "index.html"), "utf8");
if (!index.includes(manifest.revision) || !index.includes("Repository tree")) {
  throw new Error("Generated code reader index does not match its declared revision");
}
for (const sourcePath of manifest.files) {
  const parts = sourcePath.split("/");
  if (
    parts.some(
      (part) =>
        !safePathPart.test(part) || part === "." || part === ".." || part === ".git",
    )
  ) {
    throw new Error(`Generated code reader contains an unsafe source path: ${sourcePath}`);
  }
  const sourcePage = path.join(outputRoot, manifest.revision, "source", ...parts) + ".html";
  await access(sourcePage);
  const html = await readFile(sourcePage, "utf8");
  if (!html.includes(manifest.revision) || !html.includes('id="L1"') || !html.includes('href="#L1"')) {
    throw new Error(`Generated source page has incomplete revision or line anchors: ${sourcePath}`);
  }
}

console.log(`Validated ${manifest.files.length} generated source pages for ${manifest.revision}.`);
