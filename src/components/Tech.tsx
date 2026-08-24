"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { TechMarquee } from "@/components/TechMarquee";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Tech() {
  const { t } = useLanguage();

  return (
    <section id="tecnologias" className="section-shell border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <RevealOnScroll>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {t.tech.heading}
          </h2>
          <p className="mt-3 max-w-xl text-ink-muted">{t.tech.lead}</p>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {t.tech.groups.map((group) => (
              <div key={group.title} className="tech-group-card">
                <h3 className="font-[family-name:var(--font-display)] text-base font-semibold uppercase tracking-wide text-ink">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="tech-chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={120}>
          <TechMarquee
            label={t.tech.currentlyLabel}
            items={t.tech.currentlyItems}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
