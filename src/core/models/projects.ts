// Models
import type { Lang } from "./translations";

export type Project = {
  name: string;
  site: string;
  // A screenshot of the live site in public/projects/, 1440×900; null draws the accent panel instead
  image: string | null;
  accent: string;
  tech: string[];
  code: { label: string; href: string }[];
  description: Record<Lang, string>;
};

export const PROJECTS: Project[] = [
  {
    name: "Pedro Luis Imóveis",
    site: "https://pedroluisimoveis.com.br",
    image: "/projects/pedro_luis.webp",
    accent: "#3b82f6",
    tech: ["Node.js", "Express", "MongoDB", "React", "Next.js", "Google Maps", "Tailwind", "ShadCN"],
    code: [
      { label: "Front-end", href: "https://github.com/WorstOne0/pedro-luis-imoveis-frontend" },
      { label: "Dashboard", href: "https://github.com/WorstOne0/pedro-luis-imoveis-dashboard" },
      { label: "Back-end", href: "https://github.com/WorstOne0/pedro-luis-imoveis-backend" },
    ],
    description: {
      en: "Real estate marketplace for buying and selling properties in Cascavel and the surrounding region. Full-stack solution featuring property listings with advanced search filters, Google Maps integration for location browsing, and a complete admin dashboard for managing listings.",
      pt: "Plataforma de compra e venda de imóveis em Cascavel e região. Solução full-stack com listagem de propriedades e filtros de busca avançados, integração com Google Maps para visualização de localização, e painel administrativo completo para gerenciamento de anúncios.",
    },
  },
  {
    name: "Wikidados",
    site: "https://wikidados.com.br",
    image: null,
    accent: "#10b981",
    tech: ["Node.js", "Express", "RabbitMQ", "TCP", "Socket.IO", "MongoDB", "Vue.js", "Quasar", "Google Maps"],
    code: [],
    description: {
      en: "Enterprise vehicle telemetry platform developed at Wikidados, a company specializing in fleet monitoring solutions. Features real-time vehicle tracking on interactive maps, driver behavior analysis, fuel consumption reports, event logging, and a fully responsive admin dashboard.",
      pt: "Plataforma empresarial de telemetria veicular desenvolvida na Wikidados, empresa especializada em monitoramento de frotas. Funcionalidades incluem rastreamento em tempo real em mapas interativos, análise de comportamento do motorista, relatórios de consumo de combustível, registro de eventos e painel administrativo responsivo.",
    },
  },
  {
    name: "Chess",
    site: "https://chess.kuuhaku.dev",
    image: "/projects/chess.webp",
    accent: "#a78bfa",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Zustand", "Stockfish", "WebSocket", "Node.js", "Express"],
    code: [
      { label: "Front-end", href: "https://github.com/WorstOne0/chess-front" },
      { label: "Back-end", href: "https://github.com/WorstOne0/chess-backend" },
    ],
    description: {
      en: "Chess against Stockfish, running in the player's own browser, or against a friend in a private room shared by link, QR code or a 6-letter code. Its own legal-move engine, clocks kept by the server, premoves, arrows, and results that play out on the kings.",
      pt: "Xadrez contra o Stockfish, rodando no próprio navegador do jogador, ou contra um amigo em uma sala privada compartilhada por link, QR code ou um código de 6 letras. Motor de regras próprio, relógios controlados pelo servidor, pré-movimentos, setas e resultados animados nos reis.",
    },
  },
];
