import { expect, test } from "@playwright/test";

const REPO = "https://github.com/JPosda14/portfolio";

const pages = [
  {
    path: "/",
    home: "/",
    nav: "Main",
    links: { Projects: "/#projects", Experience: "/#experience", Contact: "/#contact" },
    language: "Language",
    source: "Source on GitHub",
  },
  {
    path: "/es/",
    home: "/es/",
    nav: "Principal",
    links: { Proyectos: "/es/#proyectos", Experiencia: "/es/#experiencia", Contacto: "/es/#contacto" },
    language: "Idioma",
    source: "Código en GitHub",
  },
] as const;

for (const p of pages) {
  test.describe(`header and footer on ${p.path}`, () => {
    test("the header has the logo, navigation, language switch and theme button", async ({ page }) => {
      await page.goto(p.path);
      const header = page.getByRole("banner");
      await expect(header.getByRole("link", { name: "juan.posada" })).toHaveAttribute("href", p.home);

      const nav = header.getByRole("navigation", { name: p.nav });
      for (const [name, href] of Object.entries(p.links)) {
        await expect(nav.getByRole("link", { name, exact: true })).toHaveAttribute("href", href);
      }

      await expect(header.getByRole("navigation", { name: p.language })).toBeVisible();
      await expect(header.locator("[data-theme-toggle]")).toBeVisible();
    });

    test("the footer has the year and the source link, and no privacy link yet", async ({ page }) => {
      await page.goto(p.path);
      const footer = page.getByRole("contentinfo");
      await expect(footer).toContainText(String(new Date().getFullYear()));
      await expect(footer.getByRole("link", { name: p.source })).toHaveAttribute("href", REPO);
      await expect(footer.getByRole("link", { name: /privacy|privacidad/i })).toHaveCount(0);
    });
  });
}
