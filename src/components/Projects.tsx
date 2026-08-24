"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Projects() {
  const { t } = useLanguage();

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

        <div className="mt-12 grid gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {t.projects.items.map((project, index) => (
            <RevealOnScroll key={project.name} delay={index * 60}>
              <article className="project-card flex h-full flex-col">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-tight text-ink md:text-2xl">
                    {project.name}
                  </h3>
                  <span className="shrink-0 rounded-full border border-steel/30 bg-steel/10 px-2.5 py-0.5 text-xs font-medium text-steel">
                    {project.production}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-ink-muted md:text-base">
                  {project.summary}
                </p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-ink">
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
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-steel underline-offset-4 hover:underline"
                    >
                      {t.projects.codeLinkLabel} ↗
                    </a>
                  ) : null}
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
