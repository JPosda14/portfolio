# 005 — Cómo pienso, "Ahora" y contacto

## Por qué
La home ya dice quién es Juan, qué ha construido y qué sabe usar, pero no **cómo trabaja** ni **cómo contactarlo** al terminar de leer. "Cómo pienso" diferencia a Juan de otros perfiles junior (documenta antes de programar y usa la IA con método). "Ahora" muestra que el sitio está vivo y qué busca hoy. El contacto cierra la página con una acción clara para el reclutador y para el cliente freelance.

## Alcance
- Celda **Cómo pienso** con 3 pasos (número, nombre corto, título y texto breve).
- Celda **Ahora** con un texto corto y su fecha; se oculta si la fecha tiene más de 90 días.
- Celda **Contacto** a lo ancho: título, párrafo, correo, Cal.com, CV del idioma, LinkedIn, GitHub e idiomas.
- Distribución final del bento según `docs/app-flow.md`.
- Textos en archivos de contenido EN y ES.

## Fuera de alcance
Formulario de contacto; página de privacidad y su enlace en el pie (spec 006); reconstrucción automática del sitio para que "Ahora" se oculte sin publicar de nuevo (fase de despliegue); animación de entrada de las celdas (spec 006).

## Requisitos (EARS)
**Cómo pienso**
- RF1: EL SISTEMA mostrará una celda "Cómo pienso" con 3 pasos en orden, cada uno con número y nombre corto (p. ej. "01 / ENTENDER"), título y una o dos frases.
- RF2: EL SISTEMA presentará los iconos de los pasos como decorativos; el contenido de cada paso será texto visible.

**Ahora**
- RF3: MIENTRAS la fecha de "Ahora" tenga 90 días o menos en el momento de construir el sitio, EL SISTEMA mostrará la celda con su texto y la fecha en el formato del idioma.
- RF4: SI la fecha de "Ahora" tiene más de 90 días, ENTONCES EL SISTEMA no mostrará la celda y la foto ocupará su espacio, sin huecos.
- RF5: SI la fecha de "Ahora" no es válida, ENTONCES EL SISTEMA fallará el build indicando el valor.

**Contacto**
- RF6: EL SISTEMA mostrará una celda de contacto con título, un párrafo que diga para qué escribir (empleo remoto y proyectos freelance) y el correo de Juan como enlace `mailto`.
- RF7: EL SISTEMA ofrecerá en la celda de contacto: agendar llamada (Cal.com), descargar el CV del idioma de la página, LinkedIn y GitHub; los enlaces externos se abren en una pestaña nueva y lo anuncian a los lectores de pantalla.
- RF8: EL SISTEMA mostrará los idiomas de Juan en la celda de contacto.
- RF9: EL SISTEMA hará que la celda de contacto sea el destino del enlace "Contacto" del encabezado.
- RF10: EL SISTEMA no publicará número de teléfono ni formulario.

**Distribución y calidad**
- RF11: EL SISTEMA ordenará la home así: hero, foto, Ahora, proyectos, experiencia, cómo pienso, uso diario, aprendiendo, business, contacto; el orden de lectura será igual al visual, sin huecos ni desbordes en escritorio, tablet y móvil.
- RF12: EL SISTEMA obtendrá todos los textos nuevos de los archivos de contenido de cada idioma, con las mismas claves en EN y ES.
- RF13: EL SISTEMA no enviará JavaScript nuevo ni hará peticiones a otros dominios.
- RF14: EL SISTEMA mantendrá Lighthouse ≥ 95 × 4 y ninguna infracción de axe en ambas homes y ambos temas.

## Criterios de aceptación
- En `/` y `/es/`: "Cómo pienso" con 01, 02 y 03 en orden; "Ahora" con su texto y "Nov 2026" / "nov 2026"; contacto con correo, Cal.com, CV del idioma, LinkedIn, GitHub e idiomas.
- Con una fecha de "Ahora" de hace 91 días, la celda no existe y la foto llena su lugar (probado sobre la función de vencimiento y la distribución).
- Una fecha mal escrita en "Ahora" hace fallar el build con el valor en el mensaje.
- "Contacto" en el encabezado lleva a la celda de contacto.
- 1280 / 768 / 375 px sin huecos ni scroll horizontal, en el orden de RF11.
- Ningún teléfono, ningún `<form>`, un solo script (el del tema) y ninguna petición externa.
- Tests en verde (escritorio y móvil, EN y ES, ambos temas) y Lighthouse ≥ 95 × 4.

## Borradores de contenido (Juan los revisa con la spec)
**Cómo pienso** (basado en cómo trabaja hoy: SDD, IA con método, tests primero)
| Paso | ES | EN |
| --- | --- | --- |
| 01 | **ENTENDER** · *Primero el problema* · Pregunto hasta entender qué duele y cómo se medirá el éxito, antes de elegir tecnología. | **UNDERSTAND** · *Problem first* · I ask until I understand what hurts and how success will be measured, before choosing any technology. |
| 02 | **ESPECIFICAR** · *Documentar antes de programar* · Escribo requisitos verificables y un plan; la IA trabaja sobre esa especificación, no sobre suposiciones. | **SPECIFY** · *Write it down before coding* · I write testable requirements and a plan; AI works from that spec, not from guesses. |
| 03 | **VERIFICAR** · *Probar y medir* · Tests primero, accesibilidad y rendimiento medidos; nada está terminado sin evidencia. | **VERIFY** · *Test and measure* · Tests first, accessibility and performance measured; nothing is done without evidence. |

**Ahora** (fecha 2026-11-04)
- ES: "Buscando un rol remoto full-stack. Aprendiendo Astro y desarrollo con agentes de IA."
- EN: "Looking for a remote full-stack role. Learning Astro and AI-agent development."

**Contacto**
- ES: título "Construyamos algo *juntos.*" · párrafo "Busco un rol remoto full-stack y acepto proyectos freelance. Escríbeme o agenda una llamada de 30 minutos."
- EN: título "Let's build something *together.*" · párrafo "I'm looking for a remote full-stack role and I take freelance projects. Email me or book a 30-minute call."

## Preguntas abiertas
1. **Botón de copiar el correo**: necesita JavaScript (prohibido salvo aprobación). Recomendación: **no** en esta spec; el correo queda como enlace `mailto` y texto seleccionable. Se puede añadir después con `/sdd-change` si hace falta.
2. **Duración de la llamada**: el borrador dice "30 minutos"; confirmar que coincide con el evento de Cal.com.

## Decisiones (aprobadas por Juan, 2026-11-04)
1. Sin botón de copiar el correo: solo enlace `mailto` y texto seleccionable.
2. Borradores de contenido aprobados tal como están.

**Estado: aprobada (modo ligero: spec + plan + tareas).**
