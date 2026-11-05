"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationStore } from "@/products/consorcios/lib/store";
import { Header } from "@/products/consorcios/components/layout/Header";
import { NavigationDock } from "@/products/consorcios/components/layout/NavigationDock";
import { SetupModal } from "@/products/consorcios/components/layout/SetupModal";
import { SlideOrderModal } from "@/products/consorcios/components/layout/SlideOrderModal";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { DrawingCanvasOverlay } from "@/products/consorcios/components/ui/DrawingCanvasOverlay";
import { SlideId } from "@/products/consorcios/types/presentation";

// Modular Slides (0 to 10) - Focus Consórcio
import { Slide0Setup } from "@/products/consorcios/components/slides/Slide0Setup";
import { Slide1HeroBanner } from "@/products/consorcios/components/slides/Slide1HeroBanner";
import { Slide2WelcomeClient } from "@/products/consorcios/components/slides/Slide2WelcomeClient";
import { SlideConsorcioOQueE } from "@/products/consorcios/components/slides/SlideConsorcioOQueE";
import { SlideConsorcioContemplacao } from "@/products/consorcios/components/slides/SlideConsorcioContemplacao";
import { SlideConsorcioVantagens } from "@/products/consorcios/components/slides/SlideConsorcioVantagens";
import { Slide3Autoridade } from "@/products/consorcios/components/slides/Slide3Autoridade";
import { Slide4Team } from "@/products/consorcios/components/slides/Slide4Team";
import { Slide6Premiacoes } from "@/products/consorcios/components/slides/Slide6Premiacoes";
import { Slide11ParceirosConsorcios } from "@/products/consorcios/components/slides/Slide11ParceirosConsorcios";
import { Slide14Fechamento } from "@/products/consorcios/components/slides/Slide14Fechamento";

export default function ApresentacaoPage() {
  const { currentSlide, nextSlide, prevSlide, slideOrder, isDrawingMode } =
    usePresentationStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [swipeDirection, setSwipeDirection] = useState<number>(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isDrawingMode) return;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isDrawingMode || touchStartX === null) return;
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

  const getSlideComponentById = (id: SlideId) => {
    switch (id) {
      case "welcome":
        return <Slide2WelcomeClient />;
      case "hero":
        return <Slide1HeroBanner />;
      case "autoridade":
        return <Slide3Autoridade />;
      case "premiacoes":
        return <Slide6Premiacoes />;
      case "team":
        return <Slide4Team />;
      case "consorcio-oque-e":
        return <SlideConsorcioOQueE />;
      case "contemplacao":
        return <SlideConsorcioContemplacao />;
      case "vantagens":
        return <SlideConsorcioVantagens />;
      case "parceiros":
        return <Slide11ParceirosConsorcios />;
      case "fechamento":
        return <Slide14Fechamento />;
      default:
        return <Slide1HeroBanner />;
    }
  };

  const renderSlide = () => {
    if (currentSlide === 0) {
      return <Slide0Setup />;
    }
    const currentSlideId = slideOrder[currentSlide - 1];
    if (!currentSlideId) {
      return <Slide1HeroBanner />;
    }
    return getSlideComponentById(currentSlideId);
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

      <DrawingCanvasOverlay />

      <div className="relative flex-1 w-full h-full overflow-hidden z-10 pt-2 sm:pt-3 pb-12 sm:pb-14">
        <AnimatePresence mode="wait" custom={swipeDirection}>
          <motion.div
            key={currentSlide}
            custom={swipeDirection}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full flex flex-col justify-center will-change-transform"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      <NavigationDock />

      <SetupModal />

      <SlideOrderModal />
    </main>
  );
}

