"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Lectura de media queries con `useSyncExternalStore`.
 *
 * Es la herramienta correcta para esto: una media query es estado externo al
 * que React se suscribe, no algo que haya que copiar a `useState` dentro de un
 * efecto. Evita el render en cascada y además es seguro en SSR, porque declara
 * explícitamente qué devuelve en el servidor.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false, // en el servidor asumimos "no": el cliente corrige al hidratar
  );
}

/**
 * ¿Conviene servir la variante ligera del vídeo?
 * Sí en pantallas pequeñas y si el navegador pide ahorro de datos.
 */
export function usePrefersLightMedia(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia("(max-width: 768px)");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => {
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      return Boolean(conn?.saveData) || window.matchMedia("(max-width: 768px)").matches;
    },
    () => false,
  );
}
