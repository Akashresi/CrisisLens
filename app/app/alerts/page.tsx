"use client";

import React from "react";
import { CloudRain, AlertTriangle, Radio, ShieldAlert } from "lucide-react";

export default function AlertsPage() {
  const alerts = [
    {
      id: "ALERT-RED-01",
      severity: "RED ALERT",
      title: "Severe Cloudburst & Catchment Basin Inundation",
      zone: "Velachery, Adyar & Mudichur Basin",
      time: "10 mins ago",
      body: "Extreme rainfall exceeding 84mm/hr recorded by meteorological Doppler radar. Severe waterlogging in low-lying residential wards. Avoid all underpasses and ground floor dwellings.",
    },
    {
      id: "ALERT-ORANGE-02",
      severity: "ORANGE ALERT",
      title: "Chembarambakkam Reservoir Gate Discharge (15,000 cusecs)",
      zone: "Adyar Riverbank Settlements",
      time: "35 mins ago",
      body: "Controlled reservoir surplus discharge initiated into Adyar River. Downstream residents within 200m of riverbanks must move to designated higher-elevation community shelters.",
    },
    {
      id: "ALERT-YELLOW-03",
      severity: "YELLOW ALERT",
      title: "GST Road Flyover Underpass Traffic Diversion",
      zone: "Tambaram & Airport Corridor",
      time: "1 hour ago",
      body: "Subway water levels reached 5.5ft. Traffic diverted to Outer Ring Road elevated corridor.",
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1">
        <h1 className="text-lg font-black text-white tracking-tight">Official Emergency Alerts & Warnings</h1>
        <p className="text-xs text-slate-400">
          Direct broadcasts from State Disaster Management Authority & Meteorological Dept.
        </p>
      </div>

      <div className="space-y-3">
        {alerts.map((al) => {
          const isRed = al.severity.includes("RED");
          return (
            <div
              key={al.id}
              className={`rounded-xl border p-4 space-y-2.5 shadow-lg ${
                isRed
                  ? "border-red-500/50 bg-red-950/30 ring-1 ring-red-500/30"
                  : "border-amber-500/40 bg-amber-950/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                    isRed ? "bg-red-500 text-white animate-pulse" : "bg-amber-500 text-black"
                  }`}
                >
                  {al.severity}
                </span>
                <span className="font-mono text-[10px] text-slate-400">{al.time}</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{al.title}</h3>
                <div className="text-[11px] font-mono text-cyan-300 mt-0.5">Affected: {al.zone}</div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">{al.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
