"use client";

import React from "react";
import { Home, Phone, Navigation, ShieldCheck, MapPin, Volume2 } from "lucide-react";
import { useCitizenApp } from "@/lib/store";

export default function SheltersPage() {
  const { shelters, language, t, speak } = useCitizenApp();

  return (
    <div className="p-3 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-black text-white tracking-tight flex items-center space-x-2">
            <span>🏕️</span>
            <span>{t.sheltersTitle}</span>
          </h1>
          <p className="text-xs text-slate-400">
            {language === "ta"
              ? "இலவச உணவு, குடிநீர் மற்றும் தங்கும் இடம் உள்ள முகாம்கள்."
              : "Safe shelters with free meals, drinking water & medical beds."}
          </p>
        </div>
        <button
          onClick={() =>
            speak(
              language === "ta"
                ? "அருகிலுள்ள பாதுகாப்பு முகாம்கள் மற்றும் உணவு மையங்கள்."
                : "Nearby safe shelters and relief food camps."
            )
          }
          className="text-amber-300 p-1.5 rounded-lg bg-white/5 shrink-0"
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        {shelters.map((sh) => {
          const openSpaces = sh.totalCapacity - sh.occupied;
          const isNear = sh.status === "NEAR_CAPACITY";

          const shelterSpeech = `${sh.name}. ${sh.distanceKm} kilometers away. ${openSpaces} spots available. Food and medical available.`;

          return (
            <div
              key={sh.id}
              className="rounded-2xl border-2 border-purple-500/40 bg-navy-950/80 p-3.5 space-y-3 shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-black text-purple-400">📍 {sh.distanceKm} km away</span>
                  <h3 className="text-sm font-black text-white mt-0.5">{sh.name}</h3>
                </div>
                <button
                  onClick={() => speak(shelterSpeech)}
                  className="p-1 text-slate-400 hover:text-amber-300"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center space-x-1.5 text-xs text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span className="truncate">{sh.address}</span>
              </div>

              {/* Visual Badges */}
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 bg-black/30 p-2 rounded-xl border border-white/5">
                <span>🍛 {language === "ta" ? "இலவச உணவு" : "Free Meals"}</span>
                <span>•</span>
                <span>🩺 {language === "ta" ? "மருத்துவர்" : "Doctor"}</span>
                <span>•</span>
                <span className="text-cyan-300">🛏️ {openSpaces} {language === "ta" ? "இடங்கள்" : "Beds"}</span>
              </div>

              {/* Big 1-Tap Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-bold text-xs">
                <a
                  href={`tel:${sh.phone}`}
                  className="flex items-center justify-center space-x-2 rounded-xl border border-emerald-500/50 bg-emerald-950/40 p-3 text-emerald-300 active:scale-95 shadow-md"
                >
                  <Phone className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <span>{t.callCamp}</span>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(sh.name + " " + sh.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-3 text-white active:scale-95 shadow-md"
                >
                  <Navigation className="h-4 w-4" />
                  <span>{t.directions}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
