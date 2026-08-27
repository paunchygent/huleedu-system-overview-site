import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const runFile = promisify(execFile);
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const renderer = path.join(repositoryRoot, "scripts", "render-code-reader.mjs");

const runGit = (cwd, argumentsList, environment) => runFile("git", argumentsList, { cwd, env: environment });

const createRepository = async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "huleedu-reader-"));
  const commitDate = "2026-08-26T12:34:56+00:00";
  await runGit(root, ["init"]);
  await runGit(root, ["config", "user.email", "reader-test@example.invalid"]);
  await runGit(root, ["config", "user.name", "Reader test"]);
  await mkdir(path.join(root, "public_research_code"), { recursive: true });
  await mkdir(path.join(root, "scripts", "example"), { recursive: true });
  await writeFile(path.join(root, "public_research_code", "README.md"), "# Reader fixture\n\nA committed public file.\n");
  await writeFile(path.join(root, "scripts", "example", "__init__.py"), '"""Package marker."""\n');
  await writeFile(
    path.join(root, "scripts", "example", "sample.py"),
    '"""First line.\nand remains part of the docstring.\n"""\nanswer = 42\nprint(answer)\n',
  );
  await runGit(root, ["add", "."]);
  await runGit(root, ["commit", "-m", "Add public fixture"], {
    ...process.env,
    GIT_AUTHOR_DATE: commitDate,
    GIT_COMMITTER_DATE: commitDate,
  });
  const { stdout } = await runGit(root, ["rev-parse", "HEAD"]);
  return { root, revision: stdout.trim(), publicationDate: "2026-08-26T12:34:56.000Z" };
};

const render = (repository, revision, output) => runFile(process.execPath, [renderer, "--repo", repository, "--revision", revision, "--output", output]);

test("renders one exact public tree with revision, publication date, and line anchors", async () => {
  const fixture = await createRepository();
  const output = path.join(fixture.root, "reader-output");
  await render(fixture.root, fixture.revision, output);
  const manifest = JSON.parse(await readFile(path.join(output, "reader-manifest.json"), "utf8"));
  assert.equal(manifest.revision, fixture.revision);
  assert.deepEqual(manifest.files, [
    "public_research_code/README.md",
    "scripts/example/__init__.py",
    "scripts/example/sample.py",
  ]);
  const index = await readFile(path.join(output, "index.html"), "utf8");
  assert.match(index, new RegExp(fixture.revision));
  assert.match(index, new RegExp(`<time datetime="${fixture.publicationDate}">Published 26 August 2026</time>`));
  const source = await readFile(path.join(output, fixture.revision, "source", "scripts", "example", "sample.py.html"), "utf8");
  assert.match(source, /id="L1"/);
  assert.match(source, /href="#L2"/);
  assert.match(source, /hljs/);
  assert.match(source, /id="L2"[\s\S]*?hljs-string[\s\S]*?id="L3"/);
  assert.match(source, new RegExp(fixture.revision));
});

test("nginx caches immutable revision source pages while current reader surfaces remain no-store", async () => {
  const configuration = await readFile(path.join(repositoryRoot, "nginx.conf"), "utf8");
  assert.match(
    configuration,
    /location ~ "\^\/code\/\[0-9a-f\]\{40\}\/source\/" \{\s+add_header Cache-Control "public, max-age=31536000, immutable" always;/,
  );
  assert.match(configuration, /location \/code\/ \{\s+add_header Cache-Control "no-store" always;/);
});

test("refuses an invalid revision and a dirty repository", async () => {
  const fixture = await createRepository();
  const output = path.join(fixture.root, "reader-output");
  await assert.rejects(render(fixture.root, fixture.revision.toUpperCase(), output), /full 40-character lowercase SHA/);
  await writeFile(path.join(fixture.root, "notes.txt"), "uncommitted\n");
  await assert.rejects(render(fixture.root, fixture.revision, output), /tree is dirty/);
});

test("refuses an existing optional output directory without deleting it", async () => {
  const fixture = await createRepository();
  const existingOutput = path.join(fixture.root, "existing-output");
  await mkdir(existingOutput);
  const sentinel = path.join(existingOutput, "sentinel.txt");
  await writeFile(sentinel, "preserve me\n");
  await runGit(fixture.root, ["add", "."]);
  await runGit(fixture.root, ["commit", "-m", "Add existing output sentinel"]);
  const { stdout } = await runGit(fixture.root, ["rev-parse", "HEAD"]);

  await assert.rejects(
    render(fixture.root, stdout.trim(), existingOutput),
    /must not already exist/,
  );
  assert.equal(await readFile(sentinel, "utf8"), "preserve me\n");
});

test("refuses committed symlinks that could traverse outside the public tree", async () => {
  const fixture = await createRepository();
  await symlink("../outside", path.join(fixture.root, "public_research_code", "unsafe-link"));
  await runGit(fixture.root, ["add", "."]);
  await runGit(fixture.root, ["commit", "-m", "Add unsafe link"]);
  const { stdout } = await runGit(fixture.root, ["rev-parse", "HEAD"]);
  await assert.rejects(
    render(fixture.root, stdout.trim(), path.join(fixture.root, "reader-output")),
    /unsafe tree entry/,
  );
});
