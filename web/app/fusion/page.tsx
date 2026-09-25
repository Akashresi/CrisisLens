"use client";

import React from "react";
import { Eye, MessageSquareText, MapPin, Cpu, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";
import { useCrisis } from "@/lib/store/store";
import { PriorityBadge, SeverityBadge } from "@/components/common/Badges";

export default function FusionArchitecturePage() {
  const { incidents, selectedIncidentId, setSelectedIncidentId } = useCrisis();
  const activeIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1500px] mx-auto">
      {/* Title */}
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-xl font-bold font-mono uppercase tracking-wider text-white">
          Triple-Model Feature Fusion Architecture
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          How CrisisLens synthesizes lightweight specialized models (CV + NLP + GIS) into unified situational intelligence.
        </p>
      </div>

      {/* Incident Selector */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <span className="text-xs font-mono text-slate-400 shrink-0">Select Case:</span>
        {incidents.map((inc) => (
          <button
            key={inc.id}
            onClick={() => setSelectedIncidentId(inc.id)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all ${
              inc.id === activeIncident?.id
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400"
                : "bg-navy-900 text-slate-400 border border-white/10 hover:text-slate-200"
            }`}
          >
            {inc.id}: {inc.title.slice(0, 28)}...
          </button>
        ))}
      </div>

      {/* Architecture Flow Diagram */}
      <div className="rounded-xl border border-cyan-500/30 bg-navy-950/80 p-6 space-y-6">
        <div className="text-center space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
            Pipeline Execution Graph
          </span>
          <h2 className="text-lg font-bold text-white">
            Multimodal Ingestion ➔ 3 Lightweight Specialized Modules ➔ Feature Fusion ➔ Dynamic Priority
          </h2>
        </div>

        {/* 3 Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Small CV Model */}
          <div className="rounded-xl border border-blue-500/40 bg-navy-900/60 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
              <div className="flex items-center space-x-2 text-blue-400 font-bold font-mono text-sm">
                <Eye className="h-5 w-5" />
                <span>Small CV Model</span>
              </div>
              <span className="font-mono text-xs text-slate-400">Weight: 35%</span>
            </div>
            <p className="text-xs text-slate-300">
              Analyzes CCTV, citizen photos, drone, and satellite feeds for inundation depth, structural collapse, and victim localization.
            </p>
            <div className="rounded-lg border border-white/5 bg-black/30 p-3 space-y-1.5 font-mono text-xs">
              <div className="text-blue-300 font-semibold">Extracted Vector:</div>
              <div className="text-slate-400">• Severity: <span className="text-slate-200">{activeIncident?.cvFeatures.visualSeverity}</span></div>
              <div className="text-slate-400">• Water Level: <span className="text-slate-200">{activeIncident?.cvFeatures.inundationDepthMeters}m</span></div>
              <div className="text-slate-400">• Stranded: <span className="text-slate-200">{activeIncident?.cvFeatures.strandedCount} people</span></div>
              <div className="text-slate-400">• Confidence: <span className="text-emerald-400">{((activeIncident?.cvFeatures.confidence || 0) * 100).toFixed(0)}%</span></div>
            </div>
          </div>

          {/* 2. Small NLP Model */}
          <div className="rounded-xl border border-emerald-500/40 bg-navy-900/60 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold font-mono text-sm">
                <MessageSquareText className="h-5 w-5" />
                <span>Small NLP Model</span>
              </div>
              <span className="font-mono text-xs text-slate-400">Weight: 35%</span>
            </div>
            <p className="text-xs text-slate-300">
              Parses citizen distress text, 112 audio transcripts, and emergency requests to extract victim counts, medical urgency, and required gear.
            </p>
            <div className="rounded-lg border border-white/5 bg-black/30 p-3 space-y-1.5 font-mono text-xs">
              <div className="text-emerald-300 font-semibold">Extracted Vector:</div>
              <div className="text-slate-400">• Urgency: <span className="text-slate-200">{activeIncident?.nlpFeatures.urgencyTier}</span></div>
              <div className="text-slate-400">• Demands: <span className="text-slate-200">{activeIncident?.nlpFeatures.criticalNeeds.join(", ")}</span></div>
              <div className="text-slate-400">• Medical: <span className="text-slate-200">{activeIncident?.nlpFeatures.medicalUrgency ? "ALS Required" : "Stable"}</span></div>
              <div className="text-slate-400">• Confidence: <span className="text-emerald-400">{((activeIncident?.nlpFeatures.confidence || 0) * 100).toFixed(0)}%</span></div>
            </div>
          </div>

          {/* 3. GIS Spatial Engine */}
          <div className="rounded-xl border border-amber-500/40 bg-navy-900/60 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold font-mono text-sm">
                <MapPin className="h-5 w-5" />
                <span>GIS Spatial Engine</span>
              </div>
              <span className="font-mono text-xs text-slate-400">Weight: 30%</span>
            </div>
            <p className="text-xs text-slate-300">
              Integrates Digital Elevation Models (DEM), live rainfall mm/hr, catchment river gauge telemetry, and road network accessibility.
            </p>
            <div className="rounded-lg border border-white/5 bg-black/30 p-3 space-y-1.5 font-mono text-xs">
              <div className="text-amber-300 font-semibold">Extracted Vector:</div>
              <div className="text-slate-400">• Zone: <span className="text-slate-200">{activeIncident?.gisFeatures.zone}</span></div>
              <div className="text-slate-400">• Elevation: <span className="text-slate-200">{activeIncident?.gisFeatures.topographicElevationMeters}m MSL</span></div>
              <div className="text-slate-400">• Rain Rate: <span className="text-slate-200">{activeIncident?.gisFeatures.rainfallMmPerHour} mm/hr</span></div>
              <div className="text-slate-400">• Road Status: <span className="text-slate-200">{activeIncident?.gisFeatures.roadNetworkStatus}</span></div>
            </div>
          </div>
        </div>

        {/* Fusion Convergence & Dynamic Priority Result */}
        <div className="rounded-xl border border-white/10 bg-navy-900/80 p-5 space-y-4">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono font-bold text-sm uppercase">
            <Cpu className="h-5 w-5" />
            <span>Feature Fusion Layer & Cross-Modal Consistency</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-3 rounded-lg border border-white/5 bg-black/20 space-y-1">
              <span className="text-slate-500">Cross-Modal Consistency:</span>
              <div className="text-emerald-400 font-bold text-sm">{activeIncident?.crossModalConsistency}</div>
              <span className="text-[10px] text-slate-400">Zero contradiction between CV visual and NLP text</span>
            </div>

            <div className="p-3 rounded-lg border border-white/5 bg-black/20 space-y-1">
              <span className="text-slate-500">Unified Fusion Confidence:</span>
              <div className="text-cyan-400 font-bold text-sm">
                {((activeIncident?.overallConfidence || 0) * 100).toFixed(0)}%
              </div>
              <span className="text-[10px] text-slate-400">Above 75% autonomous threshold</span>
            </div>

            <div className="p-3 rounded-lg border border-white/5 bg-black/20 space-y-1">
              <span className="text-slate-500">Computed Priority:</span>
              <div className="text-rose-400 font-bold text-sm">
                {activeIncident?.priorityLevel} ({activeIncident?.priorityScore}/100)
              </div>
              <span className="text-[10px] text-slate-400">Auto dispatched to top of emergency queue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
