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
    <div className={`relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xs ${className}`}>
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
      <div className="absolute top-3 left-3 z-[400] flex flex-wrap items-center gap-1.5 rounded-lg border border-slate-200 bg-white/95 p-1.5 backdrop-blur-md shadow-sm">
        <button
          onClick={() => setLayers((p) => ({ ...p, incidents: !p.incidents }))}
          className={`flex items-center space-x-1 px-2 py-1 rounded font-mono text-[11px] transition-colors ${
            layers.incidents
              ? "bg-rose-100 text-rose-800 border border-rose-300 font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <ShieldAlert className="h-3 w-3" />
          <span>Incidents ({incidents.length})</span>
        </button>

        <button
          onClick={() => setLayers((p) => ({ ...p, resources: !p.resources }))}
          className={`flex items-center space-x-1 px-2 py-1 rounded font-mono text-[11px] transition-colors ${
            layers.resources
              ? "bg-cyan-100 text-cyan-800 border border-cyan-300 font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Users className="h-3 w-3" />
          <span>Fleet ({resources.length})</span>
        </button>

        <button
          onClick={() => setLayers((p) => ({ ...p, shelters: !p.shelters }))}
          className={`flex items-center space-x-1 px-2 py-1 rounded font-mono text-[11px] transition-colors ${
            layers.shelters
              ? "bg-purple-100 text-purple-800 border border-purple-300 font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Home className="h-3 w-3" />
          <span>Shelters ({shelters.length})</span>
        </button>

        <button
          onClick={() => setLayers((p) => ({ ...p, floodZones: !p.floodZones }))}
          className={`flex items-center space-x-1 px-2 py-1 rounded font-mono text-[11px] transition-colors ${
            layers.floodZones
              ? "bg-amber-100 text-amber-800 border border-amber-300 font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <CloudRain className="h-3 w-3" />
          <span>Flood Polygons</span>
        </button>
      </div>

      {/* Floating Legend */}
      <div className="absolute bottom-3 left-3 z-[400] hidden sm:block rounded-lg border border-slate-200 bg-white/95 p-2.5 backdrop-blur-md font-mono text-[10px] space-y-1 text-slate-700 shadow-md">
        <div className="font-bold text-slate-900 border-b border-slate-200 pb-1">GIS Digital Twin</div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-red-600" />
          <span>Critical Incident (Score ≥ 75)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan-600" />
          <span>Active Resource Unit</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded bg-purple-600" />
          <span>Relief Camp / Shelter</span>
        </div>
      </div>
    </div>
  );
}

export default DisasterMap;
