"use client";

import React, { useState, useEffect } from "react";
import { usePresentationStore } from "@/products/consorcios/lib/store";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetalButton } from "@/components/ui/MetalButton";
import { downloadExecutiveDossierPDF } from "@/products/consorcios/lib/pdfGenerator";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  DollarSign,
  Heart,
  FileText,
  Download,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Search,
  Sparkles,
  Info,
} from "lucide-react";

export const Slide14Fechamento: React.FC = () => {
  const { client, updateClient } = usePresentationStore();

  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  // Masks
  const formatCPF = (v: string) => {
    return v
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const formatPhone = (v: string) => {
    return v
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2")
      .slice(0, 15);
  };

  const formatCEP = (v: string) => {
    return v
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  const handleCepLookup = async (rawCep: string) => {
    const cleanCep = rawCep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          updateClient({
            rua: data.logradouro || client.rua,
            bairro: data.bairro || client.bairro,
            cidadeEstado: data.localidade && data.uf ? `${data.localidade} - ${data.uf}` : client.cidadeEstado,
            city: data.localidade,
            state: data.uf,
          });
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleGenerateFinalReport = async () => {
    setIsGenerating(true);
    try {
      const ok = await downloadExecutiveDossierPDF(client);
      if (!ok) throw new Error("falha na geração do documento");

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0072D5", "#61C3F9", "#0A182F", "#10B981", "#F59E0B"],
      });

      setShowSuccessModal(true);
    } catch (err) {
      alert("Erro ao exportar o PDF: " + String(err));
    } finally {
      setIsGenerating(false);
    }
  };

  const isMarriedOrStable =
    client.estadoCivil === "Casado(a)" || client.estadoCivil === "União Estável";

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 pt-3 sm:pt-4 pb-20 overflow-y-auto max-w-6xl mx-auto space-y-4">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <GlassCard variant="glow" className="max-w-md w-full p-6 text-center space-y-3 bg-white">
            <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold font-sora text-accent">
              Dossiê Cadastral Exportado!
            </h3>

            <p className="text-xs text-slate-600">
              A Ficha Cadastral e Dossiê de Consórcio de <strong>{client.name || "Pessoa Física"}</strong> foi gerada em PDF com a identidade oficial da LFT.
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

      {/* Header Bar with Action Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Fechamento & Proposta</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-sora text-accent">
            Ficha Cadastral • Dados Pessoa Física
          </h2>
          <p className="text-xs text-slate-500">
            Preencha os dados do cliente para registro da proposta de consórcio e emissão do PDF executivo.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* CRM Button (Placeholder / Disabled until link is provided) */}
          <button
            type="button"
            onClick={() => alert("O link de captação do CRM será inserido em breve pelo administrador.")}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs border border-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
            title="Link de Captação CRM (Em breve)"
          >
            <ExternalLink className="w-3.5 h-3.5 text-primary" />
            <span>Link CRM (Em breve)</span>
          </button>

          {/* Export PDF */}
          <button
            onClick={handleGenerateFinalReport}
            disabled={isGenerating}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover active:scale-95 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
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

      {/* Main Form Content */}
      <GlassCard variant="default" className="p-4 sm:p-6 bg-white space-y-5 overflow-y-auto">
        {/* SEÇÃO 1: DADOS PESSOAIS */}
        <div>
          <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5 pb-1 border-b border-slate-200">
            <User className="w-4 h-4" />
            1. Identificação Pessoal
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {/* CPF */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CPF *
              </label>
              <input
                type="text"
                placeholder="000.000.000-00"
                value={client.cpf || ""}
                onChange={(e) => updateClient({ cpf: formatCPF(e.target.value) })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent font-mono placeholder-slate-400 focus:border-primary focus:outline-none"
              />
            </div>

            {/* Nome Completo */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                placeholder="Nome completo do proponente"
                value={client.name || ""}
                onChange={(e) => updateClient({ name: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400 focus:border-primary focus:outline-none font-medium"
              />
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Data de Nascimento *
              </label>
              <input
                type="date"
                value={client.dataNascimento || ""}
                onChange={(e) => updateClient({ dataNascimento: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary focus:outline-none"
              />
            </div>

            {/* Sexo */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sexo *
              </label>
              <select
                value={client.sexo || ""}
                onChange={(e) => updateClient({ sexo: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="">Selecione...</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            {/* RG */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                RG *
              </label>
              <input
                type="text"
                placeholder="Ex: 12.345.678-9"
                value={client.rg || ""}
                onChange={(e) => updateClient({ rg: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400 focus:border-primary focus:outline-none"
              />
            </div>

            {/* Órgão Expedidor */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Órgão Expedidor *
              </label>
              <input
                type="text"
                placeholder="Ex: SSP/SP, DETRAN..."
                value={client.orgaoExpedidor || ""}
                onChange={(e) => updateClient({ orgaoExpedidor: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400 focus:border-primary focus:outline-none"
              />
            </div>

            {/* Nacionalidade */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nacionalidade
              </label>
              <input
                type="text"
                placeholder="Ex: Brasileira"
                value={client.nacionalidade || "Brasileira"}
                onChange={(e) => updateClient({ nacionalidade: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400 focus:border-primary focus:outline-none"
              />
            </div>

            {/* Cidade de Nascimento (Naturalidade) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cidade de Nascimento *
              </label>
              <input
                type="text"
                placeholder="Ex: São Paulo - SP"
                value={client.cidadeNascimento || ""}
                onChange={(e) => updateClient({ cidadeNascimento: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400 focus:border-primary focus:outline-none"
              />
            </div>

            {/* Nome da Mãe */}
            <div className="sm:col-span-2 md:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome da Mãe *
              </label>
              <input
                type="text"
                placeholder="Nome completo da mãe"
                value={client.nomeMae || ""}
                onChange={(e) => updateClient({ nomeMae: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400 focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SEÇÃO 2: PROFISSÃO, RENDA & ESTADO CIVIL */}
        <div>
          <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5 pb-1 border-b border-slate-200">
            <Briefcase className="w-4 h-4" />
            2. Profissão, Renda & Estado Civil
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {/* Profissão */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Profissão / Cargo *
              </label>
              <input
                type="text"
                placeholder="Ex: Médico Cirurgião, Empresário..."
                value={client.profession || ""}
                onChange={(e) => updateClient({ profession: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400 focus:border-primary focus:outline-none"
              />
            </div>

            {/* Renda Mensal */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Renda Mensal Declarada (R$) *
              </label>
              <input
                type="text"
                placeholder="Ex: 35.000,00"
                value={client.renda || ""}
                onChange={(e) => updateClient({ renda: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent font-mono placeholder-slate-400 focus:border-primary focus:outline-none font-semibold"
              />
            </div>

            {/* Estado Civil */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estado Civil *
              </label>
              <select
                value={client.estadoCivil || ""}
                onChange={(e) => updateClient({ estadoCivil: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="">Selecione...</option>
                <option value="Solteiro(a)">Solteiro(a)</option>
                <option value="Casado(a)">Casado(a)</option>
                <option value="União Estável">União Estável</option>
                <option value="Divorciado(a)">Divorciado(a)</option>
                <option value="Viúvo(a)">Viúvo(a)</option>
              </select>
            </div>
          </div>

          {/* Se Casado / União Estável: Cônjuge */}
          {isMarriedOrStable && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 p-3.5 rounded-2xl bg-slate-50 border border-primary/20 space-y-2"
            >
              <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-primary" />
                Dados do Cônjuge (Obrigatório para Casado / União Estável)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome Completo do Cônjuge *
                  </label>
                  <input
                    type="text"
                    placeholder="Nome completo do cônjuge"
                    value={client.nomeConjuge || ""}
                    onChange={(e) => updateClient({ nomeConjuge: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CPF do Cônjuge *
                  </label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={client.cpfConjuge || ""}
                    onChange={(e) => updateClient({ cpfConjuge: formatCPF(e.target.value) })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent font-mono placeholder-slate-400 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* SEÇÃO 3: CONTATO E ENDEREÇO */}
        <div>
          <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5 pb-1 border-b border-slate-200">
            <MapPin className="w-4 h-4" />
            3. Contato & Endereço Residencial
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {/* Celular */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Celular / WhatsApp *
              </label>
              <input
                type="text"
                placeholder="(00) 00000-0000"
                value={client.celular || client.phone || ""}
                onChange={(e) => {
                  const val = formatPhone(e.target.value);
                  updateClient({ celular: val, phone: val });
                }}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent font-mono placeholder-slate-400 focus:border-primary focus:outline-none"
              />
            </div>

            {/* E-mail */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                E-mail *
              </label>
              <input
                type="email"
                placeholder="cliente@email.com"
                value={client.email || ""}
                onChange={(e) => updateClient({ email: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400 focus:border-primary focus:outline-none"
              />
            </div>

            {/* CEP */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span>CEP *</span>
                {loadingCep && <span className="text-[10px] text-primary">Buscando...</span>}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="00000-000"
                  value={client.cep || ""}
                  onChange={(e) => {
                    const val = formatCEP(e.target.value);
                    updateClient({ cep: val });
                    handleCepLookup(val);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent font-mono placeholder-slate-400 focus:border-primary focus:outline-none pr-8"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Rua / Avenida */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rua / Avenida & Número *
              </label>
              <input
                type="text"
                placeholder="Ex: Av. Paulista, 1000 - Apto 12"
                value={client.rua || ""}
                onChange={(e) => updateClient({ rua: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400 focus:border-primary focus:outline-none"
              />
            </div>

            {/* Bairro */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bairro *
              </label>
              <input
                type="text"
                placeholder="Ex: Bela Vista"
                value={client.bairro || ""}
                onChange={(e) => updateClient({ bairro: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400 focus:border-primary focus:outline-none"
              />
            </div>

            {/* Cidade / Estado */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cidade / Estado *
              </label>
              <input
                type="text"
                placeholder="Ex: São Paulo - SP"
                value={client.cidadeEstado || client.city || ""}
                onChange={(e) => updateClient({ cidadeEstado: e.target.value, city: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-accent placeholder-slate-400 focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Button at bottom of card */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Consultor LFT: <strong className="text-accent">{client.brokerName || "Thiago Nunes"}</strong></span>
          </div>

          <button
            type="button"
            onClick={handleGenerateFinalReport}
            disabled={isGenerating}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-primary hover:bg-primary-hover active:scale-95 text-white font-bold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Download className="w-4 h-4 text-white" />
            )}
            <span>{isGenerating ? "Gerando Ficha Executiva..." : "Gerar e Baixar PDF da Ficha Cadastral"}</span>
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
