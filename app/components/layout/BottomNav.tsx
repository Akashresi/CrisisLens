"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertCircle, Camera, Activity, Home, Bell, PhoneCall } from "lucide-react";
import { useCitizenApp } from "@/lib/store";

export function BottomNav() {
  const pathname = usePathname();
  const { activeSOS } = useCitizenApp();

  const navItems = [
    { href: "/", label: "Quick SOS", icon: AlertCircle },
    { href: "/report", label: "Report", icon: Camera },
    { href: "/sos-status", label: "Status", icon: Activity, badge: activeSOS ? "Active" : null },
    { href: "/shelters", label: "Shelters", icon: Home },
    { href: "/alerts", label: "Alerts", icon: Bell },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto border-t border-white/10 bg-navy-950/95 backdrop-blur-xl px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
                isActive
                  ? "text-rose-400 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "scale-110 text-rose-400" : ""}`} />
              <span className="text-[10px] font-mono mt-1">{item.label}</span>
              {item.badge && (
                <span className="absolute top-0 right-1 h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 max-w-md mx-auto border-b border-white/10 bg-navy-950/90 backdrop-blur-md px-4 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
            SOS
          </div>
          <div>
            <div className="font-bold text-white text-sm tracking-tight flex items-center space-x-1.5">
              <span>CRISIS<span className="text-rose-400">LENS</span></span>
              <span className="rounded bg-rose-500/20 px-1 font-mono text-[8px] text-rose-300 font-bold border border-rose-500/30">
                CITIZEN
              </span>
            </div>
          </div>
        </Link>

        {/* Direct 112 / 108 Hotline */}
        <a
          href="tel:112"
          className="flex items-center space-x-1.5 rounded-full bg-red-600/90 hover:bg-red-600 px-3 py-1 text-xs font-mono font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]"
        >
          <PhoneCall className="h-3.5 w-3.5 animate-bounce" />
          <span>Call 112</span>
        </a>
      </div>
    </header>
  );
}
