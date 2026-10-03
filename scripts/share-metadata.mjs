import { readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export const SHARE_IMAGE_PATH = '/og/ozon-profile-v1.jpg';

export function resolveSiteUrl(environment) {
  const preview = environment.CONTEXT && environment.CONTEXT !== 'production';
  const value =
    environment.SITE_URL ||
    (preview ? environment.DEPLOY_PRIME_URL : environment.URL) ||
    environment.URL ||
    environment.DEPLOY_PRIME_URL ||
    environment.DEPLOY_URL;
  if (!value) {
    if (environment.NETLIFY === 'true') throw new Error('Netlify did not supply a site URL.');
    return null;
  }
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('SITE_URL must be a public HTTP or HTTPS address without credentials.');
  }
  return url.origin + '/';
}

export function configureShareMetadata(html, siteUrl) {
  if (!siteUrl) return html;
  const values = {
    'og:url': siteUrl,
    'og:image': new URL(SHARE_IMAGE_PATH, siteUrl).href,
    'twitter:image': new URL(SHARE_IMAGE_PATH, siteUrl).href,
  };
  for (const [key, value] of Object.entries(values)) {
    let found = false;
    html = html.replace(/<meta\b[^>]*>/gi, (tag) => {
      const attribute = /(?:property|name)="([^"]+)"/i.exec(tag);
      if (attribute?.[1] !== key) return tag;
      found = true;
      return tag.replace(/content="[^"]*"/i, () => 'content="' + value + '"');
    });
    if (!found) throw new Error('Missing social meta tag: ' + key);
  }
  let foundCanonical = false;
  html = html.replace(/<link\b[^>]*>/gi, (tag) => {
    if (!/rel="canonical"/i.test(tag)) return tag;
    foundCanonical = true;
    return tag.replace(/href="[^"]*"/i, () => 'href="' + siteUrl + '"');
  });
  if (!foundCanonical) throw new Error('Missing canonical URL.');
  return html;
}

async function main() {
  const output = resolve('dist/Tarjetas/browser');
  await access(resolve(output, SHARE_IMAGE_PATH.slice(1)));
  await access(resolve(output, '_redirects'));
  const index = resolve(output, 'index.html');
  const siteUrl = resolveSiteUrl(process.env);
  await writeFile(index, configureShareMetadata(await readFile(index, 'utf8'), siteUrl));
  console.log(
    siteUrl
      ? 'OpenGraph ready: ' + siteUrl
      : 'OpenGraph image ready. Netlify will supply the public URL; for manual upload, rebuild with SITE_URL=https://your-site.netlify.app.',
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
