import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../scripts/discovery.js', import.meta.url));
const pins = {
  deployproof: ['v0.1.0-alpha.3', 'developer-pain-lab-deployproof-0.1.0-alpha.3.tgz'],
  retryglass: ['v0.1.0-alpha.2', 'retryglass-0.1.0-alpha.2.tgz'],
  revokeproof: ['v0.1.0-alpha.1', 'developer-pain-lab-revokeproof-0.1.0-alpha.1.tgz'],
  rolloutproof: ['v0.1.0-alpha.1', 'developer-pain-lab-rolloutproof-0.1.0-alpha.1.tgz'],
};

function runDiscovery(partial = false) {
  // Keep the actual command, HTTP response parsing, and exit behavior under test.
  const setup = `
    const pins = ${JSON.stringify(pins)};
    globalThis.fetch = async (url) => {
      const [, repo, release] = /^https:\\/\\/api\\.github\\.com\\/repos\\/CVamsi27\\/([a-z-]+)(?:\\/releases\\/tags\\/(.+))?$/.exec(url);
      if (!release) {
        if (${partial} && repo === 'revokeproof') return new Response(null, { status: 403 });
        return Response.json({ visibility: 'public', stargazers_count: 7, forks_count: 2 });
      }
      const [tag, name] = pins[repo];
      if (release !== tag) return new Response(null, { status: 404 });
      return Response.json({
        tag_name: tag, draft: false, prerelease: true,
        assets: [
          { name, state: ${partial} && repo === 'rolloutproof' ? 'new' : 'uploaded', download_count: 11 },
          { name: 'SHA256SUMS.txt', state: 'uploaded', download_count: 31 },
        ],
      });
    };
  `;
  return spawnSync(process.execPath, ['--import', 'data:text/javascript,' + encodeURIComponent(setup), script], {
    encoding: 'utf8',
    timeout: 5_000,
  });
}

test('reports the pinned tarball counters and gives the lab a repository-only row', () => {
  const result = runDiscovery();
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.status, 'complete');
  assert.equal(report.repositories.length, 5);
  const deployproof = report.repositories.find(row => row.name === 'deployproof');
  assert.equal(deployproof.stars, 7);
  assert.equal(deployproof.forks, 2);
  assert.equal(deployproof.release.tag, 'v0.1.0-alpha.3');
  assert.equal(deployproof.release.downloads, 11);
  assert.equal(report.repositories.find(row => row.name === 'developer-pain-lab').release, undefined);
});

test('keeps available observations and exits 2 when GitHub evidence is incomplete', () => {
  const result = runDiscovery(true);
  assert.equal(result.status, 2, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.status, 'partial');
  const byName = Object.fromEntries(report.repositories.map(row => [row.name, row]));
  assert.equal(byName.revokeproof.stars, undefined);
  assert.match(byName.revokeproof.error, /HTTP 403/);
  assert.equal(byName.rolloutproof.stars, 7);
  assert.equal(byName.rolloutproof.release, undefined);
  assert.match(byName.rolloutproof.error, /uploaded/);
  assert.equal(byName.retryglass.release.downloads, 11);
});
