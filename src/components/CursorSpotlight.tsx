"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Holofote suave que segue o cursor (desktop).
 */
export function CursorSpotlight() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const root = rootRef.current;
    if (!root) {
      return;
    }

    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      root.style.setProperty("--spot-x", `${currentX}px`);
      root.style.setProperty("--spot-y", `${currentY}px`);
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return <div ref={rootRef} className="cursor-spotlight" aria-hidden />;
}
