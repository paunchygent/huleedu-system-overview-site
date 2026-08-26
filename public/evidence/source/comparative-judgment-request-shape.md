---
type: reference
id: REF-HULE-GENERAL-cj-to-llm-prompt-contract
title: CJ to LLM prompt contract
repository: huleedu
owners:
  - kind: service
    id: huleedu
created: '2026-07-30'
status: active
reference_kind: general
retired_ids:
  - REF-cj-to-llm-prompt-contract
summary: CJ to LLM prompt contract
---

## Overview

State the subject, why it is useful, and the boundary of the retained context.

## Facts And Semantics

Define terms and record durable facts, ownership, relationships, and evidence
interpretation. Distinguish confirmed facts from mutable interpretation. Link
to a runbook for ordered execution and to backlog items for work state.

## Decisions And Interpretation

Record current interpretation and its practical consequences. Route accepted
architecture or governance rationale to an ADR, material planning choices to a
`decisions` reference, and implementation authority to the backlog.

### Preserved source content

### Purpose

Provide a canonical map for where CJ prompt text is assembled and which files
own the system prompt and per-event overrides, so prompt edits remain intentional
and auditable.

This is a reference document. The canonical behavior is defined by code and
shared contracts in `libs/common_core/`.

### Canonical Rule Surface

- Invariants and boundary mandates:
  - `.codex/rules/020-architectural-mandates.md`

### Prompt Sections (CJ Assessment Service)

The CJ Assessment service builds the final user prompt from multiple sources.
This section is a pointer map to the authoritative composition points.

- Student assignment:
  - Hydrated in `services/cj_assessment_service/event_processor.py` and carried as
    `converted_request_data["student_prompt_text"]`.
  - Rendered by `_build_comparison_prompt()` in
    `services/cj_assessment_service/cj_core_logic/pair_generation.py` as the
    `**Student Assignment:**` block.
- Assessment criteria:
  - Sourced from `assessment_instructions.instructions_text`.
  - Fetched in `_fetch_assessment_context()` in
    `services/cj_assessment_service/cj_core_logic/pair_generation.py`.
  - Rendered by `_build_comparison_prompt()` as the `**Assessment Criteria:**` block.
- Judge instructions / rubric:
  - Sourced from `processing_metadata["judge_rubric_text"]` or hydrated via File Service content API
    by `_fetch_assessment_context()` in `services/cj_assessment_service/cj_core_logic/pair_generation.py`.
  - Rendered by `_build_comparison_prompt()`.
- Essays A/B:
  - Contract: `EssayForComparison` in `services/cj_assessment_service/models_api.py`.
  - Rendered by `_build_comparison_prompt()` under `**Essay A (ID: ...)**` / `**Essay B (ID: ...)**`.
- Response instructions (structured output contract):
  - The final paragraph inside `_build_comparison_prompt()` describes the JSON output shape
    (winner/justification/confidence) expected from downstream providers.

### System Prompt Hierarchy

System prompt selection is intended to be predictable and layered:

1. Event-level override (highest priority)

- Supplied via `llm_config_overrides.system_prompt_override` in the Kafka event payload.

1. CJ Assessment default (middle priority)

- Canonical default lives in `services/cj_assessment_service/config.py` (`SYSTEM_PROMPT`).
- Applied by CJ workflows unless explicitly overridden by the event.

1. LLM Provider fallback (lowest priority)

- Provider-side minimal fallback prompt. For CJ workflows this should be effectively
  unreachable because CJ supplies a prompt.

### ENG5 Runner Override Behavior (CJ comparative judgement experiments)

The ENG5 runner can override the CJ system prompt and other LLM settings.

- With `--cj-system-prompt` (default behavior):
  - ENG runner custom prompt from
    `scripts/cj_experiments_runners/eng_np/system_prompt.py` overrides the CJ
    default.
  - The current artifact authority is centralized in
    `scripts/cj_experiments_runners/eng_np/prompt_defaults.py`.
- With `--no-cj-system-prompt`:
  - Falls back to CJ Assessment default prompt (not the provider fallback).
- Overrides are built in:
  - `scripts/cj_experiments_runners/eng_np/cli_runner_orchestration.py`
- Overrides flow through the shared event schema:
  - `libs/common_core/src/common_core/events/cj_assessment_events.py`

Operational execution guidance for ENG5 belongs in:

- `docs/runbooks/eng-np-runbook.md`

### Examples

Typical prompt-change workflow:

1. Identify which layer you are changing (event override vs CJ default vs runner prompt).
2. Confirm the structured output requirements in `_build_comparison_prompt()` still match
   downstream provider enforcement.
3. Update any task/ADR that governs the prompt change (psychometric validity concerns).
