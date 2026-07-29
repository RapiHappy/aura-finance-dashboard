"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, ChevronDown, MonitorSmartphone, DollarSign, Users, ShieldCheck, Zap } from 'lucide-react';

export default function AuraFinanceLanding() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      
      {/* Background Layers */}
      <div className="absolute inset-0 bg-grid-rc z-0" />
      <div className="absolute inset-0 bg-noise z-0" />
      
      {/* Ambient Neon Glows */}
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#8A2BE2]/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#8A2BE2] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Sparkles size={16} className="text-black" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Aura Finance</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors">How it works</Link>
          <Link href="#advertisers" className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors">For Advertisers</Link>
          <Link href="#faq" className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="hidden sm:block text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors">Business Dashboard</Link>
          <Link href="/app" className="btn-primary py-2.5 px-5">Launch Mini App</Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-20 pb-32 relative z-10 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-[#00E5FF]/20 bg-[#00E5FF]/5 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#00E5FF]">Trusted by 150,000+ users</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white max-w-5xl leading-[1.1] mb-6"
        >
          The Unified Platform for <span className="text-gradient-primary">Business & Growth.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl mb-12 font-medium"
        >
          Aura Finance bridges the gap. A powerful Desktop OS for businesses to manage finances and campaigns, and a viral Telegram Mini App for users to earn crypto.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/dashboard" className="btn-neon w-full sm:w-auto text-base px-8 py-4 !bg-white !text-black hover:!shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Open Desktop OS <ArrowRight size={18} />
          </Link>
          <Link href="/app" className="btn-secondary w-full sm:w-auto text-base px-8 py-4">
            Try Mobile App
          </Link>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 text-xs text-[#A1A1AA] font-mono"
        >
          *Takes 10 seconds to start. No KYC required for micro-earnings.
        </motion.p>

        {/* Live Payouts Ticker */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 w-full max-w-4xl"
        >
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#A1A1AA] mb-4 text-left">Live Payout Feed</p>
          <div className="flex gap-4 overflow-hidden relative w-full h-16 mask-image-linear-horizontal">
            <LivePayoutRow />
          </div>
        </motion.div>
      </main>

      {/* How it Works Section */}
      <section id="how-it-works" className="w-full py-24 relative z-10 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Earn in 3 simple steps.</h2>
            <p className="text-[#A1A1AA] text-lg">No complicated setups. Built directly into your favorite messenger.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number="01" 
              title="Connect Telegram" 
              desc="Launch our verified Mini App instantly. No passwords to remember." 
              icon={<MonitorSmartphone size={32} className="text-[#00E5FF]" />} 
            />
            <StepCard 
              number="02" 
              title="Complete Tasks" 
              desc="Like, subscribe, or write reviews. Takes seconds per task." 
              icon={<Zap size={32} className="text-[#8A2BE2]" />} 
            />
            <StepCard 
              number="03" 
              title="Withdraw Instantly" 
              desc="Get paid in USDT, TON, or Fiat directly to your wallet." 
              icon={<DollarSign size={32} className="text-[#00E5FF]" />} 
            />
          </div>
        </div>
      </section>

      {/* Advertiser Section */}
      <section id="advertisers" className="w-full py-32 relative z-10 bg-[#00E5FF]/5 border-t border-[#00E5FF]/10 overflow-hidden">
        <div className="absolute top-[50%] left-[-10%] w-[500px] h-[500px] bg-[#8A2BE2]/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8A2BE2]/10 border border-[#8A2BE2]/20 mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#8A2BE2]">For Business</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Need real users? <br />Launch a campaign in 3 minutes.
            </h2>
            <p className="text-[#A1A1AA] text-lg mb-8">
              Manage your finances, runway, and ad campaigns all from our elite Desktop Dashboard. Aura Finance connects you with over 150,000 active users ready to test your product, powered by our proprietary Anti-Fraud AI.
            </p>
            <ul className="flex flex-col gap-4 mb-10">
              {['100% Real human traffic', 'Pay only for approved actions', 'Detailed analytics dashboard', 'API Access for automation'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white text-sm font-medium">
                  <CheckCircle2 size={18} className="text-[#8A2BE2]" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="btn-primary w-full sm:w-auto px-8 py-4 !bg-[#8A2BE2] !text-white hover:!shadow-[0_0_30px_rgba(138,43,226,0.4)]">
              Open Desktop Dashboard
            </Link>
          </div>
          
          <div className="flex-1 w-full glass-panel-heavy p-8 rounded-3xl relative">
             <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-sm text-[#A1A1AA]">Campaign Setup</span>
                <Badge variant="brand">Draft</Badge>
             </div>
             
             <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#A1A1AA] font-mono">Task Type</label>
                  <div className="p-3 bg-black/50 border border-white/10 rounded-xl text-sm text-white flex justify-between items-center cursor-pointer">
                    App Store Review <ChevronDown size={14} className="text-[#A1A1AA]" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#A1A1AA] font-mono">Budget & Volume</label>
                  <div className="flex gap-4">
                    <div className="flex-1 p-3 bg-black/50 border border-white/10 rounded-xl text-sm text-white font-mono">
                      $0.50 / action
                    </div>
                    <div className="flex-1 p-3 bg-black/50 border border-white/10 rounded-xl text-sm text-white font-mono">
                      1,000 users
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#A1A1AA] font-mono">Total Cost</p>
                    <p className="text-2xl font-bold text-white tracking-tighter">$500.00</p>
                  </div>
                  <button className="px-6 py-2 bg-white text-black text-xs font-semibold rounded-lg">Launch Campaign</button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-white/10 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#00E5FF]" />
            <span className="font-bold tracking-tight text-white">Aura Finance</span>
          </div>
          
          <div className="flex gap-8">
            <span className="text-xs text-[#A1A1AA] flex items-center gap-2"><ShieldCheck size={14}/> Protected by AI Anti-Fraud</span>
            <span className="text-xs text-[#A1A1AA] flex items-center gap-2"><MonitorSmartphone size={14}/> Verified Telegram App</span>
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

function LivePayoutRow() {
  const payouts = [
    { user: 'al***', amount: '$15.50', method: 'USDT (TRC20)' },
    { user: 'ma***', amount: '$5.00', method: 'TON Wallet' },
    { user: 'ik***', amount: '$42.25', method: 'USDT (TRC20)' },
    { user: 'st***', amount: '$1.50', method: 'TON Wallet' },
    { user: 'jo***', amount: '$12.00', method: 'Bank Card' },
  ];

  return (
    <motion.div 
      className="flex gap-4 whitespace-nowrap"
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    >
      {[...payouts, ...payouts, ...payouts].map((p, i) => (
        <div key={i} className="glass-panel px-4 py-2.5 rounded-xl flex items-center gap-3 shrink-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-white">{p.user}</span>
          <span className="text-xs text-[#A1A1AA]">withdrew</span>
          <span className="text-sm font-bold text-[#00E5FF]">{p.amount}</span>
          <span className="text-xs text-[#A1A1AA]">to {p.method}</span>
        </div>
      ))}
    </motion.div>
  );
}

function Badge({ children, variant = 'brand' }: { children: React.ReactNode, variant?: string }) {
  return (
    <span className="px-2 py-1 rounded bg-[#8A2BE2]/20 text-[#8A2BE2] border border-[#8A2BE2]/30 text-[10px] uppercase font-bold tracking-widest">
      {children}
    </span>
  );
}
