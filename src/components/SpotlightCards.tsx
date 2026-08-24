"use client";

import { useEffect } from "react";

/**
 * Atualiza o holofote interno dos cards `.spotlight-card` conforme o mouse.
 */
export function SpotlightCards() {
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const card = (event.target as HTMLElement | null)?.closest(".spotlight-card");
      if (!(card instanceof HTMLElement)) {
        return;
      }

      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, []);

  return null;
}
