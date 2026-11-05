# Verification record — 5 November 2026

These are local prototype results, not release readiness or developer adoption. No package was published, no outside developer was contacted, and no production resource was used. This workspace remains separate from Retryglass.

> Folder migration: the package paths and workspace commands in this original record describe the pre-split run. Implementations now live in sibling project folders; use [current standalone verification](independent-projects.md) and each project README for current commands. Original artifact paths remain unchanged.

## Environment and commands

Observed: macOS / Darwin arm64, Node 23.7.0, npm 11.5.2, Playwright 1.64.1, Chromium 156.0.8078.4. Containers ran on **OrbStack**, with Docker-compatible server version **29.8.2**. Node >=22 is the declared range; other Node versions, Linux, Windows and other container engines have not been verified. Images and browser/download caches were warm for the final measurements.

A task-local standalone client was selected at `/tmp/retryglass-toolchain/docker/docker/docker`, with endpoint `unix://<local-user>/.orbstack/run/docker.sock`. The Linux engine was started with `orbctl start docker`. No global client wrapper or Docker context was changed. These local paths are recorded evidence, not required installation locations.

From the workspace root, after preparing the browser and images:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run check
npm run pack:check

export CONTAINER_CLI=/absolute/path/to/docker
export CONTAINER_HOST="unix://${HOME}/.orbstack/run/docker.sock"
npm run test:integration
npm run measure
```

The [root README](../README.md#orbstack-runtime) gives explicit image preparation. The runner never pulls images automatically. `CONTAINER_HOST` affects only the supervisor's client environment, overriding its `DOCKER_CONTEXT`; no host settings, socket or source mount enters an application worker.

| Gate | Observed result |
| --- | --- |
| Frozen clean workspace install | Passed during initial setup; no dependency changes in the OrbStack fixes |
| JavaScript syntax | 42 files passed |
| Strict TypeScript consumer of Revokeproof declarations | Passed (`tsc --noEmit --strict`; dependency declarations skipped with `skipLibCheck`) |
| Deployproof behavior tests | 22 passed, 0 failed, 0 skipped |
| Revokeproof behavior/adapter tests | 19 passed, 0 failed, 0 skipped |
| Rolloutproof configuration/orchestration/supervisor tests | 20 passed, 0 failed, 0 skipped |
| Aggregate `npm run check` | Exit 0; **61 tests passed** |
| Independent packed npm consumers | All three passed; public API imports and installed CLI execution where present |
| Copied Playwright example in a fresh installed consumer | 1 actual Chromium test passed during initial packaging validation |
| Real browser integration | 6/6 expected helper/baseline outcomes |
| Deployproof real container integration | Exit 0; six broken/fixed cases matched expectations and cleaned up |
| Rolloutproof real PostgreSQL integration | Exit 0; four scenarios / 16 cells, expected outcomes, complete declared coverage and cleanup |
| Aggregate integration | Exit 0; no blocked or skipped gate |
| Aggregate measurement | Exit 0; all three candidate comparisons completed |
| Scoped post-run inventory | No Deployproof-labelled containers/snapshot images or Rolloutproof-labelled containers/networks remained |
| Outside developer integrations / retained uses | Not validated; **0 participants, 0 integrations, 0 retained uses** |

The final comparison completed at **2026-11-05 12:27:25 UTC**. Its aggregate report is `artifacts/orbstack/measure-final.json`; per-candidate reports and summary are under `artifacts/measurements/2026-11-05T12-26-50.099Z/`. Final check, packaging and integration logs are `artifacts/orbstack/check.log`, `pack-check.log` and `integration.log`. A separate complete PostgreSQL report is `artifacts/orbstack/rollout-integration.json`. All artifacts are local and ignored; regenerate them rather than committing them. Earlier blocked reports under `artifacts/verification/` describe the superseded runtime state.

## What the synthetic comparisons showed

### Deployproof

All six structural fixture outcomes matched independent expectations: three broken cases detected and three healthy equivalents passed. The cases are an escaped workspace link, missing built module, and omitted literal runtime asset. Direct NFT emitted no warnings for the escaped workspace link and omitted asset. NFT supplies a trace rather than a standalone artifact-portability verdict; this is diagnostic evidence for the extra checks, not proof of a unique category or universal advantage.

The real smoke suite and separately handwritten container baseline also matched all six outcomes, with verified cleanup. Each implementation was measured once per fixture. The final static checks took 1.20–7.94 ms and the handwritten container cases 624–699 ms, with images already available. These are different kinds of observation and small warm synthetic samples; they do not measure developer setup time, productivity, real deployment behavior or a general speed advantage. Missing-trace warnings preserve partial coverage even when a concrete structural finding is present. The measurement gate now fails if the baseline disagrees with either a broken or healthy fixture.

### Rolloutproof

Real PostgreSQL 17/bookworm rehearsals ran all four declared combinations for each of the four scenarios. Every schema/seed/migration operation completed, declared assertion coverage was complete, and all cells cleaned up. The measured whole-scenario times were:

| Scenario | Expected/observed exit | Whole-scenario time | Observation |
| --- | --- | --- | --- |
| Breaking rename | 1 / 1 | 6637 ms | Old code rejected the migrated schema |
| Expand-and-contract repair | 0 / 0 | 6633 ms | Declared contracts passed |
| Newly written incompatible data | 1 / 1 | 6680 ms | First three combinations passed; old reader failed only after the new writer |
| Compatible-data control | 0 / 0 | 6584 ms | Declared contracts, including rollback reader, passed |

The new-data failure demonstrates behavior missed by simply observing successful migration application and the first three application/schema combinations. The final phase retains the writer's data in the same database cell. This does not assess lock duration, production data distributions or undeclared application operations. SchemaProof was reviewed as the potential upstream route; no installed comparative benchmark or independent integration is claimed. Injected-executor tests remain labelled `simulated` and are separate from this real SQL evidence.

### Revokeproof

Actual Chromium pages retained two original WebSockets against a fresh synthetic loopback server per case. Both the helper and ordinary Playwright baseline produced the expected outcomes: broken authorization lifecycle → `failed`, repaired lifecycle → `passed`, dead event source → `incomplete`.

The final measurement used two repetitions, alternating helper/baseline order, and recorded **12/12 matching outcomes**. Whole-case warm wall-time medians were approximately **316.32 ms for the helper** and **314.97 ms for the baseline**. Each case deliberately waits a 20 ms grace period and 100 ms before/after observation windows. These small artificial samples establish no speed advantage, setup saving or production latency guarantee.

An earlier clean-consumer check packed Revokeproof, installed that tarball with explicit `@playwright/test@1.64.1` and `ws@8.22.1`, copied its examples into the consumer project and ran the ordinary Playwright spec. It passed independently of the workspace; `artifacts/verification/installed-playwright-example.json` records the outcome. The package README gives equivalent repeatable commands.

## Runtime failures found and corrected

The initial local `docker` wrapper opened OrbStack's GUI and returned text such as `App is already running` rather than server-version evidence; its direct socket probes also timed out. Those initial gates were correctly blocked. Starting OrbStack's Linux engine and selecting a standalone compatible client with an explicit local endpoint made real execution possible. The doctor still rejects successful wrapper chatter instead of treating it as daemon evidence.

Real execution exposed two additional errors that command-boundary tests had missed. A read-only stopped container rejects artifact copying: Deployproof now stages data in a container that is never started, snapshots it, and runs a separate constrained read-only worker. Snapshot and container cleanup verify exact ownership labels. An unnecessary `commit --pause=false` caused this client to print a deprecation notice before its image ID; the stopped staging container now uses plain `commit`, retaining strict digest validation.

PostgreSQL's temporary initialization server answered Unix-socket readiness before `POSTGRES_DB` creation was complete. Rolloutproof now waits on TCP `127.0.0.1`, which the temporary server does not expose, before applying fixtures. Regressions first reproduced these issues and then passed after the fixes. Deployproof additionally requires a stopped/non-OOM state consistent with its numeric wait result. Missing, running, OOM-killed or inconsistent states cannot become a smoke pass.

Other regressions cover warning suppression, bounded source reads, immutable image selection, ownership-checked cleanup, cleanup-time event mutation, and retaining observed violations when a later adapter fails. The final scoped inventory found no labelled run resources remaining. Prepared base and fixture images remain available. No global cleanup was performed.

## Promotion decisions

- **Deployproof:** technical synthetic proof complete; ready for an external usability trial within its documented scope. Diagnostic differences justify investigation, not a demand claim.
- **Rolloutproof:** real PostgreSQL proof complete for the four synthetic scenarios; next evaluate independent contract integration and the documented SchemaProof contribution route.
- **Revokeproof:** ready for a test-ergonomics trial; detection agrees with plain Playwright, so retained use and setup effort must justify the dependency.

Follow the [adoption protocol](adoption-trials.md). None of the independent-developer or retained-use targets has been met or simulated. Publication, outreach and broader platform support remain outside this implementation.
