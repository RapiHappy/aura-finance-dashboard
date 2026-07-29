"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, LayoutGrid, CheckCircle2, Trophy, User, ChevronRight, Zap } from 'lucide-react';

export default function TelegramMiniApp() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden relative sm:bg-black sm:items-center sm:justify-center">
      
      {/* Mobile Wrapper (forces mobile size on desktop) */}
      <div className="w-full h-full max-w-[420px] bg-[#0A0A0A] relative flex flex-col shadow-2xl sm:h-[850px] sm:rounded-[40px] sm:border-8 border-[#1A1A1A] overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#00E5FF]/10 blur-[80px] rounded-full pointer-events-none z-0" />

        {/* Top Header */}
        <header className="px-6 pt-10 pb-4 flex justify-between items-center relative z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black border border-[#2A2A2A] flex items-center justify-center overflow-hidden p-0.5">
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=transparent" className="w-full h-full rounded-full bg-zinc-800" alt="Avatar" />
            </div>
            <div>
              <p className="text-[11px] text-[#A1A1AA] uppercase tracking-widest font-mono">Earner</p>
              <h2 className="text-sm font-semibold tracking-tight text-white">Alex Smith</h2>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
            <Zap size={12} className="text-[#00E5FF]" />
            <span className="text-xs font-bold font-mono text-[#00E5FF]">3 Day Streak</span>
          </div>
        </header>

        {/* Main Scrollable Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative z-10 pb-24 px-6">
          <AnimatePresence mode="wait">
            {activeTab === 'tasks' && <TasksView key="tasks" />}
            {activeTab === 'leaderboard' && <LeaderboardView key="leaderboard" />}
            {activeTab === 'wallet' && <WalletView key="wallet" />}
          </AnimatePresence>
        </main>

        {/* Bottom Navigation Dock */}
        <nav className="absolute bottom-6 left-6 right-6 h-16 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-around px-2 z-50">
          <NavItem icon={<LayoutGrid size={22} />} label="Tasks" id="tasks" active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} />
          <NavItem icon={<Trophy size={22} />} label="Top" id="leaderboard" active={activeTab === 'leaderboard'} onClick={() => setActiveTab('leaderboard')} />
          <NavItem icon={<Wallet size={22} />} label="Wallet" id="wallet" active={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} />
          <NavItem icon={<User size={22} />} label="Profile" id="profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>

      </div>
    </div>
  );
}

// --- Views ---

function TasksView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-6 pt-4"
    >
      {/* Balance Card */}
      <div className="w-full p-6 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-black border border-white/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/20 blur-[50px] rounded-full pointer-events-none" />
        <p className="text-[11px] text-[#A1A1AA] uppercase tracking-widest font-mono mb-2">Available Balance</p>
        <h1 className="text-4xl font-bold tracking-tighter text-white mb-4">$42.50</h1>
        
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-[11px] font-medium">
            <span className="text-[#A1A1AA]">Daily Goal</span>
            <span className="text-[#00E5FF]">$2.50 / $5.00</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-[#00E5FF] w-1/2 rounded-full" />
          </div>
        </div>
      </div>

      {/* Available Tasks List */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-white tracking-tight mb-1">High-Paying Tasks</h3>
        
        <TaskCard 
          title="Leave App Store Review" 
          platform="iOS App Store"
          reward="$1.50"
          time="3 mins"
          type="Review"
        />
        <TaskCard 
          title="Subscribe to TG Channel" 
          platform="Telegram"
          reward="$0.25"
          time="1 min"
          type="Social"
        />
        <TaskCard 
          title="Test Web Application" 
          platform="Browser"
          reward="$3.00"
          time="10 mins"
          type="Testing"
        />
        <TaskCard 
          title="Like & Retweet" 
          platform="Twitter / X"
          reward="$0.50"
          time="1 min"
          type="Social"
        />
      </div>
    </motion.div>
  );
}

function LeaderboardView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col gap-4 pt-4"
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Weekly Top</h2>
        <p className="text-xs text-[#A1A1AA]">Top 3 users share a $500 bonus pool.</p>
      </div>

      <div className="flex items-end justify-center gap-4 h-40 mb-6 relative">
        <div className="w-20 h-24 bg-[#141414] border border-white/10 rounded-t-2xl flex flex-col items-center justify-end pb-3 relative">
           <div className="absolute -top-6 w-12 h-12 rounded-full border-2 border-[#A1A1AA] bg-zinc-800" />
           <span className="text-sm font-bold text-[#A1A1AA] mb-1">#2</span>
           <span className="text-[10px] font-mono text-white">$142</span>
        </div>
        <div className="w-24 h-32 bg-[#1A1A1A] border-t-2 border-l border-r border-t-[#00E5FF] border-x-white/10 rounded-t-2xl flex flex-col items-center justify-end pb-3 relative shadow-[0_-10px_20px_rgba(0,229,255,0.1)]">
           <div className="absolute -top-7 w-14 h-14 rounded-full border-2 border-[#00E5FF] bg-zinc-800" />
           <span className="text-sm font-bold text-[#00E5FF] mb-1">#1</span>
           <span className="text-[10px] font-mono text-white">$250</span>
        </div>
        <div className="w-20 h-20 bg-[#141414] border border-white/10 rounded-t-2xl flex flex-col items-center justify-end pb-3 relative">
           <div className="absolute -top-6 w-12 h-12 rounded-full border-2 border-[#CD7F32] bg-zinc-800" />
           <span className="text-sm font-bold text-[#CD7F32] mb-1">#3</span>
           <span className="text-[10px] font-mono text-white">$98</span>
        </div>
      </div>
      
      {/* Self Rank */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between mb-2">
         <div className="flex items-center gap-3">
           <span className="text-sm font-bold text-[#A1A1AA]">#142</span>
           <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=transparent" className="w-8 h-8 rounded-full bg-zinc-800" />
           <span className="text-sm font-medium text-white">You</span>
         </div>
         <span className="text-xs font-mono text-[#00E5FF] font-bold">$42.50</span>
      </div>
    </motion.div>
  );
}

function WalletView() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6 pt-4"
    >
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-white tracking-tight">Withdraw Funds</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-[#141414] border border-[#00E5FF]/30 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#00E5FF]/5 group-hover:bg-[#00E5FF]/10 transition-colors" />
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">TON</div>
          <span className="text-xs font-medium text-white">TON Wallet</span>
        </div>
        <div className="p-4 bg-[#141414] border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-white/20 transition-colors">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-[10px]">USDT</div>
          <span className="text-xs font-medium text-white">Tether TRC20</span>
        </div>
      </div>
      
      <div className="w-full">
        <label className="text-[11px] font-mono uppercase tracking-widest text-[#A1A1AA] block mb-2">Amount to Withdraw</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-medium">$</span>
          <input type="text" defaultValue="42.50" className="w-full bg-black border border-white/10 rounded-xl py-4 pl-8 pr-4 text-white text-lg font-bold outline-none focus:border-[#00E5FF]/50" />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white/10 rounded-lg text-[10px] uppercase font-bold text-white hover:bg-white/20">Max</button>
        </div>
      </div>

      <button className="w-full py-4 rounded-xl bg-[#00E5FF] text-black font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(0,229,255,0.2)]">
        Confirm Withdrawal
      </button>
    </motion.div>
  );
}

// --- Components ---

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, id: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-14 h-full relative transition-colors ${active ? 'text-[#00E5FF]' : 'text-[#A1A1AA] hover:text-white'}`}
    >
      <motion.div whileTap={{ scale: 0.8 }} className="relative z-10 flex flex-col items-center gap-1">
        {icon}
        <span className="text-[10px] font-medium tracking-tight">{label}</span>
      </motion.div>
      {active && (
        <motion.div 
          layoutId="bottomNavIndicator"
          className="absolute inset-0 bg-white/5 rounded-xl border-t border-white/10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
}

function TaskCard({ title, platform, reward, time, type }: any) {
  return (
    <div className="p-4 bg-[#141414] border border-white/5 rounded-2xl flex items-center justify-between cursor-pointer hover:border-white/10 active:scale-[0.98] transition-all group relative overflow-hidden">
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex flex-col items-center justify-center gap-0.5">
          <span className="text-[9px] uppercase tracking-widest text-[#A1A1AA]">{time}</span>
        </div>
        <div>
          <h4 className="text-sm font-medium text-white mb-0.5 group-hover:text-[#00E5FF] transition-colors">{title}</h4>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#A1A1AA]">{platform}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[11px] text-[#A1A1AA]">{type}</span>
          </div>
        </div>
      </div>
      <div className="relative z-10 flex items-center gap-3">
        <span className="text-sm font-bold text-white">{reward}</span>
        <ChevronRight size={16} className="text-[#A1A1AA] group-hover:translate-x-1 transition-transform" />
      </div>
      
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
