# Make It Studio — sitio web

Agencia creativa y de social media. Madrid · México.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion.

---

## Arrancar

```bash
npm install
npm run dev
```

http://localhost:3000

```bash
npm run build      # build de producción
npm run start      # servir el build
npm run lint       # ESLint
npm run typecheck  # TypeScript sin emitir
```

---

## Estructura

```
app/
  layout.tsx              tipografías, metadatos, cabecera/pie, grano de papel
  page.tsx                home (compone las secciones, define el ritmo)
  globals.css             DESIGN SYSTEM: paleta, escala tipográfica, grid, motion
  icon.png                favicon (monograma crema sobre rojo de marca)
  apple-icon.png          icono de iOS
  opengraph-image.png     imagen para redes (1200×630)
  work/page.tsx           índice de proyectos
  work/[slug]/page.tsx    PLANTILLA DE CASO, reutilizable
  estudio/page.tsx        sobre el estudio, cómo trabajamos, servicios
  contacto/page.tsx       formulario + datos
  legal/…                 privacidad, cookies, aviso legal (pendientes de redactar)
  api/contacto/route.ts   endpoint del formulario
  sitemap.ts robots.ts manifest.ts not-found.tsx

components/
  layout/     Header, MobileMenu, Footer, LegalPage
  sections/   Hero, Manifesto, SelectedWork, FeaturedReel, Services,
              Statement, Clients, Testimonials, Culture, About, FinalCTA
  ui/         Plate, VideoPlate, LogoMark, Label, ArrowLink, ContactForm, Cursor
  motion/     Reveal, RevealText, RotatingWord, Marquee

content/      ← TODA LA COPY Y EL MATERIAL EDITABLE
  site.ts       textos de la web
  projects.ts   proyectos y casos
  media.ts      inventario de fotos, vídeos y logos (tipado)

lib/          motion.ts (sistema de movimiento), utils.ts
scripts/      pipeline de assets y QA visual (ver scripts/README.md)
public/assets/ fotos, vídeos y logos ya optimizados
```

---

## Dónde editar cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Cualquier texto de la home | `content/site.ts` |
| Navegación | `content/site.ts` → `nav` |
| Servicios | `content/site.ts` → `services.items` |
| Testimonios | `content/site.ts` → `testimonials.items` |
| Proyectos y casos | `content/projects.ts` |
| Fotos, vídeos, logos de cliente | `content/media.ts` |
| Colores, tipografía, espaciado | `app/globals.css` (bloque `@theme` y `:root`) |
| Duraciones y curva de animación | `lib/motion.ts` |

**Regla del proyecto: en `content/` no hay nada inventado.** Cada dato procede de
una fuente verificable y está anotado. Lo que falta por confirmar va marcado
`PENDIENTE` o en el campo `pending` de cada proyecto.

### Añadir un proyecto

1. Procesa las fotos (ver *Pipeline de assets*).
2. Añádelas a `content/media.ts` dentro de `photos`, con un `alt` descriptivo real.
3. Añade la entrada en `content/projects.ts`. Se genera sola la página
   `/work/<slug>`, entra en el carril de la home, en el índice y en el sitemap.

---

## Variables de entorno

Crea `.env.local`. Ninguna es obligatoria para que la web funcione; cada una
activa una pieza.

```bash
# URL pública (sitemap, canonical, OpenGraph)
NEXT_PUBLIC_SITE_URL=https://makeitstudio.es

# Reserva de llamada (Calendly, Cal.com, TidyCal…)
# Si está vacía, el CTA lleva al formulario de contacto en lugar de a un enlace falso.
NEXT_PUBLIC_BOOKING_URL=

# Contacto público. Si están vacíos, la web NO muestra el dato.
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_CONTACT_PHONE=

# Envío del formulario (servidor). Sin esto, la API responde 501 con un mensaje
# claro y ofrece Instagram: nunca finge que el mensaje se ha enviado.
RESEND_API_KEY=
CONTACT_TO=hola@tudominio.com
CONTACT_FROM="Make It Studio <web@tudominio.com>"
```

### Cambiar el proveedor del formulario

Todo el envío está aislado en `app/api/contacto/route.ts`. La validación, el
saneado y la trampa anti-bot son independientes del proveedor: para pasar a
Formspree, SendGrid o un backend propio solo hay que sustituir la llamada `fetch`
a `api.resend.com`. El contrato con el cliente no cambia: `200 {ok:true}` o un
código de error con `{error: "mensaje para el usuario"}`.

### Analítica

No hay analítica instalada y **no se dispara ningún tracker**. Es deliberado: en
la UE hay que pedir consentimiento previo antes de cargarlo (art. 22.2 LSSI), así
que primero toca publicar la política de cookies y montar el banner. Cuando se
haga, el sitio para añadirlo es `app/layout.tsx`, cargando el script solo tras el
consentimiento y leyendo el ID de `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_META_PIXEL_ID`.

---

## Decisiones de diseño

La dirección de arte no se improvisó: sale del material. Lo que conviene saber
antes de tocar nada:

**Paleta.** Son los colores reales de la guía de marca (`makeit_studio_2.ai`),
no una interpretación: rojo ladrillo `#bb3427` (muestreado del logotipo),
crema `#f1e8cc`, azul grisáceo `#bbc2cc`, índigo `#5d69a7`, amarillo mantequilla
`#f3e39a` y marrón profundo. La tinta del texto es marrón espresso, nunca negro.
Reparto aproximado: 65 % papel, 20 % fotografía, 10 % tinta, 5 % rojo.

**Tipografía.** La marca usa Times New Roman (principal) y Gotham Book Italic
(secundaria). En web: **Instrument Serif** para display —misma familia
transicional, itálica igual de marcada, licencia abierta— y **Geist** para el
sistema. Gotham requiere licencia comercial; si se compra, se cambia en
`app/layout.tsx` y en `--font-sans`.

**Formato vertical.** Todo el vídeo es 9:16 y casi toda la fotografía es retrato
2:3. Por eso el sistema se construye sobre planchas verticales en lugar de
héroes apaisados: es lo que pide el material. `Plate` tiene cinco proporciones
y se elige una distinta por sección a propósito — la irregularidad controlada
forma parte de la estética, no es un descuido.

**Movimiento.** Un solo sistema (Motion), tres duraciones y una curva, todo en
`lib/motion.ts`. Sin GSAP y sin Lenis: dos librerías haciendo lo mismo engordan
el bundle y descuadran el movimiento. El scroll nunca se secuestra — las
secciones que se fijan son más altas y el contenido se desplaza dentro.
`prefers-reduced-motion` desactiva la cinta, la expansión del showreel, la
rotación del claim y el carril fijo, y deja todo el contenido accesible.

**Logotipos.** Tanto el de Make It como los de cliente se sirven como máscara
alpha monocroma, así heredan `currentColor` y se recolorean sin duplicar
archivos ni deformar nada. El ancho de cada logo de cliente está normalizado
**a ojo** en `content/media.ts`, no por fórmula: una mancha densa pesa más a
menor tamaño.

---

## Pipeline de assets

El material original (`FOTOS/`, `TESTIMONIOS/`, `LOGOS CLIENTES/`, `INFO MARCA/`)
está fuera del control de versiones por peso. En el repo solo va lo derivado,
dentro de `public/assets/`.

```bash
python3 scripts/build_assets.py          # fotos → WebP, logos → máscaras alpha

swiftc -O -o scripts/transcode scripts/transcode.swift
./scripts/transcode <entrada> <salida> <ancho> <kbps vídeo> <kbps audio|0>

swiftc -O -o scripts/grab scripts/grab.swift
./scripts/grab <entrada> <carpeta> <prefijo> <ancho> <t1> [t2 …]   # pósters
```

`scripts/transcode.swift` existe porque `avconvert` no permite fijar el bitrate
y producía 21 MB para 23 segundos. Con control explícito, el showreel queda en
3,8 MB y los testimonios entre 3,9 y 6,1 MB.

**Fotografía:** 19 imágenes, WebP, borde largo 1800–2400 px, ~2,7 MB en total.
`next/image` sirve AVIF/WebP al tamaño que toca.

En `scripts/` hay además las herramientas de QA visual que se usaron para
revisar la web (capturas por CDP y auditoría de consola, red y peso).
Documentadas en `scripts/README.md`.

---

## Rendimiento

Medido sobre el build de producción con la caché desactivada
(`node scripts/audit.mjs`):

| | Primera carga |
|---|---|
| Escritorio 1440×900 | **490 KB** |
| Móvil 390×844 | **469 KB** |

Reparto en escritorio: JS 229 KB · imágenes 143 KB · tipografías 59 KB ·
documento 20 KB · CSS 8 KB. Cero errores de consola, cero peticiones fallidas.

Qué lo sostiene:

- Ningún `<video>` se monta hasta que su bloque se acerca al viewport
  (`IntersectionObserver`, margen de 400 px). Antes solo se ve el póster, que va
  en `loading="lazy"`.
- Los bucles ambientales se pausan al salir de pantalla.
- Save-Data y pantallas pequeñas reciben la variante ligera del showreel
  (480×854 en vez de 720×1280).
- Los testimonios van a `preload="metadata"` y no cargan hasta que se pulsa play.
- Los logotipos se sirven como PNG en modo LA (gris + alfa) a 460 px: `mask-image`
  solo lee el canal alfa, así que los tres de color eran peso tirado. Los cinco
  juntos pesan 80 KB en lugar de 180 KB.
- Tipografías autoalojadas por `next/font`, subconjunto `latin` únicamente
  (el español cabe entero en él) y `display: swap`. Sin peticiones a terceros.
- Dos únicas calidades de imagen en todo el proyecto, 76 y 82: cada valor extra
  multiplica las variantes que hay que generar y cachear.
- Todas las imágenes declaran `sizes`; debajo se pinta el color medio real de
  cada foto, así que no hay huecos blancos ni CLS.

---

## Accesibilidad

WCAG 2.1 AA como mínimo. Verificado, no supuesto: auditoría de contraste sobre
los 140 nodos de texto de la home resolviendo los colores reales —incluidos los
`oklab` que genera Tailwind 4 al aplicar opacidad— y recorrido de tabulación con
pulsaciones reales de Tab. **Cero fallos en ambos.**

- HTML semántico, un solo `h1` por página y jerarquía correcta.
- "Saltar al contenido" como primer elemento enfocable.
- Foco siempre visible; donde se quita el `outline` se sustituye por un filete.
- El menú móvil atrapa el foco, se cierra con Escape y devuelve el foco al botón.
- Los testimonios son un `tablist` real, con flechas, Inicio y Fin.
- Los vídeos de testimonio usan controles nativos y llevan **subtítulos abiertos
  quemados en la imagen** (en español).
- Los revelados de texto palabra a palabra mantienen el texto íntegro en el DOM.
- `prefers-reduced-motion` respetado en todas las animaciones.
- El cursor del estudio solo aparece con puntero fino y nunca sustituye a un
  affordance que ya funciona.
- Los tres niveles de tinta están calibrados contra el crema más oscuro de los
  dos (el caso límite): 13.4 · 6.4 · 4.7. No hay un cuarto nivel porque sobre
  crema ya no cabe sin bajar de 4.5.

---

## Pendiente

Lo que falta para cerrar el sitio. Nada de esto se ha rellenado con datos
inventados.

**Material que no llegó.** En el Drive figuraban `INNAGURACION YUPICK VF.mov` y
`VIDEO NIGO X NB VC.mov` (carpeta `VIDEOS`) que no están en el material
entregado. Son las piezas naturales para los casos de Yupick y Nigo by Kuikku.

**Fotografía fija de Yupick y HOM.** De estos dos clientes solo hay vídeo. Sus
portadas son fotogramas extraídos de sus propios testimonios —material real
suyo, no una foto de otra marca ni un relleno—, pero convendría sustituirlas por
fotografía fija. Marcado en `content/projects.ts` → `pending`.

**Atribución de parte de la fotografía.** El material de hostelería sin marca
identificable (el restaurante de mantel blanco, el de parrilla, la clase de
pilates, la inauguración) aparece en la galería de cultura **sin atribuir**. Si
se confirma de qué cliente es cada sesión, pasa a su caso.

**Datos de contacto.** Email y teléfono públicos (variables de entorno). Hasta
que se rellenen, la web no los muestra.

**URL de reserva.** `NEXT_PUBLIC_BOOKING_URL`.

**Textos legales.** Las tres rutas existen con la lista de lo que debe contener
cada documento, pero **sin texto legal**: redactar una política ficticia crearía
una obligación falsa frente al RGPD y la LSSI. Las tres llevan `noindex`.

**Logotipo vectorial.** Se usa el PNG original a 937 px como máscara, más que
suficiente para cualquier pantalla. Si se extrae un SVG del `.ai`, sustituirlo en
`public/assets/brand/` mejora el peso.

---

## Despliegue

Pensado para Vercel (la optimización de imágenes de `next/image` funciona sin
configurar nada). Raíz del proyecto, build `npm run build`.

En otro hosting con Node el comportamiento es el mismo. Con export estático
habría que desactivar la optimización de imágenes (`images.unoptimized`), lo que
empeora bastante el rendimiento: no se recomienda.
