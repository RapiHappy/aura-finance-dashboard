"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Shield, Paintbrush, ChevronRight, Key, Monitor, Lock, LogOut } from 'lucide-react';
import { Badge } from '@/components/dashboard/Widgets';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'preferences', label: 'Preferences', icon: Paintbrush },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

export function SettingsUI() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-8 lg:gap-12 pb-20 md:pb-0">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-medium tracking-tight text-white mb-8 px-2"
        >
          Settings
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
                  isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
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
                <span className="relative z-10 text-[13px] font-medium tracking-wide">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
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
  );
}

// --- TAB COMPONENTS ---

function ProfileSettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-10"
    >
      <div>
        <h2 className="text-xl font-medium text-white mb-2 tracking-tight">Public Profile</h2>
        <p className="text-sm text-zinc-500">This information will be displayed publicly so be careful what you share.</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden relative group">
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=transparent" alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
            <span className="text-xs font-medium text-white">Change</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white text-black text-xs font-medium rounded-xl hover:scale-105 active:scale-95 transition-all">Upload New</button>
          <button className="px-5 py-2.5 bg-transparent border border-white/10 text-white text-xs font-medium rounded-xl hover:bg-white/5 transition-all">Remove</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">First Name</label>
          <input type="text" defaultValue="Alex" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">Last Name</label>
          <input type="text" defaultValue="Smith" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">Email Address</label>
          <input type="email" defaultValue="alex.smith@aura.fi" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex justify-end">
        <button className="px-6 py-3 bg-indigo-500 text-white text-xs font-medium rounded-xl hover:bg-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95 transition-all">Save Changes</button>
      </div>
    </motion.div>
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
            <option>Dark Mode</option>
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
        <div className="p-4 border border-white/5 rounded-2xl bg-black flex items-center justify-between group cursor-pointer hover:border-white/10 transition-colors">
          <div className="flex items-center gap-4">
            <Monitor size={20} className="text-zinc-600" />
            <div>
              <p className="text-sm font-medium text-white">iPhone 15 Pro</p>
              <p className="text-xs text-zinc-500">San Francisco, CA • 2 hours ago</p>
            </div>
          </div>
          <LogOut size={16} className="text-zinc-600 group-hover:text-red-400 transition-colors" />
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
