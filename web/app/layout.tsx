import type { Metadata } from "next";
import "./globals.css";
import { CrisisProvider } from "@/lib/store/store";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "CrisisLens - Autonomous Multimodal AI Disaster Intelligence & Monitor",
  description: "Detect. Understand. Predict. Simulate. Respond. Triple-model AI feature fusion for rapid emergency response and decision-support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-900">
        <CrisisProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CrisisProvider>
      </body>
    </html>
  );
}
