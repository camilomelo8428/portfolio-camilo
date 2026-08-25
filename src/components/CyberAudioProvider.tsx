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
  play: (sfx: CyberSfx) => void;
  syncFromEngine: () => void;
};

const CyberAudioContext = createContext<CyberAudioContextValue | null>(null);

/**
 * Provider de audio cyberpunk.
 * SFX de hover/click ficam sempre ativos; o FAB so controla a musica.
 */
export function CyberAudioProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(true);
  const [themeReady, setThemeReady] = useState(false);
  const hoverTargetRef = useRef<Element | null>(null);

  const syncFromEngine = useCallback(() => {
    setEnabled(cyberAudio.isEnabled());
    setThemeReady(cyberAudio.isThemeAudible());
  }, []);

  useEffect(() => {
    syncFromEngine();

    const onChange = () => syncFromEngine();
    window.addEventListener("cyber-audio-changed", onChange);
    return () => window.removeEventListener("cyber-audio-changed", onChange);
  }, [syncFromEngine]);

  // Primeiro gesto libera AudioContext (SFX) e, se preferido, o tema.
  useEffect(() => {
    const onPageGesture = (event: Event) => {
      if (isAudioFabTarget(event.target)) {
        return;
      }
      cyberAudio.handlePageGesture();
      syncFromEngine();
    };

    const opts: AddEventListenerOptions = { capture: true, passive: true };

    document.addEventListener("touchstart", onPageGesture, opts);
    document.addEventListener("pointerdown", onPageGesture, opts);
    document.addEventListener("click", onPageGesture, opts);

    return () => {
      document.removeEventListener("touchstart", onPageGesture, opts);
      document.removeEventListener("pointerdown", onPageGesture, opts);
      document.removeEventListener("click", onPageGesture, opts);
    };
  }, [syncFromEngine]);

  const play = useCallback(
    (sfx: CyberSfx) => {
      cyberAudio.play(sfx, !reducedMotion);
    },
    [reducedMotion],
  );

  // Hover/click SEMPRE ativos (nao dependem do mute da musica).
  useEffect(() => {
    if (reducedMotion) {
      hoverTargetRef.current = null;
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (findInteractiveTarget(event.target)) {
        cyberAudio.play("click", true);
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
      cyberAudio.play("hover", true);
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
  }, [reducedMotion]);

  const value = useMemo(
    () => ({
      enabled,
      themeReady,
      play,
      syncFromEngine,
    }),
    [enabled, play, syncFromEngine, themeReady],
  );

  return (
    <CyberAudioContext.Provider value={value}>
      {children}
    </CyberAudioContext.Provider>
  );
}

/**
 * Hook do contexto de audio.
 */
export function useCyberAudio(): CyberAudioContextValue {
  const context = useContext(CyberAudioContext);
  if (!context) {
    throw new Error("useCyberAudio deve ser usado dentro de CyberAudioProvider");
  }
  return context;
}
