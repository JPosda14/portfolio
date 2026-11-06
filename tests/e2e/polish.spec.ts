import { expect, test, type Page } from "@playwright/test";

const animation = (page: Page, selector: string) =>
  page.locator(selector).first().evaluate((node) => getComputedStyle(node).animationName);

test.describe("cell entrance", () => {
  test("cells below the first block fade in; the hero and photo do not", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    for (const area of ["hero", "photo", "now"]) expect(await animation(page, `[data-cell="${area}"]`)).toBe("none");
    for (const selector of ["#projects article", '[data-cell="exp"]', '[data-cell="think"]', '[data-cell="contact"]']) {
      expect(await animation(page, selector)).toBe("cell-enter");
    }
  });

  test("with reduced motion nothing is animated", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/es/");
    const names = await page.locator("[data-cell]").evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).animationName));
    expect(new Set(names)).toEqual(new Set(["none"]));
  });
});

test("on mobile the photo is requested at the size it is shown", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const photo = page.locator('[data-cell="photo"] img');
  await expect(photo).toHaveAttribute("sizes", "(max-width: 639px) 9rem, 12rem");
  // At 1× the browser should pick the 192w candidate (9rem = 144 CSS px), not the 384w one.
  const dpr = await page.evaluate(() => window.devicePixelRatio);
  if (dpr === 1) {
    const width = await photo.evaluate(async (img: HTMLImageElement) => {
      await img.decode();
      const candidates = [...(img.parentElement?.querySelectorAll("source, img") ?? [])].flatMap((node) =>
        (node.getAttribute("srcset") ?? "").split(",").map((entry) => entry.trim().split(/\s+/)),
      );
      const chosen = new URL(img.currentSrc).pathname;
      return candidates.find(([url]) => url && new URL(url, location.href).pathname === chosen)?.[1];
    });
    expect(width).toBe("192w");
  }
});
