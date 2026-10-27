# Plan — 002-hero

APIs verificadas con Context7 (docs de Astro, oct 2026): `<Picture>` de `astro:assets` con `formats`, `widths`/`sizes`, `loading`; las imágenes importadas desde `src/assets/` se optimizan en build con `sharp` (ya instalado como dependencia de Astro).

## Archivos a crear o cambiar
```
src/assets/juan-posada.webp            # foto enviada por Juan (copiada al proyecto)
public/cv/juan-posada-cv-en.pdf        # CV web sin teléfono (lo entrega Juan)
public/cv/juan-posada-cv-es.pdf
src/content/home/en.ts, es.ts          # textos del hero y de la celda de foto (es tipado contra en)
src/i18n/index.ts                      # + getHome(locale)
src/components/bento/Cell.astro        # celda genérica: superficie, borde, radio, padding, cabecera mono opcional
src/components/bento/HeroCell.astro
src/components/bento/PhotoCell.astro
src/components/ButtonLink.astro        # enlace con estilo de botón (primario / secundario, icono, externo)
src/components/HomePage.astro          # + cuadrícula bento
integrations/link-guard.mjs            # falla el build si un enlace interno apunta a un archivo inexistente
tests/unit/link-guard.test.mjs
tests/unit/cv.test.mjs                 # los PDF publicados no contienen teléfonos
tests/unit/i18n.test.mjs               # + paridad de claves de home
tests/e2e/hero.spec.ts
```

Dependencia nueva (dev): `unpdf` (extracción de texto de PDF, MIT, sin binarios nativos) para `cv.test`.

## Decisiones
1. **Textos de la home en `src/content/home/{en,es}.ts`**, con el mismo patrón tipado de `ui` (`es satisfies HomeStrings`), separados de la interfaz para que el contenido crezca sin mezclarse con etiquetas de navegación (RF12). El rol se guarda en dos partes (`role.lead`, `role.highlight`) para destacar la palabra clave sin HTML en el contenido. *Descartado:* content collections con Zod, pensadas para colecciones (proyectos en 003), no para textos sueltos.
2. **Cuadrícula con `grid-template-areas` en `HomePage`**: escritorio `"hero hero photo photo" ×2`; ≤ 1023 px `"hero hero" "photo photo"`; ≤ 639 px una columna. Las celdas solo declaran su área; no conocen el layout (RF1, RF2). *Descartado:* posicionar celdas con `order` (rompe el orden de lectura) o con un sistema de 12 columnas (más complejo sin necesidad hasta tener más celdas).
3. **`Cell.astro` como envoltorio común** (`section` con `aria-labelledby` cuando lleva título, superficie, borde, radio 24 px, padding 40/24 px) para que las specs 003–005 reutilicen la misma pieza.
4. **`ButtonLink.astro`** con variantes `primary` y `secondary`, icono Lucide opcional en SVG inline y prop `external`: añade `target="_blank"`, `rel="noopener noreferrer"` y un texto oculto "(opens in a new tab)" / "(se abre en una pestaña nueva)" desde los textos de interfaz (RF8). *Descartado:* `aria-label` que reemplace el texto visible (rompe la regla de "nombre accesible contiene el texto visible").
5. **Foto con `<Picture>`**: `formats={["avif", "webp"]}`, `widths={[192, 384]}`, `sizes="12rem"`, `loading="eager"` (está arriba), recorte cuadrado con `aspect-ratio: 1` y `object-fit: cover`; Astro escribe `width`/`height` (RF10, RF11). *Descartado:* `fetchpriority="high"`: el LCP es el `h1`, no la foto.
6. **Guarda de enlaces internos** (`astro:build:done`): recorre el HTML generado, toma cada `href`/`src` que empiece por `/` (sin `#` ni query) y comprueba que exista en `dist/` (archivo, o carpeta con `index.html`). Falla con la lista de enlaces rotos. Cubre RF13 de forma general (CV, imágenes, rutas futuras). *Descartado:* comprobar solo los CV con una lista fija.
7. **Sin teléfono publicado (RF15)**:
   - la guarda de `[PENDIENTE]` se amplía con un patrón genérico de móvil colombiano (`+57 3XX XXX XXXX`, con o sin espacios) sobre el HTML;
   - `cv.test` extrae el texto de cada PDF de `public/cv/` con `unpdf` y falla si aparece ese patrón; además comprueba que el PDF contenga el nombre (que es el CV correcto).
   El número real nunca se escribe en el repositorio. *Descartado:* guardar el número en el código para buscarlo (lo publicaría en GitHub).
8. **Orden de tareas por la dependencia del CV**: los enlaces al CV se crean desde el principio, pero la guarda de enlaces y la copia de los PDF van en la última tarea, que queda bloqueada hasta que Juan entregue los CV sin teléfono.

## Estrategia de tests
| Test | Cubre |
| --- | --- |
| `hero.spec`: a 1280 px hero a la izquierda y foto a la derecha en la misma fila; a 768 px foto debajo del hero; a 375 px una columna; orden del DOM hero → foto | RF1, RF2 |
| `hero.spec`: línea de estado con disponibilidad, remoto, ubicación y UTC‑5 en EN y ES | RF3 |
| `hero.spec`: `h1` con el nombre; rol con `em` "AI focus" / "enfoque en IA"; subtítulo | RF4 |
| `hero.spec`: tres enlaces con sus nombres; "Ver mi trabajo" → ancla de proyectos | RF5, RF6 |
| `hero.spec`: "Descargar CV" apunta al PDF del idioma y responde 200 `application/pdf` | RF7 |
| `hero.spec`: Cal.com con `target="_blank"`, `rel` con `noopener` y nombre accesible con "new tab" / "pestaña nueva" | RF8 |
| `hero.spec` (móvil 375 × 812): `h1`, rol y CTA principal dentro de la primera pantalla | RF9 |
| `hero.spec`: foto con `alt`, `<source>` AVIF y WebP, `width`/`height`, no `loading="lazy"`; ubicación e idiomas visibles | RF10, RF11 |
| `i18n.test`: claves de home idénticas en EN y ES, ninguna vacía | RF12 |
| `link-guard.test`: enlace a archivo inexistente → error con la ruta; existente o ancla → OK | RF13 |
| `cv.test`: ningún PDF de `public/cv/` contiene un móvil colombiano; contienen el nombre | RF15 |
| `pending-guard.test` (ampliado): HTML con un móvil colombiano → error | RF15 |
| `a11y.spec` + Lighthouse CI existentes | RF14 |

## Riesgos
- **CV bloqueante**: la spec no se puede cerrar hasta que lleguen los PDF sin teléfono (decisión 8).
- **Foto en WebP de 710 × 736**: suficiente para 384 px; si Juan cambia la foto, debe tener al menos 384 × 384.
- **Falsos positivos del patrón de teléfono**: se limita al formato móvil colombiano con prefijo `+57`; si aparece en un texto legítimo se revisa el patrón.
- **Espacio en móvil**: el encabezado ocupa dos filas en móvil; si el CTA no entra en la primera pantalla, se reduce el padding del hero en móvil antes que el tamaño del texto.
