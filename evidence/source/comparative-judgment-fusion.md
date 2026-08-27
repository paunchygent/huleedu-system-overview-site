## Why the earlier result was replaced

An earlier version of this page reported a fusion experiment whose
handcrafted scorer did not represent the construct claimed for it. Three
variables described as prompt similarity were raw cosine measurements in the
same DeBERTa representation space used elsewhere in the system. They therefore
measured broad position in that representation space as well as, and sometimes
instead of, specific similarity to the assigned prompt. The old result cannot
show what a distinct handcrafted lane contributes, so its tables and
interpretation have been removed.

The repaired prompt-relevance calculation first subtracts the cohort's mean
representation. It then compares each essay with its assigned prompt relative
to the other 39 prompts in the governed prompt collection. In the construct
test, the selected whole-essay measure correlated with human score at 0.1830
for the correct prompt, while the strongest result across 500 wrong-prompt
assignments was 0.0351. By contrast, the earlier raw introduction measure
failed the same principle: its correct-prompt correlation was 0.4240, while a
wrong-prompt assignment reached 0.4281.

The repair did not make the handcrafted scorer look better. In a separate
prompt-holdout comparison, the repaired scorer reached 0.6332 QWK, compared
with 0.6915 for the preceding version. The repaired measure was retained
because its meaning was supported by the prompt controls. The scorer now uses
named scalar measurements and contains no 768-number essay representation,
although four scalar measurements, including prompt relevance, are calculated
with a fixed locally hosted language model.

## Experiment

The corrected fusion experiment used one ELLIPSE writing task. It included 282
essays in the out-of-fold training comparison and 185 held-out essays in the
test comparison. Every essay had a human score and three separately produced
estimates:

- the repaired handcrafted scorer;
- the combined scorer, which adds a 768-number representation of the complete
  essay to its scalar measurements; and
- comparative judgment, which derives an ordering from repeated pairwise essay
  comparisons.

The machine scorers produced their estimates without comparative judgment.
Comparative judgment was calibrated to the score scale using only the training
essays, after which the three estimates were averaged with equal weight. The
experiment did not retrain either scorer with comparative-judgment results.

## Measures

Quadratic weighted kappa (QWK) measures agreement with the human scores. It
ranges from 0 for chance-level agreement to 1 for perfect agreement and gives
larger disagreements more weight than smaller ones.

Exact agreement is the proportion of estimates equal to the human score.
Adjacent agreement is the proportion equal to, or one half-point from, the
human score. Mean absolute error (MAE) is the average distance from the human
score, while root mean squared error (RMSE) gives additional weight to larger
errors.

Uncertainty was estimated with 10,000 paired resamples of the 185 held-out
essays. The lower bound is the one-sided 95 percent lower bound for the QWK
change. “Resamples at or below zero” is the proportion of resamples in which
the equal combination did not improve on the named estimate.

## Results

### Held-out essays

| Estimate | QWK | Exact agreement | Adjacent agreement | MAE | RMSE |
| --- | ---: | ---: | ---: | ---: | ---: |
| Repaired handcrafted scorer | 0.6908 | 0.4054 | 0.8649 | 0.3703 | 0.5133 |
| Combined scorer | 0.7920 | 0.5459 | 0.9405 | 0.2568 | 0.3976 |
| Calibrated comparative judgment | 0.7537 | 0.4649 | 0.9622 | 0.2865 | 0.4027 |
| Equal average of all three | 0.8161 | 0.5946 | 0.9676 | 0.2189 | 0.3545 |

The equal average has the strongest point estimate on all five measures. The
paired resampling results show how firmly the QWK differences can be stated.

| Comparison | QWK change | One-sided 95% lower bound | Resamples at or below zero |
| --- | ---: | ---: | ---: |
| Equal average versus repaired handcrafted scorer | +0.1252 | 0.0828 | 0.0000 |
| Equal average versus combined scorer | +0.0240 | -0.0058 | 0.0927 |
| Equal average versus calibrated comparative judgment | +0.0624 | 0.0275 | 0.0017 |

The held-out evidence supports an improvement over the repaired handcrafted
scorer and comparative judgment on its own. However, the lower bound for the
comparison with the combined scorer crosses zero, so this experiment does not
clearly distinguish the equal average from the combined scorer.

### Out-of-fold training comparison

The same measurements were computed for the 282 out-of-fold training essays.
These estimates were produced without scoring an essay with a model trained on
that essay.

| Out-of-fold estimate | QWK | Exact agreement | Adjacent agreement | MAE | RMSE |
| --- | ---: | ---: | ---: | ---: | ---: |
| Repaired handcrafted scorer | 0.7877 | 0.4787 | 0.9326 | 0.2961 | 0.4304 |
| Combined scorer | 0.8521 | 0.5957 | 0.9716 | 0.2163 | 0.3498 |
| Calibrated comparative judgment | 0.7274 | 0.4362 | 0.9397 | 0.3121 | 0.4315 |
| Equal average of all three | 0.8244 | 0.5355 | 0.9787 | 0.2429 | 0.3634 |

Here, the combined scorer has higher QWK, exact agreement, and lower error than
the equal average. The equal average has slightly higher adjacent agreement.
Consequently, the corrected experiment does not show a uniform fusion
advantage across the two partitions.

## Interpretation

On the held-out essays, comparative judgment contributes information that
improves the equal average relative to the repaired handcrafted scorer and to
comparative judgment alone. The equal average also has a higher point estimate
than the combined scorer, but the paired uncertainty analysis does not resolve
that difference. On the out-of-fold training essays, the combined scorer is
stronger than the equal average.

The corrected evidence therefore supports continued study of comparative
judgment as an additional source of information. It does not establish that
fusion is generally better than the combined scorer. The experiment concerns
one writing task, and any broader claim requires replication across tasks.

At public code revision
[`eebc7379b1396572739d2f81851856df010c0024`](https://research.hule.education/code/eebc7379b1396572739d2f81851856df010c0024/),
the implementation exposes both the
[comparison-submission path](https://research.hule.education/code/eebc7379b1396572739d2f81851856df010c0024/source/services/cj_assessment_service/cj_core_logic/comparison_processing.py.html#L80)
and the function that
[turns pairwise outcomes into Bradley--Terry scores](https://research.hule.education/code/eebc7379b1396572739d2f81851856df010c0024/source/services/cj_assessment_service/cj_core_logic/bt_scoring.py.html#L39).
Those links document the comparative-judgment implementation. The numerical
results above remain supported by the experiment records described on this
page rather than by the source listing alone.
