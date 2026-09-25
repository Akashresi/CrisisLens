"use client";

import React from "react";
import { DisasterMap } from "@/components/map/DisasterMap";
import { PriorityQueue } from "@/components/dashboard/PriorityQueue";
import { useCrisis } from "@/lib/store/store";

export default function GISMapPage() {
  const { incidents, weather, shelters } = useCrisis();

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1700px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-mono uppercase tracking-wider">
            GIS Digital Twin & Spatial Prioritisation
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Real-time geospatial map integrating low-lying DEM catchment basins, rainfall mm/hr, and open shelter capacities.
          </p>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="rounded bg-rose-100 text-rose-800 border border-rose-300 px-2.5 py-1 font-bold shadow-xs">
            {incidents.filter((i) => i.priorityLevel === "CRITICAL").length} Critical Zones
          </span>
          <span className="rounded bg-purple-100 text-purple-800 border border-purple-300 px-2.5 py-1 font-bold shadow-xs">
            {shelters.length} Evacuation Shelters
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-200px)] min-h-[700px]">
        <div className="lg:col-span-8 h-full">
          <DisasterMap className="h-full w-full" />
        </div>
        <div className="lg:col-span-4 h-full">
          <PriorityQueue />
        </div>
      </div>
    </div>
  );
}
