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
    cyan: "shadow-[0_0_20px_rgba(6,182,212,0.15)] border-cyan-500/30",
    red: "shadow-[0_0_20px_rgba(244,63,94,0.15)] border-red-500/30",
    amber: "shadow-[0_0_20px_rgba(245,158,11,0.15)] border-amber-500/30",
    emerald: "shadow-[0_0_20px_rgba(16,185,129,0.15)] border-emerald-500/30",
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl border border-white/10 bg-navy-900/70 backdrop-blur-xl transition-all duration-300 ${
        glow ? glowStyles[glowColor] : "hover:border-white/20"
      } ${onClick ? "cursor-pointer hover:bg-navy-900/90" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
