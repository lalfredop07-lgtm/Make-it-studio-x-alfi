import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { photos, videos } from "@/content/media";
import { testimonials } from "@/content/site";
import { Plate } from "@/components/ui/Plate";
import { VideoPlate } from "@/components/ui/VideoPlate";
import { Label } from "@/components/ui/Label";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.client,
    description: project.intro,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.client} · Make It Studio`, description: project.intro },
  };
}

/**
 * PLANTILLA DE CASO — reutilizable y tolerante a material escaso.
 *
 * Con muchas fotos monta un pliego; con una sola se apoya en tipografía y aire,
 * que es como se resuelve en una revista cuando solo hay una buena imagen.
 * Nunca se rellena con material de relleno.
 */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const quote = project.testimonial
    ? testimonials.items.find((t) => t.id === project.testimonial)
    : undefined;

  return (
    <article>
      {/* ------------------------------------------------------- cabecera -- */}
      <header className="shell pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))]">
        <Label rule={false}>{project.category}</Label>
        <h1 className="mt-5">
          <RevealText as="span" text={project.client} className="t-display block" />
        </h1>

        <dl className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-2 gap-y-8 border-t border-[var(--rule)] pt-6 sm:grid-cols-4">
          <div>
            <dt className="t-label text-ink-faint">Cliente</dt>
            <dd className="t-small mt-2">{project.client}</dd>
          </div>
          <div>
            <dt className="t-label text-ink-faint">Lugar</dt>
            <dd className="t-small mt-2">{project.location}</dd>
          </div>
          <div>
            <dt className="t-label text-ink-faint">Relación</dt>
            <dd className="t-small mt-2">{project.relationship ?? "En curso"}</dd>
          </div>
          <div>
            <dt className="t-label text-ink-faint">Servicios</dt>
            <dd className="t-small mt-2">
              <ul>
                {project.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </header>

      {/* ---------------------------------------------------- media + intro */}
      <div className="shell mt-[clamp(3rem,6vw,5rem)]">
        <div className="grid12 items-end">
          <div className="col-span-12 sm:col-span-7">
            <Plate
              photo={photos[project.cover]}
              ratio="wide"
              priority
              quality={82}
              sizes="(max-width: 640px) 100vw, 58vw"
            />
          </div>
          <Reveal className="col-span-12 mt-8 sm:col-span-4 sm:col-start-9 sm:mt-0" delay={0.1}>
            <p className="t-lead">{project.intro}</p>
          </Reveal>
        </div>
      </div>

      {project.body ? (
        <div className="shell mt-[clamp(3rem,6vw,5rem)]">
          <div className="grid12">
            <div className="col-span-12 space-y-5 sm:col-span-7 sm:col-start-4 lg:col-span-6 lg:col-start-4">
              {project.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="t-small text-ink-soft">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* ------------------------------------------------------- galería --- */}
      {project.gallery.length > 0 ? (
        <section className="shell mt-[var(--space-tight)]" aria-label="Galería del proyecto">
          <div className="grid12 items-start gap-y-[clamp(1.5rem,3vw,3rem)]">
            {project.gallery.map((key, i) => {
              // Ritmo irregular deliberado: 3 anchos que se repiten en ciclo.
              const span = [
                "col-span-12 sm:col-span-7",
                "col-span-7 sm:col-span-4 sm:col-start-9 sm:mt-24",
                "col-span-12 sm:col-span-5",
                "col-span-8 col-start-5 sm:col-span-6 sm:col-start-7 sm:mt-12",
              ][i % 4];
              return (
                <div key={key} className={span}>
                  <Plate
                    photo={photos[key]}
                    ratio={i % 3 === 0 ? "wide" : "portrait"}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    quality={76}
                  />
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* -------------------------------------------------------- vídeo ---- */}
      {project.video ? (
        <section className="shell mt-[var(--space-tight)]" aria-label="Vídeo del proyecto">
          <div className="grid12 items-center">
            <Reveal className="col-span-8 col-start-3 sm:col-span-4 sm:col-start-1">
              <VideoPlate video={videos[project.video]} mode="testimonial" ratio="9 / 14" />
            </Reveal>
            {quote ? (
              <Reveal className="col-span-12 mt-10 sm:col-span-6 sm:col-start-6 sm:mt-0" delay={0.1}>
                <blockquote>
                  <p className="t-h3">
                    <span aria-hidden="true" className="text-red">“</span>
                    {quote.quote}
                    <span aria-hidden="true" className="text-red">”</span>
                  </p>
                  <footer className="t-label mt-6 text-ink-soft">{quote.client}</footer>
                </blockquote>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* -------------------------------------------- siguiente proyecto --- */}
      <nav aria-label="Siguiente proyecto" className="shell mt-[var(--space-section)] pb-[clamp(4rem,8vw,7rem)]">
        <hr className="rule" />
        <Link href={`/work/${next.slug}`} className="group focus-plate flex items-end justify-between gap-6 pt-8">
          <div>
            <span className="t-label text-ink-faint">Siguiente proyecto</span>
            <span className="t-h2 mt-3 block transition-colors duration-300 group-hover:text-red">
              {next.client}
            </span>
          </div>
          <span
            aria-hidden="true"
            className="t-h3 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2"
          >
            →
          </span>
        </Link>
        <div className="mt-10">
          <ArrowLink href="/work">Volver al índice</ArrowLink>
        </div>
      </nav>
    </article>
  );
}
