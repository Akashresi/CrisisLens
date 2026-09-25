import React from "react";
import { Eye, MessageSquareText, MapPin, Cpu, ShieldAlert, Activity } from "lucide-react";

export function ModelPipelineBanner() {
  return (
    <div className="rounded-xl border border-cyan-200 bg-gradient-to-r from-cyan-50/80 via-white to-blue-50/80 p-4 shadow-xs">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-cyan-100 border border-cyan-300 flex items-center justify-center text-cyan-700 shadow-xs">
            <Cpu className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-cyan-900 uppercase tracking-wider">
                Multimodal 3-Model Fusion Architecture
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Small CV Model + Small NLP Model + GIS Spatial Engine fused into Dynamic Priority Assessment
            </p>
          </div>
        </div>

        {/* Pipeline Diagram */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          {/* Step 1: Input Modalities */}
          <div className="flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-xs">
            <Eye className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-slate-700 font-semibold">CV Vision</span>
          </div>

          <span className="text-slate-400 font-bold">+</span>

          <div className="flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-xs">
            <MessageSquareText className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-slate-700 font-semibold">NLP Text/Vox</span>
          </div>

          <span className="text-slate-400 font-bold">+</span>

          <div className="flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-xs">
            <MapPin className="h-3.5 w-3.5 text-amber-600" />
            <span className="text-slate-700 font-semibold">GIS Telemetry</span>
          </div>

          <span className="text-cyan-600 font-bold">➔</span>

          {/* Step 2: Feature Fusion */}
          <div className="flex items-center space-x-1.5 rounded-lg border border-cyan-400 bg-cyan-100 px-2.5 py-1.5 text-cyan-900 shadow-xs">
            <Activity className="h-3.5 w-3.5 text-cyan-700" />
            <span className="font-bold">Feature Fusion</span>
          </div>

          <span className="text-cyan-600 font-bold">➔</span>

          {/* Step 3: Priority Engine */}
          <div className="flex items-center space-x-1.5 rounded-lg border border-rose-300 bg-rose-100 px-2.5 py-1.5 text-rose-900 shadow-xs">
            <ShieldAlert className="h-3.5 w-3.5 text-rose-600" />
            <span className="font-bold">Priority Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
}
