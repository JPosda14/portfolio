# Portfolio — Juan Andrés Posada

Personal site of a full-stack software engineer with an AI focus. Bilingual (English at `/`, Spanish at `/es/`), static, and built with Spec-Driven Development: every feature starts as a spec with testable requirements before any code is written.

> Status: work in progress. Spec 001 (site foundation) is done; the bento sections arrive in specs 002–006. See [`docs/implementation-plan.md`](docs/implementation-plan.md).

## Run it

Requirements: Node 24+ and npm.

```bash
npm install
npx playwright install chromium   # first time only, for the tests
npm run dev                       # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Type-check, then build the static site into `dist/` |
| `npm run preview` | Serve the built site |
| `npm run check` | `astro check` + unit tests (`node --test`) |
| `npm test` | Playwright end-to-end tests (desktop and mobile) against the production build, including axe accessibility checks |
| `npm run lhci` | Build and run Lighthouse CI (fails below 95 in any category) |

## Technical decisions

Full reasoning lives in [`docs/trd.md`](docs/trd.md) and each spec's `plan.md`; the short version:

- **Astro, static output, zero client JavaScript by default.** The only script is a tiny inline one that applies the saved theme before the first paint. Performance is part of the pitch. *Rejected:* Next.js static export, which ships the React runtime even with no interactivity.
- **Hand-written CSS with design tokens** (`light-dark()`, custom properties, CSS Grid). *Rejected:* Tailwind — fine, but plain CSS shows the craft and needs no dependency.
- **Native Astro i18n, every page declares its alternates.** hreflang, the language switch and the sitemap come from one source and keep working with translated slugs (`/projects/x` ↔ `/es/proyectos/x`). No automatic redirects by browser language.
- **Typed interface strings.** Spanish is checked against the English keys, so a missing translation fails `astro check`.
- **Content honesty enforced by the build.** Missing content is marked `[PENDIENTE]`; a build integration fails if any generated page still contains it.
- **Self-hosted fonts** (Playfair Display, Geist, JetBrains Mono) through the Astro Fonts API — no third-party requests.
- **Dark by default for everyone**, with a remembered light option. Browsers report "light" whenever the OS is not in dark mode, so following the system would hide the primary design from most visitors.

## Project structure

```
docs/                 product and design documents (PRD, TRD, DESIGN.md, constitution…)
specs/NNN-name/       spec.md (EARS requirements) → plan.md → tasks.md
integrations/         build integrations (pending-content guard)
src/content/ui/       interface texts, en.ts (source of keys) and es.ts
src/i18n/             locale helpers
src/layouts/          BaseLayout: head, SEO, hreflang, header and footer
src/components/       one component per UI piece
src/styles/           tokens.css and global.css
tests/unit/           node --test
tests/e2e/            Playwright + axe
```

## How it is built

The workflow (research → product docs → design system → spec → plan → tasks → implementation with tests first → validation) is documented in [`AGENTS.md`](AGENTS.md) and [`docs/constitution.md`](docs/constitution.md). AI agents help write the code; every change is reviewed, tested and approved by me.

Documentation is in Spanish; code, commits and this README are in English.
