const owner = 'CVamsi27';
const projects = [
  ['deployproof', 'v0.1.0-alpha.3', 'developer-pain-lab-deployproof-0.1.0-alpha.3.tgz'],
  ['retryglass', 'v0.1.0-alpha.2', 'retryglass-0.1.0-alpha.2.tgz'],
  ['revokeproof', 'v0.1.0-alpha.1', 'developer-pain-lab-revokeproof-0.1.0-alpha.1.tgz'],
  ['rolloutproof', 'v0.1.0-alpha.1', 'developer-pain-lab-rolloutproof-0.1.0-alpha.1.tgz'],
  ['developer-pain-lab'],
];

async function readGitHub(path) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2026-03-10',
    },
    redirect: 'error',
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status} for ${path}`);
  return response.json();
}

function isCount(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

async function observe([name, tag, filename]) {
  const row = { name, url: `https://github.com/${owner}/${name}` };
  try {
    const repo = await readGitHub(name);
    if (repo?.visibility !== 'public' || !isCount(repo.stargazers_count) || !isCount(repo.forks_count)) {
      throw new Error('Public repository counts were unavailable');
    }
    row.stars = repo.stargazers_count;
    row.forks = repo.forks_count;
    if (tag) {
      const release = await readGitHub(`${name}/releases/tags/${tag}`);
      if (release?.tag_name !== tag || release.draft !== false || release.prerelease !== true || !Array.isArray(release.assets)) {
        throw new Error(`Published prerelease ${tag} was unavailable`);
      }
      const asset = release.assets.find(item => item?.name === filename && item.state === 'uploaded');
      const checksum = release.assets.find(item => item?.name === 'SHA256SUMS.txt' && item.state === 'uploaded');
      if (!asset || !checksum || !isCount(asset.download_count)) {
        throw new Error(`Expected uploaded tarball and checksum for ${tag}, with a tarball download count`);
      }
      row.release = { tag, asset: filename, downloads: asset.download_count };
    }
  } catch (error) {
    row.error = error.message;
  }
  return row;
}

const repositories = await Promise.all(projects.map(observe));
const status = repositories.some(row => row.error) ? 'partial' : 'complete';
console.log(JSON.stringify({ observedAt: new Date().toISOString(), status, repositories }, null, 2));
if (status === 'partial') process.exitCode = 2;
