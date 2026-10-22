# PRD — Portafolio de Juan Andrés Posada

## Resumen
Landing page personal bilingüe (EN/ES) que vende a Juan como Ingeniero de Software full‑stack con enfoque en IA, mostrando cómo identifica problemas y construye soluciones.

## Problema y usuario
- **Reclutador / hiring manager remoto** (principal): decide en segundos si el perfil encaja. Necesita ver rol, evidencia (proyectos y experiencia), stack y una forma directa de contactar o descargar el CV.
- **Cliente freelance** (secundario): pequeño negocio que necesita una web o automatización. Necesita entender qué problema le resuelve Juan y agendar una llamada.
- Hoy Juan solo tiene CV y LinkedIn: no hay un lugar que muestre cómo piensa ni sus proyectos con contexto.

## Objetivos y métricas de éxito
- En 10 s, el visitante entiende rol, enfoque y cómo contactar (CTA visible sin scroll en móvil y escritorio).
- Lighthouse ≥95 en las 4 categorías (móvil), WCAG 2.2 AA.
- Contenido real añadible sin tocar código (archivos MDX).
- Tras lanzar: medir visitas y, si se decide analítica de eventos, clics en CTA / CV / Cal.com.

## Funcionalidades
- **F1 Base bilingüe** · alta · `/` en inglés, `/es` en español, selector en el encabezado, hreflang, SEO base, tema claro/oscuro · → spec 001
- **F2 Hero** · alta · nombre, rol, subtítulo de valor, disponibilidad (remoto, Armenia CO, UTC‑5), CTA doble (equipos: ver trabajo / CV; clientes: agendar), foto y ubicación · → spec 002
- **F3 Proyectos** · alta · bento con 2 proyectos (Colchones Posada, Proyecto Nuclear) que escala a 5; página de caso por proyecto (Problema → Acción → Resultado, decisiones técnicas, rol, media) · → spec 003
- **F4 Experiencia** · alta · celda compacta: Mirus Smart Solutions e INSTALAAB, enlace a LinkedIn · → spec 004
- **F5 Skills** · media · iconos por categoría: uso diario, "también he trabajado con", aprendiendo, business skills · → spec 004
- **F6 Cómo pienso** · media · proceso de trabajo (documentar antes de programar, IA con método) · → spec 005
- **F7 Contacto** · alta · correo, LinkedIn, GitHub, Cal.com, CV PDF ES/EN, idiomas · → spec 005
- **F8 Celda "Ahora"** · baja · texto con fecha; se oculta si tiene más de 90 días · → spec 005
- **F9 Privacidad y pulido** · media · página de privacidad ES/EN, 404, imágenes OG, micro‑interacciones · → spec 006

## Fuera de alcance (v1)
Blog, formulario de contacto, cifra clave en el hero, CMS, el portafolio como caso de estudio, teléfono o WhatsApp públicos, analítica con cookies.

## Riesgos y supuestos
- Poco contenido real al inicio → el diseño debe verse completo con 2 proyectos; los textos faltantes se marcan `[PENDIENTE]` y bloquean la publicación.
- Inglés B1 → Claude redacta EN y Juan revisa; idioma visible con honestidad.
- Colchones Posada tiene detalles por corregir (precios, cobertura, redacción) y un dashboard sin endurecer → no se muestra el dashboard ni datos.
- El titular dice "IA": se respalda con la experiencia de automatización en Mirus y futuros proyectos.
