import { bookingHref, bookingIsExternal, cta } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * CIERRE — conversión.
 *
 * Una sola llamada a la acción, sin adornos. Si no hay URL de reserva
 * configurada, el botón lleva al formulario en lugar de a un enlace inventado.
 */
export function FinalCTA() {
  return (
    <section className="pb-[clamp(5rem,10vw,9rem)] pt-[var(--space-section)]">
      <div className="shell">
        <div className="grid12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <h2 className="t-display whitespace-pre-line">{cta.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="t-lead mt-8 max-w-[38ch] text-ink-soft">{cta.body}</p>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="col-span-12 mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <a
              href={bookingIsExternal ? bookingHref : "/contacto"}
              {...(bookingIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              data-cursor={bookingIsExternal ? "↗" : undefined}
              className="group flex items-center justify-between gap-6 border border-ink px-6 py-6 transition-colors duration-500 hover:border-red hover:bg-red hover:text-paper"
            >
              <span className="t-label">{cta.button}</span>
              <span
                aria-hidden="true"
                className="text-lg transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
