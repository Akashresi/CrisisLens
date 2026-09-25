"use client";

import React, { useEffect, useRef } from "react";
import type { FusedIncident, ResourceUnit, EvacuationShelter } from "@/types";

export interface MapCanvasProps {
  incidents: FusedIncident[];
  resources: ResourceUnit[];
  shelters: EvacuationShelter[];
  selectedIncidentId?: string | null;
  onSelectIncident?: (id: string) => void;
  layers?: {
    incidents: boolean;
    resources: boolean;
    shelters: boolean;
    floodZones: boolean;
  };
}

export default function MapCanvas({
  incidents,
  resources,
  shelters,
  selectedIncidentId,
  onSelectIncident,
  layers = { incidents: true, resources: true, shelters: true, floodZones: true },
}: MapCanvasProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    let isMounted = true;

    async function initLeaflet() {
      const L = (await import("leaflet")).default;

      if (!isMounted || !mapRef.current) return;

      if (!leafletMap.current) {
        leafletMap.current = L.map(mapRef.current, {
          center: [13.04, 80.22],
          zoom: 12,
          zoomControl: false,
        });

        // Light Command Center CartoDB Voyager Basemap
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          {
            attribution: '&copy; <a href="https://carto.com/">CARTO</a> OpenStreetMap',
            maxZoom: 19,
            subdomains: "abcd",
          }
        ).addTo(leafletMap.current);

        L.control.zoom({ position: "bottomright" }).addTo(leafletMap.current);
      }

      const map = leafletMap.current;

      // Clear non-tile layers
      map.eachLayer((layer: any) => {
        if (!layer._url) {
          map.removeLayer(layer);
        }
      });

      // 1. Flood Risk Corridors (Polygons)
      if (layers.floodZones) {
        const floodPolygons = [
          // Velachery Marsh Basin
          [
            [12.96, 80.20],
            [12.99, 80.20],
            [12.99, 80.24],
            [12.96, 80.24],
          ],
          // Cooum River Basin Corridor
          [
            [13.06, 80.18],
            [13.08, 80.22],
            [13.07, 80.28],
            [13.05, 80.27],
            [13.05, 80.18],
          ],
        ];

        floodPolygons.forEach((poly) => {
          L.polygon(poly as any, {
            color: "#f43f5e",
            fillColor: "#f43f5e",
            fillOpacity: 0.15,
            weight: 1.5,
            dashArray: "4, 4",
          }).addTo(map);
        });
      }

      // 2. Incident Markers
      if (layers.incidents) {
        incidents.forEach((inc) => {
          const isSelected = inc.id === selectedIncidentId;
          const isCrit = inc.priorityLevel === "CRITICAL";
          const isHigh = inc.priorityLevel === "HIGH";

          const color = isCrit ? "#f43f5e" : isHigh ? "#fb7185" : "#f59e0b";

          const iconHtml = `
            <div style="
              width: ${isSelected ? "34px" : "28px"};
              height: ${isSelected ? "34px" : "28px"};
              background-color: ${color};
              border: 2px solid #ffffff;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffff;
              font-family: monospace;
              font-weight: bold;
              font-size: ${isSelected ? "12px" : "10px"};
              box-shadow: 0 0 15px ${color};
              cursor: pointer;
              transform: ${isSelected ? "scale(1.2)" : "scale(1)"};
              transition: all 0.2s ease;
            ">
              ${inc.priorityScore}
            </div>
          `;

          const customIcon = L.divIcon({
            html: iconHtml,
            className: "custom-incident-marker",
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });

          const marker = L.marker([inc.location.lat, inc.location.lng], { icon: customIcon }).addTo(map);

          marker.on("click", () => {
            onSelectIncident?.(inc.id);
          });

          marker.bindTooltip(
            `<b>${inc.id}: ${inc.title}</b><br/><span style="color:${color}">Priority: ${inc.priorityLevel} (${inc.priorityScore}/100)</span><br/>Victims: ${inc.nlpFeatures.reportedVictimsCount}`,
            { direction: "top", offset: [0, -15], className: "dark-tooltip" }
          );
        });
      }

      // 3. Emergency Resources
      if (layers.resources) {
        resources.forEach((res) => {
          const iconHtml = `
            <div style="
              width: 22px;
              height: 22px;
              background-color: #06b6d4;
              border: 1.5px solid #ffffff;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffff;
              font-size: 10px;
              box-shadow: 0 0 10px #06b6d4;
            ">
              ⚓
            </div>
          `;

          const customIcon = L.divIcon({
            html: iconHtml,
            className: "custom-resource-marker",
            iconSize: [22, 22],
            iconAnchor: [11, 11],
          });

          const marker = L.marker([res.location.lat, res.location.lng], { icon: customIcon }).addTo(map);
          marker.bindTooltip(`<b>${res.name}</b><br/>Status: ${res.status}<br/>Capacity: ${res.capacity}`, {
            direction: "top",
          });
        });
      }

      // 4. Shelters
      if (layers.shelters) {
        shelters.forEach((sh) => {
          const iconHtml = `
            <div style="
              width: 22px;
              height: 22px;
              background-color: #8b5cf6;
              border: 1.5px solid #ffffff;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffff;
              font-size: 10px;
              box-shadow: 0 0 10px #8b5cf6;
            ">
              ⛺
            </div>
          `;

          const customIcon = L.divIcon({
            html: iconHtml,
            className: "custom-shelter-marker",
            iconSize: [22, 22],
            iconAnchor: [11, 11],
          });

          const marker = L.marker([sh.location.lat, sh.location.lng], { icon: customIcon }).addTo(map);
          marker.bindTooltip(`<b>${sh.name}</b><br/>Occupied: ${sh.occupied}/${sh.totalCapacity}`, {
            direction: "top",
          });
        });
      }
    }

    initLeaflet();

    return () => {
      isMounted = false;
    };
  }, [incidents, resources, shelters, selectedIncidentId, layers, onSelectIncident]);

  return <div ref={mapRef} className="h-full w-full min-h-[450px]" />;
}
