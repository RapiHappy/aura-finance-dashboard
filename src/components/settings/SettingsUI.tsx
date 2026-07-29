"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Bell, Shield, Paintbrush, ArrowLeft, Monitor, Lock, LogOut, Check, LogIn, UserPlus, Globe } from 'lucide-react';
import { Badge } from '@/components/dashboard/Widgets';
import { useAuth } from '@/lib/auth';
import { useTranslation } from '@/lib/i18n';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'preferences', label: 'Preferences', icon: Paintbrush },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

export function SettingsUI() {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, isAuthenticated, logout } = useAuth();
  const { t, lang, setLang } = useTranslation();
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-8 pb-20 md:pb-0 z-10 relative">
      
      {/* Top Header Navigation Bar with Back Button */}
      <header className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-all active:scale-95 shadow-sm"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-indigo-400" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-zinc-500">
            <span>Aura OS</span>
            <span>/</span>
            <span className="text-white">{t.settings}</span>
          </div>
        </div>

        {/* User Auth Info & Logout Button */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLang(lang === 'EN' ? 'RU' : 'EN')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-all mr-2"
          >
            <Globe size={14} />
            {lang}
          </button>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/5">
                <img 
                  src={user?.avatar || "https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=transparent"} 
                  alt={user?.name || "User"} 
                  className="w-6 h-6 rounded-full bg-zinc-800"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium text-white leading-tight">{user?.name}</span>
                  <span className="text-[10px] text-zinc-500 leading-tight">{user?.email}</span>
                </div>
              </div>

              <button
                onClick={() => { logout(); router.push('/login'); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-all active:scale-95"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
              >
                <LogIn size={14} />
                <span>Sign In</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)]"
              >
                <UserPlus size={14} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Settings Grid */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Left Settings Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-medium tracking-tight text-white mb-6 px-1"
          >
            {t.settings}
          </motion.h1>
          
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 whitespace-nowrap md:whitespace-normal group ${
                    isActive ? 'text-white font-medium' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-white/10 rounded-2xl border border-white/10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon size={18} className="relative z-10" />
                  <span className="relative z-10 text-[13px] tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Settings Card */}
        <main className="flex-1 min-w-0 glass-panel-heavy rounded-3xl p-6 md:p-10 relative overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">
            {activeTab === 'profile' && <ProfileSettings key="profile" />}
            {activeTab === 'preferences' && <PreferencesSettings key="preferences" />}
            {activeTab === 'notifications' && <NotificationsSettings key="notifications" />}
            {activeTab === 'security' && <SecuritySettings key="security" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// --- TAB COMPONENTS ---

function ProfileSettings() {
  const { user, login } = useAuth();
  const [firstName, setFirstName] = useState(user?.name ? user.name.split(' ')[0] : 'Alex');
  const [lastName, setLastName] = useState(user?.name && user.name.split(' ').length > 1 ? user.name.split(' ').slice(1).join(' ') : 'Smith');
  const [email, setEmail] = useState(user?.email || 'alex.smith@aura.fi');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, `${firstName} ${lastName}`);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <motion.form
      onSubmit={handleSave}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-10"
    >
      <div>
        <h2 className="text-xl font-medium text-white mb-2 tracking-tight">Public Profile</h2>
        <p className="text-sm text-zinc-500">This information will be displayed publicly across your organization workspace.</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden relative group shrink-0">
          <img 
            src={user?.avatar || "https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=transparent"} 
            alt="Avatar" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
            <span className="text-xs font-medium text-white">Change</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="px-5 py-2.5 bg-white text-black text-xs font-medium rounded-xl hover:scale-105 active:scale-95 transition-all">Upload New</button>
          <button type="button" className="px-5 py-2.5 bg-transparent border border-white/10 text-white text-xs font-medium rounded-xl hover:bg-white/5 transition-all">Remove</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">First Name</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">Last Name</label>
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors" 
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors" 
          />
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
        {saved ? (
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
            <Check size={16} /> Changes saved successfully!
          </span>
        ) : <span />}
        <button 
          type="submit" 
          className="px-6 py-3 bg-indigo-500 text-white text-xs font-medium rounded-xl hover:bg-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95 transition-all"
        >
          Save Changes
        </button>
      </div>
    </motion.form>
  );
}

function PreferencesSettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-10"
    >
      <div>
        <h2 className="text-xl font-medium text-white mb-2 tracking-tight">App Preferences</h2>
        <p className="text-sm text-zinc-500">Customize your experience and workspace look.</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between p-4 border border-white/5 rounded-2xl bg-black/20 hover:bg-black/40 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><Monitor size={18} className="text-indigo-400" /></div>
            <div>
              <h4 className="text-sm font-medium text-white">Theme</h4>
              <p className="text-xs text-zinc-500 mt-0.5">Toggle between light and dark mode</p>
            </div>
          </div>
          <select className="bg-black border border-white/10 text-xs text-white px-4 py-2 rounded-lg outline-none">
            <option>Dark Mode (Default)</option>
            <option>Light Mode</option>
            <option>System Default</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 border border-white/5 rounded-2xl bg-black/20 hover:bg-black/40 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><span className="text-indigo-400 font-bold">$</span></div>
            <div>
              <h4 className="text-sm font-medium text-white">Base Currency</h4>
              <p className="text-xs text-zinc-500 mt-0.5">Your primary display currency</p>
            </div>
          </div>
          <select className="bg-black border border-white/10 text-xs text-white px-4 py-2 rounded-lg outline-none">
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}

function NotificationsSettings() {
  const [toggles, setToggles] = useState({ push: true, email: false, updates: true });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-10"
    >
      <div>
        <h2 className="text-xl font-medium text-white mb-2 tracking-tight">Notifications</h2>
        <p className="text-sm text-zinc-500">Control when and how you are notified.</p>
      </div>

      <div className="flex flex-col gap-4">
        <ToggleRow 
          title="Push Notifications" 
          desc="Receive alerts on your device for large transactions" 
          active={toggles.push} 
          onClick={() => toggle('push')} 
        />
        <ToggleRow 
          title="Email Summaries" 
          desc="Weekly digest of your spending and budget" 
          active={toggles.email} 
          onClick={() => toggle('email')} 
        />
        <ToggleRow 
          title="Product Updates" 
          desc="News about Aura OS features and changelogs" 
          active={toggles.updates} 
          onClick={() => toggle('updates')} 
        />
      </div>
    </motion.div>
  );
}

function SecuritySettings() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-10"
    >
      <div>
        <h2 className="text-xl font-medium text-white mb-2 tracking-tight">Security & Access</h2>
        <p className="text-sm text-zinc-500">Manage your password, 2FA and connected devices.</p>
      </div>

      <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-medium text-white flex items-center gap-2"><Lock size={16} className="text-red-400" /> Two-Factor Authentication</h4>
          <p className="text-xs text-zinc-500 mt-1">Add an extra layer of security to your account.</p>
        </div>
        <button className="px-5 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium rounded-xl hover:bg-red-500/20 transition-all">Enable 2FA</button>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Active Sessions</h3>
        <div className="p-4 border border-white/5 rounded-2xl bg-black flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <Monitor size={20} className="text-zinc-400" />
            <div>
              <p className="text-sm font-medium text-white">MacBook Pro 16"</p>
              <p className="text-xs text-zinc-500">San Francisco, CA • Active now</p>
            </div>
          </div>
          <Badge variant="success">Current</Badge>
        </div>
        <div 
          onClick={() => { logout(); router.push('/login'); }}
          className="p-4 border border-white/5 rounded-2xl bg-black flex items-center justify-between group cursor-pointer hover:border-red-500/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <LogOut size={20} className="text-red-400 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm font-medium text-white">Log Out All Sessions</p>
              <p className="text-xs text-zinc-500">Sign out of your account on all devices</p>
            </div>
          </div>
          <Badge variant="critical">Sign Out</Badge>
        </div>
      </div>
    </motion.div>
  );
}

// Helper Toggle Component
function ToggleRow({ title, desc, active, onClick }: { title: string, desc: string, active: boolean, onClick: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 border border-white/5 rounded-2xl bg-black/20 hover:bg-black/40 transition-colors cursor-pointer" onClick={onClick}>
      <div>
        <h4 className="text-sm font-medium text-white">{title}</h4>
        <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
      </div>
      <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${active ? 'bg-indigo-500' : 'bg-zinc-800'}`}>
        <motion.div 
          className="w-4 h-4 bg-white rounded-full shadow-sm"
          animate={{ x: active ? 16 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </div>
  );
}
