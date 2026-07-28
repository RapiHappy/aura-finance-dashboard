import React from 'react';
import { LayoutDashboard, Wallet, CreditCard, Users, Settings, Bell } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-16 border-r border-[#222] bg-[#050505] flex flex-col items-center py-6 gap-8 shrink-0 z-20">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
        <span className="text-black font-bold text-lg leading-none tracking-tighter">A</span>
      </div>
      <nav className="flex flex-col gap-4 w-full items-center">
        <button className="p-2.5 rounded-xl bg-[#222] text-white shadow-inner relative group transition-colors">
          <LayoutDashboard size={18} />
          <span className="absolute left-12 opacity-0 group-hover:opacity-100 bg-[#222] border border-[#333] text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-opacity pointer-events-none z-50">Dashboard</span>
        </button>
        <button className="p-2.5 rounded-xl text-zinc-500 hover:text-white hover:bg-[#111] transition-colors group relative">
          <Wallet size={18} />
          <span className="absolute left-12 opacity-0 group-hover:opacity-100 bg-[#222] border border-[#333] text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-opacity pointer-events-none z-50">Accounts</span>
        </button>
        <button className="p-2.5 rounded-xl text-zinc-500 hover:text-white hover:bg-[#111] transition-colors group relative">
          <CreditCard size={18} />
          <span className="absolute left-12 opacity-0 group-hover:opacity-100 bg-[#222] border border-[#333] text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-opacity pointer-events-none z-50">Cards</span>
        </button>
        <button className="p-2.5 rounded-xl text-zinc-500 hover:text-white hover:bg-[#111] transition-colors group relative">
          <Users size={18} />
          <span className="absolute left-12 opacity-0 group-hover:opacity-100 bg-[#222] border border-[#333] text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-opacity pointer-events-none z-50">Team</span>
        </button>
      </nav>
      <div className="mt-auto flex flex-col gap-6 w-full items-center">
        <button className="relative p-2 text-zinc-500 hover:text-white transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
        </button>
        <button className="p-2 text-zinc-500 hover:text-white transition-colors"><Settings size={18} /></button>
        <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">AM</div>
      </div>
    </aside>
  );
}
