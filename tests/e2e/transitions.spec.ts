import { expect, test } from "@playwright/test";

const transitionName = (locator: import("@playwright/test").Locator) =>
  locator.evaluate((node) => getComputedStyle(node).viewTransitionName);

for (const { home, slug, caseHref } of [
  { home: "/", slug: "colchones-posada", caseHref: "/projects/colchones-posada/" },
  { home: "/es/", slug: "university-capstone", caseHref: "/es/proyectos/university-capstone/" },
]) {
  test(`card and case of ${slug} share the screenshot and title transition names (${home})`, async ({ page }) => {
    await page.goto(home);
    const card = page.locator("article", { has: page.locator(`a[href="${caseHref}"]`) });
    const cardShot = await transitionName(card.locator("img"));
    const cardTitle = await transitionName(card.getByRole("heading", { level: 3 }));

    await page.goto(caseHref);
    expect(await transitionName(page.locator(".cover img"))).toBe(cardShot);
    expect(await transitionName(page.getByRole("heading", { level: 1 }))).toBe(cardTitle);
    expect(cardShot).toBe(`project-${slug}-shot`);
    expect(cardTitle).toBe(`project-${slug}-title`);
  });
}

test("each card has its own transition names", async ({ page }) => {
  await page.goto("/");
  const names = await page.locator("#projects article img").evaluateAll((nodes) => nodes.map((n) => getComputedStyle(n).viewTransitionName));
  expect(new Set(names).size).toBe(names.length);
});

test("cross-document view transitions are enabled only without reduced motion", async ({ page }) => {
  await page.goto("/");
  const rules = await page.evaluate(() => {
    const found: { media: string | null; text: string }[] = [];
    const walk = (list: CSSRuleList, media: string | null) => {
      for (const rule of Array.from(list)) {
        if (rule instanceof CSSMediaRule) walk(rule.cssRules, rule.conditionText);
        else if (rule.cssText.startsWith("@view-transition")) found.push({ media, text: rule.cssText });
      }
    };
    for (const sheet of Array.from(document.styleSheets)) walk(sheet.cssRules, null);
    return found;
  });
  expect(rules.length).toBeGreaterThan(0);
  for (const rule of rules) {
    expect(rule.text).toContain("navigation: auto");
    expect(rule.media).toContain("prefers-reduced-motion: no-preference");
  }
});
