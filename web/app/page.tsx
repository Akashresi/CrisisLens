"use client";

import React from "react";
import { KpiOverview } from "@/components/dashboard/KpiOverview";
import { ModelPipelineBanner } from "@/components/common/ModelPipelineBanner";
import { PriorityQueue } from "@/components/dashboard/PriorityQueue";
import { ExplainablePanel } from "@/components/dashboard/ExplainablePanel";
import { DisasterMap } from "@/components/map/DisasterMap";

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1700px] mx-auto">
      {/* 3-Model Fusion Banner */}
      <ModelPipelineBanner />

      {/* KPI Overview Row */}
      <KpiOverview />

      {/* Main Grid: Priority Queue + Map Digital Twin + Explainable AI Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-250px)] min-h-[750px]">
        {/* Left Column: Prioritized Incident Queue (3 cols) */}
        <div className="lg:col-span-3 h-full">
          <PriorityQueue />
        </div>

        {/* Center Column: GIS Map Digital Twin (5 cols) */}
        <div className="lg:col-span-5 h-full">
          <DisasterMap className="h-full w-full" />
        </div>

        {/* Right Column: Explainable AI & Evidence Details (4 cols) */}
        <div className="lg:col-span-4 h-full">
          <ExplainablePanel />
        </div>
      </div>
    </div>
  );
}
