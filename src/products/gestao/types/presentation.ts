export interface Dependent {
  id: string;
  name: string;
  age: number | string;
  relationship: string;
}

export interface ActiveInsurance {
  id: string;
  insurer: string;
  insuredCapital: number | string;
  monthlyContribution: number | string;
  notes?: string;
}

export interface Recommendation {
  id: string;
  name: string;
  children: string;
  age: number | string;
  profession: string;
  phone: string;
  notes?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Diretoria" | "Comercial" | "Administrativo" | "Gestão" | "Marketing" | "TI";
  image: string;
  bio?: string;
}

export interface ClientProfile {
  // Setup inicial do corretor
  brokerName: string;
  name: string;
  profession: string;
  company?: string;
  clientPhotoUrl?: string;
  mainGoal?: string;

  // 1. Dados Pessoais
  birthDate?: string; // Data de Nascimento (DD/MM/AAAA ou YYYY-MM-DD)
  email: string;
  phone: string;
  instagram?: string; // Redes Sociais: Instagram (opcional)
  city: string;
  state: string;
  address: string;
  cep: string;
  maritalStatus: "Solteiro(a)" | "Casado(a)" | "União Estável" | "Divorciado(a)" | "Viúvo(a)" | "";

  // 2. Perfil Familiar
  dependents: Dependent[];
  clientAge?: number | string;
  clientDependentsSummary?: string;

  // 3. Finanças (campos abertos: aceitam número ou texto livre)
  monthlyIncome?: number | string; // Renda mensal
  monthlyExpenses: number | string; // Despesas
  expensePercentage?: number | string; // % das Despesas
  futureEducationExpenses: number | string; // Educação / gastos com os filhos
  pensionPrivate: number | string; // Previdência
  inss: number | string; // INSS / Pró-labore (campo totalmente aberto)
  proLabore: number | string; // legado (mantido para dados antigos)
  cardsAndBanks: string; // Bandeira do cartão
  emergencyFundMonths?: number | string;

  // 4. Seguros Ativos
  activeInsurances: ActiveInsurance[];

  // 5. Saúde e Histórico Familiar (Perguntas Detalhadas)
  weight: number | string; // kg
  height: number | string; // cm
  imc?: number | string;
  hasHealthIssues: string; // Já teve ou tem algum problema de saúde?
  usesMedications: string; // Faz uso de medicamento?
  isSmoker: "Sim" | "Não" | ""; // Fumante?
  riskSportsOrHobbies: string; // Pratica algum esporte ou hobbie de risco?
  parentsAlive: "Sim" | "Não" | ""; // Pai e Mãe vivos?
  parentsHealthIssues: string; // Os pais possuem algum problema de saúde?

  // 6. Recomendações
  recommendations: Recommendation[];

  // Canvas / Dossiê
  canvasDrawingData?: string;
  notes?: string;
  createdAt: string;
}
