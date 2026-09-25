import type { CVFeatures, NLPFeatures, GISFeatures, PriorityLevel } from "@/types";

/**
 * Explainable AI (XAI) Engine
 * Generates transparent visual, textual, and spatial evidence rationales so emergency responders
 * understand exactly WHY the model calculated the given priority score.
 */
export function generateExplainableRationale(input: {
  cvFeatures: CVFeatures;
  nlpFeatures: NLPFeatures;
  gisFeatures: GISFeatures;
  priorityScore: number;
  priorityLevel: PriorityLevel;
}): {
  visualEvidence: string[];
  textualEvidence: string[];
  spatialEvidence: string[];
  decisionRationale: string;
} {
  const visualEvidence: string[] = [];
  const textualEvidence: string[] = [];
  const spatialEvidence: string[] = [];

  // 1. Visual Indicators
  if (input.cvFeatures.boundingBoxes.length > 0) {
    input.cvFeatures.boundingBoxes.forEach((b) => {
      visualEvidence.push(`${b.label} (confidence ${(b.confidence * 100).toFixed(0)}%)`);
    });
  }
  if (input.cvFeatures.inundationDepthMeters > 1.0) {
    visualEvidence.push(`Estimated floodwater level: ${input.cvFeatures.inundationDepthMeters}m above street datum`);
  }

  // 2. Textual Indicators
  if (input.nlpFeatures.extractedEntities.length > 0) {
    textualEvidence.push(`Extracted geographic landmarks: ${input.nlpFeatures.extractedEntities.join(", ")}`);
  }
  if (input.nlpFeatures.criticalNeeds.length > 0) {
    textualEvidence.push(`Explicit emergency demands: ${input.nlpFeatures.criticalNeeds.join(", ")}`);
  }
  if (input.nlpFeatures.medicalUrgency) {
    textualEvidence.push("NLP detected high-distress medical keywords (emergency/patient/insulin)");
  }

  // 3. Spatial GIS Indicators
  spatialEvidence.push(`Zone: ${input.gisFeatures.zone} (Precipitation: ${input.gisFeatures.rainfallMmPerHour} mm/hr)`);
  spatialEvidence.push(`Topographic DEM Elevation: ${input.gisFeatures.topographicElevationMeters}m MSL (Catchment Vulnerability: ${(input.gisFeatures.historicalVulnerability * 100).toFixed(0)}%)`);
  spatialEvidence.push(`Road network: ${input.gisFeatures.roadNetworkStatus}`);

  const rationale = `Calculated ${input.priorityLevel} priority (${input.priorityScore}/100) combining CV visual severity (${input.cvFeatures.visualSeverity}, ${input.cvFeatures.strandedCount} stranded), NLP urgency tier (${input.nlpFeatures.urgencyTier}), and GIS catchment basin risk in ${input.gisFeatures.zone}.`;

  return {
    visualEvidence,
    textualEvidence,
    spatialEvidence,
    decisionRationale: rationale,
  };
}
