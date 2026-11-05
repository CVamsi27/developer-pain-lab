import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from './projects.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'artifacts', 'measurements', new Date().toISOString().replaceAll(':', '-'));
await mkdir(output, { recursive: true });
const results = [];

for (const { name: project, directory } of projects) {
  const started = performance.now();
  const result = await new Promise(resolve => {
    const child = spawn('npm', ['run', 'measure', '--silent'], {
      cwd: directory, stdio: ['ignore', 'pipe', 'pipe'], shell: false, detached: process.platform !== 'win32',
    });
    const buffers = { stdout: '', stderr: '' };
    let exceeded = false;
    let timedOut = false;
    const stop = () => {
      try { if (process.platform !== 'win32' && child.pid) process.kill(-child.pid, 'SIGKILL'); else child.kill('SIGKILL'); } catch { /* The process may already have exited. */ }
    };
    const timer = setTimeout(() => { timedOut = true; stop(); }, 180_000);
    for (const stream of ['stdout', 'stderr']) child[stream].on('data', chunk => {
      buffers[stream] += chunk.toString();
      if (Buffer.byteLength(buffers[stream]) > 2 * 1024 * 1024) { exceeded = true; stop(); }
    });
    child.once('error', error => { clearTimeout(timer); resolve({ code: null, error: error.message, ...buffers }); });
    child.once('close', code => { clearTimeout(timer); resolve({ code, timedOut, exceeded, ...buffers }); });
  });
  let evidence = null;
  try { evidence = JSON.parse(result.stdout); } catch { /* A missing report is a failed gate. */ }
  const record = { project, exitCode: result.code, durationMs: Math.round(performance.now() - started), evidence, ...(evidence ? {} : { output: result.stdout.slice(0, 4000) }), stderr: result.stderr.slice(0, 4000), timedOut: result.timedOut ?? false, exceeded: result.exceeded ?? false, error: result.error ?? null };
  results.push(record);
  await writeFile(join(output, `${project}.json`), `${JSON.stringify(record, null, 2)}\n`);
}
const summary = { schemaVersion: 1, observedAt: new Date().toISOString(), node: process.version, platform: `${process.platform}/${process.arch}`, artifacts: output, results, adoption: 'not_validated' };
await writeFile(join(output, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
process.exitCode = results.every(result => result.exitCode === 0 && result.evidence && !result.timedOut && !result.exceeded) ? 0 : 1;
