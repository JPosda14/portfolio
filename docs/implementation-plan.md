# Plan de implementación (macro)

Juan quiere ver el sitio pronto y llenarlo después: las specs construyen la estructura completa con datos del CV y marcadores `[PENDIENTE]`; el contenido real de cada caso se escribe aparte (ver "Contenido").

## Antes de las specs
- Fase 2 — Arnés: git + repo público, AGENTS.md, CLAUDE.md, MEMORY.md, comandos `/sdd-*`, MCP (Context7 y navegador de pruebas).
- Fase 3 — Identidad visual: `DESIGN.md` y prototipo de la home aprobado.

## Orden de specs
1. **001-base** — proyecto Astro, tokens de `DESIGN.md`, layout, encabezado/pie, i18n EN/ES con hreflang, tema claro/oscuro, guarda de `[PENDIENTE]`, tests y Lighthouse CI.
2. **002-hero** — hero, foto/ubicación, CTAs (proyectos, CV, Cal.com).
3. **003-proyectos** — colección de proyectos, tarjetas del bento (escala 2→5), página de caso con View Transition.
4. **004-experiencia-y-skills** — celda de experiencia y celdas de skills con iconos.
5. **005-contacto-y-cierre** — cómo pienso, "Ahora" con vencimiento, contacto e idiomas.
6. **006-pulido-y-privacidad** — página de privacidad, 404, OG images, micro‑interacciones finales.

Después: Fase 5 (verificación y Cyber Neo) y Fase 6 (Cloudflare, dominio, publicación).

## Dependencias entre specs
- 001 bloquea todas.
- 003 depende de 002 (grid de la home).
- 004 y 005 dependen de 001 y pueden ir en cualquier orden tras 003.
- 006 va al final.

## Contenido (paralelo, conversaciones dedicadas)
- Caso Colchones Posada · Caso Proyecto Nuclear · foto · CV PDF EN/ES · texto "Cómo pienso" · revisión del inglés.
- No se publica mientras quede algún `[PENDIENTE]`.

## Hito de revisión humana
Al cerrar cada spec: Juan revisa diff, prueba en navegador (escritorio y móvil, EN y ES) y aprueba antes de la siguiente.
