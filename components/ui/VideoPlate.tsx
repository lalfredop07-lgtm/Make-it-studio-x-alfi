"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Video } from "@/content/media";
import { usePrefersLightMedia } from "@/lib/media";
import { EASE } from "@/lib/motion";
import { cx } from "@/lib/utils";

type Mode = "ambient" | "testimonial";

/**
 * VÍDEO — todo el material audiovisual es 9:16, así que la caja es vertical.
 *
 * Nada se descarga hasta que el bloque se acerca al viewport: el elemento
 * <video> ni siquiera se monta antes. Hasta entonces se ve el póster, que pesa
 * ~50 KB.
 *
 * - `ambient`: bucle mudo que se pausa solo al salir de pantalla. Con
 *   movimiento reducido no arranca: se queda en el póster y se puede dar al play.
 * - `testimonial`: póster + botón. Al reproducir aparecen los controles nativos,
 *   que son los que funcionan con teclado y lector de pantalla.
 */
export function VideoPlate({
  video,
  mode = "ambient",
  className,
  ratio = "9 / 16",
  rounded = false,
}: {
  video: Video;
  mode?: Mode;
  className?: string;
  ratio?: string;
  rounded?: boolean;
}) {
  const reduced = useReducedMotion();
  const light = usePrefersLightMedia();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [mounted, setMounted] = useState(false);   // ¿ya existe el <video>?
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);   // el usuario ya ha interactuado

  const src = light && video.srcLight ? video.srcLight : video.src;

  // Montar el <video> solo cuando el bloque se aproxima.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || mounted) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  // Reproducción ambiental: solo mientras está en pantalla.
  useEffect(() => {
    if (mode !== "ambient" || !mounted || reduced) return;
    const el = videoRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          el.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.2 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [mode, mounted, reduced]);

  const toggle = useCallback(() => {
    const el = videoRef.current;
    if (!el) {
      setMounted(true);
      setStarted(true);
      return;
    }
    if (el.paused) {
      if (mode === "testimonial") {
        el.muted = false;
        setMuted(false);
      }
      el.play().then(() => setPlaying(true)).catch(() => {});
      setStarted(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }, [mode]);

  const toggleSound = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }, []);

  const showPoster = !mounted || (mode === "testimonial" && !started);
  const showControls = mode === "testimonial" && started;

  return (
    <div
      ref={wrapRef}
      className={cx("relative w-full overflow-hidden bg-ink", rounded && "rounded-[2px]", className)}
      style={{ aspectRatio: ratio }}
    >
      {mounted ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={video.poster}
          src={src}
          muted={mode === "ambient" ? muted : muted}
          loop={mode === "ambient"}
          playsInline
          preload="metadata"
          controls={showControls}
          aria-label={video.label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      ) : null}

      {/* Póster: sirve de placeholder y de primer fotograma hasta que haya intención. */}
      <AnimatePresence>
        {showPoster ? (
          <motion.img
            key="poster"
            src={video.poster}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            initial={false}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        ) : null}
      </AnimatePresence>

      {/* Botón de reproducción. En modo testimonio desaparece al arrancar y
          cede el sitio a los controles nativos. */}
      {!showControls ? (
        <button
          type="button"
          onClick={mode === "testimonial" || reduced ? toggle : toggleSound}
          data-cursor={mode === "testimonial" ? "PLAY" : muted ? "SONIDO" : "SILENCIO"}
          className="focus-plate absolute inset-0 flex items-end justify-start p-4 sm:p-6"
        >
          <span className="sr-only">
            {mode === "testimonial"
              ? `Reproducir con sonido: ${video.label}`
              : muted
                ? "Activar el sonido del showreel"
                : "Silenciar el showreel"}
          </span>
          <span
            aria-hidden="true"
            className="t-label flex items-center gap-2 bg-paper px-3 py-2 text-ink transition-colors duration-200 hover:bg-red hover:text-paper"
          >
            {mode === "testimonial" ? (
              <>
                <PlayGlyph /> Ver testimonio
              </>
            ) : playing && !muted ? (
              "Silenciar"
            ) : playing ? (
              "Con sonido"
            ) : (
              <>
                <PlayGlyph /> Reproducir
              </>
            )}
          </span>
        </button>
      ) : null}

      {video.openCaptions && !showControls ? (
        <span className="t-label absolute right-4 top-4 bg-ink px-2 py-1 text-paper">
          Subtítulos
        </span>
      ) : null}
    </div>
  );
}

function PlayGlyph() {
  return (
    <svg width="9" height="11" viewBox="0 0 9 11" fill="none" aria-hidden="true">
      <path d="M0 0.5L9 5.5L0 10.5V0.5Z" fill="currentColor" />
    </svg>
  );
}
