---
type: reference
id: REF-HULE-RESEARCH-ellipse-frozen-scorer-benchmark-against-choi-et-al-2026-PART-01
title: Raw-inclusive hybrid scalar attribution inventory
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
inventory for the frozen Task 43 raw-inclusive hybrid. The root reference owns
the benchmark claim, component-head performance, family totals, mapping
contrast, population stability, and external comparison. This part owns only
the 37 scalar rows and their measured overlap on the fixed 5,042-row training
matrix.

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

## Evidence Gaps And Follow-Up

No matched per-feature removal fits were run. They were outside Task 03 and
would add 37 post-hoc model-selection comparisons. The three declared reduced
heads and the root reference's family attribution are the bounded component
evidence for this story.
