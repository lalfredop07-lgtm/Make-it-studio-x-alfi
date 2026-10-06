import { manifesto } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";

/**
 * MANIFIESTO — el momento tranquilo de la página.
 * Dos líneas, mucho aire y nada más. Si se le añade algo, deja de funcionar.
 */
export function Manifesto() {
  return (
    <section className="shell py-[var(--space-section)]">
      <div className="grid12">
        <h2 className="col-span-12 lg:col-span-10">
          {manifesto.lines.map((line, i) => (
            <RevealText
              key={line}
              as="span"
              text={line}
              delay={i * 0.12}
              className={`t-display block ${i === 1 ? "text-red italic" : ""}`}
            />
          ))}
        </h2>

        <Reveal
          className="col-span-12 mt-[clamp(2.5rem,5vw,4.5rem)] sm:col-span-9 sm:col-start-4 lg:col-span-5 lg:col-start-8"
          delay={0.2}
        >
          <p className="t-lead text-ink-soft">{manifesto.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
