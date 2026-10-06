"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Photo } from "@/content/media";
import { EASE, VIEWPORT } from "@/lib/motion";
import { cx } from "@/lib/utils";

/**
 * PLANCHA — la unidad de fotografía de toda la web.
 *
 * Casi todo el material es retrato 2:3, así que el formato por defecto es
 * vertical. El recorte se elige por sección, nunca el mismo para todo: la
 * irregularidad controlada forma parte de la dirección de arte.
 *
 * Mientras carga se pinta el color medio real de la foto, no un gris: la
 * página nunca enseña un hueco blanco.
 */
export type PlateRatio = "portrait" | "tall" | "square" | "landscape" | "wide";

const RATIO: Record<PlateRatio, string> = {
  portrait: "2 / 3",
  tall: "3 / 5",
  square: "1 / 1",
  landscape: "4 / 3",
  wide: "3 / 2",
};

export function Plate({
  photo,
  ratio = "portrait",
  sizes,
  priority = false,
  caption,
  className,
  imageClassName,
  cursor,
  quality = 76,
}: {
  photo: Photo;
  ratio?: PlateRatio;
  /** Obligatorio: sin esto el navegador descarga la variante más grande. */
  sizes: string;
  priority?: boolean;
  caption?: string;
  className?: string;
  imageClassName?: string;
  cursor?: string;
  quality?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <figure className={cx("group/plate", className)}>
      <motion.div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: RATIO[ratio], backgroundColor: photo.tint }}
        data-cursor={cursor}
        initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(14% 0% 0% 0%)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={VIEWPORT}
        transition={{ duration: reduced ? 0.25 : 1.05, ease: EASE }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduced ? false : { scale: 1.07 }}
          whileInView={{ scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={quality}
            className={cx("object-cover", imageClassName)}
          />
        </motion.div>
      </motion.div>

      {caption ? <figcaption className="t-caption mt-3 max-w-[32ch]">{caption}</figcaption> : null}
    </figure>
  );
}
