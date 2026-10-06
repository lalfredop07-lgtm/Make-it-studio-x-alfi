import type { Metadata } from "next";
import Link from "next/link";
import { Label } from "@/components/ui/Label";
import { ArrowLink } from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="shell flex min-h-[72svh] flex-col justify-center pt-[var(--header-h)] pb-24">
      <Label rule={false}>Error 404</Label>
      <h1 className="t-display mt-5 max-w-[14ch]">
        Esta página <span className="text-red italic">no existe.</span>
      </h1>
      <p className="t-lead mt-8 max-w-[34ch] text-ink-soft">
        Puede que el enlace esté roto o que la hayamos movido de sitio.
      </p>
      <div className="mt-10 flex flex-wrap gap-8">
        <ArrowLink href="/" size="lg">Volver al inicio</ArrowLink>
        <ArrowLink href="/work" size="lg">Ver el trabajo</ArrowLink>
      </div>
      <p className="sr-only">
        <Link href="/contacto">Contacto</Link>
      </p>
    </div>
  );
}
