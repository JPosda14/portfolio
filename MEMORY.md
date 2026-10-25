# MEMORY.md — Portafolio

## Estado actual
- Fase 0 (investigación + entrevista) y Fase 1 (documentos) aprobadas.
- Fase 2 (arnés) completa: AGENTS.md, skill `sdd`, comandos `/sdd-*`, Context7 en `.mcp.json` (proyecto, sin key).
- Fase 3 aprobada y en commit (docs/DESIGN.md). Referencias de Pinterest solo locales (.gitignore). Commits sin push desde f50986c.
- Fase 4: 001-base aprobada (spec, plan, tareas). T1 hecha: Astro 7.4.2, @astrojs/sitemap 3.7.4, @astrojs/check 0.9.12, TypeScript 6.0.3; dev: Playwright, axe, @lhci/cli (versiones exactas en package.json). Siguiente: T2.
- `npm audit`: 0 vulnerabilidades en producción; 16 en dev, todas vía @lhci/cli (no se publica). Revisar al actualizar lhci.
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
- Una corrección masiva con PowerShell 5.1 corrompió tildes (lee sin BOM como ANSI); se reparó. Editar archivos solo con las herramientas de archivo.
- `node --test` necesita un glob (`tests/unit/**/*.test.mjs`), no una carpeta.

## Próximos pasos
- 001-base: T2 a T10, luego /sdd-validate 001-base.
- Pendiente de decidir: analítica (Cloudflare vs Umami).
