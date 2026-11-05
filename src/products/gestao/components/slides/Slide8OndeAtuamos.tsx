"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { UserCheck, Building2, Landmark, KeyRound } from "lucide-react";

export const Slide8OndeAtuamos: React.FC = () => {
  const areas = [
    {
      title: "Planejamento Pessoal",
      icon: UserCheck,
    },
    {
      title: "Sucessão Empresarial",
      icon: Building2,
    },
    {
      title: "Sucessão Patrimonial",
      icon: Landmark,
    },
    {
      title: "Pessoa Chave",
      icon: KeyRound,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 max-w-5xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          Áreas de Especialidade
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent mt-2">
          ONDE <span className="text-metal-shift">ATUAMOS?</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Soluções sob medida para blindar você, sua família e sua empresa.
        </p>
      </div>

      {/* 4 Minimalist Grid Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto w-full">
        {areas.map((area, idx) => {
          const Icon = area.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <GlassCard
                variant="glow"
                className="p-6 sm:p-7 flex items-center gap-5 hover:border-primary/50 transition-all hover:scale-[1.02] group shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-sora text-accent group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
