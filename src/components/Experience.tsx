import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section id="experiencia" className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] text-steel">
          Trajetória
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Experiência profissional
        </h2>
        <ol className="mt-12 space-y-0">
          {experience.map((job) => (
            <li
              key={`${job.company}-${job.period}`}
              className="grid gap-2 border-t border-line py-8 md:grid-cols-[1fr_auto] md:gap-8"
            >
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink md:text-xl">
                  {job.company}
                </h3>
                <p className="mt-1 text-sm font-medium text-steel">{job.role}</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-muted md:text-base">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-ink-muted md:text-right">{job.period}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
