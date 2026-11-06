# 006 — Privacidad, vista al compartir y pulido

## Por qué
El sitio ya tiene todo su contenido, pero falta lo que lo hace publicable:
- **Página de privacidad.** Es lo que corresponde al tener el correo publicado y una base de contactos profesionales (Ley 1581). Además cierra el RF8 pendiente de la spec 001.
- **Vista previa al compartir el enlace.** Los reclutadores reciben el portafolio por LinkedIn, correo o WhatsApp. Hoy el enlace llega sin imagen ni descripción.
- **Pulido final** previsto en `docs/DESIGN.md`.

## Alcance
- Página de privacidad en EN (`/privacy/`) y ES (`/es/privacidad/`), con enlace en el pie de todas las páginas.
- Metadatos para compartir (Open Graph y tarjeta de X/LinkedIn) en todas las páginas indexables, con imagen propia por página y por idioma.
- Datos estructurados de persona en la home, para que buscadores asocien nombre, rol y perfiles.
- Pulido:
  - entrada suave de las celdas al aparecer en pantalla;
  - tamaño correcto de la foto en móvil;
  - color del navegador en móvil.

## Fuera de alcance
- Analítica con script en el cliente.
- Despliegue, dominio y reconstrucción programada: van en la fase de publicación.
- Formulario de contacto.

## Requisitos (EARS)
**Privacidad**
- RF1: EL SISTEMA ofrecerá una página de privacidad en cada idioma que diga:
  - qué datos se tratan: solo lo que el visitante envíe por correo o al agendar en Cal.com;
  - para qué se usan y cómo pedir su eliminación;
  - que no hay formularios, cookies ni analítica con scripts;
  - que la preferencia de tema se guarda solo en el navegador;
  - que los enlaces externos (Cal.com, LinkedIn, GitHub) tienen sus propias políticas;
  - la fecha de actualización.
- RF2: EL SISTEMA mostrará un enlace a la página de privacidad del idioma actual en el pie de todas las páginas.
- RF3: EL SISTEMA enlazará las dos versiones de la página de privacidad entre sí (selector de idioma, hreflang y sitemap).

**Compartir y buscadores**
- RF4: EL SISTEMA incluirá en cada página indexable título, descripción, URL canónica, idioma, tipo de página e imagen para compartir (Open Graph y tarjeta grande).
- RF5: EL SISTEMA usará una imagen de 1200 × 630 px por página y por idioma: home EN, home ES y cada caso de estudio, con el nombre, el rol o el título del proyecto y el estilo del sitio.
- RF6: SI una página indexable no tiene imagen para compartir, ENTONCES EL SISTEMA fallará el build indicando la página.
- RF7: EL SISTEMA describirá a Juan en la home con datos estructurados de persona: nombre, rol, ubicación, URL y perfiles de LinkedIn y GitHub.
- RF8: EL SISTEMA no incluirá metadatos para compartir en la página 404.

**Pulido**
- RF9: MIENTRAS el visitante no haya pedido reducir el movimiento, EL SISTEMA mostrará las celdas que están debajo del primer bloque con una entrada suave (opacidad y 8 px) al aparecer en pantalla, sin JavaScript. El hero y la foto se ven de inmediato.
- RF10: EL SISTEMA cargará la foto en móvil al tamaño en que se muestra.
- RF11: EL SISTEMA indicará al navegador móvil el color de fondo del tema oscuro.

**Calidad**
- RF12: EL SISTEMA no enviará JavaScript nuevo ni hará peticiones a otros dominios. Los datos estructurados son JSON y no se ejecutan.
- RF13: EL SISTEMA mantendrá Lighthouse ≥ 95 × 4 y ninguna infracción de axe en todas las páginas (incluida privacidad) y en ambos temas.

## Criterios de aceptación
- `/privacy/` y `/es/privacidad/` existen, se enlazan entre sí y aparecen en el sitemap. El pie de todas las páginas lleva a la del idioma actual.
- Las homes y los 4 casos tienen `og:title`, `og:description`, `og:url`, `og:image` (de 1200 × 630 y existente), `og:locale` y `twitter:card=summary_large_image`. La 404 no los tiene.
- Quitar la imagen de una página hace fallar el build con el nombre de la página.
- La home tiene un bloque JSON-LD `Person` válido con LinkedIn y GitHub en `sameAs`.
- Con movimiento reducido no hay animaciones. Sin él, las celdas bajo el primer bloque entran suavemente y el hero no se anima.
- En móvil la foto descarga la versión de 192 px.
- Tests en verde (escritorio y móvil, EN y ES, ambos temas) y Lighthouse ≥ 95 × 4, con LCP igual o mejor.

## Borrador del texto de privacidad (Juan lo revisa con la spec)
**ES — Privacidad**
- **Quién es el responsable:** Juan Andrés Posada Aleans, Armenia, Colombia, juanandresposadaaleans@gmail.com.
- **Qué datos trato:** solo los que tú me envíes por correo o al agendar una llamada en Cal.com (nombre, correo y lo que escribas).
- **Para qué:** responderte y hablar de oportunidades de trabajo o proyectos. No los vendo, no los comparto y no los uso para publicidad.
- **Lo que este sitio no hace:** no tiene formularios, no usa cookies y no tiene scripts de analítica ni de terceros. Solo guarda en tu navegador si elegiste el tema claro.
- **Alojamiento:** el proveedor de hosting puede registrar datos técnicos de acceso (como la IP) por seguridad y estadísticas agregadas.
- **Enlaces externos:** Cal.com, LinkedIn y GitHub tienen sus propias políticas de privacidad.
- **Tus derechos (Ley 1581 de 2012):** puedes pedir conocer, actualizar o eliminar tus datos escribiendo al correo de arriba.
- **Actualizado:** <fecha de publicación>.

**EN**: la misma información, traducida.

## Preguntas abiertas
1. **Analítica.** Recomendación: no poner analítica con script al lanzar. Cloudflare ya muestra estadísticas de tráfico del dominio sin script ni cookies. Así el sitio cumple la regla de "cero peticiones a terceros" y la privacidad queda simple. Si después se quiere medir clics en el CV o en Cal.com, se evalúa con `/sdd-change`.
2. **Datos estructurados.** Se añade un `<script type="application/ld+json">`. No es JavaScript ejecutable, pero los tests que hoy cuentan "un solo script" pasarán a contar solo scripts ejecutables.

## Decisiones (aprobadas por Juan, 2026-11-05)
1. Sin analítica con script al lanzar.
2. JSON-LD permitido; los tests cuentan solo scripts ejecutables.
3. Texto de privacidad aprobado tal como el borrador.

**Estado: aprobada (modo ligero: spec + plan + tareas).**
