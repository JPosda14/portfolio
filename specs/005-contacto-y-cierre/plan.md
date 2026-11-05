# Plan — 005-contacto-y-cierre

Sin dependencias nuevas ni JavaScript en el cliente.

## Archivos a crear o cambiar
```
src/content/home/{en,es}.ts          # + now { label, text, updated "YYYY-MM-DD" }, thinking { label, steps[] }, contact { label, title, paragraph, cta… }
src/content/ui/{en,es}.ts            # + now.updated ("Updated" / "Actualizado") si hace falta
src/lib/now.ts                       # isNowFresh(updated, today, maxDays = 90): valida la fecha y decide si se muestra
src/lib/dates.ts                     # formatMonth acepta también YYYY-MM-DD
src/lib/icons.ts                     # + Lucide "mail"; GitHub vía Simple Icons (siGithub)
src/components/bento/NowCell.astro
src/components/bento/ThinkingCell.astro
src/components/bento/ContactCell.astro
src/components/HomePage.astro        # bento superior con/sin "Ahora"; ContactCell en lugar de la sección vacía
src/components/ProfileSection.astro  # + ThinkingCell y cuadrícula final
tests/unit/now.test.mjs
tests/unit/dates.test.mjs            # + caso YYYY-MM-DD
tests/e2e/closing.spec.ts            # cómo pienso, ahora, contacto
tests/e2e/profile.spec.ts            # posiciones y orden actualizados
tests/e2e/projects.spec.ts           # orden de lectura: "now" va antes de los proyectos
```

## Decisiones
1. **Vencimiento de "Ahora" en build** con `isNowFresh(updated, new Date())`, función pura probada con `node --test` (RF3–RF5). Si la fecha no es `YYYY-MM-DD` real, lanza un error con el valor y el build falla. *Descartado:* ocultarla con JS en el cliente (rompe la regla de cero JS) y hacerlo con CSS (imposible sin fecha actual).
2. **Distribución superior**: con "Ahora", `"hero hero photo photo" / "hero hero now now"`; sin ella, `"hero hero photo photo"` (la foto ocupa la altura del hero). Tablet `"hero hero" "photo now"`, móvil una columna. La clase `has-now` en `.bento` elige las áreas (RF4, RF11). *Descartado:* una celda vacía de relleno.
3. **Cuadrícula de perfil final**: escritorio `"exp exp think think" / "daily daily learn biz"`; tablet `"exp exp" "think think" "daily daily" "learn biz"`; móvil una columna. Orden del DOM: experiencia, cómo pienso, uso diario, aprendiendo, business (RF11).
4. **Cómo pienso**: `<ol>` con 3 subtarjetas en `--surface-2`; número y nombre en mono (`01 / UNDERSTAND`), título en Playfair cursiva, texto pequeño; iconos Lucide ya existentes (`search`, `file-text`, `circle-check`) con `aria-hidden` (RF1, RF2).
5. **Contacto**: celda propia a lo ancho, fuera de `ProfileSection`, con `id` = ancla de contacto (sustituye la sección vacía, RF9). Título `h2` serif con la palabra clave en cursiva; correo como enlace `mailto` en chip mono; `ButtonLink` primario a Cal.com y secundario al CV; LinkedIn y GitHub como enlaces de texto con "↗" y el texto oculto de pestaña nueva; idiomas reutilizando `photo.languages` (RF6–RF8). *Descartado:* botón de copiar (requiere JS; pregunta abierta 1).
6. **Textos** en `home/{en,es}.ts`; la paridad de claves la cubre el `i18n.test` existente (RF12). Los enlaces salen de `src/content/links.ts`; no se escribe teléfono (el `pending-guard` ya lo bloquea, RF10).

## Estrategia de tests
| Test | Cubre |
| --- | --- |
| `now.test`: fresca a 0 y 90 días, vencida a 91, error con "2026-13-01" y "nov" | RF3–RF5 |
| `dates.test`: `formatMonth("2026-11-04", …)` → "Nov 2026" / "nov 2026" | RF3 |
| `closing.spec`: 3 pasos en orden con número, título y texto; iconos `aria-hidden` (EN/ES) | RF1, RF2 |
| `closing.spec`: "Ahora" con texto y fecha `<time datetime>` (EN/ES) | RF3 |
| `closing.spec`: contacto con `mailto`, Cal.com, CV del idioma, LinkedIn, GitHub (pestaña nueva anunciada) e idiomas | RF6–RF8 |
| `closing.spec`: "Contacto" del encabezado lleva a la celda; ningún `<form>` | RF9, RF10 |
| `profile.spec` / `projects.spec`: posiciones a 1280 / 768 / 375, sin scroll horizontal, orden completo | RF11 |
| `i18n.test`, `quality.spec`, `a11y.spec` y Lighthouse existentes | RF10, RF12–RF14 |

RF4 (foto ocupando el espacio) se prueba sobre la función de vencimiento y se revisa a mano una vez cambiando la fecha a una antigua en el build de prueba; no se deja un test e2e porque depende de la fecha del build.

## Riesgos
- **Sitio estático**: "Ahora" se oculta solo cuando se vuelve a construir. Para la publicación: reconstrucción programada (p. ej. semanal) en Cloudflare, o actualizar el texto cada vez que cambie algo. Se decide en la fase de despliegue.
- **Celdas de 1 columna** (aprendiendo, business) a 1024–1280 px: textos como "Automatización de procesos (Make)" pasan a dos líneas; se revisa en el navegador.
- **El test de "Ahora" depende de la fecha**: tras 90 días desde 2026-11-04 el e2e fallará a propósito, avisando que hay que actualizar el texto.
