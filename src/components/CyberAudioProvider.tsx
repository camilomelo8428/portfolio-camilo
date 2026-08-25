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

  // Qualquer gesto libera o AudioContext de forma sincrona.
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
    document.addEventListener("keydown", onPageGesture, opts);

    return () => {
      document.removeEventListener("touchstart", onPageGesture, opts);
      document.removeEventListener("pointerdown", onPageGesture, opts);
      document.removeEventListener("keydown", onPageGesture, opts);
    };
  }, [syncFromEngine]);

  const play = useCallback(
    (sfx: CyberSfx) => {
      cyberAudio.play(sfx, !reducedMotion);
    },
    [reducedMotion],
  );

  // pointerover (bubbles) — pointerenter no document quase nao dispara.
  useEffect(() => {
    if (reducedMotion) {
      hoverTargetRef.current = null;
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (isAudioFabTarget(event.target)) {
        return;
      }
      // Unlock sync no mesmo tick do clique, depois SFX.
      cyberAudio.unlockFromGesture();
      if (findInteractiveTarget(event.target)) {
        cyberAudio.play("click", true);
      }
    };

    const onPointerOver = (event: PointerEvent) => {
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

    const onPointerOut = (event: PointerEvent) => {
      const interactive = findInteractiveTarget(event.target);
      if (!interactive || interactive !== hoverTargetRef.current) {
        return;
      }
      // So limpa se realmente saiu do elemento (nao entrou em filho).
      const related = event.relatedTarget;
      if (
        related instanceof Node &&
        interactive.contains(related)
      ) {
        return;
      }
      hoverTargetRef.current = null;
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("pointerout", onPointerOut, true);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("pointerout", onPointerOut, true);
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
