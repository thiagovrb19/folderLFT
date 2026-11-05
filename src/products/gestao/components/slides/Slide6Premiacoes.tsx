"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Trophy, Award, Sparkles, X } from "lucide-react";

export const Slide6Premiacoes: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; title: string } | null>(null);

  const awards = [
    { src: "/assets/premiacoes/1.png", title: "Franquia de Excelência 2024" },
    { src: "/assets/premiacoes/2.png", title: "Franquia de Excelência 2025" },
    { src: "/assets/premiacoes/3.png", title: "Chicago 2022" },
    { src: "/assets/premiacoes/4.png", title: "Canadá 2024" },
    { src: "/assets/premiacoes/5.png", title: "Nova York 2024" },
    { src: "/assets/premiacoes/6.png", title: "Orlando 2025" },
    { src: "/assets/premiacoes/10.png", title: "Las Vegas 2024" },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Zoom Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="pt-3 pb-1 text-center">
                <h4 className="text-base sm:text-lg font-bold font-sora text-accent">
                  {selectedPhoto.title}
                </h4>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-7">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
          <Trophy className="w-3.5 h-3.5" />
          <span>Histórico de Premiações</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent">
          Premiações no <span className="text-metal-shift">Mundo Todo</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl mx-auto">
          Conquistas e reconhecimentos que atestam a nossa dedicação à excelência e aos mais altos padrões do mercado financeiro nacional e internacional.
        </p>
      </div>

      {/* Grid of Award Photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4 overflow-y-auto max-h-[52vh] p-1">
        {awards.map((item, idx) => (
          <GlassCard
            key={idx}
            variant="default"
            className="p-2.5 sm:p-3 flex flex-col items-center cursor-pointer group hover:border-primary/50 transition-all hover:scale-[1.02]"
            onClick={() => setSelectedPhoto(item)}
          >
            <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-slate-100 mb-2.5 shadow-sm">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-2 right-2 text-[10px] bg-white/90 px-2 py-0.5 rounded-full text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                🔍 Ver
              </span>
            </div>

            <p className="text-xs font-bold text-accent text-center truncate w-full px-1">
              {item.title}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
