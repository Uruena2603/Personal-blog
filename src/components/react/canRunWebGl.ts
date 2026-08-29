// Compuerta única del presupuesto para todo efecto WebGL: fuera con
// reduced-motion, en viewport móvil y en máquinas de pocos núcleos.
export function canRunWebGl(): boolean {
  // matchMedia y no innerWidth: las media queries siguen el viewport de
  // layout, que es el que emulan las DevTools y el que usa el CSS.
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    window.matchMedia("(min-width: 768px)").matches &&
    (navigator.hardwareConcurrency ?? 0) >= 4
  );
}
