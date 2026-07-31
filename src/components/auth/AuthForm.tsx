"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, User, ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useTranslation } from '@/lib/i18n';

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
  const { t, lang } = useTranslation();

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
      router.push('/dashboard'); 
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
          <span>{lang === 'RU' ? 'На главную' : 'Back to Landing'}</span>
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
              <span className="relative z-10">{t.signIn}</span>
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
              <span className="relative z-10">{t.register}</span>
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
              {mode === 'login' ? (lang === 'RU' ? 'С возвращением' : 'Welcome Back') : (lang === 'RU' ? 'Создать Аккаунт' : 'Create Account')}
            </h1>
            <p className="text-sm text-[#A1A1AA]">
              {mode === 'login' 
                ? (lang === 'RU' ? 'Введите ваши данные для доступа к дашборду' : 'Enter your credentials to access your dashboard')
                : (lang === 'RU' ? 'Начните работу с вашим аккаунтом за секунды.' : 'Get started with your account in seconds.')}
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="mb-6">
            <button 
              type="button"
              onClick={() => { login('founder@aurafinance.app', 'Founder'); router.push('/dashboard'); }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.08] text-sm font-medium text-white transition-all active:scale-95 group"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.35s.7 2.65 1.9 5.05l3.7-2.6z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
              </svg>
              <span>{lang === 'RU' ? 'Продолжить с Google' : 'Continue with Google'}</span>
            </button>
          </div>

          <div className="flex items-center gap-4 my-6">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A1A1AA]">or</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">{lang === 'RU' ? 'Полное Имя' : 'Full Name'}</label>
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
              <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">{lang === 'RU' ? 'Email Адрес' : 'Email Address'}</label>
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
                <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">{lang === 'RU' ? 'Пароль' : 'Password'}</label>
                {mode === 'login' && (
                  <a href="#" onClick={(e) => { e.preventDefault(); alert(lang === 'RU' ? 'Ссылка отправлена на почту!' : 'Reset link sent to email!'); }} className="text-[11px] text-[#00E5FF] hover:underline">{lang === 'RU' ? 'Забыли?' : 'Forgot?'}</a>
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
              className="mt-4 w-full py-3.5 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-medium text-xs rounded-xl shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? t.signIn : t.register}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <button
              type="button"
              onClick={() => {
                login('demo@aurafinance.app', 'Demo User');
                router.push('/dashboard');
              }}
              className="text-xs text-[#A1A1AA] hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-[#8A2BE2]" />
              <span>{lang === 'RU' ? 'Вход в демо-режим' : 'One-click Demo Login'}</span>
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
