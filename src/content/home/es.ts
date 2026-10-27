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
} satisfies HomeStrings;
