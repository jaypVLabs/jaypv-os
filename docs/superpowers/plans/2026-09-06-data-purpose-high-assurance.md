# Data Purpose and High-Assurance Enforcement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved Data Purpose Boundary and High-Assurance Protection designs into deterministic, fail-closed repository enforcement with traceable evidence and adversarial verification.

**Architecture:** Keep policy, declarations, evidence, and validation separate. Machine-readable data-flow, vendor, assurance-profile, and coverage-ledger artifacts are validated by a dependency-free Node enforcement core; existing JPV policy enforcement invokes the new gate. Repository policy defines the universal floor while deployment profiles declare stronger requirements without weakening that floor.

**Tech Stack:** Node.js 22 built-ins, CommonJS enforcement scripts, JSON/JSON Schema documents, Vitest 4 for behavior tests, existing JPV-OS policy and GitHub ownership structure.

**Spec:** `docs/superpowers/specs/2026-09-06-data-purpose-boundary-design.md` and `docs/superpowers/specs/2026-09-06-high-assurance-protection-design.md`

## Global Constraints

- Technical linkability does not create permission.
- Unverifiable data handling is unauthorized data handling.
- A prohibited use remains prohibited when performed indirectly.
- There is no UNKNOWN -> ALLOW state for protected data.
- Higher assurance may add protection; it may not remove the universal protection floor.
- No founder, administrator, executive, partner, customer, vendor, investor, or emergency operator receives a discretionary bypass.
- Protected release fails closed for UNKNOWN, QUARANTINED, DENIED, stale evidence, missing mandatory provenance, or missing authorization evidence.
- Central governance must not require central possession of all sensitive information.
- External uncertainty must be represented as externally unverifiable rather than proven.
- No new runtime dependency is required for the repository enforcement core.

---

## File Map

Create `DATA-PURPOSE-BOUNDARY.md` as binding doctrine; `governance/data-flows/schema.json`, `governance/vendors/schema.json`, `governance/assurance-profiles/schema.json`, and `governance/coverage/schema.json` as machine-readable contracts; companion README files as authoring guidance; `governance/assurance-profiles/core.json` as the non-weakenable floor; `governance/coverage/core.json` as the initial traceability ledger; `scripts/jpv-data-purpose-enforcement.cjs` as deterministic validation; `tests/data-purpose-enforcement.test.ts` as behavioral/adversarial verification; and `.github/workflows/jpv-policy-enforcement.yml` as the repository-native gate.

Modify `scripts/jpv-policy-enforcement.cjs` to require and invoke the new enforcement artifacts; `package.json` to expose deterministic verification commands; `PEOPLE-PROTECTION.md`, `SECURITY.md`, `GOVERNANCE.md`, `docs/production-review-checklist.md`, `docs/policy-index.md`, `docs/enforcement-map.md`, and `.github/CODEOWNERS` to make the boundary binding and reviewable.

### Task 1: Establish the executable contract with failing tests

**Files:**
- Create: `tests/data-purpose-enforcement.test.ts`
- Create during GREEN: `scripts/jpv-data-purpose-enforcement.cjs`

**Interfaces:**
- Consumes: temporary fixture roots containing governance JSON.
- Produces: CLI `node scripts/jpv-data-purpose-enforcement.cjs --root <path>` returning exit 0 only for valid governed state and nonzero with stable reason codes otherwise.

- [ ] Write Vitest cases that spawn the missing validator and assert failure for UNKNOWN release, DENIED release, QUARANTINED ordinary release, stale VERIFIED evidence, purpose conflicts, prohibited cross-domain reuse, missing provenance, missing deletion/correction path, missing audit evidence, and missing coverage disposition.
- [ ] Run `npx vitest run tests/data-purpose-enforcement.test.ts`; verify RED because the validator does not exist.
- [ ] Implement the smallest CLI parser and validation-result contract in `scripts/jpv-data-purpose-enforcement.cjs`; errors are emitted as JSON `{ "violations": [{ "code": string, "path": string, "message": string }] }` and success prints `JPV data-purpose enforcement passed.`.
- [ ] Re-run the focused test; keep adding only the minimum checks required for the initial cases until GREEN.
- [ ] Run `node scripts/jpv-data-purpose-enforcement.cjs --root .`; expected failure is allowed at this task because repository declarations do not exist yet, but the failure must be deterministic and identify missing governance artifacts.
- [ ] Commit `test: define fail-closed data purpose enforcement contract`.

### Task 2: Add machine-readable data-flow and vendor contracts

**Files:**
- Create: `governance/data-flows/schema.json`
- Create: `governance/data-flows/README.md`
- Create: `governance/vendors/schema.json`
- Create: `governance/vendors/README.md`
- Create: `governance/data-flows/repository-policy.json`
- Create: `governance/vendors/repository-native.json`
- Modify: `tests/data-purpose-enforcement.test.ts`
- Modify: `scripts/jpv-data-purpose-enforcement.cjs`

**Interfaces:**
- Data-flow required fields are exactly `system_id`, `owner`, `surface`, `data_classes`, `source`, `original_purpose`, `allowed_purposes`, `prohibited_purposes`, `legal_basis`, `vendors`, `recipients`, `persistent_identifiers`, `identity_resolution`, `enrichment`, `derived_data`, `retention`, `deletion_correction_path`, `cross_domain_transfer`, `compelled_disclosure_path`, `audit_log`, `verification_state`, `evidence_refs`, `reviewed_by`, `review_date`.
- Vendor records expose capability flags, evidence references, review date, evidence expiry, and verification state.

- [ ] Add failing tests for every mandatory field, conflicting allowed/prohibited purpose, high-impact capability without review/evidence, cross-domain transfer without source/destination/exact fields/minimization/downstream constraints/review date, and compelled disclosure that grants blanket reuse.
- [ ] Run the focused test and verify RED on the new cases.
- [ ] Write JSON Schemas with `additionalProperties: false` at governed object boundaries and enums for `VERIFIED`, `QUARANTINED`, `DENIED`; UNKNOWN is intentionally absent as an authorization state.
- [ ] Extend the validator to enforce semantic rules that JSON Schema alone cannot prove.
- [ ] Add repository-native declarations that accurately describe the policy enforcement system and repository-native tooling without inventing external data capabilities.
- [ ] Run focused tests and direct validator; both must PASS.
- [ ] Commit `feat: add governed data flow and vendor declarations`.

### Task 3: Encode assurance profiles and monotonic protection

**Files:**
- Create: `governance/assurance-profiles/schema.json`
- Create: `governance/assurance-profiles/README.md`
- Create: `governance/assurance-profiles/core.json`
- Create: `governance/assurance-profiles/high-assurance.json`
- Modify: `tests/data-purpose-enforcement.test.ts`
- Modify: `scripts/jpv-data-purpose-enforcement.cjs`

**Interfaces:**
- Profiles expose `profile_id`, `extends`, `required_controls`, `additional_controls`, `prohibited_downgrades`, `safe_failure`, `review_requirements`, and `evidence_requirements`.
- `high-assurance` extends `core`; child profiles may add requirements but cannot remove a parent requirement or prohibited downgrade.

- [ ] Add failing tests for profile removal of a core control, profile introduction of a discretionary bypass, weaker evidence requirements, and unsafe fail-open behavior.
- [ ] Verify RED.
- [ ] Implement profile schemas and core/high-assurance declarations.
- [ ] Extend validator with monotonic inheritance comparison and stable violation codes `PROFILE_WEAKENS_CORE`, `DISCRETIONARY_BYPASS`, and `UNSAFE_FAILURE_MODE`.
- [ ] Verify GREEN and run the full focused suite.
- [ ] Commit `feat: enforce monotonic high-assurance profiles`.

### Task 4: Add coverage closure and requirement traceability

**Files:**
- Create: `governance/coverage/schema.json`
- Create: `governance/coverage/README.md`
- Create: `governance/coverage/core.json`
- Modify: `tests/data-purpose-enforcement.test.ts`
- Modify: `scripts/jpv-data-purpose-enforcement.cjs`

**Interfaces:**
- Every ledger item contains `requirement_id`, `scope`, `disposition`, `enforcement_point`, `positive_test`, `negative_test`, `evidence_refs`, `reviewer`, `status`, `dependencies`, and `reverification_triggers`.
- `disposition` is exactly `PROTECTED`, `PROHIBITED`, `NOT_APPLICABLE`, or `EXTERNALLY_UNVERIFIABLE`.

- [ ] Add failing tests for missing disposition, UNKNOWN-like disposition, PROTECTED without enforcement/test/evidence, NOT_APPLICABLE without evidence, EXTERNALLY_UNVERIFIABLE without compensating protection/residual-risk record, and unresolved Critical/Important review findings.
- [ ] Verify RED.
- [ ] Implement schema, initial ledger, and semantic closure checks.
- [ ] Require terminal evidence semantics `PROVEN`, `SUPPORTED`, or `EXTERNALLY_UNVERIFIABLE` where evidence conclusions are declared.
- [ ] Verify GREEN and direct validator PASS.
- [ ] Commit `feat: require protection coverage closure`.

### Task 5: Add anti-circumvention and drift regression corpus

**Files:**
- Create: `tests/fixtures/data-purpose/valid/`
- Create: `tests/fixtures/data-purpose/invalid/`
- Modify: `tests/data-purpose-enforcement.test.ts`
- Modify: `scripts/jpv-data-purpose-enforcement.cjs`

**Interfaces:**
- Fixture directories are complete isolated governance roots consumed by the same CLI used against the repository.

- [ ] Add invalid fixtures for split-vendor prohibited joins, affiliate intermediary laundering, derived score/embedding laundering, stable linkage key under anonymization claim, purpose relabeling, new unreviewed subprocessor, acquisition/capability drift, API-chain reconstruction, inferred prohibited attributes, standing emergency authority, generalized legal-process reuse, expired evidence, missing receipt, and dependency invalidation.
- [ ] Add tests asserting every invalid fixture returns nonzero and its expected stable violation code; verify RED for unsupported cases.
- [ ] Add only the semantic checks necessary to make every circumvention fixture fail closed.
- [ ] Add valid counterpart fixtures proving narrowly authorized operations are not indiscriminately blocked.
- [ ] Run `npx vitest run tests/data-purpose-enforcement.test.ts`; expected PASS.
- [ ] Commit `test: add adversarial purpose-boundary regression corpus`.

### Task 6: Bind doctrine and existing policy enforcement

**Files:**
- Create: `DATA-PURPOSE-BOUNDARY.md`
- Modify: `PEOPLE-PROTECTION.md`
- Modify: `SECURITY.md`
- Modify: `GOVERNANCE.md`
- Modify: `scripts/jpv-policy-enforcement.cjs`
- Modify: `tests/data-purpose-enforcement.test.ts`

**Interfaces:**
- Existing `node scripts/jpv-policy-enforcement.cjs` becomes an aggregate gate and must fail when the data-purpose validator fails.

- [ ] Add tests proving the aggregate policy gate requires `DATA-PURPOSE-BOUNDARY.md`, governance schemas, coverage ledger, and high-assurance profile and rejects weakening language including UNKNOWN authorization, founder/admin bypass, and high-assurance downgrade.
- [ ] Verify RED.
- [ ] Write binding doctrine from the approved specs without vendor-specific blacklisting.
- [ ] Add concise cross-references and production requirements to People Protection, Security, and Governance.
- [ ] Modify `jpv-policy-enforcement.cjs` to require the new artifacts and synchronously invoke `jpv-data-purpose-enforcement.cjs`, propagating nonzero status.
- [ ] Run both enforcement scripts and focused tests; expected PASS.
- [ ] Commit `feat: bind data purpose boundary into JPV policy enforcement`.

### Task 7: Wire repository-native verification and ownership

**Files:**
- Create: `.github/workflows/jpv-policy-enforcement.yml`
- Modify: `.github/workflows/jpv-os-production.yml`
- Modify: `.github/CODEOWNERS`
- Modify: `package.json`
- Modify: `tests/data-purpose-enforcement.test.ts`

**Interfaces:**
- `npm run jpv:policy` runs `node scripts/jpv-policy-enforcement.cjs`.
- `npm run jpv:data-purpose` runs `node scripts/jpv-data-purpose-enforcement.cjs --root .`.
- Policy workflow runs on PRs and pushes to main with `contents: read` and no deployment/write credentials.

- [ ] Add tests that inspect package/workflow/CODEOWNERS text and fail if policy commands, protected paths, or workflow invocation are missing.
- [ ] Verify RED.
- [ ] Add package scripts and the missing `jpv-policy-enforcement.yml` required by the existing policy script.
- [ ] Ensure production verification runs policy/data-purpose checks before builds; keep untrusted-fork execution read-only and credential-free.
- [ ] Add CODEOWNERS entries for `/DATA-PURPOSE-BOUNDARY.md` and `/governance/` while preserving existing ownership.
- [ ] Run focused tests and both enforcement commands; expected PASS.
- [ ] Commit `ci: gate JPV production on purpose-boundary verification`.

### Task 8: Update review documentation and operational closure

**Files:**
- Modify: `docs/production-review-checklist.md`
- Modify: `docs/policy-index.md`
- Modify: `docs/enforcement-map.md`
- Create: `docs/high-assurance-review.md`
- Modify: `tests/data-purpose-enforcement.test.ts`

**Interfaces:**
- Documentation must distinguish repository-enforceable controls, deployment-profile controls, runtime integration obligations, external evidence, and qualified legal/domain review.

- [ ] Add failing documentation-contract tests requiring purpose boundary, verification states, coverage closure, independent review, drift/reverification, externally unverifiable semantics, and high-assurance applicability.
- [ ] Verify RED.
- [ ] Update review/checklist/index/map and add high-assurance review instructions covering privacy, security/zero trust, identity/biometrics, healthcare, financial/consumer-reporting, AI/ML, supply chain, government/legal process, cryptography, incident response, resilience, physical/OT when applicable, accessibility/human impact, and jurisdiction-specific law.
- [ ] Verify GREEN.
- [ ] Commit `docs: add high-assurance verification and review gates`.

### Task 9: Final verification, mutation challenge, and PR readiness

**Files:**
- Modify only files necessary to fix findings from this task.

**Interfaces:**
- Release criterion: zero unresolved Critical or Important findings; all deterministic repository gates green; draft PR remains unmergeable until those conditions are evidenced.

- [ ] Run `npx vitest run tests/data-purpose-enforcement.test.ts`.
- [ ] Run `npm test -- --run`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run jpv:enforce`.
- [ ] Run `npm run jpv:policy`.
- [ ] Run `npm run jpv:data-purpose`.
- [ ] Perform mutation challenge in temporary fixtures: change DENIED to VERIFIED, remove a prohibited purpose, expire evidence, remove a provenance field, weaken high-assurance inheritance, remove a negative test/evidence reference, and enable a discretionary bypass; each mutation must be rejected.
- [ ] Compare branch to `main` and verify no unrelated files changed.
- [ ] Review the complete PR against both specs; fix every Critical and Important finding and rerun all gates.
- [ ] Confirm PR remains subject to independent CODEOWNER/reviewer approval; do not self-merge around required review.
- [ ] Commit any final verified fixes as `fix: close high-assurance verification findings` only if changes were required.

## Self-Review Result

Spec coverage mapped: purpose limitation, cross-domain denial, vendor capability review, evidence freshness, anti-laundering, derivation/re-identification, compelled disclosure, no discretionary override, assurance monotonicity, compartmentation/concentration risk as deployment obligation, egress/capability/cryptographic runtime controls as profile requirements, dependency blast radius, provenance, safe emergency operation, people/data/identity/system/crypto/supply-chain/AI/third-party/physical/resilience coverage, protection-system failure, adversarial verification, independent domain review, closure ledger, drift, and terminal evidence semantics.

No `TBD`, `TODO`, or intentionally incomplete implementation steps are permitted. Runtime controls that cannot truthfully be implemented by repository policy alone are represented as explicit profile requirements and coverage-ledger obligations rather than falsely claimed as deployed controls.