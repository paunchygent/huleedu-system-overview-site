## What Is Current

HuleEdu currently studies three separate ways of estimating essay quality:

- a **pure-feature whitebox scorer**, which uses named linguistic measures;
- an **embeddings scorer**, which uses a whole-essay numerical representation;
- a **linear RankNet scorer**, which learns from comparative judgments made
  over essay pairs.

## Official Train-Test Evaluation

The current evaluation fitted the scorers on 5,468 admitted ELLIPSE training
essays and evaluated them on all 2,567 essays in the official test set. The
published split-tail grade mapping was used for the whitebox and embeddings
scorers.

| Scorer | Quadratic weighted kappa | Mean absolute error | Root mean squared error |
| --- | ---: | ---: | ---: |
| Embeddings | **0.7498** | 0.3185 | 0.4596 |
| Pure-feature whitebox | 0.6553 | 0.3775 | 0.5268 |
| Linear RankNet | 0.6561 | 0.4088 | 0.5536 |

Quadratic weighted kappa summarizes ordinal agreement with the human scores.
Mean absolute error reports the average distance in grade points, while root
mean squared error gives greater weight to larger misses. The embeddings scorer
had the strongest individual result in this evaluation.

The three estimates were also combined after each scorer had produced its own
prediction. That late combination reached kappa 0.7510, mean absolute error
0.3105, and root mean squared error 0.4453. It reduced errors of at least one
grade point from 9.2% for embeddings alone to 8.2%, while increasing the
high-score severe-error rate from 9.9% to 11.8%. The small aggregate gain
therefore came with a material high-end tradeoff. It does not replace the three
individual scorer results.

## Reproduction of the Grade Mapping

A separate five-fold experiment trained and evaluated the published whitebox
and embeddings recipes on held-out folds from 5,470 essays. With the published
split-tail mapping, pooled kappa was 0.7520 for embeddings and 0.6689 for
whitebox. A positive-affine alternative reached 0.7114 and 0.6327.

Split-tail produced higher agreement in every fold for both scorers. The
positive-affine mapping reduced some average and severe errors, so the mapping
choice still changes the error tradeoff. The official train-test values above
remain the current external benchmark because they use the full training
cohort and the untouched official test set.

## RankNet Evidence

The RankNet research used 25,000 model-judge comparisons across 5,470 essays.
On 1,650 held-out comparisons, RankNet predicted the judge's choices with
0.830 accuracy and 0.350 log loss. A residual form that retained the
score-based ordering as its starting point reached 0.835 accuracy and 0.348
log loss. The ordinary score-based model reached 0.746 accuracy and 0.500 log
loss on the same comparisons.

This is strong evidence that the model judge's comparative choices contain a
learnable signal. It is not evidence that those choices reproduce human grades
better. On the corresponding grade reconstruction, the score-based model
reached kappa 0.878, compared with 0.687 for RankNet and 0.726 for the residual
form. The current prompt study therefore examines the quality of the judgments
before any decision about collecting more comparison pairs.

## Public Code and Further Evidence

The [public research-code browser](/code/) presents the source used by this
site. The repository is also available from the
[HuleEdu research-code project on Codeberg](https://codeberg.org/paunchygent/huleedu-research-code).
The [RankNet evidence page](/evidence/ellipse-cj-ranknet-probe/) explains the
comparative-learning result in more detail.
