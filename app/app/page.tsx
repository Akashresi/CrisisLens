"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, MapPin, Users, HeartPulse, ShieldAlert, ArrowRight, Radio, Sparkles, Navigation } from "lucide-react";
import { useCitizenApp } from "@/lib/store";

export default function CitizenHomePage() {
  const router = useRouter();
  const { userLocation, fetchGPSLocation, submitSOS, activeSOS } = useCitizenApp();

  const [disasterType, setDisasterType] = useState<"FLOOD" | "MEDICAL_EMERGENCY" | "STRUCTURAL_COLLAPSE" | "ROAD_BLOCKED">("FLOOD");
  const [strandedCount, setStrandedCount] = useState(2);
  const [hasMedical, setHasMedical] = useState(false);
  const [requiresBoat, setRequiresBoat] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickSOS = async () => {
    setIsSubmitting(true);
    const loc = userLocation || (await fetchGPSLocation());

    const description = `EMERGENCY SOS: ${strandedCount} person(s) stranded due to ${disasterType.replace(/_/g, " ")}. ${
      hasMedical ? "CRITICAL MEDICAL ATTENTION NEEDED." : ""
    } ${requiresBoat ? "Requires evacuation boat." : ""}`;

    await submitSOS({
      name: "Emergency Citizen",
      phone: "+91 98401 00000",
      disasterType,
      description,
      mediaType: "NONE",
      location: loc,
      strandedPeople: strandedCount,
      hasMedicalEmergency: hasMedical,
      requiresBoat,
    });

    setIsSubmitting(false);
    router.push("/sos-status");
  };

  return (
    <div className="p-4 space-y-5">
      {/* Active SOS Tracker Banner if exists */}
      {activeSOS && (
        <Link
          href="/sos-status"
          className="flex items-center justify-between rounded-xl border border-rose-500/50 bg-rose-950/40 p-3.5 text-xs text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)] animate-pulse"
        >
          <div className="flex items-center space-x-2">
            <Radio className="h-4 w-4 text-rose-400" />
            <div>
              <div className="font-bold font-mono">ACTIVE SOS [{activeSOS.trackingCode}]</div>
              <div className="text-[11px] text-slate-300">Status: {activeSOS.status.replace(/_/g, " ")} • ETA ~14 mins</div>
            </div>
          </div>
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}

      {/* Hero Header */}
      <div className="text-center space-y-1 pt-2">
        <h1 className="text-xl font-black text-white tracking-tight">Emergency Assistance Hub</h1>
        <p className="text-xs text-slate-400">
          Instant multimodal AI dispatch to SDRF, NDRF & State Emergency Command.
        </p>
      </div>

      {/* Big One-Tap SOS Beacon Button */}
      <div className="flex flex-col items-center justify-center py-3">
        <button
          onClick={handleQuickSOS}
          disabled={isSubmitting}
          className="relative h-44 w-44 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-pink-500 flex flex-col items-center justify-center text-white shadow-[0_0_40px_rgba(244,63,94,0.6)] active:scale-95 transition-transform sos-pulse border-4 border-white/20 disabled:opacity-50"
        >
          <AlertCircle className="h-12 w-12 stroke-[2.5]" />
          <span className="font-mono text-2xl font-black tracking-wider mt-1">SEND SOS</span>
          <span className="text-[10px] font-mono tracking-widest uppercase opacity-90">1-Tap Rescue</span>
        </button>
      </div>

      {/* GPS Location Bar */}
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-navy-950/70 p-3 text-xs font-mono">
        <div className="flex items-center space-x-2 text-slate-300">
          <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
          <span className="truncate max-w-[230px]">{userLocation?.address || "Detecting GPS location..."}</span>
        </div>
        <button
          onClick={fetchGPSLocation}
          className="rounded bg-cyan-500/20 text-cyan-300 px-2 py-0.5 text-[10px] font-bold border border-cyan-500/30"
        >
          Refresh GPS
        </button>
      </div>

      {/* Quick Situation Selector */}
      <div className="space-y-3 rounded-xl border border-white/10 bg-navy-950/60 p-4">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block">
          1. Select Immediate Hazard:
        </span>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "FLOOD", label: "Water Rising / Rooftop", icon: "🌊" },
            { id: "MEDICAL_EMERGENCY", label: "Medical / Injury", icon: "🚑" },
            { id: "STRUCTURAL_COLLAPSE", label: "Wall / Roof Collapse", icon: "🏚️" },
            { id: "ROAD_BLOCKED", label: "Stranded Vehicle / Road", icon: "🚗" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setDisasterType(item.id as any)}
              className={`flex items-center space-x-2 p-2.5 rounded-lg border text-left transition-all ${
                disasterType === item.id
                  ? "border-rose-400 bg-rose-950/50 text-white font-bold ring-1 ring-rose-400"
                  : "border-white/10 bg-black/20 text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[11px] leading-tight">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Victim Counter */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <span className="font-mono text-xs text-slate-300">People Needing Rescue:</span>
          <div className="flex items-center space-x-2 font-mono">
            <button
              onClick={() => setStrandedCount(Math.max(1, strandedCount - 1))}
              className="h-7 w-7 rounded border border-white/10 bg-white/5 flex items-center justify-center text-sm font-bold text-slate-300 active:bg-white/10"
            >
              -
            </button>
            <span className="w-8 text-center font-bold text-sm text-cyan-400">{strandedCount}</span>
            <button
              onClick={() => setStrandedCount(strandedCount + 1)}
              className="h-7 w-7 rounded border border-white/10 bg-white/5 flex items-center justify-center text-sm font-bold text-slate-300 active:bg-white/10"
            >
              +
            </button>
          </div>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <label className="flex items-center space-x-2 rounded-lg border border-white/5 bg-black/20 p-2 text-[11px] font-mono cursor-pointer">
            <input
              type="checkbox"
              checked={hasMedical}
              onChange={(e) => setHasMedical(e.target.checked)}
              className="rounded bg-navy-900 border-white/20 text-rose-500 focus:ring-0"
            />
            <span className={hasMedical ? "text-rose-400 font-bold" : "text-slate-400"}>Critical Medical / Insulin</span>
          </label>

          <label className="flex items-center space-x-2 rounded-lg border border-white/5 bg-black/20 p-2 text-[11px] font-mono cursor-pointer">
            <input
              type="checkbox"
              checked={requiresBoat}
              onChange={(e) => setRequiresBoat(e.target.checked)}
              className="rounded bg-navy-900 border-white/20 text-cyan-500 focus:ring-0"
            />
            <span className={requiresBoat ? "text-cyan-300 font-bold" : "text-slate-400"}>Needs Boat Evacuation</span>
          </label>
        </div>
      </div>

      {/* Detailed Multimodal Report Option Link */}
      <Link
        href="/report"
        className="flex items-center justify-between rounded-xl border border-cyan-500/30 bg-navy-950/80 p-3.5 text-xs text-cyan-300 hover:border-cyan-400 transition-colors shadow-lg"
      >
        <div className="flex items-center space-x-2.5">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <div>
            <div className="font-bold">Attach Photo, Video or Voice Note</div>
            <div className="text-[10px] text-slate-400">Enables AI 3-Model Computer Vision & Speech Analysis</div>
          </div>
        </div>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
