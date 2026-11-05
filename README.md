# Developer Pain Lab

Research, validation history and optional aggregate commands for four separate project folders. This directory is no longer an npm workspace and contains no product implementation or shared runtime dependencies. Developer adoption remains unvalidated.

| Independent project | Folder beside this one | Developer question |
| --- | --- | --- |
| [Retryglass](https://github.com/CVamsi27/retryglass) | `../retryglass` | Where does a same-job retry duplicate or lose a declared effect? |
| [Deployproof](https://github.com/CVamsi27/deployproof) | `../deployproof` | Does the shipped Node folder still depend on files in the source repository? |
| [Rolloutproof](https://github.com/CVamsi27/rolloutproof) | `../rolloutproof` | Does migration or newly written data break old application instances or rollback? |
| [Revokeproof](https://github.com/CVamsi27/revokeproof) | `../revokeproof` | Does the original connection retain access after revocation? |

Each folder owns its source, tests, examples, dependencies, lockfile, license, operating rules and documentation. No project needs this lab or another project's node_modules. Existing `@developer-pain-lab/*` package identities are retained for import compatibility; they are unpublished working names, not workspace dependencies or a claim to registry ownership.

## Work on a single project

For Deployproof, Rolloutproof or Revokeproof, run these commands from that project's root:

```sh
npm ci --ignore-scripts
npm run check
npm run pack:check
npm run test:integration
npm run measure
```

Node 24.22.1 is selected in each `.node-version`; package manifests retain the existing >=22 range. Check the project README for explicit image/browser prerequisites. Retryglass keeps its separate pnpm toolchain and commands documented in its own README.

`check` checks JavaScript syntax and behavior tests; Revokeproof also compiles its own strict TypeScript consumer. `pack:check` installs a tarball into a fresh npm consumer and checks public imports and any installed CLI. Missing prerequisites are nonzero failures, never skipped success.

## Optional aggregate commands

Install dependencies separately in the three npm project roots first. From this research folder:

```sh
npm ci --ignore-scripts
npm run check
npm run pack:check
npm run test:integration
npm run measure
```

These commands execute each sibling project's own npm scripts, sequentially. Missing project folders or failed commands fail the aggregate gate. `measure` preserves per-project JSON and nonzero failure semantics under ignored `artifacts/measurements/`. It covers the three experiments; Retryglass remains independently verified in its own project.

## OrbStack runtime

Use OrbStack's Linux engine and a working Docker-compatible command-line client. Select the endpoint without changing global context:

```sh
orbctl start docker
export CONTAINER_CLI=/absolute/path/to/docker
export CONTAINER_HOST="unix://${HOME}/.orbstack/run/docker.sock"

# Explicit preparation; no runner automatically pulls images.
env -u DOCKER_CONTEXT DOCKER_HOST="$CONTAINER_HOST" "$CONTAINER_CLI" pull node:22-alpine
env -u DOCKER_CONTEXT DOCKER_HOST="$CONTAINER_HOST" "$CONTAINER_CLI" pull postgres:17-bookworm
env -u DOCKER_CONTEXT DOCKER_HOST="$CONTAINER_HOST" "$CONTAINER_CLI" build --tag rolloutproof-fixture:local ../rolloutproof/examples/fixture
npm run test:integration
```

Revokeproof uses actual Chromium against its explicitly started synthetic loopback fixture; install the matching browser explicitly from its project with `npx playwright install chromium`. Retryglass uses its separately named `RETRYGLASS_CONTAINER_*` overrides.

Client settings stay in supervisor processes and never enter application workers. No host socket/source mounts, production services, credentials, external probing or global cleanup are used. Other platform/profile support remains unverified unless recorded in the project evidence.

## Evidence and continuation

See [further repository exploration](docs/more-repositories.md), [independent folder verification](docs/independent-projects.md), the [original technical evidence](docs/verification.md), [competitor comparisons](docs/comparisons.md), and [adoption targets](docs/adoption-trials.md). Historical artifacts remain here; new project-local run output belongs to that project's ignored artifacts directory.

Synthetic successes are technical evidence, not proof of demand, setup-time savings or retained use. Each experiment still needs five independent developers, three successful integrations and two later retained uses as targets. There are zero trial participants. Public source and alpha distribution are explicitly authorized for this release. No npm registry publication, outreach or production action is included.

## Clone the independent repositories

```sh
for project in retryglass deployproof rolloutproof revokeproof developer-pain-lab; do
  git clone "https://github.com/CVamsi27/${project}.git"
done
```

The optional aggregate scripts locate the three npm projects beside this index. Install dependencies in each project first; the lab supplies no shared node_modules. Each repository remains usable alone. Public source, CI status and GitHub release assets are separate from npm registry publication or validated demand. See [contributing](CONTRIBUTING.md), [security](SECURITY.md) and [changes](CHANGELOG.md).
