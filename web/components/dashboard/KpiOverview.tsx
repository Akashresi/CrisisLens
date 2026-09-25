import React from "react";
import { AlertCircle, Users, Activity, ShieldCheck, HeartHandshake, CloudRain } from "lucide-react";
import { useCrisis } from "@/lib/store/store";

export function KpiOverview() {
  const { incidents, resources, shelters, weather } = useCrisis();

  const criticalCount = incidents.filter((i) => i.priorityLevel === "CRITICAL" && i.status !== "RESOLVED").length;
  const totalVictims = incidents.reduce((acc, i) => acc + (i.nlpFeatures?.reportedVictimsCount || 1), 0);
  const deployedFleet = resources.filter((r) => r.status === "DEPLOYED").length;
  const shelterCapacityRemaining = shelters.reduce((acc, s) => acc + (s.totalCapacity - s.occupied), 0);
  const avgConfidence = incidents.length > 0
    ? Math.round((incidents.reduce((acc, i) => acc + i.overallConfidence, 0) / incidents.length) * 100)
    : 88;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
      {/* 1. Critical Emergency Incidents */}
      <div className="rounded-xl border border-rose-500/30 bg-navy-900/60 p-3.5 space-y-1">
        <div className="flex items-center justify-between text-rose-400">
          <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Critical Urgency</span>
          <AlertCircle className="h-4 w-4 animate-pulse" />
        </div>
        <div className="font-mono text-2xl font-black text-white">{criticalCount}</div>
        <div className="text-[11px] text-slate-400">Incidents score &gt; 75</div>
      </div>

      {/* 2. Reported Stranded People */}
      <div className="rounded-xl border border-white/10 bg-navy-900/60 p-3.5 space-y-1">
        <div className="flex items-center justify-between text-amber-400">
          <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Trapped Victims</span>
          <Users className="h-4 w-4" />
        </div>
        <div className="font-mono text-2xl font-black text-white">{totalVictims}</div>
        <div className="text-[11px] text-slate-400">Extracted from NLP/CV</div>
      </div>

      {/* 3. Dispatched Rescue Units */}
      <div className="rounded-xl border border-white/10 bg-navy-900/60 p-3.5 space-y-1">
        <div className="flex items-center justify-between text-cyan-400">
          <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Active Fleet</span>
          <Activity className="h-4 w-4" />
        </div>
        <div className="font-mono text-2xl font-black text-white">
          {deployedFleet} <span className="text-xs text-slate-500 font-normal">/ {resources.length}</span>
        </div>
        <div className="text-[11px] text-slate-400">Boats & ALS units en route</div>
      </div>

      {/* 4. Shelter Space Available */}
      <div className="rounded-xl border border-white/10 bg-navy-900/60 p-3.5 space-y-1">
        <div className="flex items-center justify-between text-purple-400">
          <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Relief Shelters</span>
          <HeartHandshake className="h-4 w-4" />
        </div>
        <div className="font-mono text-2xl font-black text-white">{shelterCapacityRemaining}</div>
        <div className="text-[11px] text-slate-400">Open spaces across camps</div>
      </div>

      {/* 5. 3-Model Fusion Confidence */}
      <div className="rounded-xl border border-white/10 bg-navy-900/60 p-3.5 space-y-1">
        <div className="flex items-center justify-between text-emerald-400">
          <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Model Confidence</span>
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div className="font-mono text-2xl font-black text-white">{avgConfidence}%</div>
        <div className="text-[11px] text-slate-400">CV + NLP + GIS Fusion</div>
      </div>

      {/* 6. Precipitation Alert */}
      <div className="rounded-xl border border-white/10 bg-navy-900/60 p-3.5 space-y-1">
        <div className="flex items-center justify-between text-blue-400">
          <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Max Rainfall</span>
          <CloudRain className="h-4 w-4" />
        </div>
        <div className="font-mono text-2xl font-black text-white">84 <span className="text-xs font-normal">mm/h</span></div>
        <div className="text-[11px] text-slate-400">Velachery Catchment Basin</div>
      </div>
    </div>
  );
}
