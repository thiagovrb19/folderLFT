"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Award, Sparkles, X, MapPin, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export const Slide5TimesSquare: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const photos = [
    {
      src: "/assets/recognition/eua-times-square-lft-lucas.jpeg",
      title: "Visão Panorâmica de Manhattan",
      tag: "Times Square • NYC",
      caption: "Lucas Teixeira nos telões da Times Square, NYC",
      description: "Destaque nos icônicos telões de Nova York, marcando a presença da LFT no cenário mundial.",
    },
    {
      src: "/assets/recognition/eua-times-square-lft-lucas-2.jpeg",
      title: "Destaque no Telão Principal",
      tag: "Life Planner Franchisee Broker",
      caption: "Reconhecimento Internacional Prudential of Brazil",
      description: "Homenagem no topo da torre da Times Square pela excelência em consultoria e proteção patrimonial.",
    },
  ];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Zoom / Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm"
            onClick={() => setActivePhotoIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-slate-950/95 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-3 sm:p-5 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-[11px] font-bold uppercase tracking-wider">
                    {photos[activePhotoIndex].tag}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white font-sora truncate">
                    {photos[activePhotoIndex].title}
                  </h3>
                </div>
                <button
                  onClick={() => setActivePhotoIndex(null)}
                  className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Fechar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image Display (Full view with object-contain to never cut off the top) */}
              <div className="relative h-[55vh] sm:h-[65vh] w-full rounded-2xl overflow-hidden bg-black/80 my-3 flex items-center justify-center">
                <Image
                  src={photos[activePhotoIndex].src}
                  alt={photos[activePhotoIndex].caption}
                  fill
                  priority
                  className="object-contain"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-primary text-white backdrop-blur-sm border border-white/10 transition-all"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-primary text-white backdrop-blur-sm border border-white/10 transition-all"
                  aria-label="Próxima foto"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Indicator dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhotoIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        activePhotoIndex === i ? "w-6 bg-primary" : "w-2 bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Ver foto ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Modal Caption */}
              <div className="px-1 text-center sm:text-left">
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {photos[activePhotoIndex].description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2 border border-primary/20">
          <MapPin className="w-3.5 h-3.5" />
          <span>Reconhecimento Global</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-accent">
          Da nossa cidade para o <span className="text-metal-shift">coração de Nova York.</span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2 leading-relaxed max-w-2xl mx-auto">
          Lucas Teixeira, diretor da LFT, foi destaque nos telões da Times Square por sua atuação como Life Planner Franchisee Broker da Prudential of Brazil, um marco que coloca a LFT entre os nomes referência do setor no mundo.
        </p>
      </div>

      {/* Two Photos Showcase Side by Side with Top-Focused Framing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto w-full">
        {photos.map((p, idx) => (
          <GlassCard
            key={idx}
            variant="glow"
            className="p-3 sm:p-3.5 flex flex-col items-center cursor-pointer group hover:scale-[1.02] hover:border-primary/60 transition-all shadow-md hover:shadow-xl"
            onClick={() => setActivePhotoIndex(idx)}
          >
            <div className="relative h-72 sm:h-80 md:h-[350px] lg:h-[380px] w-full rounded-2xl overflow-hidden shadow-inner bg-slate-900">
              {/* Image with object-top to focus on Lucas Teixeira and the main top billboard */}
              <Image
                src={p.src}
                alt={p.caption}
                fill
                priority={idx === 0}
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Subtle top badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20 text-white text-[10px] sm:text-[11px] font-semibold shadow-sm">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{p.tag}</span>
              </div>

              {/* Expand badge top-right */}
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/20 opacity-80 group-hover:opacity-100 group-hover:bg-primary transition-all">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-3 px-3.5 flex flex-col justify-end text-white">
                <h4 className="font-bold font-sora text-xs sm:text-sm text-white drop-shadow-sm">
                  {p.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 mt-0.5">
                  {p.caption}
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-[10px] text-primary-200">
                  <span className="text-sky-300 font-medium">Toque para ver em tela cheia</span>
                  <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-white font-semibold">
                    Ampliar 🔍
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
