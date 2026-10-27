// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import linkGuard from "./integrations/link-guard.mjs";
import pendingGuard from "./integrations/pending-guard.mjs";

export default defineConfig({
  site: "https://juanposada.dev",
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
      weights: [400, 500],
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
    }),
    // ALLOW_PENDING is only set by `npm run build:test`; publishing (`npm run build`) blocks [PENDIENTE].
    pendingGuard({ allowPending: process.env["ALLOW_PENDING"] === "1" }),
    linkGuard(),
  ],
});
