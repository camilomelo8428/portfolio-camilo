"use client";

import { AboutTerminal } from "@/components/AboutTerminal";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageProvider";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="section-shell border-b border-line bg-surface">
      <div className="page-container">
        <RevealOnScroll>
          <h2 className="section-heading">{t.about.heading}</h2>
        </RevealOnScroll>

        <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <RevealOnScroll delay={80}>
            <div className="min-w-0 space-y-5 text-base leading-relaxed text-ink-muted md:text-lg">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={140}>
            <div className="min-w-0">
              <AboutTerminal />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
