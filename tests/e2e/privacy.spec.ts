import { expect, test } from "@playwright/test";
import { SITE_URL as SITE } from "../../site.mjs";

const pages = [
  {
    path: "/privacy/",
    other: "/es/privacidad/",
    lang: "en",
    heading: "Privacy",
    must: [/no forms/i, /cookies/i, /Law 1581 of 2012/, /Cal\.com/, /LinkedIn/, /GitHub/, /light theme/i],
    updated: /Updated.*November 5, 2026/,
  },
  {
    path: "/es/privacidad/",
    other: "/privacy/",
    lang: "es",
    heading: "Privacidad",
    must: [/no tiene formularios/i, /cookies/i, /Ley 1581 de 2012/, /Cal\.com/, /LinkedIn/, /GitHub/, /tema claro/i],
    updated: /Actualizado.*5 de noviembre de 2026/,
  },
] as const;

for (const p of pages) {
  test.describe(`privacy page ${p.path}`, () => {
    test("explains what is and is not collected, the rights and the date", async ({ page }) => {
      await page.goto(p.path);
      await expect(page.locator("html")).toHaveAttribute("lang", p.lang);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.heading);
      const main = page.getByRole("main");
      for (const text of p.must) await expect(main).toContainText(text);
      await expect(main.getByRole("link", { name: "juanandresposadaaleans@gmail.com" }).first()).toHaveAttribute(
        "href",
        "mailto:juanandresposadaaleans@gmail.com",
      );
      await expect(main).toContainText(p.updated);
    });

    test("links to the other language with the switch and hreflang", async ({ page }) => {
      await page.goto(p.path);
      await expect(page.locator(".language-switch a")).toHaveAttribute("href", p.other);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", `${SITE}/privacy/`);
      await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute("href", `${SITE}/es/privacidad/`);
    });
  });
}

const footers = [
  { path: "/", privacy: "/privacy/", name: "Privacy" },
  { path: "/es/", privacy: "/es/privacidad/", name: "Privacidad" },
  { path: "/projects/colchones-posada/", privacy: "/privacy/", name: "Privacy" },
  { path: "/es/proyectos/university-capstone/", privacy: "/es/privacidad/", name: "Privacidad" },
  { path: "/es/privacidad/", privacy: "/es/privacidad/", name: "Privacidad" },
  { path: "/this-page-does-not-exist/", privacy: "/privacy/", name: "Privacy" },
] as const;

for (const f of footers) {
  test(`the footer of ${f.path} links to the privacy page of its language`, async ({ page }) => {
    await page.goto(f.path);
    await expect(page.getByRole("contentinfo").getByRole("link", { name: f.name, exact: true })).toHaveAttribute("href", f.privacy);
  });
}

test("the sitemap pairs both privacy pages", async ({ request }) => {
  const xml = await (await request.get("/sitemap-0.xml")).text();
  const entry = xml.split("<url>").find((block) => block.includes(`<loc>${SITE}/privacy/</loc>`));
  expect(entry).toBeDefined();
  expect(entry).toContain(`hreflang="es" href="${SITE}/es/privacidad/"`);
});
