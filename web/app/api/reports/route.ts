import { NextResponse } from "next/server";
import { fuseMultimodalDisasterData } from "@/lib/ai/feature-fusion";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fused = fuseMultimodalDisasterData({
      trackingNumber: body.trackingCode || `SOS-${Math.floor(100000 + Math.random() * 900000)}`,
      title: `${body.disasterType || "DISASTER"} SOS: ${(body.description || "Citizen emergency").slice(0, 45)}...`,
      category: body.disasterType || "FLOOD",
      rawText: body.description || "Emergency help requested by citizen via SOS app.",
      mediaUrls: {
        imageUrl: body.mediaType === "IMAGE" ? body.mediaUrl : undefined,
        videoUrl: body.mediaType === "VIDEO" ? body.mediaUrl : undefined,
        audioUrl: body.mediaType === "AUDIO" ? body.mediaUrl : undefined,
      },
      location: body.location || { lat: 13.0827, lng: 80.2707, address: "Citizen GPS Fix" },
      sourceType: "CITIZEN_APP",
      reporter: {
        name: body.name || "Anonymous Citizen",
        phone: body.phone || "Not provided",
        isVerifiedVolunteer: false,
      },
    });

    return NextResponse.json({
      success: true,
      incident: fused,
      message: "Report ingested and analyzed by 3-Model AI Fusion pipeline.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process report" },
      { status: 500 }
    );
  }
}
