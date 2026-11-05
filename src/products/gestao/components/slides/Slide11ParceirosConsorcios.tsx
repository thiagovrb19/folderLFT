"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export const Slide11ParceirosConsorcios: React.FC = () => {
  const consortiumPartners = [
    {
      name: "HS Consórcios",
      src: "/assets/logos/consorcios/hs-consorcios.png",
      category: "Planejamento & Crédito",
      focus: "Imóveis de Alto Padrão",
    },
    {
      name: "Itaú Consórcios",
      src: "/assets/logos/consorcios/itau-consorcio-logo.png",
      category: "Maior Banco Privado",
      focus: "Imóveis & Automóveis",
    },
    {
      name: "Rodobens",
      src: "/assets/logos/consorcios/Logo_Rodobens_Atualizado.png",
      category: "Mais de 70 Anos de Mercado",
      focus: "Planejamento Imobiliário",
    },
    {
      name: "BB Consórcios",
      src: "/assets/logos/consorcios/logo-administradoras-bb-2.png",
      category: "Solidez Banco do Brasil",
      focus: "Grandes Operações",
    },
    {
      name: "BP Consórcios",
      src: "/assets/logos/consorcios/Logo-BP-Consorcio-png.webp",
      category: "Alavancagem Financeira",
      focus: "Multiplicação de Ativos",
    },
    {
      name: "Âncora Consórcios",
      src: "/assets/logos/consorcios/ancora-consorcios-logo.svg",
      category: "Crédito Estruturado",
      focus: "Projetos Sob Medida",
    },
    {
      name: "Canopus Consórcios",
      src: "/assets/logos/consorcios/canopus-consorcio-logo.webp",
      category: "Aquisição de Bens",
      focus: "Frotas & Imóveis",
    },
    {
      name: "Servopa",
      src: "/assets/logos/consorcios/sevopa-consorcios-logo.png",
      category: "Soluções Patrimoniais",
      focus: "Taxas Competitivas",
    },
    {
      name: "Tradição Consórcios",
      src: "/assets/logos/consorcios/tradicacao-consorcio-logo.png",
      category: "Expansão de Capital",
      focus: "Alavancagem Estratégica",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 max-w-5xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest mb-2">
          <Building2 className="w-3.5 h-3.5" />
          <span>Parceiros Oficiais • Consórcios & Alavancagem</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent leading-tight">
          As principais <span className="text-metal-shift">administradoras de consórcio</span> do Brasil
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
          Estratégias avançadas de alavancagem patrimonial, aquisição de imóveis e renovação de ativos sem juros bancários.
        </p>
      </div>

      {/* Grid of 9 Consortium Partners */}
      <div className="w-full bg-slate-50/90 rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
          {consortiumPartners.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3.5 sm:p-4 flex flex-col justify-between hover:shadow-lg hover:border-primary/60 transition-all duration-300 group"
            >
              <div className="relative w-full h-11 sm:h-12 flex items-center justify-center mb-2">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="text-center pt-2 border-t border-slate-100">
                <span className="text-[11px] sm:text-xs font-bold text-accent font-sora block truncate">
                  {partner.name}
                </span>
                <span className="text-[10px] sm:text-[11px] text-primary font-semibold block truncate mt-0.5">
                  {partner.focus}
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 block truncate">
                  {partner.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
