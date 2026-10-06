import { clients } from "@/content/site";
import { clientLogos } from "@/content/media";
import { ClientLogo } from "@/components/ui/LogoMark";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/motion/Reveal";

/**
 * CLIENTES — índice de colaboradores, no "social proof".
 *
 * Cada logotipo va monocromo en tinta y con un ancho normalizado a ojo, para
 * que todos pesen lo mismo sin tocar sus proporciones. Nada de carrusel: una
 * rejilla quieta se lee mejor y se ve más seria.
 */
export function Clients() {
  return (
    <section className="shell py-[var(--space-section)]">
      <div className="grid12 items-end">
        <div className="col-span-12 lg:col-span-4">
          <Label as="h2" rule={false}>{clients.label}</Label>
        </div>
      </div>

      <hr className="rule mt-10" />

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {clientLogos.map((logo, i) => (
          <Reveal
            as="li"
            key={logo.src}
            delay={i * 0.06}
            className="flex min-h-[clamp(8rem,13vw,11rem)] items-center justify-center border-b border-r border-[var(--rule)] px-6 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r lg:[&:nth-child(5n)]:border-r-0"
          >
            <ClientLogo
              logo={logo}
              className="text-ink/75 transition-colors duration-500 hover:text-red"
            />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
