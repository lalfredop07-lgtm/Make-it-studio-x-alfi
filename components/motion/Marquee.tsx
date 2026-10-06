"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";

/**
 * Cinta tipográfica: avanza a velocidad constante y el scroll la acelera o la
 * invierte. Con movimiento reducido queda fija, como una franja de titular.
 */
export function Marquee({
  text,
  repeat = 6,
  baseVelocity = 24,
  className = "",
}: {
  text: string;
  repeat?: number;
  baseVelocity?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 320 });
  const factor = useTransform(smooth, [-1400, 0, 1400], [-2.2, 1, 2.2], { clamp: false });
  const track = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (reduced || !track.current) return;
    const unit = track.current.scrollWidth / repeat;
    if (!unit) return;
    let next = x.get() - ((baseVelocity * delta) / 1000) * factor.get();
    // Mantener el desplazamiento dentro de (-unit, 0] para que el bucle sea invisible.
    while (next <= -unit) next += unit;
    while (next > 0) next -= unit;
    x.set(next);
  });

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.div ref={track} className="marquee-track flex w-max will-change-transform" style={{ x }}>
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="t-display whitespace-nowrap pr-[0.26em]">
            {text}
            <span className="text-red px-[0.16em]">—</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
