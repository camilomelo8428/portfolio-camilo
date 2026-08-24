"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Contact() {
  const { t } = useLanguage();
  const mailto = `mailto:${t.profile.email}?subject=${encodeURIComponent(t.contact.mailSubject)}`;

  return (
    <section id="contato" className="section-shell border-t border-line bg-bg-deep">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <RevealOnScroll>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {t.contact.heading}
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">{t.contact.lead}</p>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <div className="mt-10">
            <a href={mailto} className="btn-outline">
              {t.contact.emailCta}
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={120}>
          <ul className="contact-links mt-12 space-y-3 text-sm md:text-base">
            <li>
              <a href={mailto} className="contact-link">
                ✉️ {t.profile.email}
              </a>
            </li>
            <li>
              <a
                href={t.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                🔗 {t.profile.linkedinLabel}
              </a>
            </li>
            <li>
              <a
                href={t.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                ⌨️ {t.profile.githubLabel}
              </a>
            </li>
          </ul>
        </RevealOnScroll>

        <p className="mt-16 border-t border-line pt-6 text-xs text-ink-muted">
          © {new Date().getFullYear()} {t.profile.name}. Belém - PA.
        </p>
      </div>
    </section>
  );
}
