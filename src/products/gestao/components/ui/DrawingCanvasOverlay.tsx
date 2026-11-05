"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { usePresentationStore } from "@/products/gestao/lib/store";
import { DEFAULT_SLIDE_ORDER, SlideId } from "@/products/gestao/lib/slideRegistry";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool,
  Highlighter,
  Eraser,
  Undo2,
  Trash2,
  Check,
  X,
  Sparkles,
} from "lucide-react";

type DrawTool = "pen" | "highlighter" | "eraser";

interface Point {
  x: number;
  y: number;
}

const PALETTE = [
  { name: "Azul LFT", color: "#0072D5" },
  { name: "Vermelho Alerta", color: "#EF4444" },
  { name: "Dourado", color: "#F59E0B" },
  { name: "Verde Sucesso", color: "#10B981" },
  { name: "Grafite Escuro", color: "#0F172A" },
  { name: "Branco", color: "#FFFFFF" },
];

export const DrawingCanvasOverlay: React.FC = () => {
  const {
    currentSlide,
    slideOrder,
    isDrawingMode,
    setIsDrawingMode,
    slideDrawings,
    setSlideDrawing,
    clearCurrentSlideDrawing,
  } = usePresentationStore();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTool, setActiveTool] = useState<DrawTool>("pen");
  const [activeColor, setActiveColor] = useState<string>("#0072D5");
  const [penSize, setPenSize] = useState<number>(3.5);
  const [highlighterSize, setHighlighterSize] = useState<number>(22);
  const [eraserSize, setEraserSize] = useState<number>(26);

  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const historyRef = useRef<ImageData[]>([]);

  const safeSlideOrder: SlideId[] =
    slideOrder && Array.isArray(slideOrder) && slideOrder.length > 0
      ? slideOrder
      : DEFAULT_SLIDE_ORDER;

  const safeDrawings = slideDrawings || {};
  const drawingsRef = useRef(safeDrawings);
  drawingsRef.current = safeDrawings;

  // Identify current slide key
  const currentSlideKey =
    currentSlide === 0
      ? "setup"
      : safeSlideOrder[currentSlide - 1] || `slide-${currentSlide}`;

  // Keyboard shortcut to exit drawing mode (Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDrawingMode && (e.key === "Escape" || e.key === "Esc")) {
        setIsDrawingMode(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawingMode, setIsDrawingMode]);

  // Helper to load image data URL into canvas without any scaling or shift
  const loadSlideDrawing = useCallback(
    (dataUrl: string | undefined) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      historyRef.current = [];

      if (!dataUrl) return;

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        try {
          const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
          historyRef.current = [snapshot];
        } catch {}
      };
      img.src = dataUrl;
    },
    []
  );

  // Resize canvas according to 1:1 window size (eliminates coordinate offsets completely)
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Only resize if dimensions changed
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Reload slide drawing
      loadSlideDrawing(drawingsRef.current[currentSlideKey]);
    }
  }, [currentSlideKey, loadSlideDrawing]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // When slide changes, reload its drawing
  useEffect(() => {
    loadSlideDrawing(drawingsRef.current[currentSlideKey]);
  }, [currentSlideKey, loadSlideDrawing]);

  // Helper to apply current tool styles
  const applyStyles = (ctx: CanvasRenderingContext2D) => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (activeTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = eraserSize;
    } else if (activeTool === "highlighter") {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = activeColor;
      ctx.fillStyle = activeColor;
      ctx.lineWidth = highlighterSize;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = activeColor;
      ctx.fillStyle = activeColor;
      ctx.lineWidth = penSize;
    }
  };

  // Save current canvas state to store
  const saveCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const dataUrl = canvas.toDataURL("image/png");
      setSlideDrawing(currentSlideKey, dataUrl);

      // Save history step (up to 15 steps)
      const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      historyRef.current.push(snapshot);
      if (historyRef.current.length > 15) {
        historyRef.current.shift();
      }
    } catch {}
  }, [currentSlideKey, setSlideDrawing]);

  // Pointer event handlers with continuous lines
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Capture pointer so fast drags don't drop strokes
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    isDrawingRef.current = true;
    lastPointRef.current = { x, y };

    // Draw initial dot/point so single taps register
    ctx.save();
    applyStyles(ctx);
    ctx.beginPath();
    const radius =
      activeTool === "eraser"
        ? eraserSize / 2
        : activeTool === "highlighter"
        ? highlighterSize / 2
        : penSize / 2;
    ctx.arc(x, y, Math.max(radius, 1), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode || !isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const last = lastPointRef.current;
    if (!last) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Draw continuous unbroken stroke segment from previous point to current point
    ctx.save();
    applyStyles(ctx);
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.restore();

    lastPointRef.current = { x, y };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode || !isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    saveCanvas();
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (historyRef.current.length > 1) {
      historyRef.current.pop(); // Remove current state
      const prev = historyRef.current[historyRef.current.length - 1];
      ctx.putImageData(prev, 0, 0);
      try {
        setSlideDrawing(currentSlideKey, canvas.toDataURL("image/png"));
      } catch {}
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      historyRef.current = [];
      clearCurrentSlideDrawing(currentSlideKey);
    }
  };

  const handleClearSlide = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    historyRef.current = [];
    clearCurrentSlideDrawing(currentSlideKey);
  };

  const hasDrawing = Boolean(safeDrawings[currentSlideKey]);

  return (
    <>
      {/* Full Screen Drawing Canvas Layer */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`fixed inset-0 z-30 touch-none ${
          isDrawingMode
            ? "pointer-events-auto cursor-crosshair opacity-100"
            : hasDrawing
            ? "pointer-events-none opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Quick Top-Right Floating Exit Button (Always accessible & clickable) */}
      <AnimatePresence>
        {isDrawingMode && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsDrawingMode(false)}
            className="fixed top-3 right-3 z-50 bg-red-600 hover:bg-red-700 text-white font-bold px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 text-xs transition-all cursor-pointer active:scale-95"
            title="Fechar Modo Caneta (Esc)"
          >
            <X className="w-4 h-4 text-white stroke-[2.5]" />
            <span>Fechar Caneta</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Drawing Toolbar (Centered, Auto-Fitted, Responsive) */}
      <AnimatePresence>
        {isDrawingMode && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-3 left-3 sm:left-1/2 sm:-translate-x-1/2 z-50 bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl shadow-2xl p-1.5 sm:p-2 flex flex-wrap items-center gap-1 sm:gap-2 max-w-[calc(100vw-120px)] sm:max-w-[90vw]"
          >
            {/* Tool Selection */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => setActiveTool("pen")}
                className={`p-1.5 sm:p-2 rounded-lg transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer ${
                  activeTool === "pen"
                    ? "bg-white text-primary shadow-xs font-bold"
                    : "text-slate-600 hover:text-accent"
                }`}
                title="Caneta Contínua"
              >
                <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline text-xs">Caneta</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTool("highlighter")}
                className={`p-1.5 sm:p-2 rounded-lg transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer ${
                  activeTool === "highlighter"
                    ? "bg-white text-primary shadow-xs font-bold"
                    : "text-slate-600 hover:text-accent"
                }`}
                title="Marca-Texto Transparente"
              >
                <Highlighter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline text-xs">Marca-Texto</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTool("eraser")}
                className={`p-1.5 sm:p-2 rounded-lg transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer ${
                  activeTool === "eraser"
                    ? "bg-white text-red-600 shadow-xs font-bold"
                    : "text-slate-600 hover:text-accent"
                }`}
                title="Borracha"
              >
                <Eraser className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline text-xs">Borracha</span>
              </button>
            </div>

            {/* Palette (when not erasing) */}
            {activeTool !== "eraser" && (
              <div className="flex items-center gap-1 px-1 sm:px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded-xl">
                {PALETTE.map((p) => (
                  <button
                    key={p.color}
                    type="button"
                    onClick={() => setActiveColor(p.color)}
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-transform flex items-center justify-center border cursor-pointer ${
                      p.color === "#FFFFFF" ? "border-slate-300" : "border-transparent"
                    } ${
                      activeColor === p.color ? "scale-110 ring-2 ring-primary ring-offset-1" : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: p.color }}
                    title={p.name}
                  >
                    {activeColor === p.color && (
                      <Check
                        className={`w-2.5 h-2.5 ${
                          p.color === "#FFFFFF" || p.color === "#F59E0B"
                            ? "text-slate-900"
                            : "text-white"
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Stroke Thickness Quick Toggle */}
            {activeTool === "pen" && (
              <div className="hidden md:flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                {[
                  { label: "Fina", val: 2.5 },
                  { label: "Média", val: 4.5 },
                  { label: "Grossa", val: 7.5 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setPenSize(item.val)}
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      penSize === item.val
                        ? "bg-white text-primary shadow-xs"
                        : "text-slate-500 hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {/* Action Buttons: Undo & Clear */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleUndo}
                className="p-1 sm:p-1.5 rounded-xl text-slate-600 hover:text-accent hover:bg-slate-100 transition-all border border-slate-200 cursor-pointer"
                title="Desfazer Último Traço"
              >
                <Undo2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                type="button"
                onClick={handleClearSlide}
                className="p-1 sm:p-1.5 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all border border-slate-200 cursor-pointer"
                title="Limpar Desenhos Desta Página"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Concluir / Fechar Button on Toolbar */}
            <button
              type="button"
              onClick={() => setIsDrawingMode(false)}
              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-hover shadow-sm transition-all flex items-center gap-1 cursor-pointer ml-auto"
              title="Concluir e Voltar para Apresentação"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Concluir</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
