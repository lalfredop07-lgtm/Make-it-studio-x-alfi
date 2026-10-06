import { contact, site } from "@/content/site";

/**
 * Datos estructurados. Solo se declara lo que es verificable: nombre, oferta de
 * servicios, sedes y perfil social. Sin reseñas, sin valoraciones agregadas y
 * sin datos de contacto que no tengamos.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}/opengraph-image.png`,
    sameAs: [contact.instagram],
    areaServed: site.locations.map((l) => ({ "@type": "Place", name: l })),
    address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: [
        "Creación de contenido",
        "Estrategia",
        "Manejo de redes sociales",
        "Paid media",
      ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // El JSON lo generamos nosotros a partir de constantes: no hay entrada de usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
