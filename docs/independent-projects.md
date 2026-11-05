# Independent project folders — 5 November 2026

| Project | Standalone root | Dependency owner |
| --- | --- | --- |
| Retryglass | `../../retryglass` | Existing pnpm lock and Node 24 toolchain |
| Deployproof | `../../deployproof` | Own npm lock and Node modules |
| Rolloutproof | `../../rolloutproof` | Own npm lock; fixture image installs its own app dependency closure |
| Revokeproof | `../../revokeproof` | Own npm lock, Playwright, TypeScript and type consumer |

Paths above are relative to this file's directory. Each project has its own Git root, operating rules, license, tests, source, examples and documentation. No implementation remains under the lab's former `packages/` path. The lab has no workspace entries or shared runtime/development dependencies.

## Verification protocol

Each new project is copied by itself into an unrelated temporary folder, excluding node_modules, Git metadata, local artifacts, browser output and environment files. The copy receives a frozen `npm ci --ignore-scripts`, then its own `check`, `pack:check` and real `test:integration`. The temporary parent has no lab or sibling implementations. The verifier removes temporary copies and records each exit status and output under ignored `artifacts/separation/`.

All isolated-source gates passed on Node 24.22.1 / macOS arm64. Each frozen install, project-local check, clean packed-consumer check and real integration exited zero without timeout:

| Project | Behavior tests | Real integration |
| --- | --- | --- |
| Deployproof | 22 passed | Six artifact broken/fixed container cases |
| Rolloutproof | 20 passed | Four PostgreSQL scenarios / 16 cells |
| Revokeproof | 19 passed; strict TypeScript consumer passed | Six helper/baseline Chromium cases |

The optional aggregate check passed all 61 behavior tests. Aggregate comparison measurements from the sibling roots also passed for all three projects. The coordinator lockfile has one root entry with no dependencies or workspace declarations; all three project lockfiles have zero workspace-link records. Runtime source files and public package identities were preserved.

Root evidence is in ignored `artifacts/separation/isolated-source.json`, `coordinator-check.log` and `coordinator-measure.json`; project-specific logs were also copied into each project's own ignored `artifacts/separation/`. The original artifact history remains in the lab. Temporary source copies and tarball consumers were removed.

Retryglass's implementation and prior 149-unit/11-integration/20-repeat verification were not changed by this folder split; see its [verification record](../../retryglass/docs/evidence/verification-2026-11-05.md). Earlier numerical gates are historical until rerun; no unrelated lengthy checks are repeated merely for moving the other projects.

## Working independently

Open any project folder directly in an editor or Codex chat. Its README gives the commands and prerequisites; no lab-root install or sibling project is required. Separate chats can be created later for independent work but are unnecessary for this completed folder organization. Existing scoped package names remain unchanged, preserving import compatibility without publishing or reserving registry names.

OrbStack remains the local engine. Application artifacts/contracts execute only inside their existing constrained cells; the browser fixture is explicitly synthetic and loopback-only. Adoption remains zero participants, integrations and retained uses. No publication, outreach, production access or global cleanup occurred.
