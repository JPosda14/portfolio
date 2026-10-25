import { expect, test } from "@playwright/test";

test("home pages respond in both languages", async ({ page }) => {
  for (const path of ["/", "/es/"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});
