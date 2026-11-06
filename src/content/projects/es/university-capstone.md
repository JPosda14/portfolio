---
title: CUE Event Manager
summary: Plataforma universitaria de gestión de eventos construida con microservicios — mejor proyecto nuclear del semestre.
year: 2025
kind: academic
role: Project Manager, requisitos y parte del desarrollo
team: Equipo de 3 · Scrum · empresa simulada JASS Code
stack: [React, TypeScript, Vite, Material UI, React Query, Java, Microservicios, Docker]
problem: La Universidad Alexander von Humboldt no tenía una plataforma central para sus eventos. Había choques de horarios y espacios, inscripciones y aforos difíciles de controlar, información dispersa en varios formatos y ningún reporte consolidado para decidir.
action: Como Project Manager redacté el acta de constitución (problema, alcance y lo que quedaba fuera), levanté los requisitos con el cliente mediante un cuestionario y armé el product backlog con historias de usuario y story points. También aporté código a la plataforma web por roles (administrador, organizador y asistente) con eventos, inscripciones con control de aforo, reservas de espacios sin choques, notificaciones y reportes.
result: Se entregó todo el alcance definido en el acta y el proyecto fue reconocido como el mejor proyecto nuclear del semestre.
decisions:
  - decision: Levantar los requisitos con un cuestionario que el cliente respondió por escrito.
    alternative: Suponer los requisitos a partir de la guía del curso.
    reason: El cliente definió quién registra a los usuarios, qué datos se piden y qué puede hacer cada rol antes de diseñar, así que no hubo que rehacer permisos después.
  - decision: Escribir en el acta lo que no incluía el proyecto (pagos, videoconferencias, apps nativas, analítica predictiva).
    alternative: Dejar el alcance abierto a lo que fuera surgiendo.
    reason: Con un equipo de 3 y un semestre de plazo, un alcance cerrado permitió entregar todo lo prometido.
  - decision: Product backlog con story points e indicadores de éxito medibles.
    alternative: Una lista de tareas sin estimar.
    reason: Las estimaciones permitieron priorizar y planear los sprints, y los indicadores dejaron claro qué significaba que la plataforma funcionara.
  - decision: Arquitectura hexagonal con el scaffold de Bancolombia (decisión del equipo, liderada por el tech lead).
    alternative: Que cada desarrollador organizara su servicio a su manera.
    reason: Una estructura común mantuvo el código consistente en un equipo con desarrolladores en formación.
cover:
  src: ../images/university-capstone/cover.webp
  alt: Panel administrativo de CUE Event Manager en modo oscuro, con la gráfica de inscripciones en el tiempo y los gráficos de eventos por estado y por modalidad.
gallery:
  - src: ../images/university-capstone/gallery-1.webp
    alt: Asistente de creación de eventos en siete pasos, en el paso de resumen, con el aviso de que el evento forma parte de una serie recurrente.
  - src: ../images/university-capstone/gallery-2.webp
    alt: Sección de reportes con las pestañas Mis eventos e Inscripciones por evento, formato Excel y tarjetas de eventos con su estado.
links:
  repo: https://github.com/cue-event-manager
  repoLabel: Organización en GitHub
code: public
order: 2
featured: true
---

## Cómo trabajamos

Simulamos una empresa de software real: acta de constitución, levantamiento de requisitos con el cliente (el docente), product backlog y sprints con Scrum. El código siguió un flujo con Git y Jira (una rama por ticket, pull request y revisión de código antes de integrar) y una guía técnica común para los microservicios.
