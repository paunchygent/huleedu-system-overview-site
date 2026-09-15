Latest reported comparison completed **September 13, 2026**. These experiments
measure whether Gemma selects the essay with the higher human score. They
examine the judgments used to train RankNet.

## Parser-Stabilized Text — September 13, 2026

Gemma compared the same 504 pairs from 396 essays across 18 writing prompts.
The panel covers human scores from 2.0 to 4.0 and deliberately balances score
regions. It does not represent their natural frequency in the corpus.

| Arm | Text shown to Gemma | Agreement with the higher human score |
| --- | --- | ---: |
| Full baseline | Original essay text with the full judging instructions | 76.69% |
| Parser-stabilized | Text prepared for grammatical analysis, with the same judging instructions | 75.96% |

Parser-stabilized text is the exact text stream supplied to the grammatical
parser after the accepted preparation procedure. That procedure applies
eligible LanguageTool repairs and validated lexical repairs. Both essays in
each pair receive the treatment. The experiment tests whether changing the
text in this way changes the model judge's choices.

Each arm contains three repetitions in both A/B orders: 3,024 judgments per
arm. All planned observations were usable. The model was Gemma 4 31B through
OpenRouter's DeepInfra FP8 provider profile.

## Difference and Uncertainty

The parser-stabilized arm was 0.73 percentage points lower than the baseline.
A bootstrap that resampled complete writing-prompt groups gave a 95% interval
from **−2.15 to +0.63 percentage points**. The interval includes zero.

There were 334 changed outcomes: 156 gains and 178 losses relative to the
baseline. Results across adjacent score regions were mixed:

| Human-score comparison | Full baseline | Parser-stabilized |
| --- | ---: | ---: |
| 2.0 versus 2.5 | 71.67% | 69.26% |
| 2.5 versus 3.0 | 79.07% | 80.37% |
| 3.0 versus 3.5 | 72.78% | 71.48% |
| 3.5 versus 4.0 | 60.93% | 59.81% |

The observed difference does not establish an improvement from this text
treatment. These results concern the model judge; they do not measure a
change in the final essay scorer.

## Experiment Scope

This page reports the completed comparison between `full-baseline` and
`full-baseline-parser-stabilized`. The broader study includes other instruction
and rubric conditions and separate mechanism probes. That experiment task has
been verified and closed; this page covers only the comparison above.

## Sources

Retained record: `TASK-HULE-23-10-06`, parser-stabilized experiment closeout of
September 13, 2026, and the corresponding ELLIPSE CJ experiment synthesis.
The uncertainty estimate uses 2,000 bootstrap resamples, with a complete prompt
group as the resampling unit.

[Scorer evaluation](/evidence/current-essay-scorers/) reports agreement with
human essay scores. [RankNet acquisition and performance](/evidence/ellipse-cj-ranknet-probe/)
reports the existing pair pool and the effect of different pair budgets.
