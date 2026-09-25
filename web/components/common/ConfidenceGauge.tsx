import React from "react";

export function ConfidenceGauge({
  score,
  label = "Model Confidence",
  size = "md",
}: {
  score: number; // 0..1 or 0..100
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  const normalized = score > 1 ? score : score * 100;
  const isHigh = normalized >= 75;
  const isMed = normalized >= 50 && normalized < 75;

  const color = isHigh ? "text-emerald-400 bg-emerald-400" : isMed ? "text-amber-400 bg-amber-400" : "text-rose-400 bg-rose-400";
  const ringColor = isHigh ? "border-emerald-500/40" : isMed ? "border-amber-500/40" : "border-rose-500/40";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">{label}</span>
        <span className={`font-mono font-bold ${color.split(" ")[0]}`}>
          {Math.round(normalized)}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800 border border-white/5">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color.split(" ")[1]}`}
          style={{ width: `${Math.min(100, Math.max(5, normalized))}%` }}
        />
      </div>
    </div>
  );
}

export function PriorityGauge({ score }: { score: number }) {
  const isCrit = score >= 75;
  const isHigh = score >= 55 && score < 75;
  const isMed = score >= 30 && score < 55;

  const color = isCrit ? "#f43f5e" : isHigh ? "#fb7185" : isMed ? "#f59e0b" : "#10b981";

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/10 bg-navy-950/60">
      <div className="relative flex items-center justify-center w-24 h-24">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-slate-800"
            strokeWidth="3.5"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            strokeDasharray={`${score}, 100`}
            strokeWidth="3.5"
            strokeLinecap="round"
            stroke={color}
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-mono text-2xl font-black text-white">{score}</span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">/ 100</span>
        </div>
      </div>
      <span className="mt-1 text-xs font-mono font-semibold uppercase" style={{ color }}>
        {isCrit ? "CRITICAL" : isHigh ? "HIGH" : isMed ? "MEDIUM" : "LOW"} PRIORITY
      </span>
    </div>
  );
}
