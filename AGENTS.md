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
- The authoritative editable document remains
  `forskning/forskningsplan/supervision/huleedu-system-overview.html` in the
  HuleEduOS repository. Synchronize an approved revision to
  `public/huleedu-system-overview.html` before deployment.
- Preserve the canonical public path
  `https://research.hule.education/huleedu-system-overview/` across updates.
- Keep public evidence sources in `evidence/manifest.json`, pinned to their
  retained source revisions. Publish only reviewed records, aggregate
  artifacts, and sanitized extracts; never publish student text, identity
  mappings, credentials, local absolute paths, or server diagnostics.
- Render evidence Markdown during the build and serve both the HTML page and
  its Markdown source as static files. Link overview claims directly to stable
  evidence-page headings.

## Validation

- `npm run build`
- `npm run evidence:import` when refreshing sources, followed by review of the
  imported public tree before commit.
- `docker compose config --quiet`
- `docker compose build`
- Confirm the container is healthy and its effective restart policy is
  `always`.
- Confirm the canonical public path returns HTTP 200 over HTTPS with the
  expected page title and a certificate for `research.hule.education`.
- `git diff --check`
