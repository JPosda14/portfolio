import { expect, test } from "@playwright/test";

const SITE = "https://juanposada.dev";

const pages = [
  { path: "/", lang: "en", title: /Full-stack Software Engineer/, anchors: ["projects", "experience", "contact"] },
  { path: "/es/", lang: "es", title: /Ingeniero de Software/, anchors: ["proyectos", "experiencia", "contacto"] },
] as const;

for (const { path, lang, title, anchors } of pages) {
  test.describe(`${lang} home`, () => {
    test("declares its language, title and description", async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page).toHaveTitle(title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
    });

    test("has a canonical URL and reciprocal hreflang links", async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${path}`);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", `${SITE}/`);
      await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute("href", `${SITE}/es/`);
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", `${SITE}/`);
    });

    test("has the section anchors the navigation points to", async ({ page }) => {
      await page.goto(path);
      for (const id of anchors) await expect(page.locator(`#${id}`)).toHaveCount(1);
    });
  });
}

test("the two homes show different texts", async ({ page }) => {
  await page.goto("/");
  const enDescription = await page.locator('meta[name="description"]').getAttribute("content");
  await page.goto("/es/");
  const esDescription = await page.locator('meta[name="description"]').getAttribute("content");
  expect(enDescription).not.toBe(esDescription);
});

test("does not redirect based on the browser language", async ({ browser }) => {
  const context = await browser.newContext({ locale: "es-CO", extraHTTPHeaders: { "Accept-Language": "es-CO,es;q=0.9" } });
  const page = await context.newPage();
  const response = await page.goto("/");
  expect(response?.request().redirectedFrom()).toBeNull();
  expect(new URL(page.url()).pathname).toBe("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await context.close();
});

test("the sitemap lists both homes with their language alternates", async ({ request }) => {
  const index = await request.get("/sitemap-index.xml");
  expect(index.ok()).toBe(true);
  const sitemap = await (await request.get("/sitemap-0.xml")).text();
  expect(sitemap).toContain(`<loc>${SITE}/</loc>`);
  expect(sitemap).toContain(`<loc>${SITE}/es/</loc>`);
  expect(sitemap).toContain('hreflang="es"');
  expect(sitemap).toContain('hreflang="en"');
});
