"use client";

import React from "react";
import Link from "next/link";
import { Activity, CheckCircle2, Clock, MapPin, PhoneCall, ShieldCheck, Truck, AlertCircle } from "lucide-react";
import { useCitizenApp } from "@/lib/store";

export default function SOSStatusPage() {
  const { activeSOS } = useCitizenApp();

  if (!activeSOS) {
    return (
      <div className="p-6 text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <Activity className="h-8 w-8" />
        </div>
        <h2 className="text-base font-bold text-white">No Active Emergency SOS</h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          You currently have no open emergency rescue requests. Tap below if you or your family require immediate aid.
        </p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-2.5 font-mono text-xs font-bold text-white shadow-lg"
        >
          Send Emergency SOS
        </Link>
      </div>
    );
  }

  const steps = [
    { title: "SOS Beacon Transmitted", desc: "GPS coordinates & distress telemetry received", completed: true },
    { title: "3-Model AI Feature Fusion", desc: "CV + NLP + GIS analyzed severity & risk", completed: true },
    { title: "Priority Scored & Queued", desc: `Assigned Priority: ${activeSOS.priorityLevel} (${activeSOS.priorityScore}/100)`, completed: true },
    { title: "Rescue Team Dispatched", desc: `${activeSOS.assignedTeam || "NDRF Quick Response"} en route`, completed: true },
    { title: "On-Site Rescue & Evacuation", desc: "Safe transfer to nearest relief camp / hospital", completed: false },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Active Tracking Card */}
      <div className="rounded-2xl border border-rose-500/40 bg-gradient-to-br from-navy-950 via-navy-900 to-rose-950/40 p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider">
              Emergency Active
            </span>
          </div>
          <span className="font-mono text-xs font-black text-white bg-black/40 px-2 py-0.5 rounded border border-white/10">
            {activeSOS.trackingCode}
          </span>
        </div>

        <div>
          <h2 className="text-base font-bold text-white">Rescue Unit En Route</h2>
          <p className="text-xs text-slate-300 font-mono mt-0.5">
            Assigned: <span className="text-cyan-400 font-bold">{activeSOS.assignedTeam}</span>
          </p>
        </div>

        {/* ETA & Distance */}
        <div className="grid grid-cols-2 gap-2 font-mono text-xs bg-black/30 p-2.5 rounded-xl border border-white/5">
          <div>
            <span className="text-slate-500 block text-[10px]">Estimated Arrival</span>
            <span className="text-emerald-400 font-bold text-base">~{activeSOS.estimatedEtaMinutes || 14} Mins</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Priority Level</span>
            <span className="text-rose-400 font-bold text-base">{activeSOS.priorityLevel}</span>
          </div>
        </div>
      </div>

      {/* Lifecycle Progression Timeline */}
      <div className="rounded-xl border border-white/10 bg-navy-950/70 p-4 space-y-3">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 block">
          Live Dispatch Lifecycle:
        </span>

        <div className="relative border-l border-white/10 ml-3 pl-4 space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <span
                className={`absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border border-white/20 ${
                  step.completed ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-slate-700"
                }`}
              />
              <div>
                <div className={`text-xs font-bold ${step.completed ? "text-slate-100" : "text-slate-500"}`}>
                  {step.title}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contact Hotline */}
      <div className="rounded-xl border border-white/10 bg-navy-950/70 p-3.5 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-white">Need to speak with Dispatcher?</div>
          <div className="text-[11px] text-slate-400 font-mono">State Emergency Operation Center</div>
        </div>
        <a
          href="tel:112"
          className="flex items-center space-x-1.5 rounded-lg bg-red-600 hover:bg-red-500 px-3 py-1.5 text-xs font-mono font-bold text-white shadow-md"
        >
          <PhoneCall className="h-3.5 w-3.5" />
          <span>Call 112</span>
        </a>
      </div>
    </div>
  );
}
