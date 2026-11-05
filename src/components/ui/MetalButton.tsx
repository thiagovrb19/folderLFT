"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface MetalButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "glow";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
}

export const MetalButton: React.FC<MetalButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...props
}) => {
  let sizeClass = "px-5 py-2.5 text-sm";
  if (size === "sm") sizeClass = "px-3.5 py-1.5 text-xs";
  if (size === "lg") sizeClass = "px-8 py-3.5 text-base font-semibold";

  let variantClass = "";
  if (variant === "primary") {
    variantClass =
      "bg-primary hover:bg-primary-hover text-white font-semibold shadow-glow border border-primary/40";
  } else if (variant === "glow") {
    variantClass =
      "bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold shadow-glow-lg border border-primary/60";
  } else if (variant === "secondary") {
    variantClass =
      "bg-secondary hover:bg-secondary-hover text-accent border border-slate-200 shadow-sm";
  } else if (variant === "outline") {
    variantClass =
      "bg-white hover:bg-slate-50 text-primary border border-primary/40 hover:border-primary shadow-sm";
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 cursor-pointer overflow-hidden ${sizeClass} ${variantClass} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
