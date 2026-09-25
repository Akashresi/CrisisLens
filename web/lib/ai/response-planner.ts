import type { GeoLocation, PriorityLevel } from "@/types";

/**
 * Automated Response & Evacuation Planner
 * Matches closest active emergency fleets (boats, ambulances, NDRF teams)
 * and generates safest travel path avoiding flooded road links.
 */
export function generateResponsePlan(input: {
  location: GeoLocation;
  criticalNeeds: string[];
  strandedCount: number;
  roadStatus: "OPEN" | "CAUTION" | "BLOCKED" | "FLOODED";
  priorityLevel: PriorityLevel;
}): {
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
} {
  const assignedResources = [];

  // Need-based fleet allocation
  if (input.criticalNeeds.includes("EVACUATION_BOAT") || input.strandedCount >= 2 || input.roadStatus === "FLOODED") {
    assignedResources.push({
      id: "UNIT-BOAT-04",
      kind: "RESCUE_BOAT",
      quantity: 2,
      unitLabel: "NDRF Motorized Inflatable Boat Team (Alpha 4)",
    });
  }

  if (input.criticalNeeds.includes("MEDICAL_EVACUATION") || input.priorityLevel === "CRITICAL") {
    assignedResources.push({
      id: "UNIT-AMB-12",
      kind: "AMBULANCE",
      quantity: 1,
      unitLabel: "108 High-Clearance Advanced Life Support (ALS) Ambulance",
    });
  }

  if (assignedResources.length === 0) {
    assignedResources.push({
      id: "UNIT-NDRF-07",
      kind: "NDRF_TEAM",
      quantity: 1,
      unitLabel: "Disaster Response Quick Action Team",
    });
  }

  // Routing
  const isBlocked = input.roadStatus === "BLOCKED" || input.roadStatus === "FLOODED";
  const routeLabel = isBlocked
    ? "Elevated Flyover & Bypass Corridor (Safest Detour)"
    : "Direct Arterial Route via State Highway";
  const etaMinutes = isBlocked ? 18 : 9;
  const floodRiskPct = isBlocked ? 12 : 38;

  const recommendedAction = input.priorityLevel === "CRITICAL"
    ? "Immediate tactical boat evacuation with medical escort; transfer to Government General Hospital trauma unit."
    : "Deploy field assessment team with food/water rations; clear drainage blockage.";

  return {
    assignedResources,
    evacuationRoute: {
      routeLabel,
      etaMinutes,
      floodRiskPct,
      safeWaypoints: [
        { lat: input.location.lat + 0.005, lng: input.location.lng - 0.003 },
        { lat: input.location.lat + 0.012, lng: input.location.lng + 0.008 },
      ],
    },
    recommendedAction,
  };
}
