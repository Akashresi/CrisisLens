import React from "react";

export function GlassCard({
  children,
  className = "",
  glow = false,
  glowColor = "cyan",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: "cyan" | "red" | "amber" | "emerald";
  onClick?: () => void;
}) {
  const glowStyles = {
    cyan: "shadow-[0_4px_20px_rgba(6,182,212,0.12)] border-cyan-300",
    red: "shadow-[0_4px_20px_rgba(244,63,94,0.12)] border-red-300",
    amber: "shadow-[0_4px_20px_rgba(245,158,11,0.12)] border-amber-300",
    emerald: "shadow-[0_4px_20px_rgba(16,185,129,0.12)] border-emerald-300",
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl border border-slate-200 bg-white/95 shadow-xs backdrop-blur-xl transition-all duration-300 ${
        glow ? glowStyles[glowColor] : "hover:border-slate-300"
      } ${onClick ? "cursor-pointer hover:bg-slate-50/90" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
