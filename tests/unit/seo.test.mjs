import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { ogImagePath, ogLocale, personJsonLd } from "../../src/lib/seo.ts";

describe("ogImagePath", () => {
  test("one image per page key and language, under /og/", () => {
    assert.equal(ogImagePath("home", "en"), "/og/home-en.png");
    assert.equal(ogImagePath("colchones-posada", "es"), "/og/colchones-posada-es.png");
  });
});

describe("ogLocale", () => {
  test("maps site locales to Open Graph locales", () => {
    assert.equal(ogLocale("en"), "en_US");
    assert.equal(ogLocale("es"), "es_CO");
  });
});

describe("personJsonLd", () => {
  for (const locale of ["en", "es"]) {
    test(`${locale}: a schema.org Person with name, role, location, URL and profiles`, () => {
      const person = personJsonLd(locale, "https://juanposada.dev");
      assert.equal(person["@context"], "https://schema.org");
      assert.equal(person["@type"], "Person");
      assert.equal(person.name, "Juan Andrés Posada");
      assert.match(person.jobTitle, locale === "en" ? /Full-stack Software Engineer with an AI focus/ : /Ingeniero de Software/);
      assert.equal(person.url, locale === "en" ? "https://juanposada.dev/" : "https://juanposada.dev/es/");
      assert.equal(person.address.addressLocality, "Armenia");
      assert.equal(person.address.addressCountry, "CO");
      assert.deepEqual(person.sameAs, ["https://www.linkedin.com/in/juanandresposadaaleans010101", "https://github.com/JPosda14"]);
      assert.doesNotMatch(JSON.stringify(person), /telephone|\+57/);
    });
  }
});
