## Research Question

Comparative judgment records which of two essays a model judge considers
better. RankNet asks whether those decisions contain a stable pattern that can
be learned from essay representations and applied to new essays. Grade
agreement asks a separate question: whether the learned ordering matches the
human scores.

<span id="full-acquisition-result"></span>

## Current Acquired Evidence

The current research pool contains 50,000 unordered comparative-judgment pairs
across 5,470 ELLIPSE essays. Each pair was judged in both A/B orientations,
giving 100,000 model-judge decisions. The first acquisition supplied 25,000
pairs and a later adaptive acquisition supplied another 25,000.

### Held-Out Result From the First Acquisition

The held-out metrics below come from the first 25,000-pair snapshot. Its pair
evaluation contained 1,650 held-out pairs. The first-stage final refit used all
25,000 pairs, but the values below come from the held-out evaluation rather
than that refit. They do not describe a fresh held-out evaluation of the full
50,000-pair pool.

| Estimate | Pair log loss | Pair accuracy | Grade agreement | High-grade severe errors |
| --- | ---: | ---: | ---: | ---: |
| Score-based model | 0.5005 | 0.7461 | **0.8782** | **3.85%** |
| RankNet trained from comparative judgments | 0.3503 | 0.8303 | 0.6868 | 34.97% |
| RankNet adjustment to the score-based ordering | **0.3482** | **0.8348** | 0.7260 | 30.42% |

That first-stage experiment confirms that the model judge's decisions contain a
strong and learnable signal. Both RankNet estimates predicted those decisions
better than the score-based model. They did not reconstruct the
human grades as well, particularly at the high end. RankNet is therefore a
stable model of the judge's comparative choices, while disagreement between
those choices and human grades remains part of the evidence.

The validation log loss improved as the fit budget grew from 25 to 100 percent,
but the uncertainty interval for the final increase included zero. The result
does not establish that acquiring more pairs would improve the learned signal.

## Interpretation

The next question concerns the comparative decisions themselves. Gemma was
least aligned with human grades around 2.0 to 2.5, while its middle and upper
comparisons were more stable overall. A small prompt comparison can test
whether clearer second-language writing criteria improve that lower region
without obscuring performance elsewhere. It should report the evidence by
score region and leave every conclusion, later trial, and acquisition decision
to human assessment.

The [current scorer evidence](/evidence/current-essay-scorers/) places this
result beside the official whitebox and embeddings evaluation. The
[public research-code browser](/code/) and
[Codeberg repository](https://codeberg.org/paunchygent/huleedu-research-code)
provide the corresponding public source.
