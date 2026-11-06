import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, describe, test } from "node:test";
import { pathToFileURL } from "node:url";

import ogGuard, { findMissingShareImages } from "../../integrations/og-guard.mjs";

const og = (url) => `<meta property="og:image" content="${url}">`;

describe("findMissingShareImages", () => {
  let dir;

  before(async () => {
    dir = await mkdtemp(join(tmpdir(), "og-guard-"));
    await mkdir(join(dir, "og"));
    await mkdir(join(dir, "es"));
    await mkdir(join(dir, "privacy"));
    await writeFile(join(dir, "og", "home-en.png"), "png");
    await writeFile(join(dir, "index.html"), og("https://juanposada.dev/og/home-en.png"));
    await writeFile(join(dir, "es", "index.html"), og("https://juanposada.dev/og/home-es.png"));
    await writeFile(join(dir, "privacy", "index.html"), "<title>no image</title>");
    await writeFile(join(dir, "404.html"), '<meta name="robots" content="noindex">');
  });

  after(() => rm(dir, { recursive: true, force: true }));

  test("reports indexable pages without og:image or whose image file is missing; skips noindex", async () => {
    assert.deepEqual(await findMissingShareImages(dir), [
      { page: "es/index.html", problem: "image not found: /og/home-es.png" },
      { page: "privacy/index.html", problem: "no og:image" },
    ]);
  });

  test("the build hook fails and names the pages", async () => {
    const hook = ogGuard().hooks["astro:build:done"];
    const logger = { info() {}, error() {} };
    await assert.rejects(() => hook({ dir: pathToFileURL(`${dir}/`), logger }), /privacy\/index\.html/);
  });
});
