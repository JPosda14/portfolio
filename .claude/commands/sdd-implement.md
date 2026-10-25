---
description: SDD · Implementa UNA tarea, tests primero (uso: /sdd-implement 001-base T3)
argument-hint: <NNN-nombre> <Tn>
---
Implementa SOLO la tarea $1 de `specs/$0/tasks.md`, siguiendo `specs/$0/plan.md`, `docs/constitution.md` y la skill sdd.
1. Escribe los tests y comprueba que fallan.
2. Escribe el código hasta que pasen.
3. Ejecuta `npm run check && npm test` y muéstrame el resultado.
4. Si hay cambios visuales, verifícalos en el navegador: escritorio y móvil, EN y ES.
5. Marca $1 como hecha en tasks.md, indica qué RF cubre y actualiza MEMORY.md.
Después PARA. No empieces la siguiente tarea ni hagas commit.
