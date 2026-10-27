// @ts-check
import { access, readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ATTRIBUTE = /\s(?:href|src|srcset)="([^"]*)"/g;

/**
 * Root-relative URLs (`/…`, not `//…`) found in href, src and srcset attributes, without query or hash.
 * @param {string} html
 */
function internalLinks(html) {
  const links = new Set();
  for (const [, value = ""] of html.matchAll(ATTRIBUTE)) {
    for (const candidate of value.split(",")) {
      const url = candidate.trim().split(/\s+/)[0] ?? "";
      if (!url.startsWith("/") || url.startsWith("//")) continue;
      const path = url.split(/[?#]/)[0] ?? "";
      if (path) links.add(decodeURI(path));
    }
  }
  return links;
}

/** @param {string} path */
const exists = (path) => access(path).then(() => true, () => false);

/**
 * Whether a root-relative path resolves to a file in the build output.
 * @param {string} root
 * @param {string} path
 */
async function resolves(root, path) {
  const target = join(root, ...path.split("/"));
  if (path.endsWith("/")) return exists(join(target, "index.html"));
  return (await exists(target)) || (await exists(join(target, "index.html"))) || (await exists(`${target}.html`));
}

/**
 * Lists internal links in the generated HTML that point to a missing page or file.
 * @param {string} root
 * @returns {Promise<{ page: string; link: string }[]>}
 */
export async function findBrokenLinks(root) {
  const entries = await readdir(root, { recursive: true, withFileTypes: true });
  const broken = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    const file = join(entry.parentPath, entry.name);
    const page = relative(root, file).split(sep).join("/");
    for (const link of internalLinks(await readFile(file, "utf8"))) {
      if (!(await resolves(root, link))) broken.push({ page, link });
    }
  }
  return broken.sort((a, b) => a.page.localeCompare(b.page) || a.link.localeCompare(b.link));
}

/** Fails the production build when an internal link points to a page or file that does not exist. */
export default function linkGuard() {
  return {
    name: "link-guard",
    hooks: {
      /** @param {{ dir: URL; logger: { error: (msg: string) => void } }} options */
      "astro:build:done": async ({ dir, logger }) => {
        const broken = await findBrokenLinks(fileURLToPath(dir));
        if (broken.length === 0) return;
        const list = broken.map(({ page, link }) => `  - ${link} (in ${page})`).join("\n");
        logger.error(`Broken internal links:\n${list}`);
        throw new Error(`Build blocked: ${broken.length} broken internal link(s):\n${list}`);
      },
    },
  };
}
