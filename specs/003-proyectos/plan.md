# Plan — 003-proyectos

APIs verificadas con Context7 (docs de Astro, oct 2026): `defineCollection` + `glob()` de `astro/loaders` en `src/content.config.ts`, `z` de `astro/zod`, helper `image()` en el esquema, `getCollection` / `render`; `serialize(item)` de `@astrojs/sitemap` con `item.links` (`LinkItem: { url, lang }`). La API programática `build()` de Astro es experimental, así que no se usa.

## Archivos a crear o cambiar
```
src/content.config.ts                         # colección "projects" con esquema Zod
src/content/projects/en/colchones-posada.md   # un archivo por proyecto e idioma
src/content/projects/es/colchones-posada.md
src/content/projects/en/university-capstone.md
src/content/projects/es/university-capstone.md
src/content/projects/images/<slug>/*.png      # capturas de ejemplo (generadas)
scripts/make-placeholders.mjs                 # genera las capturas de ejemplo con sharp
scripts/build-test.mjs                        # compilación de prueba (permite [PENDIENTE])
src/lib/projects.ts                           # getProjects(locale), checkProjectSet(), projectAreas(), rutas
src/content/ui/{en,es}.ts                     # + textos de proyectos y casos
src/components/bento/ProjectCard.astro
src/components/ProjectsSection.astro          # sección #projects con su propia cuadrícula
src/components/CasePage.astro                 # página de caso compartida por ambos idiomas
src/pages/projects/[slug].astro
src/pages/es/proyectos/[slug].astro
src/components/HomePage.astro                 # + ProjectsSection
src/styles/global.css                         # + @view-transition
integrations/pending-guard.mjs                # opción allowPending
astro.config.mjs                              # guarda configurable + serialize del sitemap
playwright.config.ts, lighthouserc.json, package.json
tests/unit/projects.test.mjs
tests/e2e/projects.spec.ts
```
Sin dependencias nuevas: Markdown es nativo en Astro y `sharp` ya está instalado.

## Decisiones
1. **Markdown (`.md`) en lugar de MDX.** Todo lo estructurado (P/A/R, decisiones, imágenes, enlaces) va en el frontmatter, validado con Zod; el cuerpo Markdown es opcional para "la historia completa". *Descartado:* MDX (`@astrojs/mdx`): no necesitamos componentes dentro del texto y sería otra dependencia.
2. **Colección `projects`** con `glob({ pattern: "**/*.md", base: "./src/content/projects" })`; el `id` es `en/colchones-posada`, de donde salen idioma y slug. Esquema con: `title`, `summary`, `year`, `kind` (enum), `role`, `team`, `stack[]`, `problem`, `action`, `result`, `decisions[] { decision, alternative, reason }`, `cover { src: image(), alt }`, `gallery[] { src: image(), alt }`, `links { live?, repo?, repoLabel? }`, `code` (`public` | `private`), `order`, `featured`. Zod falla la compilación con archivo y campo (RF1, RF2).
3. **`checkProjectSet(entries)`** (función pura en `src/lib/projects.ts`) lanza un error si un slug no existe en ambos idiomas o si hay menos de 2 o más de 5 destacados; se llama al cargar la colección (RF3, RF4). *Descartado:* validarlo en el esquema (Zod valida archivo por archivo, no el conjunto).
4. **Sección propia para proyectos**: `<section id="projects" | "proyectos">` con un `h2` oculto y su propia cuadrícula de 4 / 2 / 1 columnas con el mismo gap, para que se vea como continuación del bento. Así el ancla tiene caja y desplaza bien (RF8). *Descartado:* meter las tarjetas en la cuadrícula del hero con `display: contents` (el ancla no tendría caja a la que desplazarse).
5. **Distribución para 2–5 proyectos**: `projectAreas(count)` devuelve las filas de `grid-template-areas` para escritorio, tablet y móvil, y la sección las aplica como variables CSS (`--areas-desktop`…). Escritorio: 2 → `p1 p1 p2 p2`; 3 → p1 2 × 2 + p2 y p3 2 × 1; 4 → p1 2 × 2 + p2 2 × 1 + p3, p4 1 × 1; 5 → p1 2 × 2 + cuatro 1 × 1. Tablet: dos columnas con p1 a todo el ancho; móvil: una columna. Una prueba unitaria verifica para cada cantidad que todas las áreas son rectángulos, que no hay huecos y que se respeta el orden (RF6). *Descartado:* `grid-auto-flow: dense` (rompe el orden de lectura).
6. **Tarjeta = enlace completo**: `<article>` con un `<a>` en el título cuyo área de clic cubre la tarjeta (`::after` absoluto), para no anidar enlaces y que el lector de pantalla lea un nombre corto ("Colchones Posada"). La tarjeta usa `Cell` con etiqueta real (`SYS_01 // FAMILY BUSINESS`, `SYS_02 // ACADEMIC`) y meta "LIVE" solo si hay sitio en vivo (RF5, RF7).
7. **Página de caso**: `src/pages/projects/[slug].astro` y `src/pages/es/proyectos/[slug].astro` con `getStaticPaths` filtrado por idioma; ambas renderizan `CasePage.astro` con `alternates = { en: /projects/<slug>/, es: /es/proyectos/<slug>/ }` (RF9, RF10). Enlaces: sitio en vivo y repositorio si existen; "Código privado" si `code: private` (RF11). Siguiente proyecto por `order`, circular.
8. **Imágenes**: portada con `<Picture>` AVIF/WebP, `loading="eager"` en el caso (está arriba) y `lazy` en la tarjeta de la home salvo la primera; galería con `lazy`; `width`/`height` siempre; `fallbackFormat="webp"` (RF12).
9. **View Transitions entre documentos**: `@view-transition { navigation: auto; }` dentro de `@media (prefers-reduced-motion: no-preference)` en `global.css`; `view-transition-name: project-<slug>-shot` y `-title` en la tarjeta y en el caso. Sin JavaScript; los navegadores sin soporte navegan normal (RF13). *Descartado:* `<ClientRouter />` (envía JS).
10. **Sitemap con rutas traducidas**: `serialize(item)` reconoce `/projects/<slug>/` y `/es/proyectos/<slug>/` y escribe `item.links` con ambas versiones; la home sigue con la regla de `i18n` (RF14).
11. **Compilación de prueba (decisión 1 de la spec)**: `pendingGuard({ allowPending })` con `allowPending = process.env.ALLOW_PENDING === "1"`; `scripts/build-test.mjs` lanza `astro build` con esa variable (cross-platform, sin dependencias). `npm run build` no cambia. Playwright y `npm run lhci` usan `npm run build:test`. Un test unitario confirma que sin la opción la guarda sigue fallando (RF15). *Descartado:* `cross-env` (dependencia extra) y la API programática (experimental).
12. **Capturas de ejemplo**: `scripts/make-placeholders.mjs` genera con `sharp` PNG de 1600 × 1000 con marco de navegador, nombre del proyecto y "Captura de ejemplo / Example screenshot"; se versionan (unos pocos KB tras optimizar). Su `alt` lleva `[PENDIENTE]` (RF15).

## Estrategia de tests
| Test | Cubre |
| --- | --- |
| `projects.test`: esquema rechaza un proyecto sin `problem` (vía `astro check` manual en validación) y `checkProjectSet` detecta traducción faltante y < 2 / > 5 destacados | RF2, RF3, RF4 |
| `projects.test`: `projectAreas(n)` para n = 2…5 en los tres tamaños: áreas rectangulares, sin huecos, orden p1…pn | RF6 |
| `projects.test`: `pendingGuard()` sin opción falla y con `allowPending` no | RF15 |
| `projects.spec`: tarjetas en orden con etiqueta, captura, título, meta, P/A/R, chips y "Ver caso", EN y ES | RF1, RF5 |
| `projects.spec`: posiciones a 1280 / 768 / 375 px sin desborde | RF6 |
| `projects.spec`: clic en la tarjeta → caso en el mismo idioma; "Proyectos" y "Ver mi trabajo" → `#projects` / `#proyectos` | RF7, RF8 |
| `projects.spec`: caso con `lang`, título, descripción, canónica, hreflang y selector al otro idioma | RF9 |
| `projects.spec`: caso con volver, ficha, P/A/R, decisiones, galería, enlaces y siguiente proyecto | RF10, RF11 |
| `projects.spec`: imágenes AVIF/WebP con dimensiones; galería `lazy` | RF12 |
| `projects.spec`: `view-transition-name` igual en tarjeta y caso; regla `@view-transition` solo sin movimiento reducido | RF13 |
| `projects.spec`: sitemap con los 4 casos y sus `xhtml:link` | RF14 |
| `projects.spec`: en la compilación de prueba el `[PENDIENTE]` se ve resaltado | RF15 |
| `a11y.spec` ampliado a los casos + Lighthouse CI con un caso por idioma | RF16 |

## Riesgos
- **View Transitions entre documentos**: Firefox no las soporta; no rompe nada, solo no anima.
- **Sitemap**: si `@astrojs/sitemap` cambia `links`, el test del sitemap lo detecta.
- **Contenido de ejemplo largo**: si el texto real de P/A/R es largo, la tarjeta lo corta a 2 líneas con `line-clamp` y el caso muestra el texto completo.
- **Tamaño del repo**: las capturas reales deben subirse optimizadas (≤ 300 KB cada una); se documenta en el README.
- **Proyecto Nuclear**: los repositorios públicos no muestran commits de JPosda14; el rol exacto de Juan queda `[PENDIENTE]` hasta que lo confirme (no se afirma nada que el repositorio no respalde).
