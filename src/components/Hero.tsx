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
      className="hero-section hero-section--centered relative overflow-hidden border-b border-line"
    >
      <Atmosphere />
      <div className="page-container relative">
        <h1 className="anim-rise hero-title">
          {highlightFullStack(t.hero.roleLine1)}
          <span className="mt-1 block hero-title__line2">{t.hero.roleLine2}</span>
        </h1>

        <p className="anim-rise-delay section-lead mx-auto">
          {t.hero.tagline}
        </p>

        <div className="anim-rise-delay-2 hero-actions">
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
