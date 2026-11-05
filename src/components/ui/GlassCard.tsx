"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: "default" | "subtle" | "glow" | "interactive";
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  let baseClass = "rounded-2xl relative overflow-hidden transition-[border-color,box-shadow,transform] duration-300 ";

  if (variant === "default") {
    baseClass += "bg-white/95 border border-slate-200/90 shadow-card ";
  } else if (variant === "subtle") {
    baseClass += "bg-slate-50/90 border border-slate-200/60 shadow-sm ";
  } else if (variant === "glow") {
    baseClass += "bg-white border-2 border-primary/30 shadow-glow ";
  } else if (variant === "interactive") {
    baseClass += "bg-white border border-slate-200 shadow-card card-shine [@media(hover:hover)]:hover:border-primary/50 [@media(hover:hover)]:hover:shadow-glow active:scale-[0.985] ";
  }

  return (
    <motion.div className={`${baseClass} ${className}`} {...props}>
      {children}
    </motion.div>
  );
};
