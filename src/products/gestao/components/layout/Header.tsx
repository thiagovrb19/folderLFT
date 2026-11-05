"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationStore } from "@/products/gestao/lib/store";
import { getSlideConfig, DEFAULT_SLIDE_ORDER, SlideId } from "@/products/gestao/lib/slideRegistry";
import {
  Maximize2,
  Minimize2,
  Sliders,
  PenTool,
  ArrowLeftRight,
  Clock,
  UserCheck,
  RotateCcw,
  Menu,
  ChevronUp,
} from "lucide-react";

export const Header: React.FC = () => {
  const {
    client,
    currentSlide,
    slideOrder,
    isSetupCompleted,
    setSlide,
    setSetupModalOpen,
    presentationStartTime,
    resetAll,
    isDrawingMode,
    toggleDrawingMode,
  } = usePresentationStore();

  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (presentationStartTime) {
        const diff = Math.floor((Date.now() - presentationStartTime) / 60000);
        setElapsedMinutes(diff);
      }
    }, 15000);
    return () => clearInterval(timer);
  }, [presentationStartTime]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const safeSlideOrder: SlideId[] =
    slideOrder && Array.isArray(slideOrder) && slideOrder.length > 0
      ? slideOrder
      : DEFAULT_SLIDE_ORDER;

  const totalSlides = safeSlideOrder.length;
  const targetSlideKey =
    currentSlide > 0 ? safeSlideOrder[currentSlide - 1] || "hero" : "hero";

  const currentTitle =
    currentSlide === 0
      ? "Setup Inicial"
      : getSlideConfig(targetSlideKey)?.title || "Apresentação";

  // If on Slide 0 and setup is not done, keep hidden
  if (currentSlide === 0 && !isSetupCompleted) {
    return null;
  }

  return (
    <>
      {/* Floating Menu Trigger Button (when Navbar is hidden) */}
      {!isHeaderOpen && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          onClick={() => setIsHeaderOpen(true)}
          className="fixed top-3 right-3 sm:right-6 z-40 bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-md hover:shadow-lg text-slate-700 hover:text-primary hover:border-primary px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all text-xs font-semibold cursor-pointer group active:scale-95"
          title="Abrir Menu de Ferramentas"
        >
          <Menu className="w-3.5 h-3.5 text-primary group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-[11px] font-medium text-slate-600">Menu</span>
          <span className="text-[10px] font-mono text-primary font-bold px-1.5 py-0.5 rounded-full bg-primary/10">
            {currentSlide < 10 ? `0${currentSlide}` : currentSlide}/{totalSlides}
          </span>
        </motion.button>
      )}

      {/* Full Header Bar (when opened by user) */}
      <AnimatePresence>
        {isHeaderOpen && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 inset-x-0 h-14 sm:h-16 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between shadow-lg"
          >
            {/* Left: Brand Logo & Slide Breadcrumb */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setSlide(1)}
              >
                <div className="relative h-7 sm:h-8 w-24 sm:w-28 transition-transform group-hover:scale-105">
                  <Image
                    src="/assets/logos/logo-lft-azul.png"
                    alt="LFT Gestão"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs">
                <span className="text-slate-300">•</span>
                <span className="text-primary font-mono font-bold">
                  {currentSlide < 10 ? `0${currentSlide}` : currentSlide}/{totalSlides}
                </span>
                <span className="text-slate-700 font-semibold">{currentTitle}</span>
              </div>
            </div>

            {/* Center: Exclusive Client Badge */}
            <div className="flex items-center">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 shadow-xs">
                <UserCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                <span className="text-[11px] sm:text-xs font-medium text-slate-600 truncate max-w-[140px] sm:max-w-[240px]">
                  Cliente: <strong className="text-accent">{client.name || "Convidado"}</strong>
                </span>
              </div>
            </div>

            {/* Right: Quick Tools & Close Navbar Button */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs border border-slate-200">
                <Clock className="w-3 h-3 text-primary" />
                <span>{elapsedMinutes}m</span>
              </div>

              {/* Voltar à tela inicial para trocar de folder (os dados deste folder ficam salvos) */}
              <Link
                href="/"
                className="p-1.5 sm:p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 hover:border-primary/50 transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer"
                title="Voltar à tela inicial e trocar de folder"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Trocar folder</span>
              </Link>

              {/* Pen Annotation Tool (Toggles freehand drawing on current page) */}
              <button
                onClick={() => {
                  toggleDrawingMode();
                  setIsHeaderOpen(false);
                }}
                className={`p-1.5 sm:p-2 rounded-lg border transition-all flex items-center gap-1 text-xs font-semibold ${
                  isDrawingMode
                    ? "bg-primary text-white border-primary font-bold shadow-glow"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:border-primary/50"
                }`}
                title="Caneta Livre (Anotar em Qualquer Página)"
              >
                <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{isDrawingMode ? "Caneta Ativa" : "Caneta"}</span>
              </button>

              <button
                onClick={toggleFullscreen}
                className="hidden sm:block p-1.5 sm:p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 hover:border-primary/50 transition-all"
                title="Tela Cheia"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>

              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Deseja reiniciar a apresentação para um novo atendimento? Todos os dados e anotações de caneta serão limpos."
                    )
                  ) {
                    resetAll();
                  }
                }}
                className="p-1.5 sm:p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-red-500 hover:bg-red-50 border border-slate-200 transition-all"
                title="Reiniciar Apresentação (Limpar Anotações e Dados)"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={() => {
                  setSetupModalOpen(true);
                  setIsHeaderOpen(false);
                }}
                className="p-1.5 sm:p-2 rounded-lg bg-primary text-white hover:bg-primary-hover border border-primary shadow-sm transition-all"
                title="Configurações e Ordem dos Slides"
              >
                <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Close/Hide Header Button */}
              <button
                onClick={() => setIsHeaderOpen(false)}
                className="p-1.5 sm:p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-accent border border-slate-200 transition-all flex items-center gap-1 text-xs ml-1"
                title="Ocultar Menu"
              >
                <ChevronUp className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline text-[11px] font-semibold">Ocultar</span>
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
};
