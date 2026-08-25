"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cyberAudio, type CyberSfx } from "@/lib/cyber-audio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CyberAudioContextValue = {
  muted: boolean;
  enabled: boolean;
  toggleMuted: () => void;
  play: (sfx: CyberSfx) => void;
  unlock: () => Promise<void>;
};

const CyberAudioContext = createContext<CyberAudioContextValue | null>(null);

/**
 * Provider de audio cyberpunk com mute e SFX globais.
 */
export function CyberAudioProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setMuted(cyberAudio.isMuted());
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      cyberAudio.setMuted(true);
      setMuted(true);
    }
  }, [reducedMotion]);

  const play = useCallback(
    (sfx: CyberSfx) => {
      if (reducedMotion) {
        return;
      }
      cyberAudio.play(sfx);
    },
    [reducedMotion],
  );

  const unlock = useCallback(async () => {
    await cyberAudio.unlock();
  }, []);

  const toggleMuted = useCallback(() => {
    if (reducedMotion) {
      return;
    }
    void unlock().then(() => {
      const next = cyberAudio.toggleMuted();
      setMuted(next);
      if (!next) {
        cyberAudio.play("boot");
      }
    });
  }, [reducedMotion, unlock]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }
      if (
        target.closest(
          ".btn-outline, .btn-whatsapp, .whatsapp-float, .nav-link, .audio-robot__toggle",
        )
      ) {
        play("click");
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }
      if (target.closest(".btn-outline, .btn-whatsapp, .whatsapp-float")) {
        play("hover");
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerover", onPointerOver);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerover", onPointerOver);
    };
  }, [play]);

  const value = useMemo(
    () => ({
      muted,
      enabled: !reducedMotion,
      toggleMuted,
      play,
      unlock,
    }),
    [muted, play, reducedMotion, toggleMuted, unlock],
  );

  return (
    <CyberAudioContext.Provider value={value}>
      {children}
    </CyberAudioContext.Provider>
  );
}

/**
 * Hook do contexto de audio.
 *
 * Returns:
 *   Controles de mute e playback.
 */
export function useCyberAudio(): CyberAudioContextValue {
  const context = useContext(CyberAudioContext);
  if (!context) {
    throw new Error("useCyberAudio deve ser usado dentro de CyberAudioProvider");
  }
  return context;
}
