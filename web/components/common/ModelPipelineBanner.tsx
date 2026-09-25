import React from "react";
import { Eye, MessageSquareText, MapPin, Cpu, ShieldAlert, Activity } from "lucide-react";

export function ModelPipelineBanner() {
  return (
    <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-4 shadow-xl">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
            <Cpu className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Multimodal 3-Model Fusion Architecture
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-xs text-slate-400">
              Small CV Model + Small NLP Model + GIS Spatial Engine fused into Dynamic Priority Assessment
            </p>
          </div>
        </div>

        {/* Pipeline Diagram */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          {/* Step 1: Input Modalities */}
          <div className="flex items-center space-x-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5">
            <Eye className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-slate-300">CV Vision</span>
          </div>

          <span className="text-slate-600 font-bold">+</span>

          <div className="flex items-center space-x-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5">
            <MessageSquareText className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-slate-300">NLP Text/Vox</span>
          </div>

          <span className="text-slate-600 font-bold">+</span>

          <div className="flex items-center space-x-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5">
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-slate-300">GIS Telemetry</span>
          </div>

          <span className="text-cyan-400 font-bold">➔</span>

          {/* Step 2: Feature Fusion */}
          <div className="flex items-center space-x-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-2.5 py-1.5 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-bold">Feature Fusion</span>
          </div>

          <span className="text-cyan-400 font-bold">➔</span>

          {/* Step 3: Priority Engine */}
          <div className="flex items-center space-x-1.5 rounded-lg border border-rose-500/40 bg-rose-950/40 px-2.5 py-1.5 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
            <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
            <span className="font-bold">Priority Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
}
