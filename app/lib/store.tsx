"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { SOSSubmission, ShelterInfo } from "@/types";

interface CitizenAppContextType {
  activeSOS: SOSSubmission | null;
  sosHistory: SOSSubmission[];
  userLocation: { lat: number; lng: number; address: string } | null;
  submitSOS: (data: Omit<SOSSubmission, "id" | "trackingCode" | "submittedAt" | "status">) => Promise<SOSSubmission>;
  fetchGPSLocation: () => Promise<{ lat: number; lng: number; address: string }>;
  shelters: ShelterInfo[];
}

const DEFAULT_SHELTERS: ShelterInfo[] = [
  {
    id: "SHELTER-01",
    name: "Jawaharlal Nehru Indoor Stadium Camp",
    address: "Periamet, Central Chennai",
    distanceKm: 1.8,
    totalCapacity: 1200,
    occupied: 680,
    hasMedical: true,
    hasFood: true,
    phone: "044-25619200",
    status: "OPEN",
  },
  {
    id: "SHELTER-02",
    name: "Velachery Higher Secondary School Shelter",
    address: "Velachery Main Road, Chennai",
    distanceKm: 3.2,
    totalCapacity: 600,
    occupied: 540,
    hasMedical: true,
    hasFood: true,
    phone: "044-22441010",
    status: "NEAR_CAPACITY",
  },
  {
    id: "SHELTER-03",
    name: "Tambaram Community Hall Camp",
    address: "GST Road, Tambaram",
    distanceKm: 5.4,
    totalCapacity: 450,
    occupied: 180,
    hasMedical: false,
    hasFood: true,
    phone: "044-22265050",
    status: "OPEN",
  },
];

const CitizenAppContext = createContext<CitizenAppContextType | undefined>(undefined);

export function CitizenAppProvider({ children }: { children: React.ReactNode }) {
  const [activeSOS, setActiveSOS] = useState<SOSSubmission | null>(null);
  const [sosHistory, setSosHistory] = useState<SOSSubmission[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; address: string } | null>({
    lat: 13.0827,
    lng: 80.2707,
    address: "Anna Nagar West, Chennai (Auto-Detected GPS)",
  });
  const [shelters] = useState<ShelterInfo[]>(DEFAULT_SHELTERS);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem("crisislens_active_sos");
      if (saved) {
        setActiveSOS(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const fetchGPSLocation = async () => {
    return new Promise<{ lat: number; lng: number; address: string }>((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const loc = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              address: `GPS Pin: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
            };
            setUserLocation(loc);
            resolve(loc);
          },
          () => {
            const fallback = {
              lat: 13.0827,
              lng: 80.2707,
              address: "Anna Nagar West (Simulated GPS)",
            };
            setUserLocation(fallback);
            resolve(fallback);
          }
        );
      } else {
        const fallback = {
          lat: 13.0827,
          lng: 80.2707,
          address: "Chennai Central Basin",
        };
        setUserLocation(fallback);
        resolve(fallback);
      }
    });
  };

  const submitSOS = async (
    data: Omit<SOSSubmission, "id" | "trackingCode" | "submittedAt" | "status">
  ): Promise<SOSSubmission> => {
    const trackingCode = `SOS-${Math.floor(100000 + Math.random() * 900000)}`;
    const submission: SOSSubmission = {
      ...data,
      id: `REQ-${Date.now()}`,
      trackingCode,
      submittedAt: new Date().toISOString(),
      status: "AI_ANALYZED",
      priorityLevel: data.hasMedicalEmergency || data.strandedPeople >= 4 ? "CRITICAL" : "HIGH",
      priorityScore: data.hasMedicalEmergency ? 92 : data.strandedPeople >= 4 ? 88 : 74,
      assignedTeam: data.requiresBoat ? "NDRF Boat Team Alpha 4" : "108 Emergency Ambulance Unit 12",
      estimatedEtaMinutes: 14,
    };

    // Try posting to web monitor API if available
    try {
      await fetch("http://localhost:3000/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
    } catch (e) {
      // Offline fallback
    }

    setActiveSOS(submission);
    setSosHistory((prev) => [submission, ...prev]);

    try {
      localStorage.setItem("crisislens_active_sos", JSON.stringify(submission));
    } catch (e) {}

    return submission;
  };

  return (
    <CitizenAppContext.Provider
      value={{
        activeSOS,
        sosHistory,
        userLocation,
        submitSOS,
        fetchGPSLocation,
        shelters,
      }}
    >
      {children}
    </CitizenAppContext.Provider>
  );
}

export function useCitizenApp() {
  const context = useContext(CitizenAppContext);
  if (!context) {
    throw new Error("useCitizenApp must be used within a CitizenAppProvider");
  }
  return context;
}
