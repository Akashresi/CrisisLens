"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Layers, ShieldAlert, Users, Home, CloudRain } from "lucide-react";
import { useCrisis } from "@/lib/store/store";

const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full min-h-[450px] flex flex-col items-center justify-center space-y-3 bg-navy-950/80 rounded-xl border border-white/10">
      <div className="flex items-center space-x-2 text-cyan-400 font-mono text-sm">
        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
        <span>Initializing CartoDB GIS Digital Twin & Spatial Layers...</span>
      </div>
    </div>
  ),
});

export function DisasterMap({ className = "h-full w-full" }: { className?: string }) {
  const { incidents, resources, shelters, selectedIncidentId, setSelectedIncidentId } = useCrisis();

  const [layers, setLayers] = useState({
    incidents: true,
    resources: true,
    shelters: true,
    floodZones: true,
  });

  return (
    <div className={`relative overflow-hidden rounded-xl border border-white/10 bg-navy-950 ${className}`}>
      {/* Map Canvas */}
      <MapCanvas
        incidents={incidents}
        resources={resources}
        shelters={shelters}
        selectedIncidentId={selectedIncidentId}
        onSelectIncident={setSelectedIncidentId}
        layers={layers}
      />

      {/* Floating Layer Controls */}
      <div className="absolute top-3 left-3 z-[400] flex flex-wrap items-center gap-1.5 rounded-lg border border-white/10 bg-navy-950/80 p-1.5 backdrop-blur-md">
        <button
          onClick={() => setLayers((p) => ({ ...p, incidents: !p.incidents }))}
          className={`flex items-center space-x-1 px-2 py-1 rounded font-mono text-[11px] transition-colors ${
            layers.incidents
              ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <ShieldAlert className="h-3 w-3" />
          <span>Incidents ({incidents.length})</span>
        </button>

        <button
          onClick={() => setLayers((p) => ({ ...p, resources: !p.resources }))}
          className={`flex items-center space-x-1 px-2 py-1 rounded font-mono text-[11px] transition-colors ${
            layers.resources
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Users className="h-3 w-3" />
          <span>Fleet ({resources.length})</span>
        </button>

        <button
          onClick={() => setLayers((p) => ({ ...p, shelters: !p.shelters }))}
          className={`flex items-center space-x-1 px-2 py-1 rounded font-mono text-[11px] transition-colors ${
            layers.shelters
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Home className="h-3 w-3" />
          <span>Shelters ({shelters.length})</span>
        </button>

        <button
          onClick={() => setLayers((p) => ({ ...p, floodZones: !p.floodZones }))}
          className={`flex items-center space-x-1 px-2 py-1 rounded font-mono text-[11px] transition-colors ${
            layers.floodZones
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <CloudRain className="h-3 w-3" />
          <span>Flood Polygons</span>
        </button>
      </div>

      {/* Floating Legend */}
      <div className="absolute bottom-3 left-3 z-[400] hidden sm:block rounded-lg border border-white/10 bg-navy-950/85 p-2.5 backdrop-blur-md font-mono text-[10px] space-y-1 text-slate-300 shadow-xl">
        <div className="font-bold text-slate-200 border-b border-white/10 pb-1">GIS Digital Twin</div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span>Critical Incident (Score ≥ 75)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          <span>Active Resource Unit</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded bg-purple-500" />
          <span>Relief Camp / Evacuation Shelter</span>
        </div>
      </div>
    </div>
  );
}

export default DisasterMap;
