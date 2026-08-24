"use client";

import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Cache-bust apos cutout transparente. */
const ASSET_VERSION = "8";

type HeroAvatarFallbackProps = {
  className?: string;
};

/**
 * Imagem estatica usada como fallback (sem distorcao exagerada).
 */
export function HeroAvatarFallback({
  className = "",
}: HeroAvatarFallbackProps) {
  const { locale, t } = useLanguage();
  const src = `${assetUrl("/hero-3d.png")}?v=${ASSET_VERSION}`;
  const label =
    locale === "en"
      ? `3D avatar of ${t.profile.name} coding`
      : `Avatar 3D de ${t.profile.name} programando`;

  return (
    <div className={`hero-avatar-wrap anim-float ${className}`.trim()}>
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
