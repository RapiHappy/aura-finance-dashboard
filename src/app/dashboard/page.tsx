"use client";

import React, { useState, useEffect } from 'react';
import { api, DashboardData } from '@/lib/api';
import { 
  TopNavigation, 
  LuminousChart, 
  LivePulseFeed, 
  BudgetProgress, 
  SmartInbox,
  SlimSidebar
} from '@/components/dashboard/Widgets';

export default function OrbitDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getDashboardData().then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-indigo-500/30 relative">
      <div className="absolute inset-0 bg-noise z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-aura z-0 pointer-events-none opacity-50" />
      
      {/* Ambient Glows */}
      <div className="ambient-glow-blue top-[-20%] left-[-10%]" />
      <div className="ambient-glow-purple bottom-[-20%] right-[-10%]" />

      <SlimSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar relative w-full pl-28">
        {/* Absolute Header overlaying the chart */}
        <TopNavigation />
        
        {/* Luminous Chart spans full width, 65vh */}
        <section className="w-full relative shrink-0">
          <LuminousChart data={data} isLoading={isLoading} />
        </section>
        
        {/* Bento Bottom Grid overlays the bottom fade of the chart */}
        <section className="w-full px-10 pb-16 relative z-20 -mt-16 flex-1">
          <div className="max-w-[1800px] w-full mx-auto grid grid-cols-12 gap-8 h-full">
            <LivePulseFeed data={data} isLoading={isLoading} />
            <BudgetProgress data={data} isLoading={isLoading} />
            <SmartInbox data={data} isLoading={isLoading} />
          </div>
        </section>

      </main>
    </div>
  );
}
