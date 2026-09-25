/**
 * Uncertainty & Human-In-The-Loop Safety Guard
 * Identifies low-confidence predictions, contradictory multi-source reports, or severe life-safety edge cases
 * that MUST be signed off by an authorized human dispatcher.
 */
export function evaluateUncertainty(input: {
  overallConfidence: number;
  crossModalConsistency: "HIGH" | "MODERATE" | "CONFLICT_DETECTED";
  medicalUrgency: boolean;
  strandedCount: number;
}): {
  isUncertain: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];
  let isUncertain = false;

  // 1. Low Model Confidence Threshold (< 75%)
  if (input.overallConfidence < 0.75) {
    isUncertain = true;
    reasons.push(`Low multimodal confidence (${(input.overallConfidence * 100).toFixed(0)}% < 75% safety threshold). Requires human ground-truth confirmation.`);
  }

  // 2. Cross-Modal Conflict Detected
  if (input.crossModalConsistency === "CONFLICT_DETECTED") {
    isUncertain = true;
    reasons.push("Contradictory intelligence between visual detection and text description requires human disambiguation.");
  }

  // 3. High-Stakes Edge Case
  if (input.strandedCount >= 8) {
    isUncertain = true;
    reasons.push(`Mass casualty / large stranded cluster (${input.strandedCount} persons) mandates senior incident commander sign-off.`);
  }

  return {
    isUncertain,
    reasons,
  };
}
