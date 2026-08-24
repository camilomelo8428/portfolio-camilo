"use client";

import { LanguageProvider } from "@/i18n/LanguageProvider";
import type { ReactNode } from "react";

/**
 * Providers client-side do app (i18n).
 */
export function Providers({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
