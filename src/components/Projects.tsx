"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Projects() {
  const { t } = useLanguage();
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const toggleProject = (index: number) => {
    setRevealed((previous) => {
      const next = new Set(previous);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section id="projetos" className="section-shell border-b border-line bg-bg-deep/40">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <RevealOnScroll>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {t.projects.heading}
          </h2>
        </RevealOnScroll>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-2">
          {t.projects.items.map((project, index) => {
            const isOpen = revealed.has(index);

            return (
              <RevealOnScroll key={project.name} delay={index * 70}>
                <article className="project-hidden-card">
                  <button
                    type="button"
                    className="project-hidden-card__trigger"
                    aria-expanded={isOpen}
                    onClick={() => toggleProject(index)}
                  >
                    {isOpen ? (
                      <div className="project-hidden-card__content text-left">
                        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink md:text-2xl">
                          {project.name}
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
                          {project.summary}
                        </p>
                        <ul className="mt-5 space-y-2 text-sm text-ink">
                          {project.highlights.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-steel" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 border-t border-line/80 pt-4">
                          <p className="text-xs uppercase tracking-wide text-ink-muted">
                            {t.projects.stackLabel}
                          </p>
                          <p className="mt-1 text-sm text-ink">{project.stack}</p>
                          <p className="mt-2 text-sm text-steel">
                            {t.projects.productionLabel}: {project.production}
                          </p>
                        </div>
                        <p className="mt-5 text-xs text-ink-muted">
                          {t.projects.closeHint}
                        </p>
                      </div>
                    ) : (
                      <div className="project-hidden-card__locked">
                        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink md:text-xl">
                          {t.projects.hiddenTitle}
                        </h3>
                        <p className="mt-2 text-sm text-steel">{t.projects.revealHint}</p>
                      </div>
                    )}
                  </button>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
