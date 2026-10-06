import Link from "next/link";
import { contact, footer, nav, site } from "@/content/site";
import { LogoMark } from "@/components/ui/LogoMark";

/**
 * Pie. Cierra la página con el logotipo a tamaño de portada.
 * `data-nav-tone="paper"` invierte la cabecera al llegar aquí.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-nav-tone="paper" className="bg-ink text-paper">
      <div className="shell pt-[clamp(4rem,7vw,7rem)] pb-10">
        <div className="grid12">
          <div className="col-span-12 md:col-span-5">
            <p className="t-label text-paper/65">{site.name}</p>
            <p className="t-lead mt-5 max-w-[26ch] text-paper/85">
              Agencia creativa y de social media.
              <br />
              Madrid · México.
            </p>
          </div>

          <nav aria-label="Pie de página" className="col-span-6 mt-12 md:col-span-3 md:mt-0">
            <p className="t-label text-paper/60">Navegar</p>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline t-small text-paper/80 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 mt-12 md:col-span-4 md:mt-0">
            <p className="t-label text-paper/60">Contacto</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="↗"
                  className="link-underline t-small text-paper/80 hover:text-paper"
                >
                  Instagram {contact.instagramHandle}
                </a>
              </li>
              {/* El email solo se muestra cuando está configurado: no se inventa. */}
              {contact.email ? (
                <li>
                  <a href={`mailto:${contact.email}`} className="link-underline t-small text-paper/80 hover:text-paper">
                    {contact.email}
                  </a>
                </li>
              ) : null}
              <li>
                <Link href="/contacto" className="link-underline t-small text-paper/80 hover:text-paper">
                  Formulario de contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Logotipo de cierre: ocupa el ancho completo, como la contraportada. */}
        <div className="mt-[clamp(3.5rem,8vw,7rem)]">
          <LogoMark fluid className="text-paper/90" title="Make It Studio" />
        </div>

        <div
          className="mt-10 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "color-mix(in srgb, var(--color-paper) 18%, transparent)" }}
        >
          <p className="t-label text-paper/60">
            © {year} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline t-label text-paper/65 hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
