// @ts-check
import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

// Keep in sync with PENDING_MARKER in src/lib/pending.ts.
const MARKER = "[PENDIENTE]";

/**
 * Lists the HTML files under `dir` that still contain the pending marker.
 * @param {string} dir
 * @returns {Promise<{ file: string; count: number }[]>}
 */
export async function findPendingMarkers(dir) {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    const path = join(entry.parentPath, entry.name);
    const count = (await readFile(path, "utf8")).split(MARKER).length - 1;
    if (count > 0) results.push({ file: relative(dir, path).split(sep).join("/"), count });
  }
  return results.sort((a, b) => a.file.localeCompare(b.file));
}

/** Fails the production build when any page still shows [PENDIENTE]. */
export default function pendingGuard() {
  return {
    name: "pending-guard",
    hooks: {
      /** @param {{ dir: URL; logger: { error: (msg: string) => void } }} options */
      "astro:build:done": async ({ dir, logger }) => {
        const pending = await findPendingMarkers(fileURLToPath(dir));
        if (pending.length === 0) return;
        const list = pending.map(({ file, count }) => `  - ${file} (${count})`).join("\n");
        logger.error(`Content still marked ${MARKER}:\n${list}`);
        throw new Error(`Build blocked: ${pending.length} page(s) contain ${MARKER}:\n${list}`);
      },
    },
  };
}
