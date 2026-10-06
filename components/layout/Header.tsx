"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { bookingHref, bookingIsExternal, cta, nav } from "@/content/site";
import { LogoMark } from "@/components/ui/LogoMark";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { EASE } from "@/lib/motion";
import { cx } from "@/lib/utils";

/**
 * Cabecera fija.
 *
 * El tono (tinta sobre crema / crema sobre oscuro) lo decide la propia página:
 * cualquier sección marcada con `data-nav-tone="paper"` que cruce la línea
 * horizontal de la cabecera la invierte. Así la declaración en rojo y el pie
 * oscuro no necesitan lógica propia.
 */
export function Header() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const [tone, setTone] = useState<"ink" | "paper">("ink");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    // Se retira al bajar y vuelve al subir. No es un adorno: sobre el pie, que
    // cierra con el logotipo a toda página, una cabecera fija se superpone al
    // contenido y ensucia el cierre. Además devuelve altura de lectura.
    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const delta = y - last;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 320);
        last = y;
      }
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  // Al cambiar de ruta se vuelve al tono por defecto durante el render, que es
  // el patrón de React para resetear estado derivado (no un efecto).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setTone("ink");
  }

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-tone="paper"]'));
    if (targets.length === 0) return;

    const HEADER_LINE = 38; // altura a la que vive el logotipo
    let frame = 0;

    // Se mide en cada frame de scroll en lugar de confiar en IntersectionObserver:
    // el observador solo avisa al cruzar un umbral, y una sección a sangre puede
    // pasar por debajo de la cabecera sin generar ningún evento — ahí el tono se
    // quedaba en tinta sobre el fondo oscuro y el logotipo desaparecía.
    const evaluate = () => {
      frame = 0;
      const crossing = targets.some((t) => {
        const r = t.getBoundingClientRect();
        return r.top <= HEADER_LINE && r.bottom >= HEADER_LINE;
      });
      setTone(crossing ? "paper" : "ink");
    };

    const schedule = () => {
      if (frame) return; // como mucho una medición por frame
      frame = requestAnimationFrame(evaluate);
    };

    schedule(); // primera medición: la página puede cargar ya desplazada
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  const onPaper = tone === "paper" && !open;

  return (
    <>
      <motion.header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          onPaper ? "text-paper" : "text-ink",
        )}
        initial={reduced ? false : { y: -24, opacity: 0 }}
        // Con movimiento reducido la cabecera no se esconde nunca: desaparecer
        // y reaparecer sería justo el tipo de movimiento que se ha desactivado.
        animate={{ y: !reduced && hidden && !open ? "-105%" : 0, opacity: 1 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: hidden ? 0.34 : 0.5, ease: EASE, delay: hidden ? 0 : 0.02 }
        }
      >
        {/* Velo de papel: aparece solo al hacer scroll y nunca sobre fondo oscuro. */}
        <div
          aria-hidden="true"
          className={cx(
            "absolute inset-0 border-b transition-opacity duration-500",
            scrolled && !onPaper ? "opacity-100" : "opacity-0",
          )}
          style={{ background: "color-mix(in srgb, var(--color-paper) 88%, transparent)", borderColor: "var(--rule)", backdropFilter: "blur(6px)" }}
        />

        <div className="shell relative flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Make It Studio — ir al inicio"
            className="focus-plate -m-2 p-2 transition-opacity duration-200 hover:opacity-70"
          >
            {/* El lockup de marca es rojo; sobre fondo oscuro pasa a crema. */}
            <LogoMark width={108} className={cx("sm:w-[124px]", onPaper ? "text-paper" : "text-red")} />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-9 md:flex">
            {nav.map((item) => {
              // Los enlaces con ancla (/#servicios) no marcan sección activa.
              const base: string = item.href.split("#")[0];
              const active = base.length > 1 && pathname.startsWith(base);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active || undefined}
                  className="link-underline t-label hover:text-red transition-colors duration-200"
                  style={onPaper ? { color: "inherit" } : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={bookingIsExternal ? bookingHref : "/contacto"}
              {...(bookingIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cx(
                "t-label border px-5 py-2.5 transition-colors duration-300",
                onPaper
                  ? "border-paper/40 hover:border-paper hover:bg-paper hover:text-ink"
                  : "border-[var(--rule-strong)] hover:border-red hover:bg-red hover:text-paper",
              )}
            >
              {cta.button.replace("Agenda una llamada de 30 min", "Agenda una llamada")} ↗
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="focus-plate t-label -mr-2 p-2 md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
          >
            Menú
          </button>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
