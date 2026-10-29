// Home texts in English. This file is the source of truth for the keys every language must define.
export const en = {
  hero: {
    label: "Introduction",
    status: "Available · Remote · Armenia, CO (UTC‑5)",
    role: {
      lead: "Full-stack Software Engineer with an",
      highlight: "AI focus",
    },
    subtitle: "I build fast web products and integrate AI to solve real business problems.",
    cta: {
      work: "See my work",
      cv: "Download CV",
      call: "Book a call",
    },
    cvFile: "/cv/juan-posada-cv-en.pdf",
  },
  photo: {
    label: "About // Location",
    alt: "Portrait of Juan Andrés Posada: young man with curly dark hair and glasses, wearing a black polo shirt.",
    locationLabel: "Location",
    location: "Armenia, Quindío · Colombia",
    languagesLabel: "Languages",
    languages: "Spanish (native) · English B1",
  },
  experience: {
    label: "Experience // Timeline",
    linkedin: "LinkedIn",
    // Most recent first. Dates are YYYY-MM; they are formatted per language.
    jobs: [
      {
        role: "Web Developer",
        company: "INSTALAAB SAS",
        start: "2025-09",
        end: "2026-01",
        achievement: "End-to-end tourism web platform (WordPress + Elementor), focused on UX, basic SEO and responsive design.",
      },
      {
        role: "Full-Stack Developer",
        company: "Mirus Smart Solutions",
        start: "2023-08",
        end: "2025-09",
        achievement: "Serverless platform on AWS, a Flutter mobile MVP and Make + ChatGPT automations that removed manual processes.",
      },
    ],
  },
  skills: {
    daily: {
      label: "Daily use",
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
    alsoLabel: "Also worked with",
    also: "React · AWS serverless (Lambda, API Gateway, DynamoDB, Cognito)",
    learning: {
      label: "Learning",
      items: [
        { icon: "claude", name: "AI agents · Claude Code" },
        { icon: "file-text", name: "Spec-Driven Development" },
        { icon: "astro", name: "Astro" },
      ],
    },
    business: {
      label: "Business skills",
      items: [
        { icon: "search", name: "Basic SEO" },
        { icon: "layout-template", name: "UX/UI" },
        { icon: "workflow", name: "Process automation (Make)" },
        { icon: "repeat", name: "Scrum" },
        { icon: "circle-check", name: "CI & unit testing" },
      ],
    },
  },
} as const;

type Strings<T> = { readonly [K in keyof T]: T[K] extends string ? string : Strings<T[K]> };

export type HomeStrings = Strings<typeof en>;
