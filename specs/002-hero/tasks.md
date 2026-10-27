# Tareas — 002-hero

Plan aprobado (con la dependencia `unpdf`). Una tarea por vez con `/sdd-implement 002-hero Tn`; tests primero.

- [x] **T1 Textos de la home** · RF12
  Test de paridad de claves de home en `i18n.test` primero; luego `src/content/home/{en,es}.ts` (estado, nombre, rol en dos partes, subtítulo, CTAs, alt de la foto, ubicación, idiomas, etiqueta de celda) y `getHome(locale)`; texto "(opens in a new tab)" / "(se abre en una pestaña nueva)" en `ui`.
  Hecho cuando: `npm run check` pasa y quitar una clave de `home/es.ts` lo hace fallar.

- [x] **T2 Cuadrícula bento y celda genérica** · RF1, RF2
  Tests de layout en `hero.spec` (1280 / 768 / 375 px y orden del DOM) primero; luego `Cell.astro` y la cuadrícula en `HomePage` con dos celdas vacías con su cabecera.
  Hecho cuando: los tests de layout pasan en escritorio y móvil.

- [x] **T3 Botón-enlace** · RF5, RF8
  Tests de los tres enlaces (nombres, Cal.com con `target`, `rel` y nombre accesible con "new tab" / "pestaña nueva") primero; luego `ButtonLink.astro` (primario, secundario, icono, externo).
  Hecho cuando: los tests de enlaces pasan en EN y ES.

- [ ] **T4 Celda hero** · RF3, RF4, RF6, RF7, RF9
  Tests de estado, `h1`, rol con `em`, subtítulo, ancla de proyectos, `href` del CV por idioma y CTA dentro de la primera pantalla en 375 × 812 primero; luego `HeroCell.astro`.
  Hecho cuando: los tests pasan y la revisión en navegador (1280 / 768 / 375, claro y oscuro, EN y ES) coincide con `docs/DESIGN.md`.

- [ ] **T5 Celda de foto** · RF10, RF11
  Tests de `alt`, `<source>` AVIF y WebP, `width`/`height`, sin `loading="lazy"`, ubicación e idiomas primero; luego copiar la foto a `src/assets/` y `PhotoCell.astro` con `<Picture>`.
  Hecho cuando: los tests pasan, CLS = 0 en Lighthouse y la foto se ve bien recortada en los tres anchos.

- [ ] **T6 Sin teléfono en el HTML** · RF15
  Test en `pending-guard.test` primero (HTML con un móvil `+57 3…` → error); luego ampliar la integración con el patrón genérico.
  Hecho cuando: el test pasa y el build actual sigue en verde.

- [ ] **T7 Guarda de enlaces internos** · RF13
  `link-guard.test` primero; luego `integrations/link-guard.mjs` registrada en la config. *Mientras no estén los CV, el build fallará por sus enlaces: es el comportamiento esperado.*
  Hecho cuando: los tests unitarios pasan y el build falla nombrando `/cv/juan-posada-cv-en.pdf` y `/cv/juan-posada-cv-es.pdf`.

- [ ] **T8 CV sin teléfono** · RF7, RF13, RF15 · **bloqueada: requiere los PDF de Juan**
  Instalar `unpdf`, `cv.test` primero (sin móvil colombiano, contiene el nombre); copiar los PDF a `public/cv/`; test e2e de descarga (200, `application/pdf`).
  Hecho cuando: `cv.test` y el test de descarga pasan y el build vuelve a verde.

- [ ] **T9 Cierre** · RF14
  `npm run check && npm test`, `npm run lhci` y revisión final en navegador; ajustes si algo baja de 95.
  Hecho cuando: todo en verde, Lighthouse ≥ 95 × 4 en `/` y `/es/`, axe sin infracciones.

Después: `/sdd-validate 002-hero`.
