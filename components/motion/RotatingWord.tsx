"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";

/**
 * Rotación de la última palabra del claim: cada palabra, "happen." incluida,
 * se queda en pantalla el mismo tiempo (3s) antes de pasar a la siguiente.
 * Se detiene al pasar el cursor y no se ejecuta con movimiento reducido.
 */
const INTERVAL_MS = 3000;

export function RotatingWord({ words }: { words: readonly string[] }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % words.length), INTERVAL_MS);
    return () => clearTimeout(t);
  }, [i, reduced, paused, words.length]);

  // Reserva el ancho de la palabra más larga: la línea nunca salta.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  const current = reduced ? words[0] : words[i];

  return (
    <span
      className="relative inline-grid text-red align-baseline"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 italic">
        {longest}
      </span>
      <span className="sr-only">{words[0]}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={current}
          aria-hidden="true"
          className="col-start-1 row-start-1 italic whitespace-nowrap"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: "0.28em", filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: "-0.28em", filter: "blur(6px)" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
