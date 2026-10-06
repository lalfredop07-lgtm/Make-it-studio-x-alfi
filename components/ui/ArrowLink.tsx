import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

/**
 * Enlace con flecha. El subrayado se dibuja de izquierda a derecha al entrar y
 * se retira hacia la derecha al salir — el detalle vive en el `transform-origin`,
 * no en un efecto añadido.
 */
export function ArrowLink({
  href,
  children,
  external,
  className,
  tone = "ink",
  size = "base",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  tone?: "ink" | "paper" | "red";
  size?: "base" | "lg";
}) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const classes = cx(
    "link-underline inline-flex items-baseline gap-[0.45em] font-medium transition-colors",
    size === "lg" ? "text-[clamp(1.0625rem,1.3vw,1.375rem)]" : "text-[var(--fs-small)]",
    tone === "paper" && "text-paper hover:text-butter",
    tone === "red" && "text-red hover:text-red-deep",
    tone === "ink" && "text-ink hover:text-red",
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="translate-y-[-0.08em] text-[0.85em]">
        {isExternal ? "↗" : "→"}
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} data-cursor="↗">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
