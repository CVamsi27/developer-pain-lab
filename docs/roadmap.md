# Portfolio roadmap

Adopted on 6 November 2026. Allocate ten hours each week. Spend five on implementation and verification, three on trials and documentation, and two on maintenance. Use up to five additional hours to finish the current milestone. Keep repositories separate and limit feature development to two projects. Keep GitHub tarballs as the public install path and OrbStack for real container work.

| Period | Work |
| --- | --- |
| Months 1–3 | Deployproof alpha.3 preserves findings at the diagnostic cap. Rolloutproof alpha.1 fixes provenance and phase integrity and adds scenario preflight. Retryglass alpha.2 handles interruption with scoped cleanup. Revokeproof alpha.1 exposes sampling times and a pinned Playwright quickstart. The lab directs runtime commands to their owning projects. Open Deployproof enrollment before Retryglass. |
| Months 4–6 | Finish the first cohort for each project in rank order. Apply at most one bounded repair per project, using the trial gate. |
| Months 7–9 | Give the strongest qualifying tool 70% of feature time and the second 30%. Give one qualifier the full feature budget. Prepare a reproducible case study once a project earns repeat use. |
| Months 10–12 | Recheck retention and maintenance effort. Prepare at most one beta after the year-one retention target, two complete consecutive releases, upgrade and rollback verification, and resolution of false-pass and cleanup defects. Container beta candidates demonstrate interruption and scoped cleanup on OrbStack. |

## Conditional work

- Deployproof may add one pinned pnpm 12 example profile after two independent blocked integrations, or explicit artifact-relative required files after two retained users need them. If both qualify, choose the one blocking more retained repositories and favor pnpm on a tie.
- Retryglass measures setup, discovery, crash/recovery and cleanup separately. Two independent BullMQ v6 requirements unlock an eight-hour v6/Redis fixture. Preserve the v5 baseline and require same-job recovery, export, negative controls and cleanup before adding support.
- Revokeproof may add explicit 404 denial only after two retained teams require it, with a live same-resource control and negative cases for broken routes, silent sources and server errors.
- Rolloutproof prepares an upstream PostgreSQL/image fixture and same-state phase proposal after two independent teams need it. Timebox that work to eight hours. Keep the narrower adapter only when its own gate passes and upstream cannot supply equivalent coverage with less setup.
- Keep shutdown, webhook and package-consumer ideas in research. One eight-hour upstream experiment requires the year-one retention target, an actual failing fixture and two independent requests.

Review issues weekly, support cost and retention monthly, and the portfolio rank quarterly. When qualifying projects compete for two slots, prioritize the greater number of retained repositories and break ties in current rank order. Follow the [trial protocol](adoption-trials.md) and each repository's release gates.
