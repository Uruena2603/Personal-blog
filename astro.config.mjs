// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sitemap({
      // Alternates hreflang en el sitemap. Los códigos deben coincidir EXACTO
      // con los <link rel="alternate"> de Base.astro (en/es): si difieren,
      // Google descarta el par por señales en conflicto.
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", es: "es" },
      },
    }),
  ],
  site: "https://juan-alejandro-uruena.pages.dev",
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    // El sitio es de una sola página: un CSS externo no se reutiliza nunca y
    // sí bloquea el render (medido: 524 ms de coste en LCP). Incrustado.
    inlineStylesheets: "always",
  },
});
