// @ts-check
import { access, readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const OG_IMAGE = /<meta property="og:image" content="([^"]+)"/;
const NOINDEX = /<meta name="robots" content="noindex"/;

/** @param {string} path */
const exists = (path) => access(path).then(() => true, () => false);

/**
 * Indexable pages (no robots noindex) whose share image is missing from the HTML or from the build output.
 * @param {string} root
 * @returns {Promise<{ page: string; problem: string }[]>}
 */
export async function findMissingShareImages(root) {
  const entries = await readdir(root, { recursive: true, withFileTypes: true });
  const missing = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    const file = join(entry.parentPath, entry.name);
    const page = relative(root, file).split(sep).join("/");
    const html = await readFile(file, "utf8");
    if (NOINDEX.test(html)) continue;
    const url = OG_IMAGE.exec(html)?.[1];
    if (!url) {
      missing.push({ page, problem: "no og:image" });
      continue;
    }
    const path = new URL(url).pathname;
    if (!(await exists(join(root, ...path.split("/"))))) missing.push({ page, problem: `image not found: ${path}` });
  }
  return missing.sort((a, b) => a.page.localeCompare(b.page));
}

/**
 * Fails the build when an indexable page has no share image. Regenerate them with `node scripts/make-og.mjs`.
 * `skip` is only for that script, which needs a build (for the fonts) before the images exist.
 */
export default function ogGuard({ skip = false } = {}) {
  return {
    name: "og-guard",
    hooks: {
      /** @param {{ dir: URL; logger: { error: (msg: string) => void } }} options */
      "astro:build:done": async ({ dir, logger }) => {
        if (skip) return;
        const missing = await findMissingShareImages(fileURLToPath(dir));
        if (missing.length === 0) return;
        const list = missing.map(({ page, problem }) => `  - ${page}: ${problem}`).join("\n");
        logger.error(`Pages without a share image (run node scripts/make-og.mjs):\n${list}`);
        throw new Error(`Build blocked: ${missing.length} page(s) without a share image:\n${list}`);
      },
    },
  };
}
