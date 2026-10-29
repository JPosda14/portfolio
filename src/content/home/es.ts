// Textos de la home en español. Deben tener exactamente las mismas claves que en.ts.
import type { HomeStrings } from "./en.ts";

export const es = {
  hero: {
    label: "Presentación",
    status: "Disponible · Remoto · Armenia, CO (UTC‑5)",
    role: {
      lead: "Ingeniero de Software full‑stack con",
      highlight: "enfoque en IA",
    },
    subtitle: "Construyo productos web rápidos y les integro IA para resolver problemas reales de negocio.",
    cta: {
      work: "Ver mi trabajo",
      cv: "Descargar CV",
      call: "Agendar llamada",
    },
    cvFile: "/cv/juan-posada-cv-es.pdf",
  },
  photo: {
    label: "Sobre mí // Ubicación",
    alt: "Retrato de Juan Andrés Posada: hombre joven de cabello oscuro rizado y gafas, con camiseta polo negra.",
    locationLabel: "Ubicación",
    location: "Armenia, Quindío · Colombia",
    languagesLabel: "Idiomas",
    languages: "Español nativo · Inglés B1",
  },
  experience: {
    label: "Experiencia // Trayectoria",
    linkedin: "LinkedIn",
    jobs: [
      {
        role: "Desarrollador Web",
        company: "INSTALAAB SAS",
        start: "2025-09",
        end: "2026-01",
        achievement: "Plataforma web turística de punta a punta (WordPress + Elementor), con foco en UX, SEO básico y diseño responsivo.",
      },
      {
        role: "Desarrollador Full Stack",
        company: "Mirus Smart Solutions",
        start: "2023-08",
        end: "2025-09",
        achievement: "Plataforma serverless en AWS, MVP móvil en Flutter y automatizaciones con Make + ChatGPT que eliminaron procesos manuales.",
      },
    ],
  },
  skills: {
    daily: {
      label: "Uso a diario",
      items: [
        { icon: "openjdk", name: "Java" },
        { icon: "springboot", name: "Spring Boot" },
        { icon: "flutter", name: "Flutter" },
        { icon: "python", name: "Python" },
        { icon: "typescript", name: "TypeScript" },
        { icon: "nextdotjs", name: "Next.js" },
        { icon: "supabase", name: "Supabase" },
        { icon: "git", name: "Git" },
      ],
    },
    alsoLabel: "También he trabajado con",
    also: "React · AWS serverless (Lambda, API Gateway, DynamoDB, Cognito)",
    learning: {
      label: "Aprendiendo",
      items: [
        { icon: "claude", name: "Agentes de IA · Claude Code" },
        { icon: "file-text", name: "Spec-Driven Development" },
        { icon: "astro", name: "Astro" },
      ],
    },
    business: {
      label: "Business skills",
      items: [
        { icon: "search", name: "SEO básico" },
        { icon: "layout-template", name: "UX/UI" },
        { icon: "workflow", name: "Automatización de procesos (Make)" },
        { icon: "repeat", name: "Scrum" },
        { icon: "circle-check", name: "CI y pruebas unitarias" },
      ],
    },
  },
} satisfies HomeStrings;
