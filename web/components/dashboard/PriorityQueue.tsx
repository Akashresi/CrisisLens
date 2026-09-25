"use client";

import React from "react";
import { PriorityBadge, SeverityBadge, StatusPill, SourceBadge } from "@/components/common/Badges";
import { useCrisis } from "@/lib/store/store";
import { Users, AlertTriangle, ChevronRight, CheckCircle2 } from "lucide-react";

export function PriorityQueue() {
  const {
    incidents,
    selectedIncidentId,
    setSelectedIncidentId,
    filterPriority,
    setFilterPriority,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
  } = useCrisis();

  const filtered = incidents.filter((inc) => {
    const matchesPriority = filterPriority === "ALL" || inc.priorityLevel === filterPriority;
    const matchesStatus = filterStatus === "ALL" || inc.status === filterStatus;
    const matchesSearch =
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.rawText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesStatus && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => b.priorityScore - a.priorityScore);

  return (
    <div className="flex flex-col h-full rounded-xl border border-white/10 bg-navy-900/70 backdrop-blur-xl overflow-hidden">
      {/* Header & Controls */}
      <div className="p-3.5 border-b border-white/10 space-y-2.5 bg-navy-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
              Prioritized Emergency Queue
            </span>
            <span className="rounded-full bg-cyan-500/20 px-2 py-0.2 font-mono text-[10px] font-bold text-cyan-300">
              {sorted.length}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Ranked by (Sev×Exp×Vuln)/(Access)</span>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
          {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-2 py-0.5 rounded transition-colors ${
                filterPriority === p
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                  : "bg-white/5 text-slate-400 hover:text-slate-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Filter by ID, keywords, or zone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-1.5 font-mono text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
        />
      </div>

      {/* Incident List */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2 space-y-1.5">
        {sorted.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-slate-500">
            No incidents match active filter criteria.
          </div>
        ) : (
          sorted.map((inc) => {
            const isSelected = inc.id === selectedIncidentId;
            return (
              <div
                key={inc.id}
                onClick={() => setSelectedIncidentId(inc.id)}
                className={`p-3 rounded-lg border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? "border-cyan-400/50 bg-cyan-950/30 shadow-[0_0_12px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/40"
                    : "border-white/5 bg-navy-950/40 hover:border-white/20 hover:bg-navy-950/70"
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-cyan-400">{inc.id}</span>
                      <SourceBadge source={inc.sourceType} />
                      <StatusPill status={inc.status} />
                    </div>
                    <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">
                      {inc.title}
                    </h4>
                  </div>
                  <PriorityBadge level={inc.priorityLevel} score={inc.priorityScore} />
                </div>

                {/* Text summary snippet */}
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {inc.rawText}
                </p>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px] bg-black/20 p-1.5 rounded border border-white/5">
                  <div className="text-slate-400">
                    <span className="text-slate-500">Victims: </span>
                    <span className="text-slate-200 font-bold">{inc.nlpFeatures.reportedVictimsCount}</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-slate-500">Depth: </span>
                    <span className="text-slate-200 font-bold">{inc.cvFeatures.inundationDepthMeters}m</span>
                  </div>
                  <div className="text-slate-400 text-right">
                    <span className="text-slate-500">Conf: </span>
                    <span className="text-emerald-400 font-bold">{(inc.overallConfidence * 100).toFixed(0)}%</span>
                  </div>
                </div>

                {/* Uncertainty flag notice */}
                {inc.isUncertain && (
                  <div className="flex items-center space-x-1 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    <AlertTriangle className="h-3 w-3 shrink-0" />
                    <span className="truncate">Human verification required ({inc.uncertaintyReasons[0]})</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
