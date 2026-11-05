import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositories = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const projects = ['deployproof', 'rolloutproof', 'revokeproof'].map(name => ({
  name, directory: resolve(repositories, name),
}));
