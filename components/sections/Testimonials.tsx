"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { testimonials } from "@/content/site";
import { videos } from "@/content/media";
import { VideoPlate } from "@/components/ui/VideoPlate";
import { Label } from "@/components/ui/Label";
import { EASE } from "@/lib/motion";
import { cx } from "@/lib/utils";

/**
 * TESTIMONIOS — uno cada vez, nunca una parrilla de tarjetas.
 *
 * Las citas son transcripción literal de los subtítulos de cada vídeo: no se
 * han reescrito. El vídeo completo está ahí mismo, así que cualquiera puede
 * comprobarlo — que es justo lo que hace que un testimonio valga algo.
 *
 * Es un `tablist` real: flechas para cambiar de cliente, foco visible y panel
 * anunciado. Nada de estrellas ni puntuaciones.
 */
export function Testimonials() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = testimonials.items[i];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = testimonials.items.length - 1;
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setI(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="shell py-[var(--space-section)]">
      <Label as="h2">{testimonials.label}</Label>

      {/* Selector de cliente */}
      <div
        role="tablist"
        aria-label="Testimonios de clientes"
        onKeyDown={onKeyDown}
        className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-b border-[var(--rule)] pb-5"
      >
        {testimonials.items.map((t, index) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={index === i}
            aria-controls={`panel-${t.id}`}
            tabIndex={index === i ? 0 : -1}
            onClick={() => setI(index)}
            className={cx(
              "t-h3 focus-plate transition-colors duration-300",
              index === i ? "text-ink" : "text-ink-faint hover:text-ink-soft",
            )}
          >
            {t.client.split(" · ")[0]}
          </button>
        ))}
      </div>

      {/* Panel activo */}
      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        className="grid12 mt-[clamp(2.5rem,5vw,4rem)] items-start"
      >
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={active.id}
            className="col-span-12 lg:col-span-7"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <p className="t-h2">
              <span aria-hidden="true" className="text-red">
                “
              </span>
              {active.quote}
              <span aria-hidden="true" className="text-red">
                ”
              </span>
            </p>
            <footer className="mt-8 border-t border-[var(--rule)] pt-5">
              <p className="t-label text-ink">{active.client}</p>
              <p className="t-label mt-2 text-ink-faint">{active.meta}</p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${active.id}-video`}
            className="col-span-8 col-start-3 mt-10 sm:col-span-5 sm:col-start-5 lg:col-span-4 lg:col-start-9 lg:mt-0"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
          >
            <VideoPlate video={videos[active.video]} mode="testimonial" ratio="9 / 14" />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
