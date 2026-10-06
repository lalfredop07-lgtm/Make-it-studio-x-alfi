import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Aviso legal",
  robots: { index: false, follow: true },
  alternates: { canonical: "/legal/aviso-legal" },
};

export default function AvisoLegal() {
  return (
    <LegalPage
      title="Aviso legal"
      intro="Información general sobre el titular de este sitio web, exigida por la LSSI-CE."
      requirements={[
        "Denominación social, NIF y domicilio del titular.",
        "Datos de contacto: email y, en su caso, teléfono.",
        "Datos de inscripción registral, si procede.",
        "Condiciones de uso del sitio web.",
        "Titularidad de los derechos de propiedad intelectual sobre textos, fotografías y vídeos.",
        "Legislación aplicable y fuero.",
      ]}
    />
  );
}
