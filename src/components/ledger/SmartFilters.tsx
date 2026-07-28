import React from 'react';
import { Search, Filter, Download } from 'lucide-react';

export function SmartFilters() {
  const tabs = [
    { name: 'All Transactions', count: 1402, active: true },
    { name: 'Missing Receipts', count: 12, alert: true },
    { name: 'Out of Policy', count: 3, error: true },
  ];

  return (
    <div className="flex flex-col gap-6 mb-8 w-full stagger-2">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-medium tracking-tight text-white">Spend Ledger</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-indigo-400 spring-transition" />
            <input 
              type="text" 
              placeholder="Search or filter..." 
              className="pl-9 pr-12 py-2 bg-[#050505] border border-white/[0.05] rounded-xl text-[13px] text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 w-64 spring-transition placeholder:text-zinc-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md text-[10px] font-mono">⌘</kbd>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md text-[10px] font-mono">K</kbd>
            </div>
          </div>
          
          <button className="p-2.5 bg-[#050505] border border-white/[0.05] rounded-xl text-zinc-400 hover:text-white hover:border-white/10 spring-transition shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <Filter className="w-4 h-4" />
          </button>
          
          <button className="px-4 py-2.5 bg-white text-black rounded-xl text-[13px] font-medium hover:scale-[1.02] active:scale-95 spring-transition flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-white/[0.03] w-full pb-px">
        {tabs.map((tab) => (
          <button 
            key={tab.name}
            className={`px-4 py-3 text-[13px] font-medium flex items-center gap-2 relative spring-transition ${
              tab.active ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab.name}
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono tracking-tighter ${
              tab.alert ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
              tab.error ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
              'bg-white/5 text-zinc-400 border border-white/5'
            }`}>
              {tab.count}
            </span>
            {tab.active && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-t-full shadow-[0_-2px_10px_rgba(255,255,255,0.5)]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
