"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, CreditCard, PieChart, ShieldCheck, Activity, Layers, Globe } from 'lucide-react';

export default function AuraFinanceLanding() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      
      {/* Background Layers */}
      <div className="absolute inset-0 bg-grid-aura z-0" />
      <div className="absolute inset-0 bg-noise z-0" />
      
      {/* Ambient Neon Glows (Deep B2B Corporate Theme) */}
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Aura Finance</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors">Platform</Link>
          <Link href="#infrastructure" className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors">Infrastructure</Link>
          <Link href="#security" className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors">Security</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors">Sign In</Link>
          <Link href="/dashboard" className="btn-primary py-2.5 px-5 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
            Open Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-20 pb-32 relative z-10 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-indigo-500/20 bg-indigo-500/5 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400">SOC-2 Type II Certified Platform</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white max-w-5xl leading-[1.1] mb-6"
        >
          The Elite Financial OS for <span className="text-gradient-primary">Modern Teams.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl mb-12 font-medium"
        >
          Automate expenses, issue corporate cards, and control budgets in real-time. Designed specifically for fast-growing companies that demand absolute precision.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold text-base hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Explore Dashboard <ArrowRight size={18} />
          </Link>
          <Link href="#infrastructure" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent border border-white/10 text-white font-medium text-base hover:bg-white/5 active:scale-95 transition-all flex items-center justify-center gap-2">
            View Infrastructure
          </Link>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 text-xs text-[#A1A1AA] font-mono"
        >
          *No credit checks required for corporate cards. Instant setup.
        </motion.p>

        {/* Live Metrics Ticker */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 w-full max-w-4xl"
        >
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#A1A1AA] mb-4 text-left">Real-Time System Metrics</p>
          <div className="flex gap-4 overflow-hidden relative w-full h-16 mask-image-linear-horizontal">
            <LiveMetricsRow />
          </div>
        </motion.div>
      </main>

      {/* Core Infrastructure Section */}
      <section id="infrastructure" className="w-full py-24 relative z-10 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Financial control in 3 steps.</h2>
            <p className="text-[#A1A1AA] text-lg">Replace clunky legacy banking with intelligent automation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number="01" 
              title="Issue Cards Instantly" 
              desc="Generate virtual and physical corporate cards in one click. Set custom limits for every team member." 
              icon={<CreditCard size={32} className="text-indigo-400" />} 
            />
            <StepCard 
              number="02" 
              title="Automate Budgets" 
              desc="Create dynamic budgets that automatically track expenses by category, vendor, or project." 
              icon={<PieChart size={32} className="text-emerald-400" />} 
            />
            <StepCard 
              number="03" 
              title="Smart AI Inbox" 
              desc="Approve expenses in seconds. Our AI categorizes receipts and matches them to transactions automatically." 
              icon={<CheckCircle2 size={32} className="text-indigo-400" />} 
            />
          </div>
        </div>
      </section>

      {/* Bento Grid Features Showcase */}
      <section id="features" className="w-full py-32 relative z-10 bg-indigo-500/5 border-t border-indigo-500/10 overflow-hidden">
        <div className="absolute top-[50%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400">Dashboard Intelligence</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              See your entire company runway at a glance.
            </h2>
            <p className="text-[#A1A1AA] text-lg mb-8">
              Aura Finance brings every transaction, budget, and approval into a single, unified interface. Powered by advanced machine learning to predict burn rate and extend your runway.
            </p>
            <ul className="flex flex-col gap-4 mb-10">
              {['Real-time cash flow monitoring', 'Automated receipt matching', 'Multi-entity consolidation', 'Direct ERP integrations'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white text-sm font-medium">
                  <CheckCircle2 size={18} className="text-indigo-400" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-base hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all inline-block">
              Experience the Dashboard
            </Link>
          </div>
          
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            {/* Bento Box 1: Live Pulse */}
            <div className="col-span-2 glass-panel p-6 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#A1A1AA] flex items-center gap-2">
                   <Activity size={12} className="text-emerald-400" /> Live Pulse
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                   <span className="text-white font-medium">AWS Cloud</span>
                   <span className="text-zinc-500 font-mono">-$2,450.00</span>
                 </div>
                 <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                   <span className="text-white font-medium">Stripe Payout</span>
                   <span className="text-emerald-400 font-mono">+$45,200.00</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-white font-medium">Github</span>
                   <span className="text-zinc-500 font-mono">-$149.00</span>
                 </div>
              </div>
            </div>

            {/* Bento Box 2: Budgets */}
            <div className="col-span-1 glass-panel p-6 rounded-3xl group hover:border-white/20 transition-colors">
              <PieChart size={24} className="text-indigo-400 mb-4" />
              <h4 className="text-white font-medium mb-1">Marketing</h4>
              <p className="text-2xl font-bold font-mono text-white tracking-tighter">$12.4k</p>
              <p className="text-[10px] text-zinc-500 font-mono mt-1">/ $15k Goal</p>
              <div className="h-1 w-full bg-white/5 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            {/* Bento Box 3: Global */}
            <div className="col-span-1 glass-panel-heavy p-6 rounded-3xl bg-black/60 group hover:border-white/20 transition-colors border-indigo-500/20">
              <Globe size={24} className="text-purple-400 mb-4" />
              <h4 className="text-white font-medium mb-1">Global Scale</h4>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">Settle in USD, EUR, and 40+ currencies instantly without FX markups.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="security" className="w-full py-12 border-t border-white/10 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-white" />
            <span className="font-bold tracking-tight text-white">Aura Finance</span>
          </div>
          
          <div className="flex gap-8">
            <span className="text-xs text-[#A1A1AA] flex items-center gap-2"><ShieldCheck size={14}/> SOC-2 Type II Certified</span>
            <span className="text-xs text-[#A1A1AA] flex items-center gap-2"><Layers size={14}/> Bank-Level 256-bit Encryption</span>
          </div>

          <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Aura Finance. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}

// --- Components ---

function StepCard({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="glass-panel-heavy p-8 rounded-3xl hover:border-white/20 transition-colors group relative overflow-hidden">
      <div className="absolute -top-4 -right-4 text-8xl font-black text-white/[0.02] pointer-events-none">{number}</div>
      <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-[#A1A1AA] leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

function LiveMetricsRow() {
  const metrics = [
    { label: 'System Uptime', value: '99.999%', status: 'Operational' },
    { label: 'Avg API Latency', value: '42ms', status: 'Optimal' },
    { label: 'Transaction Speed', value: '<1s', status: 'Optimal' },
    { label: 'Fraud Prevention AI', value: 'Active', status: 'Scanning' },
  ];

  return (
    <motion.div 
      className="flex gap-4 whitespace-nowrap"
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
    >
      {[...metrics, ...metrics, ...metrics].map((m, i) => (
        <div key={i} className="glass-panel px-4 py-2.5 rounded-xl flex items-center gap-3 shrink-0">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-sm font-medium text-white">{m.label}</span>
          <span className="text-xs text-[#A1A1AA]">currently at</span>
          <span className="text-sm font-bold text-white">{m.value}</span>
          <span className="text-xs font-mono text-zinc-500">({m.status})</span>
        </div>
      ))}
    </motion.div>
  );
}
