import { expect, test } from "@playwright/test";

// Values from docs/DESIGN.md.
const themes = {
  dark: { bg: "rgb(9, 13, 22)", text: "rgb(226, 232, 240)" },
  light: { bg: "rgb(255, 255, 255)", text: "rgb(15, 23, 42)" },
} as const;

for (const [scheme, colors] of Object.entries(themes)) {
  test(`applies the ${scheme} theme tokens`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme as "dark" | "light" });
    await page.goto("/");
    const body = page.locator("body");
    await expect(body).toHaveCSS("background-color", colors.bg);
    await expect(body).toHaveCSS("color", colors.text);
  });
}

test("uses the three brand fonts, served from the site itself", async ({ page }) => {
  const fontRequests: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "font") fontRequests.push(request.url());
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  await expect(page.locator("body")).toHaveCSS("font-family", /Geist/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("font-family", /Playfair Display/);
  const families = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--font-mono"),
  );
  expect(families).toMatch(/JetBrains Mono/);

  expect(fontRequests.length).toBeGreaterThan(0);
  const origin = new URL(page.url()).host;
  for (const url of fontRequests) expect(new URL(url).host).toBe(origin);
});

test("disables motion when the visitor prefers reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const timing = await page.evaluate(() => {
    const probe = document.createElement("div");
    probe.style.transition = "opacity 1s";
    probe.style.animation = "spin 2s infinite";
    document.body.append(probe);
    const style = getComputedStyle(probe);
    return { transition: parseFloat(style.transitionDuration), animation: parseFloat(style.animationDuration) };
  });
  expect(timing.transition).toBeLessThan(0.01);
  expect(timing.animation).toBeLessThan(0.01);
});
