"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/media";
import { EASE } from "@/lib/motion";

/**
 * Cursor del estudio. Solo en escritorio con puntero fino.
 *
 * Por defecto no hay nada: el cursor nativo sigue siendo el del sistema. Solo
 * aparece una etiqueta cuando el puntero entra en un elemento que declara
 * `data-cursor` (una plancha de proyecto, un vídeo, un enlace externo). Así no
 * estorba a la lectura ni sustituye affordances que ya funcionan.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)") && !reduced;
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 850, damping: 48, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 850, damping: 48, mass: 0.35 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      const holder = target?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(holder?.dataset.cursor ?? null);
    };
    const onLeave = () => setLabel(null);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <AnimatePresence>
        {label ? (
          <motion.span
            key={label}
            className="t-label absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-red px-4 py-3 text-paper"
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.72 }}
            transition={{ duration: 0.26, ease: EASE }}
          >
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
