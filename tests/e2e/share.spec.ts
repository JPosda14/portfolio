import { expect, test, type Page } from "@playwright/test";

const SITE = "https://juanposada.dev";

const pages = [
  { path: "/", image: "/og/home-en.png", locale: "en_US", alternate: "es_CO", type: "website" },
  { path: "/es/", image: "/og/home-es.png", locale: "es_CO", alternate: "en_US", type: "website" },
  { path: "/projects/colchones-posada/", image: "/og/colchones-posada-en.png", locale: "en_US", alternate: "es_CO", type: "article" },
  { path: "/es/proyectos/colchones-posada/", image: "/og/colchones-posada-es.png", locale: "es_CO", alternate: "en_US", type: "article" },
  { path: "/projects/university-capstone/", image: "/og/university-capstone-en.png", locale: "en_US", alternate: "es_CO", type: "article" },
  { path: "/es/proyectos/university-capstone/", image: "/og/university-capstone-es.png", locale: "es_CO", alternate: "en_US", type: "article" },
  { path: "/privacy/", image: "/og/home-en.png", locale: "en_US", alternate: "es_CO", type: "website" },
  { path: "/es/privacidad/", image: "/og/home-es.png", locale: "es_CO", alternate: "en_US", type: "website" },
] as const;

const meta = (page: Page, key: string) => page.locator(`meta[property="${key}"], meta[name="${key}"]`);

for (const p of pages) {
  test(`${p.path} has share metadata and a 1200 × 630 image`, async ({ page, request }) => {
    await page.goto(p.path);
    await expect(meta(page, "og:title")).toHaveAttribute("content", await page.title());
    await expect(meta(page, "og:description")).toHaveAttribute(
      "content",
      (await page.locator('meta[name="description"]').getAttribute("content")) ?? "",
    );
    await expect(meta(page, "og:url")).toHaveAttribute("content", `${SITE}${p.path}`);
    await expect(meta(page, "og:type")).toHaveAttribute("content", p.type);
    await expect(meta(page, "og:locale")).toHaveAttribute("content", p.locale);
    await expect(meta(page, "og:locale:alternate")).toHaveAttribute("content", p.alternate);
    await expect(meta(page, "og:site_name")).toHaveAttribute("content", "Juan Andrés Posada");
    await expect(meta(page, "og:image")).toHaveAttribute("content", `${SITE}${p.image}`);
    await expect(meta(page, "og:image:width")).toHaveAttribute("content", "1200");
    await expect(meta(page, "og:image:height")).toHaveAttribute("content", "630");
    await expect(meta(page, "og:image:alt")).toHaveAttribute("content", /.+/);
    await expect(meta(page, "twitter:card")).toHaveAttribute("content", "summary_large_image");
    await expect(meta(page, "theme-color")).toHaveAttribute("content", "#090d16");

    const image = await request.get(p.image);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toBe("image/png");
    const bytes = await image.body();
    // PNG header: width and height are big-endian at bytes 16–23.
    expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([1200, 630]);
  });
}

test("the 404 page has no share metadata", async ({ page }) => {
  await page.goto("/this-page-does-not-exist/");
  await expect(page.locator('meta[property^="og:"], meta[name^="twitter:"]')).toHaveCount(0);
});

for (const path of ["/", "/es/"]) {
  test(`${path} describes Juan as a schema.org Person`, async ({ page }) => {
    await page.goto(path);
    const blocks = page.locator('script[type="application/ld+json"]');
    await expect(blocks).toHaveCount(1);
    const person = JSON.parse((await blocks.textContent()) ?? "{}");
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe("Juan Andrés Posada");
    expect(person.url).toBe(`${SITE}${path}`);
    expect(person.sameAs).toEqual(["https://www.linkedin.com/in/juanandresposadaaleans010101", "https://github.com/JPosda14"]);
  });
}

test("case pages do not repeat the Person data", async ({ page }) => {
  await page.goto("/projects/colchones-posada/");
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
});
