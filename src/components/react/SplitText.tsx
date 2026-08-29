// Adaptado de ReactBits (reactbits.dev/text-animations/split-text, MIT).
// Cambios respecto al original, exigidos por este proyecto:
// - Recibe pre/highlight/post en vez de texto plano: el titular lleva un
//   tramo con gradiente y el original no admite marcado anidado.
// - No anima con prefers-reduced-motion (presupuesto de CLAUDE.md).
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export interface SplitTextProps {
  pre: string;
  highlight: string;
  post: string;
  delay?: number;
  duration?: number;
  ease?: string;
}

export default function SplitText({
  pre,
  highlight,
  post,
  delay = 28,
  duration = 1.1,
  ease = "power3.out",
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (document.fonts.status === "loaded") {
      setReady(true);
    } else {
      document.fonts.ready.then(() => setReady(true));
    }
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !ready || done.current) return;

      const split = new GSAPSplitText(el, {
        type: "words",
        smartWrap: true,
        wordsClass: "split-word",
        reduceWhiteSpace: false,
        // El "auto" de GSAP pone aria-label en un span genérico, cosa que
        // WAI-ARIA prohíbe (falla aria-prohibited-attr en Lighthouse). Con
        // words los lectores de pantalla leen el texto tal cual.
        aria: "none",
        onSplit: (self: GSAPSplitText) =>
          gsap.fromTo(
            self.words,
            { opacity: 0, y: 34 },
            {
              opacity: 1,
              y: 0,
              duration,
              ease,
              stagger: delay / 1000,
              onComplete: () => {
                done.current = true;
              },
              willChange: "transform, opacity",
              force3D: true,
            },
          ),
      });

      return () => {
        try {
          split.revert();
        } catch {
          /* ya revertido */
        }
      };
    },
    { dependencies: [ready], scope: ref },
  );

  return (
    <span ref={ref} style={{ display: "inline-block" }}>
      {pre}
      <span className="gradient-text">{highlight}</span>
      {post}
    </span>
  );
}
