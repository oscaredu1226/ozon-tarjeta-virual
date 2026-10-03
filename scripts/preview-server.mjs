// Local-only renderer for the social card; this script is not included in the site.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
};
createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const root = resolve(pathname.startsWith('/assets/') ? 'src' : 'public');
    const path =
      pathname === '/' ? resolve('scripts/og-preview.html') : resolve(root, '.' + pathname);
    if (pathname !== '/' && !path.startsWith(root + sep)) throw new Error('Invalid path');
    const file = await readFile(path);
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
}).listen(4201, '127.0.0.1', () => console.log('Social image preview: http://127.0.0.1:4201/'));
