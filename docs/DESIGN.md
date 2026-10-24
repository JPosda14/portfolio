# DESIGN.md — Sistema de diseño del portafolio

Fuente: exports de Stitch ("Atelier Technologique" oscuro y "L'Édition Technologique" claro) en `design/stitch/`, ajustados a la constitución. Referencias de Juan en `design/references/`. **De Stitch se toma solo el estilo; el contenido sale de `src/content/`** (Stitch inventó proyectos, cifras, foto y correo).

## Identidad
Dualidad **editorial + ingeniería**: titulares serif con cursiva en palabras clave, texto sans neutro y metadatos en monoespaciada. Bento oscuro de tarjetas suaves con un único acento azul eléctrico. Sobrio, preciso, sin decoración que no informe.

## Tokens de color
Se definen como custom properties con `light-dark()`; oscuro es el modo por defecto.

| Token | Oscuro | Claro | Uso |
| --- | --- | --- | --- |
| `--bg` | `#090D16` | `#FFFFFF` | Fondo de página |
| `--surface` | `#0F172A` | `#F8FAFC` | Celdas del bento |
| `--surface-2` | `#1E293B` | `#F1F5F9` | Contenedores internos, chips, iconos |
| `--border` | `rgb(255 255 255 / .08)` | `#E2E8F0` | Bordes de celdas |
| `--border-2` | `rgb(255 255 255 / .15)` | `#CBD5E1` | Botones secundarios, separadores |
| `--text` | `#E2E8F0` | `#0F172A` | Texto principal y títulos |
| `--text-2` | `#94A3B8` | `#475569` | Texto secundario y etiquetas mono |
| `--accent` | `#0047FF` | `#0052FF` | Fondo del botón primario, indicadores |
| `--accent-hover` | `#2E66FF` | `#0047E0` | Hover del botón primario |
| `--accent-text` | `#60A5FA` | `#0047E0` | Enlaces, cursivas destacadas, etiquetas activas |
| `--on-accent` | `#FFFFFF` | `#FFFFFF` | Texto sobre `--accent` |
| `--ok` | `#34D399` | `#059669` | Punto de "Disponible" |
| `--pending` | `#FACC15` | `#A16207` | Marcador `[PENDIENTE]` (solo desarrollo) |

Reglas:
- `--accent` nunca se usa como color de texto en modo oscuro (contraste 2.3:1); para texto se usa `--accent-text`.
- Texto pequeño (< 14 px) siempre en `--text` o `--text-2`, nunca en tonos más tenues.
- Un solo acento. Sin gradientes de fondo salvo un resplandor radial muy tenue opcional en hero y contacto.

## Tipografía
Todas autoalojadas en WOFF2 con `font-display: swap` y subconjunto latino.

| Rol | Fuente | Tamaño (escritorio → móvil) | Notas |
| --- | --- | --- | --- |
| Display (nombre en hero) | Playfair Display 400 | 72 → 44 px, `line-height` 1.1, `-0.02em` | |
| Título de sección / contacto | Playfair Display 400 | 48 → 32 px | Cursiva en la palabra clave ("*together.*") |
| Título de tarjeta | Playfair Display 500 | 28 → 24 px | |
| Rol / cursivas | Playfair Display 400 italic | 24 → 20 px | Palabra clave en `--accent-text` |
| Texto grande | Geist 400 | 18 px / 1.6 | Subtítulo del hero |
| Texto | Geist 400 | 15 px / 1.6 | |
| Texto pequeño | Geist 400 | 13 px / 1.5 | |
| Etiqueta mono | JetBrains Mono 500 | 12 px, `0.04em` | Fechas, chips, metadatos |
| Etiqueta mono mayúsculas | JetBrains Mono 600 | 11 px, `0.08em`, mayúsculas | Cabecera de celda |

Uso de tamaños con `clamp()` entre los dos extremos.

## Etiquetas técnicas (estilo "telemetría")
Cada celda lleva una cabecera mono en mayúsculas con el formato `SECCIÓN // DETALLE` (p. ej. `EXPERIENCE // TIMELINE`, `SYS_01 // COMMERCIAL PLATFORM`, `NOW · OCT 2026`).
- **Solo datos reales.** Prohibido inventar métricas decorativas (latencia, altitud, coordenadas, "3+ years", "live on production" si no aplica).
- Una etiqueta secundaria a la derecha es opcional y también debe ser verdadera (p. ej. `LINKEDIN ↗`, `2 PROJECTS`).
- Las etiquetas se traducen en ES.

## Layout
- Contenedor máximo 1280 px; márgenes 48 px escritorio, 20 px móvil.
- Bento con `grid-template-areas` (ver `docs/app-flow.md`): 4 columnas ≥ 1024 px, 2 columnas 640–1023 px, 1 columna < 640 px. Gap 24 px escritorio, 16 px móvil.
- Orden del DOM = orden visual. Nunca `order` ni `grid-auto-flow: dense`.
- Espaciado en escala de 4: 4, 8, 16, 24, 40, 48 px.

## Formas y profundidad
- Celdas: radio 24 px, borde 1 px `--border`, fondo `--surface`, padding 40 px (24 px en móvil).
- Botones, marcos de captura y contenedores internos: radio 12 px.
- Chips, badges, contenedores de icono (36 × 36 px): radio 8 px; puntos de estado circulares.
- Sin sombras en reposo. La profundidad viene de capas tonales (`--bg` → `--surface` → `--surface-2`).

## Componentes
- **Encabezado**: logo `juan.posada` en mono con punto de acento; enlaces de navegación; selector EN/ES tipo píldora segmentada; botón de tema circular. Sin avatar en el encabezado.
- **Botón primario**: fondo `--accent`, texto `--on-accent` Geist 600 15 px, padding 12 × 24 px, alto mínimo 44 px, icono opcional a la izquierda.
- **Botón secundario**: transparente, borde `--border-2`, texto `--text`; hover: fondo `--surface-2` y borde `--accent-text`.
- **Cabecera de celda**: etiqueta mono a la izquierda, etiqueta secundaria opcional a la derecha, título serif debajo.
- **Tarjeta de proyecto**: cabecera → marco de navegador con captura real (barra con 3 puntos y URL) → título serif → meta en cursiva → bloque P/A/R en `--surface-2` con icono en contenedor y etiqueta mono de color (Problema, Acción, Resultado) → chips de stack → `VIEW CASE →`.
- **Línea de tiempo** (experiencia): icono en contenedor, rol en serif, empresa y fechas en mono `--accent-text`, una línea de descripción.
- **Cómo pienso**: 3 subtarjetas en `--surface-2` con icono, `01 / DISSECT`, título serif en cursiva y texto pequeño.
- **Skills**: chips 2 × 4 con icono monocromo de la tecnología + nombre; línea "Also worked with" en texto pequeño; listas de "Aprendiendo" y "Business skills" con icono de línea.
- **Contacto**: celda completa con título serif grande, párrafo, correo en chip mono con botón de copiar (requiere JS: decidir en su spec), botones a la derecha.
- **Badge**: mono mayúsculas 11 px, fondo `--surface-2`, punto o icono de acento.
- **`[PENDIENTE]`**: borde discontinuo `--pending`, mono 12 px; nunca llega a producción.

## Iconos
Lucide (línea, 1.75 px de trazo) para la interfaz y Simple Icons monocromos para tecnologías; SVG inline en build, `currentColor`, 16–20 px, `aria-hidden` cuando acompañan texto.

## Movimiento
- Hover de celdas enlazadas: borde a `--accent-text` y `translateY(-1px)`, 200 ms `ease`. **Sin glow.**
- Hover de botón primario: `--accent-hover` y `translateY(-1px)`.
- Foco: anillo de 2 px `--accent-text` con 3 px de separación, siempre visible con `:focus-visible`.
- Entrada escalonada suave de las celdas (opacidad + 8 px), View Transition tarjeta → caso.
- Todo bajo `prefers-reduced-motion: no-preference`.

## Accesibilidad
WCAG 2.2 AA: contraste 4.5:1 en texto y 3:1 en bordes de foco e iconos informativos; objetivos ≥ 44 px; `lang` por página; texto alternativo real en capturas; la foto de Juan (real, no generada) con `alt` descriptivo.

## Qué NO tomar de Stitch
Inter (reemplazada por Geist), glow azul en hover, métricas y textos inventados, foto generada, avatar en el encabezado, `PostgreSQL · Docker` en skills, "English B1 Technical" (se escribe "English B1"), Tailwind y el CSS generado.
