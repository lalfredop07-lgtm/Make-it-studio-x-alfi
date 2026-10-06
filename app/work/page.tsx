import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { photos } from "@/content/media";
import { Plate } from "@/components/ui/Plate";
import { Label, SectionNumber } from "@/components/ui/Label";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";

export const metadata: Metadata = {
  title: "Trabajo",
  description:
    "Proyectos de Make It Studio: contenido, estrategia y social media para restaurantes, estudios de fitness, cafeterías y marcas de lifestyle en Madrid.",
  alternates: { canonical: "/work" },
};

/**
 * ÍNDICE DE TRABAJO — pliego vertical, no el carril de la home.
 * Las fichas alternan de lado y cambian de escala: se lee como un sumario.
 */
export default function WorkIndex() {
  return (
    <div className="shell pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))] pb-[var(--space-section)]">
      {/* Aquí la etiqueta es solo un antetítulo: el encabezado de la página es
          el h1 que viene justo debajo. */}
      <Label rule={false}>Selected Work</Label>
      <h1 className="t-display mt-5 max-w-[14ch]">
        <RevealText as="span" text="Marcas con las que" className="t-display block" />
        <RevealText as="span" text="llevamos años." delay={0.1} className="t-display block text-red italic" />
      </h1>

      <hr className="rule mt-[clamp(3rem,6vw,5rem)]" />

      <ul>
        {projects.map((project, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={project.slug} className="border-b border-[var(--rule)]">
              <Link
                href={`/work/${project.slug}`}
                className="group focus-plate block py-[clamp(2.5rem,5vw,4.5rem)]"
                data-cursor="VER PROYECTO"
              >
                <div className="grid12 items-center gap-y-8">
                  <div
                    className={
                      flip
                        ? "col-span-12 sm:col-span-4 sm:col-start-9 sm:row-start-1"
                        : "col-span-12 sm:col-span-4"
                    }
                  >
                    <div className="overflow-hidden">
                      <div className="transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]">
                        <Plate
                          photo={photos[project.cover]}
                          ratio={flip ? "portrait" : "wide"}
                          sizes="(max-width: 640px) 100vw, 33vw"
                          quality={76}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={flip ? "col-span-12 sm:col-span-6 sm:row-start-1" : "col-span-12 sm:col-span-6 sm:col-start-6"}>
                    <div className="flex items-start gap-5">
                      <SectionNumber n={String(i + 1).padStart(2, "0")} />
                      <div>
                        <h2 className="t-h2 transition-colors duration-300 group-hover:text-red">
                          {project.client}
                        </h2>
                        <p className="t-label mt-3 text-ink-soft">
                          {project.category} · {project.location}
                          {project.relationship ? ` · ${project.relationship}` : ""}
                        </p>
                        <p className="t-small mt-5 max-w-[46ch] text-ink-soft">{project.intro}</p>
                        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                          {project.services.map((s) => (
                            <li key={s} className="t-label text-ink-faint">
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <Reveal className="mt-[clamp(3rem,6vw,5rem)]">
        <p className="t-lead max-w-[34ch] text-ink-soft">
          ¿Tu marca podría estar en esta lista?{" "}
          <Link href="/contacto" className="link-underline text-red">
            Hablemos
          </Link>
          .
        </p>
      </Reveal>
    </div>
  );
}
