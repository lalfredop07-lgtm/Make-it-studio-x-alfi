/**
 * MEDIA — inventario tipado de los assets reales de Make It Studio.
 *
 * Origen: carpetas FOTOS / TESTIMONIOS / LOGOS CLIENTES / INFO MARCA del Drive
 * del proyecto, procesadas por `scripts/build_assets.py` y `scripts/transcode`.
 * Los imports estáticos aportan ancho/alto al bundle: cero layout shift.
 *
 * `tint` es el color medio de cada foto. Se pinta debajo mientras carga, para
 * que la plancha nunca aparezca como un hueco blanco.
 */
import amapolaRamo from "@/public/assets/photos/amapola-ramo.webp";
import cenaBrindis from "@/public/assets/photos/cena-brindis.webp";
import cenaPareja from "@/public/assets/photos/cena-pareja.webp";
import cenaPlato from "@/public/assets/photos/cena-plato.webp";
import expresoBarra from "@/public/assets/photos/expreso-barra.webp";
import homBarre from "@/public/assets/photos/hom-barre.webp";
import inauguracion from "@/public/assets/photos/inauguracion.webp";
import kuikkuBarra from "@/public/assets/photos/kuikku-barra.webp";
import kuikkuBrindis from "@/public/assets/photos/kuikku-brindis.webp";
import kuikkuLounge from "@/public/assets/photos/kuikku-lounge.webp";
import kuikkuMesaRoja from "@/public/assets/photos/kuikku-mesa-roja.webp";
import kuikkuNeon from "@/public/assets/photos/kuikku-neon.webp";
import kuikkuNogal from "@/public/assets/photos/kuikku-nogal.webp";
import kuikkuPalillos from "@/public/assets/photos/kuikku-palillos.webp";
import kuikkuPizarra from "@/public/assets/photos/kuikku-pizarra.webp";
import mesaParrilla from "@/public/assets/photos/mesa-parrilla.webp";
import mesaParrillaDetalle from "@/public/assets/photos/mesa-parrilla-detalle.webp";
import pilatesClase from "@/public/assets/photos/pilates-clase.webp";
import yupickBowl from "@/public/assets/photos/yupick-bowl.webp";
import type { StaticImageData } from "next/image";

export type Photo = {
  src: StaticImageData;
  /** Alt descriptivo y específico, escrito a partir de la imagen real. */
  alt: string;
  tint: string;
};

const p = (src: StaticImageData, alt: string, tint: string): Photo => ({ src, alt, tint });

export const photos = {
  amapolaRamo: p(
    amapolaRamo,
    "Tarjeta de Amapola Estudio Floral con el nombre estampado en dorado, apoyada sobre una mesa de madera clara entre claveles rojos.",
    "#b8a39f",
  ),
  kuikkuPalillos: p(
    kuikkuPalillos,
    "Unos palillos levantan una pieza de sushi envuelta en mango sobre un plato negro, en una mesa de azulejo rojo de Kuikku.",
    "#5a463a",
  ),
  kuikkuMesaRoja: p(
    kuikkuMesaRoja,
    "Mesa de azulejo rojo de Kuikku vista desde arriba con makis, un tiradito, cócteles y palillos sobre pizarra negra.",
    "#452e28",
  ),
  kuikkuPizarra: p(
    kuikkuPizarra,
    "Plato de pizarra negra con rollos de berenjena, granada y salsa de sésamo junto a un cóctel rosa, sobre azulejo rojo.",
    "#3c2723",
  ),
  kuikkuNeon: p(
    kuikkuNeon,
    "Dos cócteles sobre una mesa de madera en Kuikku, con un neón rojo encendido al fondo sobre pared de ladrillo.",
    "#42362b",
  ),
  kuikkuBrindis: p(
    kuikkuBrindis,
    "Dos manos brindan con cócteles sobre la mesa de Kuikku, con posavasos negros serigrafiados con la K de la marca.",
    "#3e2f25",
  ),
  kuikkuNogal: p(
    kuikkuNogal,
    "Mesa redonda de nogal con dos bandejas de sushi y cócteles de cítricos, iluminada en cálido.",
    "#4f4238",
  ),
  kuikkuLounge: p(
    kuikkuLounge,
    "Mesa baja frente a un sofá azul oscuro con bandejas de sushi, nigiris y dos cócteles.",
    "#2c2924",
  ),
  kuikkuBarra: p(
    kuikkuBarra,
    "Interior en penumbra de Kuikku: la barra iluminada en ámbar con el equipo trabajando al fondo.",
    "#2e2723",
  ),
  expresoBarra: p(
    expresoBarra,
    "Barista de espaldas tras la barra de Ex Preso Martínez, con la sudadera serigrafiada de la marca.",
    "#302f2f",
  ),
  pilatesClase: p(
    pilatesClase,
    "Clase en una sala de suelo hidráulico blanco y negro: varias personas sobre esterillas en postura de perro boca abajo.",
    "#676263",
  ),
  mesaParrilla: p(
    mesaParrilla,
    "Mesa con mantel blanco a plena luz del día, con pescado a la brasa, elotes y un cóctel rojo.",
    "#8d827a",
  ),
  mesaParrillaDetalle: p(
    mesaParrillaDetalle,
    "Primer plano de un pescado entero a la brasa con lima, sobre una fuente blanca.",
    "#85776f",
  ),
  cenaPareja: p(
    cenaPareja,
    "Una pareja ríe durante una cena en un restaurante de suelo ajedrezado, con celosía retroiluminada al fondo.",
    "#605149",
  ),
  cenaBrindis: p(
    cenaBrindis,
    "Dos copas de vino tinto chocan sobre una mesa vestida de blanco, en penumbra cálida.",
    "#53443d",
  ),
  cenaPlato: p(
    cenaPlato,
    "Plato de arroz especiado con piñones y salsa de yogur sobre mantel blanco, junto a una copa de vino tinto.",
    "#746861",
  ),
  inauguracion: p(
    inauguracion,
    "Sala llena durante una inauguración: gente conversando alrededor de una barra de hormigón.",
    "#302d2a",
  ),

  /* --------------------------------------------------------------------------
   * Fotogramas extraídos de los vídeos de testimonio de cada cliente. Son
   * material real suyo: es preferible a dejar la ficha sin portada o, peor, a
   * ponerle la foto de otra marca. Sustituir en cuanto haya fotografía propia.
   * ----------------------------------------------------------------------- */
  yupickBowl: p(
    yupickBowl,
    "Bol de Yupick con huevo, edamame y pistacho, servido en vaso de cristal.",
    "#a09a7c",
  ),
  homBarre: p(
    homBarre,
    "Una mano sostiene un balón lastrado junto a la barra del estudio HOM, con los espejos de la sala desenfocados al fondo.",
    "#aba095",
  ),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/* --------------------------------------------------------------- vídeo ---- */

export type Video = {
  src: string;
  /** Variante ligera para móvil y conexiones con Save-Data. */
  srcLight?: string;
  poster: string;
  width: number;
  height: number;
  /** Los testimonios llevan subtítulos abiertos quemados en la imagen. */
  openCaptions: boolean;
  label: string;
};

export const videos = {
  reel: {
    src: "/assets/video/reel-720.mp4",
    srcLight: "/assets/video/reel-480.mp4",
    poster: "/assets/video/reel-poster.webp",
    width: 720,
    height: 1280,
    openCaptions: false,
    label: "Showreel de Make It Studio: rótulo «Allow us to…» seguido de planos de cócteles, floristería, clases de pilates y producción de contenido.",
  },
  testimonioKuikku: {
    src: "/assets/video/testimonio-kuikku.mp4",
    poster: "/assets/video/testimonio-kuikku-poster.webp",
    width: 640,
    height: 1138,
    openCaptions: true,
    label: "Testimonio en vídeo del equipo de Kuikku y Nigo by Kuikku, con subtítulos en español.",
  },
  testimonioYupick: {
    src: "/assets/video/testimonio-yupick.mp4",
    poster: "/assets/video/testimonio-yupick-poster.webp",
    width: 640,
    height: 1138,
    openCaptions: true,
    label: "Testimonio en vídeo del equipo de Yupick, con subtítulos en español.",
  },
  testimonioHom: {
    src: "/assets/video/testimonio-hom.mp4",
    poster: "/assets/video/testimonio-hom-poster.webp",
    width: 640,
    height: 1138,
    openCaptions: true,
    label: "Testimonio en vídeo del equipo de HOM, estudio de barre y pilates, con subtítulos en español.",
  },
} satisfies Record<string, Video>;

/* --------------------------------------------------- logotipos de cliente -- */

/**
 * Cada logo se sirve como máscara alpha monocroma, así se recolorea sin tocar
 * sus proporciones. `width` está normalizado ópticamente a mano (no
 * matemáticamente): las marcas densas pesan más a menor tamaño.
 */
export type ClientLogo = {
  src: string;
  name: string;
  /** Ancho de render en px a 1440. Ajustado a ojo, no por fórmula. */
  width: number;
  ratio: number;
};

export const clientLogos: ClientLogo[] = [
  { src: "/assets/logos/kuikku.png", name: "Kuikku", width: 58, ratio: 0.731 },
  { src: "/assets/logos/yupick.png", name: "Yupick", width: 104, ratio: 2.018 },
  { src: "/assets/logos/amapola.png", name: "Amapola Estudio Floral", width: 172, ratio: 5.268 },
  { src: "/assets/logos/expreso.png", name: "Ex Preso Martínez", width: 116, ratio: 2.128 },
  { src: "/assets/logos/reganadientes.png", name: "Restaurante Regañadientes", width: 158, ratio: 4.128 },
];

export const brandLogo = {
  src: "/assets/brand/makeit-logo.png",
  ratio: 2.3484,
  monogram: "/assets/brand/makeit-monogram.png",
};
