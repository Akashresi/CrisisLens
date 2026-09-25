export * from "./incident";

export interface ResourceUnit {
  id: string;
  name: string;
  kind: "RESCUE_BOAT" | "AMBULANCE" | "FIRE_TRUCK" | "NDRF_TEAM" | "HELICOPTER" | "HIGH_POWER_PUMP";
  status: "AVAILABLE" | "DEPLOYED" | "EN_ROUTE" | "MAINTENANCE";
  location: { lat: number; lng: number; address: string };
  capacity: number;
  assignedIncidentId?: string;
}

export interface EvacuationShelter {
  id: string;
  name: string;
  location: { lat: number; lng: number; address: string };
  totalCapacity: number;
  occupied: number;
  hasMedicalPost: boolean;
  hasFoodRations: boolean;
  contactNumber: string;
  status: "OPEN" | "NEAR_CAPACITY" | "FULL" | "CLOSED";
}

export interface WeatherTelemetry {
  zone: string;
  rainfallMm: number;
  windSpeedKmh: number;
  trend: "RISING" | "STABLE" | "RECEDING";
  warningLevel: "GREEN" | "YELLOW" | "ORANGE" | "RED";
}
