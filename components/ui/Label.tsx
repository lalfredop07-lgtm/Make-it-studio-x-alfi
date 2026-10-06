import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

/**
 * Etiqueta de sección. Siempre acompañada de un filete de 1px: es lo que da a
 * la página su estructura de publicación.
 *
 * `as` permite que la etiqueta sea además el encabezado real de la sección.
 * Hay secciones cuyo único rótulo es esta etiqueta —Selected Work, Clientes,
 * testimonios—: sin esto quedarían sin h2 y el documento tendría agujeros en la
 * jerarquía aunque a la vista todo esté en su sitio.
 */
export function Label({
  children,
  className,
  rule = true,
  tone = "ink",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  rule?: boolean;
  tone?: "ink" | "paper";
  as?: "div" | "h2" | "h3";
}) {
  return (
    <Tag className={cx("flex items-baseline gap-4", className)}>
      <span className={cx("t-label shrink-0", tone === "paper" && "text-paper/70")}>{children}</span>
      {rule ? (
        <span
          aria-hidden="true"
          className={cx(
            "h-px flex-1 translate-y-[-0.2em]",
            tone === "paper" ? "bg-paper/25" : "bg-[var(--rule)]",
          )}
        />
      ) : null}
    </Tag>
  );
}

/** Numeración de sección, en versalitas tabulares. */
export function SectionNumber({ n, tone = "ink" }: { n: string; tone?: "ink" | "paper" }) {
  return (
    <span className={cx("t-label num", tone === "paper" ? "text-paper/65" : "text-ink-faint")}>
      {n}
    </span>
  );
}
