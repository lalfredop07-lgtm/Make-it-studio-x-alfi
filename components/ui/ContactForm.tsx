"use client";

import { useRef, useState } from "react";
import { cx } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const HELP = [
  "Creación de contenido",
  "Estrategia",
  "Manejo de redes sociales",
  "Paid media",
  "Todavía no lo tengo claro",
];

const field =
  "w-full border-b border-[var(--rule-strong)] bg-transparent py-3 text-[var(--fs-body)] " +
  "outline-none transition-colors duration-200 placeholder:text-ink-faint " +
  "focus:border-red";

/**
 * Formulario de contacto. Cinco campos, ninguno de relleno.
 *
 * No hay campo de presupuesto: el cliente no ha pedido pedirlo y preguntarlo
 * de entrada ahuyenta a buenos proyectos.
 *
 * El envío real depende de las variables de entorno del servidor (ver README).
 * Mientras no estén configuradas la API responde con un error explícito y la
 * interfaz ofrece Instagram como alternativa — nunca finge haber enviado nada.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(body.error ?? "No hemos podido enviar el mensaje.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("No hemos podido conectar. Revisa tu conexión e inténtalo otra vez.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border-t border-[var(--rule)] pt-8">
        <p className="t-h3">Recibido.</p>
        <p className="t-small mt-4 max-w-[42ch] text-ink-soft">
          Te escribimos en breve. Si tienes prisa, por Instagram contestamos antes.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline t-label mt-8 text-red"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate={false} className="space-y-10">
      {/* Trampa para bots: invisible y fuera del orden de tabulación. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="empresa-web">No rellenar</label>
        <input id="empresa-web" name="empresa_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        <Field label="Nombre" name="nombre" autoComplete="name" required />
        <Field label="Marca o empresa" name="marca" autoComplete="organization" />
      </div>

      <Field label="Email" name="email" type="email" autoComplete="email" required />

      <div>
        <label htmlFor="ayuda" className="t-label block text-ink-soft">
          ¿En qué podemos ayudarte?
        </label>
        <select id="ayuda" name="ayuda" className={cx(field, "mt-3 appearance-none")} defaultValue={HELP[0]}>
          {HELP.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="t-label block text-ink-soft">
          Cuéntanos el proyecto
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          required
          placeholder="Qué marca llevas, dónde estás y qué te gustaría conseguir."
          className={cx(field, "mt-3 resize-y")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className={cx(
            "t-label border border-ink px-8 py-4 transition-colors duration-300",
            status === "loading"
              ? "cursor-wait opacity-55"
              : "hover:border-red hover:bg-red hover:text-paper",
          )}
        >
          {status === "loading" ? "Enviando…" : "Enviar mensaje"}
        </button>

        <p
          role={status === "error" ? "alert" : undefined}
          aria-live="polite"
          className={cx("t-small max-w-[36ch]", status === "error" ? "text-red" : "sr-only")}
        >
          {message}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="t-label block text-ink-soft">
        {label}
        {required ? <span className="text-red"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={cx(field, "mt-3")}
      />
    </div>
  );
}
