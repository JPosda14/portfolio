import { expect, test } from "@playwright/test";

const SITE = "https://juanposada.dev";

const cases = [
  {
    path: "/projects/colchones-posada/",
    other: "/es/proyectos/colchones-posada/",
    lang: "en",
    title: "Colchones Posada",
    back: { name: "Back to projects", href: "/#projects" },
    facts: ["Year", "Type", "Role", "Team", "Stack"],
    sections: ["The problem", "What I did", "The result", "Technical decisions", "Gallery"],
    decision: ["Discarded", "Why"],
    links: [
      { name: "Live site", href: "https://colchonesposada.lat" },
      { name: "Source code", href: "https://github.com/JPosda14/colchones-posada" },
    ],
    next: { name: "CUE Event Manager", href: "/projects/university-capstone/" },
    switchTo: "Ver en español",
  },
  {
    path: "/es/proyectos/university-capstone/",
    other: "/projects/university-capstone/",
    lang: "es",
    title: "CUE Event Manager",
    back: { name: "Volver a proyectos", href: "/es/#proyectos" },
    facts: ["Año", "Tipo", "Rol", "Equipo", "Stack"],
    sections: ["El problema", "Qué hice", "El resultado", "Decisiones técnicas", "Galería"],
    decision: ["Descartado", "Por qué"],
    links: [{ name: "Organización en GitHub", href: "https://github.com/cue-event-manager" }],
    next: { name: "Colchones Posada", href: "/es/proyectos/colchones-posada/" },
    switchTo: "View in English",
  },
] as const;

for (const c of cases) {
  test.describe(`case ${c.path}`, () => {
    test("has its own language, title, description, canonical and hreflang", async ({ page }) => {
      await page.goto(c.path);
      await expect(page.locator("html")).toHaveAttribute("lang", c.lang);
      await expect(page).toHaveTitle(new RegExp(c.title));
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{30,}/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${c.path}`);
      const en = c.lang === "en" ? c.path : c.other;
      const es = c.lang === "es" ? c.path : c.other;
      await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", `${SITE}${en}`);
      await expect(page.locator('link[hreflang="es"]')).toHaveAttribute("href", `${SITE}${es}`);
      await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute("href", `${SITE}${en}`);
    });

    test("the language switch opens the same case in the other language", async ({ page }) => {
      await page.goto(c.path);
      await page.getByRole("link", { name: c.switchTo }).click();
      await expect(page).toHaveURL(new RegExp(`${c.other}$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(c.title);
    });

    test("shows back link, title, facts and every section", async ({ page }) => {
      await page.goto(c.path);
      const main = page.getByRole("main");
      await expect(main.getByRole("link", { name: c.back.name })).toHaveAttribute("href", c.back.href);
      await expect(main.getByRole("heading", { level: 1 })).toHaveText(c.title);
      for (const fact of c.facts) await expect(main.locator(".facts dt")).toContainText([fact]);
      await expect(main.getByRole("heading", { level: 2 })).toContainText([...c.sections]);
      for (const label of c.decision) await expect(main.locator(".decision")).toContainText([label]);
    });

    test("links to the live site and code that exist, opening in a new tab", async ({ page }) => {
      await page.goto(c.path);
      for (const link of c.links) {
        const anchor = page.getByRole("main").getByRole("link", { name: link.name });
        await expect(anchor).toHaveAttribute("href", link.href);
        await expect(anchor).toHaveAttribute("target", "_blank");
      }
    });

    test("ends with a card to the next project", async ({ page }) => {
      await page.goto(c.path);
      const next = page.locator(".next").getByRole("link", { name: c.next.name });
      await expect(next).toHaveAttribute("href", c.next.href);
    });

    test("serves the cover eagerly and the gallery lazily, in AVIF/WebP with dimensions", async ({ page }) => {
      await page.goto(c.path);
      const cover = page.locator(".cover picture");
      await expect(cover.locator('source[type="image/avif"]')).toHaveCount(1);
      await expect(cover.locator("img")).not.toHaveAttribute("loading", "lazy");
      const gallery = page.locator(".gallery img");
      await expect(gallery).toHaveCount(2);
      for (const img of await gallery.all()) {
        await expect(img).toHaveAttribute("loading", "lazy");
        await expect(img).toHaveAttribute("width", /^\d+$/);
        await expect(img).toHaveAttribute("height", /^\d+$/);
      }
    });
  });
}

test("case pages have no horizontal overflow on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const c of cases) {
    await page.goto(c.path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, c.path).toBe(0);
  }
});
