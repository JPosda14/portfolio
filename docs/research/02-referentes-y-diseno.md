# 02 - Referentes y diseño (bento, micro-interacciones, tipografía/color)

Fecha: 2026-10-21. Método: ~14 búsquedas/lecturas. Las fuentes son sobre todo blogs de práctica, no estándares; donde algo no pude verificarlo lo marco como **[NO VERIFICADO]**.

## 1. Portafolios de referencia

Verificados (leídos o descritos por la fuente citada):
- **Gianmarco Cavallo** - https://gianmarcocavallo.com/ (leído). Bento real hecho con Astro (plantilla open source). Celdas: bienvenida/CTA, stack agrupado por categoría, hora local, "Now" con fecha, tiles de navegación (blog, playground). Bien: celda "Now" fechada y stack categorizado (calca tu "uso diario / aprendiendo"). Evitar: demasiadas celdas "juguete" (guestbook, globo 3D, país visitados) que diluyen el mensaje de empleo; sus proyectos no se cuentan como caso, solo galería.
- **Plantilla Astro bento (Ladvace)** - https://github.com/Ladvace/astro-bento-portfolio (por búsqueda, no inspeccionado el código). Útil para ver cómo se parte el grid en Astro. Evitar: depende de SSR/globo 3D (JS pesado, choca con Lighthouse 95+).
- **Bentofolio (tedevs, de pago)** - https://astro.build/themes/details/bento-grid-portfolio/ ; demo https://bento-grid-portfolio-beige.vercel.app/ . Secciones About/Projects/Stack/Testimonials/Stats con contenido en Markdown (content collections). Bien: separar datos de maquetación. Evitar: usa Tailwind y es plantilla reconocible.
- **Brittany Chiang** - https://brittanychiang.com/ (vía https://colorlib.com/wp/developer-portfolios/). Oscuro, minimalista, columna fija + currículum completo. Bien: escaneable para reclutadores. Evitar: no es bento ni tiene casos con métricas.
- **Anthony Fu** - https://antfu.me/ . Home concisa, proyectos agrupados por ecosistema con una línea. Bien: densidad y claridad. Evitar copiar: asume fama previa.
- **Tom Weightman** - https://www.tomweightman.com/ . Lista de productos entregados con su rol en cada uno. Bien: "rol" explícito por proyecto (útil para empleo).
- **Leland Jansen** - https://www.lelandjansen.com/ (según Colorlib; el dominio no resolvió al intentar abrirlo, **[NO VERIFICADO]** hoy). Página de proyecto con resultado medible: patrón P/A/R.
- **Lars Olson** - https://www.lars-olson.com/ . Cada proyecto con página de caso a fondo y detalles lúdicos en hover. Bien: caso por proyecto. Evitar: lo lúdico no debe tapar el resultado.
- **Tania Rascia** - https://www.taniarascia.com/ . Cada proyecto con Source y Demo. Bien: enlaces de prueba verificable.
- **Preet Suthar** - https://preetsuthar.me/ . Proyectos al frente con tecnologías y resultados (vía https://dev.to/jtrevdev/best-developer-portfolio-websites-and-why-they-work-3bdk).
- **Awwwards - Bento Grid inspirations** (colecciones de elementos): https://www.awwwards.com/inspiration/bento-grid-jamie , https://www.awwwards.com/inspiration/about-me-bento-grid-edwin-le-portfolio , https://www.awwwards.com/inspiration/bento-micro-interaction-letters . Solo vi títulos/etiquetas, no inspeccioné su CSS.

No pude verificar (sitios sin contenido legible vía fetch): **bentogrids.com**, **godly.website**, CSS Design Awards, y los bento de Apple/Microsoft. Revísalos a mano en el navegador. También busca casos de Josh Comeau, Lee Robinson, etc.: la búsqueda no devolvió nada, no los incluyo como verificados.

Patrón común útil: los portafolios mejor valorados muestran rol propio + enlaces de prueba (demo/código) + resultado. Pocos de la lista usan bento y casi ninguno cuenta casos con cifras: ahí está tu diferenciador.

## 2. Buenas prácticas de bento

Fuentes: https://studiomeyer.io/en/blog/bento-grid-layouts , https://www.freecodecamp.org/news/bento-grids-in-web-design/ , https://www.saasframe.io/blog (resumen de búsqueda). Es consenso de blogs, no norma.
- **Jerarquía de tamaños**: 1-2 celdas grandes (2x2) por pantalla; el resto 1x1 y 2x1. Si todo es grande, nada destaca. Úsalo solo si el contenido tiene jerarquía natural.
- **Rol por celda** (primaria / secundaria / terciaria): grande = lo que más quieres que vean (hero, proyecto estrella); mediana = proyectos, cifra clave; pequeña = stat, hora, stack, enlace social.
- **Huecos uniformes** de 16-24 px; gap inconsistente rompe el efecto modular.
- **Móvil**: diseñar mobile-first; <768 px 1-2 columnas. No apilar 12 tarjetas sin jerarquía: fusionar o ocultar celdas decorativas, y mantener tu orden de importancia (hero > cifra > proyectos > skills > contacto).
- **Accesibilidad**: DOM en orden de lectura lógico y que los spans del grid hagan el diseño; evitar `grid-auto-flow: dense` y `order` que desalineen tab/lector de pantalla del visual (WCAG 1.3.2 / 2.4.3). Texto sobre imagen/gradiente: 4.5:1 (WCAG 1.4.3), usar scrim. No bloquear orientación (1.3.4).
- **Errores típicos**: empezar por el layout y no por el contenido; demasiadas celdas grandes; celdas decorativas sin información; tarjetas clicables sin foco visible; sobrecargar de animación.
- **Técnica CSS**: `grid-template-columns: repeat(auto-fit, minmax(...))` o 4 col fijas con `grid-column/row: span`; `container-query` por tarjeta para adaptar su contenido; `subgrid` para alinear títulos/filas entre tarjetas (**[NO VERIFICADO]** en las fuentes; es mi recomendación técnica, comprueba soporte en MDN).
- No hallé estándar específico de bento; prueba con lector de pantalla y a 320 px.

## 3. Micro-interacciones solo CSS

- **Hover/focus**: transiciones de `transform` y `opacity` de 150-250 ms (compositables); reversibles. Siempre mismo estilo en `:focus-visible` que en `:hover`. Fuente: https://developer.chrome.com/docs/css-ui/scroll-driven-animations (recomienda animar transform/opacity, no layout).
- **Scroll-driven animations** (`animation-timeline: view()` / `scroll()`, `animation-range`): cero JS, fuera del hilo principal. Soporte: Chrome 115+, Safari 26; Firefox en vista previa (la doc de Chrome está fechada 2023: **verificar en caniuse**). Envolver en `@supports (animation-timeline: view())` y `@media (prefers-reduced-motion: no-preference)` (patrón "opt-in"; https://www.wearedevelopers.com/magazine/712-css-only-scroll-driven-animations). Declarar `animation-timeline` DESPUÉS del shorthand `animation`. La barra de progreso con `scaleX` es aceptable incluso con motion reducido; parallax/reveals grandes no.
- **View Transitions entre páginas** (`@view-transition { navigation: auto; }` en el CSS compartido): no requiere JS, mismo origen, degrada a navegación normal. Soporte según mi conocimiento: Chrome ~126, Safari ~18.2; **[NO VERIFICADO]** en caniuse. Con `prefers-reduced-motion: reduce` poner `animation: none` en `::view-transition-old(*)`/`::view-transition-new(*)`. Fuente: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API (la página solo trata lo básico; los detalles de soporte son mi conocimiento general).
- **Una sola animación de entrada** escalonada con `animation-delay` (consejo de https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website) en vez de efectos dispersos por todos lados.
- **Reglas**: todo envuelto en `prefers-reduced-motion`; nada de animar `width/height/top`; `will-change` solo si mides un problema; evitar efectos que dependan de `:hover` en táctil (usar `@media (hover: hover)`).
- Ideas concretas baratas: tarjeta que sube 2-4 px + borde de acento; flecha que se desplaza en el CTA; subrayado animado con `background-size`; indicador "disponible" con pulso suave (se apaga con reduced-motion); `color-scheme` + `light-dark()` para el tema sin JS.

## 4. Tipografía, color y modo claro/oscuro; evitar el look "plantilla IA"

Fuentes: https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website , https://dev.to/jaainil/ai-purple-problem-make-your-ui-unmistakable-3ono , https://www.mintlify.com/pbakaus/impeccable/concepts/anti-patterns , https://line25.com/articles/web-design-trends-2026/ . Todo es opinión de practicantes.
- **Tells de plantilla IA**: gradiente morado/índigo (por herencia del color por defecto de Tailwind), Inter/Roboto/Arial, tres cajas con iconos iguales, glassmorphism/glow/aurora decorativos, tarjeta redondeada con la misma sombra por defecto, bordes de color de un lado, sparklines decorativos, muchos hovers sueltos, fondo blanco/gris plano, sin jerarquía real.
- **Tipografía**: titulares grandes con saltos fuertes de tamaño/peso; fuentes variables (un solo archivo; autoalojada, con `font-display: swap` y subset latino para ES/EN con tildes y ñ). Elegir una familia con carácter para display + una neutra legible + mono para etiquetas/cifras. Inter es discutible (algunas guías la prohíben, otras la usan): decidirlo a propósito. Candidatas mencionadas: Fraunces, Cabinet Grotesk, Clash Display (**comprobar licencia y peso**; Clash/Cabinet son de Fontshare).
- **Color**: tokens CSS (`--surface`, `--text`, `--accent`), un color dominante + un acento nítido, evitar índigo. OKLCH es buena base para escalas y para aclarar el primario en oscuro (https://www.pravinkumar.co/blog/oklch-color-webflow-brand-system-2026; la cifra de adopción de State of CSS que cita **no verificada**).
- **Claro/oscuro**: `prefers-color-scheme` por defecto + `color-scheme` + tokens; el oscuro no necesita ser negro puro (gris/tinte cálido o frío casi negro), contraste ≥4.5:1 en texto. Un toggle manual implica algo de JS (mínimo, inline, para evitar parpadeo); opcional.
- **Contenido real sobre decorado**: capturas reales, métricas reales, foto propia. Es lo que más aleja de "hecho con IA" (la fuente aconseja usar muestras de trabajo reales, no ilustraciones de stock).

## Recomendaciones de diseño para este portafolio

1. **Bento solo en la home**; los casos P/A/R detallados en páginas propias (`/proyectos/x`) con View Transitions. Así el grid sigue siendo escaneable.
2. **Orden de DOM = orden de importancia**; el layout se hace con spans y `grid-template-areas`, sin `order` ni `dense`.
3. **Cada proyecto en tarjeta con 3 líneas**: Problema / Acción / Resultado (cifra en mono y grande), enlace a caso + demo/código. Mostrar tu rol.
4. **Hero con una cifra**: la métrica más fuerte, real y verificable (pendiente: ¿cuál es? no la inventes). CTA doble: contratar (empleo) y escribir (freelance).
5. **Skills como celdas por categoría** (uso diario / aprendiendo / business skills) con iconos SVG inline (sin librería JS); celda "Ahora" fechada, como en Cavallo.
6. **Paleta propia** (no índigo), tipografía variable autoalojada, tema claro/oscuro con tokens. Sin glassmorphism; una sola sombra/elevación.
7. **Movimiento mínimo**: hover/focus en tarjetas, una entrada escalonada, `@view-transition`, todo bajo `prefers-reduced-motion`. Sin librerías de animación.
8. **ES/EN**: rutas `/es` y `/en`; celdas con texto corto para que no se desborden en ES (suele ser más largo).

Boceto escritorio (4 columnas, ~16-20 px de gap; cada letra = celda; el DOM sigue este orden: A, B, C, D, E, F, G, H, I):

```
+---------------------------+-------------+-------------+
| A  HERO (2x2)             | B  CIFRA    | C  CTA /    |
|  rol + dolor que resuelve |  (1x1)      |  disponible |
|  [Contratar] [Escribir]   +-------------+  (1x1)      |
|                           | D  foto/    |             |
|                           |  ubicación  |             |
+-------------+-------------+-------------+-------------+
| E  PROYECTO 1 (2x2)       | F  PROYECTO 2 (2x1)       |
|  P / A / R + cifra        +-------------+-------------+
|                           | G  PROY. 3  | H  PROY. 4  |
|                           |  (1x1)      |  (1x1)      |
+---------------------------+-------------+-------------+
| I  COMO PIENSO (2x1)      | J  SKILLS: uso diario (2x1)|
+---------------------------+-------------+-------------+
| K  APRENDIENDO (1x1) | L  BUSINESS (1x1) | M CONTACTO (2x1) |
+----------------------+-------------------+--------------+
```
(El orden DOM real: A, B, C, D, E, F, G, H, I, J, K, L, M; sin `order`.)

Boceto móvil (1 columna; B y C se fusionan en fila de 2; D se oculta o se reduce):

```
[ A  HERO              ]
[ B cifra | C CTA      ]   <- 2 columnas
[ E  PROYECTO 1        ]
[ F  PROYECTO 2        ]
[ G | H  (mini, 2 col) ]
[ I  Cómo pienso       ]
[ J  Uso diario        ]
[ K aprendiendo | L biz]
[ M  Contacto          ]
```

## Pendiente de verificar
- Soporte actual en caniuse de scroll-driven animations, `@view-transition` cross-document, `subgrid`, `light-dark()`.
- bentogrids.com, godly.website, CSS Design Awards y bento de Apple/Microsoft (no accesibles vía fetch).
- Estado de mantenimiento de las plantillas Astro bento y licencias de las fuentes tipográficas citadas.
- Que Leland Jansen y los demás sitios de Colorlib sigan activos.
