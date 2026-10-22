---
description: SDD · Cambia algo ya especificado: primero la spec, luego plan y tareas (uso: /sdd-change 003-proyectos <cambio>)
argument-hint: <NNN-nombre> <descripción del cambio>
---
Usa la skill sdd. Cambio pedido en `specs/$1/`: $ARGUMENTS
1. Actualiza spec.md y muéstrame el diff. PARA hasta que lo apruebe.
2. Tras aprobar, actualiza plan.md y luego tasks.md (añade tareas nuevas sin borrar las hechas).
No toques código: la implementación va con /sdd-implement.
