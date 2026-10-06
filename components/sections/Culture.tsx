import { culture } from "@/content/site";
import { photos } from "@/content/media";
import { Plate } from "@/components/ui/Plate";
import { Label } from "@/components/ui/Label";

/**
 * DENTRO DEL ESTUDIO — la sección menos comercial.
 *
 * Galería irregular a propósito: escalas, formatos y alturas distintas, como
 * un pliego de revista. Aquí la fotografía va SIN atribuir a ningún cliente:
 * es material de rodaje cuya marca no está confirmada, y preferimos no firmar
 * lo que no podemos demostrar.
 */
export function Culture() {
  return (
    <section className="py-[var(--space-section)]">
      <div className="shell">
        <div className="grid12 items-end">
          <div className="col-span-12 lg:col-span-6">
            <Label rule={false}>{culture.label}</Label>
            <h2 className="t-display mt-5 whitespace-pre-line">{culture.title}</h2>
          </div>
        </div>

        {/* Pliego 1 — ritmo alto / bajo / alto */}
        <div className="grid12 mt-[clamp(3rem,7vw,6rem)] items-start">
          <div className="col-span-7 sm:col-span-5 lg:col-span-4">
            <Plate
              photo={photos.cenaPareja}
              ratio="portrait"
              sizes="(max-width: 640px) 58vw, (max-width: 1024px) 42vw, 32vw"
            />
          </div>
          <div className="col-span-5 col-start-8 mt-20 sm:col-span-3 sm:col-start-7 lg:col-span-2 lg:col-start-6 lg:mt-32">
            <Plate
              photo={photos.cenaBrindis}
              ratio="portrait"
              sizes="(max-width: 640px) 42vw, (max-width: 1024px) 25vw, 16vw"
            />
          </div>
          <div className="col-span-8 col-start-3 mt-12 sm:col-span-4 sm:col-start-9 sm:mt-6 lg:col-span-3 lg:col-start-9">
            <Plate
              photo={photos.mesaParrilla}
              ratio="tall"
              sizes="(max-width: 640px) 66vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </div>
      </div>

      {/* Plancha a sangre: rompe el margen y cambia la respiración */}
      <div className="mt-[clamp(3.5rem,8vw,7rem)]">
        <Plate
          photo={photos.inauguracion}
          ratio="landscape"
          sizes="100vw"
          quality={76}
          imageClassName="object-[center_78%]"
          className="[&>div]:aspect-[16/9] sm:[&>div]:aspect-[21/9]"
        />
      </div>

      {/* Pliego 2 — dos planchas, no tres: después de la imagen a sangre la
          página necesita cerrar, no seguir acumulando. */}
      <div className="shell">
        <div className="grid12 mt-[clamp(3rem,7vw,5rem)] items-start">
          <div className="col-span-7 sm:col-span-5 lg:col-span-5">
            <Plate
              photo={photos.kuikkuNeon}
              ratio="portrait"
              sizes="(max-width: 640px) 58vw, (max-width: 1024px) 42vw, 32vw"
            />
          </div>
          <div className="col-span-5 col-start-8 mt-16 sm:col-span-4 sm:col-start-8 lg:col-span-5 lg:col-start-7 lg:mt-24">
            <Plate
              photo={photos.cenaPlato}
              ratio="portrait"
              sizes="(max-width: 640px) 42vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
