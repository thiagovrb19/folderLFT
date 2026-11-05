"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, LucideIcon } from "lucide-react";

interface FlipCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  frontDescription: string;
  frontBullets: string[];
  backTitle: string;
  backDescription: string;
  backHighlights: string[];
  accentColor?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  frontDescription,
  frontBullets,
  backTitle,
  backDescription,
  backHighlights,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 w-full h-[360px] cursor-pointer select-none group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative transform-style-3d transition-transform duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* ================= FRONT SIDE ================= */}
        <div className="absolute inset-0 backface-hidden rounded-2xl bg-card/70 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-sm shadow-glass hover:border-primary/40 hover:shadow-glow transition-all">
          {/* Top Row: Icon & Tag */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center border border-white/10 text-white shadow-inner">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary/80 bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                Pilar LFT
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1 font-sora">{title}</h3>
            <p className="text-xs text-primary font-medium mb-3">{subtitle}</p>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">{frontDescription}</p>

            <ul className="space-y-1.5">
              {frontBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center text-xs text-slate-200 gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Flip Prompt */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-slate-400 text-xs">
            <span className="text-[11px] text-slate-400">Toque para ver a estratégia</span>
            <div className="flex items-center gap-1 text-primary text-[11px] font-medium group-hover:underline">
              <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Girar Card</span>
            </div>
          </div>
        </div>

        {/* ================= BACK SIDE ================= */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-secondary/90 via-card/90 to-navy-deep/95 border border-primary/40 p-6 flex flex-col justify-between backdrop-blur-sm shadow-glow">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Diagnóstico & Ação
              </span>
              <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                Estratégia
              </span>
            </div>

            <h4 className="text-lg font-bold text-white mb-2 font-sora">{backTitle}</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">{backDescription}</p>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-primary uppercase">Solução Aplicada:</span>
              {backHighlights.map((item, idx) => (
                <div key={idx} className="bg-white/5 rounded-lg p-2 border border-white/5 text-[11px] text-slate-200 flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-slate-400 text-xs">
            <span className="text-[11px] text-slate-400">Toque para retornar</span>
            <div className="flex items-center gap-1 text-primary text-[11px] font-medium">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Voltar</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
