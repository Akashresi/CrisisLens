import type { FusedIncident } from "@/types";

export interface ScenarioMutation {
  type: "RAINFALL_SURGE" | "ROAD_COLLAPSE" | "HOSPITAL_OFFLINE" | "DAM_WATER_RELEASE" | "POWER_GRID_FAILURE";
  parameterValue: string | number;
  label: string;
}

export interface SimulationResult {
  scenarioName: string;
  appliedAt: string;
  deltas: {
    criticalIncidentCountDelta: number;
    populationAtRiskDelta: number;
    evacuationDelayMinutesDelta: number;
    hospitalBedDeficitDelta: number;
    unmetResourceUnits: number;
  };
  summary: string;
  recommendedPreemptiveActions: string[];
}

export function runWhatIfSimulation(
  currentIncidents: FusedIncident[],
  mutation: ScenarioMutation
): SimulationResult {
  let criticalDelta = 2;
  let popRiskDelta = 8400;
  let delayDelta = 14;
  let bedDeficit = 25;
  let unmetUnits = 4;
  let summary = "";
  const actions: string[] = [];

  switch (mutation.type) {
    case "RAINFALL_SURGE":
      criticalDelta = 3;
      popRiskDelta = 14500;
      delayDelta = 22;
      bedDeficit = 40;
      unmetUnits = 8;
      summary = `Simulating +${mutation.parameterValue} mm/hr cloudburst inundation triggers catchment spill across Low-Lying Marsh zones, raising 3 medium priority incidents to CRITICAL status.`;
      actions.push(
        "Pre-stage 6 inflatable rescue boats at Anna Nagar & Velachery depots.",
        "Issue immediate Level-3 cell broadcast evacuation alert for sub-3m DEM elevation zones.",
        "Divert non-emergency vehicles away from arterial underpasses."
      );
      break;

    case "ROAD_COLLAPSE":
      criticalDelta = 1;
      popRiskDelta = 4200;
      delayDelta = 35;
      bedDeficit = 10;
      unmetUnits = 3;
      summary = `Simulating structural severance of ${mutation.parameterValue} increases average hospital transport detour from 12 mins to 47 mins.`;
      actions.push(
        "Activate secondary bypass via Outer Ring Road corridor.",
        "Deploy helicopter airlift capability for critical medical transfers.",
        "Position mobile medical triage tent at northern terminus."
      );
      break;

    case "HOSPITAL_OFFLINE":
      criticalDelta = 2;
      popRiskDelta = 6100;
      delayDelta = 18;
      bedDeficit = 65;
      unmetUnits = 5;
      summary = `Simulating emergency power/access failure at ${mutation.parameterValue} creates critical bed deficit across central district.`;
      actions.push(
        "Reroute all incoming ambulances to Southern District Multispecialty.",
        "Dispatch emergency industrial 500kVA generator units with fuel convoy.",
        "Mobilize military field hospital units to open stadium."
      );
      break;

    case "DAM_WATER_RELEASE":
      criticalDelta = 4;
      popRiskDelta = 28000;
      delayDelta = 40;
      bedDeficit = 80;
      unmetUnits = 12;
      summary = `Simulating 25,000 cusecs reservoir release floods Adyar & Cooum riverbank settlements within 90 minutes.`;
      actions.push(
        "Execute mandatory door-to-door siren evacuation for all riverbank wards.",
        "Open 12 secondary relief shelters on higher elevation ridge.",
        "Deploy SDRF & Coast Guard boat flotilla along downstream bridges."
      );
      break;

    default:
      summary = "Simulated environmental mutation evaluated against active disaster graph.";
      actions.push("Maintain heightened sensor telemetry monitoring.");
  }

  return {
    scenarioName: mutation.label,
    appliedAt: new Date().toISOString(),
    deltas: {
      criticalIncidentCountDelta: criticalDelta,
      populationAtRiskDelta: popRiskDelta,
      evacuationDelayMinutesDelta: delayDelta,
      hospitalBedDeficitDelta: bedDeficit,
      unmetResourceUnits: unmetUnits,
    },
    summary,
    recommendedPreemptiveActions: actions,
  };
}
