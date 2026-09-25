"use client";

import React, { useState } from "react";
import { useCrisis } from "@/lib/store/store";
import { PriorityBadge, SeverityBadge, StatusPill, SourceBadge } from "@/components/common/Badges";
import { PriorityGauge, ConfidenceGauge } from "@/components/common/ConfidenceGauge";
import { Eye, MessageSquareText, MapPin, ShieldAlert, Cpu, CheckCircle2, AlertTriangle, Navigation, Truck, UserCheck } from "lucide-react";

export function ExplainablePanel() {
  const { incidents, selectedIncidentId, verifyHumanReview, dispatchResource, resources } = useCrisis();
  const [reviewNotes, setReviewNotes] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  const incident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  if (!incident) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-xs font-mono text-slate-500 rounded-xl border border-white/10 bg-navy-900/70">
        Select an incident from the queue or map to inspect multimodal AI evidence.
      </div>
    );
  }

  const handleVerify = () => {
    verifyHumanReview(incident.id, reviewNotes || "Confirmed by incident commander.");
    setIsReviewing(false);
    setReviewNotes("");
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-white/10 bg-navy-900/70 backdrop-blur-xl overflow-hidden">
      {/* Incident Header */}
      <div className="p-4 border-b border-white/10 bg-navy-950/50 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm font-black text-cyan-400">{incident.id}</span>
            <span className="font-mono text-[11px] text-slate-500">[{incident.trackingNumber}]</span>
            <SourceBadge source={incident.sourceType} />
            <StatusPill status={incident.status} />
          </div>
          <PriorityBadge level={incident.priorityLevel} score={incident.priorityScore} />
        </div>
        <h3 className="text-base font-bold text-white leading-snug">{incident.title}</h3>
        <p className="text-xs text-slate-400 font-mono">
          Location: {incident.location.address || "Basin Sector"} • Coords: {incident.location.lat.toFixed(4)}, {incident.location.lng.toFixed(4)}
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Human Review Banner if required */}
        {incident.isUncertain && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-950/30 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs">
                <AlertTriangle className="h-4 w-4 text-amber-400 animate-pulse" />
                <span>HUMAN CONTROL PROTOCOL: Verification Sign-Off Required</span>
              </div>
              <button
                onClick={() => setIsReviewing(!isReviewing)}
                className="rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-3 py-1 font-mono text-xs font-bold text-amber-300"
              >
                {isReviewing ? "Cancel" : "Authorize & Sign Off"}
              </button>
            </div>
            <ul className="list-inside list-disc text-xs text-amber-200/80 space-y-0.5">
              {incident.uncertaintyReasons.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>

            {isReviewing && (
              <div className="pt-2 border-t border-amber-500/20 space-y-2">
                <textarea
                  rows={2}
                  placeholder="Enter responder verification notes / field radio confirmation..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-navy-950 p-2 font-mono text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
                />
                <button
                  onClick={handleVerify}
                  className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-1.5 font-mono text-xs font-bold text-white shadow-lg hover:scale-102"
                >
                  Confirm Ground Truth & Unlock Priority Dispatch
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3-Model Feature Fusion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Module 1: Small CV Model Analysis */}
          <div className="rounded-xl border border-blue-500/30 bg-navy-950/60 p-3 space-y-2.5">
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-1.5">
              <div className="flex items-center space-x-1.5 text-blue-400 font-mono text-xs font-bold">
                <Eye className="h-4 w-4" />
                <span>Small CV Model</span>
              </div>
              <SeverityBadge level={incident.cvFeatures.visualSeverity} />
            </div>

            {/* Media Preview & Bounding Box Visualizer */}
            {incident.mediaUrls.imageUrl && (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-black">
                <img
                  src={incident.mediaUrls.imageUrl}
                  alt="Disaster Ingestion"
                  className="h-full w-full object-cover opacity-85"
                />
                {/* Visual Bounding Box Overlay */}
                {incident.cvFeatures.boundingBoxes.map((box, idx) => (
                  <div
                    key={idx}
                    style={{
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.w}%`,
                      height: `${box.h}%`,
                    }}
                    className="absolute border-2 border-red-500 bg-red-500/20 rounded font-mono text-[9px] text-white font-bold p-0.5"
                  >
                    {box.label}
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-1 font-mono text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Damage Classification:</span>
                <span className="font-semibold text-blue-300">{incident.cvFeatures.damageType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Inundation Depth:</span>
                <span className="font-semibold text-amber-300">{incident.cvFeatures.inundationDepthMeters}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Visual Stranded:</span>
                <span className="font-semibold text-red-300">{incident.cvFeatures.strandedCount} people</span>
              </div>
            </div>

            <ConfidenceGauge score={incident.cvFeatures.confidence} label="CV Vision Confidence" />
          </div>

          {/* Module 2: Small NLP Model Analysis */}
          <div className="rounded-xl border border-emerald-500/30 bg-navy-950/60 p-3 space-y-2.5">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-mono text-xs font-bold">
                <MessageSquareText className="h-4 w-4" />
                <span>Small NLP Model</span>
              </div>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 font-mono text-[10px] font-bold text-emerald-300">
                {incident.nlpFeatures.urgencyTier}
              </span>
            </div>

            <div className="rounded border border-white/5 bg-black/20 p-2 text-xs text-slate-300 italic">
              "{incident.rawText}"
            </div>

            <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px]">Identified Critical Needs:</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {incident.nlpFeatures.criticalNeeds.map((need, idx) => (
                    <span key={idx} className="rounded bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.2 text-[10px] text-emerald-300 font-bold">
                      {need}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Extracted Victims:</span>
                <span className="font-semibold text-amber-300">{incident.nlpFeatures.reportedVictimsCount} persons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Medical Urgency:</span>
                <span className={`font-semibold ${incident.nlpFeatures.medicalUrgency ? "text-red-400" : "text-slate-400"}`}>
                  {incident.nlpFeatures.medicalUrgency ? "YES (ALS REQUIRED)" : "NO"}
                </span>
              </div>
            </div>

            <ConfidenceGauge score={incident.nlpFeatures.confidence} label="NLP Extraction Confidence" />
          </div>

          {/* Module 3: GIS Spatial Engine */}
          <div className="rounded-xl border border-amber-500/30 bg-navy-950/60 p-3 space-y-2.5">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
              <div className="flex items-center space-x-1.5 text-amber-400 font-mono text-xs font-bold">
                <MapPin className="h-4 w-4" />
                <span>GIS Spatial Engine</span>
              </div>
              <span className="rounded bg-amber-500/20 px-1.5 py-0.2 font-mono text-[10px] font-bold text-amber-300">
                {incident.gisFeatures.roadNetworkStatus}
              </span>
            </div>

            <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Basin Zone:</span>
                <span className="text-slate-200">{incident.gisFeatures.zone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">DEM Elevation:</span>
                <span className="text-cyan-300 font-bold">{incident.gisFeatures.topographicElevationMeters}m MSL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Precipitation:</span>
                <span className="text-amber-300 font-bold">{incident.gisFeatures.rainfallMmPerHour} mm/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nearest Trauma Hospital:</span>
                <span className="text-slate-200">{incident.gisFeatures.nearestHospital.distanceKm} km ({incident.gisFeatures.nearestHospital.availableBeds} beds)</span>
              </div>
            </div>

            <ConfidenceGauge score={incident.gisFeatures.confidence} label="Spatial Telemetry Quality" />
          </div>
        </div>

        {/* Feature Fusion & Dynamic Priority Breakdown */}
        <div className="rounded-xl border border-white/10 bg-navy-950/80 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cpu className="h-4 w-4 text-cyan-400" />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                Explainable AI (XAI) Assessment & Priority Drivers
              </h4>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-slate-400">Fused Model Confidence:</span>
              <span className="font-mono text-xs font-bold text-emerald-400">
                {(incident.overallConfidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
            <div className="lg:col-span-1">
              <PriorityGauge score={incident.priorityScore} />
            </div>

            <div className="lg:col-span-3 space-y-2">
              <div className="text-xs text-slate-300 leading-relaxed font-sans bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                <span className="font-bold text-cyan-400 font-mono block mb-1">Decision Rationale:</span>
                {incident.explainability.decisionRationale}
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block">
                  Identified Priority Drivers (Why attention is required first):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {incident.priorityDrivers.map((driver, idx) => (
                    <span key={idx} className="rounded-md bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 font-mono text-[10px] text-rose-300">
                      • {driver}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Automated Response Recommendation & Detour Routing */}
        {incident.responsePlan && (
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <div className="flex items-center space-x-2 text-cyan-300 font-bold text-xs font-mono">
                <Truck className="h-4 w-4 text-cyan-400" />
                <span>Automated Response & Evacuation Plan</span>
              </div>
              <span className="font-mono text-xs text-emerald-400">
                Detour ETA: ~{incident.responsePlan.evacuationRoute.etaMinutes} mins
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Assigned Resources */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Recommended Units to Dispatch:
                </span>
                <div className="space-y-1.5">
                  {incident.responsePlan.assignedResources.map((res, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-white/10 bg-navy-950 p-2 text-xs">
                      <span className="text-slate-200 font-medium">{res.unitLabel}</span>
                      <button
                        onClick={() => dispatchResource(res.id, incident.id)}
                        className="rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 px-2 py-1 font-mono text-[10px] font-bold text-cyan-300"
                      >
                        Dispatch Unit
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Routing & Guidance */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Evacuation Corridor & Guidance:
                </span>
                <div className="rounded-lg border border-white/10 bg-navy-950 p-2.5 space-y-1.5 text-xs font-mono">
                  <div className="flex items-center space-x-1.5 text-slate-200">
                    <Navigation className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="font-bold">{incident.responsePlan.evacuationRoute.routeLabel}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">{incident.responsePlan.recommendedAction}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
