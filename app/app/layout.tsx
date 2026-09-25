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
    <html lang="en" className="dark">
      <body className="bg-navy-950 text-slate-100 min-h-screen flex flex-col antialiased">
        <CitizenAppProvider>
          <div className="flex-1 max-w-md mx-auto w-full flex flex-col bg-navy-900 border-x border-white/5 shadow-2xl relative pb-20">
            <MobileHeader />
            <main className="flex-1">{children}</main>
            <BottomNav />
          </div>
        </CitizenAppProvider>
      </body>
    </html>
  );
}
