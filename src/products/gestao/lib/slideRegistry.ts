import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Users,
  MapPin,
  Trophy,
  Target,
  Briefcase,
  Layers,
  Globe2,
  PenTool,
  SendHorizontal,
  LucideIcon,
} from "lucide-react";

export type SlideId =
  | "hero"
  | "welcome"
  | "autoridade"
  | "team"
  | "timesSquare"
  | "premiacoes"
  | "ondeAtuamos"
  | "solucoes"
  | "parceiros"
  | "casos"
  | "realidade"
  | "canvas"
  | "fechamento";

export interface SlideConfig {
  id: SlideId;
  title: string;
  shortLabel: string;
  category: string;
  description: string;
  icon: LucideIcon;
}

export const ALL_AVAILABLE_SLIDES: SlideConfig[] = [
  {
    id: "hero",
    title: "Banner Inicial",
    shortLabel: "Início",
    category: "Abertura",
    description: "Capa institucional com logotipo LFT e botão de início",
    icon: Award,
  },
  {
    id: "welcome",
    title: "Boas-Vindas Personalizada",
    shortLabel: "Boas-Vindas",
    category: "Recepção",
    description: "Recepção exclusiva com nome, foto e dados do cliente",
    icon: CheckCircle2,
  },
  {
    id: "autoridade",
    title: "Autoridade & Solidez LFT",
    shortLabel: "Autoridade",
    category: "Institucional",
    description: "MDRT, TOT, números de mercado e posicionamento de elite",
    icon: ShieldCheck,
  },
  {
    id: "team",
    title: "Nosso Time de Especialistas",
    shortLabel: "Nosso Time",
    category: "Equipe",
    description: "Apresentação da equipe multidisciplinar LFT",
    icon: Users,
  },
  {
    id: "timesSquare",
    title: "Times Square NYC",
    shortLabel: "Times Square",
    category: "Reconhecimento",
    description: "Destaque internacional nos telões de Nova York",
    icon: MapPin,
  },
  {
    id: "premiacoes",
    title: "Premiações Globais & Viagens",
    shortLabel: "Premiações",
    category: "Conquistas",
    description: "Reconhecimento e viagens internacionais das seguradoras",
    icon: Trophy,
  },
  {
    id: "ondeAtuamos",
    title: "Onde Atuamos",
    shortLabel: "Onde Atuamos",
    category: "Atuação",
    description: "Cobertura geográfica nacional e atendimento consultivo",
    icon: Briefcase,
  },
  {
    id: "solucoes",
    title: "Nossas Soluções",
    shortLabel: "Soluções",
    category: "Portfólio",
    description: "Soluções completas de seguros de vida e planejamento",
    icon: Layers,
  },
  {
    id: "parceiros",
    title: "Parceiros Seguradoras",
    shortLabel: "Seguradoras",
    category: "Parcerias",
    description: "Prudential, Omint, MAG, Azos, Centauro-ON",
    icon: ShieldCheck,
  },
  {
    id: "casos",
    title: "Casos Reais & Liquidez",
    shortLabel: "Casos Reais",
    category: "Experiência",
    description: "Sinistros e indenizações pagas com agilidade comprovada",
    icon: CheckCircle2,
  },
  {
    id: "realidade",
    title: "Choque de Realidade",
    shortLabel: "Realidade",
    category: "Conscientização",
    description: "Comparativo de proteção familiar: Brasil vs Mundo",
    icon: Globe2,
  },
  {
    id: "canvas",
    title: "Lousa Digital / Gráfico",
    shortLabel: "Lousa Digital",
    category: "Planejamento",
    description: "Quadro interativo para estruturar o planejamento do cliente",
    icon: PenTool,
  },
  {
    id: "fechamento",
    title: "Dossiê Executivo & Fechamento",
    shortLabel: "Dossiê Final",
    category: "Fechamento",
    description: "Formulário comercial, perfil e geração do Dossiê em PDF",
    icon: SendHorizontal,
  },
];

export const DEFAULT_SLIDE_ORDER: SlideId[] = [
  "hero",
  "welcome",
  "autoridade",
  "team",
  "timesSquare",
  "premiacoes",
  "ondeAtuamos",
  "solucoes",
  "parceiros",
  "casos",
  "realidade",
  "canvas",
  "fechamento",
];

export const getSlideConfig = (id: SlideId): SlideConfig => {
  return (
    ALL_AVAILABLE_SLIDES.find((s) => s.id === id) || ALL_AVAILABLE_SLIDES[0]
  );
};
