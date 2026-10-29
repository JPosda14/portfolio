import { expect, test, type Page } from "@playwright/test";

const homes = [
  {
    path: "/",
    section: "#projects",
    nav: "Projects",
    work: "See my work",
    label: "SYS_01 // FAMILY BUSINESS",
    live: "LIVE",
    kind: "Family business",
    labels: ["Problem", "Action", "Result"],
    viewCase: "View case",
    caseHref: "/projects/colchones-posada/",
  },
  {
    path: "/es/",
    section: "#proyectos",
    nav: "Proyectos",
    work: "Ver mi trabajo",
    label: "SYS_01 // NEGOCIO FAMILIAR",
    live: "EN VIVO",
    kind: "Negocio familiar",
    labels: ["Problema", "Acción", "Resultado"],
    viewCase: "Ver caso",
    caseHref: "/es/proyectos/colchones-posada/",
  },
] as const;

const cards = (page: Page, section: string) => page.locator(`${section} article`);

test.describe("project cards", () => {
  for (const h of homes) {
    test(`${h.path} lists the featured projects in order`, async ({ page }) => {
      await page.goto(h.path);
      await expect(cards(page, h.section).getByRole("heading", { level: 3 })).toHaveText(["Colchones Posada", "CUE Event Manager"]);
    });

    test(`${h.path} card shows label, screenshot, meta, P/A/R, stack and "view case"`, async ({ page }) => {
      await page.goto(h.path);
      const card = cards(page, h.section).first();
      await expect(card).toContainText(h.label);
      await expect(card).toContainText(h.live);
      await expect(card.locator("picture img")).toBeVisible();
      await expect(card).toContainText(h.kind);
      await expect(card).toContainText("2026");
      for (const label of h.labels) await expect(card.locator("dt")).toContainText([label]);
      await expect(card.locator(".chip")).toContainText(["Next.js"]);
      await expect(card).toContainText(h.viewCase);
    });

    test(`${h.path} card title links to its case in the same language`, async ({ page }) => {
      await page.goto(h.path);
      const link = cards(page, h.section).first().getByRole("link", { name: "Colchones Posada" });
      await expect(link).toHaveAttribute("href", h.caseHref);
    });

    test(`${h.path} clicking anywhere on the card opens the case`, async ({ page }) => {
      await page.goto(h.path);
      // Click the card over its screenshot: the title link's overlay covers the whole card on purpose.
      const card = cards(page, h.section).first();
      const shot = await card.locator("img").boundingBox();
      const area = await card.boundingBox();
      if (!shot || !area) throw new Error("card not rendered");
      await card.click({ position: { x: shot.x - area.x + shot.width / 2, y: shot.y - area.y + shot.height / 2 } });
      await expect(page).toHaveURL(new RegExp(`${h.caseHref}$`));
    });

    test(`${h.path} "${h.nav}" and "${h.work}" lead to the projects section`, async ({ page }) => {
      await page.goto(h.path);
      await expect(page.locator(h.section)).toHaveCount(1);
      await expect(page.getByRole("banner").getByRole("link", { name: h.nav, exact: true })).toHaveAttribute("href", `${h.path}${h.section}`);
      await page.locator('[data-cell="hero"]').getByRole("link", { name: h.work }).click();
      await expect(page).toHaveURL(new RegExp(`${h.section}$`));
      await expect(cards(page, h.section).first()).toBeInViewport();
    });
  }
});

test.describe("project grid", () => {
  const box = async (page: Page, index: number) => {
    const rect = await cards(page, "#projects").nth(index).boundingBox();
    if (!rect) throw new Error(`card ${index} is not rendered`);
    return rect;
  };

  test("desktop shows two projects side by side", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const [first, second] = [await box(page, 0), await box(page, 1)];
    expect(second.x).toBeGreaterThanOrEqual(first.x + first.width);
    expect(Math.abs(second.y - first.y)).toBeLessThan(1);
  });

  for (const width of [768, 375]) {
    test(`at ${width}px the projects stack without horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const [first, second] = [await box(page, 0), await box(page, 1)];
      expect(second.y).toBeGreaterThanOrEqual(first.y + first.height);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBe(0);
    });
  }

  test("the projects come after the hero and photo in reading order", async ({ page }) => {
    await page.goto("/");
    const order = await page.locator("[data-cell]").evaluateAll((nodes) =>
      nodes.map((node) => node.querySelector("h3")?.textContent?.trim() ?? node.getAttribute("data-cell")),
    );
    // Later cells (experience, skills…) come after; profile.spec checks the full order.
    expect(order.slice(0, 4)).toEqual(["hero", "photo", "Colchones Posada", "CUE Event Manager"]);
  });
});
