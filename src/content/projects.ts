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

  },

  {

    name: "API Pedidos",

    summary:

      "API REST em Node.js para CRUD de pedidos com autenticação JWT, persistência SQLite e interface web integrada para login e gestão.",

    stack: "Node.js, Express, SQLite, JWT, Swagger",

    production: "Projeto de portfólio",

    highlights: [

      "Registro e login de usuários com token JWT",

      "CRUD completo de pedidos e itens",

      "Interface web e documentação Swagger/OpenAPI",

    ],

  },

  {

    name: "Estacionamento App",

    summary:

      "Sistema web para gestão de estacionamentos: dashboard financeiro, vagas em tempo real, mensalistas, tickets e relatórios.",

    stack: "React, TypeScript, Supabase, Ant Design, Recharts",

    production: "Projeto comercial",

    highlights: [

      "Dashboard financeiro com gráficos e métricas",

      "Controle de vagas, mensalistas e emissão de tickets",

      "Gestão de funcionários e configurações do estabelecimento",

    ],

  },

  {

    name: "Barbearia App 2",

    summary:

      "Sistema de gestão para barbearias: agendamentos, clientes e operação do salão com painel web responsivo e backend Supabase.",

    stack: "React, TypeScript, Vite, Supabase, Tailwind CSS",

    production: "Projeto comercial",

    highlights: [

      "Gestão de agendamentos e fluxo do salão",

      "Autenticação e dados em tempo real via Supabase",

      "Deploy configurado para Vercel",

    ],

  },

  {

    name: "BeautyStock",

    summary:

      "Controle de estoque para salões de beleza: entradas e saídas de produtos, alertas de estoque baixo e dashboard operacional.",

    stack: "React, TypeScript, Vite, Chakra UI, Supabase",

    production: "Studio Delas",

    highlights: [

      "Login para administradores e funcionários",

      "Registro de movimentações e categorias de produtos",

      "Alertas de estoque mínimo e dashboard responsivo",

    ],

  },

  {

    name: "Studio Delas Beauty",

    summary:

      "Plataforma web para salão de beleza: agendamentos, gestão de clientes e operação do negócio com UI moderna e Supabase.",

    stack: "React, TypeScript, Vite, Radix UI, Supabase",

    production: "Studio Delas",

    highlights: [

      "Interface moderna com componentes Radix UI",

      "Backend Supabase com autenticação e dados em tempo real",

      "Deploy Docker/Vercel e gráficos operacionais",

    ],

  },

];
