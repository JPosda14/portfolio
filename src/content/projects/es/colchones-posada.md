---
title: Colchones Posada
summary: Catálogo web y cotizaciones para la fábrica de colchones de mi familia en Armenia, Colombia.
year: 2026
kind: family
role: Diseño, desarrollo y despliegue
team: Proyecto individual
stack: [Next.js, TypeScript, Tailwind CSS, Supabase, Vercel]
problem: Una fábrica familiar con más de 15 años y sin empleados formales vendía solo por WhatsApp. El dueño respondía una y otra vez las mismas preguntas de precios, medidas y materiales, y el negocio no aparecía en Google para clientes de otros municipios del Quindío.
action: Documenté el diagnóstico, el roadmap y la arquitectura antes de programar, y el dueño aprobó un prototipo HTML desde su celular. Después construí un catálogo estático con fichas de medidas, precios, materiales, garantía y firmeza; un botón de WhatsApp con el producto y la medida ya escritos; un formulario de cotización que registra cada solicitud, y SEO local.
result: 20 cotizaciones en el primer mes, 50 ventas cerradas desde el lanzamiento y 100/100 de rendimiento móvil en PageSpeed, con un costo operativo cercano a $0 al mes más el dominio. El dueño dice que le ahorra mucho trabajo al cerrar ventas, sobre todo cuando no hay nadie en el almacén.
decisions:
  - decision: Web móvil en vez de app nativa.
    alternative: Una app nativa.
    reason: El cliente compra un colchón cada varios años y no va a descargar una app; un enlace que se comparte por WhatsApp elimina esa barrera.
  - decision: Next.js con generación estática.
    alternative: Renderizar el catálogo en el navegador.
    reason: El catálogo carga rápido y Google lo indexa bien, clave para búsquedas locales como "colchones Armenia".
  - decision: Supabase y Vercel en plan gratuito.
    alternative: Un servidor propio.
    reason: Postgres, almacenamiento de imágenes y autenticación sin mantener servidores; cubre de sobra el tráfico de un negocio local.
  - decision: WhatsApp como canal de cierre.
    alternative: Carrito de compras con pago en línea.
    reason: Los precios varían según los materiales y casi todas las ventas se cierran conversando; el sitio mejora el flujo que el dueño ya domina en vez de reemplazarlo.
  - decision: Prototipo HTML antes de programar.
    alternative: Diseñar directamente en código.
    reason: El dueño lo abrió en su celular y lo aprobó sin contexto técnico, lo que evitó rehacer el diseño después.
cover:
  src: ../images/colchones-posada/cover.webp
  alt: "Página de inicio de Colchones Posada: un colchón en una habitación con el título «Más de 15 años fabricando su descanso» y el botón Ver catálogo."
gallery:
  - src: ../images/colchones-posada/gallery-1.webp
    alt: Ficha del colchón Ortopédico Cassata con selector de medida, precio, barra de firmeza, materiales, garantía y los botones Pedir por WhatsApp y Solicitar cotización.
  - src: ../images/colchones-posada/gallery-2.webp
    alt: Formulario de cotización con nombre, municipio, teléfono, peso, preferencia de firmeza, producto de interés y comentario.
links:
  live: https://colchonesposada.lat
  repo: https://github.com/JPosda14/colchones-posada
code: public
order: 1
featured: true
---

## Calidad verificada

Antes de dar el sitio por terminado lo revisé en vivo contra una lista de 20 puntos: página 404 personalizada, estados de carga, manejo de errores, accesibilidad, imágenes optimizadas y analítica, entre otros. El SEO local incluye metadatos por producto, sitemap, robots, Open Graph para que el enlace se vea bien al compartirlo por WhatsApp y datos estructurados.

## Documentación como fuente única

Un documento de contexto del proyecto guió cada sesión de desarrollo con IA, y la metodología quedó escrita para repetirla con otros clientes.
