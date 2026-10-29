import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { en } from "../../src/content/home/en.ts";
import { lineIcons, resolveIcon, techIcons } from "../../src/lib/icons.ts";

describe("icons", () => {
  test("every skill in the content has a known icon", () => {
    const { daily, learning, business } = en.skills;
    for (const { icon } of [...daily.items, ...learning.items, ...business.items]) {
      assert.doesNotThrow(() => resolveIcon(icon), icon);
    }
  });

  test("an unknown icon id fails loudly", () => {
    assert.throws(() => resolveIcon("aws"), /Unknown icon "aws"/);
  });

  test("technology logos come from Simple Icons as 24×24 paths", () => {
    for (const icon of Object.values(techIcons)) assert.match(icon.path, /^[Mm]/);
    assert.ok(Object.keys(lineIcons).length > 0);
  });
});
