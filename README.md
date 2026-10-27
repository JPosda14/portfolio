# Portfolio — Juan Andrés Posada

Personal site of a full-stack software engineer with an AI focus. Bilingual (English at `/`, Spanish at `/es/`), static, and built with Spec-Driven Development: every feature starts as a spec with testable requirements before any code is written.

> Status: work in progress. Specs 001 (foundation), 002 (hero) and 003 (projects and case studies) are built; experience, skills, contact and polish arrive in specs 004–006. Some case-study content is still marked `[PENDIENTE]`, so the release build is intentionally blocked. See [`docs/implementation-plan.md`](docs/implementation-plan.md).

## Run it

Requirements: Node 24+ and npm.

```bash
npm install
npx playwright install chromium   # first time only, for the tests
npm run dev                       # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server (pending content is highlighted) |
| `npm run build` | **Release build**: type-check, then build `dist/`. Fails on `[PENDIENTE]`, phone numbers or broken internal links |
| `npm run build:test` | Test build: same, but lets `[PENDIENTE]` through with a warning. Never deploy its output |
| `npm run preview` | Serve the built site |
| `npm run check` | `astro check` + unit tests (`node --test`) |
| `npm test` | Playwright end-to-end tests (desktop and mobile) against the test build, including axe accessibility checks |
| `npm run lhci` | Test build + Lighthouse CI on the homes and case pages (fails below 95 in any category) |

## Add or edit a project

Each project is one Markdown file per language, with the same file name (the slug):

```
src/content/projects/en/<slug>.md      → /projects/<slug>/
src/content/projects/es/<slug>.md      → /es/proyectos/<slug>/
src/content/projects/images/<slug>/    → cover and gallery images
```

1. Copy an existing pair (for example `colchones-posada.md`) and rename both files.
2. Fill the frontmatter: `title`, `summary`, `year`, `kind` (`personal` · `family` · `academic` · `client` · `company`), `role`, `team`, `stack`, `problem`, `action`, `result`, at least one entry in `decisions` (`decision`, `alternative`, `reason`), `cover`, optional `gallery`, `links` (`live`, `repo`, `repoLabel`), `code` (`public` · `private`), `order` and `featured`. The schema is in [`src/content.config.ts`](src/content.config.ts); a missing or misspelled field fails the build and names the file.
3. Optional: write a longer story as Markdown below the frontmatter; it appears on the case page.
4. Images: plain screenshots **without browser chrome** (the site draws the frame), PNG/JPG/WebP, ideally 1600 × 1000 and under 300 KB. They are converted to AVIF/WebP at build time. Until you have real ones, `node scripts/make-placeholders.mjs` generates labelled samples.
5. Anything still unknown goes as `[PENDIENTE] …`. It is highlighted in development and blocks `npm run build` until replaced.
6. Run `npm run check && npm test`.

Rules enforced at build time: every project must exist in both languages, and there must be between 2 and 5 featured projects (the bento layout supports exactly that range).

## Technical decisions

Full reasoning lives in [`docs/trd.md`](docs/trd.md) and each spec's `plan.md`; the short version:

- **Astro, static output, zero client JavaScript by default.** The only script is a tiny inline one that applies the saved theme before the first paint. Performance is part of the pitch. *Rejected:* Next.js static export, which ships the React runtime even with no interactivity.
- **Hand-written CSS with design tokens** (`light-dark()`, custom properties, CSS Grid). *Rejected:* Tailwind — fine, but plain CSS shows the craft and needs no dependency.
- **Native Astro i18n, every page declares its alternates.** hreflang, the language switch and the sitemap come from one source and keep working with translated slugs (`/projects/x` ↔ `/es/proyectos/x`). No automatic redirects by browser language.
- **Typed content.** Interface strings in Spanish are checked against the English keys, and projects are validated by a strict Zod schema, so missing content fails the build instead of shipping.
- **Content honesty enforced by the build.** Missing content is marked `[PENDIENTE]`; a build integration blocks the release build while any page contains it, and it also blocks phone numbers and broken internal links.
- **Case studies in Markdown, not MDX.** Structured fields (problem, action, result, decisions with the discarded alternative) live in the frontmatter; MDX would add a dependency without a need for components in the text.
- **Bento layouts as data.** `projectAreas(n)` returns the grid areas for 2–5 projects; unit tests check every layout has rectangular areas, no holes and the right reading order.
- **CSS-only view transitions** between a project card and its case page, disabled for reduced motion.
- **Self-hosted fonts** (Playfair Display, Geist, JetBrains Mono) through the Astro Fonts API — no third-party requests.
- **Dark by default for everyone**, with a remembered light option. Browsers report "light" whenever the OS is not in dark mode, so following the system would hide the primary design from most visitors.

## Project structure

```
docs/                    product and design documents (PRD, TRD, DESIGN.md, constitution…)
specs/NNN-name/          spec.md (EARS requirements) → plan.md → tasks.md
integrations/            build guards: pending content and phone numbers, broken internal links
scripts/                 test build and sample screenshots
src/content.config.ts    projects collection schema
src/content/             interface texts (ui/), home texts (home/), projects (projects/), public links
src/i18n/                locale helpers
src/lib/                 project rules, layouts and loading
src/layouts/             BaseLayout: head, SEO, hreflang, header and footer
src/components/          one component per UI piece (bento cells in bento/)
src/pages/               routes: homes, case pages, 404
src/styles/              tokens.css and global.css
tests/unit/              node --test
tests/e2e/               Playwright + axe
```

## How it is built

The workflow (research → product docs → design system → spec → plan → tasks → implementation with tests first → validation) is documented in [`AGENTS.md`](AGENTS.md) and [`docs/constitution.md`](docs/constitution.md). AI agents help write the code; every change is reviewed, tested and approved by me.

Documentation is in Spanish; code, commits and this README are in English.
