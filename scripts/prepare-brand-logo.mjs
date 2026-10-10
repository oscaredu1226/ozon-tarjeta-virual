// Keep the supplied artwork intact; package its existing horizontal composition
// with an alpha channel instead of relying on CSS blend layers in Safari.
import { readFile, writeFile } from 'node:fs/promises';

const original = await readFile(new URL('../src/assets/brand/ozon-original.jpg', import.meta.url));
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="952" height="264" viewBox="0 0 238 66">
  <title>OZON · Terapia del Dolor</title>
  <defs>
    <image id="official-artwork" width="1500" height="1500" xlink:href="data:image/jpeg;base64,${original.toString('base64')}"/>
    <clipPath id="symbol"><rect x="0" y="3" width="60" height="60"/></clipPath>
    <clipPath id="wordmark"><rect x="70" y="1" width="167" height="64"/></clipPath>
    <filter id="white-alpha" filterUnits="userSpaceOnUse" x="0" y="0" width="238" height="66" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.36064 4.57728 0.46208 0 -3.5"/>
    </filter>
  </defs>
  <g filter="url(#white-alpha)">
    <g clip-path="url(#symbol)"><use xlink:href="#official-artwork" transform="translate(-51.4 -25) scale(0.1086666667)"/></g>
    <g clip-path="url(#wordmark)"><use xlink:href="#official-artwork" transform="translate(23 -144) scale(0.1726666667)"/></g>
  </g>
</svg>
`;
await writeFile(new URL('../src/assets/brand/ozon-logo-white.svg', import.meta.url), svg);
