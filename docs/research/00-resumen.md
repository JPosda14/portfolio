# Resumen de la investigación (Fase 0.2)

Detalle y fuentes en los archivos 01–04 de esta carpeta. Las cifras de reclutamiento son consenso de practicantes, no estudios.

## Decisiones aprobadas
- **Stack:** Astro 7 estático + TypeScript, MDX por proyecto e idioma, CSS moderno propio (sin Tailwind), cero JS por defecto. (03)
- **Idiomas:** ES/EN con rutas `/es` y `/en`; `/` es selector estático `x-default`, sin redirecciones. (03)

- **Hosting:** Cloudflare (Workers static assets / Pages), 0 USD. Vercel Hobby descartado por uso no comercial. (04)
- **Contacto:** `mailto` + LinkedIn + GitHub + CV + Cal.com gratis para clientes; sin formulario en v1. (04)
- **Dominio:** .com o .dev en Cloudflare Registrar (~10–12 USD/año). (04)
- **Legal:** página breve de privacidad ES/EN; si se agrega formulario, autorización + política (Ley 1581). (04)

## Pendiente de decidir
- **Analítica:** Cloudflare Web Analytics; Umami Cloud Hobby si se quieren medir clics en CTA. (04)

## Contenido (01)
- Hero: frase de valor + a quién ayudas + cifra real + CTA doble (equipos / clientes) + disponibilidad.
- 3–5 proyectos con demo viva; solo los 2–3 mejores con caso completo (problema, enfoque, retos, resultado, qué harías distinto). Rol claro en proyectos de equipo. Sin cifras inventadas.
- Skills: icono + nombre enlazado a un proyecto; categorías uso diario / aprendiendo / business.

## Diseño (02)
- Bento solo en la home; casos en páginas propias con `@view-transition`.
- Orden del DOM = orden de importancia; `grid-template-areas`, sin `order` ni `dense`.
- Evitar look de plantilla IA: morado/índigo, Inter por defecto, glassmorphism, sombra única repetida.
- Micro-interacciones solo CSS, bajo `prefers-reduced-motion`.
- Boceto de la home en 02, sección "Recomendaciones".

## Por verificar más adelante
- Soporte en caniuse de view transitions entre páginas, scroll-driven animations, `light-dark()`, `subgrid` (Fase 4).
- Fonts API de Astro estable o experimental (Context7, Fase 2).
- Galerías de diseño que no se pudieron abrir: bentogrids.com, godly.website, CSS Design Awards (Fase 3, a mano).
- Términos específicos de Cloudflare Pages/Workers; RNBD en la SIC.
