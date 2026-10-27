import { en as homeEn, type HomeStrings } from "../content/home/en.ts";
import { es as homeEs } from "../content/home/es.ts";
import { en, type UiStrings } from "../content/ui/en.ts";
import { es } from "../content/ui/es.ts";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const ui: Record<Locale, UiStrings> = { en, es };
const home: Record<Locale, HomeStrings> = { en: homeEn, es: homeEs };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getUi(locale: Locale): UiStrings {
  return ui[locale];
}

export function getHome(locale: Locale): HomeStrings {
  return home[locale];
}

/** Paths of the same page in every language, used for hreflang and the language switch. */
export type Alternates = Record<Locale, string>;
