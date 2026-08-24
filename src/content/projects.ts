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
    name: "Frequência AMASA RPM",
    summary:
      "Documentação e referências de hardware para leitura de RPM em embarcações: ESP8266, sensor pick-up, condicionamento de sinal e guias PCB.",
    stack: "ESP8266, Python, EasyEDA, MAX9924",
    production: "Embarcações AMASA",
    highlights: [
      "Esquemas de proteção e ligação do sensor RPM",
      "Scripts de automação e leitura de frequência",
      "Integração com firmware Sensores AMASA",
    ],
    href: "https://github.com/camilomelo8428/frequencia-amasa-rpm",
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
