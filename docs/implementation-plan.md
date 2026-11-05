# Approved experiment plan

Approved on 5 November 2026: keep Retryglass intact and build three independent OSS prototypes, in ranked order: deployment artifact checker, migration rollout rehearsal, access-revocation test helper. These are validation experiments, not demonstrated demand or release-ready products.

## Deliverables

- [x] Deployproof implementation and six broken/fixed structural fixtures; direct NFT and handwritten container comparisons recorded. All six real smoke cases passed their expected outcomes on OrbStack.
- [x] Rolloutproof implementation, SchemaProof source evaluation and four examples; explicit new-write → old-reader continuity. Four real PostgreSQL scenarios (16 cells) passed their expected outcomes on OrbStack.
- [x] Revokeproof reusable Playwright helper/adapter; broken/fixed/dead-source wire proofs and equivalent plain Playwright baseline.
- [x] Packaging: three independent clean npm consumer imports; installed CLIs where present; copied Revokeproof example passed in another consumer.
- [x] Measurements: reproducible commands and JSON records, explicit environmental blocks, synthetic runtime only; no fabricated setup/adoption metrics.
- [x] Adoption protocol: five developers, three integrations and two retained uses are documented targets; no automatic outreach/publication.
- [x] Required real-container smoke/PostgreSQL gates: passed on macOS arm64 with an explicit compatible client and OrbStack endpoint.
- [ ] Actual outside trials and retained use: not validated; zero participants.

See [verification](verification.md) for the final 61-test result, browser/package evidence and reproducible measurements. Synthetic success is not a substitute for the remaining outside-developer validation step.

## Execution constraints

The implementations now live in separate sibling project folders with their own lockfiles and development tools; the lab is an optional research/index and aggregate runner. Runtime and development dependencies do not cross project boundaries. Application artifacts are inspected as data; external application code executes only inside a constrained disposable container. Revocation wire tests use only the explicitly started synthetic loopback fixture.

The recorded container runtime is OrbStack, selected through `CONTAINER_CLI` and `CONTAINER_HOST` without changing global contexts. Integration commands remain nonzero when prerequisites are unavailable. External developer trials require real participants and cannot be substituted by synthetic examples.

## Independent-folder follow-up

The approved folder split is recorded in the local separation plan, with current results in [independent project verification](independent-projects.md). Retryglass remains in its existing folder. No separate chat is needed to use any project independently. Public GitHub distribution was subsequently authorized for the verified alpha release.
