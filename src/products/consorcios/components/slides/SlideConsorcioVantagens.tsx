"use client";

import React from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Sparkles,
  Home,
  Car,
  Briefcase,
  CheckCircle2,
  DollarSign,
  Shuffle,
  PiggyBank,
  ShieldCheck,
  KeyRound,
  ArrowRight,
} from "lucide-react";

export const SlideConsorcioVantagens: React.FC = () => {
  const goals = [
    {
      icon: Home,
      title: "Imóveis & Construção",
      subtitle: "Casa, apartamento, terreno, reforma ou imóvel comercial de alto padrão.",
      image: "/assets/conquistas/imovel-luxo.jpg",
      tag: "Residencial & Comercial",
    },
    {
      icon: Car,
      title: "Veículos & Frotas",
      subtitle: "Carros novos, seminovos, motos, caminhões, maquinário ou náutica.",
      image: "/assets/conquistas/veiculo-luxo.jpg",
      tag: "Auto & Frotas",
    },
    {
      icon: Briefcase,
      title: "Serviços & Investimentos",
      subtitle: "Estudos no exterior, reformas, procedimentos, energia solar e projetos.",
      image: "/assets/conquistas/patrimonio-servicos.jpg",
      tag: "Projetos Sob Medida",
    },
  ];

  const advantages = [
    {
      icon: DollarSign,
      title: "Poder de Compra à Vista",
      description: "Com a carta contemplada, você negocia descontos agressivos como pagamento à vista.",
    },
    {
      icon: Shuffle,
      title: "Flexibilidade Total",
      description: "Liberdade para escolher qualquer marca, modelo ou imóvel dentro da categoria contratada.",
    },
    {
      icon: PiggyBank,
      title: "Poupança & Alavancagem",
      description: "Cria disciplina patrimonial inteligente para construir renda passiva ou moradia.",
    },
    {
      icon: ShieldCheck,
      title: "Segurança Banco Central",
      description: "100% regulamentado e fiscalizado pelo Banco Central do Brasil sob a Lei 11.795/08.",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 md:p-6 max-w-6xl mx-auto overflow-y-auto space-y-3.5 sm:space-y-4">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-1 sm:space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vantagens & Conquistas</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-sora text-accent tracking-tight">
          Vantagens & <span className="text-metal-shift">O Que Você Pode Conquistar</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Descubra como o consórcio viabiliza seus maiores objetivos com inteligência financeira e zero juros.
        </p>
      </div>

      {/* TOP HERO CARD: O Que Você Deseja Conquistar (Light Blue Gradient + High-Res Achievement Images) */}
      <div className="max-w-5xl mx-auto w-full bg-gradient-to-br from-sky-50 via-blue-50/70 to-indigo-50/40 border border-sky-200/90 rounded-3xl p-4 sm:p-5 md:p-6 shadow-md ring-1 ring-sky-100 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-sky-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-extrabold font-sora text-accent">
              O que você deseja planejar ou conquistar hoje?
            </h3>
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-sky-200 shadow-2xs">
            Planejamento Sob Medida LFT
          </span>
        </div>

        {/* 3 Goal Cards with High-Res Images */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
          {goals.map((goal, idx) => {
            const Icon = goal.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-sky-100 shadow-sm overflow-hidden hover:border-primary/60 hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Image Banner */}
                <div className="relative w-full h-24 sm:h-28 overflow-hidden bg-slate-900">
                  <Image
                    src={goal.image}
                    alt={goal.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                  <span className="absolute bottom-2 left-2 text-[9px] font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/20">
                    {goal.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-3.5 space-y-1 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold font-sora text-accent truncate">
                        {goal.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {goal.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM: 4 Key Advantages Grid (Aligned & Centered) */}
      <div className="space-y-2 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-center gap-1.5 text-center">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
          <h4 className="text-xs sm:text-sm font-bold text-accent font-sora">
            Principais Vantagens Competitivas
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-primary/50 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h5 className="text-xs font-bold text-accent font-sora">
                    {adv.title}
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {adv.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
