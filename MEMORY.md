# MEMORY.md — Portafolio

## Estado actual
- Fase 0 (investigación + entrevista) y Fase 1 (documentos) aprobadas.
- Fase 2 (arnés) completa: AGENTS.md, skill `sdd`, comandos `/sdd-*`, Context7 en `.mcp.json` (proyecto, sin key).
- Fase 3 con Stitch: export en design/stitch/, referencias en design/references/, sistema consolidado en docs/DESIGN.md (pendiente de aprobación). Prototipo HTML propio en design/prototype/ solo como referencia.
- Navegador de pruebas: el integrado de la app (sin Playwright MCP); Playwright solo como dependencia de tests.
- Repo público: https://github.com/JPosda14/portfolio (rama main).

## Decisiones (y por qué)
- Astro 7 + CSS propio: cero JS y señal técnica de CSS (docs/research/03).
- `/` en inglés, `/es` en español: el reclutador no pierde un clic eligiendo idioma.
- Cloudflare + `juanposada.dev`: gratis y permite anunciar servicios (Vercel Hobby no).
- Contacto sin formulario (mailto + Cal.com): sin backend ni obligaciones de la Ley 1581.
- Sin cifra clave en el hero hasta tener más proyectos o métricas reales.
- Estructura primero con datos del CV y `[PENDIENTE]`; contenido real de cada caso después.
- Investigación con búsqueda integrada y subagentes, uno por tema: Perplexity es de pago.
- La guía personal de workflow queda fuera del repo público (.gitignore).
- Diseño: Playfair Display + Geist (no Inter) + JetBrains Mono, azul #0047FF, oscuro por defecto; etiquetas mono "telemetría" solo con datos reales; hover sin glow.

## Aprendizajes de Stitch
- Stitch inventa contenido (proyectos, cifras, foto, correo): tomar solo el estilo.

## Aprendizajes y errores a evitar
- Lanzar varios subagentes de investigación a la vez no le gustó a Juan: un tema por vez y revisar.

## Próximos pasos
- Fase 3: identidad visual y DESIGN.md.
- Pendiente de decidir: analítica (Cloudflare vs Umami).
