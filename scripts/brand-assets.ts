import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Renders every raster brand asset from the Jam mark (geometry mirrors
 * components/logo.tsx). Outputs are committed, so CI never needs to run this.
 *
 *   bun run brand
 */

const BRAND = "#9d2235";
const root = process.cwd();
const out = (...p: string[]) => path.join(root, ...p);

/** The mark's glyph on a 64-unit grid; `pad` shrinks it inside a full-bleed square. */
function glyph(pad = 0): string {
  const s = (64 - pad * 2) / 64;
  return `<g transform="translate(${pad} ${pad}) scale(${s})">
    <circle cx="35" cy="15" r="8" fill="none" stroke="#fff" stroke-opacity="0.5" stroke-width="2"/>
    <circle cx="35" cy="15" r="4.25" fill="#fff"/>
    <path d="M35 31v15a9 9 0 0 1-9 9h-3" fill="none" stroke="#fff" stroke-width="7.5" stroke-linecap="round"/>
  </g>`;
}

const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="15" fill="${BRAND}"/>${glyph()}
</svg>`;

// Maskable icons get cropped to a circle/squircle by the OS: full bleed, glyph in the safe zone.
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${BRAND}"/>${glyph(10)}
</svg>`;

// Apple applies its own corner mask, so the touch icon is a full-bleed square too.
const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${BRAND}"/>${glyph(6)}
</svg>`;

function ogSvg(): string {
  const rings = [70, 140, 210, 280, 350, 420]
    .map((r, i) => `<circle cx="960" cy="315" r="${r}" fill="none" stroke="#3a3a40" stroke-opacity="${(0.9 - i * 0.14).toFixed(2)}" stroke-width="1.5"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0b0b0d"/>
  ${rings}
  <circle cx="960" cy="315" r="20" fill="none" stroke="${BRAND}" stroke-opacity="0.6" stroke-width="2"/>
  <circle cx="960" cy="315" r="9" fill="${BRAND}"/>
  <g transform="translate(84 78) scale(1.375)">
    <rect width="64" height="64" rx="15" fill="${BRAND}"/>${glyph()}
  </g>
  <text x="196" y="144" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="58" font-weight="800" letter-spacing="-2.5" fill="#fafafa">Jam</text>
  <text x="84" y="322" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="86" font-weight="700" letter-spacing="-3.5" fill="#fafafa">Work that</text>
  <text x="84" y="418" font-family="Georgia, Times New Roman, serif" font-size="92" font-style="italic" letter-spacing="-1.5" fill="#ef7385">counts.</text>
  <text x="86" y="494" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="27" fill="#a1a1aa">Campus jobs, research labs, clubs &amp; NWA internships</text>
  <text x="86" y="532" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="27" fill="#a1a1aa">for University of Arkansas students — verified daily.</text>
  <text x="86" y="590" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="21" font-weight="600" letter-spacing="3" fill="#71717a">JOB AROUND ME · FREE FOR EVERY STUDENT</text>
</svg>`;
}

const png = (svg: string, size: number, file: string) =>
  sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png().toFile(file);

mkdirSync(out("public"), { recursive: true });
writeFileSync(out("app", "icon.svg"), markSvg + "\n");
await png(appleSvg, 180, out("app", "apple-icon.png"));
await png(markSvg, 192, out("public", "icon-192.png"));
await png(markSvg, 512, out("public", "icon-512.png"));
await png(maskableSvg, 512, out("public", "icon-maskable-512.png"));
await sharp(Buffer.from(ogSvg())).png().toFile(out("public", "og.png"));

console.log("Brand assets written: app/icon.svg, app/apple-icon.png, public/icon-{192,512,maskable-512}.png, public/og.png");
