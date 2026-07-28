import React from 'react';

export function PeriodSelector({ periods, active, onChange }: { periods: string[], active: string, onChange: (p: string) => void }) {
  return (
    <div className="flex items-center bg-[var(--color-surface-hover)] p-0.5 rounded-lg border border-[var(--color-border)]">
      {periods.map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
            active === p 
              ? 'bg-[var(--color-border-hover)] text-white shadow-sm' 
              : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

export function StatusBadge({ status }: { status: 'Completed' | 'Processing' | 'Failed' | 'Cleared' }) {
  const config = {
    Completed: { color: 'bg-emerald-500', text: 'text-emerald-400', label: 'Completed' },
    Cleared: { color: 'bg-emerald-500', text: 'text-emerald-400', label: 'Cleared' },
    Processing: { color: 'bg-amber-500', text: 'text-amber-400', label: 'Processing' },
    Failed: { color: 'bg-red-500', text: 'text-red-400', label: 'Failed' },
  };
  
  const c = config[status] || config.Completed;
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${c.color} shadow-[0_0_8px_rgba(currentColor,0.5)]`} />
      <span className={`text-xs font-medium ${c.text}`}>{c.label}</span>
    </div>
  );
}

export function MerchantAvatar({ name, logoUrl }: { name: string, logoUrl?: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex items-center justify-center overflow-hidden flex-shrink-0">
      {logoUrl ? (
        <img src={logoUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-[10px] font-bold text-[var(--text-secondary)]">
          {name.substring(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-[var(--color-surface-hover)] animate-pulse rounded-md ${className}`} />
  );
}

export function TrendDelta({ value, isPositive }: { value: string, isPositive: boolean }) {
  return (
    <span className={`text-xs font-medium flex items-center gap-0.5 ${isPositive ? 'text-emerald-400' : 'text-zinc-400'}`}>
      {isPositive ? '↑' : '↓'} {value}
    </span>
  );
}
