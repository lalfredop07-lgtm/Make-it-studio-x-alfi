import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { FeaturedReel } from "@/components/sections/FeaturedReel";
import { Services } from "@/components/sections/Services";
import { Statement } from "@/components/sections/Statement";
import { Clients } from "@/components/sections/Clients";
import { Testimonials } from "@/components/sections/Testimonials";
import { Culture } from "@/components/sections/Culture";
import { About } from "@/components/sections/About";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/JsonLd";

/**
 * HOME.
 *
 * El orden es el ritmo: silencio → impacto → silencio → movimiento →
 * información → declaración → humano → cultura → conversión.
 * Ninguna sección se parece a la anterior, pero todas salen del mismo sistema.
 */
export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Manifesto />
      <SelectedWork />
      <FeaturedReel />
      <Services />
      <Statement />
      <Clients />
      <Testimonials />
      <Culture />
      <About />
      <FinalCTA />
    </>
  );
}
