
## Research Purpose And Boundary

This experiment asked whether the retained raw-inclusive ELLIPSE scorer should
also be trained on essays excluded solely by the former 200-to-1,000-word
preparation rule. The control contains 3,479 base essays and all 1,563
attributed candidates. The experimental arm adds every otherwise-admissible
length extreme: 182 essays below 200 words and 74 above 1,000 words, producing
a 5,298-row training population.

The comparison changed only the training population. Both no-L2 feature lanes,
the five seeds, prompt-held-out folds, grade-band weighting, early stopping,
calibration, prediction mapping, fixed 3,479-row OOF population, and official
2,259-row test population remained unchanged. The 256 added rows never selected
a model or calibrated its predictions. Their prompt-aligned expanded OOF result
is secondary diagnostic evidence.

The experiment does not change an accepted scorer. It determines whether the
two unrestricted-length scorers deserve later selection over the retained
5,042-row inclusive controls.

## Evidence And Sources

The retained machine-readable result set is
[`task-hule-20-43-05-unrestricted-length-results-v1/`](task-hule-20-43-05-unrestricted-length-results-v1/).
It contains no essay text. The decisive bindings are:

| Evidence                                  | SHA-256                                                            |
| ----------------------------------------- | ------------------------------------------------------------------ |
| Length census and materialization receipt | `99009c053273dfd31020c9774f778cd4b9d063ad8ff197418bfc66657022f169` |
| Combined fixed-OOF comparison             | `ae011e007dad65e47606e5a96deddb93ef665cbf27b08f0f075099136eb1121e` |
| Handcrafted fixed-OOF comparison          | `950be6875028da96ea595fc1a61a0ad177bf9e835a8acb3cb0487e943b744538` |
| Combined expanded-OOF analysis            | `73ad17b0f4c9fa85ad59d4735cf5692ed89302f56833769c9e347eed3cd39a1e` |
| Handcrafted expanded-OOF analysis         | `b9f8aa6c099fdd07d68b159be939135192c298134b265adc573973b99e24cf9e` |
| Combined official-test comparison         | `bc8b68fc9f6b4641c9f9f001f4bd9512841c1b51019d5ba61e7f0ecb83598e2e` |
| Handcrafted official-test comparison      | `272dfc80ef81ba3694ef40ac7b4080110b8735d6b74b6cc65995a4208fc97ffb` |
| Combined manifest-last scorer record      | `3e4dd5905c5ff3c252e1bbd915a4cc899c4a5c4551087e9a164be028e814e777` |
| Handcrafted manifest-last scorer record   | `c8e769622ff976b30126cf9a3cd1864cb6ebc6a3df6bdcfd3d61049923059f6c` |

The official-test headline values below come from the frozen evaluator metrics
bound by the manifests. The larger paired comparison artifacts provide the
prompt, band, tail, raw-error, and greater-than-one-grade evidence. Their QWK
projection uses the comparison framework's observed test-score bounds; the
headline QWK uses the fixed ELLIPSE score scale. MAE, adjacency, and severe-error
counts are identical under both views.

## Findings And Interpretation

### Population result

The raw census found 257 essays excluded solely by length: 183 short and 74
long. One short essay has an invalid source Overall category and was excluded by
the unchanged scorer-cohort rule. All remaining 256 rows materialized in both
feature lanes under parser policy v3. No row was excluded for rater
disagreement, unresolved rater identity, identifying-information flags, genre,
predicted error, or perceived quality.

### Primary fixed-OOF comparison

Negative MAE change is an improvement. Positive QWK and adjacent-accuracy
changes are improvements.

| Lane        | Control QWK | Arm QWK | QWK change | MAE change | Adjacent change | Errors over one grade |
| ----------- | ----------: | ------: | ---------: | ---------: | --------------: | --------------------: |
| Combined    |     0.74895 | 0.74774 |   -0.00121 |   -0.00072 |        -0.00086 |              17 to 13 |
| Handcrafted |     0.64206 | 0.63986 |   -0.00219 |   +0.00517 |        +0.00230 |              79 to 79 |

On the combined primary comparison, 248 rows improved, 243 worsened, and 2,988
were unchanged in absolute error. The small mean-error improvement and four
fewer severe errors are real but do not produce a general performance gain:
QWK and adjacent accuracy both decline slightly. The handcrafted lane is also
mixed and worsens on MAE and QWK.

The combined fixed-OOF tail view explains the cancellation. The high group
improves by 0.02184 MAE and 0.01560 adjacent accuracy, while the low group
worsens by 0.02982 MAE and 0.02807 adjacent accuracy. The middle changes little
(MAE +0.00118). Handcrafted shows the opposite tail pattern: low MAE improves
0.00351, high MAE worsens 0.01950, and the middle worsens 0.00255.

### Secondary evidence on the 256 added rows

| Lane and stratum | Rows | QWK change | MAE change | Adjacent change | Errors over one grade |
| ---------------- | ---: | ---------: | ---------: | --------------: | --------------------: |
| Combined, all    |  256 |   +0.01571 |   -0.00781 |        +0.02344 |                3 to 3 |
| Combined, short  |  182 |   +0.02309 |   -0.01099 |        +0.02747 |                1 to 1 |
| Combined, long   |   74 |   -0.00501 |    0.00000 |        +0.01351 |                2 to 2 |
| Handcrafted, all |  256 |   -0.02184 |   +0.00781 |        -0.02344 |                7 to 4 |

The combined scorer learns useful signal for the newly admitted short essays.
The long-essay result is neutral to mixed. The handcrafted scorer reduces three
severe errors but worsens its average discrimination and error. These rows are
diagnostic only; their favorable combined result cannot override the fixed-OOF
or official-test comparison.

### Unchanged official test

| Lane        | Control QWK | Arm QWK | QWK change | Control MAE | Arm MAE | MAE change | Adjacent change | Errors over one grade |
| ----------- | ----------: | ------: | ---------: | ----------: | ------: | ---------: | --------------: | --------------------: |
| Combined    |     0.75698 | 0.74999 |   -0.00699 |     0.30345 | 0.31208 |   +0.00863 |        -0.00310 |                5 to 7 |
| Handcrafted |     0.65452 | 0.65539 |   +0.00088 |     0.37915 | 0.37826 |   -0.00089 |        +0.00531 |              32 to 32 |

The combined scorer is the primary lane, and it becomes worse on every overall
official-test measure. It also creates two additional errors larger than one
grade. This outweighs its small fixed-OOF MAE improvement and its good result on
the 256 added rows.

The combined official-test tail result is also mixed. The exact-high group
(66 essays) improves by 0.01515 mapped MAE and 0.03030 adjacent accuracy. The
broader high group (399 essays) improves in raw prediction error but worsens by
0.01629 after mapping. The low group (185 essays) worsens by 0.03243 mapped MAE,
and the middle worsens by 0.00418. The added training material therefore helps
one narrow high-tail view while harming the low tail and overall calibrated
predictions.

Prompt effects are heterogeneous rather than a general improvement. On the
combined fixed OOF rows, the largest MAE improvements occur for `Benefits of a problem` (-0.0645), `Imagination` (-0.0370), and `Career commitment` (-0.0305).
The largest deteriorations occur for `Talents and skills` (+0.0875), `Creative arts requirement` (+0.0652), and `Lessons with elementary school students`
(+0.0303). On the official test, `Summer projects` improves most (-0.0833),
while `Praising student work` worsens most (+0.0758). Complete prompt tables are
retained in the linked JSON artifacts.

### Decision implication

The unrestricted-length experiment does not support replacing the retained
raw-inclusive combined scorer. The added rows contain learnable information,
especially among short essays and some high-tail and prompt strata, but the
benefit does not generalize to the unchanged official test. The unrestricted
scorers remain separately retained research packages for later comparison; no
accepted scorer or registry changes.

## Evidence Gaps And Follow-Up

No additional run is required to answer Task 43-05. A later experiment may use
the retained packages to test whether a bounded length-aware weighting or
mixture can preserve the short/high-tail benefit without the low-tail and
official-test regression. That would be a new arm with a new governed task; it
is not a reason to alter or prolong this completed unrestricted-inclusion test.
