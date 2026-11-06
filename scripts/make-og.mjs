// Share images (Open Graph, 1200 × 630) for the home pages and every case study, in both languages.
// Run after changing a title, role or summary: `node scripts/make-og.mjs`. The PNGs are committed in public/og/.
//
// How: builds the site once (to get the self-hosted fonts and their @font-face rules), renders an HTML
// template per page with Playwright's Chromium and compresses the screenshot with sharp. No new dependencies.
import { spawnSync } from "node:child_process";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";
import sharp from "sharp";

import { getHome, getUi, locales } from "../src/i18n/index.ts";
import { OG_HEIGHT, OG_WIDTH } from "../src/lib/seo.ts";
import { SITE_URL } from "../site.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const out = join(root, "public", "og");

// 1. Build once without the share-image guard (the images do not exist yet).
const astro = join(root, "node_modules", "astro", "bin", "astro.mjs");
const build = spawnSync(process.execPath, [astro, "build"], {
  stdio: "inherit",
  env: { ...process.env, ALLOW_PENDING: "1", SKIP_OG_GUARD: "1" },
});
if (build.status !== 0) process.exit(build.status ?? 1);

// 2. The <style> with the @font-face rules and the --font-* variables, as the site ships it.
const homeHtml = await readFile(join(dist, "index.html"), "utf8");
const fontCss = [...homeHtml.matchAll(/<style>([^<]*@font-face[^<]*)<\/style>/g)].map((match) => match[1]).join("\n");
if (!fontCss) throw new Error("No @font-face rules found in dist/index.html");

// 3. Project data from the Markdown frontmatter (title, summary, year, kind).
/** @param {string} markdown @param {string} key */
const field = (markdown, key) => {
  const value = new RegExp(`^${key}:\\s*(.+)$`, "m").exec(markdown)?.[1]?.trim() ?? "";
  return value.replace(/^"(.*)"$/, "$1");
};
const projectsDir = join(root, "src", "content", "projects");
/** @type {{ key: string; locale: "en" | "es"; label: string; title: string; text: string; footer: string }[]} */
const cards = [];

for (const locale of locales) {
  const ui = getUi(locale);
  const home = getHome(locale);
  cards.push({
    key: "home",
    locale,
    label: home.hero.status,
    title: ui.site.name,
    text: `${home.hero.role.lead} <em>${home.hero.role.highlight}</em>`,
    footer: home.hero.subtitle,
  });
  for (const file of await readdir(join(projectsDir, locale))) {
    if (!file.endsWith(".md")) continue;
    const markdown = await readFile(join(projectsDir, locale, file), "utf8");
    const kind = /** @type {keyof typeof ui.projects.kinds} */ (field(markdown, "kind"));
    cards.push({
      key: file.replace(/\.md$/, ""),
      locale,
      label: `${ui.projects.kinds[kind]} · ${field(markdown, "year")}`,
      title: field(markdown, "title"),
      text: field(markdown, "summary"),
      footer: ui.site.name,
    });
  }
}

/** @param {string} value */
const escape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** @param {(typeof cards)[number]} card */
const template = (card) => `<!doctype html><html lang="${card.locale}"><head><meta charset="utf-8"><style>${fontCss}
  * { margin: 0; box-sizing: border-box; }
  body { width: ${OG_WIDTH}px; height: ${OG_HEIGHT}px; padding: 40px; background: #090d16; color: #e2e8f0; }
  .card { height: 100%; display: flex; flex-direction: column; gap: 28px; padding: 56px 64px;
    border: 1px solid rgb(255 255 255 / 0.08); border-radius: 24px; background: #0f172a;
    background-image: radial-gradient(circle at 100% 0%, rgb(0 71 255 / 0.18), transparent 55%); }
  .top { display: flex; justify-content: space-between; font: 600 20px/1 var(--font-mono); letter-spacing: 0.04em; }
  .logo span { color: #60a5fa; }
  .site { color: #94a3b8; }
  .label { font: 600 18px/1.3 var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; color: #60a5fa; }
  h1 { font: 400 ${card.key === "home" ? 84 : 76}px/1.05 var(--font-display); }
  .text { max-width: 960px; font: italic 400 34px/1.3 var(--font-display); color: #cbd5e1; }
  .text em { color: #60a5fa; }
  .footer { margin-top: auto; font: 400 22px/1.4 var(--font-body); color: #94a3b8; }
</style></head><body><div class="card">
  <div class="top"><p class="logo">juan<span>.</span>posada</p><p class="site">${escape(new URL(SITE_URL).host)}</p></div>
  <p class="label">${escape(card.label)}</p>
  <h1>${escape(card.title)}</h1>
  <p class="text">${card.key === "home" ? card.text : escape(card.text)}</p>
  <p class="footer">${escape(card.footer)}</p>
</div></body></html>`;

// 4. Render each card from a file inside dist, so the root-relative font URLs resolve.
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: OG_WIDTH, height: OG_HEIGHT } });
const scratch = join(dist, "__og.html");
for (const card of cards) {
  await writeFile(scratch, template(card).replaceAll('url("/_astro/', 'url("./_astro/'));
  await page.goto(pathToFileURL(scratch).href);
  await page.evaluate(() => document.fonts.ready);
  const png = await sharp(await page.screenshot({ type: "png" }))
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer();
  const file = join(out, `${card.key}-${card.locale}.png`);
  await writeFile(file, png);
  console.log(`public/og/${card.key}-${card.locale}.png  ${Math.round(png.length / 1024)} KB`);
}
await browser.close();
await rm(scratch);
