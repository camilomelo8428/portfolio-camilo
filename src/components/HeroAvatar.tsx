"use client";

import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Cache-bust apos cutout transparente. */
const ASSET_VERSION = "8";

/**
 * Avatar ilustrado estatico (estilo limpo, sem distorcao).
 */
export function HeroAvatar() {
  const { locale, t } = useLanguage();
  const src = `${assetUrl("/hero-3d.png")}?v=${ASSET_VERSION}`;
  const label =
    locale === "en"
      ? `Avatar of ${t.profile.name} coding`
      : `Avatar de ${t.profile.name} programando`;

  return (
    <div className="hero-avatar-stage-inner">
      <div className="hero-avatar-shadow" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        width={958}
        height={1146}
        className="hero-avatar-3d relative z-10 w-full object-contain object-[center_92%]"
      />
    </div>
  );
}
