# Competitors and the remaining hypotheses

Reviewed 5 November 2026. Documentation/source inspection establishes advertised scope, not installed behavior, adoption or comparative performance. Package-local measurements compare equivalent synthetic tasks where executable baselines are available. No competing product was installed and benchmarked unless its package evidence explicitly records that run.

## Deployproof

[Node File Trace](https://github.com/vercel/nft) already traces Node imports, require calls and filesystem assets and exposes filesystem hooks and dependency reasons. Reuse it rather than introducing another resolver. [package-consumer-check](https://github.com/cagrikacmaz/package-consumer-check) already tests packed npm libraries in clean consumers; this prototype targets an already-built application directory, not package publication.

The proposed advantage is artifact-boundary containment, broken workspace-link diagnostics and clearer parent/reason chains, with static analysis and observed container smoke kept separate. Compare against direct NFT on exactly the same synthetic file trees. Container startup is a second baseline, not something silently replaced by static tracing when Docker is absent. [pnpm issue 13754](https://github.com/pnpm/pnpm/issues/13754), [pnpm issue 10411](https://github.com/pnpm/pnpm/issues/10411), and [Next.js issue 82626](https://github.com/vercel/next.js/issues/82626) are historical failure-class evidence, not assertions of unresolved current vulnerabilities.

Stop or contribute upstream if direct NFT or a short existing smoke test gives equal/clearer diagnostics with no more setup. Static passes describe inspected paths, not all dynamic imports, native ABI compatibility or complete application behavior.

## Rolloutproof

[SchemaProof](https://github.com/terrizoaguimor/schema-proof) already has migration-first/app-first/rollback-safe compatibility matrices and application-owned setup/contract commands. Its included demonstration uses SQLite and Git worktrees. Our implementation must not claim that the matrix concept is missing or new.

The narrow experiment is a PostgreSQL/prebuilt-image adapter plus an explicit phase that keeps data written by the new application and passes that same state to the old reader. Successful schema application alone is not sufficient. [GitLab migration guidance](https://docs.gitlab.com/development/database/avoiding_downtime_in_migrations/) supports the underlying old-code/new-schema concern.

The preferred upstream route is an adapter/phase contribution with a standalone synthetic repro and measured evidence. No upstream issue, pull request or message has been sent. The local OrbStack run now supplies real PostgreSQL evidence for all four scenarios; see [verification](verification.md). Missing engine/images still block execution; injected-executor tests are orchestration tests only.

## Revokeproof

[WSHawk](https://github.com/regaan/wshawk) already provides stateful WebSocket assessment, HTTP/WebSocket workflows, identity-aware replay, authorization comparisons and browser-assisted evidence. This is not a new security-testing category.

The experiment is whether a small helper inside an ordinary Playwright test makes it easier to retain the original capability, apply the application's own revoke action, wait its declared policy deadline, and prove both rejection and a live unaffected event source. [Supabase Realtime authorization](https://supabase.com/docs/guides/realtime/authorization) documents connection-level policy caching. Expected caching under a product's declared policy is not automatically a vulnerability.

Compare with plain Playwright using the same synthetic broken, repaired and dead-source modes. If the helper does not remove recurring setup or improve failure diagnosis, keep the example or contribute instead of promoting a separate dependency. Passing HTTP denial alone or observing a quiet socket is insufficient.
