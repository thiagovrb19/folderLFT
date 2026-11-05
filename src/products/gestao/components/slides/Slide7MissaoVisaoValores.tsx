"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Target, ShieldCheck, Compass } from "lucide-react";

export const Slide7MissaoVisaoValores: React.FC = () => {
  const valoresList = [
    {
      title: "Solidez",
      desc: "Excelência e alto padrão em cada detalhe.",
    },
    {
      title: "Compromisso e transparência",
      desc: "Relações éticas e duradouras.",
    },
    {
      title: "Inteligência estratégica",
      desc: "Soluções que vão além do óbvio.",
    },
    {
      title: "Confiança",
      desc: "Base de tudo o que construímos.",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
          Nossos Pilares
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent mt-2">
          Missão, Visão e <span className="text-metal-shift">Valores</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Princípios fundamentais que norteiam nossa atuação na proteção do seu patrimônio.
        </p>
      </div>

      {/* Grid: 3 Equal-Height Standardized Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
        {/* 1. Missão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex"
        >
          <GlassCard
            variant="glow"
            className="p-6 sm:p-7 w-full flex flex-col justify-between hover:border-primary/50 transition-all hover:scale-[1.01]"
          >
            <div>
              {/* Card Icon & Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                  Propósito
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-extrabold font-sora text-accent mb-3">
                Missão
              </h3>

              {/* Highlight Statement */}
              <p className="text-sm font-bold text-primary leading-snug mb-3">
                Existimos para proteger o legado dos nossos clientes.
              </p>

              {/* Body Text */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ajudando famílias e empresas a preservarem seu legado com solidez, clareza e resultados consistentes.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* 2. Visão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex"
        >
          <GlassCard
            variant="glow"
            className="p-6 sm:p-7 w-full flex flex-col justify-between hover:border-primary/50 transition-all hover:scale-[1.01]"
          >
            <div>
              {/* Card Icon & Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Compass className="w-6 h-6 text-primary" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                  Direcionamento
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-extrabold font-sora text-accent mb-3">
                Visão
              </h3>

              {/* Highlight Statement */}
              <p className="text-sm font-bold text-primary leading-snug mb-3">
                Ser referência no Brasil em proteção patrimonial e gestão de risco.
              </p>

              {/* Body Text */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Reconhecida nacionalmente pela excelência técnica, integridade e capacidade de desenhar soluções seguras e sob medida.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* 3. Valores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex"
        >
          <GlassCard
            variant="glow"
            className="p-6 sm:p-7 w-full flex flex-col justify-between hover:border-primary/50 transition-all hover:scale-[1.01]"
          >
            <div>
              {/* Card Icon & Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                  Princípios
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-extrabold font-sora text-accent mb-3">
                Valores
              </h3>

              {/* List of 4 Values */}
              <div className="space-y-2.5">
                {valoresList.map((val, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-slate-700 leading-snug">
                      <strong className="text-accent font-bold">{val.title}:</strong> {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};
