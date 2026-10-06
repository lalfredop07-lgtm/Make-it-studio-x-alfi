"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { projects } from "@/content/projects";
import { photos } from "@/content/media";
import { Plate } from "@/components/ui/Plate";
import { SectionNumber } from "@/components/ui/Label";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { useMediaQuery } from "@/lib/media";

/**
 * SELECTED WORK — el carril de proyectos.
 *
 * En escritorio el bloque se fija y el scroll vertical desplaza los proyectos
 * en horizontal. El recorrido se mide en píxeles reales (no en vh), así que la
 * velocidad es la misma con tres proyectos que con diez.
 *
 * Por debajo de 1024px, o con movimiento reducido, no se fija nada: queda un
 * carrusel nativo con scroll-snap, que es lo que un pulgar espera.
 */
export function SelectedWork() {
  const reduced = useReducedMotion();
  // Solo se fija el carril en escritorio: en móvil manda el pulgar.
  const pinned = useMediaQuery("(min-width: 1024px)") && !reduced;

  return (
    <section id="trabajo" className="pt-[var(--space-section)]">
      <div className="shell">
        {/* Encabezado real de la sección para la jerarquía del documento y
            lectores de pantalla: sin él, la sección se quedaría sin h2. */}
        <h2 className="sr-only">Selected Work</h2>
        <div className="flex justify-end">
          <ArrowLink href="/work">Ver todos los proyectos</ArrowLink>
        </div>
        <hr className="rule mt-6" />
      </div>

      {pinned ? <PinnedRail /> : <SwipeRail />}
    </section>
  );
}

/* ------------------------------------------------------------- escritorio -- */

function PinnedRail() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      // Cuánto hay que arrastrar para que el último proyecto quede a la vista.
      const overflow = track.current.scrollWidth - window.innerWidth;
      setTravel(Math.max(0, overflow));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  // Muelle suave: evita el "pegado" del scroll nativo sin secuestrarlo.
  const x = useSpring(raw, { stiffness: 220, damping: 40, mass: 0.6 });

  return (
    <div ref={outer} style={{ height: `calc(100vh + ${travel}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex gap-[clamp(1.5rem,3vw,3.5rem)] px-[clamp(1.25rem,4.2vw,5rem)] will-change-transform">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
          <RailEnd />
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ móvil -- */

function SwipeRail() {
  return (
    <div className="hscroll mt-10 flex snap-x snap-mandatory gap-5 px-[clamp(1.25rem,4.2vw,5rem)] pb-4">
      {projects.map((project, i) => (
        // `shrink-0` tiene que ir aquí, no solo en la ficha: sin él, flex
        // encoge este envoltorio a cero y todas las fichas se amontonan.
        <div key={project.slug} className="shrink-0 snap-start">
          <ProjectCard project={project} index={i} compact />
        </div>
      ))}
      <RailEnd compact />
    </div>
  );
}

/* ------------------------------------------------------------------ ficha -- */

function ProjectCard({
  project,
  index,
  compact = false,
}: {
  project: (typeof projects)[number];
  index: number;
  compact?: boolean;
}) {
  return (
    <article className={compact ? "w-[72vw] max-w-[320px] shrink-0" : "w-[clamp(300px,25vw,420px)] shrink-0"}>
      <Link href={`/work/${project.slug}`} className="group focus-plate block" data-cursor="VER PROYECTO">
        <div className="overflow-hidden">
          <div className="transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]">
            <Plate
              photo={photos[project.cover]}
              ratio="portrait"
              sizes={compact ? "72vw" : "(max-width: 1440px) 25vw, 420px"}
              quality={76}
            />
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 border-t pt-3" style={{ borderColor: "var(--rule)" }}>
          <div>
            <h3 className="t-h3 transition-colors duration-300 group-hover:text-red">{project.client}</h3>
            <p className="t-label mt-2 text-ink-soft">
              {project.category} · {project.location}
            </p>
          </div>
          <SectionNumber n={String(index + 1).padStart(2, "0")} />
        </div>
      </Link>
    </article>
  );
}

/** Cierre del carril: una tarjeta tipográfica en lugar de un borde cortado. */
function RailEnd({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "flex w-[62vw] max-w-[260px] shrink-0 items-center"
          : "flex w-[clamp(260px,20vw,340px)] shrink-0 items-center"
      }
    >
      <div>
        <p className="t-h3 text-ink-soft">
          Y los que
          <br />
          están por venir.
        </p>
        <div className="mt-5">
          <ArrowLink href="/contacto" tone="red">
            Cuéntanos el tuyo
          </ArrowLink>
        </div>
      </div>
    </div>
  );
}
