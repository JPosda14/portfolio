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

const heroes = [
  {
    path: "/",
    status: ["Available", "Remote", "Armenia, CO", "UTC‑5"],
    highlight: "AI focus",
    subtitle: /fast web products and integrate AI/,
    work: { name: "See my work", href: "#projects" },
    cv: { name: "Download CV", href: "/cv/juan-posada-cv-en.pdf" },
  },
  {
    path: "/es/",
    status: ["Disponible", "Remoto", "Armenia, CO", "UTC‑5"],
    highlight: "enfoque en IA",
    subtitle: /productos web rápidos y les integro IA/,
    work: { name: "Ver mi trabajo", href: "#proyectos" },
    cv: { name: "Descargar CV", href: "/cv/juan-posada-cv-es.pdf" },
  },
] as const;

test.describe("hero content", () => {
  for (const h of heroes) {
    test(`${h.path} shows availability, name, role and subtitle`, async ({ page }) => {
      await page.goto(h.path);
      const hero = page.locator('[data-cell="hero"]');
      for (const part of h.status) await expect(hero.locator("[data-status]")).toContainText(part);
      await expect(hero.getByRole("heading", { level: 1 })).toHaveText("Juan Andrés Posada");
      const highlight = hero.locator("[data-role] em");
      await expect(highlight).toHaveText(h.highlight);
      await expect(highlight).toHaveCSS("font-style", "italic");
      await expect(hero.getByText(h.subtitle)).toBeVisible();
    });

    test(`${h.path} links "see my work" to the projects and the CV to its own language`, async ({ page }) => {
      await page.goto(h.path);
      const hero = page.locator('[data-cell="hero"]');
      await expect(hero.getByRole("link", { name: h.work.name })).toHaveAttribute("href", h.work.href);
      await expect(hero.getByRole("link", { name: h.cv.name })).toHaveAttribute("href", h.cv.href);
    });
  }

  for (const path of ["/", "/es/"]) {
    test(`on a 375×812 phone ${path} shows the name, role and main call to action without scrolling`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(path);
      const hero = page.locator('[data-cell="hero"]');
      for (const element of [hero.getByRole("heading", { level: 1 }), hero.locator("[data-role]"), hero.locator(".primary")]) {
        const rect = await element.boundingBox();
        expect(rect && rect.y + rect.height).toBeLessThanOrEqual(812);
      }
    });
  }
});

const photos = [
  { path: "/", alt: /^Portrait of Juan Andrés Posada/, location: "Armenia, Quindío · Colombia", languages: "Spanish (native) · English B1" },
  { path: "/es/", alt: /^Retrato de Juan Andrés Posada/, location: "Armenia, Quindío · Colombia", languages: "Español nativo · Inglés B1" },
] as const;

test.describe("photo cell", () => {
  for (const p of photos) {
    test(`${p.path} shows a described photo with location and languages`, async ({ page }) => {
      await page.goto(p.path);
      const cell = page.locator('[data-cell="photo"]');
      const img = cell.getByRole("img", { name: p.alt });
      await expect(img).toBeVisible();
      await expect(cell).toContainText(p.location);
      await expect(cell).toContainText(p.languages);
    });
  }

  test("serves the photo in AVIF and WebP, with dimensions and without lazy loading", async ({ page }) => {
    await page.goto("/");
    const picture = page.locator('[data-cell="photo"] picture');
    await expect(picture.locator('source[type="image/avif"]')).toHaveCount(1);
    await expect(picture.locator('source[type="image/webp"]')).toHaveCount(1);
    const img = picture.locator("img");
    await expect(img).toHaveAttribute("width", /^\d+$/);
    await expect(img).toHaveAttribute("height", /^\d+$/);
    await expect(img).not.toHaveAttribute("loading", "lazy");
    expect(await img.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
  });

  test("shows the photo as a square", async ({ page }) => {
    await page.goto("/");
    const rect = await page.locator('[data-cell="photo"] img').boundingBox();
    expect(rect && Math.abs(rect.width - rect.height)).toBeLessThan(1);
  });
});

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
