---
title: Colchones Posada
summary: Web catalog and quotes for my family's mattress factory in Armenia, Colombia.
year: 2026
kind: family
role: Design, development and deployment
team: Solo project
stack: [Next.js, TypeScript, Tailwind CSS, Supabase, Vercel]
problem: A family factory with over 15 years in business and no formal employees sold only through WhatsApp. The owner answered the same questions about prices, sizes and materials over and over, and the business did not show up on Google for customers in other towns of Quindío.
action: I documented the diagnosis, roadmap and architecture before coding, and the owner approved an HTML prototype from a phone. Then I built a static catalog with product sheets showing sizes, prices, materials, warranty and firmness; a WhatsApp button with the product and size already filled in; a quote form that records every request; and local SEO.
result: 20 quote requests in the first month, 50 sales closed since launch and a 100/100 mobile performance score on PageSpeed, at an operating cost close to $0 a month plus the domain. The owner says it saves a lot of work when closing sales, especially when nobody is at the store.
decisions:
  - decision: A mobile website instead of a native app.
    alternative: A native app.
    reason: People buy a mattress once every few years and will not download an app; a link shared on WhatsApp removes that barrier.
  - decision: Next.js with static generation.
    alternative: Rendering the catalog in the browser.
    reason: The catalog loads fast and Google indexes it well, which matters for local searches like "colchones Armenia".
  - decision: Supabase and Vercel on free plans.
    alternative: A self-managed server.
    reason: Postgres, image storage and authentication without running servers; more than enough for a local business's traffic.
  - decision: WhatsApp as the closing channel.
    alternative: A shopping cart with online payment.
    reason: Prices depend on the materials and almost every sale is closed in a conversation; the site improves the flow the owner already knows instead of replacing it.
  - decision: An HTML prototype before coding.
    alternative: Designing straight in code.
    reason: The owner opened it on a phone and approved it without technical context, which avoided redoing the design later.
cover:
  src: ../images/colchones-posada/cover.webp
  alt: "Colchones Posada home page: a mattress in a bedroom with the headline “Más de 15 años fabricando su descanso” (over 15 years making your rest) and a “Ver catálogo” button."
gallery:
  - src: ../images/colchones-posada/gallery-1.webp
    alt: Product sheet for the Ortopédico Cassata mattress with a size selector, price, firmness bar, materials, warranty and the “Order on WhatsApp” and “Request a quote” buttons, in Spanish.
  - src: ../images/colchones-posada/gallery-2.webp
    alt: Quote request form in Spanish with name, town, phone, weight, firmness preference, product of interest and comment fields.
links:
  live: https://colchonesposada.lat
  repo: https://github.com/JPosda14/colchones-posada
code: public
order: 1
featured: true
---

## Verified quality

Before calling it done, I checked the live site against a 20-point list: custom 404 page, loading states, error handling, accessibility, optimized images and analytics, among others. Local SEO includes per-product metadata, a sitemap, robots rules, Open Graph so the link looks right when shared on WhatsApp, and structured data.

## Documentation as the single source

A project context document guided every AI-assisted development session, and the method is written down so it can be repeated with other clients.
