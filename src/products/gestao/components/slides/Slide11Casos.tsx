"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  HeartCrack,
  Bike,
  Activity,
  ShieldAlert,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

export const Slide11Casos: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const cases = [
    {
      title: "Ausência Inesperada",
      tag: "Sucessão Familiar",
      payout: "R$ 474.000,00",
      time: "Pago em 5 dias",
      icon: HeartCrack,
      story: "Com contas bloqueadas no inventário, a apólice foi paga diretamente à viúva, mantendo a família e a escola dos filhos sem dívidas.",
      quote: "“Foi o que nos manteve de pé sem precisar vender imóveis às pressas.”",
    },
    {
      title: "Quebra de Ossos (Fratura)",
      tag: "Fraturas & Acidentes",
      payout: "R$ 30.000,00",
      time: "Pago em 48h",
      icon: Activity,
      story: "Fratura óssea ocorrida durante atividade física com necessidade de imobilização e recuperação médica. A indenização por Quebra de Ossos foi liberada de forma ágil e 100% digital.",
      quote: "“A cobertura de quebra de ossos entrou direto na conta e cobriu com facilidade remédios e consultas ortopédicas.”",
    },
    {
      title: "Câncer de Mama aos 39 anos",
      tag: "Doenças Graves em Vida",
      payout: "R$ 585.000,00",
      time: "Liberado em 3 dias",
      icon: Activity,
      story: "Diagnóstico precoce. O capital integral foi pago mediante entrega do laudo para tratamento de excelência.",
      quote: "“Pude focar 100% no tratamento sem o estresse de trabalhar doente.”",
    },
    {
      title: "Imprevisto de Domingo",
      tag: "Acidente Pessoal",
      payout: "R$ 15.000,00",
      time: "Pago em 48h",
      icon: ShieldAlert,
      story: "Fratura no pé ao brincar com o filho no jardim. Processo 100% digital com indenização na conta em 2 dias.",
      quote: "“A agilidade da LFT foi impressionante do início ao fim.”",
    },
    {
      title: "Internação por COVID",
      tag: "Diárias Hospitalares",
      payout: "R$ 5.000,00",
      time: "10 dias de internação",
      icon: Activity,
      story: "Diárias pagas diretamente ao segurado para suporte em recuperação e medicamentos pós-alta.",
      quote: "“Dinheiro rápido para cobrir despesas que o plano de saúde não paga.”",
    },
    {
      title: "Médico Cirurgião",
      tag: "Profissional Liberal",
      payout: "R$ 10.000,00",
      time: "Afastamento cirúrgico",
      icon: Stethoscope,
      story: "Crise renal com cirurgia de urgência. Como autônomo, a cobertura compensou a perda de consultas e cirurgias.",
      quote: "“Quem vive de mão de obra precisa de proteção de renda obrigatória.”",
    },
  ];

  const currentCase = cases[selectedIdx];
  const Icon = currentCase.icon;

  return (
    <div className="w-full h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 max-w-5xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          Casos Reais
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent mt-1.5">
          Quando o imprevisto acontece: <span className="text-metal-shift">liquidez imediata</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Exemplos práticos de proteção e recursos liberados no momento mais necessário.
        </p>
      </div>

      {/* Featured Case Card */}
      <GlassCard variant="glow" className="p-5 sm:p-7 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-primary uppercase">{currentCase.tag}</span>
              <h3 className="text-lg sm:text-xl font-bold font-sora text-accent">{currentCase.title}</h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 block">Indenização</span>
            <span className="text-lg sm:text-2xl font-black text-emerald-600 font-mono">
              {currentCase.payout}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 text-left">
          {currentCase.story}
        </p>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left mb-4">
          <p className="text-xs text-slate-800 italic">{currentCase.quote}</p>
          <span className="text-[10px] text-primary font-bold mt-1 block">
            Tempo de liberação: {currentCase.time}
          </span>
        </div>

        {/* Carousel Dots & Arrows */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setSelectedIdx((prev) => (prev - 1 + cases.length) % cases.length)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-primary hover:text-white text-slate-700 transition-all text-xs flex items-center gap-1 font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>

          <div className="flex items-center gap-1.5">
            {cases.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedIdx(i)}
                className={`h-2 rounded-full transition-all ${
                  selectedIdx === i ? "w-6 bg-primary" : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setSelectedIdx((prev) => (prev + 1) % cases.length)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-primary hover:text-white text-slate-700 transition-all text-xs flex items-center gap-1 font-semibold"
          >
            Próximo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
