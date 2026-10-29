# Tareas — 003-proyectos

Plan aprobado (sin dependencias nuevas). Una tarea por vez con `/sdd-implement 003-proyectos Tn`; tests primero.

- [x] **T1 Compilación de prueba** · RF15
  Test unitario primero (`pendingGuard()` falla con `[PENDIENTE]`; `pendingGuard({ allowPending: true })` no, pero sigue fallando por teléfonos); luego la opción en la integración, `scripts/build-test.mjs`, script `build:test` y cambio de Playwright y Lighthouse a esa compilación.
  Hecho cuando: el test pasa, `npm run build` sigue bloqueando un `[PENDIENTE]` temporal y `npm run build:test` lo deja pasar.

- [x] **T2 Capturas de ejemplo** · RF15 (sin marco de navegador: lo dibuja la tarjeta)
  `scripts/make-placeholders.mjs` y generación de portada + 2 imágenes de galería por proyecto en `src/content/projects/images/<slug>/`.
  Hecho cuando: las 6 imágenes existen, se ven bien (marco de navegador, nombre, "Captura de ejemplo / Example screenshot") y pesan poco.

- [x] **T3 Colección y contenido inicial** · RF1, RF2
  `src/content.config.ts` con el esquema; los 4 archivos `.md` con los datos conocidos y `[PENDIENTE]` donde falte; textos de interfaz nuevos en `ui`.
  Hecho cuando: `npm run check` pasa y quitar `problem` de un archivo lo hace fallar nombrando archivo y campo.

- [x] **T4 Reglas del conjunto y distribución** · RF3, RF4, RF6 (lógica; la cuadrícula visible en T5)
  `projects.test` primero (`checkProjectSet` y `projectAreas` para 2–5); luego `src/lib/projects.ts`.
  Hecho cuando: los tests unitarios pasan.

- [x] **T5 Tarjeta y sección de proyectos** · RF5, RF6, RF7, RF8 (se adelantaron rutas mínimas de caso para que la guarda de enlaces no bloquee; T6 las completa)
  Tests e2e primero (contenido de tarjetas EN/ES, posiciones 1280 / 768 / 375, clic → caso, anclas); luego `ProjectCard.astro`, `ProjectsSection.astro` e integración en la home.
  Hecho cuando: los tests pasan y la revisión en navegador (3 anchos, 2 temas, 2 idiomas) coincide con `docs/DESIGN.md`.

- [x] **T6 Página de caso** · RF9, RF10, RF11 (rama "Código privado" sin test e2e: ningún proyecto actual es privado), RF12
  Tests e2e primero (metadatos, hreflang, selector, secciones, enlaces, siguiente proyecto, imágenes); luego `CasePage.astro` y las dos rutas.
  Hecho cuando: los tests pasan y los 4 casos se ven bien en los 3 anchos y ambos temas.

- [x] **T7 Transición tarjeta → caso** · RF13 (la animación en sí no se pudo capturar en una imagen: dura ~250 ms)
  Test de `view-transition-name` coincidente y de la regla bajo reduced-motion primero; luego CSS.
  Hecho cuando: el test pasa y en el navegador la captura y el título se animan al entrar al caso.

- [x] **T8 Sitemap con rutas traducidas** · RF14
  Test del sitemap primero; luego `serialize` en la config.
  Hecho cuando: el sitemap lista los 4 casos con sus `xhtml:link` en y es.

- [x] **T9 Cierre** · RF16 (check 0 errores, 34 unit, 210 e2e; Lighthouse 99–100 × 4 en homes y casos, LCP ~1.81 s, CLS 0, 138 KB; capturas de tarjetas en lazy y Playfair solo en peso 400 para recuperar el LCP)
  `a11y.spec` y Lighthouse CI ampliados a un caso por idioma; `npm run check && npm test`, `npm run lhci`, revisión final; README con cómo agregar o editar un proyecto.
  Hecho cuando: todo en verde, Lighthouse ≥ 95 × 4 en home y casos, axe sin infracciones.

**Validada y cerrada por Juan (2026-10-29):** 15/16 RF cumplen; RF11 parcial (sin proyecto privado para probar "Código privado"). check 0 errores, 34 unit, 210 e2e, Lighthouse 99–100 × 4, CLS 0. `npm run build` bloqueado a propósito por `[PENDIENTE]` hasta llenar el contenido real.
