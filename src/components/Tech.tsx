import { techGroups } from "@/content/tech";

export function Tech() {
  return (
    <section id="tecnologias" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] text-steel">
          Stack
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Tecnologias
        </h2>
        <p className="mt-3 max-w-xl text-ink-muted">
          Ferramentas usadas em infraestrutura, embarcados e desenvolvimento de
          sistemas corporativos.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {techGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-line bg-surface px-3 py-1.5 text-sm text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
