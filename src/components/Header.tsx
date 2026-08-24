"use client";

import Image from "next/image";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { assetUrl } from "@/lib/assets";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const links = [
    { href: "#sobre", label: t.nav.about },
    { href: "#tecnologias", label: t.nav.tech },
    { href: "#projetos", label: t.nav.projects },
    { href: "#experiencia", label: t.nav.experience },
    { href: "#contato", label: t.nav.contact },
  ];

  return (
    <header className="site-header sticky top-0 z-50 border-b border-line/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <a href="#topo" className="group flex items-center gap-3">
          <Image
            src={assetUrl("/avatar.png")}
            alt=""
            width={36}
            height={36}
            unoptimized
            className="h-9 w-9 object-cover object-[center_18%] transition duration-300 group-hover:ring-2 group-hover:ring-steel/50"
            style={{ borderRadius: "2px" }}
          />
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-ink transition group-hover:text-steel">
            {t.profile.brand}
            <span className="text-steel">.Dev</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <LanguageSwitcher />
        </nav>
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="text-sm text-ink"
            aria-expanded={open}
            aria-label={t.nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {t.nav.menu}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="flex flex-col gap-3 border-t border-line px-5 py-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition hover:text-steel"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
