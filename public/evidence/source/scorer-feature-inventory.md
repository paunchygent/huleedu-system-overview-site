# Production scorer features

The accepted registry defines two scalar recipes. The transparent scorer uses
30 named scalar values. The hybrid scorer uses 36 named scalar values together
with 768 embedding coordinates. Twenty-four scalars are common to both
recipes; six occur only in the transparent scorer and twelve only in the
hybrid scorer.

## Production feature inventory

| scorer | accepted identity | scalar values | embedding coordinates | total inputs |
| --- | --- | ---: | ---: | ---: |
| transparent | `handcrafted.current.v1` | 30 | 0 | 30 |
| embeddings only | `embeddings.primary.v1` | 0 | 768 | 768 |
| hybrid | `combined.current.v1` | 36 | 768 | 804 |

Four named scalars use the same language-model runtime that produces the
embedding: sentence-similarity variance and the three prompt-relevance
measures. They remain scalar values with stated meanings. The other scalar
families use error ledgers, lexical statistics, parsers, discourse analysis,
and published word norms.

## The current scalar values

| Evidence family | What the scalar measures | Registry name | Transparent | Hybrid |
| --- | --- | --- | :---: | :---: |
| Correction and error | Grammar errors per 100 words | `grammar_errors_per_100_words` | yes | yes |
| Correction and error | Applied non-core spelling issues per 100 words | `non_core_spelling_issues_per_100_words` | yes | — |
| Correction and error | Applied core-L2 spelling issues per 100 words | `core_l2_spelling_issues_per_100_words` | yes | — |
| Correction and error | Applied total spelling issues per 100 words | `final_spelling_issues_per_100_words` | — | yes |
| Correction and error | Punctuation errors per 100 words | `punctuation_errors_per_100_words` | yes | yes |
| Readability | SMOG readability | `smog` | yes | yes |
| Readability | Coleman–Liau readability | `coleman_liau` | yes | yes |
| Readability | Automated Readability Index | `ari` | yes | yes |
| Readability | Average sentence length | `avg_sentence_length` | yes | yes |
| Lexical diversity | Type-token ratio | `ttr` | yes | yes |
| Length | Word count | `word_count` | yes | yes |
| Length | Average word length | `avg_word_length` | yes | yes |
| Syntax | Average parse-tree depth | `parse_tree_depth` | yes | yes |
| Syntax | Passive construction rate | `passive_ratio` | yes | yes |
| Syntax | Average dependency distance | `dep_distance` | yes | yes |
| Semantic coherence | Variation in similarity between sentences | `sent_similarity_variance` | yes | yes |
| Prompt relevance | Similarity between the essay and its prompt | `prompt_similarity` | yes | yes |
| Prompt relevance | Similarity between the introduction and the prompt | `intro_prompt_sim` | yes | yes |
| Prompt relevance | Lowest paragraph relevance to the prompt | `min_para_relevance` | yes | yes |
| Complex noun phrases | Procedural or event-headed complex noun phrases | `procedural_or_event_head_complex_np_density_log1p` | yes | yes |
| Discourse structure | Internal same-unit relations in the discourse tree | `tier3_rst_gum_primary_tree_same_unit_internal_rate` | yes | — |
| Discourse structure | Satellite relations in the discourse tree | `tier3_rst_gum_primary_tree_satellite_relation_rate` | yes | yes |
| Clause complexity | Dependent clauses per T-unit | `dependent_clauses_per_t_unit` | yes | — |
| Clause complexity | Clauses per T-unit | `clauses_per_t_unit` | yes | — |
| Clause complexity | Words per T-unit | `words_per_t_unit` | yes | — |
| Clause complexity | Finite adverbial clauses per 100 words | `finite_advcl_per_100w` | — | yes |
| Clause complexity | Finite relative clauses per 100 words | `finite_relative_clause_per_100w` | — | yes |
| Clause complexity | Non-finite participial adverbial clauses per 100 words | `nonfinite_participial_advcl_per_100w` | — | yes |
| Clause complexity | Non-finite participial modifier clauses per 100 words | `nonfinite_participial_acl_per_100w` | — | yes |
| Lexical sophistication | P_Lex lambda | `p_lex_lambda` | yes | yes |
| Lexical sophistication | Advanced Guiraud index | `advanced_guiraud` | yes | yes |
| Word range | Mean log contextual diversity | `mean_log_contextual_diversity` | yes | yes |
| Word range | Mean contextual-diversity percentile | `mean_contextual_diversity_percent` | yes | yes |
| Word range | Coverage of the contextual-diversity norm | `contextual_diversity_coverage` | yes | yes |
| Lexical diversity | Moving-average type-token ratio, 50-word window | `mattr_50` | yes | yes |
| Word norms | Mean concreteness | `mean_concreteness` | — | yes |
| Word norms | Coverage of the concreteness norm | `concreteness_coverage` | — | yes |
| Word norms | Mean word prevalence | `mean_word_prevalence` | — | yes |
| Word norms | Coverage of the word-prevalence norm | `word_prevalence_coverage` | — | yes |
| Word norms | Mean lexical-decision response time | `mean_lexical_decision_rt_ms` | — | yes |
| Word norms | Coverage of the lexical-decision norm | `lexical_decision_rt_coverage` | — | yes |
| Complex noun phrases | Abstract noun phrases with a causal predicate | `abstract_np_with_causal_predicate` | — | yes |

The two prompt-relevance recipes use the same three scalar names but calculate
them differently. The transparent scorer uses a mean-centred comparison with
other prompts. The hybrid scorer retains the earlier raw contrastive version.

## How the most recent frozen hybrid used its inputs

The newest complete per-scalar analysis examines the frozen research hybrid
used in the August 2026 official-test study. That model has 805 inputs: 768
embedding coordinates and 37 scalars. The current accepted hybrid has 804
inputs: the same number of embedding coordinates and 36 scalars. It removes
the broad LanguageTool and L2 source-attribution predictors and retains one
cumulative applied total-spelling rate.

The analysis is not an XGBoost split-count table. It uses mean absolute
TreeSHAP, which measures how strongly the fitted five-model ensemble used each
input across its 5,042 training essays. TreeSHAP does not state how much
accuracy a feature caused or what would happen if the feature were removed.
The [complete 37-scalar table](/evidence/official-test-benchmark-feature-detail/#findings-and-interpretation)
reports every value.

Across all inputs, the 768 embedding coordinates account for 91.43% of summed
absolute attribution and the 37 scalars for 8.57%. Among the scalars,
`word_count` has the largest attribution (`0.052873`), followed by
`advanced_guiraud` (`0.018843`) and
`language_tool_spelling_errors_per_100_words` (`0.017286`). The prompt-
relevance family totals `0.000926`. These values describe that fitted model;
they are not a general ranking of what matters in writing.

No current 804-input split-count, gain, permutation, removal, or TreeSHAP table
has been produced. An older split-count table exists for a 68-essay Swedish
cohort and a 788-input historical model. Its population and recipe differ too
much for it to describe the current scorers.

## Where the current errors are

The official-test analysis directly measures the direction of the remaining
errors. Bias is prediction minus human score, so a positive value means that
the model predicted too high and a negative value means that it predicted too
low.

| Human-score band | Essays | Mean absolute error | Bias |
| --- | ---: | ---: | ---: |
| 1.0–2.0 | 225 | 0.3333 | +0.2400 |
| 4.0–5.0 | 425 | 0.3212 | -0.2435 |
| 4.5–5.0 | 68 | 0.4632 | -0.3897 |

The low-band predictions are therefore too high, and the high-band
predictions are too low. The error is strongest for the 68 essays scored 4.5
or 5.0. The [complete target-band table](/evidence/official-test-benchmark/#full-population-target-bands)
shows the corresponding results for every scorer arm.

## What the counterfactual tests add

The signed analysis found no general low-band mechanism in which length pushes
weak essays upward. Length's average contribution there was downward. A small
long, high-error subgroup did show local upward length pressure partly offset
by error evidence, so that pattern exists locally rather than as the general
cause of low-band overprediction. At the upper end, embeddings supplied the
main upward pressure, while error and correctness evidence was positive but
too small to close the remaining gap. Frequency, sophistication, and prompt
relevance did not explain the underprediction.

The counterfactual tests used held-out prompt folds. The embedding block
increased broad-high-versus-middle separation by `0.033` (95% interval
`[+0.014, +0.055]`) and exact-high separation by `0.079` (`[+0.031, +0.133]`).
Error and correctness evidence increased broad-high separation by `0.0030`
(`[+0.0008, +0.0055]`). Jointly changing the effective influence of all feature
families also improved high-band separation. None of these tests established
better overall RMSE or agreement.

Useful upper-end information therefore remains in the scorer's inputs, and
their current influence is not optimal for separating high-scoring essays from
the middle. Because the families changed jointly, the tests do not identify
one family as the cause. They also do not establish that length suppresses
error evidence or that lexical sophistication, correctness, or prompt
divergence individually causes the high-band underprediction.
