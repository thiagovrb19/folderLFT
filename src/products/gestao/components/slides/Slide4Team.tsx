"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { TeamMember } from "@/products/gestao/types/presentation";

export const Slide4Team: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>("Todos");

  const team: TeamMember[] = [
    {
      id: "1",
      name: "Lucas Teixeira",
      role: "Diretor & Fundador",
      department: "Diretoria",
      image: "/assets/team/lucas-teixeira-diretor.png",
      bio: "Membro (MDRT / TOT)",
    },
    {
      id: "12",
      name: "Suellen",
      role: "Gerente Comercial",
      department: "Comercial",
      image: "/assets/team/suellen.jpg",
      bio: "Gerente Comercial",
    },
    {
      id: "2",
      name: "Jefferson Coutinho",
      role: "Corretor de Seguros",
      department: "Comercial",
      image: "/assets/team/jefferson.png",
      bio: "Corretor de Seguros",
    },
    {
      id: "3",
      name: "Victor Santos",
      role: "Corretor de Seguros",
      department: "Comercial",
      image: "/assets/team/victor.png",
      bio: "Corretor de Seguros",
    },
    {
      id: "5",
      name: "Thiago Nunes",
      role: "Gestor de Consórcios",
      department: "Comercial",
      image: "/assets/team/thiago-nunes.png",
      bio: "Gestor de Consórcios & Planejamento",
    },
    {
      id: "4",
      name: "Victor Hugo",
      role: "Consultor de Consórcios",
      department: "Comercial",
      image: "/assets/team/vitor-hugo.jpeg",
      bio: "Consultor de Consórcios",
    },
    {
      id: "6",
      name: "Karina",
      role: "Gestão",
      department: "Gestão",
      image: "/assets/team/karina.png",
      bio: "Processos & Qualidade",
    },
    {
      id: "7",
      name: "Natália",
      role: "Administrativo",
      department: "Administrativo",
      image: "/assets/team/natalia.png",
      bio: "Emissão de Apólices & Suporte",
    },
    {
      id: "8",
      name: "Gilberto",
      role: "Administrativo",
      department: "Administrativo",
      image: "/assets/team/gilberto-junior.png",
      bio: "Cotações",
    },
    {
      id: "9",
      name: "Maria Alice",
      role: "Administrativo",
      department: "Administrativo",
      image: "/assets/team/maria-alice.png",
      bio: "Abertura de Sinistros, Atendimento ao Cliente e Cobranças",
    },
    {
      id: "10",
      name: "Maria Clara",
      role: "Marketing",
      department: "Marketing",
      image: "/assets/team/maria-clara.png",
      bio: "Redes Sociais e Marketing Digital",
    },
    {
      id: "11",
      name: "Thiago",
      role: "TI",
      department: "TI",
      image: "/assets/team/thiago.png",
      bio: "Tecnologia",
    },
  ];

  const departments = ["Todos", "Diretoria", "Comercial", "Administrativo", "Gestão", "Marketing", "TI"];

  const filteredTeam =
    selectedDept === "Todos"
      ? team
      : team.filter((m) => m.department === selectedDept);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          Nosso Time
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent mt-1.5">
          Especialistas dedicados ao seu <span className="text-metal-shift">patrimônio</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Uma equipe multidisciplinar pronta para estruturar e acompanhar cada detalhe do seu planejamento.
        </p>

        {/* Department Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${selectedDept === dept
                ? "bg-primary text-white font-bold shadow-glow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 overflow-y-auto max-h-[50vh] sm:max-h-[54vh] p-1">
        <AnimatePresence mode="popLayout">
          {filteredTeam.map((member) => (
            <motion.div
              key={member.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard variant="default" className="p-3 sm:p-3.5 text-center flex flex-col items-center group hover:border-primary/50 transition-all">
                {/* Photo */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-2.5 shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback if image path is not found
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center -z-10">
                    <span className="text-sm font-bold text-primary font-sora">
                      {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </span>
                  </div>
                </div>

                {/* Name & Role */}
                <h4 className="text-xs sm:text-sm font-bold font-sora text-accent truncate w-full">
                  {member.name}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-primary font-semibold truncate w-full mt-0.5">
                  {member.role}
                </p>
                <span className="text-[9px] text-slate-500 uppercase tracking-wider mt-1 px-2 py-0.5 rounded bg-slate-100 font-medium">
                  {member.department}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="text-center pt-3 border-t border-slate-200 text-[11px] text-slate-500">
        Atendimento consultivo e suporte dedicado em todas as etapas da sua jornada.
      </div>
    </div>
  );
};
