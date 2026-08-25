"use client";

import { useEffect, useMemo, useState } from "react";
import { useCyberAudio } from "@/components/CyberAudioProvider";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Icone de som ligado (alto-falante).
 */
function IconSoundOn() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path
        fill="currentColor"
        d="M3 10v4h3.2L11 18V6L6.2 10H3zm11.5 2a3.5 3.5 0 0 0-1.5-2.9v5.8A3.5 3.5 0 0 0 14.5 12zm-1.5-7v1.6a6 6 0 0 1 0 10.8V19a7.5 7.5 0 0 0 0-14z"
      />
    </svg>
  );
}

/**
 * Icone de som mudo.
 */
function IconSoundOff() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path
        fill="currentColor"
        d="M3 10v4h3.2L11 18V6L6.2 10H3zm14.6-3.4-1.1 1.1A6 6 0 0 1 19 12a6 6 0 0 1-1.4 3.9l1.1 1.1A7.5 7.5 0 0 0 20.5 12a7.5 7.5 0 0 0-2.9-5.4zM16 12a3.5 3.5 0 0 0-1.5-2.9v2.1l2.3 2.3c.1-.5.2-1 .2-1.5zM4.3 3.2 3.2 4.3 9.9 11H6.2L3 14h3.2L11 18v-4.9l6.7 6.7 1.1-1.1L4.3 3.2z"
      />
    </svg>
  );
}

/**
 * Robo Audio Memory: painel no desktop, botao discreto no mobile.
 */
export function AudioMemoryRobot() {
  const { t } = useLanguage();
  const { enabled, canUseAudio, enableSound, disableSound } = useCyberAudio();
  const [lineIndex, setLineIndex] = useState(0);
  const [memCount, setMemCount] = useState(1);
  const lines = t.audioRobot.lines;

  const status = useMemo(() => {
    if (!canUseAudio) {
      return t.audioRobot.statusOffline;
    }
    return enabled ? t.audioRobot.statusOnline : t.audioRobot.statusStandby;
  }, [canUseAudio, enabled, t.audioRobot]);

  const toggleLabel = enabled
    ? t.audioRobot.muteSound
    : t.audioRobot.enableSound;

  useEffect(() => {
    if (lines.length < 2) {
      return;
    }

    const id = window.setInterval(() => {
      setLineIndex((current) => (current + 1) % lines.length);
      if (enabled) {
        setMemCount((current) => Math.min(current + 1, 8));
      }
    }, 5200);

    return () => window.clearInterval(id);
  }, [enabled, lines.length]);

  const handleToggle = () => {
    if (!canUseAudio) {
      return;
    }
    if (enabled) {
      disableSound();
      return;
    }
    void enableSound();
  };

  return (
    <aside
      className={`audio-robot${enabled ? " is-live" : " is-muted"}`}
      aria-label={t.audioRobot.label}
    >
      <div className="audio-robot__panel">
        <div className="audio-robot__head">
          <span className="audio-robot__led" aria-hidden />
          <span className="audio-robot__title">{t.audioRobot.title}</span>
        </div>

        <div className="audio-robot__face" aria-hidden>
          <span className="audio-robot__eye" />
          <span className="audio-robot__eye" />
          <span className="audio-robot__mouth" />
        </div>

        <p className="audio-robot__status">{status}</p>
        <p className="audio-robot__memory">
          {t.audioRobot.memoryLabel}: {memCount}/8
        </p>
        <p className="audio-robot__line" aria-live="polite">
          {lines[lineIndex]}
        </p>

        <button
          type="button"
          className="audio-robot__toggle"
          onClick={handleToggle}
          disabled={!canUseAudio}
          aria-pressed={enabled}
        >
          {toggleLabel}
        </button>
      </div>

      <button
        type="button"
        className="audio-robot__fab"
        onClick={handleToggle}
        disabled={!canUseAudio}
        aria-pressed={enabled}
        aria-label={toggleLabel}
        title={toggleLabel}
      >
        <span className="audio-robot__fab-led" aria-hidden />
        {enabled ? <IconSoundOn /> : <IconSoundOff />}
      </button>
    </aside>
  );
}
