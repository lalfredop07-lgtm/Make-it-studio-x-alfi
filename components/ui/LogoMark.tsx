import { brandLogo, type ClientLogo as ClientLogoType } from "@/content/media";
import { cx } from "@/lib/utils";

/**
 * Logotipo de Make It Studio.
 *
 * Se sirve como máscara alpha recortada del PNG original, de modo que hereda
 * `currentColor`: el mismo archivo vale en rojo sobre crema, en crema sobre
 * rojo o en tinta, sin duplicar assets ni recolorear a mano. El logotipo no se
 * redibuja nunca — es el original de marca.
 */
export function LogoMark({
  width = 148,
  fluid = false,
  className,
  title = "Make It Studio",
}: {
  width?: number;
  /** Ocupa todo el ancho disponible conservando la proporción. Para el cierre
   *  del pie, donde un ancho fijo en px desbordaría por debajo de 1200px. */
  fluid?: boolean;
  className?: string;
  title?: string;
}) {
  return (
    <span
      role="img"
      aria-label={title}
      className={cx("mask block", className)}
      style={{
        ...(fluid
          ? { width: "100%", aspectRatio: brandLogo.ratio }
          : { width, height: width / brandLogo.ratio }),
        WebkitMaskImage: `url(${brandLogo.src})`,
        maskImage: `url(${brandLogo.src})`,
      }}
    />
  );
}

/** Monograma "mi" de la guía de marca. Para espacios muy pequeños. */
export function Monogram({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx("mask block", className)}
      style={{
        width: size,
        height: size * (131 / 162),
        WebkitMaskImage: `url(${brandLogo.monogram})`,
        maskImage: `url(${brandLogo.monogram})`,
      }}
    />
  );
}

/**
 * Logotipo de cliente. Mismo criterio: máscara monocroma, proporciones
 * intactas. El ancho de cada marca está normalizado ópticamente a mano en
 * `content/media.ts` — una mancha densa pesa más a menor tamaño.
 */
export function ClientLogo({ logo, className }: { logo: ClientLogoType; className?: string }) {
  return (
    <span
      role="img"
      aria-label={logo.name}
      className={cx("mask block", className)}
      style={{
        width: logo.width,
        height: logo.width / logo.ratio,
        WebkitMaskImage: `url(${logo.src})`,
        maskImage: `url(${logo.src})`,
      }}
    />
  );
}
