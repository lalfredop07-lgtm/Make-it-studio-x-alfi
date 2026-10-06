import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Endpoint de contacto.
 *
 * Está preparado para Resend pero NO apunta a ningún servicio inventado: si no
 * hay credenciales configuradas responde 501 con un mensaje claro, y la
 * interfaz ofrece Instagram como alternativa. Nunca devuelve un falso "enviado".
 *
 * Para activarlo (ver README):
 *   RESEND_API_KEY=re_xxx
 *   CONTACT_TO=hola@tudominio.com
 *   CONTACT_FROM="Make It Studio <web@tudominio.com>"   (dominio verificado)
 *
 * Para cambiar de proveedor basta con sustituir `deliver()`.
 */

type Payload = {
  nombre?: string;
  marca?: string;
  email?: string;
  ayuda?: string;
  mensaje?: string;
  empresa_web?: string;
};

const MAX = { nombre: 120, marca: 160, email: 200, ayuda: 80, mensaje: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Petición no válida." }, { status: 400 });
  }

  // Trampa para bots: si viene rellena, respondemos 200 sin hacer nada.
  if (clean(body.empresa_web, 50)) {
    return NextResponse.json({ ok: true });
  }

  const nombre = clean(body.nombre, MAX.nombre);
  const marca = clean(body.marca, MAX.marca);
  const email = clean(body.email, MAX.email);
  const ayuda = clean(body.ayuda, MAX.ayuda);
  const mensaje = clean(body.mensaje, MAX.mensaje);

  if (!nombre || !mensaje) {
    return NextResponse.json({ error: "Faltan el nombre o el mensaje." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Revisa la dirección de email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    // Sin credenciales no se finge un envío: el formulario lo dice en claro.
    console.warn("[contacto] Falta configuración de envío. Mensaje no entregado.");
    return NextResponse.json(
      {
        error:
          "El formulario todavía no está conectado. Escríbenos por Instagram mientras tanto.",
      },
      { status: 501 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Web · ${nombre}${marca ? ` — ${marca}` : ""}`,
        text: [
          `Nombre:  ${nombre}`,
          `Marca:   ${marca || "—"}`,
          `Email:   ${email}`,
          `Interés: ${ayuda || "—"}`,
          "",
          mensaje,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("[contacto] Error del proveedor:", res.status, await res.text());
      return NextResponse.json(
        { error: "No hemos podido enviar el mensaje. Inténtalo en un momento." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contacto] Fallo de red:", err);
    return NextResponse.json({ error: "No hemos podido enviar el mensaje." }, { status: 502 });
  }
}
