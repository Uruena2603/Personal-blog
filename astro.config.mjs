// @ts-check
import { defineConfig } from "astro/config";

// La integración de React entra en la fase 2, con la primera isla de ReactBits.
// Registrarla antes emite un runtime de 187 KB que ninguna página referencia.

// https://astro.build/config
export default defineConfig({
  site: "https://uruena2603.github.io",
  build: {
    // El sitio es de una sola página: un CSS externo no se reutiliza nunca y
    // sí bloquea el render (medido: 524 ms de coste en LCP). Incrustado.
    inlineStylesheets: "always",
  },
});
