# Production scorer feature inventory

Source record:
`docs/reference/ref-hule-general-task-0810-production-essay-scoring-feature-state-task-0810-production-essay-scoring-feature-state.md`
at HuleEdu revision `c9d8b6ef60c19bbbdb17b9b46243ab4abfce35bb`.

## Production Feature Inventory

The accepted scorer registry records three different feature surfaces. The
transparent and hybrid scorers do not use the same scalar set.

| surface | accepted identity | scalar count | embedding count | current composition |
| --- | --- | ---: | ---: | --- |
| pure feature scorer | `handcrafted.current.v1` | 31 | 0 | Includes both accepted RST rates and the three selected T-unit metrics. |
| embeddings scorer | `embeddings.primary.v1` | 0 | 768 | Contains no linguistic scalar features. |
| hybrid scorer | `combined.current.v1` | 38 | 768 | Includes the satellite-relation rate and four selected parser-clause rates in its scalar component. |

The source record resolves schema identity and membership from the accepted
registry. The counts describe the production feature surfaces, not a claim
that every feature contributes equally to a prediction.
