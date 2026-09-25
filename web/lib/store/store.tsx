"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { FusedIncident, ResourceUnit, EvacuationShelter, WeatherTelemetry, CitizenSOSRequest } from "@/types";
import { generateInitialFusedIncidents, INITIAL_RESOURCES, INITIAL_SHELTERS, INITIAL_WEATHER } from "@/data/demo/initial-data";
import { fuseMultimodalDisasterData } from "@/lib/ai/feature-fusion";
import { runWhatIfSimulation, ScenarioMutation, SimulationResult } from "@/lib/ai/scenario-simulator";

interface CrisisContextType {
  incidents: FusedIncident[];
  resources: ResourceUnit[];
  shelters: EvacuationShelter[];
  weather: WeatherTelemetry[];
  selectedIncidentId: string | null;
  activeSimulation: SimulationResult | null;
  filterPriority: string;
  filterStatus: string;
  searchQuery: string;
  setSelectedIncidentId: (id: string | null) => void;
  setFilterPriority: (priority: string) => void;
  setFilterStatus: (status: string) => void;
  setSearchQuery: (query: string) => void;
  addCitizenReport: (report: CitizenSOSRequest) => FusedIncident;
  updateIncidentStatus: (id: string, newStatus: FusedIncident["status"]) => void;
  verifyHumanReview: (id: string, notes: string) => void;
  executeSimulation: (mutation: ScenarioMutation) => SimulationResult;
  clearSimulation: () => void;
  dispatchResource: (resourceId: string, incidentId: string) => void;
  releaseResource: (resourceId: string) => void;
}

const CrisisContext = createContext<CrisisContextType | undefined>(undefined);

export function CrisisProvider({ children }: { children: React.ReactNode }) {
  const [incidents, setIncidents] = useState<FusedIncident[]>([]);
  const [resources, setResources] = useState<ResourceUnit[]>(INITIAL_RESOURCES);
  const [shelters] = useState<EvacuationShelter[]>(INITIAL_SHELTERS);
  const [weather] = useState<WeatherTelemetry[]>(INITIAL_WEATHER);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [activeSimulation, setActiveSimulation] = useState<SimulationResult | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Initialize initial fused incidents
    const initial = generateInitialFusedIncidents();
    setIncidents(initial);
    if (initial.length > 0) {
      setSelectedIncidentId(initial[0].id);
    }
  }, []);

  const addCitizenReport = useCallback((report: CitizenSOSRequest): FusedIncident => {
    const fused = fuseMultimodalDisasterData({
      trackingNumber: report.trackingCode,
      title: `${report.disasterType} SOS: ${report.description.slice(0, 45)}...`,
      category: report.disasterType,
      rawText: report.description,
      mediaUrls: {
        imageUrl: report.mediaType === "IMAGE" ? report.mediaUrl : undefined,
        videoUrl: report.mediaType === "VIDEO" ? report.mediaUrl : undefined,
        audioUrl: report.mediaType === "AUDIO" ? report.mediaUrl : undefined,
      },
      location: report.location,
      sourceType: "CITIZEN_APP",
      reporter: {
        name: report.name,
        phone: report.phone,
        isVerifiedVolunteer: false,
      },
    });

    setIncidents((prev) => [fused, ...prev]);
    setSelectedIncidentId(fused.id);
    return fused;
  }, []);

  const updateIncidentStatus = useCallback((id: string, newStatus: FusedIncident["status"]) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: newStatus } : inc))
    );
  }, []);

  const verifyHumanReview = useCallback((id: string, notes: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === id) {
          return {
            ...inc,
            status: "HUMAN_VERIFIED",
            isUncertain: false,
            humanReview: {
              required: false,
              reviewedBy: "Incident Commander (Authorized)",
              reviewedAt: new Date().toISOString(),
              overrideApplied: true,
              reviewerNotes: notes,
            },
          };
        }
        return inc;
      })
    );
  }, []);

  const executeSimulation = useCallback(
    (mutation: ScenarioMutation): SimulationResult => {
      const result = runWhatIfSimulation(incidents, mutation);
      setActiveSimulation(result);
      return result;
    },
    [incidents]
  );

  const clearSimulation = useCallback(() => {
    setActiveSimulation(null);
  }, []);

  const dispatchResource = useCallback((resourceId: string, incidentId: string) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === resourceId ? { ...r, status: "DEPLOYED", assignedIncidentId: incidentId } : r
      )
    );
    updateIncidentStatus(incidentId, "DISPATCHED");
  }, [updateIncidentStatus]);

  const releaseResource = useCallback((resourceId: string) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === resourceId ? { ...r, status: "AVAILABLE", assignedIncidentId: undefined } : r
      )
    );
  }, []);

  return (
    <CrisisContext.Provider
      value={{
        incidents,
        resources,
        shelters,
        weather,
        selectedIncidentId,
        activeSimulation,
        filterPriority,
        filterStatus,
        searchQuery,
        setSelectedIncidentId,
        setFilterPriority,
        setFilterStatus,
        setSearchQuery,
        addCitizenReport,
        updateIncidentStatus,
        verifyHumanReview,
        executeSimulation,
        clearSimulation,
        dispatchResource,
        releaseResource,
      }}
    >
      {children}
    </CrisisContext.Provider>
  );
}

export function useCrisis() {
  const context = useContext(CrisisContext);
  if (!context) {
    throw new Error("useCrisis must be used within a CrisisProvider");
  }
  return context;
}
