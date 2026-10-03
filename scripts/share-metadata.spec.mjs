import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { configureShareMetadata, resolveSiteUrl, SHARE_IMAGE_PATH } from './share-metadata.mjs';

const html = await readFile(new URL('../src/index.html', import.meta.url), 'utf8');

test('production uses the Netlify site URL and normalizes it to the profile root', () => {
  assert.equal(
    resolveSiteUrl({
      CONTEXT: 'production',
      URL: 'https://clinic.netlify.app/path?x=1',
      DEPLOY_URL: 'https://unique.netlify.app',
    }),
    'https://clinic.netlify.app/',
  );
});

test('preview builds use their own URL; an explicit domain takes precedence', () => {
  const env = {
    CONTEXT: 'deploy-preview',
    URL: 'https://clinic.netlify.app',
    DEPLOY_PRIME_URL: 'https://deploy-preview-1--clinic.netlify.app',
  };
  assert.equal(resolveSiteUrl(env), 'https://deploy-preview-1--clinic.netlify.app/');
  assert.equal(
    resolveSiteUrl({ ...env, SITE_URL: 'https://ozon.example' }),
    'https://ozon.example/',
  );
});

test('local builds keep relative URLs while a misconfigured Netlify build fails clearly', () => {
  assert.equal(resolveSiteUrl({}), null);
  assert.equal(configureShareMetadata(html, null), html);
  assert.throws(() => resolveSiteUrl({ NETLIFY: 'true' }), /did not supply/);
});

test('invalid origins cannot become share URLs', () => {
  for (const SITE_URL of [
    'javascript:alert(1)',
    'https://user:password@ozon.example',
    'not a URL',
  ]) {
    assert.throws(() => resolveSiteUrl({ SITE_URL }));
  }
});

test('crawlers receive absolute image, profile and canonical URLs in the raw HTML', () => {
  const result = configureShareMetadata(html, 'https://clinic.netlify.app/');
  assert.match(result, /property="og:url" content="https:\/\/clinic.netlify.app\/"/);
  for (const key of ['og:image', 'twitter:image']) {
    assert.ok(
      result.includes(key + '" content="https://clinic.netlify.app' + SHARE_IMAGE_PATH + '"'),
    );
  }
  assert.match(result, /rel="canonical" href="https:\/\/clinic.netlify.app\/"/);
  assert.ok(result.includes('Dr. Oscar Juan Soto Caminada'));
  assert.ok(result.includes('content="1200"'));
  assert.ok(result.includes('content="630"'));
  assert.throws(
    () => configureShareMetadata('<html></html>', 'https://clinic.netlify.app/'),
    /Missing social/,
  );
});
