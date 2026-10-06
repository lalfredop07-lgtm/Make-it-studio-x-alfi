"use client";

import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/content/site";
import { photos } from "@/content/media";
import { Plate } from "@/components/ui/Plate";
import { RotatingWord } from "@/components/motion/RotatingWord";
import { EASE } from "@/lib/motion";

/**
 * HERO — portada.
 *
 * El titular vive solo, centrado, sin ninguna foto a su lado ni montada
 * encima: es lo primero y lo único que se lee al entrar. Las planchas bajan
 * a su propia fila, debajo, a una distancia clara.
 */
export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 34 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.05, ease: EASE, delay },
  });

  return (
    <section className="relative pt-[calc(var(--header-h)+clamp(3.5rem,8vw,7rem))]">
      {/* ---------------------------------------------------------- titular ---- */}
      <div className="shell text-center">
        <h1>
          <motion.span className="t-display-xl block" {...rise(0.12)}>
            {hero.lineOne}
          </motion.span>
          <motion.span className="t-display-xl mt-[0.06em] block" {...rise(0.26)}>
            <RotatingWord words={hero.rotating} />
          </motion.span>
        </h1>
      </div>

      {/* ------------------------------------------- entradilla + planchas ---- */}
      <div className="shell mt-[clamp(4rem,9vw,8rem)]">
        {/*
          Dos grids independientes a propósito, no uno con cuatro elementos:
          cada <div className="grid12"> tiene su propio algoritmo de
          auto-colocación por filas. Mezclar aquí dentro la foto de Amapola
          junto al texto y las otras dos planchas hacía que sus rangos de
          columna se pisaran entre breakpoints y el grid las reordenaba solo,
          dejando huecos y fotos perdidas. Separadas, cada una controla su
          propia fila sin interferir con las demás.
        */}
        {/*
          Trío a igual tamaño, no una sola foto protagonista: Amapola sola
          aquí hacía parecer que Make It es una floristería. Tres sectores
          distintos —café, flores, fitness— al mismo peso visual cuentan la
          variedad real de clientes en el primer vistazo tras el titular.
        */}
        <div className="grid12 items-start">
          <motion.div className="col-span-6 col-start-1 sm:col-span-4 sm:col-start-1" {...rise(0.4)}>
            <Plate
              photo={photos.expresoBarra}
              ratio="portrait"
              quality={76}
              sizes="(max-width: 640px) 46vw, (max-width: 1024px) 33vw, 24vw"
            />
          </motion.div>

          <motion.div
            className="col-span-6 col-start-7 mt-10 sm:col-span-4 sm:col-start-5 sm:mt-10"
            {...rise(0.5)}
          >
            <Plate
              photo={photos.amapolaRamo}
              ratio="portrait"
              priority
              quality={82}
              sizes="(max-width: 640px) 46vw, (max-width: 1024px) 33vw, 24vw"
            />
          </motion.div>

          <motion.div
            className="col-span-7 col-start-3 mt-16 sm:col-span-4 sm:col-start-9 sm:mt-20"
            {...rise(0.6)}
          >
            <Plate
              photo={photos.homBarre}
              ratio="portrait"
              quality={76}
              sizes="(max-width: 640px) 54vw, (max-width: 1024px) 33vw, 24vw"
            />
          </motion.div>
        </div>

        <div className="grid12 mt-16 items-start">
          <motion.div className="col-span-12 sm:col-span-6 lg:col-span-4" {...rise(0.54)}>
            <p className="t-lead max-w-[30ch]">{hero.standfirst}</p>
            <ul className="mt-8 space-y-1.5">
              {hero.disciplines.map((d) => (
                <li key={d} className="t-label text-ink">
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="col-span-7 col-start-6 mt-12 sm:col-span-5 sm:col-start-8 sm:mt-0 lg:col-span-4 lg:col-start-6"
            {...rise(0.64)}
          >
            <Plate
              photo={photos.kuikkuPizarra}
              ratio="portrait"
              quality={76}
              sizes="(max-width: 640px) 58vw, (max-width: 1024px) 42vw, 32vw"
            />
          </motion.div>

          <motion.div
            className="col-span-5 col-start-1 -mt-20 sm:col-span-3 sm:col-start-4 sm:mt-24 lg:col-span-2 lg:col-start-11 lg:mt-32"
            {...rise(0.72)}
          >
            <Plate
              photo={photos.pilatesClase}
              ratio="portrait"
              quality={76}
              sizes="(max-width: 640px) 42vw, (max-width: 1024px) 25vw, 16vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
