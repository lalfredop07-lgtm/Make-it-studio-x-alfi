import type { Metadata } from "next";
import { about, services, site } from "@/content/site";
import { photos, videos } from "@/content/media";
import { Plate } from "@/components/ui/Plate";
import { VideoPlate } from "@/components/ui/VideoPlate";
import { Label } from "@/components/ui/Label";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";

export const metadata: Metadata = {
  title: "Estudio",
  description:
    "Make It Studio: más de una década de creación de contenido, estrategia, social media y paid media para marcas de hostelería, fitness, retail y lifestyle en Madrid y México.",
  alternates: { canonical: "/estudio" },
};

export default function EstudioPage() {
  return (
    <div className="pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))]">
      <div className="shell">
        <Label rule={false}>{about.label}</Label>
        <h1 className="t-display mt-5 max-w-[16ch]">
          <RevealText as="span" text="Más de una década" className="t-display block" />
          <RevealText as="span" text="haciendo que pase." delay={0.1} className="t-display block text-red italic" />
        </h1>

        <div className="grid12 mt-[clamp(3.5rem,7vw,6rem)] items-start">
          <div className="col-span-12 space-y-6 lg:col-span-6">
            {about.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <p className="t-lead text-ink-soft">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <p className="t-small text-ink-soft">
                {site.experience} de experiencia. Trabajamos desde {site.locations.join(" y ")}.
              </p>
            </Reveal>
          </div>

          <Reveal className="col-span-10 col-start-2 mt-12 sm:col-span-6 sm:col-start-4 lg:col-span-5 lg:col-start-8 lg:mt-0" delay={0.12}>
            <VideoPlate video={videos.reel} mode="ambient" ratio="9 / 16" />
            <p className="t-caption mt-3">Showreel · 2026</p>
          </Reveal>
        </div>
      </div>

      {/* ------------------------------------------------------ cómo trabajamos */}
      <section className="shell mt-[var(--space-section)]">
        <Label>Cómo trabajamos</Label>
        <div className="grid12 mt-10">
          <ol className="col-span-12 lg:col-span-7">
            {[
              {
                n: "01",
                t: "Entendemos el negocio",
                d: "Antes que el feed. Qué vendes, a quién, qué te diferencia de los tres locales de tu misma calle.",
              },
              {
                n: "02",
                t: "Llamada de preproducción",
                d: "Cada rodaje empieza con una llamada donde tú traes tus ideas y nosotros las nuestras. Se decide ahí qué se graba y por qué.",
              },
              {
                n: "03",
                t: "Rodaje en tu local",
                d: "Vamos donde pasan las cosas, en horario real, con tus clientes dentro. De una jornada sale el material de semanas.",
              },
              {
                n: "04",
                t: "Publicación y lectura",
                d: "Edición, calendario, comunidad y campañas. Después se mira qué ha funcionado y eso decide lo siguiente.",
              },
            ].map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.06} className="border-t border-[var(--rule)] last:border-b">
                <div className="flex items-baseline gap-5 py-7 sm:gap-8">
                  <span className="t-label num shrink-0 text-ink-faint">{step.n}</span>
                  <div>
                    <h2 className="t-h3">{step.t}</h2>
                    <p className="t-small mt-3 max-w-[50ch] text-ink-soft">{step.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="col-span-12 mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0" delay={0.1}>
            <Plate
              photo={photos.kuikkuNogal}
              ratio="portrait"
              sizes="(max-width: 1024px) 100vw, 32vw"
              quality={76}
            />
            <ul className="mt-8 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
              {about.sectors.map((s) => (
                <li key={s} className="t-label py-3 text-ink-soft">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ servicios */}
      <section className="shell mt-[var(--space-section)] pb-[var(--space-section)]">
        <Label>Servicios</Label>
        <div className="grid12 mt-10 gap-y-10">
          {services.items.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.06} className="col-span-12 sm:col-span-6 lg:col-span-3">
              <div className="border-t border-[var(--rule)] pt-5">
                <span className="t-label num text-ink-faint">{item.n}</span>
                <h2 className="t-h3 mt-3">{item.title}</h2>
                <p className="t-small mt-4 text-ink-soft">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-[clamp(3rem,6vw,5rem)] border-l-2 border-red pl-6" delay={0.1}>
          <p className="t-h2 max-w-[20ch] italic">{about.pullQuote}</p>
        </Reveal>

        <div className="mt-12">
          <ArrowLink href="/contacto" size="lg">
            Hablemos de tu marca
          </ArrowLink>
        </div>
      </section>
    </div>
  );
}
