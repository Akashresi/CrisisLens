"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, ShieldCheck, UserCheck, Eye, MessageSquareText } from "lucide-react";
import { useCrisis } from "@/lib/store/store";
import { PriorityBadge, SeverityBadge, SourceBadge } from "@/components/common/Badges";

export default function HumanReviewPage() {
  const { incidents, verifyHumanReview } = useCrisis();
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const pendingReviews = incidents.filter((i) => i.isUncertain);
  const verifiedReviews = incidents.filter((i) => !i.isUncertain && i.humanReview?.reviewedBy);

  const active = incidents.find((i) => i.id === selectedIncidentId) || pendingReviews[0] || incidents[0];

  const handleSignOff = (id: string) => {
    verifyHumanReview(id, notes || "Authorized human verification completed after field check.");
    setNotes("");
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1500px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold font-mono uppercase tracking-wider text-white">
              Human Control & Uncertainty Verification Desk
            </h1>
            <span className="rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 font-mono text-xs font-bold">
              {pendingReviews.length} Pending Sign-Off
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Decision-support safety protocol: Cases with low model confidence (&lt;75%) or conflicting intelligence require authorized human command sign-off.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Queue (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Verification Queue ({pendingReviews.length})
          </span>

          <div className="space-y-2">
            {pendingReviews.length === 0 ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 text-center space-y-2">
                <ShieldCheck className="h-8 w-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-300">All Predictions Verified</h4>
                <p className="text-xs text-slate-400 font-mono">
                  All active incidents currently exceed confidence safety margins and have verified ground-truth.
                </p>
              </div>
            ) : (
              pendingReviews.map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncidentId(inc.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    inc.id === active?.id
                      ? "border-amber-400 bg-amber-950/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                      : "border-white/10 bg-navy-900/60 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400">{inc.id}</span>
                    <PriorityBadge level={inc.priorityLevel} score={inc.priorityScore} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{inc.title}</h4>
                  <div className="text-[11px] font-mono text-amber-300 bg-amber-500/10 p-1.5 rounded border border-amber-500/20">
                    ⚠ {inc.uncertaintyReasons[0]}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Selected Incident Review Workspace (8 cols) */}
        {active && (
          <div className="lg:col-span-8 rounded-xl border border-white/10 bg-navy-900/80 p-5 space-y-5">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm font-bold text-cyan-400">{active.id}</span>
                  <SourceBadge source={active.sourceType} />
                  <span className="font-mono text-xs text-slate-400">Confidence: {(active.overallConfidence * 100).toFixed(0)}%</span>
                </div>
                <h2 className="text-base font-bold text-white mt-1">{active.title}</h2>
              </div>
              <PriorityBadge level={active.priorityLevel} score={active.priorityScore} />
            </div>

            {/* Evidence & Modalities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="font-mono text-xs text-blue-400 font-bold flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>Visual Evidence:</span>
                </span>
                {active.mediaUrls.imageUrl ? (
                  <img src={active.mediaUrls.imageUrl} alt="Visual Feed" className="rounded-lg border border-white/10 h-44 w-full object-cover" />
                ) : (
                  <div className="h-44 rounded-lg border border-white/10 bg-black/30 flex items-center justify-center text-xs text-slate-500 font-mono">
                    No visual media attached
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-emerald-400 font-bold flex items-center space-x-1">
                  <MessageSquareText className="h-4 w-4" />
                  <span>Report Narrative:</span>
                </span>
                <div className="h-44 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-slate-300 overflow-y-auto space-y-2">
                  <p className="italic">"{active.rawText}"</p>
                  <div className="pt-2 border-t border-white/10 space-y-1 font-mono text-[11px]">
                    <div>• Reporter: <span className="text-slate-200">{active.sourceReporter?.name || "Citizen SOS"}</span></div>
                    <div>• Phone: <span className="text-cyan-300">{active.sourceReporter?.phone || "Private"}</span></div>
                    <div>• Extracted Demands: <span className="text-emerald-300">{active.nlpFeatures.criticalNeeds.join(", ")}</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign-Off Action Box */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-3">
              <div className="flex items-center space-x-2 text-amber-300 font-bold text-sm font-mono">
                <UserCheck className="h-5 w-5 text-amber-400" />
                <span>Authorize Decision & Unlock Full Automated Dispatch</span>
              </div>
              <textarea
                rows={2}
                placeholder="Enter commander ground-truth notes (e.g., 'Spoke with field officer on site, confirmed 4 persons stranded, priority validated')..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-navy-950 p-2.5 font-mono text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
              />
              <button
                onClick={() => handleSignOff(active.id)}
                className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-lg hover:scale-102 transition-transform"
              >
                Sign Off & Authorize Ground Truth Dispatch
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
