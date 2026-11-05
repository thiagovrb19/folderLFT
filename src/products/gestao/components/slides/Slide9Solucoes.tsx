"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Home,
  GraduationCap,
  AlertTriangle,
  HeartPulse,
  Scale,
  SunMedium,
} from "lucide-react";

export const Slide9Solucoes: React.FC = () => {
  const solutions = [
    {
      title: "Manutenções do dia a dia",
      icon: Home,
    },
    {
      title: "Educação",
      icon: GraduationCap,
    },
    {
      title: "Despesas emergenciais",
      icon: AlertTriangle,
    },
    {
      title: "Doenças graves e/ou terminais",
      icon: HeartPulse,
    },
    {
      title: "Inventário",
      icon: Scale,
    },
    {
      title: "Terceira idade",
      icon: SunMedium,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 max-w-5xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          Planejamento Estruturado
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent mt-2">
          Nossas <span className="text-metal-shift">Soluções</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Respostas práticas para cada momento e desafio da sua vida financeira.
        </p>
      </div>

      {/* Grid of 6 Solutions - Minimalist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto w-full">
        {solutions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
            >
              <GlassCard
                variant="default"
                className="p-5 sm:p-6 h-full flex items-center gap-4 hover:border-primary/50 transition-all group hover:scale-[1.03] shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-sm sm:text-base font-bold font-sora text-accent group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
