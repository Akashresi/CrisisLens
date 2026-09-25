import type { CVFeatures, NLPFeatures, GISFeatures, FusedIncident, DisasterCategory, GeoLocation } from "@/types";
import { analyzeVisualData } from "./cv-model";
import { analyzeTextualData } from "./nlp-model";
import { analyzeSpatialGIS } from "./gis-engine";
import { calculatePriority } from "./priority-engine";
import { generateExplainableRationale } from "./explainable-ai";
import { evaluateUncertainty } from "./uncertainty-guard";
import { generateResponsePlan } from "./response-planner";

/**
 * Lightweight Multi-Model Feature Fusion Layer
 * Combines outputs from Small CV Model, Small NLP Model, and GIS Engine.
 * Cross-validates features across modalities to detect contradictions,
 * computes overall uncertainty, and produces the final actionable decision vector.
 */
export function fuseMultimodalDisasterData(input: {
  id?: string;
  trackingNumber?: string;
  title?: string;
  category?: DisasterCategory;
  rawText: string;
  mediaUrls?: {
    imageUrl?: string;
    videoUrl?: string;
    audioUrl?: string;
  };
  location: GeoLocation;
  sourceType: FusedIncident["sourceType"];
  reporter?: FusedIncident["sourceReporter"];
}): FusedIncident {
  const incidentId = input.id || `INC-${Math.floor(1000 + Math.random() * 9000)}`;
  const trackingNumber = input.trackingNumber || `SOS-${Math.floor(100000 + Math.random() * 900000)}`;

  // 1. Run Small CV Model
  const cvFeatures: CVFeatures = analyzeVisualData({
    imageUrl: input.mediaUrls?.imageUrl,
    videoUrl: input.mediaUrls?.videoUrl,
    sourceType: input.sourceType,
    manualHints: input.rawText,
  });

  // 2. Run Small NLP Model
  const nlpFeatures: NLPFeatures = analyzeTextualData(input.rawText);

  // 3. Run GIS Spatial Engine
  const gisFeatures: GISFeatures = analyzeSpatialGIS(input.location);

  // 4. Feature Fusion & Cross-Modal Consistency Check
  let crossModalConsistency: FusedIncident["crossModalConsistency"] = "HIGH";
  const uncertaintyReasons: string[] = [];

  // Check if text claims collapse but CV sees only minor water
  if (nlpFeatures.urgencyTier === "LIFE_THREATENING" && cvFeatures.visualSeverity === "MINOR") {
    crossModalConsistency = "CONFLICT_DETECTED";
    uncertaintyReasons.push("Visual severity indicates minor water, but text reports life-threatening urgency.");
  }

  // Check if GIS says safe road but CV detects blocked vehicle
  if (gisFeatures.roadNetworkStatus === "OPEN" && cvFeatures.damageType === "ROAD_BLOCKED") {
    crossModalConsistency = "MODERATE";
    uncertaintyReasons.push("Road network database reports OPEN status, but CV detects fresh blockage.");
  }

  // Calculate Weighted Fusion Confidence
  const overallConfidence = Number(
    (cvFeatures.confidence * 0.35 + nlpFeatures.confidence * 0.35 + gisFeatures.confidence * 0.30).toFixed(2)
  );

  // 5. Evaluate Uncertainty & Human Verification Requirement
  const uncertaintyCheck = evaluateUncertainty({
    overallConfidence,
    crossModalConsistency,
    medicalUrgency: nlpFeatures.medicalUrgency,
    strandedCount: Math.max(cvFeatures.strandedCount, nlpFeatures.reportedVictimsCount),
  });

  // 6. Calculate Dynamic Priority Score
  const priorityResult = calculatePriority({
    cvFeatures,
    nlpFeatures,
    gisFeatures,
  });

  // 7. Generate Explainable Visual & Contextual Rationale
  const explainability = generateExplainableRationale({
    cvFeatures,
    nlpFeatures,
    gisFeatures,
    priorityScore: priorityResult.priorityScore,
    priorityLevel: priorityResult.priorityLevel,
  });

  // 8. Generate Automated Response & Evacuation Plan
  const responsePlan = generateResponsePlan({
    location: input.location,
    criticalNeeds: nlpFeatures.criticalNeeds,
    strandedCount: Math.max(cvFeatures.strandedCount, nlpFeatures.reportedVictimsCount),
    roadStatus: gisFeatures.roadNetworkStatus,
    priorityLevel: priorityResult.priorityLevel,
  });

  return {
    id: incidentId,
    trackingNumber,
    title: input.title || `${cvFeatures.damageType.replace(/_/g, " ")} in ${gisFeatures.zone}`,
    category: input.category || (cvFeatures.damageType === "STRUCTURAL_COLLAPSE" ? "STRUCTURAL_COLLAPSE" : "FLOOD"),
    location: {
      ...input.location,
      zone: gisFeatures.zone,
      elevationMeters: gisFeatures.topographicElevationMeters,
    },
    timestamp: new Date().toISOString(),
    status: uncertaintyCheck.isUncertain ? "REPORTED" : "AI_ANALYZED",
    mediaUrls: input.mediaUrls || {},
    rawText: input.rawText,
    sourceType: input.sourceType,
    sourceReporter: input.reporter,
    cvFeatures,
    nlpFeatures,
    gisFeatures,
    fusionScore: Math.round(overallConfidence * 100),
    overallConfidence,
    isUncertain: uncertaintyCheck.isUncertain,
    uncertaintyReasons: [...uncertaintyReasons, ...uncertaintyCheck.reasons],
    crossModalConsistency,
    priorityScore: priorityResult.priorityScore,
    priorityLevel: priorityResult.priorityLevel,
    priorityDrivers: priorityResult.priorityDrivers,
    explainability,
    responsePlan,
    humanReview: {
      required: uncertaintyCheck.isUncertain,
    },
  };
}
