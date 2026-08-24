"use client";

import { AboutTerminal } from "@/components/AboutTerminal";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageProvider";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="section-shell border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <RevealOnScroll>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {t.about.heading}
          </h2>
        </RevealOnScroll>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <RevealOnScroll delay={80}>
            <div className="space-y-5 text-base leading-relaxed text-ink-muted md:text-lg">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={140}>
            <AboutTerminal />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
