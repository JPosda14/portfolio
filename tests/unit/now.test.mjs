import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { isNowFresh, NOW_MAX_DAYS } from "../../src/lib/now.ts";

const day = (iso) => new Date(`${iso}T12:00:00Z`);

describe("isNowFresh", () => {
  test("the limit is 90 days", () => {
    assert.equal(NOW_MAX_DAYS, 90);
  });

  test("is fresh on the same day and up to 90 days later", () => {
    assert.equal(isNowFresh("2026-11-04", day("2026-11-04")), true);
    assert.equal(isNowFresh("2026-11-04", day("2027-02-02")), true); // 90 days
  });

  test("expires after 90 days", () => {
    assert.equal(isNowFresh("2026-11-04", day("2027-02-03")), false); // 91 days
  });

  test("a date in the future counts as fresh", () => {
    assert.equal(isNowFresh("2026-12-01", day("2026-11-04")), true);
  });

  test("rejects invalid dates with the value in the message", () => {
    assert.throws(() => isNowFresh("2026-13-01", day("2026-11-04")), /2026-13-01/);
    assert.throws(() => isNowFresh("2026-02-30", day("2026-11-04")), /2026-02-30/);
    assert.throws(() => isNowFresh("nov", day("2026-11-04")), /nov/);
  });
});
