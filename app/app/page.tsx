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
      activeRing: "border-2 border-blue-500 bg-blue-50 text-blue-950 font-bold ring-2 ring-blue-200 shadow-sm",
      inactive: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    },
    {
      id: "MEDICAL_EMERGENCY",
      label: t.medicalEmergency,
      icon: "🚑",
      activeRing: "border-2 border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-200 shadow-sm",
      inactive: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    },
    {
      id: "STRUCTURAL_COLLAPSE",
      label: t.collapseTrapped,
      icon: "🏚️",
      activeRing: "border-2 border-amber-500 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-200 shadow-sm",
      inactive: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    },
    {
      id: "ROAD_BLOCKED",
      label: t.roadSubmerged,
      icon: "🚗",
      activeRing: "border-2 border-purple-500 bg-purple-50 text-purple-950 font-bold ring-2 ring-purple-200 shadow-sm",
      inactive: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    },
  ];

  return (
    <div className="p-3 space-y-4">
      {/* Active SOS Tracker Banner if already sent */}
      {activeSOS && (
        <Link
          href="/sos-status"
          className="flex items-center justify-between rounded-2xl border-2 border-rose-300 bg-rose-50 p-3.5 text-rose-900 shadow-md animate-pulse"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🚨</span>
            <div>
              <div className="font-black text-sm text-rose-950">
                {language === "ta" ? "மீட்புக் குழு வருகிறது!" : language === "hi" ? "बचाव दल आ रहा है!" : language === "te" ? "రెస్క్యూ టీమ్ వస్తోంది!" : "Rescue Team En Route!"}
              </div>
              <div className="text-xs text-rose-700 font-bold">ETA: ~14 Mins • {activeSOS.trackingCode}</div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-rose-600" />
        </Link>
      )}

      {/* Giant 1-Tap SOS Beacon Button */}
      <div className="flex flex-col items-center justify-center pt-2 pb-1">
        <button
          onClick={handleQuickSOS}
          disabled={isSubmitting}
          className="relative h-48 w-48 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 flex flex-col items-center justify-center text-white shadow-[0_8px_30px_rgba(225,29,72,0.4)] active:scale-95 hover:scale-102 transition-all border-4 border-white disabled:opacity-50 group"
        >
          <div className="absolute inset-0 rounded-full border-4 border-rose-400 animate-ping pointer-events-none opacity-30" />
          <AlertCircle className="h-14 w-14 stroke-[2.5] text-white drop-shadow-md group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-black tracking-tight mt-1 drop-shadow-md text-center px-2 leading-tight">
            {t.oneTapSos}
          </span>
          <span className="text-[11px] font-bold tracking-wide uppercase text-white bg-black/25 px-2.5 py-0.5 rounded-full mt-1 shadow-sm">
            {t.sosSubtitle}
          </span>
        </button>
      </div>

      {/* Voice SOS (Speak in your language) */}
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-3 shadow-sm">
        <button
          onClick={handleVoiceSOS}
          className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
            isListeningVoice
              ? "bg-red-600 text-white border-red-500 animate-pulse ring-4 ring-red-200"
              : "bg-white hover:bg-amber-100/60 text-amber-950 border-amber-200 shadow-sm"
          }`}
        >
          <div className="flex items-center space-x-3 text-left">
            <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-black shadow-md">
              <Mic className="h-5 w-5" />
            </div>
            <div>
              <div className="font-black text-sm text-slate-900">{isListeningVoice ? t.listening : t.speakSos}</div>
              <div className="text-[11px] text-amber-800 font-bold">{t.tapToSpeak}</div>
            </div>
          </div>
          <span className="text-xl">🎙️</span>
        </button>
      </div>

      {/* Visual Hazard Selector (Pictogram First) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
            <span>1. {t.selectProblem}</span>
          </span>
          <button
            onClick={() => speak(t.selectProblem)}
            className="text-slate-500 hover:text-amber-600"
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
                className={`flex flex-col items-center text-center p-3 rounded-xl transition-all ${
                  isSelected ? item.activeRing : item.inactive
                }`}
              >
                <span className="text-3xl mb-1">{item.icon}</span>
                <span className="text-xs font-bold leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Victim Counter with Big Pictograms */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <div>
            <div className="text-xs font-black text-slate-900 flex items-center space-x-1">
              <span>👥 {t.peopleCount}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">{t.adultsKids}</div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                const next = Math.max(1, strandedCount - 1);
                setStrandedCount(next);
                speak(`${next}`);
              }}
              className="h-10 w-10 rounded-xl border border-slate-300 bg-white flex items-center justify-center text-xl font-black text-slate-800 shadow-sm active:bg-rose-500 active:text-white transition-colors"
            >
              -
            </button>
            <div className="flex flex-col items-center justify-center w-8">
              <span className="text-xl font-black text-rose-600">{strandedCount}</span>
            </div>
            <button
              onClick={() => {
                const next = strandedCount + 1;
                setStrandedCount(next);
                speak(`${next}`);
              }}
              className="h-10 w-10 rounded-xl border border-slate-300 bg-white flex items-center justify-center text-xl font-black text-slate-800 shadow-sm active:bg-cyan-500 active:text-white transition-colors"
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
                ? "border-2 border-cyan-500 bg-cyan-50 text-cyan-950 font-bold ring-2 ring-cyan-200 shadow-sm"
                : "border border-slate-200 bg-slate-50 text-slate-600"
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
                ? "border-2 border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-200 shadow-sm"
                : "border border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            <span className="text-2xl">💊</span>
            <span className="text-xs font-bold leading-tight">{t.needDoctor}</span>
          </button>
        </div>
      </div>

      {/* GPS Location Pill */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-xs shadow-sm">
        <div className="flex items-center space-x-2 text-slate-700">
          <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
          <span className="truncate max-w-[220px] font-mono text-[11px] font-medium">
            {userLocation?.address || "GPS Connected"}
          </span>
        </div>
        <button
          onClick={fetchGPSLocation}
          className="rounded-lg bg-slate-100 text-slate-800 px-2.5 py-1 text-[10px] font-bold border border-slate-300 active:scale-95 shadow-sm"
        >
          🔄 GPS
        </button>
      </div>

      {/* Visual Camera Report Card */}
      <Link
        href="/report"
        className="flex items-center justify-between rounded-2xl border-2 border-cyan-300 bg-gradient-to-r from-cyan-50 via-white to-cyan-50 p-3.5 text-slate-900 hover:border-cyan-400 transition-all shadow-sm"
      >
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-cyan-100 border border-cyan-300 flex items-center justify-center text-2xl shadow-sm">
            📷
          </div>
          <div>
            <div className="font-black text-slate-900 text-xs">{t.snapPhoto}</div>
            <div className="text-[10px] text-cyan-800 font-bold">1-Tap Camera & Voice Ingestion</div>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-cyan-600" />
      </Link>
    </div>
  );
}
