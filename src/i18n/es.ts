// Fuente de verdad de la copia y del tipo Dictionary. El inglés (en.ts) debe
// satisfacer esta misma forma: TypeScript falla si un idioma pierde una clave.
export const es = {
  meta: {
    lang: "es",
    ogLocale: "es_CO",
    ogLocaleAlternate: "en_US",
    title:
      "Juan Alejandro Urueña Serna | Ingeniero de Sistemas y Telecomunicaciones",
    // Google corta la descripción en ~160 caracteres: el pitch debe caber entero.
    description:
      "Ingeniero de Sistemas y Telecomunicaciones. Sitios, embudos y automatización con agentes de IA para clientes en EE. UU. y Colombia. Diez proyectos en producción.",
    jobTitle: "Ingeniero de Sistemas y Telecomunicaciones",
    skipLink: "Saltar al contenido",
  },
  nav: {
    ariaLabel: "Navegación principal",
    links: [
      { href: "#about", label: "Sobre mí" },
      { href: "#work", label: "Trabajo" },
      { href: "#engineering", label: "Ingeniería" },
      { href: "#skills", label: "Conocimientos" },
      { href: "#contact", label: "Contacto" },
    ],
    langSwitch: { href: "/", label: "EN", ariaLabel: "Read in English" },
    menuLabel: "Abrir menú",
    closeLabel: "Cerrar menú",
  },
  hero: {
    name: "Juan Alejandro Urueña Serna",
    greeting: "Hola, soy Juan Urueña 👋",
    photoAlt: "Retrato de Juan Alejandro Urueña Serna",
    claimPre: "Construyo ",
    claimHighlight: "sistemas completos",
    claimPost: ", no piezas sueltas.",
    support:
      "Ingeniero de Sistemas y Telecomunicaciones. Del sensor al modelo y de la landing al despliegue.",
    ctaPrimary: "Ver el trabajo",
    ctaSecondary: "Hablemos",
  },
  about: {
    eyebrow: "Sobre mí",
    title: "Quién soy y cómo trabajo.",
    lead: "Ingeniero de Sistemas y Telecomunicaciones (UCP, 2026). Desarrollo con agentes de IA bajo un ciclo de ingeniería escrito: definir, planear, construir, verificar, entregar. Nada cuenta como terminado sin evidencia.",
    chain: [
      {
        year: "2025",
        title: "Del sensor al modelo",
        body: "Mi proyecto de grado: cuatro redes neuronales comparadas para detectar fallas en maquinaria industrial, con predicciones en vivo.",
        steps: [],
      },
      {
        year: "2026",
        title: "De la landing al despliegue",
        body: "Diez proyectos en producción, en dos países. La cadena completa:",
        steps: [
          "Sitios y landings",
          "Embudos con captura y medición",
          "Automatización y agentes de IA",
        ],
      },
    ],
    workflow: {
      label: "Mi flujo con agentes de IA, documentado en GitHub",
      href: "https://github.com/Uruena2603/Personal-blog/tree/main/docs/agent-workflow",
    },
  },
  clientWork: {
    eyebrow: "Mi trabajo",
    title: "Proyectos que puedes abrir ahora mismo.",
    lead: "Desliza: clientes reales primero, luego producto propio, embudos de afiliado y demos.",
    prevLabel: "Proyecto anterior",
    nextLabel: "Proyecto siguiente",
    projects: [
      {
        name: "Mina's Massage",
        meta: "Cliente · Terapeuta posoperatoria · Dallas y Miami, EE. UU.",
        href: "https://minasmassage.com",
        linkLabel: "minasmassage.com",
        image: "/img/proyectos/minasmassage.webp",
      },
      {
        name: "ECMO",
        meta: "Cliente · Embudo de captación · 250+ registros",
        href: "https://ecmo-lp.pages.dev",
        linkLabel: "ecmo-lp.pages.dev",
        image: "/img/proyectos/ecmo-lp.webp",
      },
      {
        name: "A Viajar Tours",
        meta: "Cliente · Agencia de viajes · RNT 281494",
        href: "https://a-viajar-tours.pages.dev",
        linkLabel: "a-viajar-tours.pages.dev",
        image: "/img/proyectos/a-viajar-tours.webp",
      },
      {
        name: "HandOff Chat",
        meta: "Producto propio · Agentes de IA para WhatsApp",
        href: "https://handoffchat.com",
        linkLabel: "handoffchat.com",
        image: "/img/proyectos/handoffchat.webp",
      },
      {
        name: "Taller de IA",
        meta: "Afiliado Hotmart · Captación de leads hacia un evento en vivo",
        href: "https://impulso-digital-98a.pages.dev/taller-inteligencia-artificial/",
        linkLabel: "Ver landing",
        image: "/img/proyectos/taller-ia.webp",
      },
      {
        name: "Hábito Nutritivo",
        meta: "Afiliado Hotmart · Venta directa del reto de recetas",
        href: "https://habito-nutritivo-recetas-21-dias.pages.dev/",
        linkLabel: "Ver landing",
        image: "/img/proyectos/habito-nutritivo.webp",
      },
      {
        name: "Kit de Bebidas",
        meta: "Afiliado Hotmart · Registro con recetarios de regalo",
        href: "https://habito-nutritivo-recetas-21-dias.pages.dev/kit-bebidas",
        linkLabel: "Ver landing",
        image: "/img/proyectos/kit-bebidas.webp",
      },
      {
        name: "California.pei",
        meta: "Demo · E-commerce con catálogo, carrito y pedido por WhatsApp",
        href: "https://californiapei.vercel.app/",
        linkLabel: "Ver demo",
        image: "/img/proyectos/california-pei.webp",
      },
      {
        name: "ChatBot Mental Health",
        meta: "Participación · Proyecto universitario con BERT",
        href: "https://github.com/Nico2603/ChatBot-MentalHealth-BERT",
        linkLabel: "Ver repositorio",
        image: "/img/proyectos/chatbot-bert.webp",
      },
      {
        name: "Magia Cafetera",
        meta: "Participación · UI de turismo del Eje Cafetero",
        href: "https://uruena2603.github.io/magiacafetera-ui/",
        linkLabel: "Ver sitio",
        image: "/img/proyectos/magia-cafetera.webp",
      },
    ],
  },
  caseStudy: {
    eyebrow: "Caso destacado",
    title: "El embudo de ECMO, de principio a fin.",
    lead: "La pauta la llevó mi hermano. El resto lo construí y lo conecté yo.",
    steps: [
      {
        n: "01",
        title: "El problema",
        body: "Un médico con audiencia, pero sin forma de capturarla.",
      },
      {
        n: "02",
        title: "Lo que construí",
        body: "Una landing que entrega un ebook a cambio del correo y lleva el lead al grupo de WhatsApp donde él vende.",
      },
      {
        n: "03",
        title: "Cómo se conecta",
        body: "El sitio se sirve desde la red de Cloudflare y no necesita servidor propio; una sola función guarda los leads en Supabase. GA4, Meta Pixel y Clarity miden el embudo.",
      },
    ],
    results: [
      { value: "250+", label: "registros captados" },
      { value: "~170", label: "personas en el grupo de WhatsApp" },
    ],
    cta: "Ver el embudo",
  },
  engineering: {
    eyebrow: "Ingeniería",
    title: "Antes de los embudos, y en paralelo a ellos.",
    items: [
      {
        kind: "Proyecto de grado · Universidad Católica de Pereira",
        title:
          "Evaluación de algoritmos de Deep Learning para un sistema de mantenimiento predictivo mediante diseño de experimentos",
        body: "Comparé RNN, LSTM, CNN y TCN con diseño de experimentos y construí el software web de predicción en tiempo real.",
        tags: ["Python", "RNN", "LSTM", "CNN", "TCN", "Diseño de experimentos"],
      },
      {
        kind: "Producto propio · pausado",
        title: "HandOff Chat: agentes de IA para atención por WhatsApp",
        body: "Landing y aplicación web con autenticación y base de datos, y agentes de IA construidos sobre n8n con la API oficial de WhatsApp Business y modelos vía OpenRouter.",
        tags: ["Next.js", "Supabase", "n8n", "WhatsApp Business API", "OpenRouter"],
      },
    ],
  },
  knowledge: {
    eyebrow: "Conocimientos",
    title: "Cinco años de carrera, por profundidad.",
    lead: "",
    tiers: [
      {
        label: "Lo que uso hoy",
        note: "",
        groups: [
          {
            name: "Web",
            items: [
              "Next.js",
              "TypeScript",
              "React",
              "Astro",
              "Tailwind",
              "shadcn/ui",
            ],
          },
          {
            name: "Datos y backend",
            items: ["Supabase", "PostgreSQL", "Cloudflare Functions"],
          },
          {
            name: "Despliegue",
            items: ["Cloudflare Pages", "Vercel", "Coolify", "Git"],
          },
          {
            name: "Medición y automatización",
            items: ["n8n", "GA4", "Meta Pixel", "Microsoft Clarity"],
          },
        ],
      },
      {
        label: "Formación e investigación",
        note: "",
        groups: [
          {
            name: "IA y datos",
            items: [
              "Python",
              "TensorFlow",
              "PyTorch",
              "scikit-learn",
              "Pandas",
              "Diseño de experimentos",
            ],
          },
          {
            name: "Backend, web y sistemas",
            items: [
              "Java",
              "Spring Boot",
              "FastAPI",
              "Node.js",
              "Angular",
              "MySQL",
              "MQTT",
              "Arduino",
            ],
          },
        ],
      },
      {
        label: "Explorando",
        note: "",
        groups: [
          {
            name: "Seguridad",
            items: ["Hack The Box", "OverTheWire", "nmap"],
          },
        ],
      },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "¿Tienes algo que construir o conectar?",
    lead: "Escríbeme y te respondo. Mi código público está en GitHub.",
    cv: {
      meta: "Hoja de vida",
      title: "El detalle completo, en PDF.",
      body: "",
      primary: {
        label: "CV en español",
        href: "/cv/Juan-Alejandro-Uruena-CV-ES.pdf",
      },
      secondary: {
        label: "Résumé in English",
        href: "/cv/Juan-Alejandro-Uruena-CV-EN.pdf",
      },
    },
  },
  footer: {
    links: [
      { href: "https://github.com/Uruena2603", label: "GitHub" },
      {
        href: "https://www.linkedin.com/in/juan-alejandro-urueña-serna",
        label: "LinkedIn",
      },
      { href: "mailto:alejourus2003@gmail.com", label: "Correo" },
    ],
    meta: "Pereira, Colombia",
  },
};

export type Dictionary = typeof es;
