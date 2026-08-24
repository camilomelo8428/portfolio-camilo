import { projects } from "@/content/projects";

export function Projects() {
  return (
    <section id="projetos" className="border-b border-line bg-bg-deep/50">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] text-steel">
          Portfólio
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Projetos em destaque
        </h2>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Sistemas entregues em produção — IoT, plataformas corporativas e
          automação operacional.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.name}
              className="flex flex-col border border-line bg-surface p-6 transition hover:border-steel/50 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-ink md:text-2xl">
                  {project.name}
                </h3>
                <span className="shrink-0 font-[family-name:var(--font-display)] text-xs text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
                {project.summary}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink">
                {project.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto border-t border-line pt-6">
                <p className="text-xs uppercase tracking-wide text-ink-muted">
                  Stack
                </p>
                <p className="mt-1 text-sm text-ink">{project.stack}</p>
                <p className="mt-3 text-sm text-steel">
                  Produção: {project.production}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
