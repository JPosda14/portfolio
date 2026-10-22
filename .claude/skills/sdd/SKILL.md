---
name: sdd
description: Spec-Driven Development flow for this portfolio (spec → clarify → plan → tasks → implement → validate → change). Use whenever a /sdd-* command runs or when creating or editing anything under specs/.
---

# SDD — flujo y plantillas

## Regla de oro
Nunca pases de fase sin aprobación explícita de Juan. Al terminar cada fase, muestra el resultado y PARA.

## Antes de cualquier fase
Lee `docs/constitution.md`, `docs/implementation-plan.md`, `MEMORY.md` y, si existe, `docs/DESIGN.md`.

## Fases
| Fase | Archivo | Puede editar |
| --- | --- | --- |
| spec | `specs/NNN-nombre/spec.md` | solo `specs/` |
| clarify | (informe en el chat) | nada |
| plan | `specs/NNN-nombre/plan.md` | solo `specs/` |
| tasks | `specs/NNN-nombre/tasks.md` | solo `specs/` |
| implement | código + tests | lo que diga la tarea |
| validate | (informe en el chat) | nada |
| change | spec → plan → tasks, en ese orden | solo `specs/` |

## Plantilla spec.md
```
# NNN — <nombre>
## Por qué
## Alcance / Fuera de alcance
## Requisitos (EARS)
- RF1: EL SISTEMA <comportamiento permanente>.
- RF2: CUANDO <evento>, EL SISTEMA <respuesta>.
- RF3: SI <condición no deseada>, ENTONCES EL SISTEMA <respuesta>.
- RF4: MIENTRAS <estado>, EL SISTEMA <respuesta>.
## Criterios de aceptación (verificables, en EN y ES, escritorio y móvil)
## Preguntas abiertas
```
Sin stack ni nombres de archivos en la spec.

## Plantilla plan.md
```
# Plan — NNN
## Archivos a crear o cambiar
## Decisiones (cada una con la alternativa descartada y por qué)
## Estrategia de tests (qué RF cubre cada test)
## Riesgos
```
Verifica con Context7 cualquier API de Astro o librería que uses.

## Plantilla tasks.md
```
# Tareas — NNN
- [ ] T1 <acción> · RF1 · Hecho cuando: <comprobación concreta>
```
Máximo ~10 tareas de 20–30 minutos.

## Implementación
Una tarea por vez: tests primero (deben fallar), código hasta que pasen, `npm run check && npm test`, revisión en navegador si hay cambio visual (EN/ES, escritorio/móvil), marcar la tarea, actualizar MEMORY.md y PARAR.

## Validación
Requisito por requisito: cumple / no cumple / parcial, con la evidencia (test o verificación en navegador). Incluye `npm run lhci`.
