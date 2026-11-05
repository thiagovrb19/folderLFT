"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationStore } from "@/products/gestao/lib/store";
import { SlideId, DEFAULT_SLIDE_ORDER } from "@/products/gestao/lib/slideRegistry";
import { Header } from "@/products/gestao/components/layout/Header";
import { NavigationDock } from "@/products/gestao/components/layout/NavigationDock";
import { SetupModal } from "@/products/gestao/components/layout/SetupModal";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { DrawingCanvasOverlay } from "@/products/gestao/components/ui/DrawingCanvasOverlay";

// Modular Slides
import { Slide0Setup } from "@/products/gestao/components/slides/Slide0Setup";
import { Slide1HeroBanner } from "@/products/gestao/components/slides/Slide1HeroBanner";
import { Slide2WelcomeClient } from "@/products/gestao/components/slides/Slide2WelcomeClient";
import { Slide3Autoridade } from "@/products/gestao/components/slides/Slide3Autoridade";
import { Slide4Team } from "@/products/gestao/components/slides/Slide4Team";
import { Slide5TimesSquare } from "@/products/gestao/components/slides/Slide5TimesSquare";
import { Slide6Premiacoes } from "@/products/gestao/components/slides/Slide6Premiacoes";
import { Slide8OndeAtuamos } from "@/products/gestao/components/slides/Slide8OndeAtuamos";
import { Slide9Solucoes } from "@/products/gestao/components/slides/Slide9Solucoes";
import { Slide10Parceiros } from "@/products/gestao/components/slides/Slide10Parceiros";
import { Slide11Casos } from "@/products/gestao/components/slides/Slide11Casos";
import { Slide12Realidade } from "@/products/gestao/components/slides/Slide12Realidade";
import { Slide13Canvas } from "@/products/gestao/components/slides/Slide13Canvas";
import { Slide14Fechamento } from "@/products/gestao/components/slides/Slide14Fechamento";

export default function ApresentacaoPage() {
  const [mounted, setMounted] = useState(false);
  const { currentSlide, slideOrder, isDrawingMode, nextSlide, prevSlide } =
    usePresentationStore();
  const [swipeDirection, setSwipeDirection] = useState<number>(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeSlideOrder: SlideId[] =
    slideOrder && Array.isArray(slideOrder) && slideOrder.length > 0
      ? slideOrder
      : DEFAULT_SLIDE_ORDER;

  const currentSlideId =
    currentSlide > 0 ? safeSlideOrder[currentSlide - 1] || "hero" : "setup";

  const handleTouchStart = (e: React.TouchEvent) => {
    // Disable swipe when drawing mode is active or when on Canvas slide
    if (isDrawingMode || currentSlideId === "canvas") return;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isDrawingMode || currentSlideId === "canvas" || touchStartX === null)
      return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 70) {
      setSwipeDirection(1);
      nextSlide();
    } else if (diff < -70) {
      setSwipeDirection(-1);
      prevSlide();
    }
    setTouchStartX(null);
  };

  const renderSlideById = (id: SlideId) => {
    switch (id) {
      case "hero":
        return <Slide1HeroBanner />;
      case "welcome":
        return <Slide2WelcomeClient />;
      case "autoridade":
        return <Slide3Autoridade />;
      case "team":
        return <Slide4Team />;
      case "timesSquare":
        return <Slide5TimesSquare />;
      case "premiacoes":
        return <Slide6Premiacoes />;
      case "ondeAtuamos":
        return <Slide8OndeAtuamos />;
      case "solucoes":
        return <Slide9Solucoes />;
      case "parceiros":
        return <Slide10Parceiros />;
      case "casos":
        return <Slide11Casos />;
      case "realidade":
        return <Slide12Realidade />;
      case "canvas":
        return <Slide13Canvas />;
      case "fechamento":
        return <Slide14Fechamento />;
      default:
        return <Slide1HeroBanner />;
    }
  };

  const renderCurrentSlide = () => {
    if (currentSlide === 0) {
      return <Slide0Setup />;
    }
    const targetSlideId = safeSlideOrder[currentSlide - 1] || "hero";
    return renderSlideById(targetSlideId);
  };

  const slideVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      scale: 0.98,
      x: dir > 0 ? 30 : -30,
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 0.98,
      x: dir > 0 ? -30 : 30,
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  if (!mounted) {
    return (
      <main className="relative h-dvh w-screen overflow-hidden bg-white select-none flex flex-col justify-center items-center">
        <Slide0Setup />
      </main>
    );
  }

  return (
    <main
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-dvh w-screen overflow-hidden bg-white select-none flex flex-col justify-between"
    >
      <ParticleBackground />

      <Header />

      {/* Freehand Drawing Overlay across all pages */}
      <DrawingCanvasOverlay />

      <div className="relative flex-1 w-full h-full overflow-hidden z-10 pt-2 sm:pt-3 pb-12 sm:pb-14">
        <AnimatePresence mode="wait" custom={swipeDirection}>
          <motion.div
            key={`${currentSlide}-${currentSlideId}`}
            custom={swipeDirection}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full flex flex-col justify-center will-change-transform"
          >
            {renderCurrentSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      <NavigationDock />

      <SetupModal />
    </main>
  );
}
