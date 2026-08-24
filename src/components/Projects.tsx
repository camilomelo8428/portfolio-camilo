"use client";

import { useState } from "react";
import { ProjectGallery } from "@/components/ProjectGallery";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { getProjectImages } from "@/content/project-images";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Projects() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggleProject = (index: number) => {
    setExpanded((previous) => {
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
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            {t.projects.lead}
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.projects.items.map((project, index) => {
            const isOpen = expanded.has(index);
            const images = getProjectImages(project.name);

            return (
              <RevealOnScroll key={project.name} delay={index * 50}>
                <article
                  className={`project-card ${isOpen ? "project-card--open" : "project-card--compact"}`}
                >
                  {images.length > 0 ? (
                    <ProjectGallery
                      images={images}
                      alt={`${project.name} — ${t.projects.imageAltSuffix}`}
                    />
                  ) : null}

                  <button
                    type="button"
                    className="project-card__trigger"
                    aria-expanded={isOpen}
                    onClick={() => toggleProject(index)}
                  >
                    <div className="project-card__header">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-ink md:text-xl">
                        {project.name}
                      </h3>
                      <span className="project-card__badge">{project.production}</span>
                    </div>

                    {!isOpen ? (
                      <div className="project-card__collapsed">
                        <p className="project-card__stack-line">{project.stack}</p>
                        <p className="project-card__hint">{t.projects.revealHint}</p>
                      </div>
                    ) : (
                      <div className="project-card__expanded text-left">
                        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                          {project.summary}
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-ink">
                          {project.highlights.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-steel" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 border-t border-line/80 pt-4">
                          <p className="text-xs uppercase tracking-wide text-ink-muted">
                            {t.projects.stackLabel}
                          </p>
                          <p className="mt-1 text-sm text-ink">{project.stack}</p>
                          {project.href ? (
                            <a
                              href={project.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-steel underline-offset-4 hover:underline"
                              onClick={(event) => event.stopPropagation()}
                            >
                              {t.projects.codeLinkLabel} ↗
                            </a>
                          ) : null}
                        </div>
                        <p className="mt-4 text-xs text-ink-muted">{t.projects.closeHint}</p>
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
