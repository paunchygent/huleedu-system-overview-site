---
type: task
id: TASK-HULE-18-02-24
title: Make ELLIPSE fusion arms and claims experiment-configured
repository: huleedu
owners:
  - kind: service
    id: huleedu
created: '2026-08-04'
status: done
readiness_review:
  record: inline
  status: not_required
  reviewer: user
  decided_at: '2026-08-04T16:03:00+02:00'
  approval_protocol: agent-planning:user-closure-gate
  approval_evidence: The user explicitly disqualified plan-review agents and retained personal authority to approve the final decision ledger and implementation plan before work begins.
closeout_review:
  record: inline
  status: approved
  reviewer: user
  decided_at: '2026-08-09T20:43:05+02:00'
  approval_protocol: agent-planning:user-closure-gate
  approval_evidence: The user explicitly authorized terminal closeout of TASK-HULE-18-02-24 after receiving the completed experiment record and results on 2026-08-09.
task_kind: story
acceptance_criteria:
  - Checked-in JSON transports experiment identity, algorithm selection, real input artifacts, algorithm parameters, requested measurements, and output location without encoding a permanent experiment vocabulary.
  - Reusable algorithm modules process, combine, and measure real materialized research data; adding another experiment with an existing module changes JSON, while a genuinely new computation adds one reusable module.
  - Raw-CJ analysis and three-signal combination run as two separate experiments over the governed real material and emit inspectable row-level results without promotion gates or prescribed conclusions.
story: ST-HULE-18-02
contract_version: 2
---

## Implementation Contract

Replace the experiment-specific ELLIPSE CJ/AES fusion topology with a small
JSON-to-algorithm transport seam. Checked-in JSON carries experiment identity,
algorithm selection, named real input artifacts, algorithm parameters,
requested measurements, and output location. Reusable modules own material
loading and alignment, CJ calibration, signal construction, scientific
measurement, typed results, and JSON/CSV serialization.

Run two separate configurations over the retained real ELLIPSE material. The
raw-CJ configuration compares hybrid plus raw CJ with hybrid and white-box plus
raw CJ with white-box. The three-signal configuration combines white-box,
hybrid, and calibrated CJ predictions with equal weights. Neither configuration
re-trains a scorer, regenerates CJ judgments, substitutes synthetic research
data, creates a Holm family, or emits a promotion decision.

## Contract Inputs

- Retained test predictions: 185 rows, SHA-256
  `4a6aacc39a77f2a584133c34edb27a167d112d3978670f4e8c544275a63a1d37`.
- Retained train OOF predictions: 282 rows and five folds, SHA-256
  `a214bb11414792bdb29d8b2d740c06cda20f02b57feac721669d224cf4d559cb`.
- Prepared train material, SHA-256
  `e3379d610a60e8e35b393756c0b9e0944d4d416479c7ad6cc84956eeef8a6a41`.
- Prepared test material, SHA-256
  `a358b915b44708bc4d85ba555e9bc40922e88f7f820e8126e2d426c9adf42aa1`.
- Train CJ report, SHA-256
  `c517c55da57e00e44072229ad5b40d66d818b2762619a1dc24b8f4538ac797e5`.
- Test CJ report, SHA-256
  `f6f32fa7a03e28f4be94e0dc02a50112234a3ebdd362fc38777c3683d6de3ecc`.
- `scripts/ml_training/essay_scoring/experiment_specs/ellipse_raw_cj_analysis.v1.json`.
- `scripts/ml_training/essay_scoring/experiment_specs/ellipse_three_signal_analysis.v1.json`.

## Proof

The public real-data walking skeleton runs both checked-in specifications through
`essay-scoring-research run-experiment`, verifies retained input hashes, and
checks 185 raw-CJ rows, 282 three-signal train rows, 185 three-signal test rows,
complete row and bootstrap artifacts, and test QWK `0.7659328344720384`.

The actual raw-CJ and three-signal commands are retained as command packages
`0003` and `0004` under the task command-evidence lane. Both commands exited
with status 0.

## Validation

- Public real-data walking skeleton: passed, one test, both specifications.
- Actual raw-CJ command: passed.
- Actual three-signal command: passed.
- Focused transport and algorithm tests: passed.
- Ruff and targeted mypy: passed.
- Repository lint: passed.
- Backend, library, and frontend typechecks: passed.
- Frontend tests: passed.
- Docs validation and `git diff --check`: passed.
- The repository-wide backend lane stopped at the absent pre-existing
  `services/spellchecker_service/data/l2-swedish-learner-errors.csv` input;
  command package `0006` records that run.

## Stop Conditions

- Stop on missing authority, an open material decision, or scope expansion.
- Stop on fabricated rows, labels, feature matrices, CJ graphs, or lifecycle
  artifacts.
- Stop before changing scorer recipes, datasets, CJ judgments, paid-provider
  state, lifecycle infrastructure, or registry infrastructure.
- Stop if changing a configured arm, claim, direction, family, or supported
  diagnostic requires central implementation changes.

## Decided Contract Terms

| ID    | Decided contract term                                                                                                                                |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| DC-01 | Checked-in JSON owns experiment inputs, arms, transformations, derived predictions, claims, uncertainty settings, diagnostics, and output locations. |
| DC-02 | The central transport does not enumerate research algorithms or experiment vocabulary.                                                               |
| DC-03 | Raw CJ is the sole augmentation in the raw-CJ configuration; ECDF and Holm families are absent.                                                      |
| DC-04 | Hybrid and white-box receive separate directional QWK measurements with 10,000 paired essay-row resamples, seed 42, and one-sided 95% lower bounds.  |
| DC-05 | The three-signal configuration combines white-box, hybrid, and calibrated CJ at equal weights without model fitting.                                 |
| DC-06 | Both configurations retain complete signed and absolute-error distributions, score-band results, pairwise disagreement, and exact row-level changes. |
| DC-07 | Both configurations reuse verified materialized predictions, labels, folds, and CJ reports.                                                          |
| DC-08 | Acceptance requires both configurations to run through the public command against governed real material.                                            |
| DC-09 | The configurations produce measurements and retained artifacts without promotion gates or prescribed conclusions.                                    |

## Results

Both configurations used the retained ELLIPSE predictions, labels, folds, and CJ
reports. The raw-CJ analysis contains 185 test rows. The three-signal analysis
contains 282 train rows and 185 test rows.

| comparison | baseline QWK | raw-CJ QWK | QWK change | one-sided 95% lower bound | resamples at or below zero |
| ---------- | -----------: | ---------: | ---------: | ------------------------: | -------------------------: |
| Hybrid     |       0.7390 |     0.7621 |    +0.0231 |                    0.0014 |                     0.0419 |
| White-box  |       0.7271 |     0.7574 |    +0.0303 |                    0.0008 |                     0.0460 |

| test signal                  |    QWK |  exact | adjacent |    MAE |   RMSE |
| ---------------------------- | -----: | -----: | -------: | -----: | -----: |
| White-box                    | 0.7271 | 0.4973 |   0.9568 | 0.2757 | 0.4060 |
| Hybrid                       | 0.7390 | 0.4757 |   0.9622 | 0.2811 | 0.3993 |
| Calibrated CJ                | 0.7537 | 0.4649 |   0.9622 | 0.2865 | 0.4027 |
| White-box + hybrid + CJ, 1/3 | 0.7659 | 0.5135 |   0.9730 | 0.2568 | 0.3767 |

| train OOF signal             |    QWK |  exact | adjacent |    MAE |   RMSE |
| ---------------------------- | -----: | -----: | -------: | -----: | -----: |
| White-box                    | 0.7303 | 0.4645 |   0.9433 | 0.2979 | 0.4253 |
| Hybrid                       | 0.7437 | 0.4823 |   0.9716 | 0.2784 | 0.4072 |
| Calibrated CJ                | 0.7274 | 0.4362 |   0.9397 | 0.3121 | 0.4315 |
| White-box + hybrid + CJ, 1/3 | 0.7323 | 0.4574 |   0.9645 | 0.2908 | 0.4082 |

| component pair     | absolute-error correlation |
| ------------------ | -------------------------: |
| White-box / hybrid |                     0.4900 |
| Hybrid / CJ        |                     0.3436 |
| White-box / CJ     |                     0.3773 |

| component-score spread | rows | ensemble MAE | component mean MAE | worst-component MAE |
| ---------------------: | ---: | -----------: | -----------------: | ------------------: |
|                    1.0 |   10 |         0.10 |               0.40 |                0.60 |
|                    1.5 |    1 |         0.00 |             0.6667 |                1.00 |

- Raw-CJ summary:
  `output/essay_scoring/20260804_task_hule_18_02_24_raw_cj_analysis_live1/summary.json`.
- Three-signal summary:
  `output/essay_scoring/20260804_task_hule_18_02_24_three_signal_analysis_live1/summary.json`.
- Complete row results:
  `.orchestration/context/tasks/TASK-HULE-18-02-24/evidence/analysis/live_experiment_summary/row_pattern_summary.json`.

## Plan Document Review

Not required by user decision on 2026-08-04. The user approved the final
decision ledger and implementation plan.

## Implementation Review

Implementation commits `184a77aed` through `2a5bd2c91` were merged to `main`
in `6d4d5806c`. The implementation and validation records above cover the
accepted task contract. The user approved terminal closeout on 2026-08-09.
