import type { Locale } from "@/i18n/types";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    tech: string;
    projects: string;
    experience: string;
    contact: string;
    menu: string;
    openMenu: string;
  };
  hero: {
    badge: string;
    roleLine1: string;
    roleLine2: string;
    tagline: string;
    ctaProjects: string;
    ctaContact: string;
    ctaWhatsapp: string;
    caption: string;
  };
  about: {
    kicker: string;
    heading: string;
    paragraphs: string[];
    terminal: { command: string; output: string }[];
  };
  tech: {
    kicker: string;
    heading: string;
    lead: string;
    currentlyLabel: string;
    currentlyItems: string[];
    groups: { title: string; items: string[] }[];
  };
  projects: {
    kicker: string;
    heading: string;
    lead: string;
    hiddenTitle: string;
    revealHint: string;
    closeHint: string;
    stackLabel: string;
    productionLabel: string;
    codeLinkLabel: string;
    imageAltSuffix: string;
    expandImageLabel: string;
    closeLightboxLabel: string;
    items: {
      name: string;
      summary: string;
      stack: string;
      production: string;
      highlights: string[];
      href?: string;
    }[];
  };
  experience: {
    kicker: string;
    heading: string;
    items: {
      company: string;
      role: string;
      period: string;
      bullets: string[];
    }[];
  };
  contact: {
    kicker: string;
    heading: string;
    lead: string;
    emailCta: string;
    whatsapp: string;
    whatsappCta: string;
    whatsappMessage: string;
    whatsappAriaLabel: string;
    emailLabel: string;
    phoneLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    mailSubject: string;
  };
  profile: {
    name: string;
    brand: string;
    location: string;
    email: string;
    phone: string;
    phoneHref: string;
    linkedin: string;
    linkedinLabel: string;
    github: string;
    githubLabel: string;
  };
};

const sharedProfile = {
  name: "Camilo Lessa de Melo",
  brand: "Camilo Lessa",
  location: "Belém - PA",
  email: "camilomelo8428@gmail.com",
  phone: "(91) 98184-5943",
  phoneHref: "https://wa.me/5591981845943",
  linkedin: "https://linkedin.com/in/camilo-lessa",
  linkedinLabel: "linkedin.com/in/camilo-lessa",
  github: "https://github.com/camilomelo8428",
  githubLabel: "github.com/camilomelo8428",
} as const;

const pt: Dictionary = {
  meta: {
    title: "Camilo Lessa | Desenvolvedor Full Stack & Supervisor de TI",
    description:
      "Portfólio de Camilo Lessa de Melo — desenvolvimento full stack, infraestrutura, IoT industrial e sistemas corporativos em produção.",
  },
  nav: {
    about: "Sobre",
    tech: "Tecnologias",
    projects: "Projetos",
    experience: "Experiência",
    contact: "Contato",
    menu: "Menu",
    openMenu: "Abrir menu",
  },
  hero: {
    badge: "Full Stack · Infra · IoT",
    roleLine1: "Desenvolvedor Full Stack &",
    roleLine2: "Supervisor de TI",
    tagline:
      "Backend, frontend e infra — sistemas em produção, da fábrica ao código.",
    ctaProjects: "Ver projetos",
    ctaContact: "Contato",
    ctaWhatsapp: "WhatsApp",
    caption: "Em código · Belém-PA",
  },
  about: {
    kicker: "Sobre",
    heading: "Por trás da tela",
    paragraphs: [
      "Me chamo Camilo, sou de Belém-PA e atuo como Desenvolvedor Full Stack e Supervisor de TI na AMASA. Gosto de entender o que acontece por trás da interface — da infraestrutura ao código que roda em produção.",
      "Entre sensores em embarcações, plataformas corporativas e automação no chão de fábrica, vou construindo sistemas que resolvem problemas reais. Ainda tem muito para aprender, e é isso que mais me move na área de tecnologia.",
    ],
    terminal: [
      { command: "whoami", output: "Camilo Lessa de Melo" },
      { command: "pwd", output: "/belem-pa/amasa/ti" },
      {
        command: "ls",
        output: "sensores-amasa jbflexa-chat frequencia-amasa proxmox",
      },
      {
        command: "git status",
        output: "3 projetos em produção, mudanças everywhere",
      },
      { command: "ping reality", output: "sistemas no ar — uptime em progresso" },
    ],
  },
  tech: {
    kicker: "Stack",
    heading: "Tecnologias",
    lead: "Entre uma ideia e outra, essas são as tecnologias que mais aparecem no caminho.",
    currentlyLabel: "Usando atualmente",
    currentlyItems: [
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "Flask",
      "Gradio",
      "ESP32",
      "Proxmox",
    ],
    groups: [
      {
        title: "Desenvolvimento",
        items: [
          "Python",
          "Flask",
          "FastAPI",
          "React",
          "TypeScript",
          "Socket.IO",
          "PyQt6",
        ],
      },
      {
        title: "Infra e IoT",
        items: [
          "Proxmox",
          "Firewall Endian",
          "ESP32 / PlatformIO",
          "C++",
          "Redes",
          "SQL Server",
        ],
      },
      {
        title: "Dados e cloud",
        items: [
          "Supabase",
          "PostgreSQL",
          "MySQL",
          "Google Drive API",
          "Vercel",
        ],
      },
    ],
  },
  projects: {
    kicker: "Portfólio",
    heading: "Projetos",
    lead: "Sistemas entregues em produção — IoT, plataformas corporativas e automação operacional.",
    hiddenTitle: "Projeto oculto",
    revealHint: "Clique para ver detalhes",
    closeHint: "Clique para minimizar",
    stackLabel: "Stack",
    productionLabel: "Produção",
    codeLinkLabel: "Ver código",
    imageAltSuffix: "captura do projeto",
    expandImageLabel: "Ampliar imagem",
    closeLightboxLabel: "Fechar",
    items: [
      {
        name: "Sensores AMASA",
        summary:
          "Sistema IoT industrial para monitoramento de embarcações em tempo real: firmware ESP32 e painel corporativo com dashboards operacionais.",
        stack: "ESP32, PlatformIO, C++, Flask, Python",
        production: "Embarcações AMASA",
        href: "https://github.com/camilomelo8428/sensores-amasa",
        highlights: [
          "Leitura de RPM, pressão de óleo e temperatura do motor",
          "Painel desktop com instalador Windows e visão mobile",
          "Integração de sensores industriais em rede de campo",
        ],
      },
      {
        name: "JBFlexa Chat",
        summary:
          "Plataforma corporativa de comunicação e suporte: chat em tempo real, help desk com SLA, base de conhecimento, tarefas e estoque.",
        stack: "Flask, Socket.IO, SQLAlchemy, PyInstaller",
        production: "Ambiente corporativo",
        href: "https://github.com/camilomelo8428/jbflexa-chat",
        highlights: [
          "Chat real-time e gestão de chamados",
          "Executável Windows com atualização automática via GitHub",
          "Admin, autenticação e relatórios operacionais",
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
        href: "https://github.com/camilomelo8428/frequencia-amasa",
      },
      {
        name: "Questionário Satisfação AMASA",
        summary:
          "Pesquisa de clima e satisfação corporativa: formulário público, painel administrativo, estatísticas e relatórios PDF por setor.",
        stack: "Flask, Flask-Login, ReportLab",
        production: "AMASA",
        href: "https://github.com/camilomelo8428/questionario-satisfacao-amasa",
        highlights: [
          "Questionário configurável com avaliações 1–5",
          "Dashboard admin com gestão de respostas",
          "Relatórios PDF geral, detalhado e por setor",
        ],
      },
      {
        name: "Lina IA Local",
        summary:
          "Assistente conversacional com LLM 100% offline: memória episódica e semântica, avatar 3D com emoções e aceleração GPU via llamafile.",
        stack: "Python, Gradio, llamafile, Qwen3, Three.js",
        production: "Projeto pessoal / R&D",
        href: "https://github.com/camilomelo8428/lina-ia-local",
        highlights: [
          "Inferência local Qwen3 com API OpenAI-compatible",
          "Memória persistente em camadas com consolidação via LLM",
          "Avatar 3D animado que reflete emoções da conversa",
        ],
      },
    ],
  },
  experience: {
    kicker: "Trajetória",
    heading: "Experiência profissional",
    items: [
      {
        company: "AMASA — Amazônia Indústria Alimentícias",
        role: "Supervisor de TI / Desenvolvedor Full Stack",
        period: "2025 – 2026 · Atual",
        bullets: [
          "Promovido a Supervisor de TI; liderança da área e entrega de sistemas em produção: Sensores AMASA, Frequência-amasa e JBFlexa Chat.",
          "Infraestrutura Proxmox/Endian e sustentação do ERP Fortes com alta disponibilidade.",
        ],
      },
      {
        company: "Solus IT",
        role: "Analista de TI",
        period: "2023 – 2024",
        bullets: [
          "Suporte técnico N1/N2: estações, rede, impressoras e sistemas corporativos; triagem e resolução de incidentes.",
          "500+ chamados atendidos (−40% no tempo médio) e 300+ atendimentos remotos (95% sem deslocamento).",
        ],
      },
      {
        company: "W3 Solution",
        role: "Desenvolvedor Front-end",
        period: "2018 – 2023",
        bullets: [
          "Interfaces React/TypeScript em 12+ projetos; otimização de apps (3s → 0,8s) e manutenção de legados.",
        ],
      },
      {
        company: "Eng Tec",
        role: "Analista de TI / Programador",
        period: "2015 – 2018",
        bullets: [
          "Controle de acesso, padronização de 50+ terminais e servidores de automação.",
        ],
      },
    ],
  },
  contact: {
    kicker: "Contato",
    heading: "Vamos conversar?",
    lead: "Se quiser falar sobre uma oportunidade, projeto ou tecnologia, fique à vontade para entrar em contato.",
    emailCta: "Enviar e-mail",
    whatsapp: "WhatsApp",
    whatsappCta: "Chamar no WhatsApp",
    whatsappMessage:
      "Olá Camilo! Vi seu portfólio e gostaria de conversar sobre uma oportunidade ou projeto.",
    whatsappAriaLabel: "Abrir conversa no WhatsApp com Camilo Lessa",
    emailLabel: "E-mail",
    phoneLabel: "Telefone",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    mailSubject: "Contato pelo portfólio",
  },
  profile: { ...sharedProfile },
};

const en: Dictionary = {
  meta: {
    title: "Camilo Lessa | Full Stack Developer & IT Supervisor",
    description:
      "Portfolio of Camilo Lessa de Melo — full stack development, infrastructure, industrial IoT, and production corporate systems.",
  },
  nav: {
    about: "About",
    tech: "Tech",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    menu: "Menu",
    openMenu: "Open menu",
  },
  hero: {
    badge: "Full Stack · Infra · IoT",
    roleLine1: "Full Stack Developer &",
    roleLine2: "IT Supervisor",
    tagline:
      "Backend, frontend, and infrastructure — production systems from the plant floor to code.",
    ctaProjects: "View projects",
    ctaContact: "Contact",
    ctaWhatsapp: "WhatsApp",
    caption: "Shipping code · Belém-PA",
  },
  about: {
    kicker: "About",
    heading: "Behind the screen",
    paragraphs: [
      "I'm Camilo from Belém, Brazil — Full Stack Developer and IT Supervisor at AMASA. I like understanding what happens behind the interface, from infrastructure to production code.",
      "Between vessel sensors, corporate platforms, and shop-floor automation, I build systems that solve real problems. There's still a lot to learn, and that's what keeps me moving in tech.",
    ],
    terminal: [
      { command: "whoami", output: "Camilo Lessa de Melo" },
      { command: "pwd", output: "/belem-pa/amasa/it" },
      {
        command: "ls",
        output: "sensores-amasa jbflexa-chat frequencia-amasa proxmox",
      },
      {
        command: "git status",
        output: "3 production projects, changes everywhere",
      },
      { command: "ping reality", output: "systems online — uptime in progress" },
    ],
  },
  tech: {
    kicker: "Stack",
    heading: "Technologies",
    lead: "Between one idea and the next, these are the tools that show up most often.",
    currentlyLabel: "Currently using",
    currentlyItems: [
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "Flask",
      "Gradio",
      "ESP32",
      "Proxmox",
    ],
    groups: [
      {
        title: "Development",
        items: [
          "Python",
          "Flask",
          "FastAPI",
          "React",
          "TypeScript",
          "Socket.IO",
          "PyQt6",
        ],
      },
      {
        title: "Infra & IoT",
        items: [
          "Proxmox",
          "Endian Firewall",
          "ESP32 / PlatformIO",
          "C++",
          "Networking",
          "SQL Server",
        ],
      },
      {
        title: "Data & cloud",
        items: [
          "Supabase",
          "PostgreSQL",
          "MySQL",
          "Google Drive API",
          "Vercel",
        ],
      },
    ],
  },
  projects: {
    kicker: "Portfolio",
    heading: "Projects",
    lead: "Systems delivered to production — IoT, corporate platforms, and operational automation.",
    hiddenTitle: "Hidden project",
    revealHint: "Click to view details",
    closeHint: "Click to minimize",
    stackLabel: "Stack",
    productionLabel: "Production",
    codeLinkLabel: "View code",
    imageAltSuffix: "project screenshot",
    expandImageLabel: "Expand image",
    closeLightboxLabel: "Close",
    items: [
      {
        name: "Sensores AMASA",
        summary:
          "Industrial IoT system for real-time vessel monitoring: ESP32 firmware and a corporate dashboard with operational views.",
        stack: "ESP32, PlatformIO, C++, Flask, Python",
        production: "AMASA vessels",
        href: "https://github.com/camilomelo8428/sensores-amasa",
        highlights: [
          "RPM, oil pressure, and engine temperature readings",
          "Desktop panel with Windows installer and mobile view",
          "Industrial sensors integrated on the field network",
        ],
      },
      {
        name: "JBFlexa Chat",
        summary:
          "Corporate communication and support platform: real-time chat, SLA help desk, knowledge base, tasks, and inventory.",
        stack: "Flask, Socket.IO, SQLAlchemy, PyInstaller",
        production: "Corporate environment",
        href: "https://github.com/camilomelo8428/jbflexa-chat",
        highlights: [
          "Real-time chat and ticket management",
          "Windows executable with auto-update via GitHub",
          "Admin, authentication, and operational reports",
        ],
      },
      {
        name: "Frequência AMASA",
        summary:
          "Corporate employee attendance system: registration by department and production line, daily presence tracking, PWA web panel, and operational reports.",
        stack: "FastAPI, SQLModel, SQLite, Typer, ReportLab, PWA",
        production: "AMASA",
        highlights: [
          "Daily tracking of presence, lateness, vacation, medical leave, and absences",
          "Responsive web panel (PWA) with authentication and documented REST API",
          "Daily, weekly, and monthly reports in PDF, Excel, and CSV by department/line",
        ],
        href: "https://github.com/camilomelo8428/frequencia-amasa",
      },
      {
        name: "Questionário Satisfação AMASA",
        summary:
          "Corporate climate and satisfaction survey: public form, admin panel, statistics, and PDF reports by department.",
        stack: "Flask, Flask-Login, ReportLab",
        production: "AMASA",
        href: "https://github.com/camilomelo8428/questionario-satisfacao-amasa",
        highlights: [
          "Configurable questionnaire with 1–5 ratings",
          "Admin dashboard with response management",
          "General, detailed, and department PDF reports",
        ],
      },
      {
        name: "Lina IA Local",
        summary:
          "Conversational assistant with 100% offline LLM: episodic and semantic memory, 3D avatar with emotions, and GPU acceleration via llamafile.",
        stack: "Python, Gradio, llamafile, Qwen3, Three.js",
        production: "Personal project / R&D",
        href: "https://github.com/camilomelo8428/lina-ia-local",
        highlights: [
          "Local Qwen3 inference with OpenAI-compatible API",
          "Layered persistent memory with LLM consolidation",
          "Animated 3D avatar reflecting conversation emotions",
        ],
      },
    ],
  },
  experience: {
    kicker: "Career",
    heading: "Professional experience",
    items: [
      {
        company: "AMASA — Amazônia Indústria Alimentícias",
        role: "IT Supervisor / Full Stack Developer",
        period: "2025 – 2026 · Present",
        bullets: [
          "Promoted to IT Supervisor; led the team and shipped production systems: Sensores AMASA, Frequência-amasa, and JBFlexa Chat.",
          "Proxmox/Endian infrastructure and Fortes ERP sustainment with high availability.",
        ],
      },
      {
        company: "Solus IT",
        role: "IT Analyst",
        period: "2023 – 2024",
        bullets: [
          "Tier 1/2 support: workstations, networking, printers, and corporate systems; incident triage and resolution.",
          "500+ tickets handled (−40% mean response time) and 300+ remote sessions (95% resolved without on-site travel).",
        ],
      },
      {
        company: "W3 Solution",
        role: "Front-end Developer",
        period: "2018 – 2023",
        bullets: [
          "React/TypeScript interfaces across 12+ projects; app optimization (3s → 0.8s) and legacy maintenance.",
        ],
      },
      {
        company: "Eng Tec",
        role: "IT Analyst / Developer",
        period: "2015 – 2018",
        bullets: [
          "Access control, standardization of 50+ terminals, and automation servers.",
        ],
      },
    ],
  },
  contact: {
    kicker: "Contact",
    heading: "Let's talk?",
    lead: "If you'd like to discuss an opportunity, project, or technology, feel free to reach out.",
    emailCta: "Send email",
    whatsapp: "WhatsApp",
    whatsappCta: "Chat on WhatsApp",
    whatsappMessage:
      "Hi Camilo! I saw your portfolio and would like to talk about an opportunity or project.",
    whatsappAriaLabel: "Open WhatsApp chat with Camilo Lessa",
    emailLabel: "Email",
    phoneLabel: "Phone",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    mailSubject: "Contact from portfolio",
  },
  profile: { ...sharedProfile },
};

export const dictionaries: Record<Locale, Dictionary> = { pt, en };
