# Accepted correction treatment and scorers

The current scorer packages use the cumulative correction treatment evaluated
in Story 48 and accepted for production use in Story 50. Story 50 promoted the
evaluated treatment into durable scorer packages; it did not run a new
comparative experiment.

## Accepted correction semantics

The treatment cumulatively applies eligible LanguageTool repairs and validated
core-L2 exact-span lexical repairs. Core-L2 is the subset that the ordinary
spelling tools could not recover. Only context-free, single-token lexical
spelling pairs can enter the durable dictionary. Grammar and syntax changes,
compounds, ambiguous contextual substitutions, and multi-token rewrites do not
enter it.

The operational dictionary contains 15,229 accepted pairs. Of these, 5,391 are
classified as core-L2 and 9,838 as recoverable by ordinary tools under the
accepted comparison policy.

Applied corrections remain error evidence. The repaired text is used only for
features derived through spaCy. The fixed embedding continues to represent the
canonical unrepaired essay. Once a pair has entered the dictionary, the
application step is a deterministic lookup and makes no model call.

## Live screen and full-population derivation

The seeded live screen used 100 ELLIPSE essays and the real LanguageTool and
Hemma feature boundaries. It produced 28 features for every essay with zero
provider calls. Sentence-context inspection accepted all 702 applied
corrections as meaning-preserving.

The completed cumulative derivation recorded the following applied spelling
operations:

| Population | Essays | Applied corrections | Ordinary-tool recoverable | Core-L2 |
| --- | ---: | ---: | ---: | ---: |
| Training | 5,470 | 30,663 | 24,842 | 5,821 |
| Official test | 2,567 | 14,511 | 11,488 | 3,023 |

The ordinary-tool-recoverable and core-L2 counts are mutually exclusive and
sum to the applied total in each population.

## Story 48 scorer comparison

Story 48 fitted both scorer lanes with the cumulative treatment and then
applied the fixed treatment once to the official test.

| Scorer | Train/CV QWK | Train/CV MAE | Official-test QWK | Official-test MAE |
| --- | ---: | ---: | ---: | ---: |
| White-box | 0.651749 | 0.401554 | 0.648796 | 0.387807 |
| Hybrid | 0.751293 | 0.331718 | 0.749481 | 0.316907 |

These values describe the accepted corrected scorers. They do not assign the
complete difference in performance to corrections alone.

## Story 50 accepted package promotion

Story 50 used the Story 48-selected correction semantics and created the
accepted packages, complete prediction artifacts, and registry receipts.

| Lane | Public scorer identity | Feature columns | Prediction rows | Accepted-scorer receipt |
| --- | --- | ---: | ---: | --- |
| White-box | `handcrafted.current.v1` | 30 | 8,037 | resolved |
| Hybrid | `combined.current.v1` | 804 | 8,037 | resolved |

Each prediction artifact contains 5,470 role-labelled training rows followed
by 2,567 role-labelled official-test rows. The hybrid package has 768 embedding
coordinates and 36 scalar columns. Story 50 established package, prediction,
and registry identity without repeating Story 48's performance comparison.

## Source provenance

This public synthesis is pinned to HuleEdu revision
`64bf127d441dc900e63ee25778245ad9d35d63b8`. The four principal accepted
sources are:

| Source | Evidence used here |
| --- | --- |
| `docs/backlog/stories/st-hule-20-48-correct-parser-stabilization-authority-and-reassess-core-l2-scorer-value.md` | accepted cumulative treatment |
| `docs/backlog/tasks/task-hule-20-48-03-run-matched-scorer-comparison-and-min-para-relevance-ablation.md` | full-population derivation and scorer results |
| `docs/reference/ref-hule-research-story-50-accepted-cumulative-correction-scorer-promotion.md` | accepted package and receipt identities |
| `docs/backlog/tasks/task-hule-20-50-01-promote-cumulative-correction-features-and-materialize-accepted-ellipse-scores.md` | Story 50 promotion result |

The dictionary totals and live screen are retained in the same pinned revision
under Story 46 Tasks 01 and 02. The dictionary-admission boundary is retained
under Story 40 Task 03.
