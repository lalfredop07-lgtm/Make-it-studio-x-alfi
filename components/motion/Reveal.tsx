"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { DUR, EASE, VIEWPORT } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** Retardo en segundos, para escalonar a mano. */
  delay?: number;
  /** Desplazamiento inicial en px. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "figure" | "p" | "span";
};

/** Entrada estándar de bloques. Con movimiento reducido aparece sin desplazar. */
export function Reveal({ children, delay = 0, y = 18, className, as = "div" }: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: reduced ? DUR.fast : DUR.normal * 1.5,
        ease: EASE,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </Tag>
  );
}
