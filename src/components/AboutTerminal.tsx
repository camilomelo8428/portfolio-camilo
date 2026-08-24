"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Terminal estilo dev com digitacao progressiva.
 */
export function AboutTerminal() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(
    reducedMotion ? t.about.terminal.length : 0,
  );

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleLines(index);
      if (index >= t.about.terminal.length) {
        window.clearInterval(timer);
      }
    }, 420);

    return () => window.clearInterval(timer);
  }, [reducedMotion, t.about.terminal.length]);

  return (
    <div className="terminal-panel" aria-label="Terminal">
      {t.about.terminal.slice(0, visibleLines).map((line) => (
        <div key={line.command} className="terminal-line">
          <p className="terminal-command">
            <span className="terminal-prompt">{">"}</span> {line.command}
          </p>
          <p className="terminal-output">{line.output}</p>
        </div>
      ))}
      {!reducedMotion && visibleLines < t.about.terminal.length ? (
        <span className="terminal-cursor" aria-hidden>
          _
        </span>
      ) : (
        <span className="terminal-cursor terminal-cursor--idle" aria-hidden>
          _
        </span>
      )}
    </div>
  );
}
