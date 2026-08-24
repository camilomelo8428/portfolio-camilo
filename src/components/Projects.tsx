"use client";

import { useMemo, useState } from "react";
import { ProjectGallery } from "@/components/ProjectGallery";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { getProjectImages } from "@/content/project-images";
import { useLanguage } from "@/i18n/LanguageProvider";
import {
  resolveProjectGroup,
  sortProjectGroups,
  type ProjectGroupId,
} from "@/lib/project-groups";

type ProjectItem = {
  name: string;
  summary: string;
  stack: string;
  production: string;
  highlights: string[];
  href?: string;
};

/**
 * Renderiza um card de projeto expandível.
 */
function ProjectCard({
  project,
  isOpen,
  onToggle,
  tone,
  labels,
}: {
  project: ProjectItem;
  isOpen: boolean;
  onToggle: () => void;
  tone: ProjectGroupId;
  labels: {
    revealHint: string;
    closeHint: string;
    stackLabel: string;
    codeLinkLabel: string;
    imageAltSuffix: string;
    expandImageLabel: string;
    closeLightboxLabel: string;
  };
}) {
  const images = getProjectImages(project.name);
  const cover = images[0];
  const alt = `${project.name} — ${labels.imageAltSuffix}`;

  return (
    <article
      className={`project-card ${isOpen ? "project-card--open" : "project-card--compact"}`}
      data-tone={tone}
    >
      {cover && !isOpen ? (
        <ProjectGallery images={[cover]} alt={alt} interactive={false} />
      ) : null}

      {isOpen && images.length > 0 ? (
        <ProjectGallery
          images={images}
          alt={alt}
          interactive
          expandImageLabel={labels.expandImageLabel}
          closeLightboxLabel={labels.closeLightboxLabel}
        />
      ) : null}

      <button
        type="button"
        className="project-card__trigger"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <div className="project-card__header">
          <h3 className="project-card__title">{project.name}</h3>
          <span className="project-card__badge">{project.production}</span>
        </div>

        {!isOpen ? (
          <div className="project-card__collapsed">
            <p className="project-card__stack-line">{project.stack}</p>
            <p className="project-card__hint">{labels.revealHint}</p>
          </div>
        ) : (
          <div
            key={`${project.name}-expanded`}
            className="project-card__expanded text-left"
          >
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {project.summary}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="project-card__bullet" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-line/80 pt-4">
              <p className="text-xs uppercase tracking-wide text-ink-muted">
                {labels.stackLabel}
              </p>
              <p className="mt-1 text-sm text-ink">{project.stack}</p>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                  onClick={(event) => event.stopPropagation()}
                >
                  {labels.codeLinkLabel} ↗
                </a>
              ) : null}
            </div>
            <p className="mt-4 text-xs text-ink-muted">{labels.closeHint}</p>
          </div>
        )}
      </button>
    </article>
  );
}

export function Projects() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const groupedProjects = useMemo(() => {
    const buckets = new Map<ProjectGroupId, ProjectItem[]>();

    for (const project of t.projects.items) {
      const groupId = resolveProjectGroup(project.production);
      const current = buckets.get(groupId) ?? [];
      current.push(project);
      buckets.set(groupId, current);
    }

    return sortProjectGroups([...buckets.keys()]).map((groupId) => ({
      groupId,
      title: t.projects.groupLabels[groupId],
      items: buckets.get(groupId) ?? [],
    }));
  }, [t.projects.groupLabels, t.projects.items]);

  const toggleProject = (projectName: string) => {
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(projectName)) {
        next.delete(projectName);
      } else {
        next.add(projectName);
      }
      return next;
    });
  };

  const cardLabels = {
    revealHint: t.projects.revealHint,
    closeHint: t.projects.closeHint,
    stackLabel: t.projects.stackLabel,
    codeLinkLabel: t.projects.codeLinkLabel,
    imageAltSuffix: t.projects.imageAltSuffix,
    expandImageLabel: t.projects.expandImageLabel,
    closeLightboxLabel: t.projects.closeLightboxLabel,
  };

  return (
    <section id="projetos" className="section-shell border-b border-line bg-bg-deep/40">
      <div className="page-container">
        <RevealOnScroll>
          <h2 className="section-heading">{t.projects.heading}</h2>
          <p className="section-lead">{t.projects.lead}</p>
        </RevealOnScroll>

        <div className="mt-12 space-y-12">
          {groupedProjects.map((group, groupIndex) => (
            <RevealOnScroll key={group.groupId} delay={groupIndex * 40}>
              <div className="projects-group" data-tone={group.groupId}>
                <h3 className="projects-group__title">{group.title}</h3>
                <div className="projects-grid mt-5">
                  {group.items.map((project, index) => (
                    <RevealOnScroll
                      key={project.name}
                      delay={index * 40}
                      className="h-auto self-start"
                    >
                      <ProjectCard
                        project={project}
                        tone={group.groupId}
                        isOpen={expanded.has(project.name)}
                        onToggle={() => toggleProject(project.name)}
                        labels={cardLabels}
                      />
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
