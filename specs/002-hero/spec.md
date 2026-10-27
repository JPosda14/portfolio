# 002 — Hero, foto y llamadas a la acción

## Por qué
El reclutador decide en segundos si sigue leyendo. La primera pantalla debe decir quién es Juan, qué rol busca, qué problema resuelve, que está disponible y qué hacer a continuación (ver su trabajo, descargar el CV o agendar una llamada), con una foto real que genere confianza. También es el inicio del bento, así que fija la cuadrícula sobre la que se montan las specs 003–005.

## Alcance
- Cuadrícula bento de la home (4 / 2 / 1 columnas) con las dos primeras celdas: hero y foto + ubicación.
- Hero: línea de disponibilidad, nombre, rol con palabra clave destacada, subtítulo y tres llamadas a la acción.
- Celda de foto: foto real de Juan, ubicación e idiomas.
- CV en PDF por idioma y enlace a Cal.com.

## Fuera de alcance
Celda "Ahora" (spec 005), proyectos, experiencia, skills, contacto, imágenes OG, analítica de clics.

## Requisitos (EARS)
**Cuadrícula**
- RF1: EL SISTEMA organizará el contenido principal de la home en una cuadrícula de celdas según `docs/DESIGN.md`: 4 columnas en escritorio, 2 en tablet y 1 en móvil.
- RF2: EL SISTEMA mantendrá el mismo orden de lectura en el código y en pantalla en todos los tamaños.

**Hero**
- RF3: EL SISTEMA mostrará en el hero una línea de estado con disponibilidad, modalidad remota, ubicación y zona horaria.
- RF4: EL SISTEMA mostrará el nombre de Juan como encabezado principal de la página, el rol con la palabra clave "IA" / "AI" destacada y el subtítulo de valor.
- RF5: EL SISTEMA mostrará tres llamadas a la acción: "Ver mi trabajo" (principal), "Descargar CV" y "Agendar llamada".
- RF6: CUANDO el visitante active "Ver mi trabajo", EL SISTEMA lo llevará a la sección de proyectos de la misma página.
- RF7: CUANDO el visitante active "Descargar CV", EL SISTEMA entregará el CV en PDF del idioma de la página.
- RF8: CUANDO el visitante active "Agendar llamada", EL SISTEMA abrirá la página de Cal.com de Juan en una pestaña nueva y lo anunciará a los lectores de pantalla.
- RF9: MIENTRAS la pantalla sea de móvil (375 × 812), EL SISTEMA mostrará el nombre, el rol y la llamada principal sin necesidad de desplazarse.

**Foto y ubicación**
- RF10: EL SISTEMA mostrará una foto real de Juan con texto alternativo descriptivo, junto con su ubicación y sus idiomas ("Español nativo · Inglés B1").
- RF11: EL SISTEMA servirá la foto en formatos modernos y en el tamaño necesario para cada pantalla, sin provocar saltos de diseño al cargar.

**Calidad**
- RF12: EL SISTEMA obtendrá todos los textos del hero y de la foto de los archivos de contenido de cada idioma.
- RF13: SI falta el archivo de CV de algún idioma, ENTONCES EL SISTEMA fallará la compilación.
- RF14: EL SISTEMA mantendrá Lighthouse ≥ 95 en las 4 categorías y ninguna infracción de axe en ambas homes y ambos temas.
- RF15: EL SISTEMA no publicará el número de teléfono de Juan en ninguna página ni archivo descargable.

## Criterios de aceptación
- En `/` y `/es/` (escritorio 1280 px) el hero ocupa 2 × 2 celdas y la foto 2 × 2 a su derecha; en 768 px el hero ocupa todo el ancho y la foto debajo; en 375 px todo en una columna en el mismo orden.
- El `h1` es "Juan Andrés Posada"; el rol muestra "AI focus" / "enfoque en IA" en cursiva y color de acento.
- "Ver mi trabajo" lleva a `#projects` / `#proyectos`; "Descargar CV" descarga el PDF EN en `/` y el ES en `/es/`; "Agendar llamada" abre `cal.com/juan-andres-posada-aleans-nawip2` en otra pestaña con `rel="noopener"` y texto accesible que indica que abre una pestaña nueva.
- En 375 × 812 el `h1`, el rol y "Ver mi trabajo" están dentro de la primera pantalla.
- La foto se sirve en AVIF/WebP con `width` y `height`, no es diferida (está arriba) y CLS = 0.
- Ningún HTML ni PDF publicado contiene el teléfono.
- Tests en verde (escritorio y móvil, EN y ES, ambos temas) y Lighthouse ≥ 95 × 4.

## Decisiones (aprobadas por Juan)
1. Juan exporta una versión web del CV sin teléfono (ES y EN). Los PDF actuales con teléfono no se publican; hasta tener los nuevos, la compilación falla (RF13, RF15).
2. Se usa la foto enviada, recortada en cuadrado; se podrá reemplazar después cambiando un archivo.
3. Mientras no exista "Ahora" (spec 005), la foto ocupa 2 × 2.
4. Línea de estado: "Available · Remote · Armenia, CO (UTC‑5)" / "Disponible · Remoto · Armenia, CO (UTC‑5)" con punto verde.

**Estado: aprobada.**
