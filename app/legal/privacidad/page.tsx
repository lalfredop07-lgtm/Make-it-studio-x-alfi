import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: { index: false, follow: true },
  alternates: { canonical: "/legal/privacidad" },
};

export default function Privacidad() {
  return (
    <LegalPage
      title="Política de privacidad"
      intro="Cómo tratamos los datos que nos dejas al escribirnos."
      requirements={[
        "Identidad y datos de contacto del responsable del tratamiento: denominación social, NIF y domicilio.",
        "Qué datos se recogen a través del formulario y con qué finalidad.",
        "Base jurídica del tratamiento (consentimiento del interesado, art. 6.1.a RGPD).",
        "Plazo de conservación de los datos.",
        "Destinatarios o encargados del tratamiento: proveedor de email, hosting y analítica.",
        "Transferencias internacionales de datos, si las hubiera.",
        "Derechos del interesado: acceso, rectificación, supresión, oposición, limitación y portabilidad, y cómo ejercerlos.",
        "Derecho a reclamar ante la Agencia Española de Protección de Datos.",
      ]}
    />
  );
}
