import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("evidence pages expose clear navigation to the overview and research code", async () => {
  const [renderer, stylesheet] = await Promise.all([
    readFile(path.join(repositoryRoot, "scripts", "render-evidence.mjs"), "utf8"),
    readFile(path.join(repositoryRoot, "evidence", "evidence.css"), "utf8"),
  ]);

  assert.match(renderer, /<nav class="page-nav" aria-label="Research navigation">/);
  assert.match(renderer, /href="\/huleedu-system-overview\/"/);
  assert.match(renderer, /href="\/code\/"/);
  assert.match(stylesheet, /\.page-nav a \{[\s\S]*?text-decoration: none;/);
});
