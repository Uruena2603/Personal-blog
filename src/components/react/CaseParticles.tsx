// Puente Astro → Particles (ReactBits) para la sección del caso ECMO.
// Monta y desmonta el efecto según visibilidad: el rAF interno de Particles
// no corre cuando la sección está fuera de pantalla.
import { useEffect, useRef, useState } from "react";
import Particles from "./Particles";
import { canRunWebGl } from "./canRunWebGl";

export default function CaseParticles() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (canRunWebGl()) setEnabled(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      {enabled && visible && (
        <Particles
          particleCount={140}
          particleSpread={11}
          speed={0.07}
          particleBaseSize={70}
          sizeRandomness={0.9}
          alphaParticles
          disableRotation
          particleColors={["#a78bfa", "#22d3ee", "#e9ecf5"]}
        />
      )}
    </div>
  );
}
