"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  HelpCircle,
  Gift,
  CheckCircle2,
  Sparkles,
  Home,
  Car,
  Briefcase,
  Layers,
  ArrowRight,
  TrendingDown,
  Users,
  ShieldCheck,
  Zap,
  Percent,
  Coins,
} from "lucide-react";

type TabKey = "o-que-e" | "contemplacao" | "vantagens";

export const SlideConsorcioDidatico: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("o-que-e");

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "o-que-e", label: "O que é?", icon: HelpCircle },
    { key: "contemplacao", label: "Como ser Contemplado?", icon: Gift },
    { key: "vantagens", label: "Vantagens & Conquistas", icon: Sparkles },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-6xl mx-auto overflow-y-auto space-y-3">
      {/* Top Header & Tab Navigation */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
          <Layers className="w-3.5 h-3.5" />
          <span>Planejamento Inteligente</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent tracking-tight">
          Entenda o <span className="text-metal-shift">Consórcio</span>
        </h2>

        {/* 3 Prominent Tabs */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 max-w-lg mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-glow"
                    : "text-slate-600 hover:text-accent hover:bg-white/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Cards with smooth transitions */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* ========================================================================= */}
          {/* ABA 1: O QUE É? */}
          {/* ========================================================================= */}
          {activeTab === "o-que-e" && (
            <motion.div
              key="o-que-e"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto h-full"
            >
              {/* Card 1: Compra Coletiva Planejada */}
              <GlassCard variant="glow" className="p-5 sm:p-7 flex flex-col justify-between bg-white group hover:border-primary/50 transition-all">
                <div className="space-y-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold font-sora text-accent">
                    O que é consórcio?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    É uma <strong>compra coletiva planejada</strong>. Um grupo de pessoas se une com o mesmo objetivo (como comprar um imóvel ou veículo) e contribui mensalmente com um valor fixo.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A cada mês, esse fundo comum arrecadado contempla um ou mais participantes para receberem o valor total do bem. <strong>Todo mundo é contemplado até o encerramento do grupo.</strong>
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-primary font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Fundo Comum Seguro e Fiscalizado</span>
                </div>
              </GlassCard>

              {/* Card 2: Sem Juros, Economia Real */}
              <GlassCard variant="default" className="p-5 sm:p-7 flex flex-col justify-between bg-white group hover:border-emerald-500/50 transition-all">
                <div className="space-y-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                    <Percent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold font-sora text-accent">
                    Sem juros, com economia real
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    No consórcio, <strong>você não paga juros de financiamento</strong> bancário abusivo.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Existe apenas uma <strong>taxa de administração fixa diluída</strong> ao longo de todo o plano, o que torna o custo final <strong>muito menor</strong> em comparação a qualquer linha de crédito tradicional.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700 font-bold">
                  <TrendingDown className="w-4 h-4" />
                  <span>Custo financeiro até 70% menor que financiamentos</span>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* ABA 2: COMO VOCÊ É CONTEMPLADO? */}
          {/* ========================================================================= */}
          {activeTab === "contemplacao" && (
            <motion.div
              key="contemplacao"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 max-w-5xl mx-auto"
            >
              <div className="text-center pb-1">
                <h3 className="text-lg sm:text-xl font-extrabold font-sora text-accent">
                  Como ter acesso à carta de crédito?
                </h3>
                <p className="text-xs text-slate-500">
                  Existem 3 formas estratégicas e seguras de contemplação mensal no grupo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                {/* 1. Por Sorteio */}
                <GlassCard variant="default" className="p-4 sm:p-5 flex flex-col justify-between bg-white hover:border-primary/50 transition-all group">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Gift className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
                      Mensal & Transparente
                    </span>
                    <h4 className="text-base font-bold font-sora text-accent">
                      Por Sorteio
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Todo mês você concorre de forma justa e transparente com todos os participantes ativos daquele grupo pela Loteria Federal.
                    </p>
                  </div>
                </GlassCard>

                {/* 2. Por Lance */}
                <GlassCard variant="glow" className="p-4 sm:p-5 flex flex-col justify-between bg-white hover:border-primary/60 transition-all group">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                      Aceleração
                    </span>
                    <h4 className="text-base font-bold font-sora text-accent">
                      Por Lance
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Quer antecipar a compra? Você pode oferecer um adiantamento de parcelas (o lance). O maior percentual leva a carta de crédito naquele mês.
                    </p>
                  </div>
                </GlassCard>

                {/* 3. Lance Embutido */}
                <GlassCard variant="default" className="p-4 sm:p-5 flex flex-col justify-between bg-white hover:border-emerald-500/50 transition-all group">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Coins className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Sem Desembolso
                    </span>
                    <h4 className="text-base font-bold font-sora text-accent">
                      Lance Embutido
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Você pode usar uma parte da própria carta de crédito para dar o lance, sem precisar tirar dinheiro do bolso na hora da oferta.
                    </p>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* ABA 3: VANTAGENS & O QUE VOCÊ QUER CONQUISTAR? */}
          {/* ========================================================================= */}
          {activeTab === "vantagens" && (
            <motion.div
              key="vantagens"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 max-w-5xl mx-auto"
            >
              {/* 4 Vantagens Principais */}
              <div>
                <h3 className="text-sm font-bold text-accent font-sora mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Por que escolher o consórcio?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-primary/40 transition-all">
                    <span className="text-xs font-bold text-accent font-sora block mb-1">
                      💰 Poder de compra à vista
                    </span>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Com a carta de crédito na mão, você negocia descontos agressivos como se estivesse pagando em dinheiro vivo.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-primary/40 transition-all">
                    <span className="text-xs font-bold text-accent font-sora block mb-1">
                      🔄 Flexibilidade de escolha
                    </span>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Escolha imóvel, carro ou serviço de qualquer marca, modelo ou localização dentro da categoria contratada.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-primary/40 transition-all">
                    <span className="text-xs font-bold text-accent font-sora block mb-1">
                      📈 Disciplina financeira
                    </span>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Funciona como uma poupança programada de alta rentabilidade patrimonial sem risco de desvio de foco.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-primary/40 transition-all">
                    <span className="text-xs font-bold text-accent font-sora block mb-1">
                      🛡️ Segurança garantida
                    </span>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      O sistema de consórcios no Brasil é regulamentado e fiscalizado diretamente pelo <strong>Banco Central</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* O que você quer conquistar hoje? */}
              <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs sm:text-sm font-bold text-accent font-sora mb-2.5 text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  O que você quer conquistar hoje?
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3 hover:border-primary/50 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-accent font-sora block">Imóvel</span>
                      <span className="text-[10px] text-slate-500">Casa, apartamento, reforma ou construção</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3 hover:border-primary/50 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-accent font-sora block">Veículo</span>
                      <span className="text-[10px] text-slate-500">Carro novo, seminovo, moto ou pesado</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3 hover:border-primary/50 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-accent font-sora block">Serviços</span>
                      <span className="text-[10px] text-slate-500">Estética, viagens, estudos ou festas</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
