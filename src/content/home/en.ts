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
} as const;

type Strings<T> = { readonly [K in keyof T]: T[K] extends string ? string : Strings<T[K]> };

export type HomeStrings = Strings<typeof en>;
