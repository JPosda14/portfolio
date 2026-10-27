# 003 — Proyectos y casos de estudio

## Por qué
El reclutador no quiere "sabe programar", quiere ver que Juan identifica un problema y construye una solución. Cada proyecto debe contarse como un caso: problema, qué hizo, resultado y por qué decidió lo que decidió. Juan quiere la estructura completa ya, para después solo llenar el contenido real de cada proyecto; mientras tanto se usan textos e imágenes de ejemplo claramente marcados.

## Alcance
- Tarjetas de proyecto en el bento de la home, debajo del hero y la foto.
- Una página de caso de estudio por proyecto y por idioma.
- Contenido de cada proyecto en archivos propios (uno por proyecto e idioma), fácil de llenar sin tocar código.
- Dos proyectos iniciales: **Colchones Posada** y **Proyecto Nuclear de Grado**, con los datos reales conocidos (CV y revisión del sitio) y el resto como `[PENDIENTE]` con imágenes de ejemplo.
- Transición animada de la tarjeta a su caso, donde el navegador la soporte.

## Fuera de alcance
Video en los casos (se añade con `/sdd-change` cuando haya material), filtros o etiquetas, blog, experiencia y skills (spec 004), imágenes OG por caso (spec 006).

## Requisitos (EARS)
**Contenido**
- RF1: EL SISTEMA obtendrá cada proyecto de un archivo de contenido por idioma con: título, resumen de una línea, año, tipo (personal, familiar, académico, cliente, empresa), rol de Juan, equipo, stack, problema, acción, resultado, decisiones técnicas (cada una con la alternativa descartada y el porqué), imágenes con texto alternativo, enlaces opcionales (sitio en vivo, repositorio), orden y si es destacado.
- RF2: SI a un archivo de proyecto le falta un campo obligatorio o tiene un valor inválido, ENTONCES EL SISTEMA fallará la compilación indicando el archivo y el campo.
- RF3: SI un proyecto existe en un idioma y no en el otro, ENTONCES EL SISTEMA fallará la compilación indicando cuál falta.
- RF4: SI hay menos de 2 o más de 5 proyectos destacados, ENTONCES EL SISTEMA fallará la compilación.

**Tarjetas en la home**
- RF5: EL SISTEMA mostrará en la home, en el orden definido, una tarjeta por proyecto destacado con: etiqueta técnica real, captura en marco de navegador, título, tipo · año · rol, Problema / Acción / Resultado en una línea cada uno, chips del stack y "Ver caso".
- RF6: EL SISTEMA distribuirá las tarjetas en el bento sin huecos ni desbordes para cualquier cantidad entre 2 y 5, en escritorio, tablet y móvil, manteniendo el orden de lectura.
- RF7: CUANDO el visitante active una tarjeta, EL SISTEMA lo llevará a la página de caso de ese proyecto en el idioma actual.
- RF8: EL SISTEMA hará que la sección de proyectos sea el destino del enlace "Proyectos" del encabezado y de "Ver mi trabajo".

**Página de caso**
- RF9: EL SISTEMA servirá cada caso en `/projects/<slug>/` (inglés) y `/es/proyectos/<slug>/` (español), con hreflang recíproco, canónica, título y descripción propios, y el selector de idioma llevando al mismo caso en el otro idioma.
- RF10: EL SISTEMA mostrará en el caso: enlace de vuelta a los proyectos, título, ficha (tipo, año, rol, equipo, stack), Problema, Acción, Resultado, Decisiones técnicas, galería de imágenes, enlaces al sitio en vivo y al repositorio cuando existan, y una tarjeta al siguiente proyecto.
- RF11: SI un proyecto no tiene repositorio público o sitio en vivo, ENTONCES EL SISTEMA no mostrará ese enlace y, si el código es privado, lo dirá ("Código privado").
- RF12: EL SISTEMA servirá las imágenes de los casos en formatos modernos, con dimensiones declaradas, carga diferida fuera de la primera pantalla y sin saltos de diseño.
- RF13: CUANDO el visitante pase de una tarjeta a su caso en un navegador compatible, EL SISTEMA animará la captura y el título como una continuación; MIENTRAS esté activo el movimiento reducido o el navegador no lo soporte, la navegación será normal.

**Calidad**
- RF14: EL SISTEMA incluirá todas las páginas de caso en el sitemap con sus alternativas de idioma.
- RF15: EL SISTEMA marcará el contenido y las imágenes de ejemplo de forma que la compilación de publicación falle mientras existan (regla `[PENDIENTE]` de la spec 001).
- RF16: EL SISTEMA mantendrá Lighthouse ≥ 95 × 4 y ninguna infracción de axe en la home y en cada caso, en ambos idiomas y temas.

## Criterios de aceptación
- La home muestra Colchones Posada y Proyecto Nuclear lado a lado en 1280 px (2 × 2 cada uno), uno debajo del otro en 768 y 375 px; "Proyectos" y "Ver mi trabajo" llevan a esa sección.
- `/projects/colchones-posada/` y `/es/proyectos/colchones-posada/` (y los del Proyecto Nuclear) existen, se enlazan entre sí con el selector y aparecen en el sitemap con hreflang.
- Quitar el campo `problem` de un archivo o borrar la versión ES de un proyecto hace fallar la compilación con un mensaje que nombra el archivo.
- Colchones Posada muestra el enlace a `colchonesposada.lat`; el proyecto sin repositorio público muestra "Código privado" o no muestra el enlace.
- Las capturas se sirven en AVIF/WebP con `width`/`height`; las de la galería tienen `loading="lazy"`; CLS = 0.
- En Chrome, ir de la tarjeta al caso anima la captura; con `prefers-reduced-motion` no hay animación.
- Los textos e imágenes de ejemplo se ven resaltados en desarrollo y la compilación de publicación falla mientras existan.
- Tests en verde (escritorio y móvil, EN y ES, ambos temas); Lighthouse ≥ 95 × 4 en la home y en un caso por idioma.

## Decisiones (aprobadas por Juan)
1. Dos compilaciones: `npm run build` (publicación, bloquea `[PENDIENTE]`, sin cambios) y una compilación de prueba que permite y resalta `[PENDIENTE]`, usada por Playwright y Lighthouse.
2. Mismo slug en ambos idiomas; solo cambia el prefijo (`/projects/` ↔ `/es/proyectos/`): `colchones-posada` y `university-capstone`.
3. Capturas de ejemplo propias (marco de navegador + "Captura de ejemplo"), con texto alternativo `[PENDIENTE]`.
4. Datos conocidos, del CV, del sitio y de los repositorios públicos (revisados el 2026-10-27):
   - **Colchones Posada**: negocio familiar, 2026, diseño y desarrollo de punta a punta con documentación previa y prototipo aprobado por el dueño; Next.js 14, TypeScript, Tailwind, Supabase (con SQL/PLpgSQL), Vercel; catálogo con fichas y cotización por WhatsApp. Repositorio público: `github.com/JPosda14/colchones-posada`. Sitio: `colchonesposada.lat`.
   - **Proyecto Nuclear (CUE Event Manager)**: 2025, plataforma de gestión de eventos con microservicios (API gateway, auth, eventos, espacios, notificaciones, archivos, académico, descubrimiento, servicio de IA) y frontend en React 18 + Vite + TypeScript + Material UI + React Query + i18next; Scrum, equipo multidisciplinario; arquitectura inspirada en el modelo de Bancolombia; mejor proyecto del semestre. Organización con repositorios públicos: `github.com/cue-event-manager`.
   - Problema, resultado, decisiones y rol exacto de Juan en cada uno quedan `[PENDIENTE]`.
5. Ambos proyectos tienen código público: se enlaza el repositorio (Colchones Posada) y la organización (Proyecto Nuclear). "Código privado" queda disponible para proyectos futuros.

**Estado: aprobada.**
