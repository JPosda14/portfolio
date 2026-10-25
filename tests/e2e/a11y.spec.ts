import { expect, test } from "@playwright/test";

for (const { path, label } of [
  { path: "/", label: "Skip to content" },
  { path: "/es/", label: "Saltar al contenido" },
]) {
  test(`the first Tab on ${path} reaches "skip to content", which jumps to the main content`, async ({ page, browserName }) => {
    test.skip(browserName !== "chromium");
    await page.goto(path);
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: label });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
}
