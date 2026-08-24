"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { DeveloperScene } from "@/components/hero3d/DeveloperScene";
import { HeroAvatarFallback } from "@/components/hero3d/HeroAvatarFallback";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Verifica suporte basico a WebGL no navegador.
 */
function hasWebGLSupport(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

/**
 * Canvas WebGL com avatar 3D interativo.
 */
export function HeroAvatarCanvas() {
  const reducedMotion = useReducedMotion();
  const [webglFailed, setWebglFailed] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!hasWebGLSupport()) {
      setWebglFailed(true);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion || webglFailed) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current = {
        x: (event.clientX / innerWidth - 0.5) * 2,
        y: (event.clientY / innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion, webglFailed]);

  if (reducedMotion || webglFailed) {
    return <HeroAvatarFallback />;
  }

  return (
    <div className="hero-avatar-canvas">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.35, 3.2], fov: 42 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <DeveloperScene mouse={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
