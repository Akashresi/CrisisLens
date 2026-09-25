export type DisasterCategory =
  | "FLOOD"
  | "CYCLONE"
  | "LANDSLIDE"
  | "EARTHQUAKE"
  | "STRUCTURAL_COLLAPSE"
  | "FIRE"
  | "MEDICAL_EMERGENCY";

export type SeverityLevel = "MINOR" | "MODERATE" | "SEVERE" | "CRITICAL";
export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type IncidentStatus =
  | "REPORTED"
  | "AI_ANALYZED"
  | "HUMAN_VERIFIED"
  | "DISPATCHED"
  | "EN_ROUTE"
  | "RESCUED"
  | "RESOLVED";

export interface GeoLocation {
  lat: number;
  lng: number;
  address?: string;
  zone?: string;
  elevationMeters?: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  confidence: number;
}

export interface CVFeatures {
  detectedObjects: string[];
  damageType: string;
  visualSeverity: SeverityLevel;
  inundationDepthMeters: number;
  strandedCount: number;
  structuralDamagePct: number;
  boundingBoxes: BoundingBox[];
  confidence: number;
  extractedAt: string;
}

export interface NLPFeatures {
  urgencyTier: "LOW" | "MEDIUM" | "HIGH" | "LIFE_THREATENING";
  extractedEntities: string[];
  criticalNeeds: string[];
  reportedVictimsCount: number;
  medicalUrgency: boolean;
  distressScore: number; // 0..1
  confidence: number;
  sentimentSummary: string;
  extractedAt: string;
}

export interface GISFeatures {
  zone: string;
  topographicElevationMeters: number;
  rainfallMmPerHour: number;
  riverGaugeLevelMeters: number;
  historicalVulnerability: number; // 0..1
  nearestHospital: {
    id: string;
    name: string;
    distanceKm: number;
    availableBeds: number;
    accessRoadClear: boolean;
  };
  nearestShelter: {
    id: string;
    name: string;
    distanceKm: number;
    spacesAvailable: number;
  };
  roadNetworkStatus: "OPEN" | "CAUTION" | "BLOCKED" | "FLOODED";
  confidence: number;
  analyzedAt: string;
}

export interface FusedIncident {
  id: string;
  trackingNumber: string;
  title: string;
  category: DisasterCategory;
  location: GeoLocation;
  timestamp: string;
  status: IncidentStatus;
  
  // Multimodal Raw Inputs
  mediaUrls: {
    imageUrl?: string;
    videoUrl?: string;
    audioUrl?: string;
  };
  rawText: string;
  sourceType: "CITIZEN_APP" | "SATELLITE" | "TRAFFIC_CCTV" | "FIELD_TEAM" | "OFFICIAL_DISPATCH";
  sourceReporter?: {
    name: string;
    phone: string;
    isVerifiedVolunteer: boolean;
  };

  // 3-Model Extracted Features
  cvFeatures: CVFeatures;
  nlpFeatures: NLPFeatures;
  gisFeatures: GISFeatures;

  // Unified Fusion Outputs
  fusionScore: number; // 0..100
  overallConfidence: number; // 0..1
  isUncertain: boolean;
  uncertaintyReasons: string[];
  crossModalConsistency: "HIGH" | "MODERATE" | "CONFLICT_DETECTED";

  // Dynamic Priority Scoring
  priorityScore: number; // 0..100
  priorityLevel: PriorityLevel;
  priorityDrivers: string[];

  // Explainable AI Indicators
  explainability: {
    visualEvidence: string[];
    textualEvidence: string[];
    spatialEvidence: string[];
    decisionRationale: string;
  };

  // Response Guidance
  responsePlan?: {
    assignedResources: Array<{
      id: string;
      kind: string;
      quantity: number;
      unitLabel: string;
    }>;
    evacuationRoute: {
      routeLabel: string;
      etaMinutes: number;
      floodRiskPct: number;
      safeWaypoints: GeoLocation[];
    };
    recommendedAction: string;
  };

  // Human in the Loop Control
  humanReview?: {
    required: boolean;
    reviewedBy?: string;
    reviewedAt?: string;
    overrideApplied?: boolean;
    reviewerNotes?: string;
  };
}

export interface CitizenSOSRequest {
  id: string;
  trackingCode: string;
  name: string;
  phone: string;
  location: GeoLocation;
  disasterType: DisasterCategory;
  description: string;
  mediaType: "NONE" | "IMAGE" | "VIDEO" | "AUDIO";
  mediaUrl?: string;
  strandedPeople: number;
  hasMedicalEmergency: boolean;
  requiresBoat: boolean;
  submittedAt: string;
  status: IncidentStatus;
  priorityScore?: number;
  assignedTeam?: string;
  estimatedRescueEta?: string;
}
