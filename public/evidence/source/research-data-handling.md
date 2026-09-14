Account reviewed **September 14, 2026**. This page describes the data handling
used by the experiments reported in the research overview.

## Essay Sources and Identity

ELLIPSE is a public research corpus released in anonymized form. The Swedish
research material contains de-identified classroom essays and assessment
examples. Private records connecting student identities to essay identifiers
are stored separately from the texts used in the research pipeline.

The [identity-separation record](/evidence/student-identity-separation/#retained-contract)
describes that boundary. Identity mappings are excluded from model requests.

## Local Processing

Most processing runs on Hemma, a research server under my control. It produces
linguistic measures, whole-essay representations, and regression scores.
DeBERTa-v3 converts essay text into a numerical representation locally. This
step does not send the essay to a chat service.

Open-weight language models can also run on Hemma. In that case, the same
prepared judging request is processed locally, and the essay text remains on
the server.

## Requests to External Providers

Earlier experiments sent ELLIPSE essay pairs to GPT-5.4 through the OpenAI API.
Other experiments used the same model and API to compare de-identified Swedish
essays with anchor essays. Provider-hosted correction experiments used
ELLIPSE essays only. The September 2026 Gemma experiments used public ELLIPSE
comparisons through OpenRouter and its DeepInfra FP8 provider profile.

A [comparative-judgment request](/evidence/comparative-judgment-request-shape/#prompt-sections-cj-assessment-service)
contains the judging instructions, writing prompt, and two essays under
anonymous identifiers. A correction request contains an ELLIPSE essay and
instructions for the correction task. The research pipeline records the
request, model, provider, and result.

These requests use provider APIs. Their data policies differ from those of
consumer chat products. Sending text through an API still transfers it to the
provider; it does not keep the text local.

## Provider Policies and Sources

The applicable terms depend on the provider, endpoint, and account settings.
The providers describe them in [OpenAI's business-data policy](https://openai.com/business-data/),
[OpenAI's API data controls](https://platform.openai.com/docs/guides/your-data),
and [OpenRouter's data-collection policy](https://openrouter.ai/docs/guides/privacy/data-collection).
When OpenRouter routes a request to another provider, that provider's terms
also apply.

This account retains the data-processing description from the maintained
HuleEdu system overview. Experiment dates and outcomes appear on the
[scorer evaluation](/evidence/current-essay-scorers/),
[judge experiment](/evidence/comparative-judgment-experiments/), and
[acquisition](/evidence/ellipse-cj-ranknet-probe/) pages.
