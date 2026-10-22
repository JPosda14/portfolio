# Constitución

Principios innegociables. Si una tarea choca con alguno, se para y se pregunta.

1. **Stack**: Astro 7 estático, TypeScript estricto y CSS propio. Nunca: frameworks de UI en cliente, Tailwind, librerías de animación ni dependencias nuevas sin aprobación.
2. **La spec manda**: nada se implementa fuera de la spec activa; si falta una decisión, se para y se pregunta a Juan.
3. **Contenido separado del diseño**: todo texto vive en `src/content/`; los componentes solo presentan.
4. **Tests como puerta**: `npm run check` y `npm test` en verde antes de dar una tarea por hecha; `npm run lhci` ≥0.95 en las 4 categorías antes de cerrar una spec.
5. **Rendimiento y accesibilidad son funcionalidad**: cero JS salvo el script de tema; WCAG 2.2 AA; orden del DOM = orden visual; todo movimiento respeta `prefers-reduced-motion`.
6. **Honestidad del contenido**: ninguna cifra, logro o testimonio inventado. Lo que falta se marca `[PENDIENTE]` y el build de producción falla si queda alguno.
7. **Bilingüe completo**: cada página y texto existe en EN y ES; ninguna ruta queda en un solo idioma.
8. **Idioma**: código y commits en inglés; interfaz ES/EN; documentación en español.
9. **Privacidad y seguridad**: sin secretos en el repo, sin teléfono público, sin cookies ni rastreo de terceros.
10. **Código revisado**: Juan revisa cada diff; el código se explica en el README y las decisiones en `MEMORY.md`.
