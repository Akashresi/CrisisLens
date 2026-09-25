"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Activity, CheckCircle2, Clock, MapPin, PhoneCall, ShieldCheck, Truck, AlertCircle, Volume2, Ship } from "lucide-react";
import { useCitizenApp } from "@/lib/store";

export default function SOSStatusPage() {
  const { activeSOS, language, t, speak, isSpeaking } = useCitizenApp();

  const statusVoiceText = activeSOS
    ? language === "ta"
      ? `உங்கள் உதவி கோரிக்கை பெறப்பட்டது. மீட்புக் குழு இன்னும் 14 நிமிடங்களில் உங்கள் இடத்திற்கு வந்து சேரும். பயப்பட வேண்டாம்.`
      : language === "hi"
      ? `आपकी मदद का अनुरोध प्राप्त हुआ है। बचाव दल 14 मिनट में पहुंच रहा है। चिंता न करें।`
      : language === "te"
      ? `మీ సహాయ అభ్యర్థన అందింది. రెస్క్యూ టీమ్ 14 నిమిషాల్లో చేరుకుంటుంది.`
      : `Rescue team is dispatched and arriving in 14 minutes. Stay calm.`
    : "";

  useEffect(() => {
    if (activeSOS) {
      speak(statusVoiceText);
    }
  }, [activeSOS]);

  if (!activeSOS) {
    return (
      <div className="p-6 text-center space-y-4">
        <div className="h-20 w-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-4xl">
          🚨
        </div>
        <h2 className="text-base font-black text-white">
          {language === "ta" ? "செயலில் உள்ள SOS எதுவும் இல்லை" : "No Active SOS Request"}
        </h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          {language === "ta"
            ? "உங்களுக்கு அல்லது உங்கள் குடும்பத்தினருக்கு அவசர உதவி தேவைப்பட்டால் கீழே அழுத்தவும்."
            : "If you need emergency rescue aid, tap the button below."}
        </p>
        <Link
          href="/"
          className="inline-block rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 px-8 py-3.5 text-sm font-black text-white shadow-xl active:scale-95"
        >
          {t.oneTapSos}
        </Link>
      </div>
    );
  }

  const visualSteps = [
    {
      title: t.statusSubmitted,
      icon: "📡",
      desc: "GPS & Distress Data Received",
      done: true,
    },
    {
      title: t.statusDispatched,
      icon: "🤖",
      desc: "AI 3-Model Priority Engine (Score 95/100)",
      done: true,
    },
    {
      title: t.statusEnRoute,
      icon: "🛥️",
      desc: activeSOS.assignedTeam || "NDRF Quick Response Unit 4",
      done: true,
      current: true,
    },
    {
      title: t.statusRescued,
      icon: "🏥",
      desc: "Safe evacuation to nearest shelter camp",
      done: false,
    },
  ];

  return (
    <div className="p-3 space-y-4">
      {/* Active Tracking Giant Card */}
      <div className="rounded-3xl border-2 border-rose-500/80 bg-gradient-to-br from-navy-950 via-navy-900 to-rose-950/60 p-4 space-y-3 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="h-3 w-3 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-black text-rose-300 uppercase tracking-wider">
              {language === "ta" ? "மீட்புக் குழு வருகிறது!" : "HELP IS ON THE WAY"}
            </span>
          </div>
          <button
            onClick={() => speak(statusVoiceText)}
            className="flex items-center space-x-1 rounded-full bg-amber-500 text-black px-2.5 py-1 text-xs font-black shadow-md hover:bg-amber-400"
          >
            <Volume2 className="h-4 w-4" />
            <span>{t.readAloud}</span>
          </button>
        </div>

        {/* Big Visual Beacon */}
        <div className="flex items-center space-x-4 pt-1">
          <div className="h-16 w-16 rounded-2xl bg-rose-500/20 border-2 border-rose-400/50 flex items-center justify-center text-3xl shrink-0 animate-bounce">
            🛥️
          </div>
          <div>
            <h2 className="text-lg font-black text-white leading-tight">
              {activeSOS.assignedTeam || "NDRF Boat Rescue Unit"}
            </h2>
            <p className="text-xs text-rose-300 font-bold mt-0.5 font-mono">
              ID: {activeSOS.trackingCode}
            </p>
          </div>
        </div>

        {/* Big ETA Countdown Display */}
        <div className="grid grid-cols-2 gap-2 bg-black/40 p-3 rounded-2xl border border-white/10 text-center">
          <div>
            <span className="text-[11px] text-slate-400 font-bold block">{t.rescueEta}</span>
            <span className="text-2xl font-black text-emerald-400">~14 Mins</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-bold block">
              {language === "ta" ? "முன்னுரிமை" : "Priority"}
            </span>
            <span className="text-2xl font-black text-rose-400">CRITICAL</span>
          </div>
        </div>
      </div>

      {/* Visual Step Timeline */}
      <div className="rounded-2xl border border-white/10 bg-navy-950/80 p-4 space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-slate-200 block">
          {language === "ta" ? "நேரலை மீட்பு நிலை:" : "Live Rescue Progress:"}
        </span>

        <div className="space-y-3">
          {visualSteps.map((step, idx) => (
            <div
              key={idx}
              className={`flex items-center space-x-3 p-2.5 rounded-xl border transition-all ${
                step.current
                  ? "bg-rose-950/50 border-rose-500/60 ring-2 ring-rose-500/30 text-white"
                  : step.done
                  ? "bg-emerald-950/20 border-emerald-500/30 text-slate-200"
                  : "bg-black/20 border-white/5 text-slate-500 opacity-60"
              }`}
            >
              <span className="text-2xl">{step.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black truncate">{step.title}</div>
                <div className="text-[10px] text-slate-400 truncate">{step.desc}</div>
              </div>
              {step.done ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              ) : (
                <Clock className="h-5 w-5 text-slate-600 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Direct Call Dispatcher Button */}
      <a
        href="tel:112"
        className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-red-600 hover:bg-red-500 p-3.5 text-sm font-black text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] active:scale-95 transition-transform"
      >
        <PhoneCall className="h-5 w-5 animate-bounce" />
        <span>{t.call112}</span>
      </a>
    </div>
  );
}
