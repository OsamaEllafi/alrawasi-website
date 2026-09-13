import { readdir, copyFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

// Next 16.3 uses OS separators when collecting exported RSC segments, but
// its browser router requests dot-separated filenames. Normalize the Windows
// output without modifying Next itself; on POSIX this is a no-op.
const root = resolve('out');
let count = 0;
async function flatten(directory, destination, prefix) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = join(directory, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) await flatten(source, destination, name);
    else if (entry.name.endsWith('.txt')) {
      await copyFile(source, join(destination, name));
      count++;
    }
  }
}
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(directory, entry.name);
    if (entry.name.startsWith('__next.')) await flatten(path, directory, entry.name);
    else await walk(path);
  }
}
await walk(root);
console.log(`Static export: normalized ${count} RSC segment filenames.`);
