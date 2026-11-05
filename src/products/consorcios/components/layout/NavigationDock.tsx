"use client";

import React, { useState, useEffect } from "react";
import { usePresentationStore } from "@/products/consorcios/lib/store";
import {
  SLIDE_DEFINITIONS,
  SlideId,
} from "@/products/consorcios/types/presentation";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  FileSpreadsheet,
  Award,
  Users,
  Building2,
  ShieldCheck,
  SendHorizontal,
  Trophy,
  UserCheck,
  Layers,
  Gift,
  Sparkles,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ICONS_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileSpreadsheet,
  Award,
  Users,
  Building2,
  ShieldCheck,
  SendHorizontal,
  Trophy,
  UserCheck,
  Layers,
  Gift,
  Sparkles,
};

export const NavigationDock: React.FC = () => {
  const {
    currentSlide,
    slideOrder,
    isSetupCompleted,
    setSlide,
    nextSlide,
    prevSlide,
    setReorderModalOpen,
  } = usePresentationStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        if (isSetupCompleted || currentSlide > 0) {
          nextSlide();
        }
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, setSlide, isSetupCompleted, currentSlide]);

  const totalPresentationSlides = slideOrder.length;

  // Build dynamic slide items list from slideOrder
  const dynamicSlideItems = [
    {
      id: 0,
      label: "Setup Inicial",
      icon: FileSpreadsheet,
      category: "Config",
    },
    ...slideOrder.map((sId: SlideId, idx: number) => {
      const def = SLIDE_DEFINITIONS[sId];
      const IconComp = ICONS_MAP[def?.iconName || ""] || Layers;
      return {
        id: idx + 1,
        label: def?.label || sId,
        icon: IconComp,
        category: def?.category || "",
      };
    }),
  ];

  // If on Slide 0 and setup is not completed, hide the dock to force form completion
  if (currentSlide === 0 && !isSetupCompleted) {
    return null;
  }

  return (
    <>
      {/* Slide Navigation Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[640px] z-50 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 mb-3">
              <span className="text-xs font-bold text-accent font-sora flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5 text-primary" />
                Navegação Rápida (Consórcio LFT)
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setReorderModalOpen(true);
                  }}
                  className="text-[11px] text-primary hover:bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20 font-semibold cursor-pointer flex items-center gap-1 transition-all"
                  title="Organizar sequência dos slides"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Organizar Ordem</span>
                </button>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[11px] text-slate-500 hover:text-accent px-2 py-1 rounded-lg bg-slate-100 font-semibold cursor-pointer"
                >
                  Fechar ✕
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[50vh] overflow-y-auto p-1">
              {dynamicSlideItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSlide === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSlide(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`p-2 sm:p-2.5 rounded-xl text-left transition-all flex flex-col gap-1 border cursor-pointer ${
                      isActive
                        ? "bg-primary/10 border-primary text-primary font-bold shadow-xs"
                        : "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-primary font-bold">
                        {item.id < 10 ? `0${item.id}` : item.id}
                      </span>
                      <Icon className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <span className="text-[11px] font-semibold truncate font-sora">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Control Dock */}
      <nav className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-sm border border-slate-200 px-2.5 sm:px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 sm:gap-2 max-w-[95vw]">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={currentSlide <= 1}
          className={`p-1.5 sm:p-2 rounded-full transition-all flex items-center justify-center ${
            currentSlide <= 1
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-700 hover:bg-slate-100 active:scale-95 bg-slate-50 border border-slate-200 cursor-pointer"
          }`}
          title="Slide Anterior (←)"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2">
          {Array.from({ length: totalPresentationSlides }).map((_, idx) => {
            const slideNum = idx + 1;
            const targetSlideId = slideOrder[idx];
            const targetDef = SLIDE_DEFINITIONS[targetSlideId];
            return (
              <button
                key={slideNum}
                onClick={() => setSlide(slideNum)}
                className={`h-2 transition-all rounded-full cursor-pointer ${
                  currentSlide === slideNum
                    ? "w-6 sm:w-8 bg-primary shadow-xs"
                    : "w-2 sm:w-2.5 bg-slate-200 hover:bg-slate-400"
                }`}
                title={`Slide ${slideNum < 10 ? `0${slideNum}` : slideNum}: ${targetDef?.label || ""}`}
              />
            );
          })}
        </div>

        {/* Grid Menu Trigger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-1.5 sm:p-2 rounded-full transition-all cursor-pointer ${
            isMenuOpen ? "bg-primary text-white font-bold" : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Ver todos os slides"
        >
          <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={currentSlide === totalPresentationSlides}
          className={`p-1.5 sm:p-2 rounded-full transition-all flex items-center justify-center ${
            currentSlide === totalPresentationSlides
              ? "text-slate-300 cursor-not-allowed"
              : "text-white bg-primary hover:bg-primary-hover active:scale-95 font-bold shadow-sm cursor-pointer"
          }`}
          title="Próximo Slide (→)"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
        </button>
      </nav>
    </>
  );
};
