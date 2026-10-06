import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { site } from "@/content/site";
import "./globals.css";

/**
 * La guía de marca fija Times New Roman como tipografía principal y Gotham Book
 * Italic como secundaria. En web usamos Instrument Serif —misma familia
 * transicional, itálica igual de marcada, y con licencia abierta— y Geist para
 * el sistema. Gotham requiere licencia comercial; ver README.
 */
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

/** Grano de papel. Se inyecta como variable CSS para no duplicar el SVG. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E\")";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Make It Studio — Agencia creativa y de social media en Madrid",
    template: "%s · Make It Studio",
  },
  description:
    "Agencia creativa y de social media en Madrid y México. Creación de contenido, estrategia, manejo de redes sociales y paid media para marcas de hostelería, fitness, retail y lifestyle.",
  keywords: [
    "agencia creativa Madrid",
    "agencia social media Madrid",
    "creación de contenido Madrid",
    "gestión de redes sociales",
    "paid media",
    "contenido para restaurantes",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: site.url,
    siteName: site.name,
    title: "Make It Studio — Agencia creativa y de social media",
    description:
      "Más de una década creando contenido, estrategia y comunidad para marcas de hostelería, fitness, retail y lifestyle. Madrid y México.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Make It Studio — Agencia creativa y de social media",
    description: "Creación de contenido, estrategia, social media y paid media. Madrid y México.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f0e7",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${geist.variable}`}>
      <body className="grain" style={{ ["--grain-url" as string]: GRAIN }}>
        <a
          href="#contenido"
          className="t-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Saltar al contenido
        </a>

        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
