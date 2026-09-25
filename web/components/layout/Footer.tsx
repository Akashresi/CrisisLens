import React from "react";
import { ShieldCheck, Cpu, Database, Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 py-4 px-6 text-xs text-slate-500 font-mono">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-slate-400">
          <ShieldCheck className="h-4 w-4 text-cyan-400" />
          <span>CrisisLens Decision Support Platform</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">Authorised Human Control Protocol Active</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-slate-400">
            <Cpu className="h-3.5 w-3.5 text-blue-400" />
            <span>CV + NLP + GIS Triple-Model Fusion Engine</span>
          </div>
          <div className="flex items-center space-x-1 text-emerald-400">
            <Activity className="h-3.5 w-3.5" />
            <span>Telemetry: Live (24ms)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
