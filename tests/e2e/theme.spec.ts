import { expect, test, type Page } from "@playwright/test";

const DARK_BG = "rgb(9, 13, 22)";
const LIGHT_BG = "rgb(255, 255, 255)";

const toggle = (page: Page) => page.locator("[data-theme-toggle]");

type ProbeWindow = Window & { themeAtBody?: string | undefined };

for (const colorScheme of ["light", "dark"] as const) {
  test(`is dark by default even when the system prefers ${colorScheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    await expect(page.locator("body")).toHaveCSS("background-color", DARK_BG);
  });
}

test("the button switches the theme and the choice survives a reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(toggle(page)).toBeVisible();
  await expect(toggle(page)).toHaveAccessibleName(/theme/i);

  await toggle(page).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("body")).toHaveCSS("background-color", LIGHT_BG);

  await page.reload();
  await expect(page.locator("body")).toHaveCSS("background-color", LIGHT_BG);

  await toggle(page).click();
  await expect(page.locator("body")).toHaveCSS("background-color", DARK_BG);
});

test("applies the saved theme before the body is rendered (no flash)", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => {
    localStorage.setItem("theme", "light");
    new MutationObserver((_, observer) => {
      if (!document.body) return;
      (window as ProbeWindow).themeAtBody = document.documentElement.dataset["theme"];
      observer.disconnect();
    }).observe(document, { childList: true, subtree: true });
  });
  await page.goto("/");
  expect(await page.evaluate(() => (window as ProbeWindow).themeAtBody)).toBe("light");
});

test("without JavaScript the page loads dark and hides the button", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: "light" });
  const page = await context.newPage();
  await page.goto("/es/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("background-color", DARK_BG);
  await expect(toggle(page)).toBeHidden();
  await context.close();
});
