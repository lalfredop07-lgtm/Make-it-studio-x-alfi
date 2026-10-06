import type { Metadata } from "next";
import { bookingHref, bookingIsExternal, contact, cta } from "@/content/site";
import { photos } from "@/content/media";
import { Plate } from "@/components/ui/Plate";
import { Label } from "@/components/ui/Label";
import { ContactForm } from "@/components/ui/ContactForm";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos qué marca llevas entre manos. Make It Studio — agencia creativa y de social media en Madrid y México.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <div className="shell pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))] pb-[var(--space-section)]">
      <Label rule={false}>Contacto</Label>
      <h1 className="t-display mt-5 max-w-[16ch]">
        <RevealText as="span" text="Cuéntanos qué marca" className="t-display block" />
        <RevealText as="span" text="llevas entre manos." delay={0.1} className="t-display block text-red italic" />
      </h1>

      <div className="grid12 mt-[clamp(3.5rem,7vw,6rem)] items-start">
        <div className="col-span-12 lg:col-span-7">
          <ContactForm />
        </div>

        <aside className="col-span-12 mt-16 lg:col-span-4 lg:col-start-9 lg:mt-0">
          <Reveal>
            <p className="t-lead max-w-[28ch]">{cta.body}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 border-t border-[var(--rule)] pt-6">
            <dl className="space-y-6">
              <div>
                <dt className="t-label text-ink-faint">Instagram</dt>
                <dd className="mt-2">
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="↗"
                    className="link-underline t-small"
                  >
                    {contact.instagramHandle}
                  </a>
                </dd>
              </div>

              {/* Email y teléfono solo aparecen si están configurados. */}
              {contact.email ? (
                <div>
                  <dt className="t-label text-ink-faint">Email</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${contact.email}`} className="link-underline t-small">
                      {contact.email}
                    </a>
                  </dd>
                </div>
              ) : null}

              {contact.phone ? (
                <div>
                  <dt className="t-label text-ink-faint">Teléfono</dt>
                  <dd className="mt-2">
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-underline t-small">
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              ) : null}

              <div>
                <dt className="t-label text-ink-faint">Dónde estamos</dt>
                <dd className="t-small mt-2">Madrid · México</dd>
              </div>
            </dl>
          </Reveal>

          {bookingIsExternal ? (
            <Reveal delay={0.16} className="mt-10">
              <a
                href={bookingHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="↗"
                className="t-label flex items-center justify-between border border-ink px-5 py-4 transition-colors duration-300 hover:border-red hover:bg-red hover:text-paper"
              >
                {cta.button} <span aria-hidden="true">↗</span>
              </a>
            </Reveal>
          ) : null}

          <Reveal delay={0.2} className="mt-12">
            <Plate
              photo={photos.kuikkuBrindis}
              ratio="portrait"
              sizes="(max-width: 1024px) 100vw, 32vw"
              quality={76}
            />
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
