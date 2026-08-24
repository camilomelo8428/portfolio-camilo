"use client";

import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useLanguage } from "@/i18n/LanguageProvider";
import { buildWhatsAppHref } from "@/lib/whatsapp";

/** Botão flutuante de WhatsApp visível em todas as páginas. */
export function WhatsAppFloating() {
  const { t } = useLanguage();
  const href = buildWhatsAppHref(t.profile.phoneHref, t.contact.whatsappMessage);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label={t.contact.whatsappAriaLabel}
      title={t.contact.whatsappCta}
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="whatsapp-float__label">{t.contact.whatsapp}</span>
    </a>
  );
}
