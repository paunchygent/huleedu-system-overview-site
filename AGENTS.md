# HuleEdu Public Research Site Agent Entrypoint

This repository packages public HuleEduOS research documents as static files
for `research.hule.education`.

## Invariants

- Hemma serves this repository through the nginx image in `Dockerfile`. Do not
  introduce a Node, Next.js, application-server, API, database, authentication,
  or AI-gateway runtime for the own-domain deployment.
- Keep `compose.yaml` attached to the shared external `hule-network` and route
  `research.hule.education` through `VIRTUAL_HOST` and `LETSENCRYPT_HOST`.
- Keep the production container restart policy at `always`. The site must
  return after a container crash, Docker daemon restart, or Hemma restart.
- Deploy only from the tracked `main` branch through the canonical Hemma
  checkout at `/home/paunchygent/apps/huleedu-system-overview-site`. Do not
  hand-edit or copy tracked files into the production checkout.
- The sole editable prose source is
  `forskning/forskningsplan/supervision/huleedu-system-overview.md` in the
  HuleEduOS repository. Its adjacent CSS owns both screen and print styling.
  HuleEduOS generates the adjacent HTML from that Markdown. Never edit the
  generated HTML or this repository's imported publication files directly.
- Run `npm run overview:import` only after the HuleEduOS Markdown, CSS, and
  generated HTML are committed. The import verifies that the HTML is current
  and copies the HTML and CSS into `public/` as deployment output.
- Preserve the canonical public path
  `https://research.hule.education/huleedu-system-overview/` across updates.
- Serve overview, evidence HTML, evidence Markdown, and CSS with
  `Cache-Control: no-store` so text and presentation changes appear on the next
  request after deployment. Versioned evidence images may use durable caching.
- Keep public evidence sources in `evidence/manifest.json`, pinned to their
  retained source revisions. Publish only reviewed records, aggregate
  artifacts, and sanitized extracts; never publish student text, identity
  mappings, credentials, local absolute paths, or server diagnostics.
- Render evidence Markdown during the build and serve both the HTML page and
  its Markdown source as static files. Link overview claims directly to stable
  evidence-page headings.

## Validation

- `npm test`
- `npm run build`
- `npm run lint`
- `npm run evidence:import` when refreshing sources, followed by review of the
  imported public tree before commit.
- `docker compose config --quiet`
- `docker compose build`
- Confirm the container is healthy and its effective restart policy is
  `always`.
- Confirm the canonical public path returns HTTP 200 over HTTPS with the
  expected page title and a certificate for `research.hule.education`.
- `git diff --check`
