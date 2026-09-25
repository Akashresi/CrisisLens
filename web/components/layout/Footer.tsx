import React from "react";
import { ShieldCheck, Cpu, Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-4 px-6 text-xs text-slate-500 font-mono">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-slate-600">
          <ShieldCheck className="h-4 w-4 text-cyan-600" />
          <span className="font-semibold text-slate-700">CrisisLens Decision Support Platform</span>
          <span className="text-slate-300">|</span>
          <span className="text-cyan-700 font-medium">Authorised Human Control Protocol Active</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-slate-600">
            <Cpu className="h-3.5 w-3.5 text-blue-600" />
            <span>CV + NLP + GIS Triple-Model Fusion Engine</span>
          </div>
          <div className="flex items-center space-x-1 text-emerald-700 font-semibold">
            <Activity className="h-3.5 w-3.5" />
            <span>Telemetry: Live (24ms)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
