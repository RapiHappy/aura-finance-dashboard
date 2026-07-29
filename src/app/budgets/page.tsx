"use client";

import React, { useState, useEffect } from 'react';
import { api, HeatmapDay, Anomaly, Budget } from '@/lib/api';
import { SlimSidebar, TopNavigation } from '@/components/dashboard/Widgets';
import { DepartmentCard, SpendHeatmap, AnomalyFeed } from '@/components/budgets/BudgetWidgets';
import { Settings2 } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function BudgetsPage() {
  const [data, setData] = useState<{ heatmap: HeatmapDay[], anomalies: Anomaly[], departments: Budget[] } | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    api.getBudgetAnalytics().then(setData);
  }, []);

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-indigo-500/30 relative">
      {/* Ambient Glows */}
      <div className="ambient-glow-purple top-[10%] left-[20%]" />

      <SlimSidebar />

      <main className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent px-10 pl-28 py-10">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mask-image-linear-top" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 60%)' }} />

        {/* Top Navigation */}
        <TopNavigation />

        <div className="max-w-[1800px] w-full mx-auto h-full flex flex-col gap-8 relative z-10 pt-24">
          
          <header className="flex justify-between items-end shrink-0 stagger-1">
            <div>
              <h1 className="text-3xl font-medium tracking-tight text-white mb-2">{t.budgets}</h1>
              <div className="flex gap-4">
                <span className="text-[13px] text-zinc-400">Total Budget: <span className="text-white font-mono tracking-tighter">$270,000</span></span>
                <span className="text-[13px] text-zinc-600">/</span>
                <span className="text-[13px] text-amber-400">Burn Velocity: 1.2x ⚠️</span>
              </div>
            </div>
            <button className="px-5 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[13px] font-medium hover:bg-white/10 active:scale-95 spring-transition flex items-center justify-center gap-2">
              <Settings2 size={16} /> Edit Budgets
            </button>
          </header>

          {/* Department Matrix */}
          <section className="shrink-0 stagger-2">
            <h2 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-4">Department Matrix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {!data ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[120px] bg-white/[0.02] border border-white/[0.05] rounded-2xl animate-pulse" />
              )) : data.departments.map(dept => (
                <DepartmentCard key={dept.id} dept={dept} />
              ))}
            </div>
          </section>

          {/* Analytics Split */}
          <section className="flex-1 min-h-0 flex gap-4 stagger-3">
            <div className="flex-[2]">
              {!data ? (
                 <div className="h-full bg-white/[0.02] border border-white/[0.05] rounded-3xl animate-pulse" />
              ) : (
                <SpendHeatmap days={data.heatmap} />
              )}
            </div>
            <div className="flex-1">
              {!data ? (
                 <div className="h-full bg-white/[0.02] border border-white/[0.05] rounded-3xl animate-pulse" />
              ) : (
                <AnomalyFeed anomalies={data.anomalies} />
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
