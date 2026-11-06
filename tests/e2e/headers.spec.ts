import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

// public/_headers is applied by Cloudflare, not by `astro preview`, so these tests read it and add the
// policy to every response themselves, then check the pages still work under it.
const headersFile = readFileSync(new URL("../../public/_headers", import.meta.url), "utf8");
const csp = /Content-Security-Policy: (.+)/.exec(headersFile)?.[1]?.trim() ?? "";

test("the CSP allows exactly the inline theme script by its hash", async ({ request }) => {
  const html = await (await request.get("/")).text();
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1] ?? "");
  expect(scripts).toHaveLength(1);
  const hash = createHash("sha256").update(scripts[0] ?? "").digest("base64");
  expect(csp).toContain(`script-src 'sha256-${hash}'`);
});

for (const path of ["/", "/es/proyectos/colchones-posada/", "/privacy/", "/this-page-does-not-exist/"]) {
  test(`${path} works under the CSP: no violations, theme switch still works`, async ({ page }) => {
    await page.route("**/*", async (route) => {
      const response = await route.fetch();
      await route.fulfill({ response, headers: { ...response.headers(), "content-security-policy": csp } });
    });
    const violations: string[] = [];
    page.on("console", (message) => {
      if (/Content Security Policy|Content-Security-Policy/i.test(message.text())) violations.push(message.text());
    });
    await page.goto(path);
    await page.locator("[data-theme-toggle]").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    expect(violations).toEqual([]);
  });
}

test("hashed build assets are cached for a year; the rest uses the security headers", () => {
  expect(headersFile).toMatch(/\/_astro\/\*\s+Cache-Control: public, max-age=31536000, immutable/);
  for (const header of ["X-Content-Type-Options: nosniff", "Referrer-Policy:", "X-Frame-Options: DENY", "Permissions-Policy:", "Strict-Transport-Security:"]) {
    expect(headersFile).toContain(header);
  }
});
