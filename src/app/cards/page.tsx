"use client";

import React, { useState, useEffect } from 'react';
import { api, CorporateCard } from '@/lib/api';
import { SlimSidebar, TopNavigation } from '@/components/dashboard/Widgets';
import { VirtualCard } from '@/components/cards/VirtualCard';
import { CardSettings, CardTransactions } from '@/components/cards/CardDetails';
import { Plus, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';

export default function CardsPage() {
  const [cards, setCards] = useState<CorporateCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [cardType, setCardType] = useState('virtual');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    api.getCorporateCards().then((data) => {
      setCards(data);
      if (data.length > 0) setSelectedId(data[0].id);
      setIsLoading(false);
    });
  }, []);

  const selectedCard = cards.find(c => c.id === selectedId);

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-indigo-500/30 relative">
      
      {/* Ambient Glows */}
      <div className="ambient-glow-blue bottom-[-20%] left-[-10%]" />

      <SlimSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent pl-28">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mask-image-linear-top" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 40%)' }} />

        {/* Top Header */}
        <TopNavigation />
        <header className="px-10 py-10 pt-24 flex justify-between items-end relative z-10 shrink-0 stagger-1">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-white mb-2">{t.cards}</h1>
            <div className="flex gap-4">
              <span className="text-[13px] text-zinc-400"><span className="text-white font-medium">{cards.filter(c => c.status === 'Active').length}</span> {t.active}</span>
              <span className="text-[13px] text-zinc-600">/</span>
              <span className="text-[13px] text-zinc-400"><span className="text-zinc-500 font-medium">{cards.filter(c => c.status === 'Frozen').length}</span> {t.frozen}</span>
            </div>
          </div>
          <button 
            onClick={() => setShowIssueModal(true)}
            className="px-5 py-3 bg-white text-black rounded-xl text-[13px] font-medium hover:scale-[1.02] active:scale-95 spring-transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <Plus size={16} /> {t.issueNewCard}
          </button>
        </header>

        {/* Horizontal Card Scroller */}
        <div className="w-full relative z-20 shrink-0 h-[280px]">
          <div className="absolute inset-0 overflow-x-auto overflow-y-hidden no-scrollbar px-10 flex items-center gap-6 stagger-2 snap-x snap-mandatory">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="shrink-0 w-[320px] h-[200px] rounded-2xl bg-white/[0.02] border border-white/[0.05] animate-pulse" />
              ))
            ) : (
              cards.map(card => (
                <div key={card.id} className="snap-center">
                  <VirtualCard 
                    card={card} 
                    isSelected={card.id === selectedId} 
                    onClick={() => setSelectedId(card.id)} 
                  />
                </div>
              ))
            )}
            
            {/* "Add Card" Ghost slot */}
            {!isLoading && (
              <div 
                onClick={() => setShowIssueModal(true)}
                className="shrink-0 w-[320px] h-[200px] rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-zinc-500 hover:text-white hover:border-white/30 hover:bg-white/[0.02] cursor-pointer spring-transition snap-center group"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 spring-transition">
                  <Plus size={20} />
                </div>
                <span className="text-[13px] font-medium tracking-tight">{t.issueVirtualCard}</span>
              </div>
            )}
          </div>
          
          {/* Fade edges */}
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black to-transparent pointer-events-none" />
        </div>

        {/* Split Screen Details */}
        <div className="flex-1 w-full max-w-[1800px] mx-auto px-10 pb-10 flex gap-8 relative z-10 min-h-0 overflow-y-auto no-scrollbar">
          {selectedCard && (
            <>
              <CardSettings card={selectedCard} />
              <CardTransactions card={selectedCard} />
            </>
          )}
        </div>

        {/* Issue Card Modal Overlay */}
        {showIssueModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl flex flex-col gap-6">
              <h2 className="text-xl font-medium tracking-tight">Issue New Card</h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 relative">
                  <label className="text-[11px] text-zinc-500 font-mono uppercase tracking-widest">Card Type</label>
                  
                  {/* Custom Dropdown */}
                  <div 
                    onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                    className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none text-sm cursor-pointer flex justify-between items-center hover:bg-white/10 transition-colors"
                  >
                    <span>{cardType === 'virtual' ? 'Virtual Card' : 'Physical Card'}</span>
                    <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-300 ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {isTypeDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[#111] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
                      >
                        <div 
                          onClick={() => { setCardType('virtual'); setIsTypeDropdownOpen(false); }}
                          className={`px-4 py-3 text-sm cursor-pointer hover:bg-white/5 transition-colors ${cardType === 'virtual' ? 'bg-indigo-500/10 text-indigo-400 font-medium' : 'text-white'}`}
                        >
                          Virtual Card
                        </div>
                        <div 
                          onClick={() => { setCardType('physical'); setIsTypeDropdownOpen(false); }}
                          className={`px-4 py-3 text-sm cursor-pointer hover:bg-white/5 transition-colors ${cardType === 'physical' ? 'bg-indigo-500/10 text-indigo-400 font-medium' : 'text-white'}`}
                        >
                          Physical Card
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] text-zinc-500 font-mono uppercase tracking-widest">Monthly Limit</label>
                  <input type="number" placeholder="5000" className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none text-sm" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button 
                  onClick={() => setShowIssueModal(false)}
                  className="px-5 py-2.5 rounded-xl text-[13px] font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Card Issued Successfully!');
                    setShowIssueModal(false);
                  }}
                  className="px-5 py-2.5 bg-indigo-500 rounded-xl text-[13px] font-medium hover:bg-indigo-400 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                >
                  Confirm Issue
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
