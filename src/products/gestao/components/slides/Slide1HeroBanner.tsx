"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePresentationStore } from "@/products/gestao/lib/store";
import { ArrowRight, Sparkles } from "lucide-react";
import { MetalButton } from "@/components/ui/MetalButton";

export const Slide1HeroBanner: React.FC = () => {
  const { client, nextSlide } = usePresentationStore();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end p-6 sm:p-10 pb-20 overflow-hidden select-none">
      {/* Full-Screen Background Image (hero-banner.png) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-banner.png"
          alt="LFT Gestão de Risco Hero Banner"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Subtle Bottom Gradient for readable CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Center/Bottom CTA Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 text-center max-w-xl mx-auto space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold shadow-lg">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>LFT Gestão de Risco & Planejamento Financeiro</span>
        </div>

        <div>
          <MetalButton
            onClick={nextSlide}
            variant="glow"
            size="lg"
            icon={<ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />}
            className="px-8 py-4 text-base font-bold shadow-2xl hover:scale-105 transition-transform"
          >
            Iniciar Apresentação do Cliente
          </MetalButton>
        </div>

        {client.name && (
          <p className="text-xs text-slate-300 font-medium drop-shadow">
            Sessão preparada para: <strong className="text-white">{client.name}</strong>
          </p>
        )}
      </motion.div>
    </div>
  );
};
