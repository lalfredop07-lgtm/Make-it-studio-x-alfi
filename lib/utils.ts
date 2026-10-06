export const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

/** Divide una frase en palabras conservando los espacios, para revelados. */
export const words = (text: string) => text.split(/(\s+)/).filter((w) => w.length > 0);
