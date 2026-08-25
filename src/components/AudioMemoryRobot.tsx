"use client";

import { useEffect, useRef } from "react";
import { useCyberAudio } from "@/components/CyberAudioProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import { THEME_AUDIO_SRC, cyberAudio } from "@/lib/cyber-audio";

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
 * Botao flutuante discreto para ligar/desligar audio.
 */
export function AudioMemoryRobot() {
  const { t } = useLanguage();
  const { enabled, themeReady, syncFromEngine } = useCyberAudio();
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleLabel = !themeReady
    ? t.audioRobot.enableSound
    : enabled
      ? t.audioRobot.muteSound
      : t.audioRobot.enableSound;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    cyberAudio.bindThemeElement(audio);
    syncFromEngine();
  }, [syncFromEngine]);

  // Eventos nativos — touchstart no mobile; click no desktop.
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) {
      return;
    }

    let touchHandled = false;

    const onFabGesture = (event: Event) => {
      event.stopPropagation();
      cyberAudio.handleFabGesture();
      syncFromEngine();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchHandled = true;
      window.setTimeout(() => {
        touchHandled = false;
      }, 450);
      event.stopPropagation();
      cyberAudio.handleFabGesture();
      syncFromEngine();
    };

    const onClick = (event: MouseEvent) => {
      if (touchHandled) {
        event.preventDefault();
        return;
      }
      onFabGesture(event);
    };

    button.addEventListener("touchstart", onTouchStart, { passive: true });
    button.addEventListener("click", onClick);

    return () => {
      button.removeEventListener("touchstart", onTouchStart);
      button.removeEventListener("click", onClick);
    };
  }, [syncFromEngine]);

  return (
    <aside
      className={`audio-robot${enabled ? " is-live" : " is-muted"}${themeReady ? " is-playing" : " is-pending"}`}
      aria-label={t.audioRobot.label}
    >
      <audio
        ref={audioRef}
        className="audio-robot__track"
        src={THEME_AUDIO_SRC}
        loop
        preload="auto"
        muted
        playsInline
      />

      <button
        ref={buttonRef}
        type="button"
        className="audio-robot__fab"
        aria-pressed={themeReady}
        aria-label={toggleLabel}
        title={toggleLabel}
      >
        <span className="audio-robot__fab-led" aria-hidden />
        {themeReady ? <IconSoundOn /> : <IconSoundOff />}
      </button>
    </aside>
  );
}
