"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Trophy, Award, Sparkles, X, Star, ZoomIn, Globe, ShieldCheck } from "lucide-react";

interface AwardItem {
  id: string;
  src: string;
  title: string;
  category: "Destaques" | "Convenções PTC" | "Nacional & Internacional";
  isHighlight?: boolean;
  subtitle?: string;
}

export const Slide6Premiacoes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [selectedPhoto, setSelectedPhoto] = useState<AwardItem | null>(null);

  const awards: AwardItem[] = [
    // MDRT / TOT & Destaques
    {
      id: "mdrt-tot",
      src: "/assets/premiacoes/membro-mdrt-prudential.jpeg",
      title: "Membro MDRT / TOT - Prudential",
      category: "Destaques",
      isHighlight: true,
      subtitle: "Top 1% Global do Mercado Financeiro & Seguros",
    },
    {
      id: "buzios",
      src: "/assets/premiacoes/buzios-rj.jpg",
      title: "Convenção Búzios, RJ",
      category: "Destaques",
      isHighlight: true,
      subtitle: "Reconhecimento & Liderança Nacional",
    },
    {
      id: "bahia",
      src: "/assets/premiacoes/bahia.jpg",
      title: "Convenção Bahia",
      category: "Destaques",
      isHighlight: true,
      subtitle: "Premiação por Desempenho e Qualidade",
    },

    // Convenções PTC (Thiago Nunes & LFT)
    {
      id: "ptc-chicago-1",
      src: "/assets/premiacoes/ptc-chicago-2022-thiago-nunes-1.jpeg",
      title: "PTC Chicago 2022 - Thiago Nunes",
      category: "Convenções PTC",
      subtitle: "President's Trophy Club • Chicago (EUA)",
    },
    {
      id: "ptc-chicago-2",
      src: "/assets/premiacoes/ptc-chicago-2022-thiago-nunes-2.jpeg",
      title: "Convenção PTC Chicago 2022",
      category: "Convenções PTC",
      subtitle: "Encontro Internacional de Alta Performance",
    },
    {
      id: "ptc-orlando-1",
      src: "/assets/premiacoes/ptc-orlando-2025-thiago-nunes-1.jpeg",
      title: "PTC Orlando (EUA) 2025 - Thiago Nunes",
      category: "Convenções PTC",
      subtitle: "Qualificação President's Trophy Club Orlando",
    },
    {
      id: "ptc-orlando-2",
      src: "/assets/premiacoes/ptc-orlando-2025-thiago-nunes-2.jpeg",
      title: "Convenção PTC Orlando (EUA) 2025",
      category: "Convenções PTC",
      subtitle: "Premiação Internacional de Excelência",
    },

    // Nacional & Internacional
    {
      id: "excelencia-2024",
      src: "/assets/premiacoes/1.png",
      title: "Franquia de Excelência 2024",
      category: "Nacional & Internacional",
      subtitle: "Reconhecimento Corporativo de Qualidade",
    },
    {
      id: "excelencia-2025",
      src: "/assets/premiacoes/2.png",
      title: "Franquia de Excelência 2025",
      category: "Nacional & Internacional",
      subtitle: "Reconhecimento Continuado e Alta Performance",
    },
    {
      id: "ny-2024",
      src: "/assets/premiacoes/5.png",
      title: "Convenção Nova York 2024",
      category: "Nacional & Internacional",
      subtitle: "Conquista Internacional em Nova York (EUA)",
    },
  ];

  const categories = ["Todas", "Destaques", "Convenções PTC", "Nacional & Internacional"];

  const filteredAwards =
    selectedCategory === "Todas"
      ? awards
      : awards.filter((a) => a.category === selectedCategory);

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 md:p-6 max-w-6xl mx-auto overflow-y-auto space-y-3">
      {/* Zoom Modal Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-3 sm:p-5 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-colors cursor-pointer shadow-lg"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Lightbox Image Container (Preserving 100% full uncropped image) */}
              <div className="relative h-[50vh] sm:h-[65vh] w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center p-2">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 900px"
                  priority
                />
              </div>

              {/* Caption */}
              <div className="pt-3.5 pb-1 text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold">
                  {selectedPhoto.category}
                </div>
                <h4 className="text-base sm:text-xl font-bold font-sora text-accent">
                  {selectedPhoto.title}
                </h4>
                {selectedPhoto.subtitle && (
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedPhoto.subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
          <Trophy className="w-3.5 h-3.5" />
          <span>Histórico de Premiações & Reconhecimento</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-sora text-accent">
          Premiações no <span className="text-metal-shift">Brasil e no Mundo</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Conquistas, convenções e qualificações internacionais que comprovam a nossa dedicação à excelência e aos mais altos padrões do mercado.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Grid with NO cropping (object-contain with clean frame) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5 overflow-y-auto max-h-[50vh] sm:max-h-[54vh] p-1">
        <AnimatePresence mode="popLayout">
          {filteredAwards.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
            >
              <GlassCard
                variant={item.isHighlight ? "glow" : "default"}
                className={`p-2 sm:p-2.5 flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:shadow-lg bg-white h-full ${
                  item.isHighlight
                    ? "border-primary/60 ring-1 ring-primary/30"
                    : "border-slate-200 hover:border-primary/50"
                }`}
                onClick={() => setSelectedPhoto(item)}
              >
                {/* Image Frame with Object Contain: zero crop! */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900/5 border border-slate-200/80 mb-2 flex items-center justify-center p-1.5">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />

                  {item.isHighlight && (
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-primary text-white text-[9px] font-extrabold flex items-center gap-0.5 shadow-sm">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      <span>Destaque</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] bg-white text-accent font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                      <ZoomIn className="w-3 h-3 text-primary" />
                      Ampliar
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center px-0.5 pb-0.5">
                  <h5 className="text-[11px] sm:text-xs font-bold text-accent font-sora truncate w-full" title={item.title}>
                    {item.title}
                  </h5>
                  <span className="text-[9px] text-slate-500 font-medium block truncate mt-0.5">
                    {item.subtitle || item.category}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer text */}
      <div className="text-center pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
        <span>Clique em qualquer premiação para visualizar em alta resolução sem cortes.</span>
      </div>
    </div>
  );
};
