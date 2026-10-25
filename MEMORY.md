# MEMORY.md — Portafolio

## Estado actual
- Fase 0 (investigación + entrevista) y Fase 1 (documentos) aprobadas.
- Fase 2 (arnés) completa: AGENTS.md, skill `sdd`, comandos `/sdd-*`, Context7 en `.mcp.json` (proyecto, sin key).
- Fase 3 aprobada y en commit (docs/DESIGN.md). Referencias de Pinterest solo locales (.gitignore). Commits sin push desde f50986c.
- Fase 4: 001-base aprobada (spec, plan, tareas). T1 hecha: Astro 7.4.2, @astrojs/sitemap 3.7.4, @astrojs/check 0.9.12, TypeScript 6.0.3; dev: Playwright, axe, @lhci/cli (versiones exactas en package.json).
- T2 hecha: Playwright (desktop 1280 + Pixel 7) contra build+preview en :4321; Lighthouse CI sobre dist/ (3 runs, umbral 0.95). Línea base: perf 1, a11y 1, bp 0.96, seo 0.91 (falta meta description → T6; error de consola, probable /favicon.ico 404 → enlazar favicon en T6).
- T3 hecha: integración `integrations/pending-guard.mjs` (falla el build si el HTML tiene [PENDIENTE]) + `src/lib/pending.ts` y `<Text value>` para resaltarlo en desarrollo. Todo texto de contenido debe pasar por `<Text>`. En Windows, tras el error del build Node imprime un assert de libuv: es ruido, el bloqueo funciona.
- T4 hecha: textos en `src/content/ui/{en,es}.ts` (`es` usa `satisfies UiStrings`, falta de clave = error de `astro check` con su nombre) y `src/i18n/index.ts` (locales, getUi, Alternates). Imports entre .ts con extensión `.ts` explícita para que `node --test` pueda importarlos.
- T5 hecha: `src/styles/tokens.css` (light-dark + color-scheme; data-theme fuerza tema), `global.css`, Fonts API con fontsource (Geist sí existe; 8 WOFF2 ~13–22 KB) vía `<Fonts />`. Playwright usa el puerto 4322 para no reutilizar `astro dev` (4321) y probar siempre el build.
- T6 hecha: `BaseLayout.astro` (title, description, canónica, hreflang + x-default desde `alternates`, favicon, fuentes) y `HomePage.astro` compartida por `/` y `/es/` con anclas vacías. Lighthouse: 100 en las 4 categorías en ambas homes.
- T7 hecha: `ThemeScript.astro` (único JS, inline en head; añade clase `js`, aplica `data-theme="light"` guardado, delegación de clic) y `ThemeToggle.astro` (oculto sin JS). 
- T8 hecha: SkipLink, SiteHeader (logo, nav a anclas, LanguageSwitch, ThemeToggle; en < 640 px la nav baja a una segunda fila), SiteFooter (año + repo; privacidad en 006). Body en grid de 3 filas para que el pie quede abajo. El enlace del selector tiene texto oculto "Ver en español: ES" para que el nombre accesible contenga lo visible.
- T9 hecha: `404.astro` bilingüe (dos tarjetas EN/ES, `noindex`, fuera del sitemap); `BaseLayout` acepta `noindex`. Tests: un solo script inline, ningún `<script src>`, cero peticiones a otros dominios en `/`, `/es/` y 404. En Playwright, leer el contenido de un `<script>` con `textContent` (no `toHaveText`). Siguiente: T10.
- `npm audit`: 0 vulnerabilidades en producción; 16 en dev, todas vía @lhci/cli (no se publica). Revisar al actualizar lhci.
- Navegador de pruebas: el integrado de la app (sin Playwright MCP); Playwright solo como dependencia de tests.
- Repo público: https://github.com/JPosda14/portfolio (rama main).

## Decisiones (y por qué)
- Astro 7 + CSS propio: cero JS y señal técnica de CSS (docs/research/03).
- `/` en inglés, `/es` en español: el reclutador no pierde un clic eligiendo idioma.
- Cloudflare + `juanposada.dev`: gratis y permite anunciar servicios (Vercel Hobby no).
- Contacto sin formulario (mailto + Cal.com): sin backend ni obligaciones de la Ley 1581.
- Sin cifra clave en el hero hasta tener más proyectos o métricas reales.
- Estructura primero con datos del CV y `[PENDIENTE]`; contenido real de cada caso después.
- Investigación con búsqueda integrada y subagentes, uno por tema: Perplexity es de pago.
- La guía personal de workflow queda fuera del repo público (.gitignore).
- Tema: oscuro para todos por defecto, sin mirar la preferencia del sistema (Juan, en T7): los navegadores reportan "claro" si el sistema no está en oscuro y la mayoría vería la versión clara. El claro solo con el botón.
- Diseño: Playfair Display + Geist (no Inter) + JetBrains Mono, azul #0047FF, oscuro por defecto; etiquetas mono "telemetría" solo con datos reales; hover sin glow.

## Aprendizajes de Stitch
- Stitch inventa contenido (proyectos, cifras, foto, correo): tomar solo el estilo.

## Aprendizajes y errores a evitar
- Lanzar varios subagentes de investigación a la vez no le gustó a Juan: un tema por vez y revisar.
- Una corrección masiva con PowerShell 5.1 corrompió tildes (lee sin BOM como ANSI); se reparó. Editar archivos solo con las herramientas de archivo.
- `node --test` necesita un glob (`tests/unit/**/*.test.mjs`), no una carpeta.

## Próximos pasos
- 001-base: T2 a T10, luego /sdd-validate 001-base.
- Pendiente de decidir: analítica (Cloudflare vs Umami).
