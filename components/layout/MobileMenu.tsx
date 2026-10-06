"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { bookingHref, bookingIsExternal, contact, cta, nav } from "@/content/site";
import { LogoMark } from "@/components/ui/LogoMark";
import { EASE } from "@/lib/motion";

/**
 * Menú de móvil a pantalla completa.
 *
 * Diseño propio, no una versión encogida del de escritorio: tipografía grande
 * de revista, mucho aire y la información de contacto al pie. Bloquea el
 * scroll, atrapa el foco y se cierra con Escape.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement | null;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href], button")?.focus();
    }, 60);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      restoreTo.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="menu-movil"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-[55] flex flex-col bg-paper-warm md:hidden"
          initial={reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
          animate={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
          exit={reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: reduced ? 0.2 : 0.62, ease: EASE }}
        >
          <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Link href="/" onClick={onClose} aria-label="Make It Studio — ir al inicio" className="focus-plate -m-2 p-2">
              <LogoMark width={108} className="text-red" />
            </Link>
            <button type="button" onClick={onClose} className="focus-plate t-label -mr-2 p-2">
              Cerrar
            </button>
          </div>

          <nav aria-label="Principal" className="shell flex flex-1 flex-col justify-center">
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.16 + i * 0.06 }}
                  className="border-b"
                  style={{ borderColor: "var(--rule)" }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="t-h2 block py-4 transition-colors duration-200 active:text-red"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="shell shrink-0 space-y-5 pb-10"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.42 }}
          >
            <a
              href={bookingIsExternal ? bookingHref : "/contacto"}
              {...(bookingIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={onClose}
              className="t-label flex items-center justify-between border border-ink px-5 py-4 transition-colors duration-200 active:bg-red active:text-paper"
            >
              {cta.button} <span aria-hidden="true">↗</span>
            </a>
            <div className="flex items-center justify-between">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="t-label link-underline"
              >
                Instagram {contact.instagramHandle}
              </a>
              <span className="t-label text-ink-faint">Madrid · México</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
