# Tareas — 001-base

Plan aprobado. Una tarea por vez con `/sdd-implement 001-base Tn`; tests primero cuando la tarea tiene comportamiento verificable.

- [x] **T1 Crear el proyecto Astro y los scripts** · base de todos los RF (habilita RF1 y RF18 a nivel de configuración)
  Instalar las dependencias del plan con versiones fijadas, `astro.config.mjs` (site, i18n, sitemap), `tsconfig` estricto, scripts `dev/build/preview/check/test/lhci`, `public/favicon.svg` y `robots.txt`.
  Hecho cuando: `npm run build` genera `dist/` con `/` y `/es/` (páginas mínimas) y `npm run check` pasa.

- [x] **T2 Montar la infraestructura de pruebas** · RF22, RF23 (infraestructura; los umbrales se cumplen en T6–T10)
  `playwright.config.ts` (escritorio y Pixel 7 contra `preview`), `lighthouserc.json` (umbral 0.95 × 4, `/` y `/es/`), instalar Chromium, un test humo.
  Hecho cuando: `npm test` corre el test humo en ambos proyectos y `npm run lhci` produce un informe.

- [ ] **T3 Guarda de `[PENDIENTE]`** · RF20
  Test unitario primero (`node --test`), luego la integración `astro:build:done` y el helper que resalta el marcador en desarrollo.
  Hecho cuando: el test pasa y añadir `[PENDIENTE]` temporalmente a la home hace fallar `npm run build` con la ruta de la página.

- [ ] **T4 Textos de interfaz y utilidades de idioma** · RF5, RF6
  `src/content/ui/en.ts` y `es.ts` (nav, pie, skip link, tema, idioma, meta, 404, ids de anclas), `src/i18n/index.ts`.
  Hecho cuando: borrar una clave de `es.ts` hace fallar `npm run check` con el nombre de la clave, y restaurarla lo deja en verde.

- [ ] **T5 Tokens y estilos globales** · RF14, RF16
  `tokens.css` con todos los tokens de `docs/DESIGN.md` en `light-dark()`, `global.css` (reset, base tipográfica, `:focus-visible`, reduced-motion), Fonts API con Playfair, Geist y JetBrains Mono.
  Hecho cuando: el build sirve las fuentes desde el propio sitio y una página de prueba muestra las 3 fuentes y ambos temas con los colores de DESIGN.md.

- [ ] **T6 Layout base con SEO e idiomas** · RF1, RF2, RF4, RF17, RF18
  Tests `i18n.spec` (lang, hreflang, x-default, canónica, sin redirección) primero; luego `BaseLayout.astro` con alternativas por página y las dos homes con anclas vacías.
  Hecho cuando: `i18n.spec` pasa en ambos proyectos y `dist/sitemap-index.xml` lista las dos homes con sus alternativas.

- [ ] **T7 Tema claro/oscuro** · RF10, RF11, RF12, RF13
  Tests `theme.spec` primero; luego el script inline y `ThemeToggle.astro`.
  Hecho cuando: `theme.spec` pasa (preferencia del sistema, alternar y recordar, sin destello, sin JS) en ambos proyectos.

- [ ] **T8 Encabezado, pie y saltar al contenido** · RF3, RF7, RF8, RF9
  Tests de `quality.spec` (elementos de encabezado y pie) y de `i18n.spec` (selector) primero; luego `SkipLink`, `SiteHeader`, `LanguageSwitch`, `SiteFooter`.
  Hecho cuando: los tests pasan y la revisión en navegador a 1280, 768 y 375 px coincide con DESIGN.md en ambos temas y ambos idiomas.

- [ ] **T9 Página 404 y controles de calidad** · RF15, RF19, RF21
  Tests primero (404 con enlaces a ambas homes, sin `<script src>` y un solo script inline, sin peticiones externas); luego `404.astro`.
  Hecho cuando: `quality.spec` pasa completo en ambos proyectos.

- [ ] **T10 Accesibilidad, README y cierre** · RF9, RF14, RF16, RF22, RF23
  `a11y.spec` (axe en todas las páginas y temas, primer Tab, reduced-motion); ajustes de contraste si falla; `README.md` con cómo correr el proyecto y sus decisiones técnicas.
  Hecho cuando: `npm run check && npm test` está en verde, `npm run lhci` ≥ 0.95 en las 4 categorías para `/` y `/es/`, y el README explica la instalación y enlaza a `docs/`.

Después: `/sdd-validate 001-base`.
