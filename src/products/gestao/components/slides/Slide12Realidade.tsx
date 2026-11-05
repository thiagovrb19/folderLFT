"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { CountUp } from "@/components/ui/CountUp";
import { AlertCircle, ShieldAlert } from "lucide-react";

export const Slide12Realidade: React.FC = () => {
  const data = [
    { country: "Japão", flag: "🇯🇵", percentage: 90, color: "from-blue-500 to-sky-400" },
    { country: "Coreia do Sul", flag: "🇰🇷", percentage: 70, color: "from-blue-500 to-sky-400" },
    { country: "Inglaterra / França", flag: "🇬🇧 🇫🇷", percentage: 60, color: "from-blue-500 to-sky-400" },
    { country: "Brasil", flag: "🇧🇷", percentage: 18, color: "from-red-500 to-rose-600", isBrasil: true },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 max-w-4xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-100 px-3 py-1 rounded-full border border-red-200">
          Choque de Realidade
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent mt-2">
          Você e sua família estão <span className="text-metal-shift">realmente protegidos?</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Penetração de seguro e planejamento patrimonial na população:
        </p>
      </div>

      {/* Comparison Progress Bars */}
      <GlassCard variant="default" className="p-5 sm:p-7 space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="flex items-center gap-2 font-bold text-accent">
                <span>{item.flag}</span>
                <span className={item.isBrasil ? "text-red-600 font-extrabold" : "text-accent"}>{item.country}</span>
                {item.isBrasil && (
                  <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold border border-red-200">
                    Alerta Nacional
                  </span>
                )}
              </span>
              <span className={`font-mono font-bold ${item.isBrasil ? "text-red-600" : "text-primary"}`}>
                <CountUp end={item.percentage} suffix="%" duration={1.5} />
              </span>
            </div>

            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: `${item.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
              />
            </div>
          </div>
        ))}

        <div className="pt-3 border-t border-slate-200 flex items-start gap-2.5 text-[11px] sm:text-xs text-slate-600">
          <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <span>
            Em países desenvolvidos (como Suíça, Espanha e Japão), o seguro de proteção de renda e sucessão é visto como pilar básico de estabilidade econômica familiar.
          </span>
        </div>
      </GlassCard>
    </div>
  );
};
