// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  site: "https://uruena2603.github.io",
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
