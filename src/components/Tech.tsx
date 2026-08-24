"use client";

import { useMemo, useState } from "react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { TechMarquee } from "@/components/TechMarquee";
import {
  TECH_CURRENTLY,
  TECH_GROUP_ITEMS,
  TECH_GROUP_ORDER,
  resolveTechList,
  type TechEntry,
  type TechGroupId,
  type TechLevel,
} from "@/content/tech-catalog";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Abrevia o monograma para exibicao no card.
 */
function TechMonogram({ value }: { value: string }) {
  return <span className="tech-tile__mono">{value}</span>;
}

/**
 * Card interativo de uma tecnologia.
 */
function TechTile({
  tech,
  blurb,
  levelLabel,
  active,
  onSelect,
}: {
  tech: TechEntry;
  blurb: string;
  levelLabel: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`tech-tile ${active ? "is-active" : ""}`}
      aria-pressed={active}
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
    >
      <div className="tech-tile__top">
        <TechMonogram value={tech.monogram} />
        <span className={`tech-tile__level tech-tile__level--${tech.level}`}>
          {levelLabel}
        </span>
      </div>
      <h4 className="tech-tile__name">{tech.name}</h4>
      <p className="tech-tile__blurb">{blurb}</p>
    </button>
  );
}

export function Tech() {
  const { t, locale } = useLanguage();
  const [filter, setFilter] = useState<TechGroupId | "all">("all");
  const [activeId, setActiveId] = useState<string | null>(null);

  const groups = useMemo(
    () =>
      TECH_GROUP_ORDER.map((groupId) => ({
        id: groupId,
        title: t.tech.groupTitles[groupId],
        items: resolveTechList(TECH_GROUP_ITEMS[groupId]),
      })),
    [t.tech.groupTitles],
  );

  const visibleGroups = useMemo(
    () => (filter === "all" ? groups : groups.filter((g) => g.id === filter)),
    [filter, groups],
  );

  const activeTech: TechEntry | null = useMemo(() => {
    if (!activeId) {
      return null;
    }
    for (const group of groups) {
      const found = group.items.find((item) => item.id === activeId);
      if (found) {
        return found;
      }
    }
    return null;
  }, [activeId, groups]);

  const currentlyNames = resolveTechList(TECH_CURRENTLY).map((item) => item.name);

  const levelLabel = (level: TechLevel) => t.tech.levelLabels[level];

  return (
    <section id="tecnologias" className="section-shell border-b border-line">
      <div className="page-container">
        <RevealOnScroll>
          <h2 className="section-heading">{t.tech.heading}</h2>
          <p className="section-lead">{t.tech.lead}</p>
          <p className="tech-hint mt-2">{t.tech.hint}</p>
        </RevealOnScroll>

        <RevealOnScroll delay={60}>
          <div
            className="tech-filters"
            role="tablist"
            aria-label={t.tech.heading}
          >
            <button
              type="button"
              role="tab"
              aria-selected={filter === "all"}
              className={`tech-filter ${filter === "all" ? "is-active" : ""}`}
              data-tone="development"
              onClick={() => setFilter("all")}
            >
              {t.tech.filterAll}
            </button>
            {groups.map((group) => (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={filter === group.id}
                className={`tech-filter ${filter === group.id ? "is-active" : ""}`}
                data-tone={group.id}
                onClick={() => setFilter(group.id)}
              >
                {group.title}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {activeTech ? (
          <RevealOnScroll delay={80}>
            <div
              className="tech-focus"
              data-tone={
                groups.find((group) =>
                  group.items.some((item) => item.id === activeTech.id),
                )?.id ?? "development"
              }
              aria-live="polite"
            >
              <div className="tech-focus__mono">{activeTech.monogram}</div>
              <div>
                <p className="tech-focus__kicker">
                  {levelLabel(activeTech.level)}
                </p>
                <h3 className="tech-focus__name">{activeTech.name}</h3>
                <p className="tech-focus__blurb">
                  {activeTech.blurb[locale === "en" ? "en" : "pt"]}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        ) : null}

        <div className="mt-8 space-y-10">
          {visibleGroups.map((group, groupIndex) => (
            <RevealOnScroll key={group.id} delay={groupIndex * 50}>
              <div className="tech-group-card" data-tone={group.id}>
                <h3 className="tech-group-card__title">{group.title}</h3>
                <div className="tech-grid">
                  {group.items.map((tech) => (
                    <TechTile
                      key={tech.id}
                      tech={tech}
                      blurb={tech.blurb[locale === "en" ? "en" : "pt"]}
                      levelLabel={levelLabel(tech.level)}
                      active={activeId === tech.id}
                      onSelect={() => setActiveId(tech.id)}
                    />
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={120}>
          <TechMarquee
            label={t.tech.currentlyLabel}
            items={currentlyNames}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
