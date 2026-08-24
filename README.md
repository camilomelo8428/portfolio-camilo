# Portfólio — Camilo Lessa de Melo

Site estático do portfólio profissional: **Supervisor de TI e Programador**.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Export estático (`output: "export"`) para GitHub Pages

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000/portfolio-camilo/](http://localhost:3000/portfolio-camilo/) (respeita `basePath`).

## Build

```bash
npm run build
```

A saída fica em `out/`.

## Deploy (GitHub Pages)

1. Crie o repositório `portfolio-camilo` na sua conta GitHub.
2. Em **Settings → Pages → Source**, escolha **GitHub Actions**.
3. Faça push da branch `main`.
4. URL esperada: `https://<seu-usuario>.github.io/portfolio-camilo/`

## Conteúdo

Textos e projetos ficam em `src/content/` (`profile.ts`, `projects.ts`, `tech.ts`, `experience.ts`).
