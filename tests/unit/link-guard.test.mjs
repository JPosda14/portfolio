import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, describe, test } from "node:test";
import { pathToFileURL } from "node:url";

import linkGuard, { findBrokenLinks } from "../../integrations/link-guard.mjs";

describe("findBrokenLinks", () => {
  let dir;

  before(async () => {
    dir = await mkdtemp(join(tmpdir(), "link-guard-"));
    await mkdir(join(dir, "es"));
    await mkdir(join(dir, "cv"));
    await writeFile(join(dir, "cv", "cv-en.pdf"), "%PDF");
    await writeFile(join(dir, "favicon.svg"), "<svg/>");
    await writeFile(
      join(dir, "index.html"),
      [
        '<a href="/">home</a>',
        '<a href="/es/">es</a>',
        '<a href="/es/#proyectos">anchor</a>',
        '<a href="#main">same page</a>',
        '<a href="/cv/cv-en.pdf">cv</a>',
        '<a href="/cv/cv-es.pdf">missing cv</a>',
        '<a href="https://example.com/x">external</a>',
        '<a href="mailto:a@b.co">mail</a>',
        '<link rel="icon" href="/favicon.svg">',
        '<img src="/missing.png" srcset="/missing.png 1x">',
      ].join(""),
    );
    await writeFile(join(dir, "es", "index.html"), '<a href="/proyectos/x/?y=1">missing page</a>');
  });

  after(() => rm(dir, { recursive: true, force: true }));

  test("reports internal links that point to nothing, with the page where they appear", async () => {
    assert.deepEqual(await findBrokenLinks(dir), [
      { page: "es/index.html", link: "/proyectos/x/" },
      { page: "index.html", link: "/cv/cv-es.pdf" },
      { page: "index.html", link: "/missing.png" },
    ]);
  });

  test("the build hook fails and lists the broken links", async () => {
    const hook = linkGuard().hooks["astro:build:done"];
    const logger = { info() {}, error() {} };
    await assert.rejects(() => hook({ dir: pathToFileURL(`${dir}/`), logger }), /\/cv\/cv-es\.pdf/);
  });

  test("passes when every internal link resolves", async () => {
    const clean = await mkdtemp(join(tmpdir(), "link-guard-clean-"));
    await writeFile(join(clean, "index.html"), '<a href="/">home</a><a href="#top">top</a>');
    assert.deepEqual(await findBrokenLinks(clean), []);
    await rm(clean, { recursive: true, force: true });
  });
});
