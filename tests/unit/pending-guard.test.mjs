import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, describe, test } from "node:test";
import { pathToFileURL } from "node:url";

import pendingGuard, { findPendingMarkers, findPhoneNumbers, PHONE_PATTERN } from "../../integrations/pending-guard.mjs";
import { splitPending } from "../../src/lib/pending.ts";

// Fictional numbers in the Colombian mobile format; never a real one.
const FAKE_PHONES = ["+57 300 123 4567", "+573001234567", "+57-310-555-0000", "+57 315.000.1111"];

describe("PHONE_PATTERN", () => {
  test("matches Colombian mobile numbers with or without separators", () => {
    for (const phone of FAKE_PHONES) assert.match(phone, PHONE_PATTERN, phone);
  });

  test("ignores years, ranges and other numbers", () => {
    for (const text of ["© 2026", "2023 – 2025", "UTC‑5", "4.5:1", "57 KB", "+1 555 123 4567"]) {
      assert.doesNotMatch(text, PHONE_PATTERN, text);
    }
  });
});

describe("findPhoneNumbers", () => {
  let dir;

  before(async () => {
    dir = await mkdtemp(join(tmpdir(), "phone-guard-"));
    await writeFile(join(dir, "index.html"), "<p>Contact me by email</p>");
    await writeFile(join(dir, "about.html"), `<a href="tel:+573001234567">Call</a> <p>${FAKE_PHONES[0]}</p>`);
  });

  after(() => rm(dir, { recursive: true, force: true }));

  test("lists HTML files that publish a phone number", async () => {
    assert.deepEqual(await findPhoneNumbers(dir), [{ file: "about.html", count: 2 }]);
  });

  test("the build hook fails and names the page", async () => {
    const hook = pendingGuard().hooks["astro:build:done"];
    const logger = { info() {}, error() {} };
    await assert.rejects(() => hook({ dir: pathToFileURL(`${dir}/`), logger }), /phone.*about\.html/s);
  });
});

describe("findPendingMarkers", () => {
  let dir;

  before(async () => {
    dir = await mkdtemp(join(tmpdir(), "pending-guard-"));
    await mkdir(join(dir, "es"));
    await writeFile(join(dir, "index.html"), "<p>Done</p>");
    await writeFile(join(dir, "es", "index.html"), "<p>[PENDIENTE] uno</p><p>[PENDIENTE] dos</p>");
    await writeFile(join(dir, "notes.txt"), "[PENDIENTE] not html");
  });

  after(() => rm(dir, { recursive: true, force: true }));

  test("lists only HTML files that contain the marker, with their count", async () => {
    assert.deepEqual(await findPendingMarkers(dir), [{ file: "es/index.html", count: 2 }]);
  });

  test("returns an empty list when nothing is pending", async () => {
    const clean = await mkdtemp(join(tmpdir(), "pending-clean-"));
    await writeFile(join(clean, "index.html"), "<p>Done</p>");
    assert.deepEqual(await findPendingMarkers(clean), []);
    await rm(clean, { recursive: true, force: true });
  });

  test("the build hook fails and names the page", async () => {
    const hook = pendingGuard().hooks["astro:build:done"];
    const logger = { info() {}, error() {} };
    await assert.rejects(
      () => hook({ dir: pathToFileURL(`${dir}/`), logger }),
      /es\/index\.html/,
    );
  });
});

describe("splitPending", () => {
  test("separates the marker from the surrounding text", () => {
    assert.deepEqual(splitPending("Hola [PENDIENTE] mundo"), [
      { text: "Hola ", pending: false },
      { text: "[PENDIENTE]", pending: true },
      { text: " mundo", pending: false },
    ]);
  });

  test("returns the text untouched when there is no marker", () => {
    assert.deepEqual(splitPending("Listo"), [{ text: "Listo", pending: false }]);
  });
});
