"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, CreditCard, PieChart, ShieldCheck, Activity, Layers, Globe, ChevronDown, Quote } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function AuraFinanceLanding() {
  const { t, lang, setLang } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#050505]">
      
      {/* Background Layers */}
      <div className="absolute inset-0 bg-grid-aura z-0" />
      <div className="absolute inset-0 bg-noise z-0" />
      
      {/* Ambient Neon Glows */}
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Aura Finance</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors">{t.nav.platform}</Link>
          <Link href="#infrastructure" className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors">{t.nav.infra}</Link>
          <Link href="#security" className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors">{t.nav.security}</Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 active:scale-95"
            >
              {lang} <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-[#141414] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                <button onClick={() => { setLang('EN'); setLangOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors active:bg-white/10">English</button>
                <button onClick={() => { setLang('RU'); setLangOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors active:bg-white/10">Русский</button>
              </div>
            )}
          </div>
          <Link href="/login" className="hidden sm:block text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors">{t.nav.signin}</Link>
          <Link href="/dashboard" className="btn-primary py-2.5 px-5 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] whitespace-nowrap active:scale-95 transition-all">
            {t.nav.openDash}
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-indigo-500/20 bg-indigo-500/5 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400">{t.hero.badge}</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white max-w-5xl leading-[1.1] mb-6"
        >
          {t.hero.title1} <span className="text-gradient-primary">{t.hero.title2}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl mb-12 font-medium"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold text-base hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            {t.hero.btnPrimary} <ArrowRight size={18} />
          </Link>
          <Link href="#infrastructure" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent border border-white/10 text-white font-medium text-base hover:bg-white/5 active:scale-95 transition-all flex items-center justify-center gap-2">
            {t.hero.btnSecondary}
          </Link>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 text-xs text-[#A1A1AA] font-mono"
        >
          {t.hero.disclaimer}
        </motion.p>

        {/* Hero Visual Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl mt-16 relative perspective-1000 z-20"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-20 pointer-events-none h-full" />
          <HeroMockup />
        </motion.div>

      </main>

      {/* Trusted By Section */}
      <section className="w-full border-y border-white/5 bg-black/40 py-8 relative z-30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
           <p className="text-[10px] font-mono uppercase tracking-widest text-[#A1A1AA] mb-6">{t.trusted}</p>
           <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock Logos */}
             <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 bg-white rounded-full"/> ACME Corp</div>
             <div className="flex items-center gap-2 font-bold text-xl tracking-tighter"><div className="w-6 h-6 bg-indigo-500 rotate-45"/> NEXUS</div>
             <div className="flex items-center gap-2 font-black text-xl italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">VELOCITY</div>
             <div className="flex items-center gap-2 font-bold text-xl"><Layers /> Stacked</div>
           </div>
        </div>
      </section>

      {/* Core Infrastructure Section */}
      <section id="infrastructure" className="w-full py-32 relative z-10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">{t.steps.title}</h2>
            <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">{t.steps.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard number="01" title={t.steps.s1} desc={t.steps.d1} icon={<CreditCard size={32} className="text-indigo-400" />} />
            <StepCard number="02" title={t.steps.s2} desc={t.steps.d2} icon={<PieChart size={32} className="text-emerald-400" />} />
            <StepCard number="03" title={t.steps.s3} desc={t.steps.d3} icon={<CheckCircle2 size={32} className="text-indigo-400" />} />
          </div>
        </div>
      </section>

      {/* Bento Grid Features Showcase */}
      <section id="features" className="w-full py-32 relative z-10 bg-indigo-500/5 border-y border-indigo-500/10 overflow-hidden">
        <div className="absolute top-[50%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400">{t.showcase.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              {t.showcase.title}
            </h2>
            <p className="text-[#A1A1AA] text-lg mb-8">
              {t.showcase.desc}
            </p>
            <ul className="flex flex-col gap-4 mb-10">
              {t.showcase.bullets.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-white text-sm font-medium">
                  <CheckCircle2 size={18} className="text-indigo-400" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-base hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all inline-block">
              {t.showcase.btn}
            </Link>
          </div>
          
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            {/* Bento Box 1: Live Pulse */}
            <div className="col-span-2 glass-panel p-6 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#A1A1AA] flex items-center gap-2">
                   <Activity size={12} className="text-emerald-400" /> {t.showcase.box1}
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
              <h4 className="text-white font-medium mb-1">{t.showcase.box2}</h4>
              <p className="text-2xl font-bold font-mono text-white tracking-tighter">$12.4k</p>
              <p className="text-[10px] text-zinc-500 font-mono mt-1">/ $15k Goal</p>
              <div className="h-1 w-full bg-white/5 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            {/* Bento Box 3: Global */}
            <div className="col-span-1 glass-panel-heavy p-6 rounded-3xl bg-black/60 group hover:border-white/20 transition-colors border-indigo-500/20">
              <Globe size={24} className="text-purple-400 mb-4" />
              <h4 className="text-white font-medium mb-1">{t.showcase.box3}</h4>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">{t.showcase.box3desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-32 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">{t.testimonials.title}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="glass-panel p-8 md:p-10 rounded-3xl relative group hover:-translate-y-2 transition-transform duration-500 flex flex-col">
              <Quote size={40} className="text-indigo-500/20 mb-6" />
              <p className="text-white text-base leading-relaxed mb-8 flex-1">"{t.testimonials.t1}"</p>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden shrink-0 border border-white/10">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=transparent" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white font-medium">{t.testimonials.n1.split(',')[0]}</span>
                  <span className="text-xs text-indigo-400 font-medium">{t.testimonials.n1.split(',')[1] || "CFO at TechFlow"}</span>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="glass-panel-heavy p-8 md:p-10 rounded-3xl relative border-indigo-500/30 group hover:-translate-y-2 transition-transform duration-500 flex flex-col shadow-[0_0_30px_rgba(99,102,241,0.1)]">
              <Quote size={40} className="text-indigo-500/30 mb-6" />
              <p className="text-white text-base leading-relaxed mb-8 flex-1">"{t.testimonials.t2}"</p>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden shrink-0 border border-white/10">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Marcus&backgroundColor=transparent" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white font-medium">{t.testimonials.n2.split(',')[0]}</span>
                  <span className="text-xs text-emerald-400 font-medium">{t.testimonials.n2.split(',')[1] || "Founder of BuildOps"}</span>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="glass-panel p-8 md:p-10 rounded-3xl relative group hover:-translate-y-2 transition-transform duration-500 flex flex-col">
              <Quote size={40} className="text-indigo-500/20 mb-6" />
              <p className="text-white text-base leading-relaxed mb-8 flex-1">"{t.testimonials.t3}"</p>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden shrink-0 border border-white/10">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Elena&backgroundColor=transparent" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white font-medium">{t.testimonials.n3.split(',')[0]}</span>
                  <span className="text-xs text-purple-400 font-medium">{t.testimonials.n3.split(',')[1] || "VP Ops"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="w-full py-20 relative z-10 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">{t.cta.title}</h2>
          <p className="text-lg text-indigo-200 mb-10 max-w-2xl mx-auto relative z-10">{t.cta.desc}</p>
          <Link href="/register" className="inline-block px-10 py-5 rounded-2xl bg-white text-black font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] relative z-10">
            {t.cta.btn}
          </Link>
        </div>
      </section>

      {/* Expanded Footer */}
      <footer id="security" className="w-full pt-20 pb-12 border-t border-white/10 bg-[#030303] relative z-10 mt-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-indigo-400" />
              <span className="font-bold text-xl tracking-tight text-white">Aura Finance</span>
            </div>
            <p className="text-xs text-zinc-500 mb-6">The operating system for modern business finance.</p>
            <div className="flex gap-4">
              <span className="text-xs text-zinc-400 flex items-center gap-1.5"><ShieldCheck size={14}/> SOC-2 Certified</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">{t.footer.product}</h4>
            <ul className="flex flex-col gap-3 text-sm text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">{t.footer.cards}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t.footer.budgets}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t.footer.inbox}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">{t.footer.company}</h4>
            <ul className="flex flex-col gap-3 text-sm text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">{t.footer.about}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t.footer.careers}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t.footer.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">{t.footer.legal}</h4>
            <ul className="flex flex-col gap-3 text-sm text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">{t.footer.terms}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t.footer.privacy}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {t.footer.rights}
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

function HeroMockup() {
  return (
    <div className="w-full aspect-[21/9] rounded-t-3xl border border-white/10 border-b-0 bg-[#0A0A0A] overflow-hidden relative shadow-[0_-20px_80px_rgba(99,102,241,0.15)] flex mx-auto max-w-5xl">
      <div className="w-48 h-full border-r border-white/5 bg-[#050505] p-4 flex flex-col gap-2">
        <div className="w-24 h-4 rounded bg-white/10 mb-6" />
        <div className="w-full h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30" />
        <div className="w-full h-8 rounded-lg bg-white/5" />
        <div className="w-full h-8 rounded-lg bg-white/5" />
        <div className="w-full h-8 rounded-lg bg-white/5" />
      </div>
      
      <div className="flex-1 p-8 flex flex-col gap-6 relative">
        <div className="absolute top-[0] right-[10%] w-[300px] h-[300px] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none z-0" />
        
        <div className="flex justify-between items-center z-10">
          <div>
            <div className="w-32 h-6 rounded bg-white/20 mb-2" />
            <div className="w-48 h-3 rounded bg-white/10" />
          </div>
          <div className="flex gap-3">
            <div className="w-24 h-8 rounded-lg bg-white/10" />
            <div className="w-8 h-8 rounded-full bg-indigo-500/50" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 z-10 mt-4">
          <div className="col-span-2 h-48 rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col justify-end">
            <div className="flex items-end gap-2 h-24 w-full">
              {[40, 70, 45, 90, 65, 80, 50, 100, 75, 60].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-indigo-500/40 hover:bg-indigo-400 transition-colors" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="col-span-1 h-48 rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mb-2">
              <Activity size={16} className="text-emerald-400" />
            </div>
            <div className="w-3/4 h-4 rounded bg-white/20" />
            <div className="w-1/2 h-8 rounded bg-white/40 mt-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
