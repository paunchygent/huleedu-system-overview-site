## Question

Scores place essays into a small number of levels. Comparative judgment records
which of two essays is better and can therefore preserve differences between
essays that share a score. This experiment asked two separate questions:

1. Can a model learn from comparative decisions and predict decisions for
   essays it has not seen before?
2. Does that learned ordering improve prediction of the human scores?

## Experiment

The experiment used comparative judgments from one ELLIPSE writing task. The
training material contained 282 essays and 4,500 pairwise decisions. The test
material contained 185 different essays and 3,000 decisions. No test essay or
test decision was used to train or select a model.

Four estimates were compared:

- the accepted regression scorer trained from human scores;
- a pairwise model trained from directions derived from those same scores;
- a pairwise model trained from the genuine comparative judgments; and
- a pairwise model that used both the regression scorer's ordering and the
  genuine comparative judgments.

The pairwise models used RankNet. In this experiment, RankNet means a model
that learns one quality value for each essay from pairwise decisions and uses
the difference between two values to predict which essay will be preferred.
All learned models received the same fixed numerical representation of each
essay, so the comparison changed the training evidence rather than the essay
information supplied to the model.

## Results

Lower pair log loss is better. Higher pair accuracy and agreement with human
scores are better. Mean absolute error is the average distance from the human
score, so lower is better.

| Estimate | Pair log loss | Pair accuracy | Agreement with human scores | Mean absolute error |
| --- | ---: | ---: | ---: | ---: |
| Accepted regression scorer | 0.5366 | 0.7193 | **0.7999** | **0.2514** |
| Pairwise model trained from score differences | 0.7313 | 0.6907 | 0.7534 | 0.3000 |
| Pairwise model trained from comparative judgments | **0.4968** | 0.7543 | 0.7131 | 0.2973 |
| Pairwise model combining regression order and comparative judgments | 0.5061 | **0.7577** | 0.7349 | 0.2892 |

The models trained from genuine comparative judgments predicted the held-out
pair decisions more accurately than the accepted regression scorer. The model
trained from score-derived pairs did not, which shows that the result was not
produced merely by changing from single-essay training to pairwise training.

The grade-facing result went in the other direction. The accepted regression
scorer remained strongest both in agreement with the human scores and in
average error. The comparative judgments therefore contained learnable
relative-quality information, but this experiment did not show how to turn
that information into better human-score prediction.

## Limits

This is one fixed experiment on one ELLIPSE writing task. It does not establish
transfer across writing tasks, learner populations, or Swedish essays. The
185-essay test set has now been examined, so further work on the same set is
exploratory. The result has no uncertainty interval and does not establish
that RankNet should replace the accepted scorer.

The experiment concerns earlier comparative judgments, not the current
evaluation of open-weight model judges and not the separate human teacher
panel. It does not select a judge model or contribute to the teacher-mediated
anchor set.

The complete retained analysis is recorded in HuleEdu revision
[`8fe970fd37e413ddaf8ad060953887b780e4da83`](https://github.com/paunchygent/huleedu/blob/8fe970fd37e413ddaf8ad060953887b780e4da83/docs/reference/ref-hule-research-ellipse-cj-inductive-ranknet-and-fusion-experiment-synthesis-ellipse-cj-inductive-ranknet-and-fusion-experiment-synthesis.md).
