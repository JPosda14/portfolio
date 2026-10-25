import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { defaultLocale, getUi, isLocale, locales } from "../../src/i18n/index.ts";

function keyPaths(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) =>
    typeof child === "string" ? [`${prefix}${key}`] : keyPaths(child, `${prefix}${key}.`),
  );
}

describe("i18n", () => {
  test("supports English (default) and Spanish", () => {
    assert.deepEqual(locales, ["en", "es"]);
    assert.equal(defaultLocale, "en");
    assert.ok(isLocale("es"));
    assert.ok(!isLocale("fr"));
  });

  test("both languages define exactly the same keys", () => {
    assert.deepEqual(keyPaths(getUi("es")).sort(), keyPaths(getUi("en")).sort());
  });

  test("no text is left empty", () => {
    for (const locale of locales) {
      const ui = getUi(locale);
      for (const path of keyPaths(ui)) {
        const text = path.split(".").reduce((node, key) => node[key], ui);
        assert.ok(text.trim().length > 0, `${locale}: ${path} is empty`);
      }
    }
  });

  test("each language returns its own texts", () => {
    assert.equal(getUi("en").nav.projects, "Projects");
    assert.equal(getUi("es").nav.projects, "Proyectos");
  });
});
