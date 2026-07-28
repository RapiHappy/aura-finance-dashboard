import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`glass-panel rounded-2xl overflow-hidden flex flex-col ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }: { title: React.ReactNode, subtitle?: string, action?: React.ReactNode }) {
  return (
    <div className="px-6 py-5 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-surface)]">
      <div>
        <h3 className="font-semibold text-[var(--text-primary)] tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function Badge({ children, variant = 'default', className = '' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'error' | 'brand' | 'in' | 'out', className?: string }) {
  const variants = {
    default: 'bg-[var(--color-surface-hover)] text-[var(--text-secondary)] border-[var(--color-border)]',
    success: 'bg-[var(--color-success-dim)] text-[var(--color-success)] border-[var(--color-success-dim)]',
    warning: 'bg-[var(--color-warning-dim)] text-[var(--color-warning)] border-[var(--color-warning-dim)]',
    error: 'bg-[var(--color-danger-dim)] text-[var(--color-danger)] border-[var(--color-danger-dim)]',
    brand: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    in: 'bg-[var(--color-success-dim)] text-[var(--color-success)] border-[var(--color-success-dim)]',
    out: 'bg-[var(--color-surface-hover)] text-[var(--text-secondary)] border-[var(--color-border)]'
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
