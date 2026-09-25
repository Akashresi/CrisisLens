"use client";

import React, { useState } from "react";
import { GitCompare, Play, RotateCcw, AlertTriangle, Activity, ArrowUpRight } from "lucide-react";
import { useCrisis } from "@/lib/store/store";
import { ScenarioMutation } from "@/lib/ai/scenario-simulator";

export default function SimulatorPage() {
  const { incidents, executeSimulation, activeSimulation, clearSimulation } = useCrisis();

  const [selectedMutation, setSelectedMutation] = useState<ScenarioMutation>({
    type: "RAINFALL_SURGE",
    parameterValue: "50",
    label: "Cloudburst Inundation (+50 mm/hr surge across basin)",
  });

  const [isSimulating, setIsSimulating] = useState(false);

  const presetScenarios: ScenarioMutation[] = [
    {
      type: "RAINFALL_SURGE",
      parameterValue: "50",
      label: "Cloudburst Inundation (+50 mm/hr surge across basin)",
    },
    {
      type: "ROAD_COLLAPSE",
      parameterValue: "GST Road Flyover & Subway Link",
      label: "Key Arterial Collapse (GST Road Severed)",
    },
    {
      type: "HOSPITAL_OFFLINE",
      parameterValue: "Central Government General Hospital",
      label: "Trauma Center Power & Flooded Access Loss",
    },
    {
      type: "DAM_WATER_RELEASE",
      parameterValue: "25,000 cusecs",
      label: "Chembarambakkam Reservoir Emergency Gate Release",
    },
  ];

  const handleRun = () => {
    setIsSimulating(true);
    setTimeout(() => {
      executeSimulation(selectedMutation);
      setIsSimulating(false);
    }, 500);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1500px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-xl font-bold font-mono uppercase tracking-wider text-white">
            What-If Scenario & Cascade Impact Simulator
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate prospective disaster escalations, infrastructure mutations, and weather surges before they manifest.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenario Controls (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-white/10 bg-navy-900/70 p-5 space-y-5">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-sm font-bold">
            <GitCompare className="h-5 w-5" />
            <span>Select Scenario Mutation</span>
          </div>

          <div className="space-y-2.5">
            {presetScenarios.map((sc, idx) => {
              const isSelected = selectedMutation.label === sc.label;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedMutation(sc)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-400"
                      : "border-white/10 bg-navy-950/40 hover:border-white/20"
                  }`}
                >
                  <div className="font-bold text-xs text-white">{sc.label}</div>
                  <div className="text-[11px] font-mono text-slate-400">Parameter: {sc.parameterValue}</div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleRun}
            disabled={isSimulating}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 font-mono text-xs font-bold text-white shadow-xl hover:scale-102 transition-transform disabled:opacity-50"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>{isSimulating ? "Simulating Graph Cascades..." : "Execute Simulation"}</span>
          </button>
        </div>

        {/* Simulation Output Dashboard (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {activeSimulation ? (
            <div className="rounded-xl border border-cyan-500/40 bg-navy-900/80 p-5 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                    Simulation Output
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{activeSimulation.scenarioName}</h3>
                </div>
                <button
                  onClick={clearSimulation}
                  className="flex items-center space-x-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-slate-300 hover:bg-white/10"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset Baseline</span>
                </button>
              </div>

              {/* Delta KPI Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="rounded-lg border border-red-500/30 bg-red-950/30 p-3 space-y-1">
                  <span className="text-[10px] text-red-400 font-semibold uppercase block">New Critical Cases</span>
                  <div className="text-2xl font-black text-white">+{activeSimulation.deltas.criticalIncidentCountDelta}</div>
                </div>

                <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 p-3 space-y-1">
                  <span className="text-[10px] text-rose-400 font-semibold uppercase block">Pop. at Danger</span>
                  <div className="text-2xl font-black text-white">
                    +{activeSimulation.deltas.populationAtRiskDelta.toLocaleString()}
                  </div>
                </div>

                <div className="rounded-lg border border-amber-500/30 bg-amber-950/30 p-3 space-y-1">
                  <span className="text-[10px] text-amber-400 font-semibold uppercase block">Transport Detour</span>
                  <div className="text-2xl font-black text-white">+{activeSimulation.deltas.evacuationDelayMinutesDelta}m</div>
                </div>

                <div className="rounded-lg border border-purple-500/30 bg-purple-950/30 p-3 space-y-1">
                  <span className="text-[10px] text-purple-400 font-semibold uppercase block">Bed Deficit</span>
                  <div className="text-2xl font-black text-white">-{activeSimulation.deltas.hospitalBedDeficitDelta} beds</div>
                </div>
              </div>

              {/* Narrative Breakdown */}
              <div className="rounded-lg border border-white/10 bg-black/30 p-4 space-y-2">
                <span className="text-xs font-bold text-cyan-300 font-mono block">Operational Cascade Summary:</span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{activeSimulation.summary}</p>
              </div>

              {/* Preemptive Actions */}
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
                <span className="text-xs font-bold text-emerald-300 font-mono block">
                  Recommended Preemptive Command Actions:
                </span>
                <ul className="list-inside list-disc space-y-1 text-xs text-slate-300 font-sans">
                  {activeSimulation.recommendedPreemptiveActions.map((action, idx) => (
                    <li key={idx}>{action}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-navy-900/40 p-12 text-center space-y-3">
              <Activity className="h-10 w-10 text-cyan-400 mx-auto animate-pulse" />
              <h3 className="text-sm font-bold text-slate-200">No Active Simulation Executed</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto font-mono">
                Select a scenario mutation on the left (e.g. +50mm/hr cloudburst surge or GST Road collapse) to compute real-time cascade deltas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
