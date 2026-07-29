"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, User, ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/lib/auth';

interface AuthFormProps {
  initialMode?: 'login' | 'register';
}

export function AuthForm({ initialMode = 'login' }: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (mode === 'register' && !name) {
      setError('Please enter your full name');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (mode === 'login') {
        login(email);
      } else {
        register(name, email);
      }
      setIsLoading(false);
      router.push('/app'); // Redirect to Mini App instead of Landing
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden selection:bg-[#00E5FF]/30">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[0%] left-[0%] w-[500px] h-[500px] bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[0%] right-[0%] w-[500px] h-[500px] bg-[#8A2BE2]/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute inset-0 bg-noise z-0" />
      <div className="absolute inset-0 bg-grid-rc z-0" />

      {/* Top Header / Back Button */}
      <header className="flex justify-between items-center z-20 max-w-6xl mx-auto w-full">
        <Link 
          href="/" 
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/10 text-xs font-medium text-zinc-400 hover:text-white transition-all active:scale-95"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Landing</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#8A2BE2] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Sparkles size={16} className="text-black" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Aura Finance</span>
        </div>
      </header>

      {/* Center Auth Card */}
      <main className="flex-1 flex items-center justify-center my-8 z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md glass-panel-heavy p-8 sm:p-10 rounded-3xl relative border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Subtle top glow bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2]" />

          {/* Mode Switcher Tabs */}
          <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5 mb-8">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all relative ${
                mode === 'login' ? 'text-white' : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              {mode === 'login' && (
                <motion.div 
                  layoutId="authTab" 
                  className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">Sign In</span>
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all relative ${
                mode === 'register' ? 'text-white' : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              {mode === 'register' && (
                <motion.div 
                  layoutId="authTab" 
                  className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">Create Account</span>
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Start Earning Cash'}
            </h1>
            <p className="text-sm text-[#A1A1AA]">
              {mode === 'login' 
                ? 'Enter your credentials to access tasks' 
                : 'Takes 10 seconds. No KYC required.'}
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="mb-6">
            <button 
              type="button"
              onClick={() => { login('telegram.user@reviewcash.app', 'TG User'); router.push('/app'); }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#2AABEE]/10 border border-[#2AABEE]/20 rounded-xl hover:bg-[#2AABEE]/20 text-sm font-bold text-[#2AABEE] transition-all active:scale-95 group"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.97-.64-.34-.99.22-1.58.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
              </svg>
              <span>Login with Telegram</span>
            </button>
          </div>

          <div className="flex items-center gap-4 my-6">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A1A1AA]">or continue with email</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2"
                >
                  <ShieldCheck size={16} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {mode === 'register' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-1.5"
              >
                <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Alex Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00E5FF]/50 transition-all"
                  />
                </div>
              </motion.div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00E5FF]/50 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">Password</label>
                {mode === 'login' && (
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Reset link sent to email!'); }} className="text-[11px] text-[#00E5FF] hover:underline">Forgot?</a>
                )}
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00E5FF]/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 btn-neon w-full group disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'Access Tasks' : 'Start Earning'}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <button
              onClick={() => {
                login('demo@reviewcash.app', 'Alex Earner');
                router.push('/app');
              }}
              className="text-xs text-[#A1A1AA] hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-[#8A2BE2]" />
              <span>One-click Demo Login</span>
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="z-20 text-center text-xs text-zinc-600 font-mono">
        &copy; {new Date().getFullYear()} Aura Finance. Protected by Anti-Fraud AI.
      </footer>
    </div>
  );
}
