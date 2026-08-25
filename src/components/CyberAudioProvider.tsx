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
  type CyberSfx,
} from "@/lib/cyber-audio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CyberAudioContextValue = {
  enabled: boolean;
  canUseAudio: boolean;
  enableSound: () => Promise<void>;
  disableSound: () => void;
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
  const hoverTargetRef = useRef<Element | null>(null);
  const themeStartedRef = useRef(false);

  useEffect(() => {
    if (!canUseAudio) {
      cyberAudio.setEnabled(false);
      setEnabled(false);
      return;
    }
    const next = cyberAudio.isEnabled();
    setEnabled(next);
    if (!next) {
      themeStartedRef.current = false;
    }
  }, [canUseAudio]);

  // Som ativo por padrao: destrava tema no primeiro gesto do usuario.
  useEffect(() => {
    if (!canUseAudio || !enabled || themeStartedRef.current) {
      return;
    }

    const resumeTheme = () => {
      if (themeStartedRef.current) {
        return;
      }
      themeStartedRef.current = true;
      void cyberAudio.unlock().then(() => cyberAudio.startTheme());
    };

    const events: Array<keyof DocumentEventMap> = [
      "pointerdown",
      "keydown",
      "touchstart",
    ];

    events.forEach((eventName) => {
      document.addEventListener(eventName, resumeTheme, {
        once: true,
        passive: true,
      });
    });

    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(eventName, resumeTheme);
      });
    };
  }, [canUseAudio, enabled]);

  const play = useCallback(
    (sfx: CyberSfx) => {
      if (!canUseAudio || !cyberAudio.isEnabled()) {
        return;
      }
      void cyberAudio.play(sfx);
    },
    [canUseAudio],
  );

  const enableSound = useCallback(async () => {
    if (!canUseAudio) {
      return;
    }
    await cyberAudio.unlock();
    cyberAudio.setEnabled(true);
    setEnabled(true);
    themeStartedRef.current = true;
    await cyberAudio.startTheme();
    await cyberAudio.play("boot");
  }, [canUseAudio]);

  const disableSound = useCallback(() => {
    cyberAudio.setEnabled(false);
    setEnabled(false);
    themeStartedRef.current = false;
  }, []);

  useEffect(() => {
    if (!canUseAudio || !enabled) {
      hoverTargetRef.current = null;
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (findInteractiveTarget(event.target)) {
        void cyberAudio.play("click");
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
      void cyberAudio.play("hover");
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
  }, [canUseAudio, enabled]);

  const value = useMemo(
    () => ({
      enabled,
      canUseAudio,
      enableSound,
      disableSound,
      play,
    }),
    [canUseAudio, disableSound, enableSound, enabled, play],
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
