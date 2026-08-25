"use client";

import { useEffect, useMemo, useState } from "react";
import { useCyberAudio } from "@/components/CyberAudioProvider";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Robo Audio Memory: companheiro HUD com memoria visual e controle de som.
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
        {enabled ? t.audioRobot.muteSound : t.audioRobot.enableSound}
      </button>
    </aside>
  );
}
