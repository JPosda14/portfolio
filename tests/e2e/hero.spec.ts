import { expect, test, type Page } from "@playwright/test";

const box = async (page: Page, cell: string) => {
  const rect = await page.locator(`[data-cell="${cell}"]`).boundingBox();
  if (!rect) throw new Error(`cell "${cell}" is not rendered`);
  return rect;
};

const CAL_COM = "https://cal.com/juan-andres-posada-aleans-nawip2";

const calls = [
  { path: "/", work: "See my work", cv: "Download CV", call: "Book a call", newTab: "opens in a new tab" },
  { path: "/es/", work: "Ver mi trabajo", cv: "Descargar CV", call: "Agendar llamada", newTab: "se abre en una pestaña nueva" },
] as const;

test.describe("calls to action", () => {
  for (const c of calls) {
    test(`${c.path} shows the three calls to action in the hero`, async ({ page }) => {
      await page.goto(c.path);
      const hero = page.locator('[data-cell="hero"]');
      await expect(hero.getByRole("link", { name: c.work })).toBeVisible();
      await expect(hero.getByRole("link", { name: c.cv })).toBeVisible();
      await expect(hero.getByRole("link", { name: c.call })).toBeVisible();
    });

    test(`${c.path} opens Cal.com in a new tab and says so to screen readers`, async ({ page }) => {
      await page.goto(c.path);
      const call = page.locator('[data-cell="hero"]').getByRole("link", { name: c.call });
      await expect(call).toHaveAttribute("href", CAL_COM);
      await expect(call).toHaveAttribute("target", "_blank");
      await expect(call).toHaveAttribute("rel", /noopener/);
      await expect(call).toHaveAccessibleName(new RegExp(`${c.call}.*${c.newTab}`));
    });
  }

  test("the primary call to action is visually distinct and at least 44px tall", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator('[data-cell="hero"]');
    const primary = hero.getByRole("link", { name: "See my work" });
    const secondary = hero.getByRole("link", { name: "Download CV" });
    await expect(primary).toHaveCSS("background-color", "rgb(0, 71, 255)");
    await expect(secondary).not.toHaveCSS("background-color", "rgb(0, 71, 255)");
    for (const link of [primary, secondary]) expect((await link.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  });
});

test.describe("bento grid", () => {
  for (const path of ["/", "/es/"]) {
    test(`on ${path} desktop shows the photo to the right of the hero, in the same row`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(path);
      const hero = await box(page, "hero");
      const photo = await box(page, "photo");
      expect(photo.x).toBeGreaterThanOrEqual(hero.x + hero.width);
      expect(Math.abs(photo.y - hero.y)).toBeLessThan(1);
      expect(Math.abs(photo.width - hero.width)).toBeLessThan(2);
    });
  }

  test("tablet places the photo below the full-width hero", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    const hero = await box(page, "hero");
    const photo = await box(page, "photo");
    expect(photo.y).toBeGreaterThanOrEqual(hero.y + hero.height);
    expect(Math.abs(photo.width - hero.width)).toBeLessThan(2);
  });

  test("mobile stacks every cell in one column", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/es/");
    const hero = await box(page, "hero");
    const photo = await box(page, "photo");
    expect(photo.y).toBeGreaterThanOrEqual(hero.y + hero.height);
    expect(Math.abs(photo.x - hero.x)).toBeLessThan(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
  });

  test("the reading order in the code matches the visual order", async ({ page }) => {
    await page.goto("/");
    const cells = await page.locator("[data-cell]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-cell")));
    expect(cells.slice(0, 2)).toEqual(["hero", "photo"]);
    const usesOrder = await page.locator("[data-cell]").evaluateAll((nodes) =>
      nodes.some((node) => getComputedStyle(node).order !== "0"),
    );
    expect(usesOrder).toBe(false);
  });

  test("each cell is a labelled region", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("region", { name: "Introduction" })).toHaveAttribute("data-cell", "hero");
    await expect(page.getByRole("region", { name: "About // Location" })).toHaveAttribute("data-cell", "photo");
  });
});
