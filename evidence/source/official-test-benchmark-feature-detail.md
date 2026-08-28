---
type: reference
id: REF-HULE-RESEARCH-ellipse-frozen-scorer-benchmark-against-choi-et-al-2026-PART-01
title: Raw-inclusive hybrid feature-mechanism inventory
repository: huleedu
owners:
  - kind: service
    id: huleedu
created: '2026-08-26'
root: REF-HULE-RESEARCH-ellipse-frozen-scorer-benchmark-against-choi-et-al-2026
part: 1
---

## Research Purpose And Boundary

This part preserves the individual scalar attribution and correlation
inventory plus the held-out signed feature-mechanism continuation for the
frozen Task 43 raw-inclusive hybrid. The root reference owns the benchmark
claim, component-head performance, headline mechanism findings, mapping
contrast, population stability, and external comparison. This part owns the 37
scalar rows and their measured overlap on the fixed 5,042-row training matrix,
then the detailed scalar/family pressure and residual evidence on the retained
2,567-row official test.

Mean absolute TreeSHAP measures use by the existing nonlinear ensemble. The
Pearson values measure association. Neither quantity is an additive QWK
contribution, causal effect, or feature-removal result.

## Evidence And Sources

- Canonical component result:
  `.orchestration/context/sessions/01a02917-0817-773e-90d4-43870e2002b7/evidence/task-hule-20-44-03/component-audit-result-v3.json`,
  SHA-256
  `79e9f8c1d17ec6fa36e3d035cf620d0468462b8190628bc4cd6383733f185bbb`.
- Ordered scalar inventory:
  `.orchestration/context/sessions/01a02917-0817-773e-90d4-43870e2002b7/evidence/task-hule-20-44-03/scalar-features-v3.jsonl`,
  SHA-256
  `111b11ea70c85ccaa8f68744aad17ffcfed5ce8205b0f35be82f1aeb35c3166e`.
- Population: the fixed 3,479 base plus 1,563 candidate training rows used by
  the frozen raw-inclusive hybrid.
- Attribution: member-averaged TreeSHAP from the five frozen 805-column hybrid
  models. Its ensemble reconstruction maximum absolute error is `0.00000477`.
- Correlation: Pearson correlation on the same 5,042 rows. `Max |r|` is the
  maximum absolute correlation between one scalar and any one of the 768
  embedding coordinates.
- Held-out continuation:
  `.orchestration/context/sessions/01a02917-0817-773e-90d4-43870e2002b7/evidence/task-hule-20-44-03/feature-mechanism-summary-v1.json`,
  SHA-256
  `233444d0307a842da56488f943a72dd7a86703e3a2c1e436310a8acfefa05723`.
  The complete 275-row estimates SHA-256 is
  `42e2a0529fe7d0c276c8ecb462814c391bb0bb37159bdcd6032021395a09ecc9`;
  the 2,567-row scalar-value/contribution/residual join SHA-256 is
  `2d80a8a5941f4e1844cecad25ef78c45cf70e9cf4ce2cbcfb4e95eed40742788`.

## Findings And Interpretation

Four scalar features share the accepted DeBERTa runtime lineage:
`sent_similarity_variance`, `prompt_similarity`, `intro_prompt_sim`, and
`min_para_relevance`. The remaining 33 scalars do not consume that embedding
runtime.

| Construct family                      | Scalar feature                                       | Mean absolute TreeSHAP | Max \|r\| |
| ------------------------------------- | ---------------------------------------------------- | ---------------------: | --------: |
| Correction/error                      | `grammar_errors_per_100_words`                       |               0.001296 |     0.500 |
| Correction/error                      | `language_tool_spelling_errors_per_100_words`        |               0.017286 |     0.660 |
| Correction/error                      | `final_spelling_issues_per_100_words`                |               0.002690 |     0.678 |
| Correction/error                      | `punctuation_errors_per_100_words`                   |               0.000000 |     0.281 |
| Readability                           | `smog`                                               |               0.000183 |     0.329 |
| Readability                           | `coleman_liau`                                       |               0.001813 |     0.584 |
| Readability                           | `ari`                                                |               0.003098 |     0.383 |
| Readability                           | `avg_sentence_length`                                |               0.001825 |     0.428 |
| Lexical statistics                    | `ttr`                                                |               0.000103 |     0.660 |
| Length                                | `word_count`                                         |               0.052873 |     0.378 |
| Length                                | `avg_word_length`                                    |               0.001016 |     0.591 |
| Syntax                                | `parse_tree_depth`                                   |               0.000403 |     0.472 |
| Syntax                                | `passive_ratio`                                      |               0.000367 |     0.218 |
| Syntax                                | `dep_distance`                                       |               0.000984 |     0.424 |
| Semantic coherence, embedding-derived | `sent_similarity_variance`                           |               0.000377 |     0.161 |
| Prompt relevance, embedding-derived   | `prompt_similarity`                                  |               0.000761 |     0.305 |
| Prompt relevance, embedding-derived   | `intro_prompt_sim`                                   |               0.000165 |     0.240 |
| Prompt relevance, embedding-derived   | `min_para_relevance`                                 |               0.000000 |     0.286 |
| Complex nominal                       | `procedural_or_event_head_complex_np_density_log1p`  |               0.000095 |     0.264 |
| RST relation                          | `tier3_rst_gum_primary_tree_satellite_relation_rate` |               0.001632 |     0.332 |
| Clause rates                          | `finite_advcl_per_100w`                              |               0.000885 |     0.259 |
| Clause rates                          | `finite_relative_clause_per_100w`                    |               0.000128 |     0.234 |
| Clause rates                          | `nonfinite_participial_advcl_per_100w`               |               0.000321 |     0.205 |
| Clause rates                          | `nonfinite_participial_acl_per_100w`                 |               0.000000 |     0.172 |
| Frequency/sophistication              | `p_lex_lambda`                                       |               0.000175 |     0.423 |
| Frequency/sophistication              | `advanced_guiraud`                                   |               0.018843 |     0.487 |
| Word-range dispersion                 | `mean_log_contextual_diversity`                      |               0.000213 |     0.466 |
| Word-range dispersion                 | `mean_contextual_diversity_percent`                  |               0.000000 |     0.496 |
| Word-range dispersion                 | `contextual_diversity_coverage`                      |               0.000000 |     0.352 |
| Moving-average lexical diversity      | `mattr_50`                                           |               0.000000 |     0.566 |
| Concreteness                          | `mean_concreteness`                                  |               0.000390 |     0.461 |
| Concreteness                          | `concreteness_coverage`                              |               0.000511 |     0.304 |
| Word prevalence                       | `mean_word_prevalence`                               |               0.000231 |     0.257 |
| Word prevalence                       | `word_prevalence_coverage`                           |               0.000507 |     0.283 |
| Lexical decision                      | `mean_lexical_decision_rt_ms`                        |               0.000728 |     0.424 |
| Lexical decision                      | `lexical_decision_rt_coverage`                       |               0.002162 |     0.252 |
| Causal-predicate complex nominal      | `abstract_np_with_causal_predicate`                  |               0.000376 |     0.244 |

No scalar is constant, and no two scalar columns are exact duplicates. Eight
scalar pairs have absolute Pearson correlation at least `0.8`:

| Scalar pair                                                                           |      r |
| ------------------------------------------------------------------------------------- | -----: |
| `ari` / `avg_sentence_length`                                                         |  0.988 |
| `mean_log_contextual_diversity` / `mean_contextual_diversity_percent`                 |  0.953 |
| `coleman_liau` / `avg_word_length`                                                    |  0.945 |
| `concreteness_coverage` / `word_prevalence_coverage`                                  |  0.936 |
| `language_tool_spelling_errors_per_100_words` / `final_spelling_issues_per_100_words` |  0.935 |
| `ari` / `parse_tree_depth`                                                            |  0.833 |
| `avg_sentence_length` / `parse_tree_depth`                                            |  0.832 |
| `p_lex_lambda` / `mean_log_contextual_diversity`                                      | -0.813 |

The high correlations include shared denominators and overlapping constructs,
but correlation alone does not establish that one feature is removable. The
TreeSHAP values likewise describe the fitted ensemble on this matrix; they do
not report performance after removing a feature.

## Held-Out Signed Attribution And Residual Alignment

The continuation reuses the five frozen historical 805-column members on the
retained official-test matrix. The then-current Task 44 806-column source contained
`l2_dictionary_corrections_per_100_words`; the projection omits it only because
the historical learner never received it. TreeSHAP reconstructs the ensemble
within `0.00000572`, and the recomputed ensemble differs from the retained raw
predictions by at most `0.00000024`. The common base value is `3.178818`.

The target strata contain 2,567 full, 225 low, 1,917 mid, 425 broad-high, and
68 exact-high rows. Every named scalar and accepted family retains support,
mean signed and absolute contribution, percentile 95% intervals from 2,000
deterministic row-bootstrap replicates, tail-minus-mid differences, and raw and
mapped residual alignment. These are descriptive intervals, not
prompt-clustered population inference. Signed values below are grade-scale
prediction pressure relative to the model base value.

| Feature or accepted family          |      Full | Low 1.0-2.0 | Mid 2.5-3.5 | Broad high 4.0-5.0 | Exact high 4.5-5.0 |
| ----------------------------------- | --------: | ----------: | ----------: | -----------------: | -----------------: |
| DeBERTa embedding family            | -0.021648 |   -0.802622 |   -0.067613 |          +0.599137 |          +0.916769 |
| `word_count`                        | -0.013093 |   -0.034154 |   -0.016584 |          +0.013804 |          +0.025033 |
| Length statistics                   | -0.013195 |   -0.034613 |   -0.016719 |          +0.014041 |          +0.025615 |
| Correction and error rates          | -0.004429 |   -0.016542 |   -0.006222 |          +0.010068 |          +0.013411 |
| Frequency and sophistication        | -0.008734 |   -0.011005 |   -0.010266 |          -0.000625 |          +0.013919 |
| Prompt relevance, embedding-derived | -0.000010 |   +0.000251 |   -0.000019 |          -0.000108 |          -0.000194 |

Low-band length pressure is downward on average, despite raw overprediction of
`+0.341438`. The low-minus-mid length-family difference is `-0.018060`, 95%
interval `[-0.026573, -0.009887]`. Length is positive on 39.1% of low rows;
within those rows, error pressure is negative in 81.8% but fully offsets length
in 31.8%. The longest/high-error low cell (`n=39`) has length `+0.043579`,
error `-0.020855`, joint pressure `+0.022725`, and raw residual `+0.379217`.
This is a bounded local length-overpressure pattern, not an aggregate low-band
explanation.

Broad-high and exact-high raw residuals are `-0.291574` and `-0.436538`;
332/425 and 64/68 rows are underpredicted. Frequency/sophistication is nearly
neutral in broad-high and small positive in exact-high. Correction/error
pressure is positive in both high views, not downward, but too small to close
the residual. Prompt-relevance pressure is negligible and slightly downward,
with both intervals crossing zero. Embeddings supply the main upward pressure,
yet the final raw predictions remain low.

“Overweighted” and “underweighted” are residual-alignment interpretations here,
not causal weight estimates. TreeSHAP does not show what a refit, feature
removal, or different loss would do. The three-by-three word-count/error table
reports observed main-effect cells only; no 805-by-805 or 806-by-806 SHAP
interaction tensor was computed.

## Evidence Gaps And Follow-Up

No matched per-feature removal fits were run. They were outside Task 03 and
would add 37 post-hoc model-selection comparisons. The three declared reduced
heads and the root reference's family attribution are the bounded component
evidence for this story.
