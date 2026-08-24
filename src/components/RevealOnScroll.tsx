"use client";

import {
  createElement,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type RevealTag = keyof HTMLElementTagNameMap;

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
} & HTMLAttributes<HTMLElement>;

/**
 * Revela conteudo ao entrar na viewport (IntersectionObserver).
 */
export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  as = "div",
  ...rest
}: RevealOnScrollProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      root.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          root.classList.add("reveal-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ...rest,
      ref: rootRef,
      className: `reveal-on-scroll ${className}`.trim(),
      style: { transitionDelay: `${delay}ms`, ...rest.style },
    },
    children,
  );
}
