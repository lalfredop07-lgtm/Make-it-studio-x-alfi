/**
 * Sistema de movimiento. Tres duraciones y una curva — nada más.
 * Cualquier animación de la web sale de aquí; no hay valores sueltos.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DUR = {
  fast: 0.2,
  normal: 0.42,
  editorial: 0.9,
} as const;

/** Entrada por defecto de la fotografía: sube y revela. Sin blur gratuito. */
export const plateReveal = {
  hidden: { opacity: 0, y: 28, clipPath: "inset(12% 0% 0% 0%)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: DUR.editorial, ease: EASE },
  },
} as const;

/** Entrada de bloques de texto. */
export const textReveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.normal * 1.5, ease: EASE } },
} as const;

/** Contenedor que escalona a sus hijos. */
export const stagger = (delayChildren = 0, staggerChildren = 0.07) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

export const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;
