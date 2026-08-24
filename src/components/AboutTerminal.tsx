"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HOLD_MS = 3400;
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
 * Outdoor estilo CRT: cicla informacoes com burst de TV fora de sintonia.
 */
export function AboutTerminal() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const slides = t.about.terminal;
  const [index, setIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const [paused, setPaused] = useState(false);
  const busyRef = useRef(false);
  const indexRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const runStaticSwap = useCallback(
    async (nextIndex: number, signal: AbortSignal) => {
      if (reducedMotion) {
        setIndex(nextIndex);
        return;
      }

      busyRef.current = true;
      setGlitching(true);
      try {
        await wait(STATIC_IN_MS, signal);
        setIndex(nextIndex);
        await wait(STATIC_OUT_MS, signal);
      } finally {
        if (!signal.aborted) {
          setGlitching(false);
        }
        busyRef.current = false;
      }
    },
    [reducedMotion],
  );

  const goTo = useCallback(
    async (nextIndex: number) => {
      if (busyRef.current || slides.length < 2 || nextIndex === indexRef.current) {
        return;
      }
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        await runStaticSwap(nextIndex, controller.signal);
      } catch {
        busyRef.current = false;
        setGlitching(false);
      }
    },
    [runStaticSwap, slides.length],
  );

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (reducedMotion || paused || slides.length < 2) {
      return () => controller.abort();
    }

    const loop = async () => {
      try {
        while (!controller.signal.aborted) {
          await wait(HOLD_MS, controller.signal);
          if (busyRef.current) {
            continue;
          }
          const next = (indexRef.current + 1) % slides.length;
          await runStaticSwap(next, controller.signal);
        }
      } catch {
        /* abort esperado ao pausar / desmontar */
      }
    };

    void loop();
    return () => controller.abort();
  }, [paused, reducedMotion, runStaticSwap, slides.length, t.about.terminal]);

  useEffect(() => {
    setIndex(0);
    setGlitching(false);
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
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onPointerDown={() => {
        void goTo((indexRef.current + 1) % slides.length);
      }}
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

      <div className="terminal-outdoor__footer">
        <div
          className="terminal-outdoor__dots"
          role="tablist"
          aria-label={t.about.outdoorLabel}
        >
          {slides.map((item, dotIndex) => (
            <button
              key={`${item.command}-${dotIndex}`}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`${dotIndex + 1}/${slides.length}`}
              className={`terminal-outdoor__dot${
                dotIndex === index ? " is-active" : ""
              }`}
              onClick={(event) => {
                event.stopPropagation();
                void goTo(dotIndex);
              }}
            />
          ))}
        </div>
        <p className="terminal-outdoor__hint">{t.about.outdoorHint}</p>
      </div>
    </div>
  );
}
