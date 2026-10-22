# 03 - Stack y rendimiento (investigación técnica)

Fecha de consulta: 2026-10-21. Versiones tomadas del registro npm (`registry.npmjs.org/<paquete>/latest`) el mismo día.

## 1. Frameworks: Astro vs Next.js (export) vs SvelteKit

Versiones estables actuales (npm latest):
- Astro **7.4.2** (Node >=22.23.4): https://registry.npmjs.org/astro/latest
- Next.js **16.4.2** (Node >=20.9): https://registry.npmjs.org/next/latest
- SvelteKit **3.1.0** (Node >=22.17), con Svelte **5.57.2**: https://registry.npmjs.org/@sveltejs/kit/latest , https://registry.npmjs.org/svelte/latest

| Criterio | Astro 7 | Next.js 16 (`output: 'export'`) | SvelteKit 3 (adapter-static) |
|---|---|---|---|
| JS por defecto | Cero (islas opt-in) | Runtime de React + payload RSC aunque la página sea estática | Runtime de Svelte, pequeño; hidratación desactivable por página (`csr = false`) |
| i18n nativo | Sí: `i18n` en config, `/es` `/en`, fallback, `getRelativeLocaleUrl` | El i18n integrado necesita servidor; en export se hace a mano con segmentos `[lang]` | No nativo; librería (p. ej. Paraglide) o segmentos `[lang]` |
| Content/MDX | Content collections con `glob()` + Zod + MDX oficial | MDX vía `@next/mdx`; sin colecciones tipadas oficiales | mdsvex (comunidad) o carga manual |
| Imágenes | `<Image/>`/`<Picture/>`, sharp, AVIF/WebP, `srcset` automático | `next/image` con loader por defecto NO soportado en export; requiere loader externo | `enhanced-img` (no verificado) |
| Video | Sin soporte nativo (docs recomiendan servicio externo); `<video>` HTML | Igual | Igual |
| View Transitions | Nativas CSS cross-document (0 JS) o `<ClientRouter/>` (JS) | Manual / experimental | `onNavigate` + API del navegador |
| DX | Muy alta para sitios de contenido | Alta, pero sobredimensionado aquí | Muy alta, menos ecosistema |
| Señal a reclutadores | Buena; muestra criterio de rendimiento | La más reconocida (React) pero más pesado | Buena, nicho |

Fuentes:
- Astro i18n: https://docs.astro.build/en/guides/internationalization/
- Astro View Transitions: https://docs.astro.build/en/guides/view-transitions/
- Astro imágenes: https://docs.astro.build/en/guides/images/
- Astro content collections: https://docs.astro.build/en/guides/content-collections/
- Next static export (actualizado 2026-08-09): https://nextjs.org/docs/app/guides/static-exports
- SvelteKit: https://svelte.dev/docs/kit

Notas clave:
- Astro: `prefixDefaultLocale: true` da prefijo a `/es` y `/en`; `redirectToDefaultLocale` redirige la raíz. `Astro.preferredLocale` (Accept-Language) solo aplica a páginas bajo demanda, no a estáticas.
- View Transitions nativas de Astro "no añaden JavaScript"; `<ClientRouter/>` sí y obliga a reinicializar scripts (`astro:page-load`). Desactiva animaciones con `prefers-reduced-motion`.
- Next export: sin redirects/rewrites/headers de config, sin Image Optimization por defecto, sin Server Actions. La doc de export no menciona i18n; el aviso "i18n no compatible con next export" viene de artículos antiguos (Pages Router): https://locize.com/blog/next-i18n-static
- Astro Fonts API (providers Fontsource/Google/Bunny/local, copia a `_astro/fonts`, fallbacks optimizados): https://docs.astro.build/en/guides/fonts/

## 2. Estilos e iconos

- Tailwind CSS **4.3.3** (npm). v4: configuración en CSS, motor Oxide; 4.2 añadió plugin webpack y paletas; 4.3 scrollbars/containers. Fuentes: https://registry.npmjs.org/tailwindcss/latest , https://infoq.com/news/2026/04/tailwind-css-4-2-webpack , https://endoflife.date/tailwind-css
- Tailwind genera solo las utilidades usadas (CSS final de pocos KB). Costo: HTML con muchas clases y dependencia de build.
- CSS moderno puro (variables, `@layer`, container queries, `:has()`, `@view-transition`, `color-mix`, `light-dark()`) basta para un portafolio: 0 dependencias, bento grid con `grid-template-areas` + `subgrid`. Exige más disciplina de arquitectura.
- Criterio: Tailwind si se prioriza velocidad y consistencia de tokens; CSS puro si se prioriza minimalismo y mostrar dominio de CSS. Ambos permiten Lighthouse 95+.
- Iconos de UI: Lucide como componentes Astro, SVG inline sin JS en cliente: https://lucide.dev/guide/packages/lucide-astro
- Logos de tecnologías: Simple Icons (CC0, +3400 iconos, npm `simple-icons` con campo `path`; importar por nombre para tree-shaking; fijar versión si se usa CDN): https://github.com/simple-icons/simple-icons . Revisar DISCLAIMER.md por marcas registradas.
- Iconify: útil para varias colecciones; para minimizar peso, usar `astro-icon` (o `unplugin-icons`) que inlinea SVG en build y evita el runtime/API de Iconify en cliente. (No verifiqué versión ni API actual de astro-icon.)
- Regla de peso: SVG inline o sprite `<symbol>` generado en build; nada de fuentes de iconos ni carga remota.

## 3. i18n estático (/es, /en)

- Estructura: `src/pages/es/...` y `src/pages/en/...` (o `[lang]` + `getStaticPaths`); contenido en `src/content/projects/{es,en}/` filtrado por prefijo de id. Fuente: https://docs.astro.build/en/guides/content-collections/
- hreflang (Google): etiquetas recíprocas, con autorreferencia, mismo conjunto en todas las versiones, y `x-default` para selector/fallback. Fuente: https://developers.google.com/search/docs/specialty/international/localized-versions
- Sitemap: `@astrojs/sitemap` con opción `i18n` emite `xhtml:link` alternates; requiere `site`. Fuente: https://docs.astro.build/en/guides/integrations-guide/sitemap/
- Raíz `/`: página estática `x-default` que funciona como selector de idioma (enlaces reales), sin redirección de servidor por IP/Accept-Language. Si se quiere detección, hacerla en cliente con un script mínimo solo en `/`, sin tocar páginas internas. Es criterio mío; Google no da guía específica sobre redirecciones por idioma.
- Selector: enlace `<a hreflang lang>` a la misma ruta en el otro idioma (mapa de rutas equivalentes), no botón JS; persistencia opcional en `localStorage`. `<html lang>` por página.
- Accesibilidad: `lang` en fragmentos de otro idioma; etiquetas del selector en su propio idioma ("Español", "English").

## 4. Rendimiento

- Core Web Vitals "good" (percentil 75, móvil y escritorio por separado): LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1. Fuente: https://web.dev/articles/vitals
- Pesos Lighthouse 10: TBT 30 %, LCP 25 %, CLS 25 %, FCP 10 %, SI 10 %. Con JS casi nulo, TBT ~0. Fuente: https://developer.chrome.com/docs/lighthouse/performance-scoring
- Fuentes: self-host (WOFF2 variable, subset latino), `font-display: swap` u `optional`, preload solo de la fuente above-the-fold, fallback con métricas ajustadas (la Fonts API de Astro lo hace). Fuente: https://docs.astro.build/en/guides/fonts/ (no trata `font-display`; es práctica estándar no verificada ahí).
- Imágenes: `<Picture formats={['avif','webp']}>` con `layout` responsivo, `width/height` explícitos, `loading="lazy"` salvo la imagen LCP (`fetchpriority="high"`). Fuente: https://docs.astro.build/en/guides/images/
- Video: `<video muted playsinline loop preload="none" poster>` con `<source>` webm + mp4, clips cortos (<5 s, pocos cientos de KB), carga al entrar en viewport (IntersectionObserver), solo poster con `prefers-reduced-motion`. Evitar GIF (mucho más pesado). Práctica general, no contrastada con fuente concreta.
- OG images: generarlas en build (Satori + resvg/sharp, o plantilla HTML capturada con Playwright), 1200x630 por idioma y proyecto. No verifiqué paquetes ni versiones.
- Hosting: estático con Brotli y `Cache-Control: immutable` para `/_astro/*`. No verificado.

## 5. Testing de un sitio estático

- Playwright (`@playwright/test` **1.64.1**): e2e, selector de idioma, enlaces rotos, capturas responsive, `emulateMedia({reducedMotion})`. https://registry.npmjs.org/@playwright/test/latest
- axe: `@axe-core/playwright` **4.14.0** con etiquetas `wcag2a, wcag2aa, wcag21aa, wcag22aa` por ruta e idioma. https://registry.npmjs.org/@axe-core/playwright/latest . Detecta solo parte de los fallos WCAG; complementar con revisión manual de teclado y contraste.
- Lighthouse CI (`@lhci/cli` **0.15.1**): aserciones `performance >= 0.95`, accessibility, SEO, best-practices, preset móvil, sobre el build servido (`astro preview`). https://registry.npmjs.org/@lhci/cli/latest (compatibilidad con el Lighthouse/Chrome actual no verificada)
- Vitest **5.0.5**: solo si hay lógica propia (utilidades de rutas i18n). https://registry.npmjs.org/vitest/latest
- Extra: test propio de hreflang recíproco sobre el sitemap/HTML generado; `html-validate` o `linkinator` (no verificados).
- CI: GitHub Actions con build, Playwright + axe y LHCI como gate de PR.

## Stack recomendado

- **Astro 7.4.x** (salida estática, Node >=22.23.4) + TypeScript.
- Contenido: content collections (`glob()` + Zod) con **MDX** (`@astrojs/mdx`) por proyecto e idioma; rutas `/es` y `/en` con `i18n` nativo, `@astrojs/sitemap` con hreflang, `/` como página `x-default` selector.
- Estilos: **CSS moderno propio** (variables, bento con CSS Grid). Alternativa aceptable: Tailwind 4.3. Mi preferencia por CSS puro es de criterio (peso y demostrar dominio), no de necesidad técnica.
- Iconos: Lucide + Simple Icons (solo los usados) como SVG inline en build.
- Transiciones: View Transitions nativas CSS (`@view-transition`), sin `<ClientRouter/>`; micro-interacciones con CSS y `prefers-reduced-motion`.
- Medios: `<Picture>` AVIF/WebP, video webm+mp4 corto con poster y carga diferida; fuentes self-host con la Fonts API de Astro.
- Calidad: Playwright 1.64 + axe-core/playwright 4.14 + Lighthouse CI 0.15 en CI; Vitest 5 solo si hace falta.

## Alternativa descartada: Next.js 16 con export estático

- Envía runtime de React y payload RSC aunque no haya interactividad; va contra "mínimo JS" y penaliza TBT.
- Export sin Image Optimization por defecto (loader externo), sin redirects/headers de config, e i18n integrado que exige trabajo manual.
- Su ventaja (señal React/Next ante reclutadores) no compensa en un sitio de contenido; si el perfil objetivo es React, se puede mostrar con islas React en Astro.
- SvelteKit 3 es competitivo técnicamente; queda como segunda opción, descartado por no tener i18n ni colecciones de contenido nativas (más piezas que ensamblar).

## No pude verificar

- Cómo se resuelve i18n en SvelteKit 3 (svelte.dev/docs/kit/i18n devolvió 404) ni el estado de `enhanced-img`/mdsvex.
- Si la Fonts API de Astro es estable o experimental en 7.x (la página no lo indica).
- Pesos de Lighthouse en la versión más reciente (la doc describe Lighthouse 10) y el throttling móvil exacto.
- Versiones y API actuales de astro-icon/Iconify, Satori, html-validate, linkinator.
- Cambios de ruptura entre Astro 5, 6 y 7 (solo vi que hay guías de actualización).
- Si Next 16 mantiene la restricción de `i18n` con export: la doc actual no la menciona; la evidencia es de artículos antiguos.
- La búsqueda web fue pobre para versiones; usé el registro npm como fuente de verdad.
