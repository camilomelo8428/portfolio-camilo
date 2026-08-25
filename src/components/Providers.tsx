"use client";

import { AudioMemoryRobot } from "@/components/AudioMemoryRobot";
import { CyberAudioProvider } from "@/components/CyberAudioProvider";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import type { ReactNode } from "react";

/**
 * Providers client-side do app (i18n + audio).
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CyberAudioProvider>
        {children}
        <AudioMemoryRobot />
      </CyberAudioProvider>
    </LanguageProvider>
  );
}
