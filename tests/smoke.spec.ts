import { test, expect, type Page } from "@playwright/test";

interface LangFixture {
  path: string;
  htmlLang: string;
  heading: { greeting: string; claim: string };
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  cvPrimaryHref: string;
  // El aria-label del switch es su nombre accesible (pisa al texto "EN"/"ES").
  langSwitch: { href: string; ariaLabel: string };
}

const LANGS: LangFixture[] = [
  {
    path: "/",
    htmlLang: "en",
    heading: {
      greeting: "Hi, I'm Juan Urueña",
      claim: "I build complete systems, not loose pieces.",
    },
    ctaPrimary: { label: "See the work", href: "#work" },
    ctaSecondary: { label: "Let's talk", href: "#contact" },
    cvPrimaryHref: "/cv/Juan-Alejandro-Uruena-CV-EN.pdf",
    langSwitch: { href: "/es/", ariaLabel: "Leer en español" },
  },
  {
    path: "/es/",
    htmlLang: "es",
    heading: {
      greeting: "Hola, soy Juan Urueña",
      claim: "Construyo sistemas completos, no piezas sueltas.",
    },
    ctaPrimary: { label: "Ver el trabajo", href: "#work" },
    ctaSecondary: { label: "Hablemos", href: "#contact" },
    cvPrimaryHref: "/cv/Juan-Alejandro-Uruena-CV-ES.pdf",
    langSwitch: { href: "/", ariaLabel: "Read in English" },
  },
];

// El canonical siempre apunta al dominio de producción (Astro.site), sin
// importar desde dónde se sirva la página.
const SITE_ORIGIN = "https://juan-alejandro-uruena.pages.dev";
const GITHUB_URL = "https://github.com/Uruena2603";
const LINKEDIN_URL = "https://www.linkedin.com/in/juan-alejandro-urueña-serna";

// El sitio no carga recursos externos, pero Cloudflare inyecta el beacon de
// Web Analytics en producción (nunca en `astro preview`). Se ignora por
// dominio, no por contenido, para no enmascarar errores propios.
const IGNORED_ERROR_HOSTS = ["cloudflareinsights.com"];

function attachErrorCollectors(page: Page) {
  const errors: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (IGNORED_ERROR_HOSTS.some((host) => text.includes(host))) return;
    errors.push(`console.error: ${text}`);
  });

  page.on("pageerror", (err) => {
    errors.push(`pageerror: ${err.message}`);
  });

  page.on("requestfailed", (req) => {
    const url = req.url();
    if (IGNORED_ERROR_HOSTS.some((host) => url.includes(host))) return;
    // Solo el propio origen: red externa no debe tumbar el smoke test.
    if (url.startsWith("http://localhost:4321")) {
      errors.push(`requestfailed: ${url} (${req.failure()?.errorText})`);
    }
  });

  return errors;
}

for (const lang of LANGS) {
  test.describe(`${lang.path} (${lang.htmlLang})`, () => {
    test("hero heading and CTAs", async ({ page }) => {
      await page.goto(lang.path);

      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toContainText(lang.heading.greeting);
      await expect(h1).toContainText(lang.heading.claim);

      const primaryCta = page
        .getByRole("link", { name: lang.ctaPrimary.label, exact: false })
        .first();
      await expect(primaryCta).toHaveAttribute("href", lang.ctaPrimary.href);

      const secondaryCta = page
        .getByRole("link", { name: lang.ctaSecondary.label, exact: false })
        .first();
      await expect(secondaryCta).toHaveAttribute(
        "href",
        lang.ctaSecondary.href,
      );
    });

    test("CV primary link and language switch", async ({ page }) => {
      await page.goto(lang.path);

      // Selector por href real (único en la página): no depende de clases.
      const cvPrimary = page.locator(`a[href="${lang.cvPrimaryHref}"]`);
      await expect(cvPrimary).toBeVisible();
      await expect(cvPrimary).toHaveClass(/btn--primary/);

      // .first(): el switch existe dos veces en el DOM (desktop + popover
      // móvil), pero el popover cerrado no entra al árbol de accesibilidad.
      const langSwitch = page
        .getByRole("link", { name: lang.langSwitch.ariaLabel, exact: true })
        .first();
      await expect(langSwitch).toHaveAttribute("href", lang.langSwitch.href);
    });

    test("canonical, hreflang and social links", async ({ page }) => {
      await page.goto(lang.path);

      const canonicalHref = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonicalHref).toBe(new URL(lang.path, SITE_ORIGIN).href);

      await expect(
        page.locator('link[rel="alternate"][hreflang]'),
      ).toHaveCount(3);
      await expect(
        page.locator('link[rel="alternate"][hreflang="en"]'),
      ).toHaveCount(1);
      await expect(
        page.locator('link[rel="alternate"][hreflang="es"]'),
      ).toHaveCount(1);
      await expect(
        page.locator('link[rel="alternate"][hreflang="x-default"]'),
      ).toHaveCount(1);

      expect(
        await page.locator(`a[href="${GITHUB_URL}"]`).count(),
      ).toBeGreaterThanOrEqual(1);
      await expect(
        page.locator(`a[href="${LINKEDIN_URL}"]`).first(),
      ).toBeVisible();
    });

    test("no console errors or page errors on load", async ({ page }) => {
      const errors = attachErrorCollectors(page);
      await page.goto(lang.path, { waitUntil: "networkidle" });
      // Deja asentar la hidratación diferida (client:idle) de las islas
      // antes de leer la consola. Si resulta flaky en CI, subir a 1500-2000.
      await page.waitForTimeout(1000);
      expect(errors, errors.join("\n")).toEqual([]);
    });
  });
}

test.describe("CV PDFs", () => {
  for (const file of [
    "Juan-Alejandro-Uruena-CV-EN.pdf",
    "Juan-Alejandro-Uruena-CV-ES.pdf",
  ]) {
    test(`/cv/${file} responds 200`, async ({ request }) => {
      const response = await request.get(`/cv/${file}`);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("application/pdf");
    });
  }
});

test("unknown route responds 404", async ({ page }) => {
  const response = await page.goto("/foo-bar");
  expect(response?.status()).toBe(404);
});

test.describe("reduced motion", () => {
  for (const lang of LANGS) {
    test(`${lang.path}: h1 stays visible with prefers-reduced-motion`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(lang.path);

      // Con reduced-motion, SplitText no corre y debe quedar el texto SSR.
      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toBeVisible();
      await expect(h1).toContainText(lang.heading.claim);
    });
  }
});
