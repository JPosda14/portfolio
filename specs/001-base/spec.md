# 001 — Base del sitio

## Por qué
Todas las demás specs necesitan una base común: páginas en dos idiomas, el sistema de diseño aplicado, encabezado y pie, tema claro/oscuro y las puertas de calidad (pruebas, accesibilidad, rendimiento y bloqueo de contenido pendiente). Sin esto, cada sección se construiría sobre supuestos distintos.

## Alcance
- Home en inglés y en español con encabezado, zona principal vacía preparada para el bento y pie.
- Selector de idioma, botón de tema y navegación del encabezado.
- Tokens de color, tipografía, espaciado y formas de `docs/DESIGN.md` disponibles para todo el sitio.
- Metadatos SEO básicos por página e idioma, hreflang y sitemap.
- Página 404 bilingüe.
- Bloqueo de publicación si queda contenido `[PENDIENTE]`.
- Pruebas automáticas, accesibilidad y medición de rendimiento listas para las siguientes specs.

## Fuera de alcance
Celdas del bento (hero, proyectos, experiencia, skills, contacto), páginas de caso, página de privacidad, imágenes OG, analítica y despliegue.

## Requisitos (EARS)
**Idiomas y rutas**
- RF1: EL SISTEMA servirá la home en inglés en la raíz y en español bajo el prefijo de idioma español.
- RF2: EL SISTEMA declarará en cada página el idioma de su contenido y enlaces alternos recíprocos entre las versiones EN y ES, más una alternativa por defecto que apunte a la versión en inglés.
- RF3: CUANDO el visitante use el selector de idioma, EL SISTEMA lo llevará a la misma página en el otro idioma.
- RF4: EL SISTEMA no redirigirá automáticamente según el idioma del navegador.
- RF5: EL SISTEMA obtendrá todos los textos visibles de los archivos de contenido de cada idioma, nunca de los componentes.
- RF6: SI falta la traducción de un texto en algún idioma, ENTONCES EL SISTEMA fallará la compilación indicando la clave que falta.

**Encabezado y pie**
- RF7: EL SISTEMA mostrará en todas las páginas un encabezado con el logo (enlace a la home del idioma actual), enlaces a Proyectos, Experiencia y Contacto, el selector de idioma y el botón de tema.
- RF8: EL SISTEMA mostrará en todas las páginas un pie con el año, el enlace a la privacidad y el enlace al código del portafolio.
- RF9: EL SISTEMA ofrecerá un enlace "saltar al contenido" como primer elemento enfocable de cada página.

**Tema**
- RF10: EL SISTEMA usará el tema oscuro por defecto y respetará la preferencia de color del sistema operativo del visitante.
- RF11: CUANDO el visitante use el botón de tema, EL SISTEMA alternará entre claro y oscuro y recordará la elección en visitas posteriores.
- RF12: EL SISTEMA aplicará el tema elegido antes de pintar la página, sin parpadeo del tema contrario.
- RF13: SI el navegador no ejecuta scripts, ENTONCES EL SISTEMA seguirá la preferencia del sistema y todo el contenido seguirá accesible.

**Sistema de diseño**
- RF14: EL SISTEMA aplicará los colores, tipografías, espaciados, radios y estados de foco definidos en `docs/DESIGN.md`, en ambos temas.
- RF15: EL SISTEMA servirá sus propias fuentes, sin peticiones a servicios de terceros.
- RF16: MIENTRAS el visitante tenga activada la preferencia de movimiento reducido, EL SISTEMA no animará ningún elemento.

**SEO y errores**
- RF17: EL SISTEMA incluirá en cada página título, descripción y URL canónica propios de su idioma.
- RF18: EL SISTEMA generará un sitemap con todas las páginas y sus alternativas de idioma.
- RF19: CUANDO se solicite una ruta inexistente, EL SISTEMA mostrará una página 404 bilingüe con enlaces a ambas homes.

**Calidad**
- RF20: SI algún contenido contiene el marcador `[PENDIENTE]`, ENTONCES EL SISTEMA fallará la compilación de producción indicando dónde está; en desarrollo lo mostrará resaltado.
- RF21: EL SISTEMA no enviará JavaScript al navegador salvo el script del tema.
- RF22: EL SISTEMA alcanzará puntuación ≥ 95 en rendimiento, accesibilidad, buenas prácticas y SEO en móvil, en ambas homes.
- RF23: EL SISTEMA no presentará infracciones de accesibilidad detectables automáticamente en ninguna página, en ambos temas.

## Criterios de aceptación
- `/` muestra la home en inglés con `lang="en"`; `/es/` la muestra en español con `lang="es"`.
- En la home EN, el selector lleva a `/es/` y viceversa; ambas páginas tienen hreflang `en`, `es` y `x-default`.
- Con el sistema en modo claro y sin elección previa, el sitio se ve claro; sin preferencia, se ve oscuro; tras pulsar el botón y recargar, se mantiene el tema elegido, sin destello.
- Con JavaScript desactivado, la página carga completa y sigue la preferencia del sistema.
- Tab desde el inicio enfoca primero "saltar al contenido" y luego los controles del encabezado, todos con foco visible.
- Añadir `[PENDIENTE]` a un texto hace fallar la compilación de producción con un mensaje que indica el archivo.
- Quitar una clave de traducción del archivo ES hace fallar la compilación.
- Una ruta inexistente devuelve la 404 bilingüe.
- Las pruebas automáticas pasan en escritorio y móvil, EN y ES, tema claro y oscuro.
- Lighthouse móvil ≥ 95 en las 4 categorías para `/` y `/es/`.
- Revisión en navegador: encabezado y pie se ven según `docs/DESIGN.md` en 1280 px, 768 px y 375 px, en ambos temas.

## Decisiones (antes preguntas abiertas, aprobadas por Juan)
1. Las rutas en español se traducen (`/es/proyectos/…`), como en `app-flow.md`.
2. Las anclas de Proyectos, Experiencia y Contacto se crean vacías en la home desde esta spec.
3. El enlace a privacidad del pie queda oculto hasta la spec 006 (RF8 se cumple sin él por ahora).
4. La elección de tema se guarda en almacenamiento local del navegador (no cookie), sin aviso; se menciona en la página de privacidad.

**Estado: aprobada.**
