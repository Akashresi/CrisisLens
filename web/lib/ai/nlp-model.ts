import type { NLPFeatures } from "@/types";

/**
 * Small Natural Language Processing (NLP) Model
 * Lightweight specialized parser for emergency texts, voice audio transcripts, and citizen distress reports.
 * Extracts named entities, urgency level, critical resource needs, and victim quantities.
 */
export function analyzeTextualData(text: string): NLPFeatures {
  const t = text.toLowerCase();
  
  const extractedEntities: string[] = [];
  const criticalNeeds: string[] = [];
  let reportedVictimsCount = 1;
  let medicalUrgency = false;
  let urgencyTier: NLPFeatures["urgencyTier"] = "MEDIUM";
  let distressScore = 0.5;

  // Victim Count Extraction
  const numbersMatch = t.match(/(\d+)\s*(people|persons|family|members|kids|children|elderly|adults)/i);
  if (numbersMatch) {
    reportedVictimsCount = parseInt(numbersMatch[1], 10) || 1;
  } else if (t.includes("family")) {
    reportedVictimsCount = 4;
  }

  // Critical Needs Extraction
  if (t.includes("boat") || t.includes("dinghy") || t.includes("raft") || t.includes("stranded") || t.includes("water rising")) {
    criticalNeeds.push("EVACUATION_BOAT");
  }
  if (t.includes("insulin") || t.includes("oxygen") || t.includes("pregnant") || t.includes("heart") || t.includes("bleeding") || t.includes("injured") || t.includes("doctor")) {
    criticalNeeds.push("MEDICAL_EVACUATION", "INSULIN_MEDICATION");
    medicalUrgency = true;
    urgencyTier = "LIFE_THREATENING";
    distressScore = 0.95;
  }
  if (t.includes("food") || t.includes("eating") || t.includes("hunger") || t.includes("ration")) {
    criticalNeeds.push("FOOD_RATIONS");
  }
  if (t.includes("water") || t.includes("drinking") || t.includes("thirst")) {
    criticalNeeds.push("CLEAN_DRINKING_WATER");
  }
  if (t.includes("elderly") || t.includes("baby") || t.includes("infant") || t.includes("disabled") || t.includes("wheelchair")) {
    criticalNeeds.push("SPECIALIZED_CARE_TRANSPORT");
    distressScore = Math.max(distressScore, 0.88);
  }

  // Location / Landmark Entities
  const places = ["anna nagar", "velachery", "tambaram", "mudichur", "adyar", "saidapet", "porur", "perambur", "koyambedu", "guindy"];
  places.forEach((p) => {
    if (t.includes(p)) {
      extractedEntities.push(p.toUpperCase());
    }
  });

  if (t.includes("emergency") || t.includes("help us") || t.includes("save us") || t.includes("submerged") || t.includes("drowning")) {
    urgencyTier = urgencyTier === "LIFE_THREATENING" ? "LIFE_THREATENING" : "HIGH";
    distressScore = Math.max(distressScore, 0.85);
  }

  let sentimentSummary = "Urgent citizen assistance request with high distress markers.";
  if (urgencyTier === "LIFE_THREATENING") {
    sentimentSummary = "CRITICAL: Immediate life-safety emergency detected with specialized medical/rescue requirements.";
  } else if (criticalNeeds.length === 0) {
    sentimentSummary = "Moderate distress report requesting situational guidance and monitoring.";
  }

  return {
    urgencyTier,
    extractedEntities,
    criticalNeeds: criticalNeeds.length > 0 ? criticalNeeds : ["GENERAL_RELIEF_AID"],
    reportedVictimsCount,
    medicalUrgency,
    distressScore,
    confidence: text.length > 15 ? 0.91 : 0.74,
    sentimentSummary,
    extractedAt: new Date().toISOString(),
  };
}
