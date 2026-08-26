# Student identity and research-manifest separation

Source record:
`docs/backlog/tasks/task-hule-08-02-17-add-governed-vt26-manifests-with-restorable-private-student-identity-map.md`
at HuleEdu revision `c9d8b6ef60c19bbbdb17b9b46243ab4abfce35bb`.

## Retained Contract

The Swedish research data uses two separate manifest layers:

- The tracked structural manifest contains assignment and prompt identity,
  pseudonymous essay IDs, source checksums, provenance, and aggregate cohort
  counts. It contains no raw essay text or direct student-name mapping.
- The private identity manifest contains the teacher-owned mapping between
  pseudonymous IDs and names, classes, local source files, and result records.
  That manifest and the identity-bearing runtime catalog remain outside Git.

## Validation Results

The completed task recorded:

- 61 student records and 9 anchors in the VT26 manifest;
- successful full verification of the structural manifest, private manifest,
  and local catalog;
- successful structural-only verification without the private identity file;
- a failed identity-bearing verification when the private identity file was
  deliberately absent; and
- a structural privacy scan with no direct-name, local-path, class, source-role,
  or source-filename fields in the tracked manifest.

These results substantiate the separation between public research identity and
the private restoration map. They do not claim that essay text itself is absent
from a comparative-judgment provider request; that request shape is recorded
separately.
