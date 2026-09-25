import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CitizenAppProvider } from "@/lib/store";
import { MobileHeader, BottomNav } from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "CrisisLens - Citizen Emergency SOS & Multimodal Disaster Reporter",
  description: "Request immediate emergency rescue, upload flood/collapse photos & video, view nearby safe evacuation shelters.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 min-h-screen flex flex-col antialiased">
        <CitizenAppProvider>
          <div className="flex-1 max-w-md mx-auto w-full flex flex-col bg-white border-x border-slate-200 shadow-xl relative pb-20 min-h-screen">
            <MobileHeader />
            <main className="flex-1 bg-slate-50/50">{children}</main>
            <BottomNav />
          </div>
        </CitizenAppProvider>
      </body>
    </html>
  );
}
