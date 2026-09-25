"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, Video, Mic, MapPin, Upload, CheckCircle2, AlertTriangle, Send, Volume2, X, Navigation, Radio, Sparkles } from "lucide-react";
import { useCitizenApp } from "@/lib/store";

export default function ReportPage() {
  const router = useRouter();
  const { userLocation, fetchGPSLocation, submitSOS, language, t, speak } = useCitizenApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [disasterType, setDisasterType] = useState<"FLOOD" | "MEDICAL_EMERGENCY" | "STRUCTURAL_COLLAPSE" | "ROAD_BLOCKED">("FLOOD");
  const [description, setDescription] = useState("");
  const [mediaType, setMediaType] = useState<"NONE" | "IMAGE" | "VIDEO" | "AUDIO">("IMAGE");
  const [previewUrl, setPreviewUrl] = useState<string>("https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=60");
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gpsRefreshing, setGpsRefreshing] = useState(false);

  const samplePhotos = [
    {
      label: language === "ta" ? "வீடு வெள்ளம்" : "Flooded House",
      url: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=60",
      icon: "🌊",
    },
    {
      label: language === "ta" ? "மருத்துவ உதவி" : "Medical Trauma",
      url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=60",
      icon: "🚑",
    },
    {
      label: language === "ta" ? "இடிந்த பாதை" : "Collapsed Road",
      url: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=60",
      icon: "🏚️",
    },
  ];

  const quickChips = [
    { text: language === "ta" ? "தண்ணீர் 4 அடி உயரம்" : "Water level 4+ feet high", icon: "🌊" },
    { text: language === "ta" ? "கூரை மேல் சிக்கியுள்ளனர்" : "Trapped on terrace / rooftop", icon: "🏚️" },
    { text: language === "ta" ? "முதியவர் / நோயாளி உள்ளார்" : "Elderly / Infant medical emergency", icon: "🚑" },
    { text: language === "ta" ? "மீட்பு படகு தேவை" : "Evacuation boat urgently needed", icon: "🛥️" },
    { text: language === "ta" ? "உணவு & குடிநீர் இல்லை" : "Need food & drinking water", icon: "🍛" },
  ];

  // Handle Image Upload / Camera
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setMediaType("IMAGE");
      speak(language === "ta" ? "படம் இணைக்கப்பட்டது" : "Photo attached");
    }
  };

  // Handle Video Upload / Recording
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setMediaType("VIDEO");
      speak(language === "ta" ? "வீடியோ இணைக்கப்பட்டது" : "Video attached");
    }
  };

  const handleVoiceToggle = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      speak(t.listening);
      setTimeout(() => {
        setIsRecordingVoice(false);
        const voiceText =
          language === "ta"
            ? "தண்ணீர் கூரை வரை வந்துவிட்டது. 4 பேர் சிக்கியுள்ளோம், படகு மற்றும் உணவு அனுப்பவும்."
            : language === "hi"
            ? "पानी छत तक पहुंच गया है। 4 लोग फंसे हैं, कृपया नाव और भोजन भेजें।"
            : language === "te"
            ? "నీరు పైకప్పు వరకు వచ్చింది. 4 మంది చిక్కుకున్నారు, పడవ పంపండి."
            : "Water level reached terrace. 4 people trapped, please dispatch rescue boat and food.";
        
        setDescription((prev) => (prev ? `${prev} • ${voiceText}` : voiceText));
        speak(voiceText);
      }, 3500);
    } else {
      setIsRecordingVoice(false);
    }
  };

  const handleRefreshLocation = async () => {
    setGpsRefreshing(true);
    await fetchGPSLocation();
    setGpsRefreshing(false);
    speak(language === "ta" ? "இருப்பிடம் புதுப்பிக்கப்பட்டது" : "GIS GPS location updated");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loc = userLocation || (await fetchGPSLocation());

    const finalDescription = description || (
      language === "ta"
        ? "வெள்ளம் மற்றும் அவசர உதவி கோரிக்கை."
        : "Emergency disaster rescue request with photo/video evidence."
    );

    await submitSOS({
      name: name || "Field Citizen",
      phone: phone || "+91 98401 22910",
      disasterType,
      description: finalDescription,
      mediaType,
      mediaUrl: previewUrl,
      location: loc,
      strandedPeople: 3,
      hasMedicalEmergency: finalDescription.toLowerCase().includes("medical") || finalDescription.toLowerCase().includes("மருத்துவ"),
      requiresBoat: finalDescription.toLowerCase().includes("boat") || disasterType === "FLOOD",
    });

    setIsSubmitting(false);
    router.push("/sos-status");
  };

  return (
    <div className="p-3 space-y-4">
      {/* Hidden File Inputs for Direct Camera & Video */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageFileChange}
        className="hidden"
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        capture="environment"
        onChange={handleVideoFileChange}
        className="hidden"
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-black text-white tracking-tight flex items-center space-x-2">
            <span>📷</span>
            <span>{language === "ta" ? "படம் / வீடியோ மற்றும் விவரம்" : "Photo, Video & Incident Report"}</span>
          </h1>
          <p className="text-xs text-slate-400">
            {language === "ta"
              ? "படம்/வீடியோ எடுத்து அனுப்பினால் கண்காணிப்புக் குழுவிற்கு உடனடி GIS இருப்பிடம் செல்லும்."
              : "Upload photo/video and text. GIS automatically transmits your exact location to monitors."}
          </p>
        </div>
        <button onClick={() => speak(t.speakInstruction)} className="text-amber-300 p-1.5 rounded-lg bg-white/5 shrink-0">
          <Volume2 className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 1. PHOTO & VIDEO CAPTURE ACTIONS */}
        <div className="rounded-2xl border-2 border-white/10 bg-navy-950/80 p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center space-x-1.5">
              <span>1. {language === "ta" ? "படம் அல்லது வீடியோ எடுக்கவும்:" : "Attach Photo or Video:"}</span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400 font-bold">AI CV Model</span>
          </div>

          {/* Big Action Buttons for Camera & Video */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl border-2 border-cyan-500/50 bg-cyan-950/40 hover:bg-cyan-950/60 active:scale-95 transition-all text-cyan-200"
            >
              <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center text-black font-black mb-1 shadow-lg">
                <Camera className="h-5 w-5" />
              </div>
              <span className="text-xs font-black">{language === "ta" ? "படம் எடுக்க" : "Take Photo"}</span>
              <span className="text-[9px] text-cyan-300 opacity-80">Camera / Gallery</span>
            </button>

            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl border-2 border-purple-500/50 bg-purple-950/40 hover:bg-purple-950/60 active:scale-95 transition-all text-purple-200"
            >
              <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-black mb-1 shadow-lg">
                <Video className="h-5 w-5" />
              </div>
              <span className="text-xs font-black">{language === "ta" ? "வீடியோ எடுக்க" : "Record Video"}</span>
              <span className="text-[9px] text-purple-300 opacity-80">Video Clip / Cam</span>
            </button>
          </div>

          {/* Live Media Preview Card */}
          {previewUrl && (
            <div className="relative rounded-xl overflow-hidden border-2 border-cyan-400 bg-black aspect-video flex items-center justify-center">
              {mediaType === "VIDEO" ? (
                <video src={previewUrl} controls className="h-full w-full object-cover" />
              ) : (
                <img src={previewUrl} alt="Incident Preview" className="h-full w-full object-cover" />
              )}
              <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 text-[10px] font-mono text-cyan-300 font-bold flex items-center space-x-1">
                <Sparkles className="h-3 w-3 text-cyan-400" />
                <span>{mediaType === "VIDEO" ? "VIDEO ATTACHED" : "PHOTO ATTACHED"}</span>
              </div>
            </div>
          )}

          {/* Sample Preset Photos if camera unavailable */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold text-slate-400 block">
              {language === "ta" ? "அல்லது மாதிரி புகைப்படத்தைத் தேர்ந்தெடுக்கவும்:" : "Or select sample disaster scenario:"}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {samplePhotos.map((photo, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPreviewUrl(photo.url);
                    setMediaType("IMAGE");
                    speak(photo.label);
                  }}
                  className={`relative rounded-xl overflow-hidden border-2 aspect-square flex flex-col items-center justify-end p-1 transition-all ${
                    previewUrl === photo.url ? "border-cyan-400 ring-2 ring-cyan-400 scale-102" : "border-white/10 opacity-70"
                  }`}
                >
                  <img src={photo.url} alt={photo.label} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="relative z-10 text-[10px] font-black text-white text-center leading-tight">
                    {photo.icon} {photo.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. TEXT INPUT & VOICE SPEECH-TO-TEXT */}
        <div className="rounded-2xl border-2 border-white/10 bg-navy-950/80 p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-200">
              2. {language === "ta" ? "நிலைமையை விவரிக்கவும் (விருப்பம்):" : "Describe the Situation (Text):"}
            </span>
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`flex items-center space-x-1 rounded-full px-2.5 py-0.5 text-xs font-bold transition-all border ${
                isRecordingVoice
                  ? "bg-red-600 text-white border-red-400 animate-pulse"
                  : "bg-amber-500/20 text-amber-300 border-amber-500/40"
              }`}
            >
              <Mic className="h-3.5 w-3.5" />
              <span>{isRecordingVoice ? "Listening..." : "🎙️ Voice"}</span>
            </button>
          </div>

          <textarea
            rows={3}
            placeholder={
              language === "ta"
                ? "எ.கா: தண்ணீர் 4 அடி உயர்ந்துவிட்டது, 3 பேர் கூரையில் தவிக்கிறோம், படகு தேவை..."
                : "E.g., Water is 4 feet high, 3 people trapped on roof, need evacuation boat..."
            }
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-navy-900 p-3 font-sans text-xs text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
          />

          {/* Quick Suggestion Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDescription((prev) => (prev ? `${prev}, ${chip.text}` : chip.text));
                  speak(chip.text);
                }}
                className="flex items-center space-x-1 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white hover:border-cyan-400 active:scale-95 transition-all"
              >
                <span>{chip.icon}</span>
                <span>{chip.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. GIS LOCATION TRANSMISSION WIDGET */}
        <div className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-navy-950 via-navy-900 to-emerald-950/30 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-300 flex items-center space-x-1.5">
              <Radio className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
              <span>3. GIS Spatial Telemetry (Auto-Attached)</span>
            </span>
            <button
              type="button"
              onClick={handleRefreshLocation}
              disabled={gpsRefreshing}
              className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 rounded active:scale-95"
            >
              {gpsRefreshing ? "Locating..." : "📍 Refresh GPS"}
            </button>
          </div>

          {/* GIS Coordinates & Address Card */}
          <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 space-y-1 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">GPS Pin:</span>
              <span className="text-cyan-400 font-bold">
                {userLocation ? `${userLocation.lat.toFixed(4)}° N, ${userLocation.lng.toFixed(4)}° E` : "13.0827° N, 80.2707° E"}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">DEM Elevation:</span>
              <span className="text-emerald-400 font-bold">14.2m MSL (Low-Lying Basin)</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-300 pt-1 border-t border-white/5">
              <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
              <span className="text-[11px] truncate">{userLocation?.address || "Anna Nagar West, Chennai (Auto-Detected)"}</span>
            </div>
          </div>
        </div>

        {/* Giant 1-Tap Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 p-4 font-black text-sm text-white shadow-[0_0_35px_rgba(244,63,94,0.6)] active:scale-95 transition-transform disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
          <span>
            {isSubmitting
              ? language === "ta"
                ? "கண்காணிப்புக் குழுவிற்கு அனுப்பப்படுகிறது..."
                : "Transmitting Media & GIS to Monitor Team..."
              : language === "ta"
              ? "புகைப்படம், வீடியோ & GIS இருப்பிடத்தை அனுப்புக"
              : "Post Photo, Video & Transmit GIS Location"}
          </span>
        </button>
      </form>
    </div>
  );
}
