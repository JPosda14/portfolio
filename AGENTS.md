# AGENTS.md — Portafolio de Juan Andrés Posada
Landing page personal bilingüe (EN/ES) de un Ingeniero de Software full‑stack con enfoque en IA, para reclutadores remotos y clientes freelance.

## Stack y estructura
- Astro 7 estático, TypeScript estricto, CSS propio (sin Tailwind), MDX en content collections. Node 24, npm.
- docs/ (prd, trd, app-flow, design-brief, DESIGN.md, implementation-plan, constitution) · specs/NNN-*/ · src/content/ (todo el texto) · tests/

## Comandos
- Instalar: `npm install` · Correr: `npm run dev` · Build: `npm run build`
- Tests: `npm run check && npm test` · Lighthouse: `npm run lhci`

## Reglas
- Lee docs/constitution.md y la spec activa antes de tocar código. Flujo SDD con la skill `sdd` y los comandos `/sdd-*`.
- Para APIs de Astro y librerías, consulta Context7; no confíes en la memoria (Astro cambia entre versiones).
- Para la interfaz, sigue docs/DESIGN.md. Textos siempre en src/content/, en EN y ES.
- Código y commits en inglés (Conventional Commits); interfaz ES/EN; documentación en español.

## Trampas conocidas
- Windows: los MCP con npx se registran con `cmd /c npx ...`. PowerShell 5.1 lee archivos sin BOM como ANSI: edita con las herramientas de archivo, no con `Get-Content`/`Set-Content`.
- En `.claude/commands/` los argumentos posicionales empiezan en `$0`.
- Mensajes de commit con comillas dobles: escribirlos en un archivo y usar `git commit -F`, porque PowerShell 5.1 los parte.
- Orden del DOM = orden visual del bento: usa `grid-template-areas`, nunca `order` ni `grid-auto-flow: dense`.
- El único JS permitido es el script inline del tema; cualquier otro necesita aprobación.
- `[PENDIENTE]` marca contenido faltante: el build de producción debe fallar si queda alguno.

## Memoria
- Al empezar lee MEMORY.md; al terminar cada tarea, actualízalo (breve, sin secretos ni datos personales).

## Límites
- ✅ Siempre: tests primero, verificar EN y ES en escritorio y móvil, actualizar MEMORY.md, resumir cambios y decisiones.
- ⚠️ Pregunta antes: dependencias nuevas, JS en cliente, archivos fuera de la spec activa, commits y push.
- 🚫 Nunca: inventar cifras o logros, publicar teléfono, guardar secretos, saltarse una aprobación de fase.

## Verificación
- `npm run check && npm test` en verde + revisión en el navegador (escritorio y móvil, EN y ES) + `npm run lhci` ≥0.95 al cerrar cada spec.
