// @ts-check
import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

// Keep in sync with PENDING_MARKER in src/lib/pending.ts.
const MARKER = "[PENDIENTE]";

/** Colombian mobile number (+57 3XX XXX XXXX, any of space, dot or dash as separator). Generic on purpose: no real number lives in the repo. */
export const PHONE_PATTERN = /\+57[\s.-]?3\d{2}[\s.-]?\d{3}[\s.-]?\d{4}/;

/**
 * Lists the HTML files under `dir` where `count` finds something, with how many times.
 * @param {string} dir
 * @param {(html: string) => number} count
 * @returns {Promise<{ file: string; count: number }[]>}
 */
async function scanHtml(dir, count) {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    const path = join(entry.parentPath, entry.name);
    const found = count(await readFile(path, "utf8"));
    if (found > 0) results.push({ file: relative(dir, path).split(sep).join("/"), count: found });
  }
  return results.sort((a, b) => a.file.localeCompare(b.file));
}

/**
 * Lists the HTML files under `dir` that still contain the pending marker.
 * @param {string} dir
 */
export function findPendingMarkers(dir) {
  return scanHtml(dir, (html) => html.split(MARKER).length - 1);
}

/**
 * Lists the HTML files under `dir` that publish a Colombian mobile number.
 * @param {string} dir
 */
export function findPhoneNumbers(dir) {
  const pattern = new RegExp(PHONE_PATTERN.source, "g");
  return scanHtml(dir, (html) => html.match(pattern)?.length ?? 0);
}

/** @param {{ file: string; count: number }[]} found */
const list = (found) => found.map(({ file, count }) => `  - ${file} (${count})`).join("\n");

/**
 * Fails the production build when a page still shows [PENDIENTE] or publishes a phone number.
 * With `allowPending` (test build only) pending content is reported but allowed; phone numbers are always blocked.
 * @param {{ allowPending?: boolean }} [options]
 */
export default function pendingGuard({ allowPending = false } = {}) {
  return {
    name: "pending-guard",
    hooks: {
      /** @param {{ dir: URL; logger: { warn?: (msg: string) => void; error: (msg: string) => void } }} options */
      "astro:build:done": async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const problems = [];
        const pending = await findPendingMarkers(root);
        if (pending.length > 0) {
          const message = `${pending.length} page(s) contain ${MARKER}:\n${list(pending)}`;
          if (allowPending) logger.warn?.(`Test build, not publishable: ${message}`);
          else problems.push(message);
        }
        const phones = await findPhoneNumbers(root);
        if (phones.length > 0) problems.push(`${phones.length} page(s) publish a phone number:\n${list(phones)}`);
        if (problems.length === 0) return;
        const message = problems.join("\n");
        logger.error(message);
        throw new Error(`Build blocked: ${message}`);
      },
    },
  };
}
