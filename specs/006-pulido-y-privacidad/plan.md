# Plan — 006-pulido-y-privacidad

No hay dependencias nuevas. Las imágenes para compartir se generan con Playwright y sharp, que ya están instalados.

## Archivos a crear o cambiar
```
src/content/privacy/{en,es}.md           # texto de privacidad (Markdown) con fecha "updated"
src/pages/privacy.astro                  # /privacy/
src/pages/es/privacidad.astro            # /es/privacidad/
src/components/PrivacyPage.astro         # página compartida por ambos idiomas
src/components/SiteFooter.astro          # + enlace a privacidad del idioma actual
src/content/ui/{en,es}.ts                # + footer.privacy, privacy.*, meta de compartir
src/layouts/BaseLayout.astro             # + og:*, twitter:*, theme-color, prop `og` (imagen + tipo), slot para JSON-LD
src/lib/seo.ts                           # ogImagePath(page, locale), personJsonLd(locale) — puro, probado con node --test
src/components/HomePage.astro            # + JSON-LD Person; clase para la entrada suave
src/styles/global.css                    # + entrada suave con animation-timeline: view(), solo sin movimiento reducido
src/components/bento/PhotoCell.astro     # sizes="(max-width: 639px) 9rem, 12rem"
scripts/make-og.mjs                      # genera public/og/*.png (1200×630) desde una plantilla HTML con las fuentes del build
public/og/{home-en,home-es,<slug>-en,<slug>-es}.png
integrations/og-guard.mjs                # falla el build si una página indexable no tiene og:image o el archivo no existe
astro.config.mjs                         # + ogGuard; serialize del sitemap empareja /privacy/ ↔ /es/privacidad/
tests/unit/seo.test.mjs
tests/unit/og-guard.test.mjs
tests/e2e/privacy.spec.ts
tests/e2e/share.spec.ts                  # meta de compartir, JSON-LD, 404 sin og
tests/e2e/quality.spec.ts                # "un solo script" → un solo script ejecutable
tests/e2e/polish.spec.ts                 # animación solo sin movimiento reducido; foto 192 px en móvil
lighthouserc.json                        # + /privacy/
```

## Decisiones
1. **Privacidad en Markdown** (`src/content/privacy/{en,es}.md`, leído con `getEntry` o import directo) y no en strings TS: es texto largo y así se edita cómodo. Lleva una fecha `updated` que se muestra formateada. *Descartado:* escribirlo dentro de la página (mezcla contenido y código).
2. **Imágenes para compartir estáticas y versionadas** en `public/og/`. Las genera `scripts/make-og.mjs`:
   - lee del build el CSS de las fuentes y lo usa en una plantilla HTML de 1200 × 630 (fondo oscuro, nombre o título en Playfair, rol o resumen en Geist, etiqueta mono, acento azul);
   - toma la captura con el Chromium de Playwright y la optimiza con sharp;
   - se vuelve a correr solo cuando cambia el contenido.

   *Descartado:* Satori o `@vercel/og`, porque son dependencias nuevas. También sharp con SVG, porque no usa las fuentes del sitio.
3. **Guarda de build** (`og-guard`), con el mismo patrón que `link-guard`:
   - recorre `dist`;
   - en cada HTML sin `noindex`, exige `og:image`;
   - comprueba que el archivo exista en `dist` (RF6).
4. **Meta en `BaseLayout`**:
   - `og:title`, `og:description`, `og:url` (canónica), `og:image` (absoluta, con ancho, alto y `alt`), `og:locale` y `og:locale:alternate`, `og:type` (`website` en homes y privacidad, `article` en casos), `og:site_name`, `twitter:card`;
   - `theme-color` con el fondo oscuro;
   - con `noindex` no se emite nada de esto (RF8).
5. **JSON-LD `Person`** generado por `personJsonLd(locale)` desde `links.ts` y los textos del hero, y serializado con `JSON.stringify` (RF7). *Descartado:* escribirlo a mano en la plantilla, porque se desincroniza.
6. **Entrada suave solo con CSS**:
   - `@supports (animation-timeline: view())` y `prefers-reduced-motion: no-preference`;
   - las celdas fuera del primer bloque animan opacidad 0 → 1 y `translateY(8px)` → 0 con `animation-range: entry 0% entry 40%`;
   - los navegadores sin soporte muestran todo sin animar (RF9).

   *Descartado:* `IntersectionObserver`, porque es JavaScript.
7. **Tests de accesibilidad con movimiento reducido** (`reducedMotion: "reduce"` en `a11y.spec`). Así axe mide el estado final, no colores a mitad de la animación. El estado animado lo cubre `polish.spec`.
8. **Sitemap**: la regex de `serialize` empareja también `/privacy/` ↔ `/es/privacidad/` (RF3).

## Estrategia de tests
| Test | Cubre |
| --- | --- |
| `privacy.spec`: contenido clave en EN/ES (sin cookies, sin formularios, Ley 1581, correo, fecha), selector de idioma y hreflang | RF1, RF3 |
| `privacy.spec`: el pie de home, caso, privacidad y 404 enlaza a la privacidad del idioma | RF2 |
| `quality.spec` (sitemap) / revisión de `sitemap-0.xml`: privacidad emparejada | RF3 |
| `share.spec`: meta de compartir en homes y 4 casos; la imagen responde 200 y mide 1200 × 630 | RF4, RF5 |
| `og-guard.test`: HTML indexable sin `og:image` o con archivo faltante → error con la página; `noindex` se ignora | RF6 |
| `seo.test` + `share.spec`: JSON-LD `Person` con nombre, rol, LinkedIn y GitHub | RF7 |
| `share.spec`: la 404 no tiene `og:*` | RF8 |
| `polish.spec`: con `reducedMotion: "reduce"` ninguna celda tiene animación; sin él, las celdas bajo el primer bloque tienen `animation-timeline` y el hero no | RF9 |
| `polish.spec`: en 375 px la foto carga el ancho de 192 | RF10 |
| `share.spec`: `theme-color` presente | RF11 |
| `quality.spec`: un solo script ejecutable y ninguna petición externa | RF12 |
| `a11y.spec` (+ privacidad) y Lighthouse (+ `/privacy/`) | RF13 |

## Riesgos
- **`animation-timeline: view()`** no está en todos los navegadores. Es una mejora progresiva: sin soporte no hay animación. Lighthouse no debería empeorar porque el hero no se anima.
- **Imágenes OG desactualizadas** si cambia un título y no se vuelve a correr el script. El README lo explica. La guarda solo comprueba que existan.
- **Caché de LinkedIn y WhatsApp**: guardan la vista previa vieja. Tras publicar se puede refrescar con el Post Inspector de LinkedIn.
- **Texto legal**: es una política sencilla para una persona natural, no asesoría legal.
