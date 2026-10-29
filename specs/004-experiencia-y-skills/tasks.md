# Tareas — 004-experiencia-y-skills

Plan aprobado (con la dependencia `simple-icons`). Una tarea por vez con `/sdd-implement 004-experiencia-y-skills Tn`; tests primero.

- [x] **T1 Fechas** · RF2
  `dates.test` primero; luego `src/lib/dates.ts` con `formatPeriod`.
  Hecho cuando: el test pasa para EN y ES (incluido "sep", sin punto).

- [x] **T2 Contenido de experiencia y skills** · RF12
  `experience` y `skills` en `src/content/home/{en,es}.ts` con los datos aprobados.
  Hecho cuando: `npm run check` pasa (paridad de claves incluida) y quitar una clave en ES lo hace fallar.

- [x] **T3 Iconos** · RF10, RF13 (slug desconocido: falla el build vía `resolveIcon`, no `astro check`, porque el tipo del contenido convierte `icon` en string)
  Instalar `simple-icons` 16.36.0; `TechIcon.astro` con el mapa de slugs; iconos Lucide nuevos en `Icon.astro`.
  Hecho cuando: `npm run check` pasa y un slug inexistente hace fallar `astro check`.

- [x] **T4 Celda de experiencia y sección** · RF1, RF3, RF4, RF11
  Tests de `profile.spec` (contenido, LinkedIn, ancla, posiciones) primero; luego `Cell` con `id`, `ExperienceCell.astro`, `ProfileSection.astro` (con huecos provisionales para skills) e integración en la home.
  Hecho cuando: esos tests pasan en EN/ES, escritorio y móvil.

- [x] **T5 Celdas de skills** · RF5–RF10, RF11
  Tests de categorías, línea "También he trabajado con", sin barras ni %, iconos ocultos primero; luego `SkillsCell.astro` en la sección.
  Hecho cuando: los tests pasan y la revisión en navegador (1280 / 768 / 375, claro y oscuro, EN y ES) coincide con `docs/DESIGN.md`.

- [x] **T6 Cierre** · RF13, RF14 (check 0 errores, 41 unit, 236 e2e; Lighthouse 99–100 × 4, LCP ~1.81 s, CLS 0, home 143 KB)
  `npm run check && npm test`, `npm run lhci`, revisión final; README si cambia algo relevante.
  Hecho cuando: todo en verde, Lighthouse ≥ 95 × 4, axe sin infracciones, sin peticiones externas.

Después: `/sdd-validate 004-experiencia-y-skills`.
