import type { FusedIncident, ResourceUnit, EvacuationShelter, WeatherTelemetry } from "@/types";
import { fuseMultimodalDisasterData } from "@/lib/ai/feature-fusion";

export const INITIAL_WEATHER: WeatherTelemetry[] = [
  { zone: "Zone A - Central Basin", rainfallMm: 45, windSpeedKmh: 55, trend: "RISING", warningLevel: "ORANGE" },
  { zone: "Zone B - Koyambedu & Cooum Corridor", rainfallMm: 78, windSpeedKmh: 68, trend: "RISING", warningLevel: "RED" },
  { zone: "Zone C - Velachery & Marsh", rainfallMm: 84, windSpeedKmh: 72, trend: "RISING", warningLevel: "RED" },
  { zone: "Zone D - Tambaram Basin", rainfallMm: 65, windSpeedKmh: 50, trend: "STABLE", warningLevel: "ORANGE" },
];

export const INITIAL_RESOURCES: ResourceUnit[] = [
  {
    id: "UNIT-BOAT-01",
    name: "NDRF Motorized Boat Team Alpha",
    kind: "RESCUE_BOAT",
    status: "DEPLOYED",
    location: { lat: 13.0108, lng: 80.2572, address: "Adyar River Estuary" },
    capacity: 12,
    assignedIncidentId: "INC-1001",
  },
  {
    id: "UNIT-BOAT-02",
    name: "Coast Guard Gemini Boat Bravo",
    kind: "RESCUE_BOAT",
    status: "AVAILABLE",
    location: { lat: 13.0827, lng: 80.2707, address: "Harbor Base Station" },
    capacity: 10,
  },
  {
    id: "UNIT-AMB-01",
    name: "ALS Critical Care Unit 108-A",
    kind: "AMBULANCE",
    status: "DEPLOYED",
    location: { lat: 13.052, lng: 80.23, address: "Teynampet Junction" },
    capacity: 2,
    assignedIncidentId: "INC-1003",
  },
  {
    id: "UNIT-AMB-02",
    name: "High-Clearance All-Terrain Ambulance",
    kind: "AMBULANCE",
    status: "AVAILABLE",
    location: { lat: 13.0067, lng: 80.202, address: "Guindy Disaster Depot" },
    capacity: 3,
  },
  {
    id: "UNIT-NDRF-01",
    name: "NDRF 4th Battalion Quick Reaction",
    kind: "NDRF_TEAM",
    status: "DEPLOYED",
    location: { lat: 12.98, lng: 80.22, address: "Velachery Sector 5" },
    capacity: 25,
    assignedIncidentId: "INC-1002",
  },
  {
    id: "UNIT-PUMP-01",
    name: "Heavy Duty 5000L/min Submersible Pump",
    kind: "HIGH_POWER_PUMP",
    status: "AVAILABLE",
    location: { lat: 13.08, lng: 80.21, address: "Anna Nagar Waterworks" },
    capacity: 5000,
  },
];

export const INITIAL_SHELTERS: EvacuationShelter[] = [
  {
    id: "SHELTER-01",
    name: "Jawaharlal Nehru Indoor Stadium Relief Camp",
    location: { lat: 13.085, lng: 80.275, address: "Periamet, Central Chennai" },
    totalCapacity: 1200,
    occupied: 680,
    hasMedicalPost: true,
    hasFoodRations: true,
    contactNumber: "044-25619200",
    status: "OPEN",
  },
  {
    id: "SHELTER-02",
    name: "Velachery Higher Secondary School Shelter",
    location: { lat: 12.975, lng: 80.225, address: "Velachery Main Road" },
    totalCapacity: 600,
    occupied: 540,
    hasMedicalPost: true,
    hasFoodRations: true,
    contactNumber: "044-22441010",
    status: "NEAR_CAPACITY",
  },
  {
    id: "SHELTER-03",
    name: "Tambaram Community Hall Camp",
    location: { lat: 12.925, lng: 80.125, address: "GST Road, Tambaram" },
    totalCapacity: 450,
    occupied: 180,
    hasMedicalPost: false,
    hasFoodRations: true,
    contactNumber: "044-22265050",
    status: "OPEN",
  },
];

export const RAW_DEMO_INCIDENTS = [
  {
    id: "INC-1001",
    trackingNumber: "SOS-849201",
    title: "Stranded Family with Infant on Flooded Rooftop",
    category: "FLOOD" as const,
    rawText: "Water level is above 7 feet. 4 adults, 1 elderly person and 6-month baby trapped on 2nd floor terrace in Anna Nagar West. Ground floor completely submerged. Need emergency rescue boat immediately before nightfall!",
    mediaUrls: {
      imageUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=60",
    },
    location: { lat: 13.085, lng: 80.215, address: "14th Main Rd, Anna Nagar West" },
    sourceType: "CITIZEN_APP" as const,
    reporter: { name: "Ramesh Kannan", phone: "+91 98401 22910", isVerifiedVolunteer: false },
  },
  {
    id: "INC-1002",
    trackingNumber: "SOS-729104",
    title: "Critical Diabetic Patient - Insulin Depleted in Submerged Ward",
    category: "MEDICAL_EMERGENCY" as const,
    rawText: "Urgent medical emergency! Elderly grandmother is in diabetic shock. Insulin supply ruined by flood water. Need medical team and ambulance or boat evacuation to General Hospital ASAP. Oxygen level dropping.",
    mediaUrls: {
      imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=60",
    },
    location: { lat: 12.978, lng: 80.222, address: "Tansi Nagar 5th Street, Velachery" },
    sourceType: "CITIZEN_APP" as const,
    reporter: { name: "Dr. Sangeetha Priya", phone: "+91 94440 18823", isVerifiedVolunteer: true },
  },
  {
    id: "INC-1003",
    trackingNumber: "SOS-910283",
    title: "Partial Commercial Building Wall Collapse & Live Wire Hazard",
    category: "STRUCTURAL_COLLAPSE" as const,
    rawText: "Heavy rain has caused structural wall collapse on market street. Concrete pillar sheared. High voltage transformer sparked and fallen into floodwater. 3 people injured by falling debris.",
    mediaUrls: {
      imageUrl: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=60",
    },
    location: { lat: 13.038, lng: 80.245, address: "South Usman Road, T. Nagar" },
    sourceType: "TRAFFIC_CCTV" as const,
    reporter: { name: "Chennai City Traffic Surveillance", phone: "103", isVerifiedVolunteer: true },
  },
  {
    id: "INC-1004",
    trackingNumber: "SOS-410928",
    title: "GST Highway Underpass Inundation - 4 Vehicles Submerged",
    category: "FLOOD" as const,
    rawText: "Underpass water level is 5.5 feet. 2 cars and 1 auto-rickshaw stuck in strong water current. Drivers evacuated to roof of vehicles. Traffic completely blocked on main evacuation corridor.",
    mediaUrls: {
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=60",
    },
    location: { lat: 12.955, lng: 80.145, address: "GST Road Subway, Tambaram" },
    sourceType: "FIELD_TEAM" as const,
    reporter: { name: "SDRF Inspector Arul", phone: "+91 94422 71000", isVerifiedVolunteer: true },
  },
  {
    id: "INC-1005",
    trackingNumber: "SOS-629184",
    title: "Satellite SAR Inundation Breach in Adyar Catchment",
    category: "FLOOD" as const,
    rawText: "Synthetic Aperture Radar (SAR) multispectral satellite pass detected 120m riverbank breach near Kotturpuram low-lying settlement. Projected inundation surge of 1.2m across 400 households within 2 hours.",
    mediaUrls: {
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
    },
    location: { lat: 13.018, lng: 80.242, address: "Kotturpuram Riverbank Basin" },
    sourceType: "SATELLITE" as const,
    reporter: { name: "NRSC ISRO Flood Monitoring Cell", phone: "DISASTER_FEED", isVerifiedVolunteer: true },
  },
];

export function generateInitialFusedIncidents(): FusedIncident[] {
  return RAW_DEMO_INCIDENTS.map((raw) =>
    fuseMultimodalDisasterData({
      id: raw.id,
      trackingNumber: raw.trackingNumber,
      title: raw.title,
      category: raw.category,
      rawText: raw.rawText,
      mediaUrls: raw.mediaUrls,
      location: raw.location,
      sourceType: raw.sourceType,
      reporter: raw.reporter,
    })
  );
}
