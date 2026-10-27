import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/es/",
  "/projects/colchones-posada/",
  "/es/proyectos/colchones-posada/",
  "/projects/university-capstone/",
  "/es/proyectos/university-capstone/",
  "/this-page-does-not-exist/",
];

for (const path of routes) {
  for (const theme of ["dark", "light"] as const) {
    test(`${path} has no detectable accessibility violations in the ${theme} theme`, async ({ page }) => {
      await page.goto(path);
      if (theme === "light") await page.evaluate(() => (document.documentElement.dataset["theme"] = "light"));
      const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      expect(violations.map(({ id, nodes }) => `${id}: ${nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  }
}

for (const { path, label } of [
  { path: "/", label: "Skip to content" },
  { path: "/es/", label: "Saltar al contenido" },
]) {
  test(`the first Tab on ${path} reaches "skip to content", which jumps to the main content`, async ({ page }) => {
    await page.goto(path);
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: label });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
}

test("every header control shows a visible focus ring when reached with the keyboard", async ({ page }) => {
  await page.goto("/");
  const controls = page.getByRole("banner").locator("a, button");
  const count = await controls.count();
  await page.keyboard.press("Tab"); // skip link
  for (let i = 0; i < count; i++) {
    await page.keyboard.press("Tab");
    const outline = await page.evaluate(() => {
      const style = getComputedStyle(document.activeElement as Element);
      return { style: style.outlineStyle, width: parseFloat(style.outlineWidth) };
    });
    expect(outline.style).not.toBe("none");
    expect(outline.width).toBeGreaterThanOrEqual(2);
  }
});
