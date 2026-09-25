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
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl font-bold font-mono uppercase tracking-wider text-slate-900">
          Triple-Model Feature Fusion Architecture
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          How CrisisLens synthesizes lightweight specialized models (CV + NLP + GIS) into unified situational intelligence.
        </p>
      </div>

      {/* Incident Selector */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <span className="text-xs font-mono text-slate-500 shrink-0 font-medium">Select Case:</span>
        {incidents.map((inc) => (
          <button
            key={inc.id}
            onClick={() => setSelectedIncidentId(inc.id)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all shadow-xs ${
              inc.id === activeIncident?.id
                ? "bg-cyan-600 text-white border border-cyan-600 shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {inc.id}: {inc.title.slice(0, 28)}...
          </button>
        ))}
      </div>

      {/* Architecture Flow Diagram */}
      <div className="rounded-xl border border-cyan-200 bg-gradient-to-b from-cyan-50/50 via-white to-slate-50 p-6 space-y-6 shadow-xs">
        <div className="text-center space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-700 font-bold">
            Pipeline Execution Graph
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Multimodal Ingestion ➔ 3 Lightweight Specialized Modules ➔ Feature Fusion ➔ Dynamic Priority
          </h2>
        </div>

        {/* 3 Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Small CV Model */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-blue-200 pb-2">
              <div className="flex items-center space-x-2 text-blue-700 font-bold font-mono text-sm">
                <Eye className="h-5 w-5" />
                <span>Small CV Model</span>
              </div>
              <span className="font-mono text-xs text-slate-500 font-semibold">Weight: 35%</span>
            </div>
            <p className="text-xs text-slate-600">
              Analyzes CCTV, citizen photos, drone, and satellite feeds for inundation depth, structural collapse, and victim localization.
            </p>
            <div className="rounded-lg border border-blue-200/80 bg-white p-3 space-y-1.5 font-mono text-xs shadow-xs">
              <div className="text-blue-800 font-bold">Extracted Vector:</div>
              <div className="text-slate-600">• Severity: <span className="text-slate-900 font-semibold">{activeIncident?.cvFeatures.visualSeverity}</span></div>
              <div className="text-slate-600">• Water Level: <span className="text-slate-900 font-semibold">{activeIncident?.cvFeatures.inundationDepthMeters}m</span></div>
              <div className="text-slate-600">• Stranded: <span className="text-slate-900 font-semibold">{activeIncident?.cvFeatures.strandedCount} people</span></div>
              <div className="text-slate-600">• Confidence: <span className="text-emerald-700 font-bold">{((activeIncident?.cvFeatures.confidence || 0) * 100).toFixed(0)}%</span></div>
            </div>
          </div>

          {/* 2. Small NLP Model */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold font-mono text-sm">
                <MessageSquareText className="h-5 w-5" />
                <span>Small NLP Model</span>
              </div>
              <span className="font-mono text-xs text-slate-500 font-semibold">Weight: 35%</span>
            </div>
            <p className="text-xs text-slate-600">
              Parses citizen distress text, 112 audio transcripts, and emergency requests to extract victim counts, medical urgency, and required gear.
            </p>
            <div className="rounded-lg border border-emerald-200/80 bg-white p-3 space-y-1.5 font-mono text-xs shadow-xs">
              <div className="text-emerald-800 font-bold">Extracted Vector:</div>
              <div className="text-slate-600">• Urgency: <span className="text-slate-900 font-semibold">{activeIncident?.nlpFeatures.urgencyTier}</span></div>
              <div className="text-slate-600">• Demands: <span className="text-slate-900 font-semibold">{activeIncident?.nlpFeatures.criticalNeeds.join(", ")}</span></div>
              <div className="text-slate-600">• Medical: <span className="text-slate-900 font-semibold">{activeIncident?.nlpFeatures.medicalUrgency ? "ALS Required" : "Stable"}</span></div>
              <div className="text-slate-600">• Confidence: <span className="text-emerald-700 font-bold">{((activeIncident?.nlpFeatures.confidence || 0) * 100).toFixed(0)}%</span></div>
            </div>
          </div>

          {/* 3. GIS Spatial Engine */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <div className="flex items-center space-x-2 text-amber-700 font-bold font-mono text-sm">
                <MapPin className="h-5 w-5" />
                <span>GIS Spatial Engine</span>
              </div>
              <span className="font-mono text-xs text-slate-500 font-semibold">Weight: 30%</span>
            </div>
            <p className="text-xs text-slate-600">
              Integrates Digital Elevation Models (DEM), live rainfall mm/hr, catchment river gauge telemetry, and road network accessibility.
            </p>
            <div className="rounded-lg border border-amber-200/80 bg-white p-3 space-y-1.5 font-mono text-xs shadow-xs">
              <div className="text-amber-800 font-bold">Extracted Vector:</div>
              <div className="text-slate-600">• Zone: <span className="text-slate-900 font-semibold">{activeIncident?.gisFeatures.zone}</span></div>
              <div className="text-slate-600">• Elevation: <span className="text-slate-900 font-semibold">{activeIncident?.gisFeatures.topographicElevationMeters}m MSL</span></div>
              <div className="text-slate-600">• Rain Rate: <span className="text-slate-900 font-semibold">{activeIncident?.gisFeatures.rainfallMmPerHour} mm/hr</span></div>
              <div className="text-slate-600">• Road Status: <span className="text-slate-900 font-semibold">{activeIncident?.gisFeatures.roadNetworkStatus}</span></div>
            </div>
          </div>
        </div>

        {/* Fusion Convergence & Dynamic Priority Result */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
          <div className="flex items-center space-x-2 text-cyan-800 font-mono font-bold text-sm uppercase">
            <Cpu className="h-5 w-5 text-cyan-600" />
            <span>Feature Fusion Layer & Cross-Modal Consistency</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-slate-500 font-semibold">Cross-Modal Consistency:</span>
              <div className="text-emerald-700 font-bold text-sm">{activeIncident?.crossModalConsistency}</div>
              <span className="text-[10px] text-slate-500">Zero contradiction between CV visual and NLP text</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-slate-500 font-semibold">Unified Fusion Confidence:</span>
              <div className="text-cyan-700 font-bold text-sm">
                {((activeIncident?.overallConfidence || 0) * 100).toFixed(0)}%
              </div>
              <span className="text-[10px] text-slate-500">Above 75% autonomous threshold</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-slate-500 font-semibold">Computed Priority:</span>
              <div className="text-rose-700 font-bold text-sm">
                {activeIncident?.priorityLevel} ({activeIncident?.priorityScore}/100)
              </div>
              <span className="text-[10px] text-slate-500">Auto dispatched to top of emergency queue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
