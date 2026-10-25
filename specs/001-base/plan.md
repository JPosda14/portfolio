# Plan — 001-base

APIs verificadas con Context7 (docs de Astro, oct 2026): `i18n.routing.prefixDefaultLocale`, `getRelativeLocaleUrl` (`astro:i18n`), `fonts` estable desde v6 con `fontProviders.fontsource()` y `<Font>` de `astro:assets`, opción `i18n` de `@astrojs/sitemap`.

## Archivos a crear o cambiar
```
package.json, package-lock.json, astro.config.mjs, tsconfig.json
playwright.config.ts, lighthouserc.json
integrations/pending-guard.mjs        # integración: falla el build si hay [PENDIENTE]
src/content/ui/en.ts, es.ts           # textos de interfaz (es: tipado contra en)
src/i18n/index.ts                     # tipo Locale, getUi(locale), helpers de rutas
src/styles/tokens.css                 # tokens de DESIGN.md con light-dark()
src/styles/global.css                 # reset, base tipográfica, foco, reduced-motion
src/layouts/BaseLayout.astro          # <head>: meta, canónica, hreflang, fuentes, script de tema
src/components/SkipLink.astro, SiteHeader.astro, LanguageSwitch.astro,
               ThemeToggle.astro, SiteFooter.astro
src/pages/index.astro, src/pages/es/index.astro, src/pages/404.astro
public/favicon.svg, public/robots.txt
tests/unit/pending-guard.test.mjs
tests/e2e/i18n.spec.ts, theme.spec.ts, a11y.spec.ts, quality.spec.ts
README.md                             # cómo correr, decisiones técnicas (enlaza a docs/)
```

Dependencias (versiones exactas al instalar, fijadas en el lockfile):
`astro`, `@astrojs/sitemap`, `@astrojs/check`, `typescript` · dev: `@playwright/test`, `@axe-core/playwright`, `@lhci/cli`.
MDX no se instala aún: llega con la spec 003.

Scripts:
- `dev` → `astro dev`
- `build` → `astro check && astro build`
- `preview` → `astro preview`
- `check` → `astro check && node --test tests/unit`
- `test` → `playwright test` (levanta `build` + `preview`)
- `lhci` → `lhci autorun` sobre `dist/`

## Decisiones
1. **i18n nativo de Astro** con `defaultLocale: "en"`, `locales: ["en", "es"]`, `prefixDefaultLocale: false`, sin `redirectToDefaultLocale`. Cubre RF1 y RF4. *Descartado:* rutas manuales con `[lang]`, más código sin ganar nada.
2. **Cada página declara sus alternativas** (`{ en: "/", es: "/es/" }`) y el layout genera hreflang, `x-default` y el destino del selector a partir de eso (RF2, RF3). Así funciona con slugs traducidos (`/projects/x` ↔ `/es/proyectos/x`). *Descartado:* derivar la ruta del otro idioma quitando o poniendo el prefijo, que se rompe con slugs traducidos.
3. **Textos de interfaz como módulos TypeScript**: `en.ts` es la fuente y `es.ts` se declara con `satisfies UiStrings` (tipo derivado de `en`). Una clave faltante es un error de tipos y `astro check` (dentro de `build`) falla con el nombre de la clave (RF5, RF6). *Descartado:* JSON con validación propia (más código) y content collections con Zod para cadenas sueltas (exceso de estructura para la interfaz; sí se usarán para proyectos).
4. **Tema con `light-dark()` y `color-scheme`**: oscuro para todos por defecto (sin mirar `prefers-color-scheme`, cambio de RF10 aprobado en T7); `data-theme="light"` en `<html>` activa el claro (RF10). Un único script `is:inline` en `<head>`:
   - lee `localStorage` y pone `data-theme` antes de pintar (RF12);
   - añade la clase `js` a `<html>` para mostrar el botón, que sin JS está oculto (RF13);
   - escucha clics por delegación en `document` para alternar y guardar (RF11).
   *Descartado:* componente con hidratación (envía framework al cliente) y cookie (no hay servidor).
5. **Fuentes con la Fonts API estable** y `fontProviders.fontsource()`: Playfair Display (400, 500, 400 itálica), Geist (400, 600) y JetBrains Mono (500, 600), solo subconjunto latino y WOFF2. Astro las descarga en build y las sirve desde el propio sitio (RF15). Se precargan solo Geist 400 y Playfair 400. *Descartado:* Google Fonts en tiempo de ejecución (terceros, peor LCP) y archivos manuales en `public/` (sin optimización ni fallbacks métricos).
6. **Guarda de `[PENDIENTE]` como integración** en el hook `astro:build:done`: recorre el HTML generado y, si encuentra el marcador, falla con la lista de páginas (RF20). Cubre cualquier origen del texto (TS, MDX, componentes) con una sola regla. En desarrollo el marcador se muestra resaltado con un helper de texto que lo envuelve en `<mark class="pending">`. *Descartado:* revisar cada archivo fuente con regex (no ve el texto final y se salta orígenes).
7. **SEO**: `site: "https://juanposada.dev"` en la config; el layout pone `<title>`, `description` y `canonical` por idioma desde los textos (RF17); `@astrojs/sitemap` con `i18n: { defaultLocale: "en", locales: { en: "en", es: "es" } }` (RF18). *Riesgo:* con slugs traducidos el sitemap no empareja páginas automáticamente; para 001 solo hay home. Se resuelve en 003 con `serialize`.
8. **404 bilingüe única** en la raíz, con texto en ambos idiomas y enlaces a `/` y `/es/` (RF19). *Descartado:* 404 por idioma (el hosting estático sirve una sola por defecto).
9. **Anclas vacías** `#projects`/`#proyectos`, `#experience`/`#experiencia`, `#contact`/`#contacto` en la home; los ids salen de los textos de cada idioma (decisión 2 de la spec).
10. **Pruebas**: Playwright con dos proyectos (Chromium escritorio 1280 px y Pixel 7) contra `astro preview`; axe en cada ruta y tema; Lighthouse CI con `staticDistDir: dist`, 3 ejecuciones, umbral 0.95 en las 4 categorías. Pruebas unitarias con `node --test` (sin dependencia extra) para la guarda. *Descartado:* Vitest, innecesario mientras la única lógica sea la guarda.

## Estrategia de tests
| Test | Cubre |
| --- | --- |
| `i18n.spec`: `/` tiene `lang="en"`, `/es/` `lang="es"`, textos distintos | RF1, RF5 |
| `i18n.spec`: hreflang `en`/`es`/`x-default` y canónica correctos en ambas | RF2, RF17 |
| `i18n.spec`: clic en el selector lleva a la otra home | RF3 |
| `i18n.spec`: con `Accept-Language: es`, `/` sigue en inglés | RF4 |
| `theme.spec`: sin elección → oscuro, también con `prefers-color-scheme: light` | RF10 |
| `theme.spec`: clic en el botón alterna, recarga y se mantiene; `data-theme` presente antes del primer pintado | RF11, RF12 |
| `theme.spec`: con JavaScript desactivado, carga completa en oscuro y el botón no se muestra | RF13 |
| `a11y.spec`: axe sin infracciones en `/`, `/es/` y 404, temas claro y oscuro | RF14 (contraste), RF23 |
| `a11y.spec`: primer Tab enfoca "saltar al contenido"; foco visible en controles | RF9, RF14 |
| `a11y.spec`: con `reduced-motion`, ninguna animación ni transición activa | RF16 |
| `quality.spec`: encabezado y pie con todos sus elementos en ambas páginas | RF7, RF8 |
| `quality.spec`: ningún `<script src>` y un solo script inline | RF21 |
| `quality.spec`: ninguna petición a dominios externos (fuentes incluidas) | RF15 |
| `quality.spec`: ruta inexistente → 404 con enlaces a ambas homes; `sitemap-index.xml` existe | RF18, RF19 |
| `pending-guard.test`: HTML con `[PENDIENTE]` → error con la ruta; sin él → OK | RF20 |
| `astro check` (en `build`): clave faltante en `es.ts` falla | RF6 (verificación manual en validación) |
| Lighthouse CI ≥ 0.95 × 4 en `/` y `/es/` | RF22 |
| Revisión visual en navegador (1280/768/375, claro/oscuro) | RF14 |

## Riesgos
- **Astro 7 es reciente**: si alguna API difiere de lo verificado, se consulta Context7 de nuevo antes de improvisar.
- **Fontsource** debe tener Geist y las variantes pedidas; si no, se usa `fontProviders.local()` con WOFF2 descargados (misma API).
- **Ruido de axe**: con la home casi vacía hay poco que medir; las specs siguientes repiten la prueba con contenido real.
- **Dominio no registrado**: `site` apunta a `juanposada.dev`; si cambia, es una línea en la config.
- **Windows**: los navegadores de Playwright se instalan con `npx playwright install chromium` (unos 150 MB).
