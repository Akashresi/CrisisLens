"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Video, Mic, MapPin, Upload, CheckCircle2, AlertTriangle, Send, Volume2 } from "lucide-react";
import { useCitizenApp } from "@/lib/store";

export default function ReportPage() {
  const router = useRouter();
  const { userLocation, fetchGPSLocation, submitSOS, language, t, speak } = useCitizenApp();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [disasterType, setDisasterType] = useState<"FLOOD" | "MEDICAL_EMERGENCY" | "STRUCTURAL_COLLAPSE" | "FIRE" | "ROAD_BLOCKED">("FLOOD");
  const [description, setDescription] = useState(
    language === "ta"
      ? "வெள்ளம் கூரை வரை வந்துவிட்டது. உடனடி படகு மற்றும் உணவு தேவை."
      : language === "hi"
      ? "पानी छत तक पहुंच गया है। तुरंत नाव और भोजन की जरूरत है।"
      : language === "te"
      ? "వరద నీరు పైకప్పు వరకు వచ్చింది. వెంటనే పడవ మరియు ఆహారం కావాలి."
      : "Water reached rooftop level. Need evacuation boat and food immediately."
  );
  const [mediaType, setMediaType] = useState<"NONE" | "IMAGE" | "VIDEO" | "AUDIO">("IMAGE");
  const [previewUrl, setPreviewUrl] = useState<string>("https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=60");
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleVoiceToggle = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      speak(t.listening);
      setTimeout(() => {
        setIsRecordingVoice(false);
        const voiceText =
          language === "ta"
            ? "[குரல் பதிவு]: தண்ணீர் மிக அதிகமாக உள்ளது, 4 பேர் தவிக்கிறோம். படகு அனுப்பவும்."
            : language === "hi"
            ? "[आवाज संदेश]: पानी बहुत गहरा है, 4 लोग फंसे हैं। कृपया नाव भेजें।"
            : language === "te"
            ? "[వాయిస్ మెసేజ్]: నీరు చాలా లోతుగా ఉంది, 4 మంది చిక్కుకున్నారు. దయచేసి పడవ పంపండి."
            : "[Voice Note]: Water level is severe, 4 people trapped. Please dispatch boat rescue.";
        setDescription(voiceText);
        setMediaType("AUDIO");
        speak(voiceText);
      }, 3500);
    } else {
      setIsRecordingVoice(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      hasMedicalEmergency: description.toLowerCase().includes("medical") || description.toLowerCase().includes("மருத்துவ"),
      requiresBoat: true,
    });

    setIsSubmitting(false);
    router.push("/sos-status");
  };

  return (
    <div className="p-3 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-black text-white tracking-tight flex items-center space-x-2">
            <span>📷</span>
            <span>{t.snapPhoto}</span>
          </h1>
          <p className="text-xs text-slate-400">{t.speakInstruction}</p>
        </div>
        <button onClick={() => speak(t.speakInstruction)} className="text-amber-300 p-1.5 rounded-lg bg-white/5">
          <Volume2 className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* 1. Giant Voice Mic Record Button */}
        <div className="rounded-2xl border-2 border-amber-500/50 bg-gradient-to-r from-amber-950/40 via-navy-950 to-amber-950/30 p-3.5">
          <button
            type="button"
            onClick={handleVoiceToggle}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
              isRecordingVoice
                ? "bg-red-600 text-white border-red-400 animate-pulse ring-4 ring-red-500/50"
                : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border-amber-500/40"
            }`}
          >
            <div className="flex items-center space-x-3 text-left">
              <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-black font-black shadow-lg">
                <Mic className="h-6 w-6" />
              </div>
              <div>
                <div className="font-black text-sm text-white">
                  {isRecordingVoice ? t.listening : t.speakSos}
                </div>
                <div className="text-xs text-amber-300 font-bold">{t.tapToSpeak}</div>
              </div>
            </div>
            <span className="text-2xl">🎙️</span>
          </button>
        </div>

        {/* 2. Camera / Visual Evidence */}
        <div className="rounded-2xl border border-white/10 bg-navy-950/80 p-3.5 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-200 block">
            {language === "ta" ? "2. வெள்ளம் / சேத படம் எடுக்கவும்:" : "2. Select Photo of Disaster:"}
          </span>

          {/* Sample Disaster Photo Cards */}
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

        {/* 3. Pre-filled Auto Description */}
        <div className="rounded-2xl border border-white/10 bg-navy-950/80 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              {language === "ta" ? "விவரம் (தானாக உருவாக்கப்பட்டது):" : "Auto Description:"}
            </span>
            <button
              type="button"
              onClick={() => speak(description)}
              className="text-cyan-300 text-xs flex items-center space-x-1"
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span>{t.readAloud}</span>
            </button>
          </div>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-navy-900 p-2.5 font-sans text-xs text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Giant Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 p-4 font-black text-sm text-white shadow-[0_0_30px_rgba(244,63,94,0.5)] active:scale-95 transition-transform disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
          <span>{isSubmitting ? t.sendingSos : t.oneTapSos}</span>
        </button>
      </form>
    </div>
  );
}
