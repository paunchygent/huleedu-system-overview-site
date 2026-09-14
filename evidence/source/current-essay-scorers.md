Evaluation completed **September 9, 2026**. Results use the official ELLIPSE test set. This page compares five scoring methods against human scores.

## Official Train-Test Evaluation

The prepared corpus contains 5,470 training essays. Two declared exclusions leave 5,468 essays for training and model selection. All five methods predict the same 2,567 test essays, which were excluded from training and selection. The corrected evaluation reuses published component predictions and linear RankNet checkpoints.

| Scorer | Weighted kappa | Mean absolute error | Root mean squared error | Severe errors |
| --- | ---: | ---: | ---: | ---: |
| Embeddings | 0.749842 | 0.318465 | 0.459607 | 9.23% |
| Whitebox | 0.655305 | 0.377483 | 0.526841 | 14.14% |
| Linear RankNet | 0.656095 | 0.408843 | 0.553612 | 15.97% |
| Embeddings + whitebox | 0.747222 | 0.315738 | 0.454707 | 8.69% |
| Embeddings + whitebox + linear RankNet | 0.750954 | 0.310479 | 0.445293 | 8.22% |

Weighted kappa measures agreement with human scores and gives greater weight to larger score differences. Mean absolute error is the average distance from the human score; root mean squared error gives larger errors more weight. A severe error is a difference of at least one score point.

The two-component combination weights embeddings at 0.65 and whitebox at 0.35. The three-component combination uses 0.50 embeddings, 0.25 whitebox, and 0.25 linear RankNet. The weights were selected using training data.

## Overall and High-Score Errors

Adding linear RankNet to embeddings and whitebox increases kappa by 0.003732 and reduces mean absolute error by 0.005259. Overall severe errors fall from 223 to 211 out of 2,567 essays. Among the 425 essays with human scores of at least 4, severe errors increase from 42 to 50.

| Scorer | Severe errors among 425 high-scoring essays |
| --- | ---: |
| Embeddings | 42 (9.88%) |
| Whitebox | 64 (15.06%) |
| Linear RankNet | 113 (26.59%) |
| Embeddings + whitebox | 42 (9.88%) |
| Embeddings + whitebox + linear RankNet | 50 (11.76%) |

The combined scorer is the current result used for external comparison. [Choi and colleagues (2026)](https://arxiv.org/pdf/2602.01747) reported weighted kappa 0.726 on the official partition. The comparison is descriptive because the complete systems and preparation procedures differ.

## Reproduction of the Grade Mapping

A separate five-fold experiment, completed **September 9, 2026**, tested the published embeddings and whitebox recipes on held-out folds from 5,470 essays. The split-tail mapping, which adjusts the ends of the scoring scale separately, reached pooled kappa 0.751968 for embeddings and 0.668934 for whitebox. A single positive-affine mapping reached 0.711381 and 0.632691, respectively.

Split-tail mapping produced higher kappa in every fold. These results test the grade mapping on training folds; the official test results appear above.

## Sources

The results use the corrected canonical evaluation, excluding its superseded first attempt. Retained records: `TASK-HULE-23-10-01` (five-arm evaluation) and `TASK-HULE-23-10-04` (grade-mapping reproduction).

[RankNet acquisition and performance](/evidence/ellipse-cj-ranknet-probe/) reports results at different pair counts. [Comparative-judgment experiments](/evidence/comparative-judgment-experiments/) examines the model judge's decisions. The [research code](/code/) is also available on [Codeberg](https://codeberg.org/paunchygent/huleedu-research-code).
