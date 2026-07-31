import React from 'react';
import { Budget, HeatmapDay, Anomaly } from '@/lib/api';
import { AlertTriangle, TrendingUp, TrendingDown, Info, ShieldAlert } from 'lucide-react';
import { Badge } from '../dashboard/Widgets';
import { useTranslation } from '@/lib/i18n';

// --- Department Card ---
export function DepartmentCard({ dept }: { dept: Budget }) {
  const { lang } = useTranslation();
  const pct = Math.min((dept.spent / dept.total) * 100, 100);
  
  const velocityColors = {
    'Low': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    'Normal': 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
    'High': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    'Critical': 'text-red-400 bg-red-400/10 border-red-400/20',
  };

  return (
    <div className="p-6 glass-panel flex flex-col gap-5 hover:bg-white/[0.04] spring-transition relative group overflow-hidden rounded-[24px]">
      <div className="absolute top-0 left-0 w-full h-1 opacity-20" style={{ backgroundColor: dept.color }} />
      
      <div className="flex justify-between items-start">
        <h3 className="text-[15px] font-medium text-white tracking-tight">{dept.category}</h3>
        <div className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase border ${velocityColors[dept.velocity]}`}>
          {dept.velocity === 'Low' ? (lang === 'RU' ? 'Низкая' : 'Low') :
           dept.velocity === 'Normal' ? (lang === 'RU' ? 'Норма' : 'Normal') :
           dept.velocity === 'High' ? (lang === 'RU' ? 'Высокая' : 'High') :
           (lang === 'RU' ? 'Критично' : 'Critical')}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-2">
          <span className="text-[18px] font-mono tracking-tighter text-white">${(dept.spent / 1000).toFixed(1)}k</span>
          <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">/ ${(dept.total / 1000).toFixed(1)}k</span>
        </div>
        <div className="h-1 w-full bg-white/[0.03] rounded-full overflow-hidden relative shadow-inner">
          <div 
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
            style={{ width: `${pct}%`, backgroundColor: dept.color }} 
          />
        </div>
      </div>
    </div>
  );
}

// --- Spend Heatmap ---
export function SpendHeatmap({ days }: { days: HeatmapDay[] }) {
  const { t, lang } = useTranslation();
  // Intensity colors: 0 (empty), 1, 2, 3, 4
  const colors = [
    'bg-white/[0.02] border-white/[0.01]', 
    'bg-indigo-500/20 border-indigo-500/30',
    'bg-indigo-500/40 border-indigo-500/50',
    'bg-indigo-500/70 border-indigo-500/80',
    'bg-indigo-400 border-indigo-300 shadow-[0_0_10px_rgba(129,140,248,0.5)]'
  ];

  return (
    <div className="p-8 glass-panel-heavy flex flex-col rounded-[32px] h-full justify-between">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">{t.spendHeatmap}</h3>
        <div className="flex items-center gap-2 text-[11px] text-zinc-500 uppercase font-mono tracking-widest">
          {lang === 'RU' ? 'Меньше' : 'Less'}
          <div className="flex gap-1.5 mx-2">
            {colors.map((c, i) => <div key={i} className={`w-4 h-4 rounded-[3px] ${c} border`} />)}
          </div>
          {lang === 'RU' ? 'Больше' : 'More'}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0 w-full overflow-hidden">
        <div className="grid grid-flow-col gap-1.5 sm:gap-2 max-w-fit mx-auto" style={{ gridTemplateRows: 'repeat(7, 1fr)' }}>
          {days.map((day, i) => (
            <div 
              key={i}
              className={`w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-[38px] xl:h-[38px] rounded-[4px] border spring-transition hover:scale-[1.3] hover:z-10 cursor-pointer relative group ${colors[day.intensity]}`}
              title={`${day.date}: $${day.amount.toLocaleString()}`}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-2 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none spring-transition z-20 shadow-2xl">
                <p className="text-[11px] text-zinc-400 font-mono mb-1">{day.date}</p>
                <p className="text-[14px] text-white font-mono tracking-tighter">${day.amount.toLocaleString()}</p>
                {day.events && day.events.map((e, idx) => (
                  <p key={idx} className="text-[10px] text-indigo-400 mt-1 uppercase tracking-widest">{e}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Anomaly Feed ---
export function AnomalyFeed({ anomalies }: { anomalies: Anomaly[] }) {
  const { t, lang } = useTranslation();
  return (
    <div className="p-8 glass-panel flex flex-col rounded-[32px] h-full">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <ShieldAlert size={14} className="text-amber-500" /> {t.anomalyFeed}
        </h3>
        <Badge variant="warning">{anomalies.length} {lang === 'RU' ? 'Предупреждений' : 'Alerts'}</Badge>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar">
        {anomalies.map(anomaly => (
          <div key={anomaly.id} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl flex flex-col gap-3 hover:bg-white/[0.04] spring-transition cursor-pointer group relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${
              anomaly.severity === 'High' ? 'bg-red-500' : 
              anomaly.severity === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
            }`} />
            
            <div className="flex justify-between items-start pl-2">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-medium text-white tracking-tight">{anomaly.merchant}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 font-mono uppercase tracking-widest">{anomaly.department}</span>
              </div>
              <span className={`text-[12px] font-mono tracking-tighter ${
                anomaly.amountChange.includes('+') ? 'text-red-400' : 'text-emerald-400'
              }`}>{anomaly.amountChange}</span>
            </div>

            <p className="text-[13px] text-zinc-400 leading-relaxed pl-2 group-hover:text-zinc-300 spring-transition">
              {anomaly.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
