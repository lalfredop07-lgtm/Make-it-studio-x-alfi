/**
 * SITE — toda la copy editable de la web en un solo sitio.
 *
 * REGLA DEL PROYECTO: aquí no hay nada inventado. Cada dato procede de una
 * fuente verificable y está anotado. Lo que falta por confirmar va marcado con
 * `PENDIENTE` para que se sustituya sin tocar los componentes.
 *
 * Fuentes:
 *  - Perfil de Instagram @makeitstudio__ (bio, servicios, sedes, claim).
 *  - Guía de marca makeit_studio_2.ai (tipografías y paleta).
 *  - Transcripción literal de los tres vídeos de testimonio (subtítulos abiertos).
 */

export const site = {
  name: "Make It Studio",
  /** Claim real de la marca, tal cual aparece en su bio de Instagram. */
  claim: "Make It Happen",
  /** Bio de Instagram, literal. */
  description:
    "Agencia creativa y de social media. Creación de contenido, estrategia, manejo de redes sociales y paid media. Madrid y México.",
  locations: ["Madrid", "México"],
  /** Confirmado por el cliente: más de una década. Nunca una cifra exacta. */
  experience: "Más de 10 años",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://makeitstudio.es",
} as const;

export const contact = {
  instagram: "https://www.instagram.com/makeitstudio__/",
  instagramHandle: "@makeitstudio__",
  /**
   * PENDIENTE — no disponemos del email público del estudio. Se rellena por
   * variable de entorno; mientras esté vacío la web no muestra el enlace y
   * encamina todo al formulario.
   */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  /** PENDIENTE — teléfono sin confirmar. Mismo criterio que el email. */
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  /** Calendly / Cal.com / TidyCal. Si está vacío, el CTA lleva al formulario. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
} as const;

export const nav = [
  { label: "Trabajo", href: "/work" },
  { label: "Estudio", href: "/estudio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const hero = {
  /** Statement de marca: va en inglés porque es el claim real del estudio. */
  lineOne: "we make it",
  /** "happen." es el estado principal; el resto rota despacio y siempre vuelve. */
  rotating: ["happen.", "seen.", "matter.", "grow."],
  standfirst:
    "Agencia creativa y de social media. Trabajamos con negocios que viven de que la gente entre por la puerta.",
  disciplines: ["Creación de contenido", "Estrategia", "Social media", "Paid media"],
} as const;

export const manifesto = {
  lines: ["Hay marcas que publican.", "Y hay marcas que se recuerdan."],
  body: "La diferencia no la marca el algoritmo. La marca el criterio: saber qué contar, cómo se ve y por qué a alguien debería importarle.",
} as const;

export const reel = {
  label: "Showreel",
  year: "2026",
  title: "Un año de rodajes",
  accent: "en sus locales.",
} as const;

export const services = {
  label: "Qué hacemos",
  title: "Servicios",
  items: [
    {
      n: "01",
      title: "Creación de contenido",
      body: "Vamos a tu local y grabamos allí, con tu equipo y tus clientes dentro. De ahí salen fotografía, reels y piezas de campaña que parecen reales porque lo son.",
      photo: "kuikkuNogal",
    },
    {
      n: "02",
      title: "Estrategia",
      body: "Antes de grabar hay una llamada donde se ponen ideas sobre la mesa: las tuyas y las nuestras. De ahí sale un plan en el que cada pieza tiene una razón.",
      photo: "kuikkuLounge",
    },
    {
      n: "03",
      title: "Manejo de redes sociales",
      body: "Feed, historias, comunidad y publicación. Sostener el tono y el ritmo todos los días, no solo el día del rodaje.",
      photo: "pilatesClase",
    },
    {
      n: "04",
      title: "Paid media",
      body: "Llevar el contenido que ya funciona a la gente adecuada, y leer qué pasa después para ajustar lo siguiente.",
      photo: "kuikkuMesaRoja",
    },
  ],
} as const;

export const statement = {
  lines: ["Tu marca no necesita", "publicar más."],
  accent: "Necesita que lo que publica se parezca a ella.",
} as const;

export const clients = {
  label: "Clientes",
} as const;

export const testimonials = {
  label: "Lo que dicen",
  title: "Nuestros clientes,\nen sus palabras.",
  /**
   * Citas LITERALES transcritas de los subtítulos de cada vídeo. No se han
   * reescrito ni se les ha añadido nada. El vídeo completo está disponible.
   */
  items: [
    {
      id: "kuikku",
      client: "Kuikku · Nigo by Kuikku",
      meta: "Restaurantes · Madrid",
      quote:
        "Llegan un día al restaurante y empiezan a tomar fotos, empiezan a grabar vídeo, interactúan con los clientes. Y vuelven con un contenido muy natural y a la vez profesional.",
      /** Dato dicho por el propio cliente en el vídeo. */
      note: "Cinco años trabajando juntos",
      video: "testimonioKuikku",
    },
    {
      id: "hom",
      client: "HOM",
      meta: "Barre & Pilates · Madrid",
      quote:
        "Creemos que Make It nos entiende muy bien, nuestros valores, y crea un contenido que va muy de la mano de HOM. Sobre todo, muy buenos resultados.",
      note: "Dos años trabajando juntos",
      video: "testimonioHom",
    },
    {
      id: "yupick",
      client: "Yupick",
      meta: "Café saludable · Madrid",
      quote:
        "Es una persona que se involucra mucho con la marca. Para mí ese trato personalizado es lo que hace la diferencia en una empresa.",
      note: "De cero comunidad a una marca con nombre en Madrid",
      video: "testimonioYupick",
    },
  ],
} as const;

export const culture = {
  label: "Dentro del estudio",
  title: "El trabajo\nno empieza en el feed.",
} as const;

export const about = {
  label: "El estudio",
  title: "Más de una década\nhaciendo que pase.",
  body: [
    "Make It Studio es una agencia creativa y de social media con base en Madrid y México. Llevamos más de diez años ayudando a marcas a construir una presencia que no solo se vea bien: que tenga intención.",
    "Trabajamos sobre todo con negocios físicos —restaurantes, estudios de fitness, cafeterías, tiendas, floristerías— porque son los que más se juegan en cada publicación. Entendemos el negocio antes que el feed.",
  ],
  pullQuote: "No creemos en publicar por publicar. Cada pieza tiene que tener una razón.",
  sectors: [
    "Hostelería y gastronomía",
    "Fitness y wellness",
    "Retail y moda",
    "Lifestyle y marcas personales",
  ],
} as const;

export const cta = {
  title: "¿Tienes un proyecto\nen mente?",
  body: "Cuéntanos qué marca llevas entre manos. La primera llamada son treinta minutos y no cuesta nada.",
  button: "Agenda una llamada de 30 min",
} as const;

export const footer = {
  legal: [
    { label: "Privacidad", href: "/legal/privacidad" },
    { label: "Cookies", href: "/legal/cookies" },
    { label: "Aviso legal", href: "/legal/aviso-legal" },
  ],
} as const;

/** Destino del CTA de reserva: si no hay URL configurada, al formulario. */
export const bookingHref = contact.bookingUrl || "/contacto";
export const bookingIsExternal = Boolean(contact.bookingUrl);
