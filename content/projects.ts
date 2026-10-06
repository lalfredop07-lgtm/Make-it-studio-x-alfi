import type { PhotoKey } from "./media";

/**
 * PROYECTOS — solo clientes reales, con material real.
 *
 * Criterio de atribución: una foto se asigna a un cliente únicamente cuando hay
 * prueba (nombre de archivo, rótulo visible en la imagen o marca identificable).
 * El material de hostelería no atribuido vive en la galería de cultura, sin
 * cliente, en lugar de adjudicarse a nadie.
 *
 * Los campos `pending` describen lo que falta para completar cada caso. Se
 * rellenan y se borra la nota.
 */
export type Project = {
  slug: string;
  client: string;
  category: string;
  location: string;
  /** Duración de la relación, solo cuando el propio cliente la ha declarado. */
  relationship?: string;
  services: string[];
  cover: PhotoKey;
  /** Planchas del caso, en orden de lectura. */
  gallery: PhotoKey[];
  /** Clave de `videos` en media.ts, si existe pieza audiovisual. */
  video?: "testimonioKuikku" | "testimonioYupick" | "testimonioHom";
  intro: string;
  body?: string[];
  /** Id del testimonio en site.ts, si lo hay. */
  testimonial?: string;
  /** Material o información que todavía falta. Visible solo en el código. */
  pending?: string[];
};

export const projects: Project[] = [
  {
    slug: "kuikku",
    client: "Kuikku · Nigo by Kuikku",
    category: "Restaurantes",
    location: "Madrid",
    relationship: "Cinco años",
    services: ["Creación de contenido", "Social media", "Estrategia"],
    cover: "kuikkuPalillos",
    gallery: [
      "kuikkuMesaRoja",
      "kuikkuNeon",
      "kuikkuPizarra",
      "kuikkuBrindis",
      "kuikkuNogal",
      "kuikkuLounge",
      "kuikkuBarra",
    ],
    video: "testimonioKuikku",
    intro:
      "Un clásico del sushi en Madrid y su restaurante hermano. Cinco años grabando dentro de la sala: la carta, la barra, los cócteles y la gente que llena las mesas.",
    body: [
      "El trabajo se hace en el propio restaurante, en horario de servicio. Fotografía de carta, piezas de cóctel y vídeo con los clientes dentro — no un set montado aparte.",
      "El resultado es un archivo visual propio que sostiene el feed todo el año y que crece con cada apertura nueva.",
    ],
    testimonial: "kuikku",
  },
  {
    slug: "hom",
    client: "HOM",
    category: "Barre & Pilates",
    location: "Juan Bravo 75, Madrid",
    relationship: "Dos años",
    services: ["Creación de contenido", "Social media", "Estrategia"],
    cover: "homBarre",
    gallery: [],
    video: "testimonioHom",
    intro:
      "Estudio de pilates mat, barre y reformer en Madrid. Grabación mensual en sala, mostrando cómo son las clases por dentro.",
    body: [
      "El formato es fijo: una llamada previa donde ambas partes traen ideas, y después un día de rodaje al mes — más producción puntual cuando hay algo importante que contar.",
    ],
    testimonial: "hom",
    pending: [
      "La portada es un fotograma del propio vídeo de testimonio de HOM. Sustituir por fotografía fija del estudio de Juan Bravo 75 cuando la haya.",
    ],
  },
  {
    slug: "yupick",
    client: "Yupick",
    category: "Café saludable",
    location: "Madrid",
    services: ["Creación de contenido", "Social media", "Estrategia"],
    cover: "yupickBowl",
    gallery: [],
    video: "testimonioYupick",
    intro:
      "Café saludable en Madrid. Acompañamiento desde que la marca llegó a la ciudad sin comunidad hasta convertirse en un sitio con nombre propio.",
    testimonial: "yupick",
    pending: [
      "La portada es un fotograma del propio vídeo de testimonio de Yupick. Sustituir por fotografía fija cuando la haya.",
      "En el Drive figuraba «INNAGURACION YUPICK VF.mov», que no se ha recibido. Es la pieza natural para este caso.",
    ],
  },
  {
    slug: "amapola",
    client: "Amapola",
    category: "Estudio floral",
    location: "Madrid",
    services: ["Creación de contenido", "Dirección de arte"],
    cover: "amapolaRamo",
    gallery: [],
    intro:
      "Estudio floral. Fotografía de producto y marca: el trabajo y la papelería, en luz natural y sobre fondo limpio.",
    pending: ["Ampliar la galería con más material del estudio floral."],
  },
  {
    slug: "ex-preso-martinez",
    client: "Ex Preso Martínez",
    category: "Café & bar",
    location: "Madrid",
    services: ["Creación de contenido", "Social media"],
    cover: "expresoBarra",
    gallery: [],
    intro:
      "Cafetería de especialidad y bar en Madrid. Contenido de barra, producto y equipo: desayunos, afterwork y la vida del local.",
    pending: ["Ampliar la galería con material de producto y sala."],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectSlugs = projects.map((p) => p.slug);
