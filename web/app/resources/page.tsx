"use client";

import React, { useState } from "react";
import { Users, Home, Shield, Truck, Phone, Navigation } from "lucide-react";
import { useCrisis } from "@/lib/store/store";

export default function ResourcesPage() {
  const { resources, shelters, releaseResource } = useCrisis();
  const [tab, setTab] = useState<"fleet" | "shelters">("fleet");

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1500px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-xl font-bold font-mono uppercase tracking-wider text-white">
            Emergency Fleet & Relief Shelters Allocation
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry and capacity tracking of NDRF boat teams, 108 ALS ambulances, and community relief camps.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <button
            onClick={() => setTab("fleet")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              tab === "fleet" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400" : "bg-white/5 text-slate-400"
            }`}
          >
            Rescue Fleet ({resources.length})
          </button>
          <button
            onClick={() => setTab("shelters")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              tab === "shelters" ? "bg-purple-500/20 text-purple-300 border border-purple-400" : "bg-white/5 text-slate-400"
            }`}
          >
            Relief Shelters ({shelters.length})
          </button>
        </div>
      </div>

      {tab === "fleet" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res) => (
            <div key={res.id} className="rounded-xl border border-white/10 bg-navy-900/70 p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-400">{res.id}</span>
                  <h4 className="text-sm font-bold text-white">{res.name}</h4>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                    res.status === "DEPLOYED"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  }`}
                >
                  {res.status}
                </span>
              </div>

              <div className="space-y-1 font-mono text-xs text-slate-400 bg-black/20 p-2.5 rounded-lg border border-white/5">
                <div>• Type: <span className="text-slate-200">{res.kind.replace(/_/g, " ")}</span></div>
                <div>• Base Location: <span className="text-slate-200">{res.location.address}</span></div>
                <div>• Capacity: <span className="text-slate-200">{res.capacity} personnel/victims</span></div>
                {res.assignedIncidentId && (
                  <div>• Assigned Incident: <span className="text-rose-400 font-bold">{res.assignedIncidentId}</span></div>
                )}
              </div>

              {res.status === "DEPLOYED" && (
                <button
                  onClick={() => releaseResource(res.id)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 py-1.5 font-mono text-xs text-slate-300"
                >
                  Recall & Release to Base
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shelters.map((sh) => {
            const pct = Math.round((sh.occupied / sh.totalCapacity) * 100);
            return (
              <div key={sh.id} className="rounded-xl border border-purple-500/30 bg-navy-900/70 p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-purple-400">{sh.id}</span>
                    <h4 className="text-sm font-bold text-white">{sh.name}</h4>
                  </div>
                  <span className="rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 font-mono text-[10px] font-bold">
                    {sh.status.replace(/_/g, " ")}
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-mono">{sh.location.address}</p>

                {/* Capacity Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xs text-slate-300">
                    <span>Occupancy ({pct}%)</span>
                    <span>{sh.occupied} / {sh.totalCapacity}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct > 85 ? "bg-red-500" : pct > 60 ? "bg-amber-500" : "bg-purple-500"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-xs text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Phone className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{sh.contactNumber}</span>
                  </div>
                  <span className="text-emerald-400">Rations Active</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
