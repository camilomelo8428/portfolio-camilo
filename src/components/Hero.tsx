import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section
      id="topo"
      className="relative min-h-[88vh] overflow-hidden border-b border-line"
    >
      <div className="absolute inset-0 site-grid" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-16 md:grid-cols-[1.15fr_0.85fr] md:items-end md:px-8 md:pb-20 md:pt-24">
        <div>
          <p className="anim-rise font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.22em] text-steel">
            {profile.location}
          </p>
          <h1 className="anim-rise-delay mt-4 font-[family-name:var(--font-display)] text-5xl font-semibold leading-[0.95] tracking-tight text-ink md:text-7xl">
            {profile.brand}
          </h1>
          <div className="anim-line mt-5 h-px w-24 bg-accent" />
          <p className="anim-rise-delay-2 mt-6 max-w-xl text-lg text-ink-muted md:text-xl">
            <span className="font-medium text-ink">{profile.title}</span>
            <span className="mt-2 block">{profile.tagline}</span>
          </p>
          <div className="anim-rise-delay-2 mt-10 flex flex-wrap gap-3">
            <a
              href="#projetos"
              className="bg-steel-dark px-6 py-3 text-sm font-medium text-white transition hover:bg-steel"
            >
              Ver projetos
            </a>
            <a
              href="#contato"
              className="border border-ink/25 px-6 py-3 text-sm font-medium text-ink transition hover:border-steel hover:text-steel"
            >
              Contato
            </a>
          </div>
        </div>
        <aside className="anim-rise-delay relative min-h-[280px] overflow-hidden border border-line bg-steel-dark text-white md:min-h-[360px]">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(135deg, transparent 40%, rgba(196,92,38,0.35)), repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(255,255,255,0.06) 22px, rgba(255,255,255,0.06) 23px)",
            }}
          />
          <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
            <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] text-white/70">
              Em produção
            </p>
            <ul className="space-y-3 text-sm leading-relaxed text-white/90 md:text-base">
              <li>IoT industrial · ESP32 + painéis operacionais</li>
              <li>Plataformas corporativas · chat, frequência, backup</li>
              <li>Infraestrutura · Proxmox, firewall, ERP</li>
            </ul>
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight md:text-3xl">
              Sistemas que sustentam a operação.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
