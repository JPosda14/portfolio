import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { defaultLocale, getHome, getUi, isLocale, locales } from "../../src/i18n/index.ts";

function keyPaths(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) =>
    typeof child === "string" ? [`${prefix}${key}`] : keyPaths(child, `${prefix}${key}.`),
  );
}

const sources = { ui: getUi, home: getHome };

describe("i18n", () => {
  test("supports English (default) and Spanish", () => {
    assert.deepEqual(locales, ["en", "es"]);
    assert.equal(defaultLocale, "en");
    assert.ok(isLocale("es"));
    assert.ok(!isLocale("fr"));
  });

  for (const [name, get] of Object.entries(sources)) {
    test(`${name}: both languages define exactly the same keys`, () => {
      assert.deepEqual(keyPaths(get("es")).sort(), keyPaths(get("en")).sort());
    });

    test(`${name}: no text is left empty`, () => {
      for (const locale of locales) {
        const strings = get(locale);
        for (const path of keyPaths(strings)) {
          const text = path.split(".").reduce((node, key) => node[key], strings);
          assert.ok(text.trim().length > 0, `${locale}: ${name}.${path} is empty`);
        }
      }
    });
  }

  test("each language returns its own texts", () => {
    assert.equal(getUi("en").nav.projects, "Projects");
    assert.equal(getUi("es").nav.projects, "Proyectos");
    assert.equal(getHome("en").hero.cta.work, "See my work");
    assert.equal(getHome("es").hero.cta.work, "Ver mi trabajo");
  });

  test("each language links to its own CV", () => {
    assert.equal(getHome("en").hero.cvFile, "/cv/juan-posada-cv-en.pdf");
    assert.equal(getHome("es").hero.cvFile, "/cv/juan-posada-cv-es.pdf");
  });
});
