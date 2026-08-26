import { cp, copyFile, mkdir, readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const runFile = promisify(execFile);

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(repositoryRoot, "evidence", "manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

const sourceRoots = {
  huleedu: path.resolve(
    process.env.HULEEDU_REPO ?? path.join(repositoryRoot, "..", "huleedu"),
  ),
  huleeduBenchmark: path.resolve(
    process.env.HULEEDU_BENCHMARK_REPO ??
      process.env.HULEEDU_REPO ??
      path.join(repositoryRoot, "..", "huleedu"),
  ),
};

const sourceDirectory = path.join(repositoryRoot, "evidence", "source");
const assetDirectory = path.join(repositoryRoot, "evidence", "assets");
await mkdir(sourceDirectory, { recursive: true });
await mkdir(assetDirectory, { recursive: true });

const verifiedSources = new Set();
const verifyPinnedSource = async (sourceRepo, sourceRevision, sourcePath) => {
  const verificationKey = `${sourceRepo}:${sourceRevision}:${sourcePath}`;
  if (verifiedSources.has(verificationKey)) return;
  const sourceRoot = sourceRoots[sourceRepo];
  const { stdout: headOutput } = await runFile("git", ["rev-parse", "HEAD"], {
    cwd: sourceRoot,
  });
  if (headOutput.trim() !== sourceRevision) {
    throw new Error(
      `${sourceRepo} is at ${headOutput.trim()}, expected ${sourceRevision}`,
    );
  }
  const { stdout: statusOutput } = await runFile(
    "git",
    ["status", "--porcelain", "--", sourcePath],
    { cwd: sourceRoot },
  );
  if (statusOutput.trim()) {
    throw new Error(`${sourceRepo}:${sourcePath} has uncommitted changes`);
  }
  verifiedSources.add(verificationKey);
};

let importedDocumentCount = 0;
for (const document of manifest.documents) {
  if (document.import === false) continue;
  await verifyPinnedSource(
    document.sourceRepo,
    document.sourceRevision,
    document.sourcePath,
  );
  const source = path.join(sourceRoots[document.sourceRepo], document.sourcePath);
  const destination = path.join(sourceDirectory, `${document.slug}.md`);
  await copyFile(source, destination);
  importedDocumentCount += 1;
}

for (const assetCopy of manifest.assetCopies) {
  await verifyPinnedSource(
    assetCopy.sourceRepo,
    assetCopy.sourceRevision,
    assetCopy.sourcePath,
  );
  const source = path.join(sourceRoots[assetCopy.sourceRepo], assetCopy.sourcePath);
  const destination = path.join(assetDirectory, assetCopy.destinationPath);
  await cp(source, destination, { recursive: true, force: true });
}

console.log(
  `Imported ${importedDocumentCount} Markdown records and ${manifest.assetCopies.length} asset set.`,
);
