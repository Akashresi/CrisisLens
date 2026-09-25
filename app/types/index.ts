export type DisasterType =
  | "FLOOD"
  | "MEDICAL_EMERGENCY"
  | "STRUCTURAL_COLLAPSE"
  | "FIRE"
  | "ROAD_BLOCKED";

export interface SOSSubmission {
  id: string;
  trackingCode: string;
  name: string;
  phone: string;
  disasterType: DisasterType;
  description: string;
  mediaType: "NONE" | "IMAGE" | "VIDEO" | "AUDIO";
  mediaUrl?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  strandedPeople: number;
  hasMedicalEmergency: boolean;
  requiresBoat: boolean;
  submittedAt: string;
  status: "SUBMITTED" | "AI_ANALYZED" | "DISPATCHED" | "EN_ROUTE" | "RESOLVED";
  priorityScore?: number;
  priorityLevel?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  assignedTeam?: string;
  estimatedEtaMinutes?: number;
}

export interface ShelterInfo {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  totalCapacity: number;
  occupied: number;
  hasMedical: boolean;
  hasFood: boolean;
  phone: string;
  status: "OPEN" | "NEAR_CAPACITY" | "FULL";
}
