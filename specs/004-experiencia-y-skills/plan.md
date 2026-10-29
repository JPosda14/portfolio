# Plan — 004-experiencia-y-skills

Verificado el 2026-10-29: `simple-icons` 16.36.0 (CC0-1.0) incluye `openjdk`, `springboot`, `flutter`, `python`, `typescript`, `nextdotjs`, `supabase`, `git`, `claude` y `astro`; no incluye AWS ni Java (retirados por marca), como preveía la spec. Exporta cada icono como objeto con `title`, `hex` y `path` (SVG de 24 × 24).

## Archivos a crear o cambiar
```
src/content/home/{en,es}.ts          # + experience (trabajos con fechas ISO) y skills (categorías con icono + nombre)
src/lib/dates.ts                     # formatPeriod(start, end, locale): "Sep 2025 – Jan 2026" / "sep 2025 – ene 2026"
src/components/Icon.astro            # + iconos Lucide: search, layout-template, workflow, repeat, circle-check, file-text, arrow-up-right
src/components/TechIcon.astro        # logos de Simple Icons por slug, SVG inline monocromo
src/components/bento/Cell.astro      # + prop id (destino del ancla "Experiencia")
src/components/bento/ExperienceCell.astro
src/components/bento/SkillsCell.astro        # una categoría: etiqueta, lista con icono y nombre, línea opcional al pie
src/components/ProfileSection.astro          # cuadrícula de experiencia + skills (después de proyectos)
src/components/HomePage.astro                # + ProfileSection; se quita la sección vacía de experiencia
tests/unit/dates.test.mjs
tests/e2e/profile.spec.ts
```
Dependencia nueva (dev): `simple-icons` 16.36.0, solo en build (los trazados quedan dentro del HTML; no se envía JS).

## Decisiones
1. **Iconos de tecnologías con `simple-icons` como dependencia de desarrollo** y un mapa explícito slug → icono en `TechIcon.astro` (`siOpenjdk`, `siSpringboot`, …). Tipado: un slug que no exista es error de `astro check`. *Descartado:* copiar a mano los SVG (sin actualizaciones y sin licencia rastreable) y el CDN de Simple Icons (petición a terceros, viola RF13).
2. **Iconos de business skills con Lucide** en el mismo `Icon.astro` que ya existe (SVG inline, ISC), para no añadir otra dependencia por 7 iconos.
3. **Contenido**: en `home/{en,es}.ts`, `experience.jobs[]` con `role`, `company`, `start`/`end` en ISO (`"2025-09"`) y `achievement`; `skills.daily | learning | business` con `label` y `items[] { icon, name }`; `skills.alsoLabel` y `skills.also`. El `icon` es el mismo en ambos idiomas; el test de paridad de claves ya cubre arrays (RF12).
4. **Fechas con `Intl.DateTimeFormat`** (`month: "short", year: "numeric"`) en `formatPeriod`, normalizando el punto y "sept" → "sep" en español para que coincida con el diseño; probado con `node --test` (RF2). *Descartado:* escribir las fechas como texto en el contenido (se desincronizan entre idiomas).
5. **Sección propia `ProfileSection`** con su cuadrícula (mismas columnas y gap que el bento): escritorio `"exp exp daily daily" "learn learn biz biz"`; tablet `"exp exp" "daily daily" "learn biz"`; móvil una columna. Orden del DOM: experiencia, uso diario, aprendiendo, business (RF11). *Descartado:* meter estas celdas en la cuadrícula de proyectos (sus áreas dependen del número de proyectos).
6. **Ancla "Experiencia" en la propia celda**: `Cell` acepta `id`, con `scroll-margin-top` (RF4). Se elimina la `<section id="experience">` vacía de la spec 001.
7. **LinkedIn**: enlace de texto "LinkedIn ↗" con `target="_blank"`, `rel="noopener noreferrer"` y el texto oculto de pestaña nueva ya existente (RF3). *Descartado:* un `ButtonLink` (demasiado peso visual para un enlace secundario).
8. **Accesibilidad**: los iconos van con `aria-hidden="true"` y `focusable="false"`; cada lista de skills es un `<ul>` con nombre visible (RF9, RF10). Sin `progressbar` ni porcentajes.

## Estrategia de tests
| Test | Cubre |
| --- | --- |
| `dates.test`: `formatPeriod("2025-09", "2026-01", "en")` → "Sep 2025 – Jan 2026"; en `es` → "sep 2025 – ene 2026" | RF2 |
| `i18n.test` (existente): claves de `experience` y `skills` iguales en EN y ES | RF12 |
| `profile.spec`: celda de experiencia con INSTALAAB antes que Mirus, rol, empresa, periodo y logro, EN y ES | RF1, RF2 |
| `profile.spec`: LinkedIn con `href`, `target`, `rel` y nombre accesible con "new tab" / "pestaña nueva" | RF3 |
| `profile.spec`: "Experiencia" del encabezado → la celda queda visible | RF4 |
| `profile.spec`: las tres categorías con exactamente sus skills y la línea "También he trabajado con" | RF5–RF8 |
| `profile.spec`: ningún `[role=progressbar]` ni "%" en las skills; iconos `svg[aria-hidden="true"]` | RF9, RF10, RF13 |
| `profile.spec`: posiciones a 1280 / 768 / 375 px, sin scroll horizontal, orden hero → foto → proyectos → experiencia → skills | RF11 |
| `quality.spec` (existente): un solo script y ninguna petición externa | RF13 |
| `a11y.spec` + Lighthouse CI existentes | RF14 |

## Riesgos
- **Tamaño de `simple-icons`** (~23 MB en `node_modules`): solo afecta la instalación local, no lo que se publica.
- **Marcas**: los logos se usan para nombrar la tecnología (uso nominativo); en monocromo, sin alterar.
- **Formato de fecha en español**: varía según la versión de ICU de Node; la normalización y su test lo detectan si cambia.
- **"Cómo pienso" (spec 005)** reacomodará esta cuadrícula; los tests de posición se actualizarán ahí.
