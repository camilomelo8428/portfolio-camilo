import { profile } from "@/content/profile";

export function Contact() {
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent("Contato pelo portfólio")}`;

  return (
    <section id="contato" className="bg-steel-dark text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] text-white/60">
          Contato
        </p>
        <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
          Vamos conversar sobre tecnologia e operação
        </h2>
        <p className="mt-4 max-w-xl text-white/75">
          Aberto a oportunidades, projetos e conversas sobre infraestrutura,
          automação e desenvolvimento.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={mailto}
            className="bg-accent px-6 py-3 text-sm font-medium text-white transition hover:brightness-110"
          >
            Enviar e-mail
          </a>
          <a
            href={profile.phoneHref}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 px-6 py-3 text-sm font-medium transition hover:border-white"
          >
            WhatsApp
          </a>
        </div>
        <dl className="mt-12 grid gap-6 text-sm md:grid-cols-2">
          <div>
            <dt className="text-white/50">E-mail</dt>
            <dd className="mt-1">
              <a href={mailto} className="hover:underline">
                {profile.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-white/50">Telefone</dt>
            <dd className="mt-1">{profile.phone}</dd>
          </div>
          <div>
            <dt className="text-white/50">LinkedIn</dt>
            <dd className="mt-1">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {profile.linkedinLabel}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-white/50">GitHub</dt>
            <dd className="mt-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {profile.githubLabel}
              </a>
            </dd>
          </div>
        </dl>
        <p className="mt-16 border-t border-white/15 pt-6 text-xs text-white/45">
          © {new Date().getFullYear()} {profile.name}. Belém - PA.
        </p>
      </div>
    </section>
  );
}
