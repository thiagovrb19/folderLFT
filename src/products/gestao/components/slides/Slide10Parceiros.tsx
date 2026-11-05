"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export const Slide10Parceiros: React.FC = () => {
  const insurancePartners = [
    {
      name: "Prudential do Brasil",
      src: "/assets/logos/seguradoras/prudential-logo.png",
    },
    {
      name: "Omint Seguros",
      src: "/assets/logos/seguradoras/omint-logo.png",
    },
    {
      name: "MAG Seguros",
      src: "/assets/logos/seguradoras/mag-logo.png",
    },
    {
      name: "Azos Seguros",
      src: "/assets/logos/seguradoras/azos-logo.png",
    },
    {
      name: "Centauro-ON",
      src: "/assets/logos/seguradoras/centauro-logo.svg",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest mb-2.5">
          <Shield className="w-3.5 h-3.5" />
          <span>Parceiros Oficiais • Seguro de Vida</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent">
          As maiores <span className="text-metal-shift">seguradoras de vida</span> do mundo
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
          Atuamos com as principais e mais sólidas instituições globais do mercado.
        </p>
      </div>

      {/* Grid of Insurance Partner Logos with Original Colors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-5xl mx-auto w-full items-center">
        {insurancePartners.map((partner, idx) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.07 }}
            className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 flex items-center justify-center h-28 sm:h-32 ${
              idx === 4 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <div className="relative w-full h-full max-h-16 flex items-center justify-center">
              <Image
                src={partner.src}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
