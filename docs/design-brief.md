# Design brief

Borrador. Se completa en la Fase 3 y de ahí sale `docs/DESIGN.md` (lo que lee el agente).

## Tono
Sobrio, técnico y cercano. Se lee como un ingeniero que resuelve problemas, no como una agencia. Frases cortas; nada de "apasionado por la tecnología".

## Referencias (Juan elige 2–3 en la Fase 3)
- Gianmarco Cavallo (bento en Astro, celda "Ahora") — gianmarcocavallo.com
- Tom Weightman (grid de tarjetas) · Brittany Chiang (claridad, jerarquía)
- Bento de Apple y Microsoft; galerías bentogrids.com y godly.website (revisar a mano)

## Evitar (look de plantilla IA)
Gradiente morado/índigo, Inter por defecto, tres tarjetas iguales con icono, glassmorphism, glow decorativo, misma sombra en todo, emojis como iconos.

## Paleta, tipografía y espaciado
- Paleta propia en OKLCH con tokens; claro y oscuro con `light-dark()`. Un color de acento, neutros cálidos o fríos (decidir en Fase 3).
- Tipografía variable autoalojada con carácter para títulos + una sans legible para texto + monoespaciada para datos y stack. Revisar licencias (Fontshare, Google Fonts).
- Escala de espaciado de 4 px; gap del bento 16–20 px; radio de esquina único.

## Componentes base y estados
- Celda del bento (estática / enlazada): reposo, hover, `:focus-visible`, activa.
- Botón primario y secundario; enlace; chip de tecnología con icono; selector de idioma; botón de tema.
- Marcador `[PENDIENTE]` visible solo en desarrollo.

## Movimiento
Hover y foco con `transform`/`opacity`; una entrada escalonada suave en la home; View Transition tarjeta → caso. Todo desactivado con `prefers-reduced-motion`.

## Accesibilidad mínima
Contraste AA (4.5:1 texto, 3:1 elementos grandes y bordes de foco), objetivos táctiles ≥ 44 px, todo usable con teclado, foco siempre visible, `lang` correcto por página, texto alternativo en toda imagen.

## Herramientas
Principal: Stitch (exports en `design/stitch/`, referencias en `design/references/`). Resultado consolidado en `docs/DESIGN.md`. Apoyo opcional: Impeccable (`critique`, `audit`, `detect`).
