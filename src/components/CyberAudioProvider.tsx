"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  cyberAudio,
  findInteractiveTarget,
  isAudioFabTarget,
  type CyberSfx,
} from "@/lib/cyber-audio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CyberAudioContextValue = {
  enabled: boolean;
  themeReady: boolean;
  canUseAudio: boolean;
  unlockAndPlay: () => void;
  disableSound: () => void;
  toggleSound: () => void;
  play: (sfx: CyberSfx) => void;
};

const CyberAudioContext = createContext<CyberAudioContextValue | null>(null);

/**
 * Provider de audio cyberpunk com mute e SFX globais.
 */
export function CyberAudioProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const canUseAudio = !reducedMotion;
  const [enabled, setEnabled] = useState(true);
  const [themeReady, setThemeReady] = useState(false);
  const hoverTargetRef = useRef<Element | null>(null);

  const markThemeReady = useCallback(() => {
    setThemeReady(true);
  }, []);

  const unlockAndPlay = useCallback(() => {
    if (!canUseAudio) {
      return;
    }

    cyberAudio.setEnabled(true);
    setEnabled(true);
    cyberAudio.playThemeFromGesture();
    markThemeReady();
    cyberAudio.play("boot");
  }, [canUseAudio, markThemeReady]);

  useEffect(() => {
    if (!canUseAudio) {
      cyberAudio.setEnabled(false);
      setEnabled(false);
      setThemeReady(false);
      return;
    }

    cyberAudio.preloadTheme();
    const next = cyberAudio.isEnabled();
    setEnabled(next);
    setThemeReady(cyberAudio.isThemePlaying());
  }, [canUseAudio]);

  // Primeiro gesto na pagina inicia o tema (exceto no FAB, que tem handler proprio).
  useEffect(() => {
    if (!canUseAudio || !enabled || themeReady) {
      return;
    }

    const resumeTheme = (event: Event) => {
      if (isAudioFabTarget(event.target)) {
        return;
      }
      unlockAndPlay();
    };

    const options: AddEventListenerOptions = {
      once: true,
      passive: true,
      capture: true,
    };

    document.addEventListener("pointerdown", resumeTheme, options);
    document.addEventListener("touchstart", resumeTheme, options);

    return () => {
      document.removeEventListener("pointerdown", resumeTheme, options);
      document.removeEventListener("touchstart", resumeTheme, options);
    };
  }, [canUseAudio, enabled, themeReady, unlockAndPlay]);

  const play = useCallback(
    (sfx: CyberSfx) => {
      if (!canUseAudio || !cyberAudio.isEnabled()) {
        return;
      }
      cyberAudio.play(sfx);
    },
    [canUseAudio],
  );

  const disableSound = useCallback(() => {
    cyberAudio.setEnabled(false);
    setEnabled(false);
    setThemeReady(false);
  }, []);

  const toggleSound = useCallback(() => {
    if (!canUseAudio) {
      return;
    }

    if (!themeReady) {
      unlockAndPlay();
      return;
    }

    if (enabled) {
      disableSound();
      return;
    }

    unlockAndPlay();
  }, [canUseAudio, disableSound, enabled, themeReady, unlockAndPlay]);

  useEffect(() => {
    if (!canUseAudio || !enabled || !themeReady) {
      hoverTargetRef.current = null;
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (findInteractiveTarget(event.target)) {
        cyberAudio.play("click");
      }
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }
      const interactive = findInteractiveTarget(event.target);
      if (!interactive || interactive === hoverTargetRef.current) {
        return;
      }
      hoverTargetRef.current = interactive;
      cyberAudio.play("hover");
    };

    const onPointerLeave = (event: PointerEvent) => {
      const interactive = findInteractiveTarget(event.target);
      if (interactive && interactive === hoverTargetRef.current) {
        hoverTargetRef.current = null;
      }
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("pointerenter", onPointerEnter, true);
    document.addEventListener("pointerleave", onPointerLeave, true);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("pointerenter", onPointerEnter, true);
      document.removeEventListener("pointerleave", onPointerLeave, true);
      hoverTargetRef.current = null;
    };
  }, [canUseAudio, enabled, themeReady]);

  const value = useMemo(
    () => ({
      enabled,
      themeReady,
      canUseAudio,
      unlockAndPlay,
      disableSound,
      toggleSound,
      play,
    }),
    [
      canUseAudio,
      disableSound,
      enabled,
      play,
      themeReady,
      toggleSound,
      unlockAndPlay,
    ],
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
 *   Controles de som e playback.
 */
export function useCyberAudio(): CyberAudioContextValue {
  const context = useContext(CyberAudioContext);
  if (!context) {
    throw new Error("useCyberAudio deve ser usado dentro de CyberAudioProvider");
  }
  return context;
}
