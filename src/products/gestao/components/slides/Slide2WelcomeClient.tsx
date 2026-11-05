"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePresentationStore } from "@/products/gestao/lib/store";
import { Sparkles, ArrowRight, User, Briefcase, Building } from "lucide-react";
import { MetalButton } from "@/components/ui/MetalButton";

export const Slide2WelcomeClient: React.FC = () => {
  const { client, nextSlide } = usePresentationStore();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center max-w-4xl mx-auto overflow-y-auto">
      {/* Top Logo LFT Azul */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative h-12 sm:h-16 w-36 sm:w-44 mb-5 sm:mb-7"
      >
        <Image
          src="/assets/logos/logo-lft-azul.png"
          alt="LFT Gestão de Risco e Planejamento Financeiro"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Client Photo with Glowing Circular Border */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative mb-5 sm:mb-6 group"
      >
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-primary ring-8 ring-primary/20 shadow-glow mx-auto bg-slate-100 flex items-center justify-center">
          {client.clientPhotoUrl ? (
            <Image
              src={client.clientPhotoUrl}
              alt={client.name || "Foto do Cliente"}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <User className="w-16 h-16 text-primary/70" />
          )}
        </div>

        {/* VIP Sparkle Badge */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white border border-primary/30 px-3.5 py-1 rounded-full text-xs font-bold text-primary shadow-md flex items-center gap-1.5 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span>Apresentação Exclusiva</span>
        </div>
      </motion.div>

      {/* Welcome Headline with Client Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-1.5"
      >
        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
          Consultoria de Alta Performance
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-sora tracking-tight leading-tight text-accent">
          Bem-vindo(a), <br />
          <span className="text-metal-shift font-black">
            {client.name || "Cliente Convidado"}
          </span>
        </h1>
      </motion.div>

      {/* Profession & Company Tags */}
      {(client.profession || client.company) && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-4"
        >
          {client.profession && (
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              <span>{client.profession}</span>
            </div>
          )}
          {client.company && (
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <Building className="w-3.5 h-3.5 text-primary" />
              <span>{client.company}</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Official Slogan */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mt-4 leading-relaxed"
      >
        Protegemos o que é mais importante para você, sua família e seus negócios com soluções estruturadas e solidez.
      </motion.p>

      {/* Next Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8"
      >
        <MetalButton
          onClick={nextSlide}
          variant="primary"
          size="md"
          icon={<ArrowRight className="w-4 h-4 text-white" />}
        >
          Conhecer a LFT
        </MetalButton>
      </motion.div>
    </div>
  );
};
