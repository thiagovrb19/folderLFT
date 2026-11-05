export interface Dependent {
  id: string;
  name: string;
  age: number | string;
  relationship: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Diretoria" | "Comercial" | "Administrativo" | "Gestão" | "Marketing" | "TI";
  image: string;
  bio?: string;
}

export type SlideId =
  | "welcome"
  | "hero"
  | "autoridade"
  | "premiacoes"
  | "team"
  | "consorcio-oque-e"
  | "contemplacao"
  | "vantagens"
  | "parceiros"
  | "fechamento";

export interface SlideDefinition {
  id: SlideId;
  label: string;
  category: "Institucional" | "Consórcio" | "Fechamento";
  description: string;
  iconName: string;
}

export const DEFAULT_SLIDE_ORDER: SlideId[] = [
  "welcome",
  "hero",
  "autoridade",
  "premiacoes",
  "team",
  "consorcio-oque-e",
  "contemplacao",
  "vantagens",
  "parceiros",
  "fechamento",
];

export const SLIDE_DEFINITIONS: Record<SlideId, SlideDefinition> = {
  welcome: {
    id: "welcome",
    label: "Boas-Vindas",
    category: "Institucional",
    description: "Recepção VIP com foto e dados exclusivos do cliente",
    iconName: "UserCheck",
  },
  hero: {
    id: "hero",
    label: "Início & Capa",
    category: "Institucional",
    description: "Capa institucional LFT Gestão de Risco e Planejamento",
    iconName: "Award",
  },
  autoridade: {
    id: "autoridade",
    label: "Nossa Trajetória",
    category: "Institucional",
    description: "Métricas de autoridade: 2000+ clientes, R$ 5Mi+ e Top 1% Global",
    iconName: "ShieldCheck",
  },
  premiacoes: {
    id: "premiacoes",
    label: "Premiações",
    category: "Institucional",
    description: "Reconhecimentos globais, MDRT/TOT, convenções Chicago, Orlando e NY",
    iconName: "Trophy",
  },
  team: {
    id: "team",
    label: "Nosso Time",
    category: "Institucional",
    description: "Equipe multidisciplinar, diretoria, Thiago Nunes e suporte LFT",
    iconName: "Users",
  },
  "consorcio-oque-e": {
    id: "consorcio-oque-e",
    label: "O que é Consórcio",
    category: "Consórcio",
    description: "Fundamentos da compra coletiva planejada e economia sem juros",
    iconName: "Layers",
  },
  contemplacao: {
    id: "contemplacao",
    label: "Como ser Contemplado",
    category: "Consórcio",
    description: "Formas estratégicas: Sorteio e Lance Fixo",
    iconName: "Gift",
  },
  vantagens: {
    id: "vantagens",
    label: "Vantagens & Conquistas",
    category: "Consórcio",
    description: "O que planejar (Imóveis, Frotas, Serviços) e diferenciais",
    iconName: "Sparkles",
  },
  parceiros: {
    id: "parceiros",
    label: "Parceiros Consórcios",
    category: "Consórcio",
    description: "Principais administradoras do Brasil (Itaú, Rodobens, BB, etc.)",
    iconName: "Building2",
  },
  fechamento: {
    id: "fechamento",
    label: "Ficha Cadastral",
    category: "Fechamento",
    description: "Cadastro de Pessoa Física e exportação de Dossiê Executivo PDF",
    iconName: "SendHorizontal",
  },
};

export interface ClientProfile {
  // Setup inicial do consultor
  brokerName: string;
  name: string;
  profession: string;
  company?: string;
  clientPhotoUrl?: string;
  mainGoal?: string;

  // DADOS PESSOA FÍSICA
  cpf: string;
  rg: string;
  orgaoExpedidor: string;
  dataNascimento: string;
  sexo: string;
  nacionalidade: string;
  renda: string | number;
  cidadeNascimento: string;
  nomeMae: string;
  estadoCivil: string;
  nomeConjuge?: string;
  cpfConjuge?: string;

  // Contato & Endereço
  celular: string;
  phone?: string;
  email: string;
  cep: string;
  rua: string;
  bairro: string;
  cidadeEstado: string;
  city?: string;
  state?: string;

  notes?: string;
  createdAt: string;
}
