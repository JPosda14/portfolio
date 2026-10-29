# 004 — Experiencia y skills

## Por qué
Hoy la evidencia más sólida de Juan es su experiencia laboral: Mirus Smart Solutions (AWS serverless, Flutter, automatización con IA) e INSTALAAB (plataforma web completa con SEO). Sin una celda de experiencia, el reclutador no la ve, y las skills "React" y "AWS" del portafolio quedarían sin respaldo. Las skills deben mostrar qué usa Juan hoy, qué está aprendiendo (curiosidad) y qué sabe más allá del código (business skills), sin barras de porcentaje.

## Alcance
- Celda **Experiencia** en el bento: cada trabajo con rol, empresa, fechas y un logro en una línea; enlace a LinkedIn.
- Celdas de **skills**: "Uso a diario" (con la línea "También he trabajado con"), "Aprendiendo" y "Business skills", con iconos minimalistas.
- Textos en archivos de contenido EN y ES.

## Fuera de alcance
"Cómo pienso", "Ahora" y contacto (spec 005); enlazar cada skill a un proyecto donde se usó (mejora posterior); páginas de detalle por trabajo.

## Requisitos (EARS)
**Experiencia**
- RF1: EL SISTEMA mostrará en la home una celda de experiencia con cada trabajo en orden cronológico inverso: rol, empresa, periodo y un logro en una línea.
- RF2: EL SISTEMA expresará los periodos en el formato de fecha del idioma de la página (p. ej. "Sep 2025 – Jan 2026" / "sep 2025 – ene 2026").
- RF3: EL SISTEMA ofrecerá en la celda un enlace al perfil de LinkedIn de Juan que se abre en una pestaña nueva y lo anuncia a los lectores de pantalla.
- RF4: EL SISTEMA hará que la celda de experiencia sea el destino del enlace "Experiencia" del encabezado.

**Skills**
- RF5: EL SISTEMA mostrará la categoría "Uso a diario" con Java, Spring Boot, Flutter, Python, TypeScript, Next.js, Supabase y Git, cada una con su icono monocromo y su nombre.
- RF6: EL SISTEMA mostrará debajo de "Uso a diario" la línea "También he trabajado con: React · AWS serverless (Lambda, API Gateway, DynamoDB, Cognito)".
- RF7: EL SISTEMA mostrará la categoría "Aprendiendo" con desarrollo con agentes de IA (Claude Code), Spec-Driven Development y Astro.
- RF8: EL SISTEMA mostrará la categoría "Business skills" con SEO básico, UX/UI, automatización de procesos (Make), Scrum y CI y pruebas unitarias, cada una con un icono de línea.
- RF9: EL SISTEMA no mostrará barras, porcentajes ni niveles numéricos de dominio.
- RF10: EL SISTEMA presentará los iconos como decorativos (ocultos a lectores de pantalla); el nombre de cada skill será siempre texto visible.

**Distribución y calidad**
- RF11: EL SISTEMA colocará experiencia y skills después de los proyectos, en el mismo bento, sin huecos ni desbordes en escritorio, tablet y móvil, con el orden de lectura igual al visual.
- RF12: EL SISTEMA obtendrá todos los textos de experiencia y skills de los archivos de contenido de cada idioma, con las mismas claves en EN y ES.
- RF13: EL SISTEMA no enviará JavaScript nuevo ni hará peticiones a otros dominios para los iconos.
- RF14: EL SISTEMA mantendrá Lighthouse ≥ 95 × 4 y ninguna infracción de axe en ambas homes y ambos temas.

## Criterios de aceptación
- En `/` y `/es/` aparece la celda de experiencia con INSTALAAB (2025–2026) y luego Mirus (2023–2025), con su logro; "LinkedIn" abre el perfil en otra pestaña.
- "Experiencia" en el encabezado lleva a esa celda.
- Las tres categorías de skills muestran exactamente las skills listadas, con icono y nombre, en EN y ES; la línea "También he trabajado con" está bajo "Uso a diario".
- Ningún elemento con rol `progressbar` ni texto con `%` en las celdas de skills.
- Los iconos son SVG en el propio HTML con `aria-hidden="true"`; no hay peticiones externas.
- 1280 / 768 / 375 px sin huecos ni scroll horizontal; orden: hero, foto, proyectos, experiencia, skills.
- Tests en verde (escritorio y móvil, EN y ES, ambos temas) y Lighthouse ≥ 95 × 4.

## Decisiones (aprobadas por Juan)
1. Distribución provisional: `experiencia (2 col) | uso diario (2 col)` / `aprendiendo (2 col) | business (2 col)`; la spec 005 reacomoda al diseño final con "Cómo pienso".
2. Logros (del CV, sin cifras):
   - INSTALAAB SAS · Desarrollador Web · sep 2025 – ene 2026: "Plataforma web turística de punta a punta (WordPress + Elementor), con foco en UX, SEO básico y diseño responsivo."
   - Mirus Smart Solutions · Desarrollador Full Stack · ago 2023 – sep 2025: "Plataforma serverless en AWS, MVP móvil en Flutter y automatizaciones con Make + ChatGPT que eliminaron procesos manuales."
3. Icono de OpenJDK para Java; AWS sin icono (solo en la línea de texto).

**Estado: aprobada.**
