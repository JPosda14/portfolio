import { expect, test, type Page } from "@playwright/test";

const homes = [
  {
    path: "/",
    steps: [
      { tag: "01 / Understand", title: "Problem first", text: /what hurts/ },
      { tag: "02 / Specify", title: "Write it down before coding", text: /testable requirements/ },
      { tag: "03 / Verify", title: "Test and measure", text: /without evidence/ },
    ],
    now: /Looking for a remote full-stack role/,
    nowDate: "Nov 2026",
    contactTitle: "Let's build something together.",
    contactText: /remote full-stack role.*freelance/,
    call: "Book a call",
    cv: { name: "Download CV", href: "/cv/juan-posada-cv-en.pdf" },
    newTab: "opens in a new tab",
    languages: "Spanish (native) · English B1",
    nav: "Contact",
    anchor: "#contact",
  },
  {
    path: "/es/",
    steps: [
      { tag: "01 / Entender", title: "Primero el problema", text: /qué duele/ },
      { tag: "02 / Especificar", title: "Documentar antes de programar", text: /requisitos verificables/ },
      { tag: "03 / Verificar", title: "Probar y medir", text: /sin evidencia/ },
    ],
    now: /Buscando un rol remoto full-stack/,
    nowDate: "nov 2026",
    contactTitle: "Construyamos algo juntos.",
    contactText: /rol remoto full-stack.*freelance/,
    call: "Agendar llamada",
    cv: { name: "Descargar CV", href: "/cv/juan-posada-cv-es.pdf" },
    newTab: "se abre en una pestaña nueva",
    languages: "Español nativo · Inglés B1",
    nav: "Contacto",
    anchor: "#contacto",
  },
] as const;

const cell = (page: Page, area: string) => page.locator(`[data-cell="${area}"]`);

for (const h of homes) {
  test.describe(`closing cells on ${h.path}`, () => {
    test("how I think shows three numbered steps in order", async ({ page }) => {
      await page.goto(h.path);
      const steps = cell(page, "think").locator("ol > li");
      await expect(steps).toHaveCount(3);
      for (const [index, step] of h.steps.entries()) {
        const item = steps.nth(index);
        await expect(item.locator(".step-tag")).toHaveText(step.tag, { ignoreCase: true });
        await expect(item.getByRole("heading", { level: 3 })).toHaveText(step.title);
        await expect(item).toContainText(step.text);
      }
      for (const icon of await cell(page, "think").locator("svg").all()) await expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    test("now shows its text and the date it was updated", async ({ page }) => {
      await page.goto(h.path);
      await expect(cell(page, "now")).toContainText(h.now);
      const time = cell(page, "now").locator("time");
      await expect(time).toHaveText(h.nowDate);
      await expect(time).toHaveAttribute("datetime", /^\d{4}-\d{2}-\d{2}$/);
    });

    test("contact offers email, call, CV, LinkedIn, GitHub and languages", async ({ page }) => {
      await page.goto(h.path);
      const contact = cell(page, "contact");
      await expect(contact.getByRole("heading", { level: 2 })).toHaveText(h.contactTitle);
      await expect(contact).toContainText(h.contactText);
      await expect(contact.getByRole("link", { name: "juanandresposadaaleans@gmail.com" })).toHaveAttribute(
        "href",
        "mailto:juanandresposadaaleans@gmail.com",
      );
      const cv = contact.getByRole("link", { name: h.cv.name });
      await expect(cv).toHaveAttribute("href", h.cv.href);
      await expect(cv).toHaveAttribute("download", "");
      const external = [
        { name: h.call, href: "https://cal.com/juan-andres-posada-aleans-nawip2" },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/juanandresposadaaleans010101" },
        { name: "GitHub", href: "https://github.com/JPosda14" },
      ];
      for (const link of external) {
        const anchor = contact.getByRole("link", { name: new RegExp(link.name) });
        await expect(anchor).toHaveAttribute("href", link.href);
        await expect(anchor).toHaveAttribute("target", "_blank");
        await expect(anchor).toHaveAttribute("rel", /noopener/);
        await expect(anchor).toHaveAccessibleName(new RegExp(h.newTab));
      }
      await expect(contact).toContainText(h.languages);
    });

    test(`"${h.nav}" in the header leads to the contact cell`, async ({ page }) => {
      await page.goto(h.path);
      await page.getByRole("banner").getByRole("link", { name: h.nav, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${h.anchor}$`));
      await expect(cell(page, "contact")).toHaveAttribute("id", h.anchor.slice(1));
      await expect(cell(page, "contact")).toBeInViewport();
    });

    test("there is no form and no phone link", async ({ page }) => {
      await page.goto(h.path);
      await expect(page.locator("form")).toHaveCount(0);
      await expect(page.locator('a[href^="tel:"], a[href*="wa.me"]')).toHaveCount(0);
    });
  });
}
