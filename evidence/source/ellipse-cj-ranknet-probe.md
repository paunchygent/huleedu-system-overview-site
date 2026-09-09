## Question

Comparative judgment records which of two essays a model judge considers
better. RankNet asks whether those decisions contain a stable pattern that can
be learned from essay representations and applied to new essays. Grade
agreement asks a separate question: whether the learned ordering matches the
human scores.

## Initial Essay-Disjoint Result

The first experiment used one ELLIPSE writing task. It trained on 4,500
comparisons among 282 essays and tested on 3,000 comparisons among 185
different essays. Both used the same essay representation.

| Estimate | Pair log loss | Pair accuracy | Grade agreement |
| --- | ---: | ---: | ---: |
| Score-based model | 0.5366 | 0.7193 | **0.7999** |
| RankNet trained from comparative judgments | **0.4968** | 0.7543 | 0.7131 |
| RankNet adjustment to the score-based ordering | 0.5061 | **0.7577** | 0.7349 |

The genuine comparative decisions improved prediction of held-out pair
choices. A control trained from directions derived from the human grades
did not, so the result did not arise merely from changing the training format.
The score-based model remained closer to the human grades.

<span id="full-acquisition-result"></span>

## Full Acquisition Result

The later experiment used 25,000 comparative-judgment pairs across 5,470
ELLIPSE essays. Its held-out pair evaluation contained 1,650 comparisons. The
final refit used all 25,000 pairs, but the values below come from the held-out
evaluation rather than that refit.

| Estimate | Pair log loss | Pair accuracy | Grade agreement | High-grade severe errors |
| --- | ---: | ---: | ---: | ---: |
| Score-based model | 0.5005 | 0.7461 | **0.8782** | **3.85%** |
| RankNet trained from comparative judgments | 0.3503 | 0.8303 | 0.6868 | 34.97% |
| RankNet adjustment to the score-based ordering | **0.3482** | **0.8348** | 0.7260 | 30.42% |

The larger experiment confirms that the model judge's decisions contain a
strong and learnable signal. Both RankNet estimates predicted those decisions
better than the score-based model. They did not reconstruct the
human grades as well, particularly at the high end. RankNet is therefore a
stable model of the judge's comparative choices, while disagreement between
those choices and human grades remains part of the evidence.

The validation log loss improved as the fit budget grew from 25 to 100 percent,
but the uncertainty interval for the final increase included zero. The result
does not establish that acquiring more pairs would improve the learned signal.

## Current Scorer Comparison

The subsequent full train/test evaluation kept embeddings, transparent
features, and linear RankNet separate until final combination. Embeddings-only
reached 0.7498 grade agreement on all 2,567 official-test essays. Linear
RankNet reached 0.6561. Their three-way combination reached 0.7510 and reduced
average and severe error, while increasing high-grade severe errors. The
comparison supports examining several outcomes rather than treating one
aggregate statistic as a decision.

## Interpretation

The next question concerns the comparative decisions themselves. Gemma was
least aligned with human grades around 2.0 to 2.5, while its middle and upper
comparisons were more stable overall. A small prompt comparison can test
whether clearer second-language writing criteria improve that lower region
without obscuring performance elsewhere. It should report the evidence by
score region and leave every conclusion, later trial, and acquisition decision
to human assessment.

The complete retained analysis is recorded in HuleEdu revision
[`f3115b95daaeb7f562abaf6ba786a140a21cf54f`](https://github.com/paunchygent/huleedu/blob/f3115b95daaeb7f562abaf6ba786a140a21cf54f/docs/reference/ref-hule-research-ellipse-cj-inductive-ranknet-and-fusion-experiment-synthesis-ellipse-cj-inductive-ranknet-and-fusion-experiment-synthesis.md).
