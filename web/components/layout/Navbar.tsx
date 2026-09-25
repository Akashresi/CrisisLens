"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Radio, Layers, Map, AlertTriangle, GitCompare, Users, Bell, ExternalLink } from "lucide-react";
import { useCrisis } from "@/lib/store/store";

export function Navbar() {
  const pathname = usePathname();
  const { incidents, weather } = useCrisis();

  const activeIncidentsCount = incidents.filter((i) => i.status !== "RESOLVED").length;
  const criticalCount = incidents.filter((i) => i.priorityLevel === "CRITICAL" && i.status !== "RESOLVED").length;
  const uncertainCount = incidents.filter((i) => i.isUncertain && i.status === "REPORTED").length;

  const navItems = [
    { href: "/", label: "Live Command", icon: Shield },
    { href: "/map", label: "GIS Digital Twin", icon: Map },
    { href: "/fusion", label: "3-Model Fusion", icon: Layers },
    { href: "/human-review", label: "Human Review", icon: AlertTriangle, badge: uncertainCount > 0 ? uncertainCount : null },
    { href: "/simulator", label: "What-If Simulator", icon: GitCompare },
    { href: "/resources", label: "Resource Fleet", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-sans font-black tracking-tight text-white text-lg group-hover:text-cyan-400 transition-colors">
                  CRISIS<span className="text-cyan-400">LENS</span>
                </span>
                <span className="rounded bg-cyan-500/20 px-1.5 py-0.2 font-mono text-[9px] font-bold text-cyan-300 border border-cyan-500/30">
                  COMMAND
                </span>
              </div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                Disaster Response Monitor
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-rose-500 px-1.5 py-0.2 font-mono text-[9px] font-bold text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Live System Status Indicators & Citizen App Link */}
        <div className="flex items-center space-x-3">
          {/* Active Incidents Alert */}
          <div className="hidden sm:flex items-center space-x-2 rounded-lg border border-red-500/30 bg-red-950/40 px-3 py-1 text-xs font-mono">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-300 font-bold">{criticalCount} Critical</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-300">{activeIncidentsCount} Active</span>
          </div>

          {/* Link to Citizen Reporting Mobile App */}
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 px-3 py-1.5 text-xs font-mono font-bold text-white shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:scale-105 transition-transform"
          >
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            <span>Open Citizen SOS App</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </header>
  );
}
