# Portfolio — Juan Andrés Posada

Personal site of a full-stack software engineer with an AI focus. Bilingual (English at `/`, Spanish at `/es/`), static, and built with Spec-Driven Development: every feature starts as a spec with testable requirements before any code is written.

> Status: content complete, ready to deploy. Specs 001–006 are built (foundation, hero, projects and case studies, experience and skills, how I think / "Now" / contact, privacy and share previews). Some case-study content is still marked `[PENDIENTE]`, so the release build is intentionally blocked. See [`docs/implementation-plan.md`](docs/implementation-plan.md).

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

## Deploy

Live at <https://portfolio.juanposada.workers.dev>, on Cloudflare Workers with static assets (no Worker code). Every push to `main` triggers Workers Builds: build `npm run build` (the release build, with all guards), deploy `npx wrangler deploy` ([`wrangler.jsonc`](wrangler.jsonc)). Security and cache headers live in [`public/_headers`](public/_headers); its CSP allows only the inline theme script by hash, and `headers.spec` fails if that script changes without updating the hash. The site address lives only in [`site.mjs`](site.mjs).

## Share images (Open Graph)

Every indexable page has a 1200 × 630 share image in `public/og/` (`home-<lang>.png`, `<slug>-<lang>.png`). After changing a title, role or summary, regenerate them:

```
node scripts/make-og.mjs
```

It builds the site once to get the self-hosted fonts, renders a template per page with Playwright's Chromium and compresses it with sharp. The build fails if an indexable page has no share image.

## Update the "Now" cell

Edit `now.text` and `now.updated` (`YYYY-MM-DD`) in `src/content/home/en.ts` and `es.ts`. The site is static, so the date is checked at build time: on the first build more than 90 days after `updated`, the cell disappears and the photo takes its place. An invalid date fails the build. The e2e test for the cell also starts failing after 90 days, as a reminder to refresh it.

## Technical decisions

Full reasoning lives in [`docs/trd.md`](docs/trd.md) and each spec's `plan.md`; the short version:

- **Astro, static output, zero client JavaScript by default.** The only script is a tiny inline one that applies the saved theme before the first paint. Performance is part of the pitch. *Rejected:* Next.js static export, which ships the React runtime even with no interactivity.
- **Hand-written CSS with design tokens** (`light-dark()`, custom properties, CSS Grid). *Rejected:* Tailwind — fine, but plain CSS shows the craft and needs no dependency.
- **Native Astro i18n, every page declares its alternates.** hreflang, the language switch and the sitemap come from one source and keep working with translated slugs (`/projects/x` ↔ `/es/proyectos/x`). No automatic redirects by browser language.
- **Typed content.** Interface strings in Spanish are checked against the English keys, and projects are validated by a strict Zod schema, so missing content fails the build instead of shipping.
- **Content honesty enforced by the build.** Missing content is marked `[PENDIENTE]`; a build integration blocks the release build while any page contains it, and it also blocks phone numbers and broken internal links.
- **Case studies in Markdown, not MDX.** Structured fields (problem, action, result, decisions with the discarded alternative) live in the frontmatter; MDX would add a dependency without a need for components in the text.
- **Bento layouts as data.** `projectAreas(n)` returns the grid areas for 2–5 projects; unit tests check every layout has rectangular areas, no holes and the right reading order.
- **Contact without a form or copy button**: a `mailto` link, Cal.com, the CV and profiles. No backend, no personal data stored, no extra JavaScript.
- **No client-side analytics.** The privacy page stays simple and there are zero third-party requests; the host's server-side traffic stats are enough to start.
- **Share images generated from the site itself** (same fonts and colors) instead of a runtime image service or a new dependency.
- **Scroll-driven entrance in CSS only** (`animation-timeline: view()`), never on the hero, and off with reduced motion.
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
