---
type: reference
id: REF-HULE-RESEARCH-ellipse-distribution-overlap-map-and-tail-data-strategy-survey-PART-01
title: ELLIPSE distribution overlap map and tail data-strategy survey
repository: huleedu
owners:
  - kind: service
    id: huleedu
created: '2026-08-22'
root: REF-HULE-RESEARCH-ellipse-distribution-overlap-map-and-tail-data-strategy-survey
part: 1
---

## Part 01 — the E4 distribution overlap map

Ordered part 1 of 2. The root document carries the purpose, the claim boundary,
the evidence inventory with digest identities, the method authority, the figure
asset index, and the gap list. This part carries the E4 findings in full.

Everything below is descriptive. The pre-committed statistics spec defines no
threshold, no pass/fail band, no verdict, and no remediation trigger, and no
offset magnitude is classified or compared against one.

## The three ELLIPSE reference layers

These layers are lane-specific and course-independent, so they are identical on
every figure for a given lane and account for 42 of the 66 statistics rows.

| Lane        | Layer               |    n | Median |  Mean |   p25 |   p75 | Peak | Offset vs label |
| ----------- | ------------------- | ---: | -----: | ----: | ----: | ----: | ---: | --------------: |
| both        | ellipse_train_label | 3481 |  3.000 | 3.137 | 2.500 | 3.500 | 3.00 |          +0.000 |
| handcrafted | ellipse_train_oof   | 3479 |  3.152 | 3.153 | 2.789 | 3.517 | 3.08 |          +0.152 |
| handcrafted | ellipse_test_pred   | 2259 |  3.164 | 3.160 | 2.787 | 3.554 | 3.16 |          +0.164 |
| combined    | ellipse_train_oof   | 3479 |  3.130 | 3.140 | 2.747 | 3.518 | 3.11 |          +0.130 |
| combined    | ellipse_test_pred   | 2259 |  3.117 | 3.141 | 2.751 | 3.552 | 3.02 |          +0.117 |

The label layer's peak cell holds the modal label, 3.0, not a KDE argmax.

The label mass carries 641 of its 3,481 labels at 4.0 or above, which is 18.4
percent. Both lanes' prediction masses sit slightly above the label median and
occupy a narrower interquartile span. Where the labels place 18.4 percent of
their mass at 4.0 or above, the four prediction layers place between 4.8 and 5.7
percent there: 4.83 percent handcrafted OOF, 5.53 percent handcrafted test, 5.61
percent combined OOF, and 5.71 percent combined test. The largest single value
anywhere in those four layers is 4.911, in the handcrafted OOF layer.

Each lane's train OOF and sealed-test layers stay close throughout: their
medians differ by 0.011 in the handcrafted lane and 0.013 in the combined lane,
and the two curves are visually near-coincident on every figure.

## Where each Swedish course's center mass sits

Six course cohorts carry a student layer; `eng6_vt2026` is absent per D05 below.
Offsets are against the 3.000 ELLIPSE train label median. The final two columns
give the share of each cohort's predictions at 4.0 or above, against the 4.8 to
5.7 percent the ELLIPSE prediction layers place there.

| Course cohort | n per lane | HC median | HC offset | CB median | CB offset | HC >= 4.0 | CB >= 4.0 |
| ------------- | ---------: | --------: | --------: | --------: | --------: | --------: | --------: |
| eng1_vt2026   |         22 |     3.246 |    +0.246 |     3.379 |    +0.379 |      9.1% |     18.2% |
| eng5_vt2017   |         46 |     3.523 |    +0.523 |     3.512 |    +0.512 |      4.3% |     23.9% |
| eng6_vt2023_a |         60 |     3.917 |    +0.917 |     3.960 |    +0.960 |     38.3% |     48.3% |
| eng6_vt2023_b |         62 |     4.125 |    +1.125 |     4.141 |    +1.141 |     54.8% |     59.7% |
| eng7_vt2017   |         24 |     4.264 |    +1.264 |     4.335 |    +1.335 |     66.7% |     75.0% |
| eng7_vt2018   |  7 (low n) |     4.147 |    +1.147 |     4.124 |    +1.124 |     85.7% |     57.1% |

**The headline finding, stated descriptively.** Every Swedish student layer sits
above the ELLIPSE train label median, and the offset grows with course level:
from +0.246 at ENG1 through +0.523 at ENG5 and roughly a full scale point at
both ENG6 assignments, to +1.264 handcrafted and +1.335 combined at ENG7 VT2017.
The growth is monotone across ENG1, ENG5, ENG6_a, ENG6_b and ENG7 VT2017 in both
lanes; ENG7 VT2018, at n=7 and flagged low-n, sits slightly below ENG7 VT2017
rather than above it. The ordering is the same in both lanes, the two lanes
place each cohort's median within 0.133 of each other, and every lane gap except
ENG1's is below 0.08.

The ELLIPSE prediction layers themselves sit only +0.117 to +0.164 above the
label median, and they carry 4.8 to 5.7 percent of their mass at 4.0 or above
against the labels' 18.4 percent. The scorers' own predictions on ELLIPSE data
therefore sit far closer to the training label center than any Swedish course
cohort does, and they carry less high-band mass than the labels they were
trained on.

Read against the model's own prediction mass rather than the label mass, the
picture is slightly sharper: across those eight student layers the medians sit
between 0.753 and 1.218 above their lane's train OOF and sealed-test medians,
the minimum at `eng6_vt2023_a` handcrafted against sealed test and the maximum at
`eng7_vt2017` combined against sealed test.

## Anchor layers on the same axis

Six of the seven course figures carry a full-form anchor layer; `eng1_vt2026`
carries none, because the ENG1 anchor rows are excluded upstream. The anchor
cohort `eng6_vt2023` is one instrument set for that course year and appears
identically on both the `_a` and `_b` figures.

| Anchor cohort                 | n per lane | HC median | HC offset | CB median | CB offset | Low n |
| ----------------------------- | ---------: | --------: | --------: | --------: | --------: | ----- |
| eng5_vt2017                   |         12 |     3.378 |    +0.378 |     3.624 |    +0.624 |       |
| eng6_vt2023, on `_a` and `_b` |         10 |     3.862 |    +0.862 |     4.096 |    +1.096 |       |
| eng6_vt2026                   |          9 |     3.685 |    +0.685 |     3.904 |    +0.904 | yes   |
| eng7_vt2017                   |         12 |     4.214 |    +1.214 |     4.259 |    +1.259 |       |
| eng7_vt2018                   |          9 |     4.094 |    +1.094 |     4.625 |    +1.625 | yes   |

Four courses place an anchor layer and a student layer on the same figure, and
their medians sit close together in every case. The `eng6_vt2026` figures carry
their 9-row anchor layer with no student layer beside it; that layer's median
places it below both `eng6_vt2023` student layers and below the `eng6_vt2023`
anchor layer on the same axis.

## The D05 eng6_vt2026 student-layer drop

TASK-HULE-20-41-01 D05 drops the `eng6_vt2026` student layer from the map. The
basis is a forward measurement from the essay catalog's `checksum` column,
recorded in `task_20_41_03_review_01.md` finding B1 and reverified independently
in `task_20_41_03_results.md`: **59 checksum-duplicate pairs exist between
`eng6_vt2023_b` and `eng6_vt2026`, 57 of them still identical after text
canonicalization, and the 281 scored rows resolve to 224 distinct texts per
lane.** All 59 duplicate groups fall between those two assignments and no other
pair. The dual registration therefore covers 59 of the 60 `eng6_vt2026` rows, so
that layer is very nearly a re-registration of `eng6_vt2023_b` rather than an
independent cohort.

The parent reconciliation record first measured this backward, from prediction
equality, and reported 21 pairs. That route undercounts: the two cohorts carry
different prompt authorities (`eng6_np_vt_2023.prompt.full.v1` against
`eng6_np_vt_2026.prompt.full.v1`), so prompt-bound features differ even on
identical essay text, and a duplicate surfaces through predictions only when
both GBDT ensembles land it in identical leaves. The 21 pairs are a strict
subset of the 59, and the forward count supersedes them.

`eng6_vt2023_b`, at 62 rows, is consequently the only student layer in the map
carrying that essay population. The separate `eng6_vt2023_a` layer, at 60 rows,
is unaffected by the duplication finding and remains in the map. The two
`eng6_vt2026` figures are still produced with their anchor and ELLIPSE layers,
so the anchor instrument for that course year stays visible on the shared axis.

**Superseded numbers, quoted once so the record shows what was dropped.** The
`eng6_vt2026` student layer's previously computed statistics were n=60 per lane,
handcrafted median 4.102 with offset +1.102, combined median 4.130 with offset
+1.130, and 53.3 percent of handcrafted and 58.3 percent of combined values at
4.0 or above. These are superseded and appear in no figure and in no row of the
committed
[center_mass_stats.csv](ellipse-overlap-map-v0/center_mass_stats.csv) or its
retained original `task_20_41_01_center_mass_stats.csv`.

The duplication is a property of the catalog, not a defect in the scoring run.
The scorers behaved deterministically on identical input bytes, every row-count
gate held, and the digest chain is unaffected. Which of the two registrations is
correct is a catalog and intake question outside ST-HULE-20-41's scope.

## Mandatory caveats

These travel with every citation of the numbers above and must not be dropped.

- **One value sits outside the plotted axis.** One handcrafted student
  prediction in `eng6_vt2023_a` has the value 5.099, above the 5.0 axis ceiling.
  It enters every statistic in the table and is the only value in any layer
  outside the plotted `[1.0, 5.0]` range. It is gradient-boosting overshoot on 1
  of 281 rows, not an artifact defect, and it is unaffected by the D05 drop.
- **Three low-n layers.** The `eng7_vt2018` student cohort at n=7, the
  `eng6_vt2026` anchor layer at n=9, and the `eng7_vt2018` anchor layer at n=9
  fall under the spec's `n < 10` presentation marker. Their statistics are
  computed and reported by the same rules with no adjustment; a smooth curve over
  few points is not a well-estimated density. Every figure also carries a rug of
  individual values, so the sample behind each curve stays visible.
- **281 scored rows are 224 distinct texts.** Any pooled estimate over all 281
  rows double-weights the 59 duplicated essays, and treating `eng6_vt2023_b` and
  `eng6_vt2026` as two independent samples is near-totally circular.
- **The merged CSV carries no text digest.**
  `task_20_41_03_student_predictions.csv` carries `essay_uid`, `course_code`,
  `assignment_id`, `cohort_label`, `lane`, `raw_prediction`, and
  `calibrated_grade_band` and no text digest, so duplicate content is
  undetectable from that file alone. The duplication count above comes from the
  catalog `checksum` column, not from the CSV.
- **KDE curves are uncorrected at the boundaries.** Mass outside `[1.0, 5.0]` is
  not drawn and no truncation or reflection correction is applied, so
  near-boundary curve heights must not be read as corrected densities.
