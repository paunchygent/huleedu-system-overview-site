## Experiment

The experiment used one ELLIPSE writing task. It included 282 essays in the
out-of-fold training comparison and 185 held-out essays in the test comparison.
Every essay had a human score and three independently produced estimates:

- the transparent scorer, also called the white-box scorer, which uses
  inspectable text measures;
- the hybrid scorer, which combines text measures with a language-model
  representation of the complete essay; and
- comparative judgment (CJ), which derives an ordering from repeated pairwise
  essay comparisons.

The transparent and hybrid scorers had already produced their estimates before
comparative judgment was added. The experiment did not retrain either scorer
and did not use comparative judgment during scorer training.

Two comparisons were conducted. The first added the uncalibrated CJ result to
each scorer separately. The second calibrated CJ to the essay-score scale and
then averaged the transparent, hybrid, and CJ estimates with equal weight.

## Measures

Quadratic weighted kappa (QWK) measures agreement with the human scores. It
ranges from 0 for chance-level agreement to 1 for perfect agreement and
penalizes large disagreements more strongly than small ones.

Exact agreement is the proportion of estimates equal to the human score.
Adjacent agreement is the proportion equal to, or one half-point from, the
human score. Mean absolute error (MAE) is the average distance from the human
score. Root mean squared error (RMSE) gives additional weight to larger errors.

For the first comparison, uncertainty was estimated with 10,000 paired
resamples of the 185 held-out essays. The lower bound is the one-sided 95
percent lower bound for the QWK change. “Resamples at or below zero” is the
proportion of resamples in which adding CJ produced no improvement.

## Results

### Adding comparative judgment to each scorer

Adding the uncalibrated CJ result increased QWK for both scorers on the same
185 held-out essays.

| Scorer | Scorer alone QWK | With CJ QWK | QWK change | One-sided 95% lower bound | Resamples at or below zero |
| --- | ---: | ---: | ---: | ---: | ---: |
| Hybrid | 0.7390 | 0.7621 | +0.0231 | 0.0014 | 0.0419 |
| Transparent | 0.7271 | 0.7574 | +0.0303 | 0.0008 | 0.0460 |

Both lower bounds are above zero. In the paired resampling analysis, 95.81
percent of the hybrid comparisons and 95.40 percent of the transparent
comparisons retained a positive change. This result applies to this writing
task and does not establish the same effect for other tasks.

### Equal combination on the held-out essays

The second comparison evaluated every estimate separately and then averaged
all three with equal weight.

| Test estimate | QWK | Exact agreement | Adjacent agreement | MAE | RMSE |
| --- | ---: | ---: | ---: | ---: | ---: |
| Transparent scorer | 0.7271 | 0.4973 | 0.9568 | 0.2757 | 0.4060 |
| Hybrid scorer | 0.7390 | 0.4757 | 0.9622 | 0.2811 | 0.3993 |
| Calibrated CJ | 0.7537 | 0.4649 | 0.9622 | 0.2865 | 0.4027 |
| Equal average of all three | 0.7659 | 0.5135 | 0.9730 | 0.2568 | 0.3767 |

The equal average has the highest QWK, exact agreement, and adjacent agreement.
It also has the lowest MAE and RMSE. On these 185 essays, the combined estimate
agrees with the human scores more closely than any of the three estimates on
its own.

### Out-of-fold training comparison

The same measurements were computed for the 282 out-of-fold training essays.
These estimates were produced without scoring an essay with a model trained on
that essay.

| Out-of-fold estimate | QWK | Exact agreement | Adjacent agreement | MAE | RMSE |
| --- | ---: | ---: | ---: | ---: | ---: |
| Transparent scorer | 0.7303 | 0.4645 | 0.9433 | 0.2979 | 0.4253 |
| Hybrid scorer | 0.7437 | 0.4823 | 0.9716 | 0.2784 | 0.4072 |
| Calibrated CJ | 0.7274 | 0.4362 | 0.9397 | 0.3121 | 0.4315 |
| Equal average of all three | 0.7323 | 0.4574 | 0.9645 | 0.2908 | 0.4082 |

The equal average does not outperform the hybrid scorer on the out-of-fold
training essays. The improvement on the held-out essays must therefore be
treated as a test-set result, not as a uniform advantage across both
partitions.

### Relationship between the errors

The correlations below compare the absolute error made by each pair of
estimates on the held-out essays.

| Pair of estimates | Absolute-error correlation |
| --- | ---: |
| Transparent and hybrid | 0.4900 |
| Hybrid and CJ | 0.3436 |
| Transparent and CJ | 0.3773 |

CJ has a lower error correlation with either scorer than the two scorers have
with each other. Its errors therefore overlap less with the scorer errors. This
provides a direct explanation for why CJ can improve the combined estimate even
though its individual QWK is only moderately higher than the scorer QWKs.

### Essays on which the estimates disagree substantially

Eleven held-out essays have a difference of at least one scale point between
the highest and lowest component estimate.

| Difference between highest and lowest estimate | Essays | Combined-estimate MAE | Mean component MAE | Largest component MAE |
| ---: | ---: | ---: | ---: | ---: |
| 1.0 | 10 | 0.10 | 0.40 | 0.60 |
| 1.5 | 1 | 0.00 | 0.6667 | 1.00 |

For these disagreement cases, the equal average is closer to the human score
than the components are on average. The result concerns only eleven essays and
should be interpreted as a description of those cases rather than as an
independent performance estimate.

## Interpretation

The held-out results show that comparative judgment contains information that
is not already present in either scorer. Adding CJ improves both scorers, and
the equal combination of all three produces the strongest held-out result in
this experiment. The error correlations and the eleven disagreement cases
show why the combination can help: the three methods do not make the same
errors on the same essays.

The out-of-fold training comparison does not show the same overall advantage
for the equal combination. The evidence therefore supports a bounded claim
about the 185 held-out essays from this writing task. Replication across
writing tasks is required before the result can support a general claim about
the instrument.
