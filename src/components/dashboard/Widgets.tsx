"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AreaChart, Area, Tooltip, ResponsiveContainer, Dot } from 'recharts';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, ArrowDownRight, CheckCircle2, XCircle, Activity, Layers, CreditCard, PieChart, Settings } from 'lucide-react';
import { DashboardData } from '@/lib/api';

// --- Sidebar ---
export function SlimSidebar() {
  const pathname = usePathname() || '/';
  
  const navItems = [
    { href: '/', icon: Activity },
    { href: '/transactions', icon: Layers },
    { href: '/cards', icon: CreditCard },
    { href: '/budgets', icon: PieChart }
  ];

  return (
    <motion.aside 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6 md:top-1/2 md:-translate-y-1/2 w-[calc(100%-3rem)] sm:w-auto md:w-16 py-4 md:py-6 px-6 md:px-0 glass-floating-dock rounded-3xl flex flex-row md:flex-col items-center justify-between md:justify-start gap-2 sm:gap-4 md:gap-8 z-50"
    >
      <div className="hidden md:flex w-10 h-10 bg-white rounded-xl items-center justify-center text-black font-bold text-xl leading-none tracking-tighter mb-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
        A
      </div>
      <div className="flex flex-row md:flex-col gap-2 sm:gap-4 md:w-full items-center text-zinc-500">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={`w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer group relative ${isActive ? 'text-white' : 'hover:text-white'}`}>
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative z-10">
                <Icon size={18} />
              </motion.div>
            </Link>
          );
        })}
      </div>
      <Link href="/settings" className={`md:mt-auto w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer relative group ${pathname === '/settings' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
        {pathname === '/settings' && (
          <motion.div 
            layoutId="activeNav"
            className="absolute inset-0 bg-white/10 rounded-xl"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <motion.div whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.95 }} className="relative z-10 transition-transform duration-300">
          <Settings size={18} />
        </motion.div>
      </Link>
    </motion.aside>
  );
}

// --- Reusable UI ---
export function Badge({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default'|'success'|'warning'|'critical'|'brand'|'review' }) {
  const variants = {
    default: 'bg-white/[0.03] text-zinc-400 border-white/[0.05]',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    critical: 'bg-red-500/10 text-red-400 border-red-500/20',
    brand: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    review: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-medium border uppercase tracking-widest ${variants[variant]}`}>{children}</span>;
}

// --- Top Navigation ---
export function TopNavigation() {
  const pathname = usePathname() || '/';
  const pathClean = pathname.replace('/', '');
  const pageName = pathname === '/' ? 'Overview' : pathClean.charAt(0).toUpperCase() + pathClean.slice(1);

  return (
    <header className="absolute top-0 left-0 w-full px-10 py-8 flex justify-between items-center z-50 pointer-events-none stagger-1">
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <span className="text-black font-bold text-lg leading-none tracking-tighter">A</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
          <span className="text-white">Aura OS</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500 hover:text-white cursor-pointer spring-transition">{pageName}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="glass-panel flex p-1 rounded-lg">
          {['7D', '30D', '1Y'].map(period => (
            <button key={period} className={`px-4 py-1.5 rounded-md text-[11px] font-mono tracking-widest spring-transition ${period === '30D' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}>
              {period}
            </button>
          ))}
        </div>
        <div className="w-9 h-9 rounded-full bg-zinc-900 border border-white/5 cursor-pointer overflow-hidden flex items-center justify-center hover:scale-105 hover:border-white/20 spring-transition">
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=transparent" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}

// Custom Chart Dot for Events
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (payload.event) {
    return (
      <svg x={cx - 4} y={cy - 4} width={8} height={8} fill="white" className="animate-pulse">
        <circle cx={4} cy={4} r={4} />
      </svg>
    );
  }
  return null;
};

// --- Luminous Chart Hero ---
export function LuminousChart({ data, isLoading }: { data?: DashboardData | null, isLoading: boolean }) {
  return (
    <div className="w-full h-[65vh] min-h-[500px] relative">
      {/* Intense Center Glow */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Floating Metrics Overlay */}
      <div className="absolute top-40 left-10 z-20 flex gap-8">
        <div className="glass-panel-heavy p-8 rounded-3xl min-w-[320px] stagger-2 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 spring-transition" />
          <p className="text-[10px] text-zinc-500 font-mono mb-4 uppercase tracking-widest">Total Cash</p>
          <h2 className="text-6xl font-semibold tracking-tighter font-mono text-white mb-3">
            {isLoading ? <div className="h-14 w-48 bg-white/5 animate-pulse rounded-md" /> : data?.totalCash}
          </h2>
          <div className="flex items-center gap-1 text-[13px] text-emerald-400 font-medium">
            <ArrowUpRight size={14} />
            <span className="tracking-tight">{isLoading ? '...' : data?.cashChange?.split(' ')[1]}</span>
            <span className="text-zinc-600 font-normal ml-1">vs last mo</span>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl min-w-[280px] stagger-3">
          <p className="text-[10px] text-zinc-500 font-mono mb-4 uppercase tracking-widest">Burn Rate</p>
          <h2 className="text-5xl font-semibold tracking-tighter font-mono text-white mb-3">
            {isLoading ? <div className="h-12 w-40 bg-white/5 animate-pulse rounded-md" /> : data?.burnRate?.split(' ')[0]}
          </h2>
          <div className="flex items-center gap-1 text-[13px] text-emerald-400 font-medium">
            <ArrowDownRight size={14} />
            <span className="tracking-tight">{isLoading ? '...' : data?.burnChange?.split(' ')[1]}</span>
            <span className="text-zinc-600 font-normal ml-1">vs last mo</span>
          </div>
        </div>
      </div>

      {/* AI Insight Overlay */}
      <div className="absolute top-40 right-10 z-20 glass-panel border-glow p-5 rounded-2xl flex items-start gap-4 max-w-[340px] stagger-4">
        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
          <Sparkles size={14} className="text-indigo-400" />
        </div>
        <div>
          <h4 className="text-[13px] font-medium text-white mb-1.5 tracking-tight">AI Summary</h4>
          <p className="text-xs text-zinc-400 leading-relaxed tracking-wide">
            {isLoading ? <span className="animate-pulse bg-white/10 text-transparent rounded">Loading insight analysis...</span> : "Burn decreased by 14% due to paused AWS servers. Runway extended to 18 months."}
          </p>
        </div>
      </div>

      {/* The Chart */}
      <div className="absolute inset-0 z-10 pt-[25vh]">
        {isLoading ? (
          <div className="w-full h-full bg-gradient-to-t from-white/[0.02] to-transparent animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="glowColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity={0.6}/>
                  <stop offset="100%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="strokeGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="50%" stopColor="#a5b4fc" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(5,5,5,0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '12px' }}
                itemStyle={{ color: '#fff', fontFamily: 'monospace', fontSize: '14px', letterSpacing: '-0.5px' }}
                labelStyle={{ color: '#71717a', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}
                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="url(#strokeGlow)" 
                strokeWidth={2} 
                fill="url(#glowColor)" 
                animationDuration={2000}
                animationEasing="ease-out"
                activeDot={{ r: 6, fill: '#fff', stroke: '#818cf8', strokeWidth: 2 }}
                dot={<CustomDot />}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      
      {/* Fade out bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-15 pointer-events-none" />
    </div>
  );
}

// --- Live Pulse Feed ---
export function LivePulseFeed({ data, isLoading }: { data?: DashboardData | null, isLoading: boolean }) {
  return (
    <div className="col-span-12 md:col-span-4 p-8 border border-white/[0.03] rounded-3xl bg-[#030303] relative overflow-hidden group stagger-3 hover:border-white/[0.08] spring-transition">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 spring-transition" />
      <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-8 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" /> Live Pulse
      </h3>
      <div className="flex flex-col gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-10 w-full bg-white/[0.02] animate-pulse rounded-lg" />)
        ) : (
          data?.livePulse.map((item, i) => (
            <div key={item.id} className="flex items-center justify-between group/item cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/[0.05] flex items-center justify-center overflow-hidden shrink-0 group-hover/item:border-white/20 spring-transition">
                  {item.user === 'System' ? (
                    <div className="w-3 h-3 bg-white/20 rounded-sm" />
                  ) : (
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${item.user}&backgroundColor=transparent`} alt={item.user} />
                  )}
                </div>
                <div>
                  <p className="text-[13px] text-zinc-400 tracking-tight">
                    <span className="font-medium text-white group-hover/item:text-indigo-400 spring-transition">{item.user}</span> {item.action} <span className="text-zinc-300">{item.merchant}</span>
                  </p>
                  <p className="text-[10px] text-zinc-600 mt-0.5 tracking-wider">{item.time}</p>
                </div>
              </div>
              <span className={`text-[13px] font-mono tracking-tighter ${item.type === 'expense' ? 'text-zinc-500' : 'text-emerald-400'}`}>
                {item.amount}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// --- Budget Progress ---
export function BudgetProgress({ data, isLoading }: { data?: DashboardData | null, isLoading: boolean }) {
  return (
    <div className="col-span-12 md:col-span-4 p-8 border border-white/[0.03] rounded-3xl bg-[#030303] group stagger-4 hover:border-white/[0.08] spring-transition">
      <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-8">Budget Status</h3>
      <div className="flex flex-col justify-center h-full gap-8 pb-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-8 w-full bg-white/[0.02] animate-pulse rounded-lg" />)
        ) : (
          data?.budgets.map(budget => {
            const pct = (budget.spent / budget.total) * 100;
            return (
              <div key={budget.id} className="flex flex-col gap-3 group/budget cursor-pointer relative">
                <div className="flex justify-between items-end">
                  <span className="text-[13px] font-medium text-zinc-400 group-hover/budget:text-white spring-transition tracking-tight">{budget.category}</span>
                  <div className="text-[11px] font-mono tracking-tighter">
                    <span className="text-white">${(budget.spent/1000).toFixed(1)}k</span>
                    <span className="text-zinc-600"> / ${(budget.total/1000).toFixed(1)}k</span>
                  </div>
                </div>
                <div className="h-1 w-full bg-white/[0.03] rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%`, backgroundColor: budget.color }} />
                  {/* Goal Marker */}
                  <div className="absolute top-0 w-0.5 h-full bg-white/50" style={{ left: '80%' }} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// --- Smart Inbox ---
export function SmartInbox({ data, isLoading }: { data?: DashboardData | null, isLoading: boolean }) {
  return (
    <div className="col-span-12 md:col-span-4 p-8 border border-white/[0.03] rounded-3xl bg-[#030303] group stagger-4 hover:border-white/[0.08] spring-transition flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          Action Inbox
        </h3>
        {!isLoading && <Badge variant="brand">{data?.smartInbox.length} Req</Badge>}
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-16 w-full bg-white/[0.02] animate-pulse rounded-xl" />)
        ) : (
          data?.smartInbox.map(ticket => (
            <div key={ticket.id} className="p-4 border border-white/[0.03] rounded-2xl bg-black hover:bg-[#0a0a0a] hover:border-white/10 spring-transition cursor-pointer group/ticket relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[13px] font-medium text-white tracking-tight">{ticket.title}</h4>
                  <p className="text-[11px] text-zinc-500 mt-1 tracking-wide">{ticket.subtitle}</p>
                </div>
                <Badge variant={ticket.status}>{ticket.status}</Badge>
              </div>
              
              {/* Magnetic Buttons (reveal on hover via absolute position overlay to avoid layout shift) */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover/ticket:opacity-100 spring-transition flex items-center justify-center gap-2 px-4">
                <button className="flex-1 bg-white text-black py-2 rounded-xl text-[11px] font-medium hover:scale-[1.02] active:scale-95 spring-transition flex items-center justify-center gap-1.5"><CheckCircle2 size={14}/> Approve</button>
                <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[11px] font-medium hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 spring-transition border border-white/5"><XCircle size={14}/></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
