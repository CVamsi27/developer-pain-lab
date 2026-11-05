import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';
import { join } from 'node:path';
import { projects } from './projects.js';

const script = process.argv[2];
if (process.argv.length !== 3 || !['check', 'test', 'pack:check', 'test:integration'].includes(script)) {
  process.stderr.write('Usage: node scripts/run-projects.js <check|test|pack:check|test:integration>\n');
  process.exit(2);
}
const results = [];
let interrupted = false;
let stopActive;
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => {
  interrupted = true;
  stopActive?.();
});

for (const { name, directory } of projects) {
  if (interrupted) break;
  const started = performance.now();
  try {
    await access(join(directory, 'package.json'));
    process.stdout.write(`\nRunning ${name}: npm run ${script}\n`);
    const result = await new Promise(resolve => {
      const child = spawn('npm', ['run', script], { cwd: directory, stdio: 'inherit', shell: false, detached: process.platform !== 'win32' });
      let timedOut = false;
      const stop = () => {
        try { if (process.platform !== 'win32' && child.pid) process.kill(-child.pid, 'SIGKILL'); else child.kill('SIGKILL'); } catch { /* Already exited. */ }
      };
      stopActive = stop;
      const timer = setTimeout(() => { timedOut = true; stop(); }, 180_000);
      child.once('error', error => { clearTimeout(timer); resolve({ exitCode: null, error: error.message, timedOut }); });
      child.once('close', exitCode => { clearTimeout(timer); resolve({ exitCode, error: null, timedOut }); });
    });
    stopActive = undefined;
    results.push({ project: name, ...result, durationMs: Math.round(performance.now() - started) });
  } catch {
    results.push({ project: name, exitCode: null, error: 'Independent project folder is missing or inaccessible', timedOut: false, durationMs: Math.round(performance.now() - started) });
  }
}
const passed = !interrupted && results.length === projects.length && results.every(result => result.exitCode === 0 && !result.timedOut);
process.stdout.write(`${JSON.stringify({ script, status: passed ? 'passed' : 'failed', interrupted, results }, null, 2)}\n`);
process.exitCode = passed ? 0 : 1;
