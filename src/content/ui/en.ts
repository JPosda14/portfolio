// Interface texts in English. This file is the source of truth for the keys every language must define.
export const en = {
  site: {
    name: "Juan Andrés Posada",
  },
  meta: {
    title: "Juan Andrés Posada — Full-stack Software Engineer with an AI focus",
    description:
      "Full-stack software engineer with an AI focus. I build fast web products and integrate AI to solve real business problems. Open to remote work.",
  },
  a11y: {
    skipToContent: "Skip to content",
    newTab: "(opens in a new tab)",
  },
  nav: {
    label: "Main",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
  },
  anchors: {
    projects: "projects",
    experience: "experience",
    contact: "contact",
  },
  language: {
    label: "Language",
    switchTo: "Ver en español",
  },
  theme: {
    toggle: "Switch color theme",
  },
  footer: {
    source: "Source on GitHub",
    privacy: "Privacy",
  },
  projects: {
    heading: "Selected projects",
    viewCase: "View case",
    live: "Live",
    problem: "Problem",
    action: "Action",
    result: "Result",
    kinds: {
      personal: "Personal project",
      family: "Family business",
      academic: "Academic",
      client: "Client",
      company: "Company",
    },
  },
  profile: {
    heading: "Experience and skills",
  },
  case: {
    back: "Back to projects",
    year: "Year",
    type: "Type",
    role: "Role",
    team: "Team",
    stack: "Stack",
    problem: "The problem",
    action: "What I did",
    result: "The result",
    decisions: "Technical decisions",
    alternative: "Discarded",
    reason: "Why",
    gallery: "Gallery",
    links: "Links",
    live: "Live site",
    repo: "Source code",
    privateCode: "Private code",
    next: "Next project",
  },
  notFound: {
    title: "Page not found",
    message: "The page you are looking for does not exist or has moved.",
    home: "Go to the home page",
  },
} as const;

type Strings<T> = { readonly [K in keyof T]: T[K] extends string ? string : Strings<T[K]> };

export type UiStrings = Strings<typeof en>;
