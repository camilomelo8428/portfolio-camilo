"use client";

import { useEffect, useMemo, useState } from "react";
import { useCyberAudio } from "@/components/CyberAudioProvider";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Robo Audio Memory: companheiro HUD com memoria sonora e mute.
 */
export function AudioMemoryRobot() {
  const { t } = useLanguage();
  const { muted, enabled, toggleMuted, play } = useCyberAudio();
  const [lineIndex, setLineIndex] = useState(0);
  const [memCount, setMemCount] = useState(1);
  const lines = t.audioRobot.lines;

  const status = useMemo(() => {
    if (!enabled) {
      return t.audioRobot.statusOffline;
    }
    return muted ? t.audioRobot.statusStandby : t.audioRobot.statusOnline;
  }, [enabled, muted, t.audioRobot]);

  useEffect(() => {
    if (muted || !enabled || lines.length < 2) {
      return;
    }

    const id = window.setInterval(() => {
      setLineIndex((current) => (current + 1) % lines.length);
      setMemCount((current) => Math.min(current + 1, 8));
      play("memory");
    }, 5200);

    return () => window.clearInterval(id);
  }, [enabled, lines.length, muted, play]);

  return (
    <aside
      className={`audio-robot${muted ? " is-muted" : " is-live"}`}
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
        onClick={toggleMuted}
        disabled={!enabled}
        aria-pressed={!muted}
      >
        {muted ? t.audioRobot.enableSound : t.audioRobot.muteSound}
      </button>
    </aside>
  );
}
