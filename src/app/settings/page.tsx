"use client";

import React from 'react';
import { SettingsUI } from '@/components/settings/SettingsUI';
import { SlimSidebar } from '@/components/dashboard/Widgets';

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-indigo-500/30 relative">
      
      {/* Ambient Glows */}
      <div className="ambient-glow-purple top-[-10%] right-[-10%]" />
      <div className="ambient-glow-blue bottom-[-10%] left-[-10%]" />

      <SlimSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar relative w-full pl-0 md:pl-28 pt-8 pb-24 md:pb-12 px-6 md:px-12">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mask-image-linear-top" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 60%)' }} />

        <SettingsUI />
      </main>
    </div>
  );
}
