import Link from "next/link";
import { contact, footer } from "@/content/site";
import { Label } from "@/components/ui/Label";

/**
 * Plantilla de página legal.
 *
 * AVISO IMPORTANTE: aquí NO hay texto legal. Redactar una política de
 * privacidad o un aviso legal ficticio sería peor que no tener ninguno —
 * crea una obligación falsa frente al RGPD y la LSSI. La plantilla deja la
 * ruta lista, explica qué debe contener cada documento y lo marca como
 * pendiente, para que lo redacte quien corresponda y se pegue aquí.
 */
export function LegalPage({
  title,
  intro,
  requirements,
}: {
  title: string;
  intro: string;
  requirements: string[];
}) {
  return (
    <div className="shell pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))] pb-[var(--space-section)]">
      <Label rule={false}>Legal</Label>
      <h1 className="t-display mt-5 max-w-[14ch]">{title}</h1>

      <div className="grid12 mt-[clamp(3rem,6vw,5rem)]">
        <div className="col-span-12 lg:col-span-7">
          <p className="t-lead text-ink-soft">{intro}</p>

          <div className="mt-10 border border-[var(--rule-strong)] p-6 sm:p-8">
            <p className="t-label text-red">Documento pendiente de redacción</p>
            <p className="t-small mt-4 text-ink-soft">
              Este texto debe prepararlo el estudio con asesoría legal, conforme al RGPD (UE)
              2016/679, la LOPDGDD 3/2018 y la LSSI-CE 34/2002. A continuación, lo que tiene que
              recoger:
            </p>
            <ul className="mt-6 space-y-3">
              {requirements.map((r) => (
                <li key={r} className="t-small flex gap-3 text-ink-soft">
                  <span aria-hidden="true" className="mt-[0.55em] h-px w-4 shrink-0 bg-[var(--rule-strong)]" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="t-small mt-10 text-ink-soft">
            Mientras tanto, para cualquier consulta sobre tus datos escríbenos por{" "}
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              Instagram
            </a>{" "}
            o desde el{" "}
            <Link href="/contacto" className="link-underline">
              formulario de contacto
            </Link>
            .
          </p>
        </div>

        <nav aria-label="Documentos legales" className="col-span-12 mt-12 lg:col-span-3 lg:col-start-10 lg:mt-0">
          <p className="t-label text-ink-faint">Documentos</p>
          <ul className="mt-5 space-y-2.5">
            {footer.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline t-small">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
