"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, MapPin, Users, HeartPulse, ShieldAlert, ArrowRight, Radio, Mic, Volume2, Ship, PhoneCall, Sparkles } from "lucide-react";
import { useCitizenApp } from "@/lib/store";

export default function CitizenHomePage() {
  const router = useRouter();
  const { userLocation, fetchGPSLocation, submitSOS, activeSOS, language, t, speak, isSpeaking } = useCitizenApp();

  const [disasterType, setDisasterType] = useState<"FLOOD" | "MEDICAL_EMERGENCY" | "STRUCTURAL_COLLAPSE" | "ROAD_BLOCKED">("FLOOD");
  const [strandedCount, setStrandedCount] = useState(2);
  const [hasMedical, setHasMedical] = useState(false);
  const [requiresBoat, setRequiresBoat] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isListeningVoice, setIsListeningVoice] = useState(false);

  const handleQuickSOS = async () => {
    setIsSubmitting(true);
    const loc = userLocation || (await fetchGPSLocation());

    const description = `EMERGENCY SOS: ${strandedCount} person(s) stranded due to ${disasterType.replace(/_/g, " ")}. ${
      hasMedical ? "CRITICAL MEDICAL ATTENTION NEEDED." : ""
    } ${requiresBoat ? "Requires evacuation boat." : ""}`;

    await submitSOS({
      name: "Citizen SOS",
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

  const handleVoiceSOS = () => {
    if (!isListeningVoice) {
      setIsListeningVoice(true);
      speak(t.listening);
      setTimeout(async () => {
        setIsListeningVoice(false);
        await handleQuickSOS();
      }, 4000);
    }
  };

  const hazards = [
    {
      id: "FLOOD",
      label: t.floodRooftop,
      icon: "🌊",
      color: "from-blue-600/30 to-cyan-600/30 border-cyan-500/50 text-cyan-300",
      activeRing: "border-cyan-400 bg-cyan-950/80 ring-2 ring-cyan-400 text-white",
    },
    {
      id: "MEDICAL_EMERGENCY",
      label: t.medicalEmergency,
      icon: "🚑",
      color: "from-red-600/30 to-rose-600/30 border-rose-500/50 text-rose-300",
      activeRing: "border-rose-400 bg-rose-950/80 ring-2 ring-rose-400 text-white",
    },
    {
      id: "STRUCTURAL_COLLAPSE",
      label: t.collapseTrapped,
      icon: "🏚️",
      color: "from-amber-600/30 to-orange-600/30 border-amber-500/50 text-amber-300",
      activeRing: "border-amber-400 bg-amber-950/80 ring-2 ring-amber-400 text-white",
    },
    {
      id: "ROAD_BLOCKED",
      label: t.roadSubmerged,
      icon: "🚗",
      color: "from-purple-600/30 to-indigo-600/30 border-purple-500/50 text-purple-300",
      activeRing: "border-purple-400 bg-purple-950/80 ring-2 ring-purple-400 text-white",
    },
  ];

  return (
    <div className="p-3 space-y-4">
      {/* Active SOS Tracker Banner if already sent */}
      {activeSOS && (
        <Link
          href="/sos-status"
          className="flex items-center justify-between rounded-2xl border-2 border-rose-500/80 bg-rose-950/70 p-3.5 text-rose-200 shadow-[0_0_25px_rgba(244,63,94,0.4)] animate-pulse"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🚨</span>
            <div>
              <div className="font-black text-sm text-white">
                {language === "ta" ? "மீட்புக் குழு வருகிறது!" : language === "hi" ? "बचाव दल आ रहा है!" : language === "te" ? "రెస్క్యూ టీమ్ వస్తోంది!" : "Rescue Team En Route!"}
              </div>
              <div className="text-xs text-rose-300 font-bold">ETA: ~14 Mins • {activeSOS.trackingCode}</div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-rose-300" />
        </Link>
      )}

      {/* Giant 1-Tap SOS Beacon Button */}
      <div className="flex flex-col items-center justify-center pt-2 pb-1">
        <button
          onClick={handleQuickSOS}
          disabled={isSubmitting}
          className="relative h-48 w-48 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 flex flex-col items-center justify-center text-white shadow-[0_0_50px_rgba(244,63,94,0.7)] active:scale-95 hover:scale-102 transition-all border-4 border-white/30 disabled:opacity-50 group"
        >
          <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping pointer-events-none opacity-40" />
          <AlertCircle className="h-14 w-14 stroke-[2.5] text-white drop-shadow-md group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-black tracking-tight mt-1 drop-shadow-md text-center px-2 leading-tight">
            {t.oneTapSos}
          </span>
          <span className="text-[11px] font-bold tracking-wide uppercase text-rose-100 bg-black/30 px-2.5 py-0.5 rounded-full mt-1">
            {t.sosSubtitle}
          </span>
        </button>
      </div>

      {/* Voice SOS (Speak in your language) */}
      <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-navy-950 to-amber-950/30 p-3">
        <button
          onClick={handleVoiceSOS}
          className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
            isListeningVoice
              ? "bg-red-600 text-white border-red-400 animate-pulse ring-4 ring-red-500/50"
              : "bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 border-amber-500/30"
          }`}
        >
          <div className="flex items-center space-x-3 text-left">
            <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold shadow-md">
              <Mic className="h-5 w-5" />
            </div>
            <div>
              <div className="font-black text-sm text-white">{isListeningVoice ? t.listening : t.speakSos}</div>
              <div className="text-[11px] text-amber-300 font-medium">{t.tapToSpeak}</div>
            </div>
          </div>
          <span className="text-xl">🎙️</span>
        </button>
      </div>

      {/* Visual Hazard Selector (Pictogram First) */}
      <div className="rounded-2xl border border-white/10 bg-navy-950/80 p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center space-x-1.5">
            <span>1. {t.selectProblem}</span>
          </span>
          <button
            onClick={() => speak(t.selectProblem)}
            className="text-slate-400 hover:text-amber-300"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {hazards.map((item) => {
            const isSelected = disasterType === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setDisasterType(item.id as any);
                  speak(item.label);
                }}
                className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all ${
                  isSelected ? item.activeRing : "border-white/10 bg-black/30 text-slate-300 hover:bg-white/5"
                }`}
              >
                <span className="text-3xl mb-1">{item.icon}</span>
                <span className="text-xs font-bold leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Victim Counter with Big Pictograms */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between bg-black/20 p-2.5 rounded-xl">
          <div>
            <div className="text-xs font-black text-white flex items-center space-x-1">
              <span>👥 {t.peopleCount}</span>
            </div>
            <div className="text-[10px] text-slate-400">{t.adultsKids}</div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                const next = Math.max(1, strandedCount - 1);
                setStrandedCount(next);
                speak(`${next}`);
              }}
              className="h-10 w-10 rounded-xl border border-white/20 bg-white/10 flex items-center justify-center text-xl font-black text-white active:bg-rose-500 transition-colors"
            >
              -
            </button>
            <div className="flex flex-col items-center justify-center w-8">
              <span className="text-xl font-black text-cyan-400">{strandedCount}</span>
            </div>
            <button
              onClick={() => {
                const next = strandedCount + 1;
                setStrandedCount(next);
                speak(`${next}`);
              }}
              className="h-10 w-10 rounded-xl border border-white/20 bg-white/10 flex items-center justify-center text-xl font-black text-white active:bg-cyan-500 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Big 1-Tap Feature Checkboxes */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              setRequiresBoat(!requiresBoat);
              speak(t.needBoat);
            }}
            className={`flex items-center space-x-2 p-2.5 rounded-xl border text-left transition-all ${
              requiresBoat
                ? "border-cyan-400 bg-cyan-950/60 text-cyan-200 font-bold ring-2 ring-cyan-400/40"
                : "border-white/10 bg-black/20 text-slate-400"
            }`}
          >
            <span className="text-2xl">🛥️</span>
            <span className="text-xs font-bold leading-tight">{t.needBoat}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setHasMedical(!hasMedical);
              speak(t.needDoctor);
            }}
            className={`flex items-center space-x-2 p-2.5 rounded-xl border text-left transition-all ${
              hasMedical
                ? "border-rose-400 bg-rose-950/60 text-rose-200 font-bold ring-2 ring-rose-400/40"
                : "border-white/10 bg-black/20 text-slate-400"
            }`}
          >
            <span className="text-2xl">💊</span>
            <span className="text-xs font-bold leading-tight">{t.needDoctor}</span>
          </button>
        </div>
      </div>

      {/* GPS Location Pill */}
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-navy-950/90 p-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-300">
          <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
          <span className="truncate max-w-[220px] font-mono text-[11px]">
            {userLocation?.address || "GPS Connected"}
          </span>
        </div>
        <button
          onClick={fetchGPSLocation}
          className="rounded-lg bg-cyan-500/20 text-cyan-300 px-2 py-1 text-[10px] font-bold border border-cyan-500/30 active:scale-95"
        >
          🔄 GPS
        </button>
      </div>

      {/* Visual Camera Report Card */}
      <Link
        href="/report"
        className="flex items-center justify-between rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-r from-navy-950 via-cyan-950/30 to-navy-950 p-3.5 text-cyan-200 hover:border-cyan-400 transition-all shadow-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-2xl">
            📷
          </div>
          <div>
            <div className="font-black text-white text-xs">{t.snapPhoto}</div>
            <div className="text-[10px] text-cyan-300 font-medium">1-Tap Camera & Voice Ingestion</div>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-cyan-400" />
      </Link>
    </div>
  );
}
