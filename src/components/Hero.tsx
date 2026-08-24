"use client";

import { Atmosphere } from "@/components/Atmosphere";
import { HeroAvatar } from "@/components/HeroAvatar";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useLanguage } from "@/i18n/LanguageProvider";
import { buildWhatsAppHref } from "@/lib/whatsapp";

function highlightFullStack(text: string) {
  const parts = text.split(/(Full Stack)/i);

  return parts.map((part, index) =>
    part.toLowerCase() === "full stack" ? (
      <span key={index} className="text-steel">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function Hero() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppHref(
    t.profile.phoneHref,
    t.contact.whatsappMessage,
  );

  return (
    <section
      id="topo"
      className="hero-section hero-section--centered relative min-h-[88vh] overflow-hidden border-b border-line"
    >
      <Atmosphere />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 pb-20 pt-16 text-center md:px-8 md:pb-24 md:pt-20">
        <h1 className="anim-rise font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight text-ink md:text-6xl">
          {highlightFullStack(t.hero.roleLine1)}
          <span className="mt-1 block">{t.hero.roleLine2}</span>
        </h1>

        <p className="anim-rise-delay mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
          {t.hero.tagline}
        </p>

        <div className="anim-rise-delay-2 mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#projetos" className="btn-outline">
            {t.hero.ctaProjects}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t.hero.ctaWhatsapp}
          </a>
          <a href="#contato" className="btn-outline">
            {t.hero.ctaContact}
          </a>
        </div>

        <div className="anim-rise-delay-2 hero-avatar-shell mt-12 w-full max-w-xs md:max-w-sm">
          <figure className="hero-avatar-stage relative">
            <HeroAvatar />
          </figure>
        </div>
      </div>
    </section>
  );
}
