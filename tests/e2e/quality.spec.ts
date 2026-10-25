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

test("an unknown route shows the bilingual 404 page with links to both homes", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  await expect(page.getByRole("heading", { name: "Página no encontrada" })).toBeVisible();
  const main = page.getByRole("main");
  await expect(main.getByRole("link", { name: "Go to the home page" })).toHaveAttribute("href", "/");
  await expect(main.getByRole("link", { name: "Ir a la página de inicio" })).toHaveAttribute("href", "/es/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
});

test("the 404 page is not listed in the sitemap", async ({ request }) => {
  expect(await (await request.get("/sitemap-0.xml")).text()).not.toContain("404");
});

for (const path of ["/", "/es/", "/this-page-does-not-exist/"]) {
  test(`${path} ships no JavaScript besides the inline theme script`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("script[src]")).toHaveCount(0);
    const inline = page.locator("script:not([src])");
    await expect(inline).toHaveCount(1);
    expect(await inline.evaluate((script) => script.textContent)).toContain("data-theme-toggle");
  });

  test(`${path} makes no requests to other domains`, async ({ page, baseURL }) => {
    const siteHost = new URL(baseURL ?? "").host;
    const external: string[] = [];
    page.on("request", (request) => {
      const url = new URL(request.url());
      if (url.protocol.startsWith("http") && url.host !== siteHost) external.push(request.url());
    });
    await page.goto(path, { waitUntil: "networkidle" });
    expect(external).toEqual([]);
  });
}

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
