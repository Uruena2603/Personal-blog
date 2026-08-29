import type { Dictionary } from "./es";

// Derivado de los textos EN ya aprobados (README de GitHub, perfil de LinkedIn).
export const en: Dictionary = {
  meta: {
    lang: "en",
    ogLocale: "en_US",
    ogLocaleAlternate: "es_CO",
    title: "Juan Alejandro Urueña Serna | Systems and Telecommunications Engineer",
    description:
      "Systems and Telecommunications Engineer. Websites, funnels, and AI automation for clients in the U.S. and Colombia. Ten projects in production.",
    jobTitle: "Systems and Telecommunications Engineer",
    skipLink: "Skip to content",
  },
  nav: {
    ariaLabel: "Main navigation",
    links: [
      { href: "#about", label: "About" },
      { href: "#work", label: "Work" },
      { href: "#engineering", label: "Engineering" },
      { href: "#skills", label: "Skills" },
      { href: "#contact", label: "Contact" },
    ],
    langSwitch: { href: "/es/", label: "ES", ariaLabel: "Leer en español" },
    menuLabel: "Open menu",
    closeLabel: "Close menu",
  },
  hero: {
    name: "Juan Alejandro Urueña Serna",
    greeting: "Hi, I'm Juan Urueña 👋",
    photoAlt: "Portrait of Juan Alejandro Urueña Serna",
    claimPre: "I build ",
    claimHighlight: "complete systems",
    claimPost: ", not loose pieces.",
    support:
      "Systems and Telecommunications Engineer. From the sensor to the model and from the landing page to deployment.",
    ctaPrimary: "See the work",
    ctaSecondary: "Let's talk",
  },
  about: {
    eyebrow: "About",
    title: "Who I am and how I work.",
    lead: "Systems and Telecommunications Engineer (UCP, 2026). I develop with AI agents under a written engineering cycle: define, plan, build, verify, ship. Nothing counts as done without evidence.",
    chain: [
      {
        year: "2025",
        title: "From the sensor to the model",
        body: "My degree project: four neural networks compared to detect faults in industrial machinery, with live predictions.",
        steps: [],
      },
      {
        year: "2026",
        title: "From the landing page to deployment",
        body: "Ten projects in production, across two countries. The full chain:",
        steps: [
          "Sites and landing pages",
          "Funnels with capture and tracking",
          "Automation and AI agents",
        ],
      },
    ],
    workflow: {
      label: "My AI-agent workflow, documented on GitHub",
      href: "https://github.com/Uruena2603/Personal-blog/tree/main/docs/agent-workflow",
    },
  },
  clientWork: {
    eyebrow: "My work",
    title: "Projects you can open right now.",
    lead: "Swipe through: real clients first, then my own product, affiliate funnels, and demos.",
    prevLabel: "Previous project",
    nextLabel: "Next project",
    projects: [
      {
        name: "Mina's Massage",
        meta: "Client · Post-surgical therapist · Dallas and Miami, USA",
        href: "https://minasmassage.com",
        linkLabel: "minasmassage.com",
        image: "/img/proyectos/minasmassage.webp",
      },
      {
        name: "ECMO",
        meta: "Client · Lead-generation funnel · 250+ sign-ups",
        href: "https://ecmo-lp.pages.dev",
        linkLabel: "ecmo-lp.pages.dev",
        image: "/img/proyectos/ecmo-lp.webp",
      },
      {
        name: "A Viajar Tours",
        meta: "Client · Travel agency · RNT 281494",
        href: "https://a-viajar-tours.pages.dev",
        linkLabel: "a-viajar-tours.pages.dev",
        image: "/img/proyectos/a-viajar-tours.webp",
      },
      {
        name: "HandOff Chat",
        meta: "Own product · AI agents for WhatsApp",
        href: "https://handoffchat.com",
        linkLabel: "handoffchat.com",
        image: "/img/proyectos/handoffchat.webp",
      },
      {
        name: "AI Workshop",
        meta: "Hotmart affiliate · Lead generation for a live event",
        href: "https://impulso-digital-98a.pages.dev/taller-inteligencia-artificial/",
        linkLabel: "View landing",
        image: "/img/proyectos/taller-ia.webp",
      },
      {
        name: "Hábito Nutritivo",
        meta: "Hotmart affiliate · Direct sale of the recipe challenge",
        href: "https://habito-nutritivo-recetas-21-dias.pages.dev/",
        linkLabel: "View landing",
        image: "/img/proyectos/habito-nutritivo.webp",
      },
      {
        name: "Drinks Kit",
        meta: "Hotmart affiliate · Sign-up with free recipe books",
        href: "https://habito-nutritivo-recetas-21-dias.pages.dev/kit-bebidas",
        linkLabel: "View landing",
        image: "/img/proyectos/kit-bebidas.webp",
      },
      {
        name: "California.pei",
        meta: "Demo · E-commerce with catalog, cart, and WhatsApp checkout",
        href: "https://californiapei.vercel.app/",
        linkLabel: "View demo",
        image: "/img/proyectos/california-pei.webp",
      },
      {
        name: "ChatBot Mental Health",
        meta: "Contribution · University project with BERT",
        href: "https://github.com/Nico2603/ChatBot-MentalHealth-BERT",
        linkLabel: "View repository",
        image: "/img/proyectos/chatbot-bert.webp",
      },
      {
        name: "Magia Cafetera",
        meta: "Contribution · Coffee-region tourism UI",
        href: "https://uruena2603.github.io/magiacafetera-ui/",
        linkLabel: "View site",
        image: "/img/proyectos/magia-cafetera.webp",
      },
    ],
  },
  caseStudy: {
    eyebrow: "Featured case",
    title: "The ECMO funnel, end to end.",
    lead: "My brother ran the ads. The rest I built and connected myself.",
    steps: [
      {
        n: "01",
        title: "The problem",
        body: "A doctor with an audience, but no way to capture it.",
      },
      {
        n: "02",
        title: "What I built",
        body: "A landing page that trades an ebook for an email and takes the lead to the WhatsApp group where he sells.",
      },
      {
        n: "03",
        title: "How it connects",
        body: "Static site on Cloudflare's edge; a single Function writes leads to Supabase. GA4, Meta Pixel, and Clarity measure the funnel.",
      },
    ],
    results: [
      { value: "250+", label: "sign-ups captured" },
      { value: "~170", label: "people in the WhatsApp group" },
    ],
    cta: "See the funnel",
  },
  engineering: {
    eyebrow: "Engineering",
    title: "Before the funnels, and alongside them.",
    items: [
      {
        kind: "Degree project · Universidad Católica de Pereira",
        title:
          "Evaluation of Deep Learning algorithms for a predictive maintenance system using Design of Experiments",
        body: "Compared RNN, LSTM, CNN, and TCN with Design of Experiments and built the real-time prediction web software.",
        tags: ["Python", "RNN", "LSTM", "CNN", "TCN", "Design of Experiments"],
      },
      {
        kind: "Own product · paused",
        title: "HandOff Chat: AI agents for WhatsApp support",
        body: "Landing and web app with authentication and a database, plus AI agents built on n8n with the official WhatsApp Business API and models via OpenRouter.",
        tags: ["Next.js", "Supabase", "n8n", "WhatsApp Business API", "OpenRouter"],
      },
    ],
  },
  knowledge: {
    eyebrow: "Skills",
    title: "Five years of engineering school, by depth.",
    lead: "",
    tiers: [
      {
        label: "What I use today",
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
            name: "Data and backend",
            items: ["Supabase", "PostgreSQL", "Cloudflare Functions"],
          },
          {
            name: "Deployment",
            items: ["Cloudflare Pages", "Vercel", "Coolify", "Git"],
          },
          {
            name: "Analytics and automation",
            items: ["n8n", "GA4", "Meta Pixel", "Microsoft Clarity"],
          },
        ],
      },
      {
        label: "Education and research",
        note: "",
        groups: [
          {
            name: "AI and data",
            items: [
              "Python",
              "TensorFlow",
              "PyTorch",
              "scikit-learn",
              "Pandas",
              "Design of Experiments",
            ],
          },
          {
            name: "Backend, web, and systems",
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
        label: "Exploring",
        note: "",
        groups: [
          {
            name: "Security",
            items: ["Hack The Box", "OverTheWire", "nmap"],
          },
        ],
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Have something to build or connect?",
    lead: "Write to me and I will reply. My public code is on GitHub.",
    cv: {
      meta: "Résumé",
      title: "The full detail, in PDF.",
      body: "",
      primary: {
        label: "Résumé in English",
        href: "/cv/Juan-Alejandro-Uruena-CV-EN.pdf",
      },
      secondary: {
        label: "CV en español",
        href: "/cv/Juan-Alejandro-Uruena-CV-ES.pdf",
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
      { href: "mailto:alejourus2003@gmail.com", label: "Email" },
    ],
    meta: "Pereira, Colombia",
  },
};
