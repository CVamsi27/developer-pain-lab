# Further repository exploration — 5 November 2026

This pass checked public repository metadata and README content. It did not run their full test suites, prove adoption or establish that a category has no other competitors. No maintainer was contacted and no upstream issue or pull request was opened.

## Existing projects worth using or contributing to

| Repository | Observed scope | Consequence for this work |
| --- | --- | --- |
| [publint](https://github.com/publint/publint) | Package metadata/artifact compatibility diagnostics | Use it for these alpha packages; another metadata linter needs a demonstrated missing behavior. |
| [Are the Types Wrong?](https://github.com/arethetypeswrong/arethetypeswrong.github.io) | TypeScript package resolution across module/resolution modes | Complement installed-consumer checks; do not infer types work from a repository build alone. |
| [package-consumer-check](https://github.com/cagrikacmaz/package-consumer-check) | Fresh tarball consumers for ESM, CommonJS, types and CLI | Already covers the generic clean-install workflow. A contribution is preferable to a fifth overlapping wrapper. |
| [Knip](https://github.com/webpro-nl/knip) | Unused dependencies, exports and files in JS/TS projects | Distinct from checking a shipped folder's containment. Reproduce a framework/dynamic-import gap before proposing new tooling. |
| [Terminus](https://github.com/godaddy/terminus) | HTTP readiness/liveness and graceful shutdown hooks | Reuse lifecycle implementation; an end-to-end drain verifier must demonstrate something beyond installing these hooks. |
| [Lightship](https://github.com/gajus/lightship) | Startup/readiness/liveness and shutdown behavior for Node services | Another shutdown library is weak differentiation. Contribution and real-contract examples should be evaluated first. |
| [Hooklistener CLI](https://github.com/hooklistener/hooklistener-cli) | Webhook capture, forwarding, inspection and replay workflows | Generic webhook replay is already supplied. Local state assertions and failure semantics need direct comparison. |

Metadata at this pass listed these repositories as accessible and not archived. Exact README blobs were recorded in local ignored research artifacts. This is source inspection, not a comparative product benchmark or endorsement of every platform/security property.

Two npm results advertised `hookloop` and `drainwatch`, but their linked `root-Manas` GitHub repositories returned not found through both public browsing and authenticated GitHub lookup. Their source availability could not be established; absence of accessible source is not evidence the advertised features or competing packages do not exist. They must not be used to justify a uniqueness claim.

## Candidate experiments before another project

**1. Shutdown contract integration:** keep an already-accepted synthetic request active, send SIGTERM to the actual server in a constrained disposable cell, and observe its declared response/effect plus an unaffected control. Compare ordinary tests and Terminus/Lightship examples. Include healthy drain, early exit, dead traffic source and timeout controls. Continue only if an independent developer can retain it with less repeated setup. This is a hypothesis, not an implemented fifth tool.

**2. Webhook state-contract adapter:** after duplicate, delayed or reordered synthetic delivery, evaluate application-owned final-state assertions. Compare existing replay/case tools first; GitHub's [webhook guidance](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks) documents delivery identification and retry-related concerns. HTTP success alone does not establish that the application's declared state is correct. Prefer a small adapter or upstream example if that supplies the missing workflow.

**3. Package compatibility fixtures upstream:** use actual packed artifacts and clean consumer cases to reproduce a module/type/export failure, then contribute the fixture to publint, ATTW or package-consumer-check. This has a clear existing-project path and avoids claiming a new general category. No upstream change has been submitted.

## Investment decision

Keep the four current tools as explicit alphas. Start independent integration trials before expanding them into platforms. Prioritize a verified upstream fixture or adapter over another standalone repository when existing code already supplies the core behavior. Five trials, three successful integrations and two retained uses remain continuation targets for each candidate; current independent participation remains zero.
