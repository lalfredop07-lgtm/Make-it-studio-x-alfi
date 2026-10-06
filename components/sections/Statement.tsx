import { statement } from "@/content/site";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";

/**
 * DECLARACIÓN — el cambio de ritmo.
 *
 * Rojo profundo a sangre y tipografía crema. Nada más: ni imagen, ni gráfico,
 * ni botón. Es la única sección que invierte la página entera, y por eso
 * funciona. `data-nav-tone="paper"` hace que la cabecera se vuelva crema aquí.
 */
export function Statement() {
  return (
    <section
      data-nav-tone="paper"
      className="bg-red-deep text-paper"
    >
      <div className="shell flex min-h-[86svh] flex-col justify-center py-[clamp(5rem,12vw,10rem)]">
        <div className="grid12">
          <h2 className="col-span-12 lg:col-span-10">
            {statement.lines.map((line, i) => (
              <RevealText key={line} as="span" text={line} delay={i * 0.1} className="t-display block" />
            ))}
          </h2>

          <Reveal
            className="col-span-12 mt-[clamp(2rem,4vw,3.5rem)] sm:col-span-10 sm:col-start-3 lg:col-span-7 lg:col-start-6"
            delay={0.25}
          >
            <p className="t-h3 text-butter italic">{statement.accent}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
