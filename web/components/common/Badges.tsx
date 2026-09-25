import React from "react";
import type { PriorityLevel, SeverityLevel, IncidentStatus } from "@/types";

export function PriorityBadge({ level, score }: { level: PriorityLevel; score?: number }) {
  const styles: Record<PriorityLevel, string> = {
    CRITICAL: "bg-rose-100 text-rose-800 border-rose-300 ring-1 ring-rose-200",
    HIGH: "bg-orange-100 text-orange-800 border-orange-300",
    MEDIUM: "bg-amber-100 text-amber-800 border-amber-300",
    LOW: "bg-emerald-100 text-emerald-800 border-emerald-300",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-mono text-xs font-semibold uppercase ${styles[level]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${level === "CRITICAL" ? "bg-rose-600 animate-ping" : level === "HIGH" ? "bg-orange-600" : "bg-current"}`} />
      <span>{level}</span>
      {score !== undefined && <span className="opacity-90 font-bold">({score})</span>}
    </span>
  );
}

export function SeverityBadge({ level }: { level: SeverityLevel }) {
  const styles: Record<SeverityLevel, string> = {
    CRITICAL: "bg-rose-50 text-rose-700 border-rose-200 font-semibold",
    SEVERE: "bg-orange-50 text-orange-700 border-orange-200 font-semibold",
    MODERATE: "bg-amber-50 text-amber-700 border-amber-200 font-semibold",
    MINOR: "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[11px] font-mono ${styles[level]}`}>
      {level}
    </span>
  );
}

export function StatusPill({ status }: { status: IncidentStatus }) {
  const styles: Record<IncidentStatus, string> = {
    REPORTED: "bg-slate-100 text-slate-700 border-slate-300",
    AI_ANALYZED: "bg-cyan-50 text-cyan-700 border-cyan-300",
    HUMAN_VERIFIED: "bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold",
    DISPATCHED: "bg-indigo-50 text-indigo-700 border-indigo-300 font-semibold",
    EN_ROUTE: "bg-blue-50 text-blue-700 border-blue-300 font-semibold",
    RESCUED: "bg-emerald-100 text-emerald-800 border-emerald-400 font-bold",
    RESOLVED: "bg-slate-100 text-slate-500 border-slate-200",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-mono uppercase font-semibold ${styles[status] || styles.REPORTED}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

export function SourceBadge({ source }: { source: string }) {
  const labels: Record<string, { label: string; color: string }> = {
    CITIZEN_APP: { label: "Citizen SOS", color: "text-rose-700 border-rose-300 bg-rose-50" },
    SATELLITE: { label: "ISRO SAR Satellite", color: "text-cyan-700 border-cyan-300 bg-cyan-50" },
    TRAFFIC_CCTV: { label: "Traffic CCTV", color: "text-amber-700 border-amber-300 bg-amber-50" },
    FIELD_TEAM: { label: "SDRF Field Unit", color: "text-emerald-700 border-emerald-300 bg-emerald-50" },
    OFFICIAL_DISPATCH: { label: "112 Dispatch", color: "text-purple-700 border-purple-300 bg-purple-50" },
  };

  const item = labels[source] || { label: source, color: "text-slate-700 border-slate-300 bg-slate-100" };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-mono font-semibold ${item.color}`}>
      {item.label}
    </span>
  );
}
