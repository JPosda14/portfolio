// Generates sample screenshots for projects that do not have real ones yet.
// Usage: node scripts/make-placeholders.mjs
// Their alt text in the content files carries [PENDIENTE], so they block the release build until replaced.
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const WIDTH = 1600;
const HEIGHT = 1000;

const projects = [
  { slug: "colchones-posada", name: "Colchones Posada" },
  { slug: "university-capstone", name: "CUE Event Manager" },
];

const shots = [
  { file: "cover", label: "Cover · Portada" },
  { file: "gallery-1", label: "Gallery 1 · Galería 1" },
  { file: "gallery-2", label: "Gallery 2 · Galería 2" },
];

const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/** Page mock in the site palette, with an obvious "sample" caption. No browser chrome: the card draws its own frame. */
function svg({ name }, { label }) {
  const font = "Segoe UI, Helvetica, Arial, sans-serif";
  const mono = "Consolas, Menlo, monospace";
  const blocks = [0, 1, 2]
    .map((i) => {
      const x = 120 + i * 470;
      return `<rect x="${x}" y="560" width="420" height="300" rx="24" fill="#1E293B" stroke="#334155"/>
        <rect x="${x + 32}" y="600" width="200" height="16" rx="8" fill="#334155"/>
        <rect x="${x + 32}" y="636" width="320" height="12" rx="6" fill="#273449"/>
        <rect x="${x + 32}" y="660" width="260" height="12" rx="6" fill="#273449"/>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#0F172A"/>
    <text x="120" y="250" font-family="${mono}" font-size="26" font-weight="600" letter-spacing="4" fill="#60A5FA">${escape(label.toUpperCase())}</text>
    <text x="120" y="350" font-family="${font}" font-size="84" font-weight="600" fill="#E2E8F0">${escape(name)}</text>
    <text x="120" y="430" font-family="${font}" font-size="40" fill="#94A3B8">Example screenshot · Captura de ejemplo</text>
    <rect x="120" y="470" width="180" height="8" rx="4" fill="#0047FF"/>
    ${blocks}
  </svg>`;
}

for (const project of projects) {
  const dir = new URL(`../src/content/projects/images/${project.slug}/`, import.meta.url);
  await mkdir(dir, { recursive: true });
  for (const shot of shots) {
    const out = new URL(`${shot.file}.png`, dir);
    const info = await sharp(Buffer.from(svg(project, shot)))
      .png({ palette: true, quality: 90, compressionLevel: 9 })
      .toFile(out.pathname.replace(/^\/(\w:)/, "$1"));
    console.log(`${project.slug}/${shot.file}.png  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
  }
}
