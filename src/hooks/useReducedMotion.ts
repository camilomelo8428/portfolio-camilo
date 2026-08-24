"use client";

import { useEffect, useState } from "react";

/**
 * Detecta preferencia do usuario por movimento reduzido.
 *
 * Returns:
 *   True se animacoes devem ser desativadas.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}
