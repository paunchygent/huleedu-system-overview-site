import { copyFile, readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const runFile = promisify(execFile);
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const huleEduOsRoot = path.resolve(
  process.env.HULEEDUOS_REPO ?? path.join(repositoryRoot, "..", "html_to_pdf_handout_templates"),
);
const sourceDirectory = path.join(
  huleEduOsRoot,
  "forskning",
  "forskningsplan",
  "supervision",
);
const overviewFiles = ["huleedu-system-overview.html", "huleedu-system-overview.css"];
const governedFiles = ["huleedu-system-overview.md", ...overviewFiles].map((filename) =>
  path.join("forskning", "forskningsplan", "supervision", filename),
);

await runFile("pdm", ["run", "research:render-overview", "--check"], {
  cwd: huleEduOsRoot,
});
const { stdout: status } = await runFile(
  "git",
  ["status", "--porcelain", "--", ...governedFiles],
  { cwd: huleEduOsRoot },
);
if (status.trim()) {
  throw new Error("Commit the canonical overview source and generated files before import");
}

const generatedHtml = await readFile(path.join(sourceDirectory, overviewFiles[0]), "utf8");
if (!generatedHtml.includes("Generated from huleedu-system-overview.md")) {
  throw new Error("The overview HTML is not generated from the canonical Markdown");
}

for (const filename of overviewFiles) {
  await copyFile(path.join(sourceDirectory, filename), path.join(repositoryRoot, "public", filename));
}

const { stdout: revision } = await runFile("git", ["rev-parse", "HEAD"], {
  cwd: huleEduOsRoot,
});
console.log(`Imported overview HTML and CSS from HuleEduOS ${revision.trim()}.`);
