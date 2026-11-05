# Developer Pain Lab

- Keep the three packages independently installable. No runtime imports across packages.
- Implementations now live in the sibling deployproof, rolloutproof and revokeproof folders. This folder contains research, historical evidence and optional aggregate runners only; do not restore workspace hoisting or shared runtime dependencies.
- Use only synthetic fixtures and disposable resources. Never load production credentials, databases, queues, or application boot files.
- Deployproof reads application files as data. Application smoke commands and rollout contracts run only inside constrained disposable containers, without Docker socket or host source mounts.
- Revocation examples use only the explicitly started synthetic loopback fixture. Never probe an external application by default.
- Never turn a missing observation, dead control, failed cleanup, timeout, unsupported case, or missing prerequisite into a passing result.
- Do not claim developer adoption, time saved, or platform support without measured evidence. External developer trials remain unvalidated until real participants supply evidence.
- No publication, outreach, production actions, global Docker cleanup, or commits of local run artifacts/secrets.
- Run npm run check and relevant integration gates; record blocked gates separately.

Public GitHub creation and pushes for this alpha are explicitly authorized by the user on 5 November 2026 after readiness checks. Registry publication, outreach, production actions and global cleanup still require their own authorization.
