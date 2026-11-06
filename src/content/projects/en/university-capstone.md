---
title: CUE Event Manager
summary: University event management platform built as a microservices system — best capstone project of the semester.
year: 2025
kind: academic
role: Project Manager, requirements and part of the development
team: Team of 3 · Scrum · simulated company JASS Code
stack: [React, TypeScript, Vite, Material UI, React Query, Java, Microservices, Docker]
problem: Alexander von Humboldt University had no central platform for its events. Schedules and rooms clashed, registrations and capacity were hard to control, information was scattered across formats and there were no consolidated reports to make decisions.
action: As Project Manager I wrote the project charter (problem, scope and what was left out), gathered requirements with the client through a questionnaire and built the product backlog with user stories and story points. I also contributed code to the role-based web platform (admin, organizer and attendee) with events, registrations with capacity control, clash-free room booking, notifications and reports.
result: The full scope defined in the charter was delivered, and the project was recognized as the best capstone project of the semester.
decisions:
  - decision: Gather requirements with a questionnaire the client answered in writing.
    alternative: Assume the requirements from the course guide.
    reason: The client defined who registers users, which data is collected and what each role can do before design started, so permissions did not need rework later.
  - decision: State in the charter what the project would not include (payments, video calls, native apps, predictive analytics).
    alternative: Leave the scope open to whatever came up.
    reason: With a team of 3 and one semester, a closed scope made it possible to deliver everything promised.
  - decision: A product backlog with story points and measurable success indicators.
    alternative: A task list without estimates.
    reason: Estimates made it possible to prioritize and plan sprints, and the indicators defined what "working" meant for the platform.
  - decision: Hexagonal architecture with Bancolombia's scaffold (a team decision, led by the tech lead).
    alternative: Letting each developer structure their service their own way.
    reason: A shared structure kept the code consistent in a team with developers still in training.
cover:
  src: ../images/university-capstone/cover.webp
  alt: CUE Event Manager admin dashboard in dark mode, with a registrations-over-time chart and charts of events by status and by format, in Spanish.
gallery:
  - src: ../images/university-capstone/gallery-1.webp
    alt: Seven-step event creation wizard at the summary step, warning that the event is part of a recurring series, in Spanish.
  - src: ../images/university-capstone/gallery-2.webp
    alt: Reports section with "My events" and "Registrations per event" tabs, Excel format and event cards with their status, in Spanish.
links:
  repo: https://github.com/cue-event-manager
  repoLabel: GitHub organization
code: public
order: 2
featured: true
---

## How we worked

We ran it like a real software company: project charter, requirements gathering with the client (the professor), product backlog and Scrum sprints. Code followed a Git + Jira flow (one branch per ticket, pull request and code review before merging) and a shared technical guide for the microservices.
