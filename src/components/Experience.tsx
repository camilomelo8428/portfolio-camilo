"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageProvider";
export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experiencia" className="section-shell border-b border-line bg-surface">
      <div className="page-container">
        <RevealOnScroll>
          <h2 className="section-heading">{t.experience.heading}</h2>
        </RevealOnScroll>
        <ol className="mt-12 space-y-0">
          {t.experience.items.map((job, index) => (
            <RevealOnScroll
              as="li"
              key={`${job.company}-${job.period}`}
              delay={index * 70}
              className="experience-item grid gap-2 py-8 md:grid-cols-[1fr_auto] md:gap-8"
            >
              <div>
                <h3 className="experience-item__company">{job.company}</h3>
                <p className="experience-item__role">{job.role}</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-muted md:text-base">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <p className="experience-item__period md:text-right">
                {job.period}
              </p>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </section>
  );
}
