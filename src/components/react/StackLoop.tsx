// Puente Astro → LogoLoop (ReactBits): las props de una isla deben ser
// serializables, así que recibe strings y resuelve aquí el logo SVG oficial
// del mapa compartido. Sin logo conocido, la píldora va solo con texto.
import LogoLoop from "./LogoLoop";
import { TECH_ICONS } from "./techIcons";

interface StackLoopProps {
  items: string[];
  ariaLabel: string;
}

export default function StackLoop({ items, ariaLabel }: StackLoopProps) {
  return (
    <LogoLoop
      logos={items.map((item) => {
        // Siempre .stack-pill, con o sin logo: si difieren los paddings, la
        // píldora sin icono (Clarity) queda desfasada en la marquesina.
        const Icon = TECH_ICONS[item];
        return {
          node: (
            <span className="tag stack-pill">
              {Icon && <Icon aria-hidden="true" />}
              {item}
            </span>
          ),
          title: item,
        };
      })}
      speed={48}
      gap={14}
      logoHeight={36}
      pauseOnHover
      fadeOut
      fadeOutColor="#07080c"
      ariaLabel={ariaLabel}
    />
  );
}
