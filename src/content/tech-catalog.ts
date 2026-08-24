export type TechLevel = "core" | "frequent" | "support";

export type TechId =
  | "python"
  | "flask"
  | "fastapi"
  | "nodejs"
  | "react"
  | "typescript"
  | "socketio"
  | "pyqt6"
  | "proxmox"
  | "endian"
  | "esp32"
  | "cpp"
  | "redes"
  | "sqlserver"
  | "supabase"
  | "postgresql"
  | "mysql"
  | "gdrive"
  | "vercel"
  | "nextjs"
  | "gradio";

export type TechEntry = {
  id: TechId;
  name: string;
  monogram: string;
  level: TechLevel;
  blurb: { pt: string; en: string };
};

export type TechGroupId = "development" | "infra" | "data";

/**
 * Catalogo unico das tecnologias exibidas no portifolio.
 */
export const TECH_CATALOG: Record<TechId, TechEntry> = {
  python: {
    id: "python",
    name: "Python",
    monogram: "Py",
    level: "core",
    blurb: {
      pt: "Linguagem principal em backends, automação, IoT e scripts de operação.",
      en: "Main language for backends, automation, IoT, and ops scripts.",
    },
  },
  flask: {
    id: "flask",
    name: "Flask",
    monogram: "Fl",
    level: "core",
    blurb: {
      pt: "APIs e painéis corporativos leves — Sensores AMASA, JBFlexa e questionário.",
      en: "Lightweight APIs and corporate panels — Sensores AMASA, JBFlexa, surveys.",
    },
  },
  fastapi: {
    id: "fastapi",
    name: "FastAPI",
    monogram: "Fa",
    level: "core",
    blurb: {
      pt: "API REST tipada com docs automáticas — Frequência AMASA em produção.",
      en: "Typed REST API with auto docs — Frequência AMASA in production.",
    },
  },
  nodejs: {
    id: "nodejs",
    name: "Node.js",
    monogram: "No",
    level: "frequent",
    blurb: {
      pt: "APIs Express com JWT e SQLite — API Pedidos e serviços auxiliares.",
      en: "Express APIs with JWT and SQLite — Orders API and helper services.",
    },
  },
  react: {
    id: "react",
    name: "React",
    monogram: "Re",
    level: "core",
    blurb: {
      pt: "Interfaces web modernas para clientes, salões e dashboards operacionais.",
      en: "Modern web UIs for clients, salons, and operational dashboards.",
    },
  },
  typescript: {
    id: "typescript",
    name: "TypeScript",
    monogram: "TS",
    level: "core",
    blurb: {
      pt: "Tipagem em frontends e apps Next/Vite para menos bugs em produção.",
      en: "Typing for frontends and Next/Vite apps to reduce production bugs.",
    },
  },
  socketio: {
    id: "socketio",
    name: "Socket.IO",
    monogram: "So",
    level: "frequent",
    blurb: {
      pt: "Chat e eventos em tempo real no JBFlexa Chat corporativo.",
      en: "Real-time chat and events in corporate JBFlexa Chat.",
    },
  },
  pyqt6: {
    id: "pyqt6",
    name: "PyQt6",
    monogram: "Qt",
    level: "support",
    blurb: {
      pt: "Interfaces desktop quando o fluxo operacional precisa sair do browser.",
      en: "Desktop UIs when the operational flow needs to leave the browser.",
    },
  },
  proxmox: {
    id: "proxmox",
    name: "Proxmox",
    monogram: "Px",
    level: "core",
    blurb: {
      pt: "Virtualização e alta disponibilidade da infraestrutura AMASA.",
      en: "Virtualization and high availability for AMASA infrastructure.",
    },
  },
  endian: {
    id: "endian",
    name: "Firewall Endian",
    monogram: "En",
    level: "frequent",
    blurb: {
      pt: "Segurança de rede, VPN e regras de acesso no ambiente corporativo.",
      en: "Network security, VPN, and access rules in the corporate environment.",
    },
  },
  esp32: {
    id: "esp32",
    name: "ESP32 / PlatformIO",
    monogram: "Io",
    level: "core",
    blurb: {
      pt: "Firmware e sensores industriais em embarcações — RPM e telemetria.",
      en: "Firmware and industrial sensors on vessels — RPM and telemetry.",
    },
  },
  cpp: {
    id: "cpp",
    name: "C++",
    monogram: "C+",
    level: "frequent",
    blurb: {
      pt: "Código embarcado e camadas de baixo nível junto ao firmware ESP32.",
      en: "Embedded code and low-level layers alongside ESP32 firmware.",
    },
  },
  redes: {
    id: "redes",
    name: "Redes",
    monogram: "Net",
    level: "frequent",
    blurb: {
      pt: "Diagnóstico, VLAN, conectividade de campo e sustentação de rede local.",
      en: "Diagnostics, VLANs, field connectivity, and local network support.",
    },
  },
  sqlserver: {
    id: "sqlserver",
    name: "SQL Server",
    monogram: "SS",
    level: "support",
    blurb: {
      pt: "Consultas e suporte a sistemas corporativos / ERP no dia a dia.",
      en: "Queries and support for corporate / ERP systems day to day.",
    },
  },
  supabase: {
    id: "supabase",
    name: "Supabase",
    monogram: "Sb",
    level: "frequent",
    blurb: {
      pt: "Auth, Postgres e realtime em apps comerciais (barbearia, estoque, salão).",
      en: "Auth, Postgres, and realtime in commercial apps (barbershop, stock, salon).",
    },
  },
  postgresql: {
    id: "postgresql",
    name: "PostgreSQL",
    monogram: "Pg",
    level: "frequent",
    blurb: {
      pt: "Banco relacional robusto via Supabase e projetos com dados estruturados.",
      en: "Solid relational DB via Supabase and structured-data projects.",
    },
  },
  mysql: {
    id: "mysql",
    name: "MySQL",
    monogram: "My",
    level: "support",
    blurb: {
      pt: "Persistência em sistemas legados e integrações pontuais.",
      en: "Persistence in legacy systems and one-off integrations.",
    },
  },
  gdrive: {
    id: "gdrive",
    name: "Google Drive API",
    monogram: "Gd",
    level: "support",
    blurb: {
      pt: "Automação de arquivos e backups em fluxos administrativos.",
      en: "File automation and backups in administrative workflows.",
    },
  },
  vercel: {
    id: "vercel",
    name: "Vercel",
    monogram: "Ve",
    level: "frequent",
    blurb: {
      pt: "Deploy contínuo de frontends React/Next e apps de cliente.",
      en: "Continuous deploy for React/Next frontends and client apps.",
    },
  },
  nextjs: {
    id: "nextjs",
    name: "Next.js",
    monogram: "Nx",
    level: "core",
    blurb: {
      pt: "Este portfólio e apps web com SSR/SSG e deploy estático.",
      en: "This portfolio and web apps with SSR/SSG and static deploy.",
    },
  },
  gradio: {
    id: "gradio",
    name: "Gradio",
    monogram: "Gr",
    level: "frequent",
    blurb: {
      pt: "UI rápida para protótipos de IA — Lina IA Local offline.",
      en: "Fast UI for AI prototypes — offline Lina IA Local.",
    },
  },
};

export const TECH_GROUP_ORDER: TechGroupId[] = [
  "development",
  "infra",
  "data",
];

export const TECH_GROUP_ITEMS: Record<TechGroupId, TechId[]> = {
  development: [
    "python",
    "flask",
    "fastapi",
    "nodejs",
    "react",
    "typescript",
    "socketio",
    "pyqt6",
  ],
  infra: ["proxmox", "endian", "esp32", "cpp", "redes", "sqlserver"],
  data: ["supabase", "postgresql", "mysql", "gdrive", "vercel"],
};

export const TECH_CURRENTLY: TechId[] = [
  "react",
  "nextjs",
  "typescript",
  "python",
  "fastapi",
  "flask",
  "gradio",
  "esp32",
  "proxmox",
];

/**
 * Retorna entradas do catalogo a partir de uma lista de ids.
 */
export function resolveTechList(ids: TechId[]): TechEntry[] {
  return ids.map((id) => TECH_CATALOG[id]);
}
