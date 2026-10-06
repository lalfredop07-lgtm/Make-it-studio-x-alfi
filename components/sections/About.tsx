import { about } from "@/content/site";
import { photos } from "@/content/media";
import { Plate } from "@/components/ui/Plate";
import { Label } from "@/components/ui/Label";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";

/**
 * EL ESTUDIO — quiénes somos, sin párrafo corporativo.
 *
 * Nada de equipo ni biografías: no tenemos esa información confirmada y
 * preferimos un bloque corto y verdadero a una plantilla rellena.
 */
export function About() {
  return (
    <section className="bg-paper-warm">
      <div className="shell py-[var(--space-section)]">
        <div className="grid12 items-start">
          <div className="col-span-12 lg:col-span-7">
            <Label rule={false}>{about.label}</Label>
            <h2 className="mt-5">
              {about.title.split("\n").map((line, i) => (
                <RevealText key={line} as="span" text={line} delay={i * 0.1} className="t-display block" />
              ))}
            </h2>

            <div className="mt-[clamp(2.5rem,5vw,4rem)] max-w-[52ch] space-y-5">
              {about.body.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="t-small text-ink-soft">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.26} className="mt-10 border-l-2 border-red pl-6">
              <p className="t-h3 italic">{about.pullQuote}</p>
            </Reveal>

            <Reveal delay={0.32} className="mt-10">
              <ArrowLink href="/estudio" size="lg">
                Conoce el estudio
              </ArrowLink>
            </Reveal>
          </div>

          <div className="col-span-10 col-start-2 mt-12 sm:col-span-6 sm:col-start-4 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <Plate
              photo={photos.kuikkuBrindis}
              ratio="tall"
              sizes="(max-width: 640px) 83vw, (max-width: 1024px) 50vw, 32vw"
            />

            <ul className="mt-8 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
              {about.sectors.map((s) => (
                <li key={s} className="t-label py-3 text-ink-soft">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
