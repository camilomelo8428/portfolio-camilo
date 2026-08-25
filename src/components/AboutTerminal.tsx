"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCyberAudio } from "@/components/CyberAudioProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HOLD_MS = 4000;
const STATIC_IN_MS = 280;
const STATIC_OUT_MS = 180;

/**
 * Aguarda um intervalo cancelavel.
 *
 * Args:
 *   ms: Tempo em milissegundos.
 *   signal: AbortSignal para cancelar a espera.
 *
 * Returns:
 *   Promise resolvida ao fim do tempo ou rejeitada se abortado.
 */
function wait(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }

    const id = window.setTimeout(() => resolve(), ms);
    const onAbort = () => {
      window.clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * Outdoor CRT com troca automatica de canais e estatica de TV.
 */
export function AboutTerminal() {
  const { t } = useLanguage();
  const { play } = useCyberAudio();
  const reducedMotion = useReducedMotion();
  const slides = t.about.terminal;
  const [index, setIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const busyRef = useRef(false);
  const indexRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const runStaticSwap = useCallback(
    async (nextIndex: number, signal: AbortSignal) => {
      if (nextIndex === indexRef.current) {
        return;
      }

      busyRef.current = true;

      if (reducedMotion) {
        setIndex(nextIndex);
        busyRef.current = false;
        return;
      }

      setGlitching(true);
      play("glitch");
      try {
        await wait(STATIC_IN_MS, signal);
        setIndex(nextIndex);
        await wait(STATIC_OUT_MS, signal);
        play("beep");
      } finally {
        if (!signal.aborted) {
          setGlitching(false);
        }
        busyRef.current = false;
      }
    },
    [play, reducedMotion],
  );

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (slides.length < 2) {
      return () => controller.abort();
    }

    const loop = async () => {
      try {
        while (!controller.signal.aborted) {
          await wait(HOLD_MS, controller.signal);

          while (busyRef.current && !controller.signal.aborted) {
            await wait(80, controller.signal);
          }

          if (controller.signal.aborted) {
            break;
          }

          const next = (indexRef.current + 1) % slides.length;
          await runStaticSwap(next, controller.signal);
        }
      } catch {
        /* abort esperado ao desmontar / trocar idioma */
      }
    };

    void loop();
    return () => controller.abort();
  }, [runStaticSwap, slides.length, t.about.terminal]);

  useEffect(() => {
    setIndex(0);
    setGlitching(false);
    busyRef.current = false;
  }, [t.about.terminal]);

  const slide = slides[index] ?? slides[0];
  const channel = String(index + 1).padStart(2, "0");

  if (!slide) {
    return null;
  }

  return (
    <div
      className={`terminal-outdoor${glitching ? " is-glitching" : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={t.about.outdoorLabel}
      aria-live="polite"
    >
      <div className="terminal-outdoor__bezel" aria-hidden>
        <span className="terminal-outdoor__led" />
        <span className="terminal-outdoor__brand">OUTDOOR // CRT</span>
        <span className="terminal-outdoor__ch">CH-{channel}</span>
      </div>

      <div className="terminal-outdoor__screen">
        <div className="terminal-outdoor__scanlines" aria-hidden />
        <div className="terminal-outdoor__vignette" aria-hidden />
        <div className="terminal-outdoor__static" aria-hidden />

        <div
          key={`${slide.command}-${index}`}
          className={`terminal-outdoor__slide${glitching ? " is-hidden" : ""}`}
        >
          <p className="terminal-command">
            <span className="terminal-prompt">{">"}</span> {slide.command}
          </p>
          <p className="terminal-output terminal-outdoor__output">
            {slide.output}
          </p>
          <span className="terminal-cursor terminal-cursor--idle" aria-hidden>
            _
          </span>
        </div>
      </div>

      <div className="terminal-outdoor__footer" aria-hidden>
        <div className="terminal-outdoor__dots">
          {slides.map((item, dotIndex) => (
            <span
              key={`${item.command}-${dotIndex}`}
              className={`terminal-outdoor__dot${
                dotIndex === index ? " is-active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
