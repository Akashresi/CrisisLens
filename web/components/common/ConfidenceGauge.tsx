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

  const color = isHigh ? "text-emerald-700 bg-emerald-500" : isMed ? "text-amber-700 bg-amber-500" : "text-rose-700 bg-rose-500";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className={`font-mono font-bold ${color.split(" ")[0]}`}>
          {Math.round(normalized)}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 border border-slate-300/60">
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

  const color = isCrit ? "#e11d48" : isHigh ? "#ea580c" : isMed ? "#d97706" : "#059669";

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50/80">
      <div className="relative flex items-center justify-center w-24 h-24">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-slate-200"
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
          <span className="font-mono text-2xl font-black text-slate-900">{score}</span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-semibold">/ 100</span>
        </div>
      </div>
      <span className="mt-1 text-xs font-mono font-bold uppercase" style={{ color }}>
        {isCrit ? "CRITICAL" : isHigh ? "HIGH" : isMed ? "MEDIUM" : "LOW"} PRIORITY
      </span>
    </div>
  );
}
