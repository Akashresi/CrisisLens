"use client";

import React, { useState } from "react";
import { Users, Home, Shield, Truck, Phone, Navigation } from "lucide-react";
import { useCrisis } from "@/lib/store/store";

export default function ResourcesPage() {
  const { resources, shelters, releaseResource } = useCrisis();
  const [tab, setTab] = useState<"fleet" | "shelters">("fleet");

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1500px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold font-mono uppercase tracking-wider text-slate-900">
            Emergency Fleet & Relief Shelters Allocation
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Real-time telemetry and capacity tracking of NDRF boat teams, 108 ALS ambulances, and community relief camps.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <button
            onClick={() => setTab("fleet")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors shadow-xs ${
              tab === "fleet" ? "bg-cyan-600 text-white border border-cyan-600 shadow-sm" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Rescue Fleet ({resources.length})
          </button>
          <button
            onClick={() => setTab("shelters")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors shadow-xs ${
              tab === "shelters" ? "bg-purple-600 text-white border border-purple-600 shadow-sm" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Relief Shelters ({shelters.length})
          </button>
        </div>
      </div>

      {tab === "fleet" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res) => (
            <div key={res.id} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-700">{res.id}</span>
                  <h4 className="text-sm font-bold text-slate-900">{res.name}</h4>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                    res.status === "DEPLOYED"
                      ? "bg-rose-100 text-rose-800 border border-rose-300"
                      : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  }`}
                >
                  {res.status}
                </span>
              </div>

              <div className="space-y-1 font-mono text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div>• Type: <span className="text-slate-900 font-medium">{res.kind.replace(/_/g, " ")}</span></div>
                <div>• Base Location: <span className="text-slate-900 font-medium">{res.location.address}</span></div>
                <div>• Capacity: <span className="text-slate-900 font-medium">{res.capacity} personnel/victims</span></div>
                {res.assignedIncidentId && (
                  <div>• Assigned Incident: <span className="text-rose-700 font-bold">{res.assignedIncidentId}</span></div>
                )}
              </div>

              {res.status === "DEPLOYED" && (
                <button
                  onClick={() => releaseResource(res.id)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 py-1.5 font-mono text-xs text-slate-700 font-semibold"
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
              <div key={sh.id} className="rounded-xl border border-purple-200 bg-white p-4 space-y-3 shadow-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-purple-700">{sh.id}</span>
                    <h4 className="text-sm font-bold text-slate-900">{sh.name}</h4>
                  </div>
                  <span className="rounded bg-purple-100 text-purple-800 border border-purple-300 px-2 py-0.5 font-mono text-[10px] font-bold">
                    {sh.status.replace(/_/g, " ")}
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-mono">{sh.location.address}</p>

                {/* Capacity Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xs text-slate-600">
                    <span>Occupancy ({pct}%)</span>
                    <span className="font-semibold text-slate-900">{sh.occupied} / {sh.totalCapacity}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct > 85 ? "bg-red-500" : pct > 60 ? "bg-amber-500" : "bg-purple-600"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 font-mono text-xs text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Phone className="h-3.5 w-3.5 text-cyan-600" />
                    <span className="text-slate-700 font-semibold">{sh.contactNumber}</span>
                  </div>
                  <span className="text-emerald-700 font-bold">Rations Active</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
