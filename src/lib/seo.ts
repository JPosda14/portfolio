// Share metadata (Open Graph) and structured data. Pure: imported by pages and by `node --test`.
import { links } from "../content/links.ts";
import { getHome, getUi, type Locale } from "../i18n/index.ts";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** "/og/<key>-<locale>.png": one image per page key (home, a project slug) and language. */
export function ogImagePath(key: string, locale: Locale): string {
  return `/og/${key}-${locale}.png`;
}

const OG_LOCALES: Record<Locale, string> = { en: "en_US", es: "es_CO" };

export function ogLocale(locale: Locale): string {
  return OG_LOCALES[locale];
}

/** schema.org Person for the home page: helps search engines tie the name to the role and profiles. No phone. */
export function personJsonLd(locale: Locale, site: string) {
  const { hero } = getHome(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: getUi(locale).site.name,
    jobTitle: `${hero.role.lead} ${hero.role.highlight}`,
    url: new URL(locale === "en" ? "/" : `/${locale}/`, site).href,
    email: `mailto:${links.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Armenia", addressRegion: "Quindío", addressCountry: "CO" },
    knowsLanguage: ["es", "en"],
    sameAs: [links.linkedin, links.github],
  };
}
