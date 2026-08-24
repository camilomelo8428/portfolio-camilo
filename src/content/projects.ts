export type Project = {
  name: string;
  summary: string;
  stack: string;
  production: string;
  highlights: string[];
  href?: string;
};

/** Destaques alinhados ao currículo e aos projetos locais. */
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
    name: "Frequência-amasa",
    summary:
      "Gestão de ponto e frequência de colaboradores com API REST, interface web e exportação de relatórios PDF/CSV.",
    stack: "FastAPI, SQLModel, Pydantic, Poetry",
    production: "AMASA",
    highlights: [
      "Cadastro por setor e registro diário de frequência",
      "API documentada e arquitetura testável",
      "Relatórios para operação e RH",
    ],
    href: "https://github.com/camilomelo8428/frequencia-amasa-rpm",
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
