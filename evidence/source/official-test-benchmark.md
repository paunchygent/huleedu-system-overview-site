---
type: reference
id: REF-HULE-RESEARCH-current-ellipse-accepted-scorer-benchmark-and-late-fusion
title: Official ELLIPSE production scorer benchmark
repository: huleedu
owners:
  - kind: service
    id: huleedu
created: '2026-08-28'
status: active
reference_kind: research
summary: Production-scorer instrument benchmark with current full-test agreement, absolute-error, and gross-error evidence plus an explicitly bounded Choi et al. comparison.
---

## Research Purpose And Boundary

This reference is the single governed human-readable authority for the official
ELLIPSE test benchmark. The production `combined.current.v1` hybrid is the
operational bench. Current embeddings, pure-whitebox, and late-fusion arms are
comparators; none changes production identity.

The evaluation covers all 2,567 rows in the current ELLIPSE scorer test
authority. Learned weights use all 5,470 aligned out-of-fold training
predictions and minimize training-side mean squared error on a non-negative
0.01 simplex grid. Test labels are used only for final evaluation. The source
bundle contains embeddings, whitebox, and hybrid signals only; no CGS data or
comparative-judgment signal enters any arm.

This result changes no scorer package, selector, registry, calibration,
dataset, production state, or historical experiment. The public scorer
identities remain `embeddings.primary.v1`, `handcrafted.current.v1`, and
`combined.current.v1`.

## What A Scorer Benchmark Must Establish

Quadratic weighted Cohen's kappa is an important cohort-level agreement
statistic. It rewards preservation of ordinal distances relative to the score
distribution. It does not bound the error on any essay, and it can move when
the prediction marginal or terminal mapping changes even when the underlying
raw predictions do not improve pointwise. A high QWK therefore does not by
itself establish that a scorer is suitable for student- or teacher-facing use.

A scorer-like instrument must report both overall agreement and the individual
error distribution. This benchmark uses the native half-grade scale and the
following ladder:

- `0.0`: exact agreement;
- `0.5`: adjacent, within one half grade;
- `1.0`: a full-grade error, retained as the outer comparison boundary;
- `>=1.5`: a gross error greater than one full grade;
- `>=2.0`: a two-grade-or-larger error, reported separately.

One full grade is not desirable, but it remains a plausible human-disagreement
boundary. A gross machine error is qualitatively different: it can invalidate
the practical use of the score even while aggregate QWK remains high. Human
ratings can be discussed and adjudicated. A frozen machine prediction is a
repeatable property of the fitted system; correcting one observed output does
not remove the failure pattern elsewhere. For that reason, gross and two-grade
errors are operational evidence, not secondary decoration around QWK.

The verified ELLIPSE pairwise human-rater Overall QWK is
`0.5849381457369485` over 5,728 admitted pairs. It demonstrates genuine rating
difficulty in this population. It is contextual evidence, not a universal
machine ceiling or a substitute for MAE and the machine error ladder, because
the pairwise-rater estimand and prediction-versus-averaged-target estimand are
different.

This is the applied critique behind the benchmark. Human disagreement does not
excuse machine error. Human scores are rater-dependent and can be discussed,
moderated, or combined with other evidence. A deployed scorer version applies
one frozen behavior repeatedly and at scale. Its systematic skew therefore
affects every similar future case until the system is changed and revalidated.
Reporting a state-of-the-art agreement coefficient without the underlying
absolute-error and tail profile leaves that practical risk unmeasured.

Here `MAE` means mean absolute error, not mean standard error. MAE measures the
average magnitude of a score miss; RMSE penalizes larger misses more strongly.
Neither replaces the discrete error ladder, because two scorers can have
similar averages while distributing harm very differently across students,
score bands, prompts, or demographic groups.

Robustness is a separate requirement. A scorer that performs well on the fixed
test distribution may still be manipulable by irrelevant length, repetition,
prompt mimicry, superficial mechanics, or other construct-irrelevant changes.
Production confidence therefore requires both natural error-profile evidence
and controlled robustness or adversarial tests that preserve the intended
writing construct.

## Evidence And Sources

The source bundle is
`output/essay_scoring/story50_full_test_embeddings_whitebox_hybrid_fusion_20260828/`.
Its receipt binds the human report, machine summary, metric projection, and
row-level result:

| Artifact        | SHA-256                                                            |
| --------------- | ------------------------------------------------------------------ |
| `summary.json`  | `a5ab67ced1f1c7e8a96db66a2396b2e3b957de4579793cfd15340a17691ec87e` |
| `metrics.csv`   | `ab70fee9f00e2e7f6a2bf4488a95fddf7fd1a56c124762b0e3ed9ae915d5b4d2` |
| `test_rows.csv` | `77ac14cf75be3e906429b8defb8c650e734ec00dd4dff603f1b151271bdd2c73` |
| `report.md`     | `8d49fc91fd2d175f587bbfa641c54b5045f07136c92cd769e2000e77d6026c3b` |

The secondary nearest-valid-score bundle is
`output/essay_scoring/story50_full_test_nearest_valid_score_comparator_20260828/`.
It reuses the same frozen raw predictions and binds the remapped metric result
and the separately labeled integer-only sensitivities:

| Artifact                    | SHA-256                                                            |
| --------------------------- | ------------------------------------------------------------------ |
| `summary.json`              | `3ed10c607c185d59afea2856f1988d4033ce7728f76f2817551859c82774e8dd` |
| `metrics.csv`               | `077f389833252c8ff16623ceeae587bfa1ca2d64b357412d7c763e4509c03622` |
| `integer_sensitivities.csv` | `5b39ea3468bf48d7cab6b1488d23e2c253c0090b3d585b464e2c6d565156a13c` |
| `test_rows.csv`             | `dd932f344c071439c7c395ad728515392a9e441737f520af22d390a7e6e11a43` |
| `report.md`                 | `6a635dda36ad4bb60956c3f1dfdecfe326b5388a40bcd20595f6cf6d5a73d858` |

The complete error ladder is derived without refitting from those two
receipt-bound row files and retained at
`output/essay_scoring/story50_official_test_instrument_benchmark_20260828/`.
Its `summary.json` SHA-256 is
`6a93d0edc5e195bbfbf621c608228323f2ad5425cb88500cec626daf12b4a44d`;
the receipt SHA-256 is
`78c65fcd8921121ba0572438b4c3f04f3400da4620459700ed95f63e5a0c86df`.
Every half-grade error bin sums to all 2,567 rows under both mappings.

The current scorer inputs are bound as follows:

- `embeddings.primary.v1`: Story 50 5,470-train/2,567-test manifest SHA-256
  `2a2dee313ab2feb64648e3cea189f0ac82f316fa1cf6d3d3fc3a5451ca1f6f76`
  and predictions SHA-256
  `6ca022cdf4b8f6c7b00abda7b7d877a3b2a0d094f9a32a29d211495397c50cbe`;
  selector authority is `TASK-HULE-REP-0054`.
- `handcrafted.current.v1`: 30-scalar Story 50 package, prediction-manifest
  SHA-256
  `e541264e5e35afa609d62a8a255b519978a976bfe4c0cea598d3949d33525e27`,
  predictions SHA-256
  `5a566387cc759a1b7bf956fc39bbf9bd040aad61355f1f6f56ee3a7d184aba5c`,
  and OOF SHA-256
  `f5af26e33eda85c326556a5d5adccbb050fc00d22bf7eaeff4165b656a32ed83`.
- `combined.current.v1`: 768 embeddings plus 36 scalars, prediction-manifest
  SHA-256
  `9f7c2841b73cdce61465a606a5c5d84bb0012e8342364039f6e737c33dfb00d5`,
  predictions SHA-256
  `3e43999d767ad7d39ad24f92b33d458302bcddcb528466508b9cee2b8c0a7526`,
  and OOF SHA-256
  `7b6d390fa6ccf49559ac6e5be0475acb67ef23dd0c37a8de63f8f55bb1bda4f7`.
- Shared row authority SHA-256:
  `979bcd8959fffe0d684cb408a86d060820a8449b9777321ed89a43f0dc76ce03`.

The accepted whitebox and hybrid package identities are recorded once in
`REF-HULE-RESEARCH-story-50-accepted-cumulative-correction-scorer-promotion`.
This reference does not copy those package manifests or registry receipts.

## Findings And Interpretation

The production-output table uses each scorer package's terminal calibrated
grade band. Fusion averages those calibrated component grades and then maps the
aggregate to the nearest 0.5 grade band, clipped to 1-5. Adjacent accuracy means
absolute mapped error at most 0.5. Counts are essays, not percentages.

| Arm                   | Method      |    QWK |    MAE |   RMSE |  Exact | Adjacent | >=1.0 | Gross >=1.5 | >=2.0 | Weights              |
| --------------------- | ----------- | -----: | -----: | -----: | -----: | -------: | ----: | ----------: | ----: | -------------------- |
| **Production hybrid** | component   | 0.7523 | 0.3091 | 0.4467 | 0.4686 |   0.9162 |   215 |           8 |     0 | `[1.0]`              |
| Embeddings            | component   | 0.7507 | 0.3179 | 0.4589 | 0.4620 |   0.9077 |   237 |          14 |     0 | `[1.0]`              |
| Whitebox              | component   | 0.6575 | 0.3757 | 0.5253 | 0.4059 |   0.8601 |   359 |          42 |     3 | `[1.0]`              |
| Embeddings + whitebox | equal       | 0.7295 | 0.3185 | 0.4672 | 0.4768 |   0.8905 |   281 |          11 |     0 | `[0.50, 0.50]`       |
| Embeddings + whitebox | learned OOF | 0.7481 | 0.3152 | 0.4540 | 0.4616 |   0.9131 |   223 |          13 |     0 | `[0.67, 0.33]`       |
| Embeddings + hybrid   | equal       | 0.7535 | 0.3097 | 0.4505 | 0.4733 |   0.9108 |   229 |           9 |     0 | `[0.50, 0.50]`       |
| Embeddings + hybrid   | learned OOF | 0.7523 | 0.3091 | 0.4467 | 0.4686 |   0.9162 |   215 |           8 |     0 | `[0.38, 0.62]`       |
| Whitebox + hybrid     | equal       | 0.7282 | 0.3167 | 0.4625 | 0.4741 |   0.8960 |   267 |           9 |     0 | `[0.50, 0.50]`       |
| Whitebox + hybrid     | learned OOF | 0.7477 | 0.3113 | 0.4464 | 0.4612 |   0.9198 |   206 |           9 |     0 | `[0.29, 0.71]`       |
| Three-way             | equal       | 0.7506 | 0.3093 | 0.4453 | 0.4655 |   0.9190 |   208 |           8 |     0 | `[1/3, 1/3, 1/3]`    |
| Three-way             | learned OOF | 0.7506 | 0.3093 | 0.4453 | 0.4655 |   0.9190 |   208 |           8 |     0 | `[0.28, 0.27, 0.45]` |

The production hybrid remains the operational benchmark. Equal embeddings plus
hybrid raises QWK by only `0.0013`, while MAE and RMSE rise, adjacent accuracy
falls, full-grade-or-larger errors increase from 215 to 229, and gross errors
increase from eight to nine. Its exact accuracy improves, but that isolated
movement does not outweigh the broader regression. The OOF-learned
embeddings-plus-hybrid weights reproduce the hybrid's mapped test metrics
exactly.

Learned embeddings plus whitebox does not beat the production hybrid under its
accepted calibration. Its independent construct signal remains important, but
the accepted-calibration arm has 13 gross errors versus eight for production.
Learned whitebox plus hybrid and the three-way arms reduce some
full-grade-or-larger errors, but give up QWK or MAE and do not reduce gross
errors below the production count. They remain tradeoff evidence rather than
replacement recipes.

The residual correlations explain the limited fusion value:

| Residual pair         | Pearson correlation |
| --------------------- | ------------------: |
| Embeddings / whitebox |              0.6168 |
| Embeddings / hybrid   |              0.9232 |
| Whitebox / hybrid     |              0.6343 |

Embeddings and hybrid largely repeat the same errors because the hybrid already
contains the accepted embedding representation. Whitebox contributes more
independent residual information, but its much weaker complete-population
performance means that substantial whitebox weight pulls the aggregate result
down. For equal embeddings plus whitebox versus hybrid, the fusion is closer on
418 rows, hybrid is closer on 460, and 1,689 rows tie.

## Nearest-Valid-Score Comparison

Choi et al. inverse-normalize continuous predictions and round them to the
nearest valid score before QWK. The closest reproducible comparison for the
current Story 50 scorers therefore bypasses their accepted split-tail
calibrations, clips each frozen raw prediction to 1-5, and rounds it directly to
the nearest valid ELLIPSE score. The official published ELLIPSE Overall target
contains nine valid half-grade points. Multiplying both target and mapped
prediction by two supplies integer category IDs without discarding a score
point or changing QWK.

For late fusion, equal weights are fixed. Learned weights are newly selected on
the 5,470 aligned raw OOF predictions by the same non-negative 0.01 simplex
grid, minimizing raw training-side MSE. No test label selects a weight or
mapping, and no XGBoost or embeddings scorer is refit.

| Arm                           | Method          |    QWK |    MAE |   RMSE |  Exact | Adjacent | >=1.0 | Gross >=1.5 | >=2.0 | Weights              |
| ----------------------------- | --------------- | -----: | -----: | -----: | -----: | -------: | ----: | ----------: | ----: | -------------------- |
| Choi et al. Table 8 Overall   | published       | 0.7260 |     NR |     NR |     NR |       NR |    NR |          NR |    NR | NR                   |
| Production hybrid predictions | component       | 0.7495 | 0.2988 | 0.4326 | 0.4760 |   0.9283 |   184 |           5 |     0 | `[1.0]`              |
| Embeddings                    | component       | 0.7510 | 0.2996 | 0.4326 | 0.4737 |   0.9291 |   182 |           5 |     0 | `[1.0]`              |
| Whitebox                      | component       | 0.6557 | 0.3531 | 0.4965 | 0.4223 |   0.8827 |   301 |          29 |     0 | `[1.0]`              |
| Embeddings + whitebox         | equal           | 0.7241 | 0.3052 | 0.4403 | 0.4686 |   0.9244 |   194 |           9 |     0 | `[0.50, 0.50]`       |
| Embeddings + whitebox         | learned raw OOF | 0.7484 | 0.2926 | 0.4261 | 0.4842 |   0.9318 |   175 |           3 |     0 | `[0.77, 0.23]`       |
| Embeddings + hybrid           | equal           | 0.7499 | 0.2990 | 0.4319 | 0.4745 |   0.9291 |   182 |           4 |     0 | `[0.50, 0.50]`       |
| Embeddings + hybrid           | learned raw OOF | 0.7515 | 0.2978 | 0.4310 | 0.4760 |   0.9303 |   179 |           5 |     0 | `[0.33, 0.67]`       |
| Whitebox + hybrid             | equal           | 0.7258 | 0.3050 | 0.4393 | 0.4675 |   0.9260 |   190 |           9 |     0 | `[0.50, 0.50]`       |
| Whitebox + hybrid             | learned raw OOF | 0.7459 | 0.2966 | 0.4287 | 0.4760 |   0.9322 |   174 |           4 |     0 | `[0.20, 0.80]`       |
| Three-way                     | equal           | 0.7427 | 0.2951 | 0.4294 | 0.4819 |   0.9295 |   181 |           4 |     0 | `[1/3, 1/3, 1/3]`    |
| Three-way                     | learned raw OOF | 0.7466 | 0.2961 | 0.4288 | 0.4780 |   0.9314 |   176 |           4 |     0 | `[0.32, 0.20, 0.48]` |

`NR` means not reported. Choi et al. publish the ELLIPSE Overall QWK but not
the row-level predictions, MAE, RMSE, exact or adjacent accuracy, or any
full-grade, gross, or two-grade error counts. Their QWK result is therefore a
valid aggregate comparator but insufficient evidence for operational scorer
safety.

On this mapping, the hybrid changes from accepted-calibration QWK `0.7523` to
nearest-valid-score QWK `0.7495`. The best nearest-valid-score QWK is `0.7515`
for learned embeddings plus hybrid, compared with Choi et al.'s reported Table
8 Overall cell of `0.726`. This remains a protocol-aligned comparison rather
than an identical replication: the current scorer authority contains 2,567
rows, uses Overall-only training, and represents one frozen ensemble rather
than Choi et al.'s ten train/dev refits of a joint seven-trait model.

QWK alone would select learned embeddings plus hybrid from this table. The
complete instrument profile gives a different and more useful reading.
Learned embeddings plus whitebox has QWK `0.7484`, only `0.0031` below that
maximum, while achieving the best MAE (`0.2926`), best RMSE (`0.4261`), best
exact accuracy (`0.4842`), three gross errors, and no error of two grades or
more. It also combines the dense representation with a separately fitted,
construct-explicit scorer rather than averaging embeddings with a hybrid that
already contains them. It is therefore the most defensible experimental fusion
from the joint construct-validity and pointwise-error perspective. It remains
an experimental comparator until a separate production promotion is accepted.

The production hybrid remains a credible operational bench: under its deployed
calibration it has eight gross errors (`0.31%`) and zero two-grade errors among
2,567 essays. Under the Choi-aligned mapping the same frozen raw predictions
have five gross errors and zero two-grade errors. Those facts are more directly
relevant to trust than the small QWK differences among the leading arms.

The five-category sensitivities are not Choi-equivalent results. Choi et al.
do not declare an ELLIPSE-specific category count or a rule for collapsing a
published half-grade. Rounding half-grade gold values downward gives current
scorer QWK values around `0.53-0.61`; rounding them upward gives around
`0.56-0.63`; evaluating against either raw integer rater changes the target
authority and gives around `0.54-0.63`. Those ranges demonstrate that a
five-category collapse is material, not a harmless integer re-encoding.

## Evidence Gaps And Follow-Up

- This is one frozen full-test population, not a new prompt-general or Swedish
  transfer result. No inferential superiority claim follows from the small QWK
  differences.
- The official ELLIPSE test population has supported earlier governed
  evaluations. This result preserves train/test fitting separation but is not a
  globally single-use model-selection confirmation.
- The result does not change accepted scorer selection. Any later recipe or
  production change requires separate governed authority and evidence.
- Choi et al. state "nearest valid score" but do not print the ELLIPSE-specific
  increment or category count. The nine-point comparison follows the published
  ELLIPSE target authority; it does not claim access to an unpublished
  implementation detail.
- A separate cross-paper AES audit should extract native score scale, QWK, MAE,
  RMSE, exact and adjacent accuracy, full-grade, gross and two-grade errors,
  score-band and subgroup bias, decision-boundary crossings, robustness or
  adversarial tests, and row-prediction availability for regression, ordinal,
  neural, and LLM-based scorers. Unpublished cells must remain `not reported`.
  When a dataset has no defensible native grade step, the audit should retain
  raw score-point and scale-relative errors rather than inventing one.
- This fixed official-test result is not adversarial validation. Controlled
  construct-preserving perturbation and distribution-shift evidence remains
  necessary before any claim of robust student- or teacher-facing use.
- When any public scorer ID resolves a new accepted package, update this living
  reference only from a new receipt-bound complete-population comparison.
  Preserve this source bundle as immutable historical evidence.
