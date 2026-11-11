"use client";

import React, { useRef, useState } from "react";
import { usePresentationStore } from "@/products/gestao/lib/store";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetalButton } from "@/components/ui/MetalButton";
import { downloadExecutiveDossierPDF } from "@/products/gestao/lib/pdfGenerator";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Users,
  Wallet,
  HeartPulse,
  Share2,
  Trash2,
  CheckCircle2,
  Download,
  Loader2,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  FileText,
  Building2,
  Sparkles,
  Layers,
  Calendar,
  Instagram,
} from "lucide-react";

type StepId = "comercial" | "familiar" | "financas" | "saude" | "indicacoes";

const CRM_URL =
  "https://app.umbrellacrm.com.br/captacao/lft-administradora-e-corretora-de-seguros-de-vida-ltda";

export const Slide14Fechamento: React.FC = () => {
  const {
    client,
    updateClient,
    addDependent,
    removeDependent,
    addRecommendation,
    removeRecommendation,
  } = usePresentationStore();

  // Mode: "choose" (initial 2-option decision) or "system" (5-step internal form)
  const [fillMode, setFillMode] = useState<"choose" | "system">("choose");
  const [activeTab, setActiveTab] = useState<StepId>("comercial");

  const [newDep, setNewDep] = useState({ name: "", age: "", relationship: "" });
  const [newRec, setNewRec] = useState({ name: "", children: "", age: "", profession: "", phone: "" });

  const [isGenerating, setIsGenerating] = useState(false);
  const isGeneratingRef = useRef(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const steps: { id: StepId; number: number; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }[] = [
    { id: "comercial", number: 1, label: "Dados Comerciais", icon: User },
    { id: "familiar", number: 2, label: "Família", icon: Users, count: client.dependents?.length },
    { id: "financas", number: 3, label: "Finanças", icon: Wallet },
    { id: "saude", number: 4, label: "Saúde & Histórico", icon: HeartPulse },
    { id: "indicacoes", number: 5, label: "Indicações", icon: Share2, count: client.recommendations?.length },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === activeTab);

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setActiveTab(steps[currentStepIndex + 1].id);
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setActiveTab(steps[currentStepIndex - 1].id);
    }
  };

  const handleOpenCRM = () => {
    window.open(CRM_URL, "_blank", "noopener,noreferrer");
  };

  const handleAddDependent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDep.name.trim()) return;
    addDependent({
      name: newDep.name.trim(),
      age: newDep.age || 0,
      relationship: newDep.relationship.trim() || "Filho(a)",
    });
    setNewDep({ name: "", age: "", relationship: "" });
  };

  const handleAddRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRec.name.trim()) return;
    addRecommendation({
      name: newRec.name.trim(),
      children: newRec.children.trim(),
      age: newRec.age || "",
      profession: newRec.profession.trim(),
      phone: newRec.phone.trim(),
    });
    setNewRec({ name: "", children: "", age: "", profession: "", phone: "" });
  };

  const handleGenerateFinalReport = async () => {
    // Evita exportações simultâneas (duplo clique) que geravam arquivos duplicados
    if (isGeneratingRef.current) return;
    isGeneratingRef.current = true;
    setIsGenerating(true);
    try {
      const ok = await downloadExecutiveDossierPDF(client);
      if (!ok) throw new Error("falha na geração do documento");

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0072D5", "#61C3F9", "#0A182F", "#10B981", "#F59E0B"],
      });

      setShowSuccessModal(true);
    } catch (err) {
      alert("Erro ao exportar o PDF: " + String(err));
    } finally {
      isGeneratingRef.current = false;
      setIsGenerating(false);
    }
  };

  // =========================================================================
  // VIEW 1: Initial Screen (Single option - Preencher no Sistema)
  // =========================================================================
  if (fillMode === "choose") {
    return (
      <div className="w-full h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 max-w-5xl mx-auto overflow-y-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-9">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            Próxima Etapa • Fechamento
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent mt-2">
            Como deseja <span className="text-metal-shift">prosseguir?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            A lousa digital foi registrada. Continue abaixo para registrar os dados e finalizar o atendimento.
          </p>
        </div>

        {/* Single Centered Card */}
        <div className="max-w-lg mx-auto w-full">
          {/* Option 1: Preencher no Sistema */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex"
          >
            <GlassCard
              variant="glow"
              className="p-6 sm:p-8 w-full flex flex-col justify-between hover:border-primary/60 transition-all hover:scale-[1.02] group shadow-lg cursor-pointer bg-white"
              onClick={() => setFillMode("system")}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <FileText className="w-7 h-7" />
                </div>

                <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-0.5 rounded-full border border-primary/15 mb-2">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span>Dossiê Integrado</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold font-sora text-accent mb-2 group-hover:text-primary transition-colors">
                  Preencher dentro do Sistema
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Preencha os dados do cliente, finanças e perfil de saúde para gerar o <strong>Dossiê Executivo completo em PDF</strong> com o desenho da lousa anexado.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFillMode("system");
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Continuar no Sistema</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: System Form (5-Step Guided Flow + PDF Generator)
  // =========================================================================
  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 pt-3 sm:pt-4 pb-20 overflow-y-auto max-w-6xl mx-auto space-y-3">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <GlassCard variant="glow" className="max-w-md w-full p-6 text-center space-y-3 bg-white">
            <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold font-sora text-accent">
              Dossiê Executivo Exportado!
            </h3>

            <p className="text-xs text-slate-600">
              O arquivo PDF completo com a identidade oficial azul da LFT e diagnóstico patrimonial foi baixado com sucesso.
            </p>

            <div className="pt-2 flex justify-center gap-2">
              <MetalButton
                onClick={() => setShowSuccessModal(false)}
                variant="primary"
                size="md"
              >
                Concluir
              </MetalButton>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFillMode("choose")}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" /> Escolher Outra Opção
            </button>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Etapa {currentStepIndex + 1} de {steps.length}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-sora text-accent">
            Perfil do Cliente & Dossiê Executivo
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Export PDF */}
          <button
            onClick={handleGenerateFinalReport}
            disabled={isGenerating}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-primary hover:bg-primary-hover active:scale-95 text-white font-bold text-xs shadow-glow flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Download className="w-4 h-4 text-white" />
            )}
            <span>{isGenerating ? "Exportando PDF..." : "Exportar em PDF"}</span>
          </button>
        </div>
      </div>

      {/* Stepper Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeTab === step.id;
          const isPassed = idx < currentStepIndex;
          return (
            <button
              key={step.id}
              onClick={() => setActiveTab(step.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-primary text-white font-bold shadow-glow"
                  : isPassed
                  ? "bg-white text-primary border border-primary/20 hover:bg-slate-50 font-semibold"
                  : "text-slate-600 hover:text-accent hover:bg-slate-200/60"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isActive
                    ? "bg-white text-primary"
                    : isPassed
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {step.number}
              </span>
              <Icon className="w-3.5 h-3.5" />
              <span>{step.label}</span>
              {step.count !== undefined && step.count > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/30 text-current font-mono">
                  {step.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents Card */}
      <GlassCard variant="default" className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col justify-between">
        {/* ETAPA 1: DADOS COMERCIAIS */}
        {activeTab === "comercial" && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-accent font-sora flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                1. Dados Comerciais & Pessoais do Cliente
              </h3>
              <p className="text-xs text-slate-500">
                Preencha as informações básicas para personalização completa do dossiê.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Nome do cliente"
                  value={client.name || ""}
                  onChange={(e) => updateClient({ name: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Profissão / Cargo</label>
                <input
                  type="text"
                  placeholder="Ex: Cirurgião, Empresário..."
                  value={client.profession || ""}
                  onChange={(e) => updateClient({ profession: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Empresa / Holding</label>
                <input
                  type="text"
                  placeholder="Ex: Albuquerque Participações"
                  value={client.company || ""}
                  onChange={(e) => updateClient({ company: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail</label>
                <input
                  type="email"
                  placeholder="cliente@email.com"
                  value={client.email || ""}
                  onChange={(e) => updateClient({ email: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  placeholder="(11) 99999-9999"
                  value={client.phone || ""}
                  onChange={(e) => updateClient({ phone: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Instagram className="w-3 h-3 text-pink-600" />
                  Instagram (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: @cliente.oficial"
                  value={client.instagram || ""}
                  onChange={(e) => updateClient({ instagram: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cidade / Estado</label>
                <input
                  type="text"
                  placeholder="Ex: São Paulo - SP"
                  value={client.city || ""}
                  onChange={(e) => updateClient({ city: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-primary" />
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  value={client.birthDate || ""}
                  onChange={(e) => updateClient({ birthDate: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary placeholder-slate-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Estado Civil</label>
                <select
                  value={client.maritalStatus || ""}
                  onChange={(e) => updateClient({ maritalStatus: e.target.value as typeof client.maritalStatus })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary cursor-pointer"
                >
                  <option value="">Selecione...</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="União Estável">União Estável</option>
                  <option value="Solteiro(a)">Solteiro(a)</option>
                  <option value="Divorciado(a)">Divorciado(a)</option>
                  <option value="Viúvo(a)">Viúvo(a)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 2: FAMÍLIA & DEPENDENTES */}
        {activeTab === "familiar" && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-accent font-sora flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                2. Estrutura Familiar & Dependentes
              </h3>
              <p className="text-xs text-slate-500">
                Cadastre os filhos, cônjuge ou dependentes financeiros que devem ser protegidos.
              </p>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {(!client.dependents || client.dependents.length === 0) && (
                <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl text-xs text-slate-400">
                  Nenhum dependente cadastrado ainda. Use o formulário abaixo para adicionar.
                </div>
              )}

              {client.dependents?.map((dep) => (
                <div key={dep.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[11px]">
                      {dep.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-semibold text-accent block">{dep.name}</span>
                      <span className="text-[11px] text-slate-500">{dep.relationship}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-600 font-mono font-medium">{dep.age} anos</span>
                    <button
                      onClick={() => removeDependent(dep.id)}
                      className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddDependent} className="flex flex-wrap gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <input
                type="text"
                placeholder="Nome do dependente"
                value={newDep.name}
                onChange={(e) => setNewDep({ ...newDep, name: e.target.value })}
                className="flex-1 min-w-[160px] bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400"
              />
              <input
                type="number"
                placeholder="Idade"
                value={newDep.age}
                onChange={(e) => setNewDep({ ...newDep, age: e.target.value })}
                className="w-24 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400"
              />
              <input
                type="text"
                placeholder="Parentesco (ex: Filho)"
                value={newDep.relationship}
                onChange={(e) => setNewDep({ ...newDep, relationship: e.target.value })}
                className="w-36 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                + Adicionar
              </button>
            </form>
          </div>
        )}

        {/* ETAPA 3: FINANÇAS */}
        {activeTab === "financas" && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-accent font-sora flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-primary" />
                3. Finanças
              </h3>
              <p className="text-xs text-slate-500">
                Todos os campos são abertos: digite valores, texto ou os dois.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div>
                <label htmlFor="fin-monthlyIncome" className="block text-xs font-semibold text-slate-700 mb-1">Renda mensal</label>
                <input
                  id="fin-monthlyIncome"
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex: 35000"
                  value={client.monthlyIncome ?? ""}
                  onChange={(e) => updateClient({ monthlyIncome: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-accent font-mono placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="fin-monthlyExpenses" className="block text-xs font-semibold text-slate-700 mb-1">Despesas</label>
                <input
                  id="fin-monthlyExpenses"
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex: 25000"
                  value={client.monthlyExpenses ?? ""}
                  onChange={(e) => updateClient({ monthlyExpenses: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-accent font-mono placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="fin-inss" className="block text-xs font-semibold text-slate-700 mb-1">INSS / Pró-labore</label>
                <input
                  id="fin-inss"
                  type="text"
                  placeholder="Livre: valor, texto ou os dois. Ex: Teto INSS R$ 7.507 + pró-labore R$ 12.000"
                  value={client.inss ?? ""}
                  onChange={(e) => updateClient({ inss: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-accent  placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="fin-futureEducationExpenses" className="block text-xs font-semibold text-slate-700 mb-1">Educação dos filhos</label>
                <input
                  id="fin-futureEducationExpenses"
                  type="text"
                  placeholder="Ex: Escola R$ 4.500/mês + faculdade"
                  value={client.futureEducationExpenses ?? ""}
                  onChange={(e) => updateClient({ futureEducationExpenses: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-accent  placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="fin-pensionPrivate" className="block text-xs font-semibold text-slate-700 mb-1">Previdência</label>
                <input
                  id="fin-pensionPrivate"
                  type="text"
                  placeholder="Ex: PGBL R$ 200.000 acumulados, aporte de R$ 1.500/mês"
                  value={client.pensionPrivate ?? ""}
                  onChange={(e) => updateClient({ pensionPrivate: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-accent  placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="fin-cardsAndBanks" className="block text-xs font-semibold text-slate-700 mb-1">Bandeira do cartão</label>
                <input
                  id="fin-cardsAndBanks"
                  type="text"
                  placeholder="Ex: Visa Infinite, Mastercard Black, Amex"
                  value={client.cardsAndBanks ?? ""}
                  onChange={(e) => updateClient({ cardsAndBanks: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-accent  placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                />
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 4: SAÚDE & HISTÓRICO FAMILIAR */}
        {activeTab === "saude" && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-accent font-sora flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-primary" />
                4. Perfil de Saúde, Subscrição & Histórico Familiar
              </h3>
              <p className="text-xs text-slate-500">
                Informações essenciais para a cotação médica precisa e sem ressalvas nas seguradoras.
              </p>
            </div>

            {/* Peso, Altura e IMC */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Peso (kg)</label>
                <input
                  type="number"
                  placeholder="Ex: 75"
                  value={client.weight || ""}
                  onChange={(e) => updateClient({ weight: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent font-mono placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Altura (cm)</label>
                <input
                  type="number"
                  placeholder="Ex: 175"
                  value={client.height || ""}
                  onChange={(e) => updateClient({ height: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent font-mono placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">IMC Calculado</label>
                <div className="w-full bg-white border border-primary/40 rounded-xl px-3 py-2 text-xs font-mono font-bold text-primary flex items-center justify-between">
                  <span>{client.imc ? `${client.imc} kg/m²` : "Aguardando peso/altura"}</span>
                </div>
              </div>
            </div>

            {/* Perguntas Médicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Já teve ou tem algum problema de saúde?
                </label>
                <textarea
                  rows={2}
                  value={client.hasHealthIssues || ""}
                  onChange={(e) => updateClient({ hasHealthIssues: e.target.value })}
                  placeholder="Descreva diagnósticos, cirurgias ou histórico médico..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Faz uso de medicamento contínuo?
                </label>
                <textarea
                  rows={2}
                  value={client.usesMedications || ""}
                  onChange={(e) => updateClient({ usesMedications: e.target.value })}
                  placeholder="Nome dos medicamentos, dosagem e frequência..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary placeholder-slate-400"
                />
              </div>

              {/* Fumante */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700 block">Fumante?</span>
                  <span className="text-[11px] text-slate-500">Cigarro, vape ou similares</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateClient({ isSmoker: "Sim" })}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      client.isSmoker === "Sim"
                        ? "bg-red-600 text-white shadow-sm"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => updateClient({ isSmoker: "Não" })}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      client.isSmoker === "Não"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Não
                  </button>
                </div>
              </div>

              {/* Pai e Mãe vivos */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700 block">Pai e Mãe vivos?</span>
                  <span className="text-[11px] text-slate-500">Histórico de longevidade dos genitores</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateClient({ parentsAlive: "Sim" })}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      client.parentsAlive === "Sim"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => updateClient({ parentsAlive: "Não" })}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      client.parentsAlive === "Não"
                        ? "bg-primary text-white shadow-sm"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Não
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Estilo de vida / Pratica esportes de risco?
                </label>
                <input
                  type="text"
                  value={client.riskSportsOrHobbies || ""}
                  onChange={(e) => updateClient({ riskSportsOrHobbies: e.target.value })}
                  placeholder="Ex: Ciclismo de estrada, mergulho, paraquedismo..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Os pais possuem algum problema de saúde?
                </label>
                <input
                  type="text"
                  value={client.parentsHealthIssues || ""}
                  onChange={(e) => updateClient({ parentsHealthIssues: e.target.value })}
                  placeholder="Ex: Histórico cardíaco, hipertensão, diabetes..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary placeholder-slate-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 5: INDICAÇÕES / CÍRCULO DE CONFIANÇA */}
        {activeTab === "indicacoes" && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-accent font-sora flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-primary" />
                5. Círculo de Confiança & Indicações
              </h3>
              <p className="text-xs text-slate-500">
                Pessoas de confiança recomendadas para também receberem o planejamento patrimonial LFT.
              </p>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {(!client.recommendations || client.recommendations.length === 0) && (
                <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl text-xs text-slate-400">
                  Nenhuma indicação cadastrada ainda. Adicione contatos importantes abaixo.
                </div>
              )}

              {client.recommendations?.map((rec) => (
                <div key={rec.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs shadow-xs">
                  <div>
                    <span className="font-semibold text-accent block">{rec.name}</span>
                    <span className="text-[11px] text-slate-500">
                      {rec.profession || "Profissional"} {rec.children ? `• Filhos: ${rec.children} (${rec.age}a)` : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-primary font-mono font-bold">{rec.phone}</span>
                    <button
                      onClick={() => removeRecommendation(rec.id)}
                      className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddRecommendation} className="flex flex-wrap gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <input
                type="text"
                placeholder="Nome do contato"
                value={newRec.name}
                onChange={(e) => setNewRec({ ...newRec, name: e.target.value })}
                className="flex-1 min-w-[140px] bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400"
              />
              <input
                type="text"
                placeholder="Profissão"
                value={newRec.profession}
                onChange={(e) => setNewRec({ ...newRec, profession: e.target.value })}
                className="w-32 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400"
              />
              <input
                type="text"
                placeholder="Telefone"
                value={newRec.phone}
                onChange={(e) => setNewRec({ ...newRec, phone: e.target.value })}
                className="w-32 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent font-mono placeholder-slate-400"
              />
              <input
                type="text"
                placeholder="Filhos / Idade"
                value={newRec.children}
                onChange={(e) => setNewRec({ ...newRec, children: e.target.value })}
                className="w-28 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                + Adicionar
              </button>
            </form>
          </div>
        )}

        {/* Step Navigation Bottom Bar */}
        <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
          <div>
            {currentStepIndex > 0 ? (
              <button
                type="button"
                onClick={goToPrevStep}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setFillMode("choose")}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Opções de Preenchimento</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStepIndex < steps.length - 1 ? (
              <button
                type="button"
                onClick={goToNextStep}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-glow flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <span>Próximo</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGenerateFinalReport}
                disabled={isGenerating}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-glow flex items-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Download className="w-4 h-4 text-white" />
                <span>{isGenerating ? "Exportando..." : "Exportar em PDF"}</span>
              </button>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
