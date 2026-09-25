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
      <div className="flex h-full items-center justify-center p-8 text-center text-xs font-mono text-slate-400 rounded-xl border border-slate-200 bg-white shadow-xs">
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
    <div className="flex flex-col h-full rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      {/* Incident Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/80 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm font-black text-cyan-700">{incident.id}</span>
            <span className="font-mono text-[11px] text-slate-400">[{incident.trackingNumber}]</span>
            <SourceBadge source={incident.sourceType} />
            <StatusPill status={incident.status} />
          </div>
          <PriorityBadge level={incident.priorityLevel} score={incident.priorityScore} />
        </div>
        <h3 className="text-base font-bold text-slate-900 leading-snug">{incident.title}</h3>
        <p className="text-xs text-slate-500 font-mono">
          Location: {incident.location.address || "Basin Sector"} • Coords: {incident.location.lat.toFixed(4)}, {incident.location.lng.toFixed(4)}
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Human Review Banner if required */}
        {incident.isUncertain && (
          <div className="rounded-xl border border-amber-300 bg-amber-50/90 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
                <AlertTriangle className="h-4 w-4 text-amber-600 animate-pulse" />
                <span>HUMAN CONTROL PROTOCOL: Verification Sign-Off Required</span>
              </div>
              <button
                onClick={() => setIsReviewing(!isReviewing)}
                className="rounded-lg bg-amber-200/80 hover:bg-amber-300 border border-amber-400 px-3 py-1 font-mono text-xs font-bold text-amber-900"
              >
                {isReviewing ? "Cancel" : "Authorize & Sign Off"}
              </button>
            </div>
            <ul className="list-inside list-disc text-xs text-amber-800 space-y-0.5">
              {incident.uncertaintyReasons.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>

            {isReviewing && (
              <div className="pt-2 border-t border-amber-200 space-y-2">
                <textarea
                  rows={2}
                  placeholder="Enter responder verification notes / field radio confirmation..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white p-2 font-mono text-xs text-slate-900 focus:border-amber-500 focus:outline-none"
                />
                <button
                  onClick={handleVerify}
                  className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-1.5 font-mono text-xs font-bold text-white shadow-sm hover:opacity-95"
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
          <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-3 space-y-2.5">
            <div className="flex items-center justify-between border-b border-blue-200 pb-1.5">
              <div className="flex items-center space-x-1.5 text-blue-700 font-mono text-xs font-bold">
                <Eye className="h-4 w-4" />
                <span>Small CV Model</span>
              </div>
              <SeverityBadge level={incident.cvFeatures.visualSeverity} />
            </div>

            {/* Media Preview & Bounding Box Visualizer */}
            {incident.mediaUrls.videoUrl ? (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-purple-300 bg-slate-900">
                <video
                  src={incident.mediaUrls.videoUrl}
                  controls
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-1.5 left-1.5 bg-black/70 px-2 py-0.5 rounded text-[9px] font-mono text-purple-200 font-bold">
                  🎥 CITIZEN VIDEO FEED
                </div>
              </div>
            ) : incident.mediaUrls.imageUrl ? (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-900">
                <img
                  src={incident.mediaUrls.imageUrl}
                  alt="Disaster Ingestion"
                  className="h-full w-full object-cover opacity-90"
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
                    className="absolute border-2 border-red-500 bg-red-500/30 rounded font-mono text-[9px] text-white font-bold p-0.5"
                  >
                    {box.label}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="space-y-1 font-mono text-[11px] text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Damage Classification:</span>
                <span className="font-semibold text-blue-800">{incident.cvFeatures.damageType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Inundation Depth:</span>
                <span className="font-semibold text-amber-700">{incident.cvFeatures.inundationDepthMeters}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Visual Stranded:</span>
                <span className="font-semibold text-rose-700">{incident.cvFeatures.strandedCount} people</span>
              </div>
            </div>

            <ConfidenceGauge score={incident.cvFeatures.confidence} label="CV Vision Confidence" />
          </div>

          {/* Module 2: Small NLP Model Analysis */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3 space-y-2.5">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5">
              <div className="flex items-center space-x-1.5 text-emerald-700 font-mono text-xs font-bold">
                <MessageSquareText className="h-4 w-4" />
                <span>Small NLP Model</span>
              </div>
              <span className="rounded bg-emerald-100 px-1.5 py-0.2 font-mono text-[10px] font-bold text-emerald-800">
                {incident.nlpFeatures.urgencyTier}
              </span>
            </div>

            <div className="rounded border border-emerald-200/60 bg-white p-2 text-xs text-slate-700 italic shadow-xs">
              "{incident.rawText}"
            </div>

            <div className="space-y-1.5 font-mono text-[11px] text-slate-700">
              <div>
                <span className="text-slate-500 block text-[10px]">Identified Critical Needs:</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {incident.nlpFeatures.criticalNeeds.map((need, idx) => (
                    <span key={idx} className="rounded bg-emerald-100 border border-emerald-300 px-1.5 py-0.2 text-[10px] text-emerald-800 font-bold">
                      {need}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Extracted Victims:</span>
                <span className="font-semibold text-amber-700">{incident.nlpFeatures.reportedVictimsCount} persons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Medical Urgency:</span>
                <span className={`font-semibold ${incident.nlpFeatures.medicalUrgency ? "text-rose-700 font-bold" : "text-slate-500"}`}>
                  {incident.nlpFeatures.medicalUrgency ? "YES (ALS REQUIRED)" : "NO"}
                </span>
              </div>
            </div>

            <ConfidenceGauge score={incident.nlpFeatures.confidence} label="NLP Extraction Confidence" />
          </div>

          {/* Module 3: GIS Spatial Engine */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-3 space-y-2.5">
            <div className="flex items-center justify-between border-b border-amber-200 pb-1.5">
              <div className="flex items-center space-x-1.5 text-amber-700 font-mono text-xs font-bold">
                <MapPin className="h-4 w-4" />
                <span>GIS Spatial Engine</span>
              </div>
              <span className="rounded bg-amber-100 px-1.5 py-0.2 font-mono text-[10px] font-bold text-amber-800">
                {incident.gisFeatures.roadNetworkStatus}
              </span>
            </div>

            <div className="space-y-1.5 font-mono text-[11px] text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Basin Zone:</span>
                <span className="text-slate-800 font-medium">{incident.gisFeatures.zone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">DEM Elevation:</span>
                <span className="text-cyan-700 font-bold">{incident.gisFeatures.topographicElevationMeters}m MSL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Precipitation:</span>
                <span className="text-amber-700 font-bold">{incident.gisFeatures.rainfallMmPerHour} mm/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nearest Hospital:</span>
                <span className="text-slate-800">{incident.gisFeatures.nearestHospital.distanceKm} km ({incident.gisFeatures.nearestHospital.availableBeds} beds)</span>
              </div>
            </div>

            <ConfidenceGauge score={incident.gisFeatures.confidence} label="Spatial Telemetry Quality" />
          </div>
        </div>

        {/* Feature Fusion & Dynamic Priority Breakdown */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cpu className="h-4 w-4 text-cyan-600" />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800">
                Explainable AI (XAI) Assessment & Priority Drivers
              </h4>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-slate-500">Fused Model Confidence:</span>
              <span className="font-mono text-xs font-bold text-emerald-700">
                {(incident.overallConfidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
            <div className="lg:col-span-1">
              <PriorityGauge score={incident.priorityScore} />
            </div>

            <div className="lg:col-span-3 space-y-2">
              <div className="text-xs text-slate-700 leading-relaxed font-sans bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                <span className="font-bold text-cyan-700 font-mono block mb-1">Decision Rationale:</span>
                {incident.explainability.decisionRationale}
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">
                  Identified Priority Drivers (Why attention is required first):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {incident.priorityDrivers.map((driver, idx) => (
                    <span key={idx} className="rounded-md bg-rose-50 border border-rose-200 px-2 py-0.5 font-mono text-[10px] text-rose-700 font-semibold">
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
          <div className="rounded-xl border border-cyan-300 bg-cyan-50/60 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-cyan-200 pb-2">
              <div className="flex items-center space-x-2 text-cyan-900 font-bold text-xs font-mono">
                <Truck className="h-4 w-4 text-cyan-700" />
                <span>Automated Response & Evacuation Plan</span>
              </div>
              <span className="font-mono text-xs text-emerald-700 font-bold">
                Detour ETA: ~{incident.responsePlan.evacuationRoute.etaMinutes} mins
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Assigned Resources */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 block font-semibold">
                  Recommended Units to Dispatch:
                </span>
                <div className="space-y-1.5">
                  {incident.responsePlan.assignedResources.map((res, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2 text-xs shadow-xs">
                      <span className="text-slate-800 font-semibold">{res.unitLabel}</span>
                      <button
                        onClick={() => dispatchResource(res.id, incident.id)}
                        className="rounded bg-cyan-600 hover:bg-cyan-700 px-2.5 py-1 font-mono text-[10px] font-bold text-white shadow-xs"
                      >
                        Dispatch Unit
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Routing & Guidance */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 block font-semibold">
                  Evacuation Corridor & Guidance:
                </span>
                <div className="rounded-lg border border-slate-200 bg-white p-2.5 space-y-1.5 text-xs font-mono shadow-xs">
                  <div className="flex items-center space-x-1.5 text-slate-900">
                    <Navigation className="h-3.5 w-3.5 text-cyan-600" />
                    <span className="font-bold">{incident.responsePlan.evacuationRoute.routeLabel}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-sans">{incident.responsePlan.recommendedAction}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
