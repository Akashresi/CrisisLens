"use client";

import React from "react";
import { Home, Phone, Navigation, ShieldCheck, MapPin } from "lucide-react";
import { useCitizenApp } from "@/lib/store";

export default function SheltersPage() {
  const { shelters } = useCitizenApp();

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1">
        <h1 className="text-lg font-black text-white tracking-tight">Safe Evacuation Shelters & Relief Camps</h1>
        <p className="text-xs text-slate-400">
          Government-authorized relief camps with food rations, drinking water, and medical aid posts.
        </p>
      </div>

      <div className="space-y-3">
        {shelters.map((sh) => {
          const openSpaces = sh.totalCapacity - sh.occupied;
          const isNear = sh.status === "NEAR_CAPACITY";

          return (
            <div
              key={sh.id}
              className="rounded-xl border border-purple-500/30 bg-navy-950/70 p-4 space-y-3 shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-purple-400">{sh.distanceKm} km away</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{sh.name}</h3>
                </div>
                <span
                  className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                    isNear
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  }`}
                >
                  {openSpaces} Spaces Left
                </span>
              </div>

              <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono">
                <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span className="truncate">{sh.address}</span>
              </div>

              <div className="flex items-center space-x-3 text-[11px] font-mono text-emerald-400">
                <span>✓ Food Rations</span>
                <span>✓ Medical First Aid</span>
                <span>✓ High Elevation DEM</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 font-mono text-xs">
                <a
                  href={`tel:${sh.phone}`}
                  className="flex items-center justify-center space-x-1.5 rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200 hover:bg-white/10"
                >
                  <Phone className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Call Camp</span>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(sh.name + " " + sh.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 p-2 text-white font-bold shadow-md"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
