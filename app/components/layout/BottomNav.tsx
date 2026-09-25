"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertCircle, Camera, Activity, Home, Bell, PhoneCall, Volume2, VolumeX } from "lucide-react";
import { useCitizenApp } from "@/lib/store";
import { SupportedLanguage } from "@/lib/translations";

export function BottomNav() {
  const pathname = usePathname();
  const { activeSOS, language, t } = useCitizenApp();

  const navItems = [
    {
      href: "/",
      label: language === "ta" ? "SOS உதவி" : language === "hi" ? "SOS मदद" : language === "te" ? "SOS సహాయం" : "SOS Help",
      icon: AlertCircle,
    },
    {
      href: "/report",
      label: language === "ta" ? "படம் / குரல்" : language === "hi" ? "फोटो / आवाज" : language === "te" ? "ఫోటో / వాయిస్" : "Photo / Voice",
      icon: Camera,
    },
    {
      href: "/sos-status",
      label: language === "ta" ? "நிலை" : language === "hi" ? "स्थिति" : language === "te" ? "స్థితి" : "Status",
      icon: Activity,
      badge: activeSOS ? "Live" : null,
    },
    {
      href: "/shelters",
      label: language === "ta" ? "முகாம்கள்" : language === "hi" ? "शिविर" : language === "te" ? "పునరావాసం" : "Shelters",
      icon: Home,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto border-t border-white/15 bg-navy-950/98 backdrop-blur-xl px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative ${
                isActive
                  ? "text-rose-400 font-bold bg-rose-500/15 ring-1 ring-rose-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className={`h-6 w-6 ${isActive ? "scale-110 text-rose-400" : ""}`} />
              <span className="text-[11px] font-bold mt-1 tracking-tight">{item.label}</span>
              {item.badge && (
                <span className="absolute top-1 right-2 h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function MobileHeader() {
  const { language, setLanguage, speak, isSpeaking, stopSpeaking, t } = useCitizenApp();

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "hi", label: "हिंदी", flag: "🇮🇳" },
    { code: "te", label: "తెలుగు", flag: "🇮🇳" },
  ];

  return (
    <header className="sticky top-0 z-40 max-w-md mx-auto border-b border-white/10 bg-navy-950/95 backdrop-blur-md px-3 py-2 space-y-2">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-black text-xs shadow-lg ring-2 ring-rose-400/40">
            SOS
          </div>
          <div>
            <div className="font-black text-white text-sm tracking-tight flex items-center space-x-1.5">
              <span>CRISIS<span className="text-rose-400">LENS</span></span>
              <span className="rounded-full bg-rose-500/20 px-1.5 py-0.2 font-mono text-[9px] text-rose-300 font-bold border border-rose-500/40">
                1-TAP
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">{t.emergencyTag}</div>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          {/* Audio Speaker Read-Aloud Button */}
          <button
            onClick={() => (isSpeaking ? stopSpeaking() : speak())}
            title="Read instructions aloud"
            className={`flex items-center space-x-1 rounded-full px-2.5 py-1 text-xs font-bold transition-all border ${
              isSpeaking
                ? "bg-amber-500 text-black border-amber-400 animate-pulse ring-2 ring-amber-400"
                : "bg-navy-800 text-amber-300 border-amber-500/40 hover:bg-amber-500/20"
            }`}
          >
            {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <span className="text-[11px] font-bold">{isSpeaking ? "நிறுத்து" : t.readAloud}</span>
          </button>

          {/* Direct 112 Hotline */}
          <a
            href="tel:112"
            className="flex items-center space-x-1 rounded-full bg-red-600 hover:bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-[0_0_12px_rgba(239,68,68,0.5)] active:scale-95 transition-transform"
          >
            <PhoneCall className="h-3.5 w-3.5 animate-bounce" />
            <span className="font-mono">112</span>
          </a>
        </div>
      </div>

      {/* Language Selector Pill Bar */}
      <div className="flex items-center justify-between bg-black/40 p-1 rounded-xl border border-white/10">
        {languages.map((item) => (
          <button
            key={item.code}
            onClick={() => setLanguage(item.code)}
            className={`flex-1 py-1 px-1.5 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center space-x-1 ${
              language === item.code
                ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md scale-102"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
}
