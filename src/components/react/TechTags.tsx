// Etiquetas con logo para las secciones estáticas de conocimientos.
// Se usa SIN directiva client:* -> Astro lo renderiza en el build y no envía
// ni React ni los SVG como JavaScript al navegador.
import { TECH_ICONS } from "./techIcons";

export default function TechTags({ items }: { items: string[] }) {
  return (
    <ul className="tags">
      {items.map((item) => {
        const Icon = TECH_ICONS[item];
        return (
          <li key={item} className={Icon ? "tag stack-pill" : "tag"}>
            {Icon && <Icon aria-hidden="true" />}
            {item}
          </li>
        );
      })}
    </ul>
  );
}
