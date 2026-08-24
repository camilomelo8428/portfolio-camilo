"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/types";

const options: { id: Locale; label: string }[] = [
  { id: "pt", label: "PT" },
  { id: "en", label: "EN" },
];

/**
 * Alternador PT / EN no estilo portfólio de referência.
 */
export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className="flex items-center gap-1 font-[family-name:var(--font-display)] text-sm tracking-wide"
      role="group"
      aria-label="Language"
    >
      {options.map((option, index) => (
        <span key={option.id} className="flex items-center gap-1">
          {index > 0 ? (
            <span className="text-ink-muted/50" aria-hidden>
              /
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => setLocale(option.id)}
            aria-pressed={locale === option.id}
            className={
              locale === option.id
                ? "text-steel transition"
                : "text-ink-muted transition hover:text-ink"
            }
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
