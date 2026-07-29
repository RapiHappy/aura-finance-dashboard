"use client";

import React, { useState, useEffect } from 'react';
import { api, CorporateCard } from '@/lib/api';
import { SlimSidebar, TopNavigation } from '@/components/dashboard/Widgets';
import { VirtualCard } from '@/components/cards/VirtualCard';
import { CardSettings, CardTransactions } from '@/components/cards/CardDetails';
import { Plus } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function CardsPage() {
  const [cards, setCards] = useState<CorporateCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
          <button className="px-5 py-3 bg-white text-black rounded-xl text-[13px] font-medium hover:scale-[1.02] active:scale-95 spring-transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
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
              <div className="shrink-0 w-[320px] h-[200px] rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-zinc-500 hover:text-white hover:border-white/30 hover:bg-white/[0.02] cursor-pointer spring-transition snap-center group">
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

      </main>
    </div>
  );
}
