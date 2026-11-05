"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CountUp } from "@/components/ui/CountUp";
import { TrendingUp, Users, Award, Calendar } from "lucide-react";

export const Slide3Autoridade: React.FC = () => {
  const metrics = [
    {
      title: "Desde 2018",
      subtitle: "Atuação Consultiva",
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "+ 2000 clientes",
      subtitle: "Atendidos com Excelência",
      icon: Users,
      color: "text-primary",
      isCounter: true,
      counterEnd: 2000,
      counterPrefix: "+ ",
      counterSuffix: " clientes",
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
          A LFT atua para alavancar e estruturar cada etapa da sua evolução financeira com soluções patrimoniais de excelência e padrões internacionais.
        </p>
      </div>

      {/* Grid of 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto w-full">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <GlassCard
              key={idx}
              variant="default"
              className="p-6 sm:p-7 flex flex-col justify-center items-center text-center hover:border-primary/50 transition-all hover:scale-[1.03] group shadow-sm bg-white"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${item.color} group-hover:text-white transition-colors`} />
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

              <h3 className="text-xs sm:text-sm font-bold text-slate-700 mt-2 font-sora">
                {item.subtitle}
              </h3>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
