"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CreditCard, Layers, Activity, PieChart, Settings, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { lang } = useTranslation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { title: lang === 'RU' ? 'Перейти в Обзор (Дашборд)' : 'Go to Overview', path: '/dashboard', icon: Activity, group: 'Navigation' },
    { title: lang === 'RU' ? 'Перейти к Транзакциям' : 'Go to Transactions', path: '/transactions', icon: Layers, group: 'Navigation' },
    { title: lang === 'RU' ? 'Перейти к Карточкам' : 'Go to Corporate Cards', path: '/cards', icon: CreditCard, group: 'Navigation' },
    { title: lang === 'RU' ? 'Перейти к Бюджетам' : 'Go to Budgets', path: '/budgets', icon: PieChart, group: 'Navigation' },
    { title: lang === 'RU' ? 'Открыть Настройки' : 'Open Settings', path: '/settings', icon: Settings, group: 'Navigation' },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    router.push(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-28 px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className="relative w-full max-w-xl glass-panel-heavy rounded-2xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden z-10 flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.02]">
              <Search className="w-5 h-5 text-indigo-400 shrink-0" />
              <input 
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === 'RU' ? 'Поиск команд и страниц... (Esc для закрытия)' : 'Search commands & pages... (Esc to close)'}
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
              />
              <kbd className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-mono text-zinc-400">ESC</kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto no-scrollbar p-2 flex flex-col gap-1">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-500 font-mono">
                  {lang === 'RU' ? 'Ничего не найдено' : 'No results found'}
                </div>
              ) : (
                filteredCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <div 
                      key={cmd.path}
                      onClick={() => handleSelect(cmd.path)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-500/10 hover:border-indigo-500/20 border border-transparent cursor-pointer spring-transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/20 spring-transition">
                          <Icon size={16} />
                        </div>
                        <span className="text-xs font-medium text-white tracking-tight">{cmd.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 spring-transition text-indigo-400 text-xs font-mono">
                        <span>Jump</span>
                        <CornerDownLeft size={12} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer hint */}
            <div className="px-5 py-2.5 bg-white/[0.02] border-t border-white/5 flex justify-between items-center text-[11px] text-zinc-500 font-mono">
              <span>{lang === 'RU' ? 'Быстрый переход Raycast / Linear style' : 'Raycast / Linear style Spotlight'}</span>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[9px]">⌘K</kbd> {lang === 'RU' ? 'открыть' : 'toggle'}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
