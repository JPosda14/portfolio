# Prompt para Stitch

Copia el bloque en Stitch (modo **Web**). Está en inglés porque Stitch responde mejor así; el contenido final será bilingüe.

## Antes de empezar: imágenes de referencia
Stitch acepta imágenes junto al prompt. Junta **3 a 5** (Pinterest, Dribbble, Behance, sitios que te gusten) y guárdalas también en `design/references/` para que yo las vea al escribir DESIGN.md.
- Busca por cosas como: `dark bento grid portfolio`, `developer portfolio dark UI`, `technical dashboard minimal`, `blueprint UI design`.
- Que cada imagen aporte algo distinto: una por **color**, una por **tipografía**, una por **forma de las tarjetas/bento**, una por **detalles** (iconos, etiquetas, bordes).
- Anota en una línea qué te gusta de cada una (lo pegas en el prompt, donde dice `REFERENCES`).
- Evita imágenes con mucho glow, gradientes morados o glassmorphism: Stitch las copiaría.
- Son inspiración: no copiamos el diseño ni la marca de nadie.

## Prompt 1 — Home (escritorio)
Adjunta las imágenes y reemplaza las líneas de `REFERENCES` con lo que te gusta de cada una (si no adjuntas imágenes, borra ese bloque).

```
REFERENCES (attached images): use them ONLY as style reference — color mood, typography feel, card shapes, spacing and details. Do not copy their content, logos or exact layout. The layout and content below always win.
- Image 1: I like <the color palette / the dark background tone>
- Image 2: I like <the typography>
- Image 3: I like <the bento card shapes and spacing>
- Image 4: I like <the small details: labels, icons, borders>

Design the home page of a personal portfolio for Juan Andrés Posada, a software engineer (full-stack, AI focus) looking for remote jobs and freelance clients. It is a personal landing page that sells the person, not a project gallery.

Style (blend it with the references): dark mode first, technical and precise. Think engineering tool / blueprint: thin 1px borders, monospace labels for metadata, generous spacing, strong typographic hierarchy, ONE accent color. Inspired by Apple and Microsoft bento grids: modular square and rectangular cards. Minimal motion (only subtle hover states).

Avoid: purple/indigo gradients, glassmorphism, glows, Inter font, three identical icon cards, the same drop shadow everywhere, emojis as icons, stock illustrations.

Layout: top header (name as logo "juan.posada", links Projects / Experience / Contact, language switch EN/ES, theme toggle). Then a 4-column bento grid, reading order left-to-right, top-to-bottom:
1. HERO (2x2): status line "Available · Remote · Armenia, CO (UTC-5)", name "Juan Andrés Posada", role "Full-stack Software Engineer with an AI focus", subtitle "I build fast web products and integrate AI to solve real business problems.", buttons: "See my work" (primary), "Download CV", "Book a call".
2. PHOTO + LOCATION (2x1): portrait placeholder, "Armenia, Quindío · Colombia", "Spanish (native) · English B1".
3. NOW (2x1): small dated note "Now · Oct 2026 — Applying AI-agent development (Claude Code + Spec-Driven Development) and building this portfolio."
4. PROJECT 01 (2x2): browser-frame screenshot placeholder, "Colchones Posada", "Family business · 2026 · End-to-end design and development", Problem / Action / Result lines, tech chips Next.js, TypeScript, Supabase, link "View case →".
5. PROJECT 02 (2x2): screenshot placeholder, "University Capstone Project", badge "Best capstone project of the semester", "Team · Scrum · 2025", Problem / Action / Result lines, chips React, Scrum, Architecture, link "View case →".
6. EXPERIENCE (2x1): timeline — "Web Developer · INSTALAAB SAS · 2025–2026" and "Full-Stack Developer · Mirus Smart Solutions · 2023–2025" with one line each; link "LinkedIn →".
7. HOW I THINK (2x1): 3 numbered steps — "Understand the problem before coding", "Specify and decide with alternatives", "Build with AI, verify myself".
8. SKILLS — DAILY (2x1): minimalist monochrome tech logos with names: Java, Spring Boot, Flutter, Python, TypeScript, Next.js, Supabase, Git; small line "Also worked with: React · AWS serverless". No progress bars or percentages.
9. LEARNING (1x1): AI agents · Claude Code, Spec-Driven Development, Astro.
10. BUSINESS SKILLS (1x1): Basic SEO, UX/UI, Process automation, Scrum, CI & testing — with thin line icons.
11. CONTACT (4x1, full width): "Let's build something together?", large email link, buttons LinkedIn, GitHub, CV (PDF), "Book a call" (primary).
Footer: copyright, Privacy, Source on GitHub.

Accessibility: WCAG AA contrast, visible focus states, touch targets at least 44px.
```

## Prompt 2 — Móvil
```
Create the mobile version (390px wide) of the same home page, keeping the same visual style taken from the references: single column, same reading order, keep the hero and its buttons visible without scrolling as much as possible.
```

## Prompt 3 — Modo claro
```
Create the light mode version of the same design, keeping the same accent color family and hierarchy, with AA contrast.
```

## Prompt 4 — Página de caso (opcional)
```
Design the project case study page for "Colchones Posada" in the same design system: back link, title, role and stack, sections Problem, Action, Result, Technical decisions (each with the discarded alternative), image/video gallery, links to live site and repository, and a "Next project" card.
```
