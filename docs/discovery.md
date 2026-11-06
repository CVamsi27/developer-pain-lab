# Monthly discovery review

From the lab, run the read-only check with Node 22 or later.

```sh
npm run --silent discovery
```

The command reads public GitHub repository and release metadata without credentials or sibling checkouts. It returns a UTC timestamp, stars and forks, and the cumulative download count for each pinned package tarball. It checks that GitHub lists the tarball and checksum as uploaded. An unavailable repository, missing asset, or unreadable count produces a partial report and exit 2. Available observations stay in the report.

At the monthly review, add a dated row for each repository. Record missing observations as unverified. Compare download counts only for the same asset. When a new version ships, update its pin in `scripts/discovery.js` and the fixture in `tests/discovery.test.js`, then start a fresh count for that asset. Tarball downloads can include retries, maintainer checks and CI. Record integrations and later use in the [trial record](adoption-trials.md).

## First observation

The 6 November 2026 snapshot was taken at 06:47 UTC, before a separate anonymous download check. All five repositories were public. All four downloaded packages matched their published checksums and the original release hashes.

| Repository | Stars | Forks | Pinned package | Cumulative tarball downloads |
| --- | ---: | ---: | --- | ---: |
| [Deployproof](https://github.com/CVamsi27/deployproof) | 0 | 0 | [alpha.3](https://github.com/CVamsi27/deployproof/releases/tag/v0.1.0-alpha.3) | 2 |
| [Retryglass](https://github.com/CVamsi27/retryglass) | 0 | 0 | [alpha.2](https://github.com/CVamsi27/retryglass/releases/tag/v0.1.0-alpha.2) | 2 |
| [Revokeproof](https://github.com/CVamsi27/revokeproof) | 0 | 0 | [alpha.1](https://github.com/CVamsi27/revokeproof/releases/tag/v0.1.0-alpha.1) | 2 |
| [Rolloutproof](https://github.com/CVamsi27/rolloutproof) | 0 | 0 | [alpha.1](https://github.com/CVamsi27/rolloutproof/releases/tag/v0.1.0-alpha.1) | 2 |
| [Developer Pain Lab](https://github.com/CVamsi27/developer-pain-lab) | 0 | 0 | Repository only | — |

The next review follows the Deployproof enrollment window, which closes 5 December 2026 in Asia/Kolkata. Review participation and any reported setup blockers separately from these counts.
