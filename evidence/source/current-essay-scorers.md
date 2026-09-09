## What Is Current

HuleEdu's current official essay scorer combines three estimates:

- a **pure-feature whitebox scorer**, which uses named linguistic measures;
- an **embeddings scorer**, which uses a whole-essay numerical representation;
- a **linear RankNet scorer**, which learns from comparative judgments made
  over essay pairs.

## Official Train-Test Evaluation

The latest full train-test fusion experiment fitted the three scorers on 5,468
admitted ELLIPSE training essays and evaluated their combined prediction on all
2,567 essays in the official test set. The published split-tail grade mapping
was used for the whitebox and embeddings scorers. The selected late-fusion
weights are 0.50 embeddings, 0.25 pure-feature whitebox, and 0.25 linear
RankNet.

| Official scorer | Quadratic weighted kappa | Mean absolute error | Root mean squared error | Spearman correlation | Errors of at least one grade point |
| --- | ---: | ---: | ---: | ---: | ---: |
| Embeddings + pure-feature whitebox + linear RankNet | **0.7510** | **0.3105** | **0.4453** | **0.7600** | **8.2%** |

This late-fusion result is HuleEdu's current official result for comparison
with other work on the same ELLIPSE test partition. Choi and colleagues
reported quadratic weighted kappa 0.726 on that partition; differences between
the complete systems still matter when interpreting the comparison.

### Component Results

The individual results show what each component contributed to the official
combination. They are diagnostic results rather than alternative official
scorers.

| Component | Quadratic weighted kappa | Mean absolute error | Root mean squared error |
| --- | ---: | ---: | ---: |
| Embeddings | 0.7498 | 0.3185 | 0.4596 |
| Pure-feature whitebox | 0.6553 | 0.3775 | 0.5268 |
| Linear RankNet | 0.6561 | 0.4088 | 0.5536 |

Quadratic weighted kappa summarizes ordinal agreement with the human scores.
Mean absolute error reports the average distance in grade points, while root
mean squared error gives greater weight to larger misses.

Compared with embeddings alone, the official combined scorer reduced mean
absolute error from 0.3185 to 0.3105, root mean squared error from 0.4596 to
0.4453, and errors of at least one grade point from 9.2% to 8.2%. Its severe
error rate among high-scoring essays increased from 9.9% to 11.8%. The official
overall result therefore retains a measured high-end limitation.

## Reproduction of the Grade Mapping

A separate five-fold experiment trained and evaluated the published whitebox
and embeddings recipes on held-out folds from 5,470 essays. With the published
split-tail mapping, pooled kappa was 0.7520 for embeddings and 0.6689 for
whitebox. A positive-affine alternative reached 0.7114 and 0.6327.

Split-tail produced higher agreement in every fold for both scorers. The
positive-affine mapping reduced some average and severe errors, so the mapping
choice still changes the error tradeoff. The official late-fusion result above
remains the current external benchmark because it uses the full training
cohort and the untouched official test set.

## RankNet Evidence

The current RankNet research pool contains 50,000 unordered essay pairs across
5,470 essays. Each pair was judged in both A/B orientations, producing 100,000
model-judge decisions. The first acquisition supplied 25,000 pairs and the
later adaptive acquisition supplied another 25,000.

The available held-out pair metrics come from the first 25,000-pair snapshot,
before the second acquisition. On its 1,650 held-out pairs, RankNet predicted
the judge's choices with 0.830 accuracy and 0.350 log loss. A residual form
that retained the score-based ordering as its starting point reached 0.835
accuracy and 0.348 log loss. The ordinary score-based model reached 0.746
accuracy and 0.500 log loss on the same pairs.

This is strong evidence that the model judge's comparative choices contain a
learnable signal. It is not evidence that those choices reproduce human grades
better. On the corresponding first-snapshot grade reconstruction, the
score-based model reached kappa 0.878, compared with 0.687 for RankNet and
0.726 for the residual form. The current prompt study therefore examines the
quality of the judgments before any decision about collecting more comparison
pairs.

## Public Code and Further Evidence

The [public research-code browser](/code/) presents the source used by this
site. The repository is also available from the
[HuleEdu research-code project on Codeberg](https://codeberg.org/paunchygent/huleedu-research-code).
The [RankNet evidence page](/evidence/ellipse-cj-ranknet-probe/) explains the
comparative-learning result in more detail.

[Choi, Kim, Liermann, Seong, and Huang (2026)](https://arxiv.org/pdf/2602.01747)
report the published comparison result cited above.
