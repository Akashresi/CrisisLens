import React from "react";
import type { PriorityLevel, SeverityLevel, IncidentStatus } from "@/types";

export function PriorityBadge({ level, score }: { level: PriorityLevel; score?: number }) {
  const styles: Record<PriorityLevel, string> = {
    CRITICAL: "bg-red-500/20 text-red-400 border-red-500/40 ring-1 ring-red-500/30",
    HIGH: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    MEDIUM: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    LOW: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-mono text-xs font-semibold uppercase ${styles[level]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${level === "CRITICAL" ? "bg-red-400 animate-ping" : level === "HIGH" ? "bg-rose-400" : "bg-current"}`} />
      <span>{level}</span>
      {score !== undefined && <span className="opacity-80 font-bold">({score})</span>}
    </span>
  );
}

export function SeverityBadge({ level }: { level: SeverityLevel }) {
  const styles: Record<SeverityLevel, string> = {
    CRITICAL: "bg-red-950/60 text-red-400 border-red-500/30",
    SEVERE: "bg-orange-950/60 text-orange-300 border-orange-500/30",
    MODERATE: "bg-amber-950/60 text-amber-300 border-amber-500/30",
    MINOR: "bg-emerald-950/60 text-emerald-300 border-emerald-500/30",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[11px] font-mono font-medium ${styles[level]}`}>
      {level}
    </span>
  );
}

export function StatusPill({ status }: { status: IncidentStatus }) {
  const styles: Record<IncidentStatus, string> = {
    REPORTED: "bg-slate-800/80 text-slate-300 border-slate-700",
    AI_ANALYZED: "bg-cyan-950/50 text-cyan-300 border-cyan-500/30",
    HUMAN_VERIFIED: "bg-emerald-950/50 text-emerald-300 border-emerald-500/30",
    DISPATCHED: "bg-indigo-950/50 text-indigo-300 border-indigo-500/30",
    EN_ROUTE: "bg-blue-950/50 text-blue-300 border-blue-500/30",
    RESCUED: "bg-emerald-950/70 text-emerald-200 border-emerald-400",
    RESOLVED: "bg-slate-900 text-slate-500 border-slate-800",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-mono uppercase font-semibold ${styles[status] || styles.REPORTED}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

export function SourceBadge({ source }: { source: string }) {
  const labels: Record<string, { label: string; color: string }> = {
    CITIZEN_APP: { label: "Citizen SOS", color: "text-rose-400 border-rose-500/30 bg-rose-500/10" },
    SATELLITE: { label: "ISRO SAR Satellite", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
    TRAFFIC_CCTV: { label: "Traffic CCTV", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
    FIELD_TEAM: { label: "SDRF Field Unit", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
    OFFICIAL_DISPATCH: { label: "112 Dispatch", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
  };

  const item = labels[source] || { label: source, color: "text-slate-300 border-slate-700 bg-slate-800" };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-mono font-semibold ${item.color}`}>
      {item.label}
    </span>
  );
}
