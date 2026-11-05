"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationStore } from "@/products/consorcios/lib/store";
import {
  SLIDE_DEFINITIONS,
  SlideId,
} from "@/products/consorcios/types/presentation";
import {
  X,
  Settings,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  Check,
  UserCheck,
  Award,
  ShieldCheck,
  Trophy,
  Users,
  Layers,
  Gift,
  Sparkles,
  Building2,
  SendHorizontal,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { MetalButton } from "@/components/ui/MetalButton";

const ICONS_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  UserCheck,
  Award,
  ShieldCheck,
  Trophy,
  Users,
  Layers,
  Gift,
  Sparkles,
  Building2,
  SendHorizontal,
};

export const SlideOrderModal: React.FC = () => {
  const {
    isReorderModalOpen,
    setReorderModalOpen,
    slideOrder,
    moveSlideOrder,
    resetSlideOrder,
    setSlide,
    currentSlide,
  } = usePresentationStore();

  const [savedFeedback, setSavedFeedback] = useState(false);

  if (!isReorderModalOpen) return null;

  const triggerSavedFeedback = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 1200);
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      moveSlideOrder(index, index - 1);
      triggerSavedFeedback();
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < slideOrder.length - 1) {
      moveSlideOrder(index, index + 1);
      triggerSavedFeedback();
    }
  };

  const handleReset = () => {
    if (window.confirm("Deseja restaurar a ordem padrão dos slides?")) {
      resetSlideOrder();
      triggerSavedFeedback();
    }
  };

  const handleJumpToSlide = (index: number) => {
    setSlide(index + 1);
    setReorderModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
        onClick={() => setReorderModalOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                <Settings className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-accent font-sora flex items-center gap-2">
                  <span>Organizador de Slides da Apresentação</span>
                  {savedFeedback && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 animate-pulse">
                      <CheckCircle2 className="w-3 h-3" /> Salvo
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-500">
                  Ajuste a ordem das seções para a sua apresentação. Salvo automaticamente no sistema.
                </p>
              </div>
            </div>
            <button
              onClick={() => setReorderModalOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-accent hover:bg-slate-100 transition-all cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Slide List (Scrollable) */}
          <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
            {slideOrder.map((slideId: SlideId, idx: number) => {
              const slideDef = SLIDE_DEFINITIONS[slideId];
              const IconComponent =
                ICONS_MAP[slideDef?.iconName || ""] || Layers;
              const isCurrent = currentSlide === idx + 1;

              return (
                <motion.div
                  key={slideId}
                  layout
                  transition={{ duration: 0.2 }}
                  className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all ${
                    isCurrent
                      ? "bg-primary/5 border-primary/40 ring-1 ring-primary/20 shadow-xs"
                      : "bg-slate-50 hover:bg-white border-slate-200/90 shadow-2xs"
                  }`}
                >
                  {/* Left: Position Number & Icon & Info */}
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                    <span className="w-7 h-7 rounded-xl bg-slate-200/80 text-accent font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>

                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 text-primary flex items-center justify-center flex-shrink-0 shadow-2xs">
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-accent font-sora truncate">
                          {slideDef?.label || slideId}
                        </h4>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            slideDef?.category === "Consórcio"
                              ? "bg-primary/10 text-primary"
                              : slideDef?.category === "Fechamento"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {slideDef?.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate hidden sm:block">
                        {slideDef?.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions (Up, Down, Jump) */}
                  <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0 ml-2">
                    <button
                      type="button"
                      onClick={() => handleJumpToSlide(idx)}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-primary border border-slate-200 transition-all text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      title="Abrir este slide agora"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden md:inline text-[10px]">Ver</span>
                    </button>

                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        idx === 0
                          ? "opacity-30 text-slate-400 border-slate-200 cursor-not-allowed bg-slate-100"
                          : "bg-white hover:bg-primary/10 hover:border-primary text-slate-700 hover:text-primary border-slate-200 cursor-pointer active:scale-95"
                      }`}
                      title="Mover para cima"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      disabled={idx === slideOrder.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        idx === slideOrder.length - 1
                          ? "opacity-30 text-slate-400 border-slate-200 cursor-not-allowed bg-slate-100"
                          : "bg-white hover:bg-primary/10 hover:border-primary text-slate-700 hover:text-primary border-slate-200 cursor-pointer active:scale-95"
                      }`}
                      title="Mover para baixo"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Controls */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-accent rounded-xl bg-slate-100 hover:bg-slate-200 transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200"
              title="Restaurar a sequência padrão recomendada"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Restaurar Ordem Padrão</span>
            </button>

            <MetalButton
              type="button"
              onClick={() => setReorderModalOpen(false)}
              variant="primary"
              size="md"
              icon={<Check className="w-4 h-4 text-white" />}
            >
              Concluir
            </MetalButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
