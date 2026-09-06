# High-Assurance Protection Design

## Status

Proposed final hardening for user review on 2026-09-06.

## Relationship to the Data Purpose Boundary

This specification extends `2026-09-06-data-purpose-boundary-design.md`. It does not replace, weaken, bypass, or create exceptions to that design. The Data Purpose Boundary is the universal protection floor. This specification adds a risk-scaled high-assurance layer for environments where consequences, adversary capability, sensitivity, or dependency criticality justify stronger safeguards.

Higher assurance may add protection. It may not remove the universal protection floor.

## Objective

JPV-OS must protect every person, system, dataset, service, device, workload, credential, communication path, dependency, consequential decision, and lifecycle phase that JPV can reasonably protect, using safeguards that are safe, lawful, technically justified, proportionate to risk, independently verifiable where possible, and designed not to create greater aggregate harm than they prevent.

The objective is maximum defensible protection, minimum necessary exposure, no silent downgrade, no unverified trust, no discretionary bypass, safe failure, recoverability, and continuous adversarial verification.

No safeguard is accepted merely because it exists or is considered industry best practice. Safeguards must be evaluated for security benefit and counter-risk, including availability, accessibility, privacy, safety, complexity, recovery, false positives, lockout risk, concentration risk, and new attack surface.

## Architecture

The architecture has two composable tiers:

1. **Universal Protection Floor** — the Data Purpose Boundary and existing People Protection, Security, and Governance requirements apply to all governed systems.
2. **High-Assurance Profiles** — additional safeguards are selected from actual threat, consequence, sensitivity, legal authority, operational dependency, and deployment characteristics rather than organizational prestige or customer label.

A White House-class, hospital, critical-infrastructure, research, financial, enterprise, or other severe-consequence environment may require a high-assurance profile. The profile is government-agnostic and capability/risk driven.

Profiles must be monotonic: increasing assurance may only preserve or strengthen applicable protections. No profile can authorize a silent downgrade.

## Non-Bypassability Invariant

A protection is not implemented merely because a policy rule exists.

Every technically reachable path capable of producing the protected effect must either pass through the applicable enforcement boundary or be proven incapable of bypassing it. This includes direct access, exports, bulk downloads, APIs, analytics, logs, telemetry, caches, queues, replicas, temporary stores, backups, derived outputs, model/tool calls, administrative paths, recovery paths, emergency paths, vendor paths, and indirect delegation.

No equivalent effect may be obtained by splitting an operation across otherwise permitted components.

## Compartmentation and Concentration Risk

Central governance must not require central possession of all sensitive information.

Sensitive domains remain compartmented according to need, purpose, authority, consequence, and threat. Policy engines receive only the minimum signals necessary to decide. High-assurance design must avoid creating an omniscient repository, universal identity graph, universal search surface, or single compromise point merely for administrative convenience.

Where cross-compartment processing is justified, it requires an explicit mediated boundary, minimum-necessary disclosure, purpose authorization, provenance, constrained output, and receipt.

## Capability-Bound Authorization

Where technically appropriate, broad standing access is replaced with narrowly scoped, short-lived authorization capabilities bound to authenticated actor/workload identity, purpose, operation, data classes or fields, recipient, policy version, constraints, and expiration.

Possession of credentials, network location, administrative role, organizational affiliation, or prior authorization is not sufficient by itself to authorize a protected operation.

Delegation must be explicit, bounded, attributable, non-amplifying, and revocable. A delegate cannot receive greater authority than the delegating principal possesses for the operation.

## Purpose-Aware Egress Mediation

Protected information must use governed egress paths wherever architecture permits. Exports, APIs, bulk transfer, analytics outputs, model calls, files, reports, downstream vendor transfer, and administrative extraction are subject to the same purpose and authorization boundary as interactive access.

Alternate egress paths are prohibited unless they provide equivalent or stronger enforcement and evidence.

Egress decisions must support minimization and constrained answers. Where a downstream task requires only a conclusion such as eligibility, the architecture should prefer disclosing the conclusion over disclosing the sensitive source facts when technically, legally, and operationally appropriate.

## Information-Flow Labels

Protected information carries machine-readable classification, provenance, purpose, and handling metadata through supported transformations. Restrictions follow the information when copied, transformed, joined, inferred, tokenized, pseudonymized, embedded, scored, aggregated, modeled, cached, exported, or restored.

Derived information inherits applicable restrictions unless a verified rule establishes a lawful and safe change. Loss or corruption of required labels fails closed for protected release.

## Cryptographic Policy Binding and Receipts

Authorization receipts must bind, where technically feasible, cryptographic digests or equivalent tamper-evident identifiers for the exact policy version, declaration, relevant evidence set, decision inputs, configuration state, actor/workload identity, purpose, requested data, recipient, decision, constraints, and time.

A receipt proves what the governed JPV enforcement boundary permitted or denied under the referenced state. It does not claim knowledge of activity outside JPV-observable or legally auditable infrastructure.

Receipts and verification evidence must be tamper-evident and independently reproducible to the extent technically possible.

## Separation of Duties

No single person or identity may unilaterally propose a heightened-risk flow, supply or alter its verification evidence, approve the flow, weaken its enforcement, and deploy it.

Sensitive changes require role separation appropriate to consequence. The architecture must resist collusion by reducing unnecessary shared authority and preserving independent evidence.

Founders, administrators, executives, customers, vendors, and emergency operators receive no discretionary bypass.

## Exceptional Disclosure

Exceptional disclosure does not mean ungoverned disclosure.

Where lawful, necessary, and practicable, exceptional high-impact releases require authorization by distinct roles. The disclosure remains purpose-specific, minimum-necessary, attributable, time/scope bounded, reviewable, and receipted. Emergency operation may accelerate an authorized path but may not silently erase protected-data requirements.

## Deletion and Cryptographic Erasure

Deletion must address primary stores, replicas, caches, indexes, derived stores, supported backups, downstream recipients, and relevant keys according to the declared retention and recovery model.

Where technically justified, scoped encryption and cryptographic erasure may provide additional evidence that retained ciphertext is inaccessible after key destruction. Cryptographic erasure supplements rather than substitutes for required deletion, downstream cessation, legal retention analysis, and vendor evidence.

Deletion claims must identify what was deleted, what was rendered inaccessible, what remains under lawful retention, what exists outside JPV authority, and what remains externally unverifiable.

## Privacy-Preserving Computation

High-assurance designs must consider privacy-preserving computation when it materially reduces exposure without unacceptable correctness, availability, safety, or operational risk. Candidate mechanisms may include tokenization, confidential computing or trusted execution environments, selective disclosure, private set intersection, differential privacy for suitable aggregate analysis, and zero-knowledge proofs.

No mechanism is mandatory by name. Selection requires a documented threat, benefit, limitations, failure behavior, and residual-risk analysis. Security theater is not an accepted justification.

## Synthetic Canary and Honey Data

Synthetic canary or honey records may be used to detect unauthorized propagation when appropriate. Such records must be clearly governed as synthetic internally, must not correspond to real people, and must be prevented from contaminating real-person decisions, investigations, eligibility, training data, external authoritative records, or other consequential processing.

Detection value must be weighed against propagation and false-attribution risk.

## Trust Decay and Evidence Freshness

VERIFIED is not permanent.

Evidence has a validity period determined by sensitivity, volatility, dependency risk, threat, and change rate. Expired or materially stale evidence cannot sustain VERIFIED status. Material changes trigger immediate re-evaluation regardless of nominal review date.

The system must not silently extend trust because a review was missed.

## Dependency Blast Radius

Verification dependencies form a machine-readable graph. When a vendor, subprocessor, dataset, key, identity provider, policy, evidence source, model, build artifact, authorization service, or other dependency becomes compromised, stale, contradictory, revoked, or materially changed, JPV-OS must identify every governed flow whose verification depended on it.

Affected flows move to the safe state required by their dependency and risk classification, including QUARANTINED or DENIED where protected release can no longer be justified.

## Provenance Graph

JPV-OS maintains sufficient lineage to establish source, declared purpose, transformations, derived artifacts, recipients, authorization decisions, retention/deletion state, and relevant dependencies without constructing unnecessary surveillance graphs about people's lives.

Provenance collection itself is subject to minimization, purpose limitation, retention, access restrictions, and protection from secondary use.

## Safe Emergency Operation

Break-glass capability must not become bypass capability.

Emergency operation may preserve life, safety, availability, or continuity under separately lawful authority. It must use the narrowest technically viable path, stronger attribution and logging, explicit expiration, post-event independent review, and automatic revocation. It may not convert UNKNOWN, QUARANTINED, DENIED, or stale protected-data handling into VERIFIED by discretion.

## Reproducible Verification

Given the same repository commit, policy version, schemas, evidence set, declarations, relevant configuration, and deterministic inputs, independent verification should produce the same authorization result wherever technically feasible.

Nondeterministic evidence or decisions must be explicitly identified and bounded. Human judgment cannot be silently represented as deterministic proof.

## People and Consequential Decisions

Protection includes privacy, informed consent where applicable, autonomy, accessibility, due process, correction, appeal, non-discrimination, protection from coercion, protection of minors and vulnerable populations, insider-abuse resistance, and safeguards around consequential automated or assisted decisions.

A security mechanism that prevents a person from exercising an applicable right or obtaining an essential service requires explicit safety and accessibility analysis and a safe recovery path.

## Data Lifecycle Coverage

Protection applies to collection, receipt, generation, inference, transformation, linkage, storage, use, query, computation, transmission, export, replication, backup, restoration, archival, retention, correction, deletion, decommissioning, migration, acquisition, and verified destruction.

Data residency, jurisdiction, legal hold, and records-preservation requirements must be represented where applicable without converting preservation into unrelated use authority.

## Identity Coverage

Governed identity includes people, workloads, services, devices, machines, applications, automation, agents, and privileged identities.

High-assurance profiles evaluate phishing-resistant authentication where appropriate, least privilege, short-lived authorization, delegation, revocation, privileged-access isolation, account recovery, device/workload trust, credential lifecycle, identity-provider compromise, and non-human identity sprawl.

Recovery cannot be materially weaker than the security boundary it restores.

## System and Infrastructure Coverage

Applicable protection extends to endpoints, networks, applications, APIs, databases, cloud services, containers, virtualization, edge systems, IoT/OT where present, firmware, administrative planes, build/deployment infrastructure, and physical infrastructure.

High-assurance profiles evaluate segmentation, compartmentation, secrets management, configuration integrity, secure boot and attestation where warranted, vulnerability management, hardened administration, denial-of-service resilience, and dependency isolation.

## Cryptographic Coverage

Cryptographic architecture addresses data at rest and in transit and, where justified, data in use; key generation, custody, access, rotation, revocation, backup, recovery, destruction, hardware-backed protection where warranted, algorithm agility, protocol downgrade resistance, and migration planning for post-quantum cryptography.

Cryptography must not create unrecoverable availability failures without an explicitly accepted consequence model.

## Software, AI, and Supply-Chain Coverage

High-assurance review covers source provenance, dependencies, build systems, artifacts, packages, deployment provenance, SBOM or equivalent inventory where applicable, signing, reproducibility where feasible, vulnerability handling, update integrity, and compromised dependency/update resistance.

AI/ML coverage includes model and dataset provenance, training/fine-tuning data where governed, prompts and context, retrieval sources, tool permissions, agent authority, prompt injection, poisoned inputs, excessive agency, model/data exfiltration, unsafe consequential decisions, evaluation, rollback, and model/provider drift.

AI output is not trusted merely because a model generated it. Consequential actions require the same authorization and evidence boundaries as equivalent non-AI actions.

## Third-Party and Legal-Authority Coverage

Vendors, subprocessors, affiliates, acquisitions, APIs, data brokers, government requests, institutional partners, and dependency chains are evaluated by actual capability and reachable data path.

Legal authority is represented explicitly by jurisdiction, scope, applicability, and evidence. Legal, government, national-security, research, fraud, safety, or emergency labels are not universal bypasses.

JPV does not invent authority where applicability is uncertain. Unresolved authority is identified as unresolved and routed to appropriate qualified review before protected release where required.

## Physical and Environmental Coverage

Where deployment includes physical assets, profiles evaluate facilities, device custody, removable media, loss/theft, tampering, power, fire, water/flood, environmental conditions, physical access, destruction, and recovery.

Controls are proportionate to the actual physical threat and consequence.

## Availability, Resilience, and Continuity

Security includes the ability to continue or safely degrade.

Applicable profiles address redundancy, backup integrity, restoration testing, disaster recovery, dependency failure, denial-of-service, offline or isolated operation where required, graceful degradation, continuity of essential functions, recovery objectives, and verified restoration.

Fail-closed behavior must be defined per operation. Where immediate denial would itself create unacceptable safety harm, the architecture must define a pre-authorized constrained safe mode rather than inventing an emergency bypass at runtime.

## Detection, Response, and Recovery

High-assurance profiles require trustworthy telemetry appropriate to the threat, tamper evidence, anomaly detection, containment, evidence preservation, forensic readiness, notification where appropriate and lawful, remediation, recovery, credential/key rotation where implicated, downstream cessation/correction, and terminal verification.

Detection without containment and recovery is incomplete.

## Protection-System Failure

The architecture must define behavior when the protection system itself fails.

Threat cases include policy-engine unavailability, evidence-store corruption, clock disagreement, lost or compromised keys, identity-provider compromise, telemetry loss, malicious or compromised verifier, contradictory policy, deployment of stale policy, dependency-graph corruption, partial network partition, recovery-system compromise, and collusion between trusted components.

Each critical failure mode requires a predetermined safe state, bounded recovery authority, evidence preservation, and independent post-recovery verification.

## Verification Architecture

No protected-data or heightened-consequence capability is production-ready until every applicable normative requirement has:

1. an identified enforcement point;
2. a positive test proving the permitted path;
3. an adversarial or negative test proving prohibited paths fail;
4. current evidence supporting assumptions and dependencies; and
5. independent review with zero unresolved Critical or Important findings.

A requirement-to-control-to-test-to-evidence traceability ledger is mandatory for applicable requirements.

## Adversarial Verification

Verification must include threat modeling and abuse cases, negative testing, property-based testing where appropriate, mutation testing of enforcement rules, fuzzing where appropriate, penetration testing appropriate to reachable attack surface, red-team exercises for high-consequence profiles, and formal or model-based verification for the smallest critical authorization/state-machine core where practical.

Required invariants include at minimum:

- UNKNOWN never authorizes protected release.
- DENIED never authorizes protected release.
- QUARANTINED never authorizes ordinary protected release.
- Expired evidence cannot sustain VERIFIED.
- A prohibited direct effect cannot become permitted through delegation, derivation, relabeling, intermediary use, or operation splitting.
- Higher-assurance profiles cannot weaken the universal protection floor.
- Missing mandatory provenance or authorization evidence cannot silently become success.

Mutation tests must demonstrate that meaningful weakening of these protections is detected by the verification suite.

## Independent Domain Review

Before high-consequence deployment, the architecture must be evaluated through the applicable domain lenses, including privacy/data protection, security/zero trust, identity/biometrics, healthcare, financial/consumer-reporting, AI/ML, software supply chain, government/legal process, cryptography, incident response, resilience/continuity, physical/OT where applicable, accessibility/human impact, and jurisdiction-specific legal requirements.

Applicable authoritative standards and legal requirements must be cross-checked against current primary sources. Requirements are tagged by applicability and jurisdiction rather than copied indiscriminately into universal policy.

## Coverage Ledger and Closure Condition

Every identified asset, actor, data state, trust boundary, lifecycle phase, consequential action, threat class, failure mode, dependency, and technically reachable ingress/egress path must have exactly one explicit disposition:

- **PROTECTED** — an enforceable safeguard and verification evidence exist.
- **PROHIBITED** — the capability/path is intentionally unavailable and enforcement proves it.
- **NOT_APPLICABLE** — evidence establishes why the item does not apply.
- **EXTERNALLY_UNVERIFIABLE** — JPV cannot establish the external fact; compensating protection and residual risk are explicit.

Silence is not a disposition. UNKNOWN is not equivalent to NOT_APPLICABLE.

The coverage ledger must identify the requirement, scope, enforcement point, test, evidence, reviewer, current status, dependencies, and re-verification trigger.

## Assurance and Drift

Verification is continuous across design, procurement, development, deployment, operation, modification, incident recovery, acquisition, migration, decommissioning, and destruction.

Changes to schemas, vendors, subprocessors, APIs, purposes, data classes, permissions, models, dependencies, retention, legal authority, acquisition state, cryptographic configuration, build provenance, identity systems, or supporting evidence trigger re-evaluation according to materiality. Material unresolved change cannot remain silently VERIFIED.

## Terminal Evidence Semantics

Terminal results distinguish at least:

- **PROVEN** — established within JPV-governed, observable, and reproducibly verifiable boundaries.
- **SUPPORTED** — supported by identified external or non-reproducible evidence with stated limitations.
- **EXTERNALLY_UNVERIFIABLE** — outside JPV's technical or legal ability to establish; compensating protection and uncertainty are recorded.

These evidence semantics prevent incomplete knowledge from being represented as certainty.

## Implementation Boundary

This specification defines architecture and acceptance requirements. Implementation must be decomposed into independently testable units and must not create a monolithic policy engine or centralized sensitive-data repository.

The implementation plan must map these requirements onto the existing JPV-OS repository and identify which requirements are universally enforceable in repository policy, which require deployment-profile configuration, which require runtime integration, and which require external evidence or qualified review.

No placeholder implementation may satisfy a normative requirement.

## Success Criteria

This design is complete only when:

- the Data Purpose Boundary remains the non-weakenable universal floor;
- high-assurance profiles add protection monotonically according to actual risk;
- non-bypassability is explicitly enforced and tested;
- concentration risk and compartmentation are addressed;
- people, data, identity, systems, infrastructure, cryptography, supply chain, AI, third parties, legal authority, physical/environmental risk, availability, incident response, and lifecycle are explicitly covered where applicable;
- protection-system failure has predetermined safe states;
- requirement-to-control-to-test-to-evidence traceability exists;
- adversarial and independent domain review are required for high-consequence deployment;
- drift automatically invalidates unsupported trust;
- every coverage-ledger item has an explicit disposition;
- externally unverifiable facts are never represented as proven; and
- no discretionary actor can silently weaken or bypass the protection floor.