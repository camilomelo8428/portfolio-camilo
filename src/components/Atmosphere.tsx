"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Fundo sutil do hero (estilo limpo, sem particulas pesadas).
 */
export function Atmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      return;
    }

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (event.clientX / innerWidth - 0.5) * 2;
      targetY = (event.clientY / innerHeight - 0.5) * 2;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      root.style.setProperty("--mx", currentX.toFixed(3));
      root.style.setProperty("--my", currentY.toFixed(3));
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-atmosphere hero-atmosphere--lite" aria-hidden>
      <div className="hero-atmosphere__veil" />
      <div className="hero-atmosphere__grid" />
      <div className="hero-atmosphere__orb hero-atmosphere__orb--steel" />
      <div className="hero-atmosphere__particles">
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index} style={{ "--i": index } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}
