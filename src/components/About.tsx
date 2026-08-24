import { profile } from "@/content/profile";

export function About() {
  return (
    <section id="sobre" className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] text-steel">
          Sobre
        </p>
        <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Por trás da operação de TI
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-ink-muted md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
