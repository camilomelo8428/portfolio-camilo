"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const PARTICLE_COUNT = 52;
const CONNECT_DISTANCE = 128;
const MOUSE_RADIUS = 170;

/**
 * Rede de particulas interativa no hero (canvas leve, sem dependencias).
 */
export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let frame = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let isVisible = true;
    const particles: Particle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }

      width = parent.clientWidth;
      height = parent.clientHeight;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const seedParticles = () => {
      particles.length = 0;
      for (let index = 0; index < PARTICLE_COUNT; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38,
          size: Math.random() * 1.4 + 0.7,
        });
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    const draw = () => {
      if (isVisible) {
        context.clearRect(0, 0, width, height);

        for (const particle of particles) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x <= 0 || particle.x >= width) {
            particle.vx *= -1;
          }
          if (particle.y <= 0 || particle.y >= height) {
            particle.vy *= -1;
          }

          const deltaX = mouseX - particle.x;
          const deltaY = mouseY - particle.y;
          const distance = Math.hypot(deltaX, deltaY);
          if (distance > 0 && distance < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
            particle.x -= (deltaX / distance) * force * 1.4;
            particle.y -= (deltaY / distance) * force * 1.4;
          }
        }

        for (let left = 0; left < particles.length; left += 1) {
          for (let right = left + 1; right < particles.length; right += 1) {
            const first = particles[left];
            const second = particles[right];
            const distance = Math.hypot(
              first.x - second.x,
              first.y - second.y,
            );
            if (distance < CONNECT_DISTANCE) {
              const alpha = (1 - distance / CONNECT_DISTANCE) * 0.24;
              context.strokeStyle = `rgba(78, 179, 207, ${alpha})`;
              context.lineWidth = 1;
              context.beginPath();
              context.moveTo(first.x, first.y);
              context.lineTo(second.x, second.y);
              context.stroke();
            }
          }
        }

        for (const particle of particles) {
          context.fillStyle = "rgba(78, 179, 207, 0.62)";
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.fill();
        }
      }

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    seedParticles();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return <canvas ref={canvasRef} className="hero-particle-canvas" aria-hidden />;
}
