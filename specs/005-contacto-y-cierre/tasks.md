# Tareas — 005-contacto-y-cierre

Modo ligero: una aprobación (spec + plan + tareas) y todas las tareas seguidas; tests primero.

- [x] **T1 Vencimiento y fecha** · RF3–RF5
  `now.test` y caso nuevo de `dates.test` primero; luego `src/lib/now.ts` y `formatMonth` con YYYY-MM-DD.
  Hecho cuando: los tests unitarios pasan.

- [x] **T2 Contenido** · RF12
  `now`, `thinking` y `contact` en `src/content/home/{en,es}.ts` con los textos aprobados; icono `mail` y GitHub en `icons.ts`.
  Hecho cuando: `npm run check` pasa con paridad de claves.

- [x] **T3 Cómo pienso y cuadrícula de perfil** · RF1, RF2, RF11
  Tests en `closing.spec` y posiciones en `profile.spec` primero; luego `ThinkingCell.astro` y la cuadrícula final de `ProfileSection`.
  Hecho cuando: esos tests pasan en EN/ES, escritorio y móvil.

- [x] **T4 Ahora y bento superior** · RF3, RF4, RF11
  Tests de "Ahora" y del orden de lectura primero; luego `NowCell.astro` y las áreas con/sin "Ahora" en `HomePage`.
  Hecho cuando: los tests pasan y, con una fecha vieja en el build de prueba, la celda desaparece y la foto llena el hueco (revisión manual).

- [x] **T5 Contacto** · RF6–RF10
  Tests de contacto, ancla y ausencia de formulario primero; luego `ContactCell.astro` en lugar de la sección vacía.
  Hecho cuando: los tests pasan y la revisión en navegador (1280 / 768 / 375, claro y oscuro, EN y ES) coincide con `docs/DESIGN.md`.

- [x] **T6 Cierre** · RF13, RF14 (check 0 errores, 47 unit, 256 e2e; Lighthouse 98–100 × 4, LCP ~1.8 s, CLS 0, home 145 KB)
  `npm run check && npm test`, `npm run lhci`, README si cambia algo relevante, MEMORY.md.
  Hecho cuando: todo en verde, Lighthouse ≥ 95 × 4, axe sin infracciones, sin peticiones externas.

**Validada y cerrada por Juan (2026-11-05, modo ligero):** 14/14 RF con evidencia — RF1–RF2 y RF6–RF10 en `closing.spec`; RF3 en `closing.spec` y `dates.test`; RF4 en `now.test` + revisión manual (fecha 2026-01-04 → sin celda, áreas `"hero hero photo photo"`); RF5 en `now.test`; RF11 en `profile.spec`, `projects.spec` y `hero.spec`; RF12 en `i18n.test`; RF13 en `quality.spec`; RF14 en `a11y.spec` y Lighthouse 98–100 × 4. Ajuste en la revisión: el correo salta de línea tras la "@" en móvil (`<wbr>`).