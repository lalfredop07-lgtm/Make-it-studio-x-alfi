"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";
import { words } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** Elemento semántico real: el revelado no debe romper la jerarquía. */
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
};

/**
 * Revelado palabra a palabra con máscara.
 * El texto íntegro queda siempre en el DOM (en `sr-only`), de modo que lectores
 * de pantalla y buscadores lo leen aunque la animación no llegue a ejecutarse.
 */
export function RevealText({ text, className, delay = 0, as = "p" }: Props) {
  const reduced = useReducedMotion();
  const Tag = as;

  if (reduced) return <Tag className={className}>{text}</Tag>;

  const parts = words(text);

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        transition={{ delayChildren: delay, staggerChildren: 0.028 }}
        aria-hidden="true"
        className="inline"
      >
        {parts.map((word, i) =>
          word.trim() === "" ? (
            <span key={i}> </span>
          ) : (
            // La caja que enmascara se agranda en las cuatro direcciones y se
            // compensa con margen negativo igual, para que el ancho y alto
            // visibles de la palabra no cambien. `overflow-hidden` recorta por
            // la caja de avance de los caracteres y por la caja de línea
            // comprimida (line-height 0.9 en .t-display), no por la tinta real
            // dibujada — y la itálica de Instrument Serif se sale de esa caja
            // por los cuatro lados según la letra. Medido con
            // canvas.measureText (actualBoundingBox*) sobre el propio tipo a
            // este tamaño, el peor caso real es: ~0.16em a la derecha (Í, f),
            // ~0.09em a la izquierda (V, W), ~0.04em arriba sobre la caja ya
            // comprimida (Á, Í, Ñ) y ~0.11em abajo (g, j, p, q, y). Los valores
            // de abajo dejan margen de sobra sobre esas cifras.
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom"
              style={{
                paddingBottom: "0.28em",
                marginBottom: "-0.28em",
                paddingTop: "0.22em",
                marginTop: "-0.22em",
                paddingLeft: "0.14em",
                marginLeft: "-0.14em",
                paddingRight: "0.26em",
                marginRight: "-0.26em",
              }}
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "105%" },
                  show: { y: "0%", transition: { duration: 0.75, ease: EASE } },
                }}
              >
                {word}
              </motion.span>
            </span>
          ),
        )}
      </motion.span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
