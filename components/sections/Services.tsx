"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { services } from "@/content/site";
import { photos, type PhotoKey } from "@/content/media";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/motion/Reveal";
import { EASE } from "@/lib/motion";

/**
 * SERVICIOS — índice de revista, no tarjetas.
 *
 * Cada fila es un filete de 1px, un número, un título grande y una línea de
 * texto. En escritorio, al recorrer las filas aparece una plancha a la derecha;
 * en móvil no hay nada que dependa del hover: el índice se lee tal cual.
 */
export function Services() {
  const reduced = useReducedMotion();
  // Nunca hay estado vacío: el panel arranca con la imagen del primer
  // servicio. Un rectángulo crema en blanco parecía un fallo de carga.
  const FIRST = services.items[0].photo as PhotoKey;
  const [active, setActive] = useState<PhotoKey>(FIRST);

  return (
    <section id="servicios" className="shell py-[var(--space-section)]">
      <div className="grid12 items-end">
        <div className="col-span-12 lg:col-span-7">
          <Label rule={false}>{services.label}</Label>
          <h2 className="t-display mt-5">{services.title}</h2>
        </div>
      </div>

      <div className="grid12 mt-[clamp(3rem,6vw,5rem)]">
        {/* Índice */}
        <ul className="col-span-12 lg:col-span-7" onMouseLeave={() => setActive(FIRST)}>
          {services.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.n}
              delay={i * 0.05}
              className="group border-t border-[var(--rule)] last:border-b"
            >
              <div
                className="relative py-[clamp(1.5rem,2.6vw,2.5rem)]"
                onMouseEnter={() => setActive(item.photo as PhotoKey)}
                onFocus={() => setActive(item.photo as PhotoKey)}
                tabIndex={-1}
              >
                <div className="flex items-baseline gap-5 sm:gap-8">
                  <span className="t-label num shrink-0 text-ink-faint transition-colors duration-300 group-hover:text-red">
                    {item.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="t-h3 transition-colors duration-300 group-hover:text-red">{item.title}</h3>
                    <p className="t-small mt-3 max-w-[48ch] text-ink-soft">{item.body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Plancha de acompañamiento — solo escritorio */}
        <div className="col-span-4 col-start-9 hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+3rem)]">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "2 / 3", backgroundColor: "var(--color-paper-warm)" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
                  animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0.2 : 0.42, ease: EASE }}
                >
                  <Image
                    src={photos[active].src}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="33vw"
                    quality={76}
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
