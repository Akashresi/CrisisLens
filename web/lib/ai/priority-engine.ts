import type { CVFeatures, NLPFeatures, GISFeatures, PriorityLevel } from "@/types";

/**
 * Dynamic Priority Calculation Engine
 * Formula:
 *   Priority = (Severity × Exposure × Vulnerability) / (Accessibility × Resource Factor)
 * Incorporates:
 *   - Severity: visual flood depth & collapse scale (CV)
 *   - Exposure: stranded population count & life-threatening medical urgency (NLP)
 *   - Vulnerability: low-lying elevation & rainfall rate mm/hr (GIS)
 *   - Accessibility: road status (open vs flooded)
 */
export function calculatePriority(input: {
  cvFeatures: CVFeatures;
  nlpFeatures: NLPFeatures;
  gisFeatures: GISFeatures;
}): {
  priorityScore: number;
  priorityLevel: PriorityLevel;
  priorityDrivers: string[];
} {
  const drivers: string[] = [];

  // 1. Severity Multiplier (0..35)
  let severityScore = 15;
  if (input.cvFeatures.visualSeverity === "CRITICAL") {
    severityScore = 35;
    drivers.push(`Critical visual damage: ${input.cvFeatures.damageType.replace(/_/g, " ")}`);
  } else if (input.cvFeatures.visualSeverity === "SEVERE") {
    severityScore = 26;
    drivers.push("High inundation / structural shearing detected");
  } else if (input.cvFeatures.visualSeverity === "MODERATE") {
    severityScore = 18;
  }

  // 2. Exposure Multiplier (0..30)
  let exposureScore = 10;
  const victims = Math.max(input.cvFeatures.strandedCount, input.nlpFeatures.reportedVictimsCount);
  if (victims >= 5) {
    exposureScore += 15;
    drivers.push(`High victim density (${victims} people trapped)`);
  } else if (victims >= 2) {
    exposureScore += 8;
    drivers.push(`${victims} people stranded`);
  }

  if (input.nlpFeatures.medicalUrgency) {
    exposureScore += 10;
    drivers.push("Urgent medical/insulin/trauma requirement");
  }

  // 3. Vulnerability Multiplier (0..20)
  let vulnerabilityScore = 10;
  if (input.gisFeatures.topographicElevationMeters < 3.5) {
    vulnerabilityScore += 6;
    drivers.push(`Low-lying flood basin (${input.gisFeatures.topographicElevationMeters}m DEM elevation)`);
  }
  if (input.gisFeatures.rainfallMmPerHour >= 60) {
    vulnerabilityScore += 4;
    drivers.push(`Severe torrential rainfall (${input.gisFeatures.rainfallMmPerHour} mm/hr)`);
  }

  // 4. Accessibility Impedance Multiplier (0..15)
  let accessibilityImpedance = 5;
  if (input.gisFeatures.roadNetworkStatus === "BLOCKED" || input.gisFeatures.roadNetworkStatus === "FLOODED") {
    accessibilityImpedance = 15;
    drivers.push("Primary access road severed / inaccessible");
  }

  const rawScore = severityScore + exposureScore + vulnerabilityScore + accessibilityImpedance;
  const clampedScore = Math.min(100, Math.max(10, Math.round(rawScore)));

  let priorityLevel: PriorityLevel = "LOW";
  if (clampedScore >= 75) {
    priorityLevel = "CRITICAL";
  } else if (clampedScore >= 55) {
    priorityLevel = "HIGH";
  } else if (clampedScore >= 30) {
    priorityLevel = "MEDIUM";
  }

  return {
    priorityScore: clampedScore,
    priorityLevel,
    priorityDrivers: drivers,
  };
}
