// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import linkGuard from "./integrations/link-guard.mjs";
import ogGuard from "./integrations/og-guard.mjs";
import pendingGuard from "./integrations/pending-guard.mjs";
import { SITE_URL } from "./site.mjs";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  fonts: [
    {
      name: "Playfair Display",
      cssVariable: "--font-display",
      provider: fontProviders.fontsource(),
      // Only 400 (normal + italic): every serif heading uses it, and each extra weight delays the hero LCP.
      weights: [400],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      name: "Geist",
      cssVariable: "--font-body",
      provider: fontProviders.fontsource(),
      weights: [400, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      provider: fontProviders.fontsource(),
      weights: [500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", es: "es" },
      },
      // Case and privacy pages have translated slugs (/projects/ ↔ /es/proyectos/, /privacy/ ↔ /es/privacidad/),
      // which the i18n option cannot pair.
      serialize(item) {
        const match = item.url.match(/^(https?:\/\/[^/]+)\/(?:projects|es\/proyectos)\/([^/]+)\/$/);
        if (match) {
          const [, origin, slug] = match;
          item.links = [
            { lang: "en", url: `${origin}/projects/${slug}/` },
            { lang: "es", url: `${origin}/es/proyectos/${slug}/` },
          ];
        }
        const privacy = item.url.match(/^(https?:\/\/[^/]+)\/(?:privacy|es\/privacidad)\/$/);
        if (privacy) {
          const [, origin] = privacy;
          item.links = [
            { lang: "en", url: `${origin}/privacy/` },
            { lang: "es", url: `${origin}/es/privacidad/` },
          ];
        }
        return item;
      },
    }),
    // ALLOW_PENDING is only set by `npm run build:test`; publishing (`npm run build`) blocks [PENDIENTE].
    pendingGuard({ allowPending: process.env["ALLOW_PENDING"] === "1" }),
    linkGuard(),
    // SKIP_OG_GUARD is only set by scripts/make-og.mjs, which builds once to get the fonts before the images exist.
    ogGuard({ skip: process.env["SKIP_OG_GUARD"] === "1" }),
  ],
});
