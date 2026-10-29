import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { formatMonth, formatPeriod } from "../../src/lib/dates.ts";

describe("formatPeriod", () => {
  test("English uses short capitalized months", () => {
    assert.equal(formatPeriod("2025-09", "2026-01", "en"), "Sep 2025 – Jan 2026");
    assert.equal(formatPeriod("2023-08", "2025-09", "en"), "Aug 2023 – Sep 2025");
  });

  test("Spanish uses short lowercase months without dots, and 'sep' for September", () => {
    assert.equal(formatPeriod("2025-09", "2026-01", "es"), "sep 2025 – ene 2026");
    assert.equal(formatPeriod("2023-08", "2025-09", "es"), "ago 2023 – sep 2025");
  });

  test("every month has three letters in both languages", () => {
    for (const locale of ["en", "es"]) {
      for (let month = 1; month <= 12; month++) {
        const label = formatMonth(`2025-${String(month).padStart(2, "0")}`, locale);
        assert.match(label, /^\p{L}{3} 2025$/u, `${locale} ${month}: ${label}`);
      }
    }
  });

  test("rejects dates that are not YYYY-MM", () => {
    assert.throws(() => formatMonth("2025-13", "en"));
    assert.throws(() => formatMonth("Sep 2025", "en"));
  });
});
