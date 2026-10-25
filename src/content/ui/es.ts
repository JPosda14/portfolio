// Textos de interfaz en español. Deben tener exactamente las mismas claves que en.ts.
import type { UiStrings } from "./en.ts";

export const es = {
  site: {
    name: "Juan Andrés Posada",
  },
  meta: {
    title: "Juan Andrés Posada — Ingeniero de Software full‑stack con enfoque en IA",
    description:
      "Ingeniero de software full‑stack con enfoque en IA. Construyo productos web rápidos y les integro IA para resolver problemas reales de negocio. Disponible para trabajo remoto.",
  },
  a11y: {
    skipToContent: "Saltar al contenido",
  },
  nav: {
    label: "Principal",
    projects: "Proyectos",
    experience: "Experiencia",
    contact: "Contacto",
  },
  anchors: {
    projects: "proyectos",
    experience: "experiencia",
    contact: "contacto",
  },
  language: {
    label: "Idioma",
    switchTo: "View in English",
  },
  theme: {
    toggle: "Cambiar tema de color",
  },
  footer: {
    source: "Código en GitHub",
    privacy: "Privacidad",
  },
  notFound: {
    title: "Página no encontrada",
    message: "La página que buscas no existe o cambió de lugar.",
    home: "Ir a la página de inicio",
  },
} satisfies UiStrings;
