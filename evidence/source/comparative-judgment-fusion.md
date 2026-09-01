## Current Separated Late Fusion

The current experiment used one ELLIPSE writing task, with 282 essays in the
out-of-fold training cohort and 185 held-out essays. It combined three
independently produced estimates only after each method had assigned its own
score.

- The white-box estimate used the current 30 named scalar measures.
- The embeddings-only estimate used the 768-dimensional representation of the
  complete essay.
- The comparative-judgment estimate used a Bradley-Terry ranking derived from
  pairwise decisions by a model judge.

This design differs from the hybrid scorer. The current hybrid scorer combines
the 768 embedding dimensions and 36 scalar measures inside one fitted model.
The separated experiment instead preserves the white-box and embeddings-only
estimates as distinct inputs to the final calculation.

The comparative-judgment scale projection was fitted on the training cohort.
The held-out human scores were not used to produce any component. The equal
combination used fixed weights, while the learned combination selected
non-negative weights from the out-of-fold training predictions.

## Results

| Estimate | QWK | MAE | RMSE | Exact | Within half a point | Errors of at least one point |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Embeddings only | 0.8118 | 0.2676 | 0.3976 | 0.5135 | 0.9514 | 9 |
| White-box | 0.7306 | 0.3486 | 0.4807 | 0.4108 | 0.8973 | 19 |
| Comparative judgment | 0.7537 | 0.2865 | 0.4027 | 0.4649 | 0.9622 | 7 |
| Equal three-way combination | 0.8124 | 0.2486 | 0.3676 | 0.5243 | 0.9784 | 4 |
| Learned three-way combination | 0.8105 | 0.2378 | 0.3639 | 0.5514 | 0.9730 | 5 |

The equal combination preserved essentially the same overall agreement as the
embeddings-only estimate. It reduced average error, raised the number of
essays within half a point from 176 to 181, and reduced errors of at least one
point from nine to four. The learned combination produced the lowest MAE and
RMSE, although its QWK was slightly lower than the embeddings-only estimate.

The main result is therefore greater stability without merging the three
sources of evidence inside one model. Their final weights and their individual
estimates remain available for inspection.

## Comparison Cost

The comparative-judgment estimate required 3,000 pairwise decisions for the
185 held-out essays. It added useful information for this cohort, but the same
direct method requires a substantial new comparison graph for each new cohort.

## Evidence Identity

The retained experiment is
`output/essay_scoring/story50_current_embeddings_whitebox_cgs_fusion_20260828`.
Its report SHA-256 is
`5b6eb68edc3969205c790bd9301a05915372fd0a00f4962b4e54c5038f2ab4a6`,
its summary SHA-256 is
`45cf85f020b5c5e1c46f434d14bffc4f8de78b6624c243fa3292b2a2ccd62df7`,
and its held-out row SHA-256 is
`e5ef402218c88dece17ddf5ea6971b2d79226508ab2c1db61b31112c848eb7f5dc`.

The result is recorded in the HuleEdu research reference at source revision
`3ffeb7353c715faaf3b7897b4a38a46081bbba9e`.
