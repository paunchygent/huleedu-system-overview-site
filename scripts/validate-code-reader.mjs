import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(repositoryRoot, "public", "code");
const fullRevision = /^[0-9a-f]{40}$/;
const safePathPart = /^[A-Za-z0-9_.-]+$/;

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
