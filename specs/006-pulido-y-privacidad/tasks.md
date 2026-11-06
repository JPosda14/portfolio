# Tareas — 006-pulido-y-privacidad

Modo ligero: una aprobación (spec + plan + tareas) y todas las tareas seguidas; tests primero.

- [x] **T1 Privacidad** · RF1–RF3
  `privacy.spec` primero; luego el contenido EN/ES, `PrivacyPage`, las dos rutas, el enlace en el pie y la regex del sitemap.
  Hecho cuando: los tests pasan en EN/ES, escritorio y móvil, y el sitemap empareja las dos páginas.

- [x] **T2 Meta de compartir y JSON-LD** · RF4, RF7, RF8, RF11
  `seo.test` y `share.spec` (meta, JSON-LD, 404 sin og, theme-color) primero; luego `src/lib/seo.ts` y `BaseLayout`. Ajuste de `quality.spec` a "un solo script ejecutable".
  Hecho cuando: los tests pasan, salvo los que necesitan las imágenes (T3).

- [x] **T3 Imágenes para compartir y guarda** · RF5, RF6
  `og-guard.test` primero; luego `integrations/og-guard.mjs`, `scripts/make-og.mjs` y las 6 imágenes en `public/og/`.
  Hecho cuando: la guarda falla si se quita una imagen, las 6 miden 1200 × 630 y se ven bien (revisión visual).

- [x] **T4 Pulido** · RF9, RF10
  `polish.spec` primero; luego la entrada suave en `global.css`, `sizes` de la foto y `reducedMotion` en `a11y.spec`.
  Hecho cuando: los tests pasan y la revisión en navegador (1280 / 768 / 375, claro y oscuro) se ve bien.

- [x] **T5 Cierre** · RF12, RF13 (check 0 errores, 53 unit, 316 e2e; `npm run build` de publicación pasa; Lighthouse 99–100 × 4 en 5 URL)
  `npm run check && npm test`, `npm run build` (publicación), `npm run lhci` con `/privacy/`, README (cómo regenerar las imágenes OG), MEMORY.md.
  Hecho cuando: todo en verde, Lighthouse ≥ 95 × 4, axe sin infracciones, sin peticiones externas.

**Validada y cerrada por Juan (2026-11-05, modo ligero):** 13/13 RF con evidencia:
- **RF1–RF3:** `privacy.spec`, que cubre contenido, selector, hreflang, pie en 6 páginas y sitemap.
- **RF4, RF5, RF8, RF11:** `share.spec`, que comprueba las 8 páginas con imagen PNG de 1200 × 630 y la 404 sin `og`.
- **RF6:** `og-guard.test` y una prueba manual: al quitar `home-es.png`, el build se bloqueó nombrando 2 páginas.
- **RF7:** `seo.test` y `share.spec`.
- **RF9, RF10:** `polish.spec`.
- **RF12:** `quality.spec`.
- **RF13:** `a11y.spec`, ahora con privacidad y con movimiento reducido, y Lighthouse 99–100.

Con esto también queda cerrado el **RF8 de la spec 001** (enlace de privacidad en el pie).

**Trampa encontrada:** el minificador junta la animación en `animation: … view()`, que algunos navegadores rechazan. Se escribe con propiedades individuales.
