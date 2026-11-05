"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Landmark, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

interface FolderOption {
  href: string;
  logo: string;
  logoAlt: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FOLDERS: FolderOption[] = [
  {
    href: "/gestao",
    logo: "/assets/logos/lft-gestao.png",
    logoAlt: "LFT Gestão - Gestão de Risco e Planejamento Financeiro",
    title: "Seguro de Vida",
    description: "Gestão de risco e planejamento financeiro para o cliente e sua família.",
    icon: ShieldCheck,
  },
  {
    href: "/consorcios",
    logo: "/assets/logos/lft-consorcios.png",
    logoAlt: "LFT Consórcios",
    title: "Consórcios",
    description: "Planejamento patrimonial com consórcio de imóveis, veículos e serviços.",
    icon: Landmark,
  },
];

export default function HomePage() {
  return (
    <main className="relative h-dvh w-screen overflow-y-auto overflow-x-hidden bg-white select-none">
      <ParticleBackground />

      <div className="relative z-10 min-h-full flex flex-col items-center justify-center px-5 py-10 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <Image
            src="/assets/icons/icon-192.png"
            alt="LFT"
            width={72}
            height={72}
            priority
            className="mx-auto mb-4 rounded-2xl shadow-glow glow-pulse"
          />
          <h1 className="font-sora font-bold text-2xl sm:text-4xl text-accent tracking-tighter">
            Qual folder você vai apresentar?
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Escolha uma opção para iniciar o atendimento.
          </p>
        </motion.div>

        <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {FOLDERS.map((folder) => {
            const Icon = folder.icon;

            return (
              <div key={folder.href} className="transition-transform duration-200 hover:-translate-y-1">
                <Link href={folder.href} className="block group focus:outline-none">
                  <GlassCard
                    variant="interactive"
                    className="p-6 sm:p-8 flex flex-col items-center text-center group-focus-visible:border-primary"
                  >
                    <div className="relative w-full h-28 sm:h-36 mb-5">
                      <Image
                        src={folder.logo}
                        alt={folder.logoAlt}
                        fill
                        sizes="(min-width: 768px) 380px, 90vw"
                        className="object-contain"
                        priority
                      />
                    </div>

                    <div className="flex items-center gap-1.5 text-primary">
                      <Icon className="w-4 h-4" />
                      <h2 className="font-sora font-semibold text-lg sm:text-xl text-accent">
                        {folder.title}
                      </h2>
                    </div>

                    <p className="mt-2 text-sm text-slate-500 max-w-xs">{folder.description}</p>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                      Abrir apresentação
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </GlassCard>
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Dentro de qualquer apresentação, use o botão <strong>Trocar folder</strong> para voltar
          aqui. Os dados de cada folder ficam salvos.
        </p>
      </div>
    </main>
  );
}
