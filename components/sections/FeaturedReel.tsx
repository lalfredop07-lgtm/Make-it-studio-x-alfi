"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { reel } from "@/content/site";
import { videos } from "@/content/media";
import { VideoPlate } from "@/components/ui/VideoPlate";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/motion/Reveal";
import { useMediaQuery } from "@/lib/media";

/**
 * SHOWREEL — el único momento de impacto audiovisual de la home.
 *
 * La pieza empieza contenida y crece con el scroll hasta ocupar el alto
 * completo. Como todo el material es 9:16, la expansión se controla por ALTURA
 * y el ancho sale solo: así nunca se deforma ni se desborda lateralmente.
 *
 * El scroll nunca se bloquea — el bloque es más alto y el contenido se fija
 * dentro. Con movimiento reducido, o en móvil, no hay expansión: la pieza se
 * muestra ya a su tamaño final.
 */
export function FeaturedReel() {
  const reduced = useReducedMotion();
  const expand = useMediaQuery("(min-width: 768px)") && !reduced;

  return expand ? <Expanding /> : <Static />;
}

function Expanding() {
  const outer = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });

  const height = useTransform(scrollYProgress, [0, 0.7], ["46vh", "92vh"]);
  const textOut = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section ref={outer} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Rótulos laterales: se retiran según la pieza gana terreno. */}
        <motion.div style={{ opacity: textOut }} className="shell pointer-events-none absolute inset-x-0 top-[calc(var(--header-h)+2rem)]">
          <div className="flex items-start justify-between gap-8">
            <div>
              <Label rule={false}>{reel.label}</Label>
              <h2 className="t-h2 mt-4 max-w-[12ch]">
                {reel.title}
                <br />
                <span className="text-red italic">{reel.accent}</span>
              </h2>
            </div>
            <p className="t-label num text-ink-faint">{reel.year}</p>
          </div>
        </motion.div>

        <motion.div style={{ height }} className="relative aspect-[9/16]">
          <VideoPlate video={videos.reel} mode="ambient" className="h-full" ratio="9 / 16" />
        </motion.div>
      </div>
    </section>
  );
}

/** Versión sin expansión: móvil y movimiento reducido. */
function Static() {
  return (
    <section className="shell py-[var(--space-section)]">
      <Label>{reel.label}</Label>
      <div className="mt-8 grid12 items-end">
        <Reveal className="col-span-12 sm:col-span-6">
          <h2 className="t-h2 max-w-[12ch]">
            {reel.title}
            <br />
            <span className="text-red italic">{reel.accent}</span>
          </h2>
        </Reveal>
        <Reveal className="col-span-12 mt-10 sm:col-span-5 sm:col-start-8 sm:mt-0" delay={0.1}>
          <VideoPlate video={videos.reel} mode="ambient" ratio="9 / 16" />
        </Reveal>
      </div>
    </section>
  );
}
