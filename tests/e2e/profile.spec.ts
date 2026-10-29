import { expect, test, type Page } from "@playwright/test";

const homes = [
  {
    path: "/",
    nav: "Experience",
    anchor: "#experience",
    jobs: [
      { role: "Web Developer", company: "INSTALAAB SAS", period: "Sep 2025 – Jan 2026", achievement: /tourism web platform/ },
      { role: "Full-Stack Developer", company: "Mirus Smart Solutions", period: "Aug 2023 – Sep 2025", achievement: /Serverless platform on AWS/ },
    ],
    newTab: "opens in a new tab",
    daily: ["Java", "Spring Boot", "Flutter", "Python", "TypeScript", "Next.js", "Supabase", "Git"],
    also: /Also worked with.*React · AWS serverless/,
    learning: ["AI agents · Claude Code", "Spec-Driven Development", "Astro"],
    business: ["Basic SEO", "UX/UI", "Process automation (Make)", "Scrum", "CI & unit testing"],
  },
  {
    path: "/es/",
    nav: "Experiencia",
    anchor: "#experiencia",
    jobs: [
      { role: "Desarrollador Web", company: "INSTALAAB SAS", period: "sep 2025 – ene 2026", achievement: /Plataforma web turística/ },
      { role: "Desarrollador Full Stack", company: "Mirus Smart Solutions", period: "ago 2023 – sep 2025", achievement: /Plataforma serverless en AWS/ },
    ],
    newTab: "se abre en una pestaña nueva",
    daily: ["Java", "Spring Boot", "Flutter", "Python", "TypeScript", "Next.js", "Supabase", "Git"],
    also: /También he trabajado con.*React · AWS serverless/,
    learning: ["Agentes de IA · Claude Code", "Spec-Driven Development", "Astro"],
    business: ["SEO básico", "UX/UI", "Automatización de procesos (Make)", "Scrum", "CI y pruebas unitarias"],
  },
] as const;

const cell = (page: Page, area: string) => page.locator(`[data-cell="${area}"]`);

for (const h of homes) {
  test.describe(`experience and skills on ${h.path}`, () => {
    test("experience lists the jobs, most recent first, with period and achievement", async ({ page }) => {
      await page.goto(h.path);
      const jobs = cell(page, "exp").locator("li");
      await expect(jobs).toHaveCount(h.jobs.length);
      for (const [index, job] of h.jobs.entries()) {
        const item = jobs.nth(index);
        await expect(item).toContainText(job.role);
        await expect(item).toContainText(job.company);
        await expect(item.locator("time")).toHaveText(job.period);
        await expect(item).toContainText(job.achievement);
      }
    });

    test("LinkedIn opens in a new tab and says so", async ({ page }) => {
      await page.goto(h.path);
      const link = cell(page, "exp").getByRole("link", { name: /LinkedIn/ });
      await expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/juanandresposadaaleans010101");
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAccessibleName(new RegExp(h.newTab));
    });

    test(`"${h.nav}" in the header leads to the experience cell`, async ({ page }) => {
      await page.goto(h.path);
      await page.getByRole("banner").getByRole("link", { name: h.nav, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${h.anchor}$`));
      await expect(cell(page, "exp")).toHaveAttribute("id", h.anchor.slice(1));
      await expect(cell(page, "exp")).toBeInViewport();
    });

    test("the three skill categories list exactly their skills", async ({ page }) => {
      await page.goto(h.path);
      await expect(cell(page, "daily").locator("ul li")).toHaveText([...h.daily]);
      await expect(cell(page, "daily")).toContainText(h.also);
      await expect(cell(page, "learn").locator("ul li")).toHaveText([...h.learning]);
      await expect(cell(page, "biz").locator("ul li")).toHaveText([...h.business]);
    });
  });
}

test("skills have no bars or percentages and their icons are decorative", async ({ page }) => {
  await page.goto("/");
  const skills = page.locator('[data-cell="daily"], [data-cell="learn"], [data-cell="biz"]');
  await expect(skills.locator('[role="progressbar"], progress, meter')).toHaveCount(0);
  for (const text of await skills.allTextContents()) expect(text).not.toContain("%");
  const icons = skills.locator("svg");
  await expect(icons).toHaveCount(16);
  for (const icon of await icons.all()) await expect(icon).toHaveAttribute("aria-hidden", "true");
});

test.describe("profile grid", () => {
  const box = async (page: Page, area: string) => {
    const rect = await cell(page, area).boundingBox();
    if (!rect) throw new Error(`${area} is not rendered`);
    return rect;
  };

  test("desktop: experience beside daily use, learning beside business", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const exp = await box(page, "exp");
    const daily = await box(page, "daily");
    const learn = await box(page, "learn");
    const biz = await box(page, "biz");
    expect(Math.abs(exp.y - daily.y)).toBeLessThan(1);
    expect(daily.x).toBeGreaterThan(exp.x);
    expect(learn.y).toBeGreaterThanOrEqual(exp.y + exp.height);
    expect(Math.abs(learn.y - biz.y)).toBeLessThan(1);
  });

  for (const width of [768, 375]) {
    test(`at ${width}px the cells fit without horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const [exp, daily] = await Promise.all([box(page, "exp"), box(page, "daily")]);
      expect(daily.y).toBeGreaterThanOrEqual(exp.y + exp.height);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBe(0);
    });
  }

  test("reading order: hero, photo, projects, experience, skills", async ({ page }) => {
    await page.goto("/");
    const order = await page.locator("[data-cell]").evaluateAll((nodes) =>
      nodes.map((node) => node.querySelector("h3")?.closest("article") ? "project" : node.getAttribute("data-cell")),
    );
    expect(order).toEqual(["hero", "photo", "project", "project", "exp", "daily", "learn", "biz"]);
  });
});
