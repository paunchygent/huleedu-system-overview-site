import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicationRoot = "/srv/huleedu-publication/current";

const readRepositoryFile = (name) => readFile(path.join(repositoryRoot, name), "utf8");

test("serves the current publication release read-only while preserving static site routes", async () => {
  const [compose, configuration] = await Promise.all([
    readRepositoryFile("compose.yaml"),
    readRepositoryFile("nginx.conf"),
  ]);

  assert.match(
    compose,
    /source: \$\{HULEEDU_PUBLICATION_ROOT:-\/home\/paunchygent\/apps\/huleedu-public-research-publication\}\s+target: \/srv\/huleedu-publication\s+read_only: true/,
  );
  assert.match(
    configuration,
    new RegExp(
      `location ~ "\\^\\/code\\/\\[0-9a-f\\]\\{40\\}\\/source\\/" \\{\\s+add_header Cache-Control "public, max-age=31536000, immutable" always;\\s+root ${publicationRoot.replaceAll("/", "\\/")};`,
    ),
  );
  assert.match(
    configuration,
    new RegExp(
      `location \\/code\\/ \\{\\s+add_header Cache-Control "no-store" always;\\s+root ${publicationRoot.replaceAll("/", "\\/")};\\s+expires -1;`,
    ),
  );
  assert.match(configuration, /location = \/healthz \{[\s\S]*?return 200 "ok\\n";/);
  assert.match(configuration, /location \/huleedu-system-overview\/ \{[\s\S]*?add_header Cache-Control "no-store" always;/);
  assert.match(configuration, /location = \/ \{\s+return 302 \/huleedu-system-overview\//);
});
