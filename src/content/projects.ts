export type Project = {
  name: string;
  summary: string;
  stack: string;
  production: string;
  highlights: string[];
  href?: string;
};

/** Projetos publicados no GitHub — alinhados ao portfólio. */
export const projects: Project[] = [
  {
    name: "Sensores AMASA",
    summary:
      "Sistema IoT industrial para monitoramento de embarcações em tempo real: firmware ESP32 e painel corporativo com dashboards operacionais.",
    stack: "ESP32, PlatformIO, C++, Flask, Python",
    production: "Embarcações AMASA",
    highlights: [
      "Leitura de RPM, pressão de óleo e temperatura do motor",
      "Painel desktop com instalador Windows e visão mobile",
      "Integração de sensores industriais em rede de campo",
    ],
    href: "https://github.com/camilomelo8428/sensores-amasa",
  },
  {
    name: "JBFlexa Chat",
    summary:
      "Plataforma corporativa de comunicação e suporte: chat em tempo real, help desk com SLA, base de conhecimento, tarefas e estoque.",
    stack: "Flask, Socket.IO, SQLAlchemy, PyInstaller",
    production: "Ambiente corporativo",
    highlights: [
      "Chat real-time e gestão de chamados",
      "Executável Windows com atualização automática via GitHub",
      "Admin, autenticação e relatórios operacionais",
    ],
    href: "https://github.com/camilomelo8428/jbflexa-chat",
  },
  {
    name: "Frequência AMASA",
    summary:
      "Sistema corporativo de controle de frequência de funcionários: cadastro por setor e linha de produção, registro diário de presença, painel web PWA e relatórios operacionais.",
    stack: "FastAPI, SQLModel, SQLite, Typer, ReportLab, PWA",
    production: "AMASA",
    highlights: [
      "Registro diário de presença, atraso, férias, atestado e afastamentos",
      "Painel web responsivo (PWA) com autenticação e API REST documentada",
      "Relatórios diários, semanais e mensais em PDF, Excel e CSV por setor/linha",
    ],
    href: "https://github.com/camilomelo8428/frequencia-amasa",
  },
  {
    name: "Questionário Satisfação AMASA",
    summary:
      "Pesquisa de clima e satisfação corporativa: formulário público, painel administrativo, estatísticas e relatórios PDF por setor.",
    stack: "Flask, Flask-Login, ReportLab",
    production: "AMASA",
    highlights: [
      "Questionário configurável com avaliações 1–5",
      "Dashboard admin com gestão de respostas",
      "Relatórios PDF geral, detalhado e por setor",
    ],
    href: "https://github.com/camilomelo8428/questionario-satisfacao-amasa",
  },
  {
    name: "Lina IA Local",
    summary:
      "Assistente conversacional com LLM 100% offline: memória episódica e semântica, avatar 3D com emoções e aceleração GPU via llamafile.",
    stack: "Python, Gradio, llamafile, Qwen3, Three.js",
    production: "Projeto pessoal / R&D",
    highlights: [
      "Inferência local Qwen3 com API OpenAI-compatible",
      "Memória persistente em camadas com consolidação via LLM",
      "Avatar 3D animado que reflete emoções da conversa",
    ],
    href: "https://github.com/camilomelo8428/lina-ia-local",
  },
];
