"use client";

import React, { useState, useEffect } from 'react';
import { api, HeatmapDay, Anomaly, Budget } from '@/lib/api';
import { SlimSidebar, TopNavigation } from '@/components/dashboard/Widgets';
import { DepartmentCard, SpendHeatmap, AnomalyFeed } from '@/components/budgets/BudgetWidgets';
import { Settings2, X, Check, Save, Plus } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';

export default function BudgetsPage() {
  const [data, setData] = useState<{ heatmap: HeatmapDay[], anomalies: Anomaly[], departments: Budget[] } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudgets, setEditingBudgets] = useState<Budget[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const { t, lang } = useTranslation();

  useEffect(() => {
    api.getBudgetAnalytics().then((res) => {
      setData(res);
      if (res) setEditingBudgets(res.departments);
    });
  }, []);

  const handleLimitChange = (id: string, newTotal: number) => {
    setEditingBudgets(prev => prev.map(b => b.id === id ? { ...b, total: newTotal } : b));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      if (data) {
        setData({ ...data, departments: editingBudgets });
      }
      setIsSaving(false);
      setIsModalOpen(false);
    }, 1200);
  };

  const calculatedTotalBudget = (editingBudgets.length > 0 ? editingBudgets : (data?.departments || [])).reduce((acc, curr) => acc + curr.total, 0);

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
                <span className="text-[13px] text-zinc-400">{t.totalBudget}: <span className="text-white font-mono tracking-tighter">${calculatedTotalBudget.toLocaleString()}</span></span>
                <span className="text-[13px] text-zinc-600">/</span>
                <span className="text-[13px] text-amber-400">{t.burnVelocity}: 1.2x ⚠️</span>
              </div>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[13px] font-medium hover:bg-white/10 active:scale-95 spring-transition flex items-center justify-center gap-2"
            >
              <Settings2 size={16} /> {t.editBudgets}
            </button>
          </header>

          {/* Department Matrix */}
          <section className="shrink-0 stagger-2">
            <h2 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-4">{t.departmentMatrix}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {!data ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[120px] bg-white/[0.02] border border-white/[0.05] rounded-2xl animate-pulse" />
              )) : data.departments.map(dept => (
                <DepartmentCard key={dept.id} dept={dept} />
              ))}
            </div>
          </section>

          {/* Analytics Split */}
          <section className="flex-1 min-h-0 flex gap-4 stagger-3 pb-8">
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

      {/* Edit Budgets Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-lg glass-panel-heavy rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl z-10 flex flex-col gap-6"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-white tracking-tight">{t.editBudgets}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{lang === 'RU' ? 'Настройте лимиты расходов по отделам' : 'Adjust monthly department spending limits'}</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 spring-transition"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto no-scrollbar pr-1">
                {editingBudgets.map(dept => (
                  <div key={dept.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: dept.color }} />
                      <div>
                        <p className="text-sm font-medium text-white tracking-tight">{dept.category}</p>
                        <p className="text-[11px] text-zinc-500 font-mono">{lang === 'RU' ? 'Потрачено:' : 'Spent:'} ${dept.spent.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-400">$</span>
                      <input 
                        type="number"
                        step="5000"
                        value={dept.total}
                        onChange={(e) => handleLimitChange(dept.id, Number(e.target.value))}
                        className="w-32 bg-black/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono text-white text-right focus:outline-none focus:border-indigo-500/50 transition-colors"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-xs font-mono text-zinc-400">
                  {lang === 'RU' ? 'Итого:' : 'Total:'} <span className="text-white font-medium">${editingBudgets.reduce((a, b) => a + b.total, 0).toLocaleString()}</span>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-medium hover:bg-white/10 spring-transition active:scale-95"
                  >
                    {t.cancel}
                  </button>
                  <button 
                    disabled={isSaving}
                    onClick={handleSave}
                    className="px-5 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-xs font-medium spring-transition active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {lang === 'RU' ? 'Сохранение...' : 'Saving...'}
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        {t.saveChanges}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
