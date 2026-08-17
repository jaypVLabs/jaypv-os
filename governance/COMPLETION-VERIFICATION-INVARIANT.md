# Completion Verification Invariant

Status: REQUIRED
Authority: JPV governance
Applicability: JayPVentures LLC, jaypventures, jaypVLabs, JPV-OS, JPV Institute, and every repository, runtime, service, workflow, artifact, deployment, and public or internal operating surface governed by JPV.

## Terminal rule

No claim of completion without scope enumeration + exact artifact/SHA + execution evidence where applicable + independent/provider readback + explicit PASS against the current authoritative state.

## Required evidence chain

A work item may advance to `DONE` only when all applicable evidence exists:

1. Scope enumeration — the complete intended repository, entity, service, environment, artifact, or operational surface is explicitly identified.
2. Exact artifact identity — the exact commit SHA, artifact identifier, deployment revision, document version, configuration revision, or equivalent immutable identifier is recorded.
3. Execution evidence — when the change affects executable or operational behavior, the relevant mechanism has actually executed successfully against the intended target.
4. Independent/provider readback — the authoritative provider or an independent verification surface confirms the resulting state rather than relying on the mutation request alone.
5. Current-state PASS — verification is performed against the current authoritative state. A PASS against an obsolete SHA, superseded deployment, stale artifact, prior configuration, or partial scope is not terminal evidence.

## State semantics

Use only evidence-supported states:

- `PLANNED` — defined but not implemented.
- `IMPLEMENTED_NOT_MERGED` — encoded on a non-authoritative branch or draft surface.
- `MERGED_NOT_EXECUTED` — present in the authoritative repository state but operational execution remains unverified.
- `BLOCKED` — an external or internal dependency prevents required verification or completion.
- `FAILED` — required execution or verification produced a failure.
- `UNVERIFIED` — implementation may exist, but required readback or evidence is absent.
- `PASS` — the requested verification step passed against the authoritative current state.
- `DONE` — all applicable requirements in this invariant are satisfied and evidenced.

## Prohibited completion claims

The following must never be represented as complete:

- code written but not merged;
- merge completed without required execution evidence;
- execution attempted without authoritative readback;
- partial repository or entity coverage described as estate-wide;
- a PASS tied to a stale or superseded revision;
- a requested mutation treated as proof that the provider applied it;
- an unavailable verification surface silently treated as success.

When verification cannot be completed, report the exact blocker and the last evidence-backed state. Confidence, intent, planning, or prior success cannot substitute for terminal evidence.

## Precedence

This invariant is cross-entity and applies wherever a narrower repository or operating rule is less strict. A stricter domain-specific verification rule may add requirements but may not remove these requirements.
