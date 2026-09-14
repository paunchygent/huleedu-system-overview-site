Pairs acquired **September 5–7, 2026**. Performance evaluated **September 7–8, 2026**. This page tracks the number of acquired pairs and the contribution of RankNet to combined essay scores.

## Current Acquired Evidence

The research pool contains 50,000 unique unordered essay pairs across 5,470 ELLIPSE essays. Gemma judged each pair in both orders, A/B and B/A, producing 100,000 judgments. Reversing the order creates another judgment of the same pair. Retried requests and later evaluations do not add new pairs.

| Acquisition completed | Stage | New pairs | Total pairs | Total judgments |
| --- | --- | ---: | ---: | ---: |
| September 5, 2026 | Fixed pair selection | 25,000 | 25,000 | 50,000 |
| September 7, 2026 | Adaptive pair selection | 25,000 | 50,000 | 100,000 |

![Acquisition completion dates: 25,000 unique pairs on September 5 and 50,000 on September 7, 2026.](/evidence/ranknet/acquisition-timeline-20260914.svg)

## Performance by Pair Count

The following comparison uses the same 5,468 essays, evaluation folds, and grade mapping at every pair count. Embeddings and whitebox form the baseline. Two series add either linear or nonlinear RankNet. These are results on held-out training folds; the [official test evaluation](/evidence/current-essay-scorers/#official-train-test-evaluation) uses a separate set of 2,567 essays.

![Weighted kappa and severe errors across 0, 12,500, 25,000, 37,500, and 50,000 unique pairs for linear and nonlinear RankNet fusion.](/evidence/ranknet/performance-by-pairs-20260914.svg)

| Unique pairs | Judgments | Linear fusion kappa | Nonlinear fusion kappa | Linear severe errors | Nonlinear severe errors |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 0 | 0.71108 | 0.71108 | 495 | 495 |
| 12,500 | 25,000 | 0.71892 | 0.71730 | 443 | 465 |
| 25,000 | 50,000 | 0.72240 | 0.71919 | 431 | 443 |
| 37,500 | 75,000 | 0.72039 | 0.71633 | 441 | 462 |
| 50,000 | 100,000 | 0.72372 | 0.71747 | 429 | 461 |

At zero pairs, both series show the embeddings-plus-whitebox baseline. A severe error differs from the human score by at least one point.

From 25,000 to 50,000 pairs, linear fusion kappa rises by 0.00132 and severe errors fall by two. Nonlinear fusion kappa falls over that interval. Neither series improves at every increase in pair count. The second stage also changes the selection policy, so pair quantity alone cannot explain the changes.

The intermediate budgets were evaluated retrospectively on September 8. They are not measurements taken during each acquisition round. Per-round scorer results and uncertainty intervals for every budget are unavailable.

## Earlier Experiments

**August 30, 2026 — existing-edge probe.** Linear RankNet used 4,500 training edges across 282 essays and 3,000 test edges across 185 essays. Those historical comparisons had one orientation each and are excluded from the acquisition totals above.

**September 5, 2026 — first-acquisition evaluation.** On 1,650 held-out pairs from the first 25,000-pair pool, linear RankNet predicted Gemma's choices with 83.03% agreement and log loss 0.3503. A score-based control reached 74.61% and 0.5005. Lower log loss indicates better probability predictions.

The same early analysis reconstructed human scores less closely with RankNet: weighted kappa was 0.6868, compared with 0.8782 for the score-based control. The control's training-fold history did not match the RankNet split, which limits that comparison. These historical results use different evaluation splits from the matched curves above.

## Sources and Downloads

[Acquisition data (CSV)](/evidence/ranknet/acquisition-timeline-20260914.csv) · [Performance data (CSV)](/evidence/ranknet/performance-by-pairs-20260914.csv)

Retained records: `TASK-HULE-23-05-01` (first acquisition), `TASK-HULE-23-09-03` (additional acquisition and matched budget evaluation), and `TASK-HULE-23-06-01` (first-acquisition analysis). Figure dates identify this publication; experiment dates appear above. The [judge experiments](/evidence/comparative-judgment-experiments/) report changes to Gemma's input separately.
