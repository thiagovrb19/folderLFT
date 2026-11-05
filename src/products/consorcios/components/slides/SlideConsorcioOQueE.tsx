"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Users,
  Percent,
  CheckCircle2,
  TrendingDown,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Coins,
  Sparkles,
} from "lucide-react";

export const SlideConsorcioOQueE: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 md:p-8 max-w-6xl mx-auto overflow-y-auto space-y-3 sm:space-y-4">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
          <Layers className="w-3.5 h-3.5" />
          <span>Etapa 01 • Fundamentos do Consórcio</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent tracking-tight">
          O que é <span className="text-metal-shift">Consórcio</span>?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          A união inteligente de pessoas com foco em alavancagem, aquisição de patrimônio e economia real sem juros bancários.
        </p>
      </div>

      {/* Main 2 Column Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto w-full">
        {/* Card 1: Compra Coletiva Planejada */}
        <GlassCard
          variant="glow"
          className="p-5 sm:p-7 flex flex-col justify-between bg-white border border-primary/30 shadow-md group hover:border-primary transition-all duration-300 rounded-3xl"
        >
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-1 rounded-full border border-primary/15 font-mono">
                Compra Coletiva
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold font-sora text-accent">
              Como funciona o grupo de consórcio?
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Trata-se de uma <strong>compra coletiva planejada</strong>. Um grupo de pessoas físicas ou jurídicas com objetivos similares se reúne e contribui mensalmente para formar um fundo comum.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Todo mês, o capital acumulado no grupo é utilizado para contemplar um ou mais consorciados com o valor integral da carta de crédito. <strong>Todos os participantes do grupo serão contemplados até o final do plano.</strong>
            </p>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                <ShieldCheck className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="text-[11px] font-bold text-accent block">100% Auditado</span>
                <span className="text-[9px] text-slate-500">Banco Central do Brasil</span>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                <Sparkles className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="text-[11px] font-bold text-accent block">Fundo Comum</span>
                <span className="text-[9px] text-slate-500">Patrimônio protegido</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-primary font-bold">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Segurança jurídica garantida pela Lei 11.795/2008</span>
          </div>
        </GlassCard>

        {/* Card 2: Sem Juros, Economia Real */}
        <GlassCard
          variant="default"
          className="p-5 sm:p-7 flex flex-col justify-between bg-white border border-slate-200 shadow-md group hover:border-emerald-500/60 transition-all duration-300 rounded-3xl"
        >
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Percent className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-mono">
                Economia Real
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold font-sora text-accent">
              Zero juros vs. Financiamento tradicional
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No consórcio, <strong>não existem juros compostos</strong> como nos financiamentos bancários convencionais, onde você chega a pagar o valor de 2 a 3 bens.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Existe apenas uma <strong>taxa de administração fixa e diluída</strong> ao longo de todos os meses, o que gera uma economia de <strong>até 70% no custo total</strong> da operação.
            </p>

            {/* Comparison Box */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Financiamento Bancário:</span>
                <span className="font-bold text-red-600">Juros de 12% a 18% a.a. + IOF</span>
              </div>
              <div className="h-px bg-emerald-200/60" />
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-accent">Consórcio LFT:</span>
                <span className="font-extrabold text-emerald-700">Taxa Fixa Prévia • Zero Juros</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700 font-bold">
            <TrendingDown className="w-4 h-4 flex-shrink-0" />
            <span>Poder de compra preservado com atualização anual da carta</span>
          </div>
        </GlassCard>
      </div>

      {/* Step Cycle Mini-Bar */}
      <div className="max-w-5xl mx-auto w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 hidden sm:flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-white font-bold text-[11px] flex items-center justify-center">1</span>
          <span className="font-semibold text-accent">Definição do Crédito</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-white font-bold text-[11px] flex items-center justify-center">2</span>
          <span className="font-semibold text-accent">Parcelas Mensais</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-white font-bold text-[11px] flex items-center justify-center">3</span>
          <span className="font-semibold text-accent">Contemplação</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center">4</span>
          <span className="font-semibold text-emerald-700">Compra à Vista com Desconto</span>
        </div>
      </div>
    </div>
  );
};
