// Pure rules for the projects collection. No astro:content import, so `node --test` can load this file.
import { locales, type Locale } from "../i18n/index.ts";

export const MIN_FEATURED = 2;
export const MAX_FEATURED = 5;

interface ProjectEntryLike {
  id: string;
  data: { featured: boolean };
}

/** Splits a collection id like "es/colchones-posada" into its language and slug. */
export function parseProjectId(id: string): { locale: Locale; slug: string } {
  const [locale, slug, ...rest] = id.split("/");
  if (!locale || !slug || rest.length > 0 || !(locales as readonly string[]).includes(locale)) {
    throw new Error(`Project file "${id}" must live in src/content/projects/<${locales.join("|")}>/<slug>.md`);
  }
  return { locale: locale as Locale, slug };
}

/** Throws if a project is missing in a language or the number of featured projects is out of range. */
export function checkProjectSet(entries: readonly ProjectEntryLike[]): void {
  const slugsByLocale = new Map<Locale, Set<string>>(locales.map((locale) => [locale, new Set<string>()]));
  for (const { id } of entries) {
    const { locale, slug } = parseProjectId(id);
    slugsByLocale.get(locale)?.add(slug);
  }

  const allSlugs = new Set(entries.map(({ id }) => parseProjectId(id).slug));
  const missing = [...allSlugs].flatMap((slug) =>
    locales.filter((locale) => !slugsByLocale.get(locale)?.has(slug)).map((locale) => `"${slug}" has no ${locale} version`),
  );
  if (missing.length > 0) throw new Error(`Projects missing a translation: ${missing.join("; ")}`);

  for (const locale of locales) {
    const featured = entries.filter(({ id, data }) => data.featured && parseProjectId(id).locale === locale).length;
    if (featured < MIN_FEATURED || featured > MAX_FEATURED) {
      throw new Error(`There must be between ${MIN_FEATURED} and ${MAX_FEATURED} featured projects; ${locale} has ${featured}`);
    }
  }
}

export interface ProjectAreas {
  desktop: string;
  tablet: string;
  mobile: string;
}

// Rows of grid-template-areas per number of featured projects. The first project is always the largest.
const DESKTOP: Record<number, string[]> = {
  2: ["p1 p1 p2 p2"],
  3: ["p1 p1 p2 p2", "p1 p1 p3 p3"],
  4: ["p1 p1 p2 p2", "p1 p1 p3 p4"],
  5: ["p1 p1 p2 p3", "p1 p1 p4 p5"],
};

const TABLET: Record<number, string[]> = {
  2: ["p1 p1", "p2 p2"],
  3: ["p1 p1", "p2 p2", "p3 p3"],
  4: ["p1 p1", "p2 p2", "p3 p4"],
  5: ["p1 p1", "p2 p3", "p4 p5"],
};

const quote = (rows: string[]) => rows.map((row) => `"${row}"`).join(" ");

/** grid-template-areas values (ready for CSS custom properties) for 2–5 projects. */
export function projectAreas(count: number): ProjectAreas {
  const desktop = DESKTOP[count];
  const tablet = TABLET[count];
  if (!desktop || !tablet) throw new Error(`Layout supports ${MIN_FEATURED}–${MAX_FEATURED} projects, got ${count}`);
  return {
    desktop: quote(desktop),
    tablet: quote(tablet),
    mobile: quote(Array.from({ length: count }, (_, i) => `p${i + 1}`)),
  };
}

/** Path of a case page in each language: /projects/<slug>/ and /es/proyectos/<slug>/. */
export function casePaths(slug: string): Record<Locale, string> {
  return { en: `/projects/${slug}/`, es: `/es/proyectos/${slug}/` };
}
