---
type: reference
id: REF-HULE-RESEARCH-ellipse-frozen-scorer-benchmark-against-choi-et-al-2026
title: ELLIPSE frozen scorer benchmark against Choi et al. 2026
repository: huleedu
owners:
  - kind: service
    id: huleedu
created: '2026-08-25'
status: active
reference_kind: research
summary: Full-population frozen-scorer results with sealed continuity, subgroup decomposition, and an explicit protocol-difference ledger against Choi et al. 2026.
---

## Research Purpose And Boundary

This reference reports the predeclared Story 20-44 evaluation of two frozen
ELLIPSE scorer arms in the whitebox and hybrid lanes, plus their fixed
equal-weight late fusions. It asks whether the frozen scorers retain their
performance when the inherited prompt and 200-to-1,000-word filters are
removed, while excluding four source rows below the accepted 50-alphabetic-
token essay boundary.

The comparison is to the ELLIPSE Overall QWK `0.726` reported by Choi et al.
in Table 8 of *Enhancing Automated Essay Scoring With Three Techniques:
Two-Stage Fine-Tuning, Score Alignment, and Self-Training*, IEEE Access 14
(2026), DOI `10.1109/ACCESS.2026.3718177`. The comparison is descriptive.
It does not select a model, change a frozen scorer, authorize production use,
or claim a protocol-identical replication.

## Evidence And Sources

- The predeclared protocol was retained at
  `.orchestration/context/sessions/01a02917-0817-773e-90d4-43870e2002b7/evidence/task-hule-20-44-02/evaluation-protocol-v1.json`
  at `2026-08-25T20:16:28Z`, SHA-256
  `92f9e02f66a32a245597a8a289031481f4a5f8c45e670fe2806dd277f5b82b97`,
  before any full-population metric was computed.
- The four 2,567-row prediction files and their common row order are bound by
  `full-prediction-manifest.json`, file SHA-256
  `f10154bb5f3aca2af0c3ef8b0aa3d5e40ab0441660bc98e668e87a179865a97e`
  and ordered-record digest
  `4da3c55c22d8b2a43d1dce9cce47aa8ee04c7407b8f29c7a32b25047d28c239a`.
- The population manifest SHA-256 is
  `67b37d94aa5bedec811cb4f88d50e0fd56b817c99a562f0d1c73fabda383c601`.
  It admits 2,259 sealed rows and 308 extension rows: 138 excluded-prompt,
  120 short, and 50 long rows. Source indices `361`, `1278`, `1589`, and
  `2446` are excluded because they contain only 25-46 alphabetic tokens.
- The one-pass result is retained at
  `.orchestration/context/sessions/01a02917-0817-773e-90d4-43870e2002b7/evidence/task-hule-20-44-02/evaluation-v1.json`,
  SHA-256
  `daa09380618dd1612d7a95b747b50825d9999cc64151c91d1d90f68acac143cd`.
  Its compact one-off evaluator has SHA-256
  `e5aba8a2eca504d7030f6aef51c36d7e30a07c750ac194020d0a494782adb6f2`.
  A second invocation over the same inputs produced byte-identical output.
- The sealed view exactly reproduced the retained Task 43 QWK, MAE, and
  adjacent-agreement values for all four shared cells. The four pinned Task 43
  metric-file digests are recorded in the result.
- The post-benchmark component protocol was committed at `ff2d8e55a` before
  fitting. Its canonical result is retained at
  `.orchestration/context/sessions/01a02917-0817-773e-90d4-43870e2002b7/evidence/task-hule-20-44-03/component-audit-result-v3.json`,
  SHA-256
  `79e9f8c1d17ec6fa36e3d035cf620d0468462b8190628bc4cd6383733f185bbb`.
  The 37-row scalar inventory SHA-256 is
  `111b11ea70c85ccaa8f68744aad17ffcfed5ce8205b0f35be82f1aeb35c3166e`.
  The exact fit-driver SHA-256 is
  `f054bdb70447d5e8432384de8793ef5e4e22c7af3eba0afaad067576d82e384b`;
  the post-freeze continuation SHA-256 is
  `0bb4f0e26e1d64ec4f13987fc2a8c3c54ea3e996fc4435b4ec196b5d08e43388`.
- The embeddings, 37-scalar, and 33-scalar freeze-manifest SHA-256 values are,
  respectively,
  `cb2006ae3d51b860fefdfa6c7391085a1f9b428e1a4c1a66826bc3452a556925`,
  `a91a46abfa298bd667c46c30224e2c9c4f1b6015d4d6088e64611d40cb5edf95`,
  and `70a4e9c1892bb1fd5b50a931be01924ea9e8cb7c163ba5527cecec2584e1524f`.
  Each binds five model-member digests and the exact feature-name projection.
- External protocol facts come from the retained direct PDF extraction
  `evidence/planning-fair-ellipse-benchmark/choi-2026-protocol.md` and the
  primary public-release reconciliation
  `ellipse-official-split-external-sources.md`. The public ELLIPSE CSVs contain
  3,911 train rows and 2,571 test rows. The papers state that they use the
  official test set but do not print the numeric split sizes; matching their
  test population to 2,571 is therefore a well-supported inference from the
  exact 6,482-row corpus match and official-split statement.

## Findings And Interpretation

### Benchmark claim

On the declared 2,567-row construct-admitted projection, raw-inclusive hybrid
QWK was `0.7563`, compared with the Choi et al. ELLIPSE Overall cell `0.726`.
The numerical difference is `0.0303`. It is a descriptive comparison, not a
superiority, significance, or protocol-identical claim. This experiment
excludes four sub-50-token source rows and differs in training population,
target structure, model architecture, refitting, and input handling. The
fixed equal-weight fusion had full-population QWK `0.7118` for raw base and
`0.7235` for raw inclusive.

### Raw-inclusive hybrid architecture and provenance

`Raw-inclusive` names the training arm, not an embedding adaptation. Its
fitting population is the 3,479-row base population plus 1,563 recovered
candidate essays, for 5,042 final-fit rows. The base-only arm uses the same
architecture on 3,479 rows. Both arms use the same unadapted pretrained
`microsoft/deberta-v3-base` encoder at model and tokenizer revision
`8ccc9b6f36199bec6961081d44eb72fb3f7353f3`. The current path has no LoRA,
supervised transformer fine-tuning, cross-fitted encoder, or chunk-embedding
aggregation.

The encoder receives normalized source text, truncates one model input to 512
tokens, averages the final four hidden layers, and then takes an
attention-mask-weighted token mean. It emits 768 float32 coordinates. This is
the raw pretrained encoder path; it is distinct from the historical Story 07
LoRA-adapted, cross-fitted DeBERTa representations.

The `combined.current.v1` source matrix contains those 768 coordinates followed
by 38 scalar features. Four suffix scalars also derive from the accepted
DeBERTa runtime: sentence-similarity variance, essay/prompt similarity,
intro/prompt similarity, and minimum paragraph relevance. The other scalar
families use their declared text-analysis paths. Task 43 fitted the frozen
hybrid on its recorded 805-column research projection: 768 embedding
coordinates plus 37 scalar columns. That projection omitted
`l2_dictionary_corrections_per_100_words` for the historical experiment; it
does not remove the feature from the 806-column accepted source registry or
from future scorer work.

The fitted head is one early-fusion XGBoost regression ensemble, not a mean of
separately trained embedding and linguistic scorers. Its recipe is
`reg:squarederror`, depth 4, learning rate `0.03`, minimum child weight 20,
L2 regularization 2, no L1 regularization, full row and column sampling, at
most 1,500 rounds, and 100-round early stopping. Five fixed prompt-holdout
folds validate only the 3,479 base rows; eligible candidate rows augment fold
training by prompt. Square-root inverse-frequency grade weights are capped at
3\. Final fitting uses seeds 42-46 and 235 rounds, derived from the five fold
best iterations.

The ensemble mean is the raw prediction. The frozen split-tail calibration
then clips to 1-5, bins against its OOF-derived cutpoints, and emits one of the
nine half-grade values. The two 50/50 fusion cells are different: they average
the whitebox and hybrid raw predictions, then apply nearest-half mapping once.
No official-test result selected or adjusted either mapping.

### Training and test separation

The 3,479 base rows come from the retained training-side accepted generation.
The 1,563 recovered candidates are training augmentation only. Their producer
excluded normalized-text matches against all 2,571 raw official-test rows, so
exact content overlap under that normalization is ruled out. Candidate rows
enter an OOF fold only when their prompt is not the held-out prompt. Final
Task 43 fitting froze model membership, rounds, and calibration before its
official-test prediction step. Task 03 likewise fits and freezes all reduced
heads before reading the Task 44 full-population matrices or targets.

This supports train/test content separation and within-run freeze chronology.
It does not establish that the official test was a pristine, globally
single-use confirmation set. The test has been evaluated in earlier governed
experiments, candidate IDs do not retain a complete source-row crosswalk, and
the retained evidence cannot prove that every historical architecture choice
was independent of prior test observations. No one-use or selection-
independence claim is made here.

### Matched raw-inclusive component diagnostics

Task 03 fitted three reduced heads after the six-cell benchmark was complete.
Each uses the same 5,042 fitting rows, 3,479 base-row prompt-holdout OOF
validation positions, training recipe, weights, five seeds, and split-tail
mapping as the 805-column raw-inclusive hybrid. These are matched diagnostic
refits, not additive submodels inside the hybrid.

| Fitted head                  | Columns | OOF QWK | QWK delta | OOF MAE | MAE delta | >=1 |  >1 |
| ---------------------------- | ------: | ------: | --------: | ------: | --------: | --: | --: |
| Full hybrid reference        |     805 |  0.7490 |         - |  0.3211 |         - | 283 |  17 |
| Embeddings only              |     768 |  0.7335 |   -0.0155 |  0.3352 |   +0.0141 | 308 |  25 |
| Complete no-L2 scalar suffix |      37 |  0.6280 |   -0.1210 |  0.3971 |   +0.0760 | 534 |  83 |
| Non-embedding scalars        |      33 |  0.6309 |   -0.1181 |  0.3938 |   +0.0727 | 522 |  78 |

The following official-test view was opened only after all three reduced
heads and their 15 model members were frozen. Because Task 03 was requested
after the benchmark result existed, these values are descriptive and are not
model-selection evidence.

| Fitted head                  | Full QWK | QWK delta | Full MAE | MAE delta | Adjacent | >=1 |  >1 |
| ---------------------------- | -------: | --------: | -------: | --------: | -------: | --: | --: |
| Full hybrid reference        |   0.7563 |         - |   0.3041 |         - |    91.7% | 212 |   5 |
| Embeddings only              |   0.7474 |   -0.0090 |   0.3115 |   +0.0074 |    91.3% | 223 |   7 |
| Complete no-L2 scalar suffix |   0.6398 |   -0.1165 |   0.3983 |   +0.0943 |    84.4% | 400 |  52 |
| Non-embedding scalars        |   0.6386 |   -0.1177 |   0.3944 |   +0.0904 |    85.2% | 381 |  45 |

The embeddings-only head is `0.0155` OOF QWK and `0.0090` full-population
QWK below the full hybrid. Both scalar-only heads are about `0.118` to
`0.121` OOF QWK below it. Adding the four embedding-derived semantic scalars
to the 33 other scalars changes OOF and full-population QWK in opposite
directions. These refit differences do not assign causal or additive QWK
credit to any feature set; XGBoost can use interactions and substitute among
correlated inputs.

### Frozen-hybrid attribution, families, and overlap

The existing five-member 805-column hybrid was evaluated on its 5,042-row
training matrix with member-averaged TreeSHAP. Before attribution, all five
ordered model paths, seeds, and file SHA-256 values were matched to
`experiment-freeze.json`; each frozen member has SHA-256
`d0ea0b7bfcf96fb9012ab2fd1dd560bb983a1d07054aab7441b8d2ec77c5912e`.
The averaged contributions reconstruct the ensemble raw predictions with
maximum absolute error `0.00000477`. The table sums mean absolute TreeSHAP
within each accepted family. It measures model attribution on that matrix,
not independent QWK contribution. Family widths differ, so the 768-coordinate
embedding total is also not a per-feature comparison.

| Accepted construct family             | Features | Sum mean absolute TreeSHAP |
| ------------------------------------- | -------: | -------------------------: |
| DeBERTa mean-last-four embedding      |      768 |                   1.199600 |
| Frequency and sophistication          |        2 |                   0.019017 |
| Moving-average lexical diversity      |        1 |                   0.000000 |
| Concreteness norms                    |        2 |                   0.000901 |
| Lexical-decision norms                |        2 |                   0.002890 |
| Word-prevalence norms                 |        2 |                   0.000738 |
| Correction and error rates            |        4 |                   0.021273 |
| Length statistics                     |        2 |                   0.053890 |
| Lexical statistics                    |        1 |                   0.000103 |
| Readability and sentence length       |        4 |                   0.006918 |
| Prompt relevance, embedding-derived   |        3 |                   0.000926 |
| Semantic coherence, embedding-derived |        1 |                   0.000377 |
| Syntactic parse                       |        3 |                   0.001754 |
| Causal-predicate complex nominal      |        1 |                   0.000376 |
| Complex nominal density               |        1 |                   0.000095 |
| Clause rates                          |        4 |                   0.001334 |
| RST satellite relation                |        1 |                   0.001632 |
| Word-range dispersion                 |        3 |                   0.000213 |

The embedding family accounts for `1.199600` of the `1.312038` summed mean
absolute attribution (`91.43%`); all 37 scalar columns account for `8.57%`.
This is the fitted model's attribution distribution, not an accuracy share.

The complete 37-feature attribution table, scalar-to-embedding correlations,
and high-correlation scalar pairs are retained in the governed
[scalar attribution inventory](ref-hule-research-ellipse-frozen-scorer-benchmark-against-choi-et-al-2026-ellipse-frozen-scorer-benchmark-against-choi-et-al-2026-part-01.md).
That inventory also records embedding-derived lineage, constant-feature and
exact-duplicate checks, and the limits of interpreting association as
redundancy or causal contribution.

### Post-training grade-band mapping

The retained raw-inclusive OOF contrast applies two mappings to identical raw
predictions. Split-tail is the frozen selected mapping; sealed half-band is
plain nearest-half rounding.

| OOF mapping                |     QWK |     MAE | >=1 |  >1 |
| -------------------------- | ------: | ------: | --: | --: |
| Split-tail                 |  0.7490 |  0.3211 | 283 |  17 |
| Sealed half-band           |  0.7428 |  0.3094 | 240 |  15 |
| Split-tail minus half-band | +0.0062 | +0.0116 | +43 |  +2 |

On these 3,479 OOF rows, split-tail raises QWK by `0.006204` while increasing
MAE by `0.011641`, errors of at least one grade by 43, and errors larger than
one grade by two. This is a metric trade-off from terminal mapping only; the
underlying raw predictions are unchanged, and no official-test value selected
the cutpoints.

### Full 2,567-row result

Rates are percentages. `>=1` counts mapped errors of at least one grade;
`>1` counts errors larger than one grade.

| Declared cell          |    QWK |    MAE |   RMSE |   Bias | Exact | Adjacent | >=1 |  >1 |
| ---------------------- | -----: | -----: | -----: | -----: | ----: | -------: | --: | --: |
| Base whitebox          | 0.6438 | 0.3855 | 0.5314 | 0.0614 | 39.0% |    85.6% | 370 |  42 |
| Base hybrid            | 0.7435 | 0.3103 | 0.4458 | 0.0092 | 46.4% |    91.8% | 210 |   7 |
| Base 50/50 fusion      | 0.7118 | 0.3070 | 0.4385 | 0.0199 | 46.1% |    92.8% | 185 |   7 |
| Inclusive whitebox     | 0.6524 | 0.3792 | 0.5232 | 0.0438 | 39.3% |    86.4% | 348 |  39 |
| Inclusive hybrid       | 0.7563 | 0.3041 | 0.4419 | 0.0197 | 47.6% |    91.7% | 212 |   5 |
| Inclusive 50/50 fusion | 0.7235 | 0.3062 | 0.4391 | 0.0316 | 46.4% |    92.6% | 190 |   7 |

### Sealed 2,259-row continuity view

| Declared cell          |    QWK |    MAE |   RMSE |   Bias | Exact | Adjacent | >=1 |  >1 |
| ---------------------- | -----: | -----: | -----: | -----: | ----: | -------: | --: | --: |
| Base whitebox          | 0.6461 | 0.3869 | 0.5321 | 0.0664 | 38.9% |    85.3% | 331 |  34 |
| Base hybrid            | 0.7474 | 0.3072 | 0.4433 | 0.0151 | 46.8% |    92.0% | 180 |   7 |
| Base 50/50 fusion      | 0.7139 | 0.3070 | 0.4377 | 0.0224 | 46.0% |    92.8% | 162 |   5 |
| Inclusive whitebox     | 0.6545 | 0.3792 | 0.5231 | 0.0511 | 39.4% |    86.3% | 310 |  32 |
| Inclusive hybrid       | 0.7570 | 0.3035 | 0.4417 | 0.0250 | 47.8% |    91.8% | 186 |   5 |
| Inclusive 50/50 fusion | 0.7244 | 0.3066 | 0.4384 | 0.0347 | 46.3% |    92.7% | 166 |   5 |

All four non-fusion cells matched their retained Task 43 QWK, MAE, and
adjacent-agreement values exactly. The fusion cells were computed in this run
from the same sealed rows under the predeclared rule.

### Raw-inclusive hybrid population stability

The 308 restored rows changed the inclusive-hybrid aggregate only slightly.
The restored-only QWK is computed directly on those rows; it is not the
difference between the sealed and full QWKs, because QWK is non-additive.

| View          |     n |    QWK |    MAE |   RMSE |    Bias | Exact | Adjacent | >=1 |  >1 |
| ------------- | ----: | -----: | -----: | -----: | ------: | ----: | -------: | --: | --: |
| Sealed        | 2,259 | 0.7570 | 0.3035 | 0.4417 |  0.0250 | 47.8% |    91.8% | 186 |   5 |
| Full          | 2,567 | 0.7563 | 0.3041 | 0.4419 |  0.0197 | 47.6% |    91.7% | 212 |   5 |
| Restored only |   308 | 0.7102 | 0.3084 | 0.4432 | -0.0195 | 46.8% |    91.6% |  26 |   0 |

Full minus sealed was QWK `-0.0006588`, MAE `+0.0005986`, RMSE
`+0.0001793`, exact agreement `-0.1213` percentage points, and adjacent
agreement `-0.0249` points. Errors larger than one grade remained at five.
The result therefore supports near-flat aggregate performance under this
population extension. It does not imply that every restored subgroup has the
same error distribution as the sealed rows.

### Restored-population decomposition

| Declared cell          | Subgroup        |   n |    QWK |    MAE |   RMSE |    Bias | Exact | Adjacent | >=1 |  >1 |
| ---------------------- | --------------- | --: | -----: | -----: | -----: | ------: | ----: | -------: | --: | --: |
| Base whitebox          | Excluded prompt | 138 | 0.4719 | 0.3623 | 0.5178 | -0.1304 | 42.0% |    88.4% |  16 |   4 |
| Base whitebox          | Short           | 120 | 0.4012 | 0.4125 | 0.5496 |  0.1458 | 35.0% |    84.2% |  19 |   2 |
| Base whitebox          | Long            |  50 | 0.7232 | 0.3200 | 0.4899 |  0.1600 | 48.0% |    92.0% |   4 |   2 |
| Base hybrid            | Excluded prompt | 138 | 0.5571 | 0.3297 | 0.4682 | -0.1268 | 44.9% |    89.1% |  15 |   0 |
| Base hybrid            | Short           | 120 | 0.6505 | 0.3208 | 0.4449 |  0.0625 | 43.3% |    92.5% |   9 |   0 |
| Base hybrid            | Long            |  50 | 0.6963 | 0.3700 | 0.4950 | -0.0100 | 38.0% |    88.0% |   6 |   0 |
| Base 50/50 fusion      | Excluded prompt | 138 | 0.5444 | 0.2971 | 0.4504 | -0.1087 | 50.0% |    92.0% |  11 |   2 |
| Base 50/50 fusion      | Short           | 120 | 0.6092 | 0.3000 | 0.4233 |  0.1250 | 45.8% |    94.2% |   7 |   0 |
| Base 50/50 fusion      | Long            |  50 | 0.6734 | 0.3500 | 0.4743 |  0.0100 | 40.0% |    90.0% |   5 |   0 |
| Inclusive whitebox     | Excluded prompt | 138 | 0.4988 | 0.3514 | 0.4982 | -0.1341 | 42.0% |    89.9% |  14 |   3 |
| Inclusive whitebox     | Short           | 120 | 0.4076 | 0.4208 | 0.5572 |  0.0792 | 33.3% |    85.0% |  18 |   3 |
| Inclusive whitebox     | Long            |  50 | 0.6913 | 0.3600 | 0.5099 |  0.1200 | 42.0% |    88.0% |   6 |   1 |
| Inclusive hybrid       | Excluded prompt | 138 | 0.6387 | 0.2935 | 0.4361 | -0.0978 | 50.0% |    91.3% |  12 |   0 |
| Inclusive hybrid       | Short           | 120 | 0.6510 | 0.3333 | 0.4610 |  0.0667 | 42.5% |    90.8% |  11 |   0 |
| Inclusive hybrid       | Long            |  50 | 0.7957 | 0.2900 | 0.4183 | -0.0100 | 48.0% |    94.0% |   3 |   0 |
| Inclusive 50/50 fusion | Excluded prompt | 138 | 0.5850 | 0.2899 | 0.4299 | -0.1087 | 49.3% |    93.5% |   9 |   1 |
| Inclusive 50/50 fusion | Short           | 120 | 0.5875 | 0.3208 | 0.4587 |  0.1125 | 45.0% |    91.7% |  10 |   1 |
| Inclusive 50/50 fusion | Long            |  50 | 0.7492 | 0.3000 | 0.4472 |  0.0800 | 50.0% |    90.0% |   5 |   0 |

For the raw-inclusive hybrid cell, the excluded-prompt and short groups
have lower within-group QWK than the sealed view, while the long group does
not. Short rows have the largest subgroup MAE (`0.3333`). Excluded-prompt
rows show a negative bias (`-0.0978`); short rows show a positive bias
(`0.0667`). QWK is not additive across subgroups, so these values explain the
error shape but cannot be treated as weighted contributions to the full QWK.

### Full-population target bands

Low means targets 1.0-2.0 (`n=225`), broad high means 4.0-5.0 (`n=425`),
and exact high means 4.5-5.0 (`n=68`). Broad high contains exact high.

| Declared cell          | Band       |    MAE |    Bias | >=1 |  >1 |
| ---------------------- | ---------- | -----: | ------: | --: | --: |
| Base whitebox          | Low        | 0.5333 |  0.4711 |  67 |  10 |
| Base whitebox          | Broad high | 0.4318 | -0.3000 |  78 |  11 |
| Base whitebox          | Exact high | 0.4853 | -0.4412 |  14 |   2 |
| Base hybrid            | Low        | 0.3689 |  0.2933 |  32 |   0 |
| Base hybrid            | Broad high | 0.3882 | -0.2776 |  56 |   2 |
| Base hybrid            | Exact high | 0.4118 | -0.3382 |   9 |   1 |
| Base 50/50 fusion      | Low        | 0.4844 |  0.4711 |  42 |   3 |
| Base 50/50 fusion      | Broad high | 0.4141 | -0.3953 |  58 |   4 |
| Base 50/50 fusion      | Exact high | 0.5735 | -0.5735 |  16 |   2 |
| Inclusive whitebox     | Low        | 0.5044 |  0.4289 |  61 |   9 |
| Inclusive whitebox     | Broad high | 0.4529 | -0.3141 |  74 |  12 |
| Inclusive whitebox     | Exact high | 0.4706 | -0.4265 |  17 |   2 |
| Inclusive hybrid       | Low        | 0.3333 |  0.2400 |  28 |   0 |
| Inclusive hybrid       | Broad high | 0.3212 | -0.2435 |  48 |   2 |
| Inclusive hybrid       | Exact high | 0.4632 | -0.3897 |   8 |   1 |
| Inclusive 50/50 fusion | Low        | 0.4533 |  0.4222 |  38 |   4 |
| Inclusive 50/50 fusion | Broad high | 0.3788 | -0.3435 |  55 |   3 |
| Inclusive 50/50 fusion | Exact high | 0.5368 | -0.5368 |  13 |   2 |

The inclusive hybrid has the lowest low- and broad-high MAE, but the base
hybrid has lower exact-high MAE. This is descriptive tail evidence; it does
not alter the declared scorer set or frozen mapping.

### Protocol-difference ledger

| Dimension           | Choi et al. 2026                                                                                 | Story 20-44 evaluation                                                                                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test population     | Fixed official ELLIPSE test set; 2,571 rows inferred from the verified public split              | 2,567 construct-admitted rows from that source; four rows below 50 alphabetic tokens excluded                                                                                                        |
| Test targets        | Official ELLIPSE Overall target used as one jointly modeled trait                                | ADR-HULE-0046 two-rater Overall mean; one admitted extension target differs from the source split's `Overall`                                                                                        |
| Training population | Official 3,911-row train pool, repeatedly divided into train/dev                                 | Frozen raw base: 3,479 rows; frozen raw inclusive: 5,042 rows, including 1,563 recovered essays outside the official 3,911-row training release                                                      |
| Training objective  | Overall plus six analytic traits jointly; the Overall head consumes other trait representations  | Overall only                                                                                                                                                                                         |
| Aggregation         | Mean test result over ten train/dev refits; no Overall-cell SD published                         | One frozen scorer per cell, internally a fixed five-seed ensemble; one evaluation pass                                                                                                               |
| Input handling      | BERT-CNN truncated to 512 tokens and BERT-TransEnc capped at 60 sentences                        | Full source text enters the feature pipeline; the DeBERTa embedding branch and four embedding-derived scalars use a 512-token model input, while other scalar families use their declared text paths |
| Mapping and QWK     | Inverse-normalize, round to nearest valid 1-5 score, quadratic QWK                               | Frozen scorer cells use OOF-derived split-tail half-grade calibration; fusion averages raw predictions then maps to the nearest half grade; quadratic QWK uses nine categories                       |
| Compared number     | Table 8 `Ovrl` cell `0.726` for `+LoRA+SA`; the prose highlights the seven-trait average `0.664` | Raw-inclusive hybrid QWK `0.7563`; the predeclared equal fusion is `0.7235`                                                                                                                          |

The ledger explains why the numeric comparison is informative but not a
controlled replication. In particular, the four-row construct exclusion and
different training targets prevent an identical-protocol claim.

## Evidence Gaps And Follow-Up

- Choi et al. do not publish an Overall-cell standard deviation, and this work
  evaluates one frozen scorer per cell. No inferential significance claim can
  be made for the `0.0303` QWK difference.
- The papers do not print the ELLIPSE train/test counts. The 3,911/2,571 split
  is verified from the primary public release and inferred to be their split
  from their exact 6,482-row corpus match and explicit official-test statement.
- The four excluded rows prevent a result for the literal full 2,571-row
  source. Supporting those fragments would require changing the frozen
  MATTR-50 feature construct and is outside this story.
- Subgroup supports are small and subgroup QWK is non-additive. The subgroup
  tables describe where errors occur; they do not establish causal prompt- or
  length-specific effects.
- Story 44's six-cell results did not change model membership, calibration,
  retraining, registry promotion, or production use. The later reduced-head
  fits are explicitly labeled post-benchmark diagnostics rather than new
  benchmark cells. Any promotion or production use requires a separately
  governed decision and evidence base.
