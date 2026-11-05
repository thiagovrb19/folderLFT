"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CountUp } from "@/components/ui/CountUp";
import { ShieldCheck, TrendingUp, Users, Award, Calendar } from "lucide-react";

export const Slide3Autoridade: React.FC = () => {
  const metrics = [
    {
      title: "Desde 2018",
      subtitle: "Atuação Consultiva",
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "+2.000",
      subtitle: "Clientes Protegidos",
      icon: Users,
      color: "text-primary",
      isCounter: true,
      counterEnd: 2000,
      counterPrefix: "+",
    },
    {
      title: "+R$ 5 Bi",
      subtitle: "Capital Segurado",
      icon: ShieldCheck,
      color: "text-primary",
      isCounter: true,
      counterEnd: 5,
      counterPrefix: "+R$ ",
      counterSuffix: " Bi",
    },
    {
      title: "+R$ 5 Mi",
      subtitle: "Benefícios Pagos",
      icon: TrendingUp,
      color: "text-emerald-600",
      isCounter: true,
      counterEnd: 5,
      counterPrefix: "+R$ ",
      counterSuffix: " Mi",
    },
    {
      title: "Top 1% Global",
      subtitle: "MDRT / Top of the Table",
      icon: Award,
      color: "text-primary",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          Nossa Trajetória
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent mt-2">
          Uma história construída em <span className="text-metal-shift">confiança e resultados</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
          Ninguém constrói patrimônio pensando em perdê-lo. A LFT atua para blindar cada etapa da sua evolução financeira com padrões internacionais.
        </p>
      </div>

      {/* Grid of 5 Metric Cards - Minimalist without grey descriptions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <GlassCard
              key={idx}
              variant="default"
              className="p-5 sm:p-6 flex flex-col justify-center items-center text-center hover:border-primary/50 transition-all hover:scale-[1.03] group shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3.5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Icon className={`w-6 h-6 ${item.color} group-hover:text-white transition-colors`} />
              </div>

              <div className={`text-xl sm:text-2xl font-black font-sora ${item.color} tracking-tight`}>
                {item.isCounter ? (
                  <CountUp
                    end={item.counterEnd || 0}
                    prefix={item.counterPrefix || ""}
                    suffix={item.counterSuffix || ""}
                  />
                ) : (
                  item.title
                )}
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-accent mt-1.5 font-sora">
                {item.subtitle}
              </h3>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
