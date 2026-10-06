import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Política de cookies",
  robots: { index: false, follow: true },
  alternates: { canonical: "/legal/cookies" },
};

export default function Cookies() {
  return (
    <LegalPage
      title="Política de cookies"
      intro="Esta web no instala cookies de analítica ni de publicidad mientras no se configure ninguna herramienta de medición. Si se activa Google Analytics o Meta Pixel, habrá que publicar este documento y pedir consentimiento previo."
      requirements={[
        "Qué es una cookie y para qué se usa.",
        "Listado de cookies por tipo: técnicas, de preferencias, de análisis y publicitarias.",
        "Titular de cada cookie, finalidad y plazo de conservación.",
        "Cómo prestar, denegar y retirar el consentimiento (banner de consentimiento previo, art. 22.2 LSSI).",
        "Cómo configurar o eliminar cookies en cada navegador.",
      ]}
    />
  );
}
