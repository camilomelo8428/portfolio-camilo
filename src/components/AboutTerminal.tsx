"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const MSG_GAP_MS = 1700;
const LOOP_PAUSE_MS = 4200;

/**
 * Extrai as mensagens da Lina.
 */
function getLinaMessages(
  terminal: { mode: "lina"; messages: string[] }[],
): string[] {
  return terminal[0]?.messages ?? [];
}

/**
 * Outdoor CRT dedicado ao chat da Lina (sem canais e sem som).
 */
export function AboutTerminal() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const messages = useMemo(
    () => getLinaMessages(t.about.terminal),
    [t.about.terminal],
  );
  const [visibleCount, setVisibleCount] = useState(
    reducedMotion ? messages.length : 0,
  );

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    if (reducedMotion) {
      setVisibleCount(messages.length);
      return;
    }

    let count = 0;
    let timer = 0;
    let cancelled = false;

    const schedule = (fn: () => void, ms: number) => {
      timer = window.setTimeout(fn, ms);
    };

    const revealNext = () => {
      if (cancelled) {
        return;
      }
      count += 1;
      setVisibleCount(count);
      if (count < messages.length) {
        schedule(revealNext, MSG_GAP_MS);
        return;
      }
      schedule(() => {
        if (cancelled) {
          return;
        }
        count = 0;
        setVisibleCount(0);
        schedule(revealNext, 480);
      }, LOOP_PAUSE_MS);
    };

    setVisibleCount(0);
    schedule(revealNext, 420);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [messages, reducedMotion]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div
      className="terminal-outdoor is-lina"
      role="region"
      aria-label={t.about.outdoorLabel}
      aria-live="polite"
    >
      <div className="terminal-outdoor__bezel" aria-hidden>
        <span className="terminal-outdoor__led" />
        <span className="terminal-outdoor__brand">OUTDOOR // LINA</span>
        <span className="terminal-outdoor__ch">CHAT</span>
      </div>

      <div className="terminal-outdoor__screen">
        <div className="terminal-outdoor__scanlines" aria-hidden />
        <div className="terminal-outdoor__vignette" aria-hidden />

        <div className="terminal-outdoor__slide">
          <div className="terminal-outdoor__chat">
            <p className="terminal-outdoor__lina-head">
              <span className="terminal-outdoor__lina-led" aria-hidden />
              LINA · IA LOCAL · online
            </p>
            <ul className="terminal-outdoor__lina-list">
              {messages.slice(0, visibleCount).map((text, index) => (
                <li
                  key={`${index}-${text.slice(0, 16)}`}
                  className="terminal-outdoor__lina-msg"
                >
                  <span className="terminal-outdoor__lina-tag">lina</span>
                  <span className="terminal-outdoor__lina-text">{text}</span>
                </li>
              ))}
            </ul>
            {visibleCount < messages.length ? (
              <span
                className="terminal-cursor terminal-cursor--idle"
                aria-hidden
              >
                _
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
