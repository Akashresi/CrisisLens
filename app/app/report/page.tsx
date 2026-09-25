"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Video, Mic, MapPin, Upload, CheckCircle2, AlertTriangle, Send } from "lucide-react";
import { useCitizenApp } from "@/lib/store";

export default function ReportPage() {
  const router = useRouter();
  const { userLocation, fetchGPSLocation, submitSOS } = useCitizenApp();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [disasterType, setDisasterType] = useState<"FLOOD" | "MEDICAL_EMERGENCY" | "STRUCTURAL_COLLAPSE" | "FIRE" | "ROAD_BLOCKED">("FLOOD");
  const [description, setDescription] = useState("");
  const [mediaType, setMediaType] = useState<"NONE" | "IMAGE" | "VIDEO" | "AUDIO">("IMAGE");
  const [previewUrl, setPreviewUrl] = useState<string>("https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=60");
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const samplePhotos = [
    { label: "Flooded House / Terrace", url: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=60" },
    { label: "Medical Trauma Ward", url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=60" },
    { label: "Collapsed Wall / Road", url: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=60" },
  ];

  const handleVoiceToggle = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setMediaType("AUDIO");
      setTimeout(() => {
        setIsRecordingVoice(false);
        setDescription((prev) =>
          prev ? `${prev} [Voice Note]: Water level reached terrace stairs. Need food and medical rescue immediately.` : "Voice Note: Water level reached terrace stairs. Need food and medical rescue immediately."
        );
      }, 3500);
    } else {
      setIsRecordingVoice(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;

    setIsSubmitting(true);
    const loc = userLocation || (await fetchGPSLocation());

    await submitSOS({
      name: name || "Field Citizen",
      phone: phone || "+91 98401 22910",
      disasterType,
      description,
      mediaType,
      mediaUrl: previewUrl,
      location: loc,
      strandedPeople: 3,
      hasMedicalEmergency: description.toLowerCase().includes("medical") || description.toLowerCase().includes("insulin"),
      requiresBoat: description.toLowerCase().includes("boat") || disasterType === "FLOOD",
    });

    setIsSubmitting(false);
    router.push("/sos-status");
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1">
        <h1 className="text-lg font-black text-white tracking-tight">Multimodal Disaster Incident Report</h1>
        <p className="text-xs text-slate-400">
          Upload photo/video evidence or record voice note for the 3-Model AI Fusion engine.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 1. Media Type Selector */}
        <div className="rounded-xl border border-white/10 bg-navy-950/60 p-3.5 space-y-2.5">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 block">
            1. Attach Visual / Voice Media:
          </span>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setMediaType("IMAGE")}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                mediaType === "IMAGE"
                  ? "border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold"
                  : "border-white/10 bg-black/20 text-slate-400"
              }`}
            >
              <Camera className="h-5 w-5 mb-1" />
              <span className="text-[11px] font-mono">Photo (CV)</span>
            </button>

            <button
              type="button"
              onClick={() => setMediaType("VIDEO")}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                mediaType === "VIDEO"
                  ? "border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold"
                  : "border-white/10 bg-black/20 text-slate-400"
              }`}
            >
              <Video className="h-5 w-5 mb-1" />
              <span className="text-[11px] font-mono">Video (CV)</span>
            </button>

            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                isRecordingVoice
                  ? "border-red-500 bg-red-950/60 text-red-300 font-bold animate-pulse"
                  : mediaType === "AUDIO"
                  ? "border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold"
                  : "border-white/10 bg-black/20 text-slate-400"
              }`}
            >
              <Mic className="h-5 w-5 mb-1" />
              <span className="text-[11px] font-mono">
                {isRecordingVoice ? "Recording..." : "Voice (NLP)"}
              </span>
            </button>
          </div>

          {/* Sample Photo Pickers for demonstration */}
          {mediaType === "IMAGE" && (
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-[10px] font-mono text-slate-400 block">
                Select Photo from Camera / Gallery:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {samplePhotos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPreviewUrl(photo.url)}
                    className={`relative rounded-lg overflow-hidden border aspect-square ${
                      previewUrl === photo.url ? "border-cyan-400 ring-2 ring-cyan-400" : "border-white/10 opacity-60"
                    }`}
                  >
                    <img src={photo.url} alt={photo.label} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. Text Description */}
        <div className="rounded-xl border border-white/10 bg-navy-950/60 p-3.5 space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 block">
            2. Describe Situation & Urgent Needs:
          </span>
          <textarea
            rows={3}
            required
            placeholder="E.g. Water is 5 feet high, 4 people trapped on roof including infant, need evacuation boat and drinking water..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-navy-900 p-2.5 font-sans text-xs text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* 3. Contact Details */}
        <div className="rounded-xl border border-white/10 bg-navy-950/60 p-3.5 space-y-2.5">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 block">
            3. Reporter Contact:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-white/10 bg-navy-900 px-3 py-2 text-xs font-mono text-slate-200 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-lg border border-white/10 bg-navy-900 px-3 py-2 text-xs font-mono text-slate-200 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !description}
          className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 p-3.5 font-mono text-xs font-bold text-white shadow-xl hover:scale-102 transition-transform disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          <span>{isSubmitting ? "Ingesting into 3-Model Fusion AI..." : "Submit Incident Report"}</span>
        </button>
      </form>
    </div>
  );
}
