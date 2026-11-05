"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Gift,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Coins,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";

export const SlideConsorcioContemplacao: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center p-3 sm:p-6 md:p-8 max-w-6xl mx-auto overflow-y-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
          <Gift className="w-3.5 h-3.5" />
          <span>Formas de Contemplação</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent tracking-tight">
          Como ser <span className="text-metal-shift">Contemplado</span>?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Existem 3 caminhos estratégicos, seguros e transparentes para acessar a sua carta de crédito todo mês.
        </p>
      </div>

      {/* 3 Prominent Strategy Cards (Sorteio, Lance Livre & Lance Fixo) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 max-w-5xl mx-auto w-full">
        {/* 1. Por Sorteio */}
        <GlassCard
          variant="default"
          className="p-5 sm:p-6 flex flex-col justify-between bg-white border border-slate-200/90 shadow-sm hover:border-primary/60 hover:shadow-md transition-all group rounded-3xl"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gift className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-0.5 rounded-full border border-primary/15 font-mono">
                Loteria Federal
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold font-sora text-accent">
              1. Por Sorteio
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Todos os meses, todos os consorciados ativos e com parcelas em dia concorrem em <strong>igualdade absoluta de condições</strong>.
            </p>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1 text-xs text-slate-700">
              <div className="flex items-center gap-1.5 font-bold text-accent">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Lisura & Transparência Total</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Auditado e vinculado aos números oficiais extraídos pela <strong>Loteria Federal</strong> da Caixa Econômica.
              </p>
            </div>
          </div>

          <div className="pt-3.5 mt-3 border-t border-slate-100 text-[11px] text-primary font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Chance real desde a 1ª assembleia</span>
          </div>
        </GlassCard>

        {/* 2. Por Lance Livre */}
        <GlassCard
          variant="glow"
          className="p-5 sm:p-6 flex flex-col justify-between bg-white border border-primary/40 shadow-md hover:border-primary hover:shadow-lg transition-all group rounded-3xl"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 font-mono">
                Oferta Livre
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold font-sora text-accent">
              2. Por Lance Livre
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Você define livremente o <strong>número de parcelas ou percentual</strong> que deseja adiantar com seus recursos próprios na assembleia.
            </p>

            <div className="bg-primary/5 border border-primary/15 rounded-xl p-3 space-y-1 text-xs text-slate-700">
              <div className="flex items-center gap-1.5 font-bold text-primary">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span>Maior Percentual Vence</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                O consorciado que ofertar o maior percentual proporcional à cota é contemplado com o crédito integral.
              </p>
            </div>
          </div>

          <div className="pt-3.5 mt-3 border-t border-slate-100 text-[11px] text-primary font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span>Abate parcelas futuras ou reduz o prazo</span>
          </div>
        </GlassCard>

        {/* 3. Por Lance Fixo */}
        <GlassCard
          variant="default"
          className="p-5 sm:p-6 flex flex-col justify-between bg-white border border-slate-200/90 shadow-sm hover:border-primary/60 hover:shadow-md transition-all group rounded-3xl"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Coins className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-0.5 rounded-full border border-primary/15 font-mono">
                Percentual Fixo
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold font-sora text-accent">
              3. Por Lance Fixo
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A administradora define um <strong>percentual fixo estipulado em contrato</strong> (ex: 20%, 30% ou 50% do valor do crédito) para oferta no grupo.
            </p>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1 text-xs text-slate-700">
              <div className="flex items-center gap-1.5 font-bold text-accent">
                <Target className="w-3.5 h-3.5 text-primary" />
                <span>Competição Equitativa</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Todos os consorciados que ofertam a mesma cota fixa concorrem entre si pelo desempate da Loteria Federal.
              </p>
            </div>
          </div>

          <div className="pt-3.5 mt-3 border-t border-slate-100 text-[11px] text-primary font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span>Previsibilidade total sem surpresas de valores</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
