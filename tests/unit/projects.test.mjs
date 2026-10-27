import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { checkProjectSet, projectAreas } from "../../src/lib/projects.ts";

const entry = (id, featured = true) => ({ id, data: { featured } });

describe("checkProjectSet", () => {
  test("accepts every project in both languages with 2–5 featured", () => {
    const entries = ["a", "b", "c"].flatMap((slug) => [entry(`en/${slug}`), entry(`es/${slug}`)]);
    assert.doesNotThrow(() => checkProjectSet(entries));
  });

  test("fails when a project is missing in one language, naming it", () => {
    const entries = [entry("en/a"), entry("es/a"), entry("en/b"), entry("es/b"), entry("en/c")];
    assert.throws(() => checkProjectSet(entries), /"c".*es/);
  });

  test("fails with fewer than 2 featured projects", () => {
    const entries = [entry("en/a"), entry("es/a"), entry("en/b", false), entry("es/b", false)];
    assert.throws(() => checkProjectSet(entries), /between 2 and 5 featured/);
  });

  test("fails with more than 5 featured projects", () => {
    const entries = ["a", "b", "c", "d", "e", "f"].flatMap((slug) => [entry(`en/${slug}`), entry(`es/${slug}`)]);
    assert.throws(() => checkProjectSet(entries), /between 2 and 5 featured/);
  });

  test("fails on a file outside the en/ or es/ folders", () => {
    const entries = [entry("en/a"), entry("es/a"), entry("en/b"), entry("es/b"), entry("fr/b")];
    assert.throws(() => checkProjectSet(entries), /fr\/b/);
  });
});

/** Parses a grid-template-areas value into rows of cell names. */
const rowsOf = (areas) => [...areas.matchAll(/"([^"]+)"/g)].map(([, row]) => row.trim().split(/\s+/));

function assertValidLayout(areas, count, columns) {
  const rows = rowsOf(areas);
  for (const row of rows) assert.equal(row.length, columns, `every row has ${columns} columns: ${areas}`);

  const expected = Array.from({ length: count }, (_, i) => `p${i + 1}`);
  const seen = [...new Set(rows.flat())];
  assert.deepEqual(seen, expected, `reading order and no holes: ${areas}`);

  for (const name of expected) {
    const cells = rows.flatMap((row, y) => row.flatMap((cell, x) => (cell === name ? [[x, y]] : [])));
    const xs = cells.map(([x]) => x);
    const ys = cells.map(([, y]) => y);
    const width = Math.max(...xs) - Math.min(...xs) + 1;
    const height = Math.max(...ys) - Math.min(...ys) + 1;
    assert.equal(cells.length, width * height, `${name} is a rectangle: ${areas}`);
  }
}

describe("projectAreas", () => {
  for (let count = 2; count <= 5; count++) {
    test(`${count} projects: valid layout on desktop (4 cols), tablet (2) and mobile (1)`, () => {
      const areas = projectAreas(count);
      assertValidLayout(areas.desktop, count, 4);
      assertValidLayout(areas.tablet, count, 2);
      assertValidLayout(areas.mobile, count, 1);
    });
  }

  test("the first project is always the largest on desktop", () => {
    for (let count = 2; count <= 5; count++) {
      const cells = rowsOf(projectAreas(count).desktop).flat();
      const size = (name) => cells.filter((cell) => cell === name).length;
      for (let i = 2; i <= count; i++) assert.ok(size("p1") >= size(`p${i}`));
    }
  });

  test("rejects counts outside 2–5", () => {
    assert.throws(() => projectAreas(1));
    assert.throws(() => projectAreas(6));
  });
});
