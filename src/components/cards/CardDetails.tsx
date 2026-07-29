import React, { useState, useEffect } from 'react';
import { CorporateCard } from '@/lib/api';
import { Settings2, Snowflake, Play, CreditCard, Activity, Copy, ArrowUpRight, Loader2 } from 'lucide-react';
import { Badge } from '../dashboard/Widgets';
import { motion, AnimatePresence } from 'framer-motion';

export function CardSettings({ card }: { card: CorporateCard }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFrozen, setIsFrozen] = useState(card.status !== 'Active');
  
  // Premium loading states
  const [isRevealing, setIsRevealing] = useState(false);
  const [isFreezing, setIsFreezing] = useState(false);

  useEffect(() => {
    setIsFrozen(card.status !== 'Active');
    setIsRevealed(false);
    setIsRevealing(false);
    setIsFreezing(false);
  }, [card.id, card.status]);

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealing(true);
      setTimeout(() => {
        setIsRevealing(false);
        setIsRevealed(true);
      }, 600);
    } else {
      setIsRevealed(false);
    }
  };

  const handleFreezeToggle = (freeze: boolean) => {
    setIsFreezing(true);
    setTimeout(() => {
      setIsFreezing(false);
      setIsFrozen(freeze);
    }, 600);
  };

  const pct = Math.min((card.spent / card.limit) * 100, 100);
  const isNearLimit = pct > 80;

  const currentStatus = isFrozen ? 'Frozen' : 'Active';

  return (
    <div className="flex-1 min-w-[320px] max-w-[500px] p-8 border border-white/[0.03] rounded-3xl bg-[#030303] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex flex-col stagger-2">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <Settings2 size={14} /> Card Settings
        </h3>
        <Badge variant={currentStatus === 'Active' ? 'success' : 'default'}>{currentStatus}</Badge>
      </div>

      {/* Spend Limit Progress */}
      <div className="flex flex-col gap-4 mb-10">
        <div className="flex justify-between items-end">
          <span className="text-[13px] font-medium text-white tracking-tight">Monthly Limit</span>
          <div className="text-[13px] font-mono tracking-tighter">
            <span className={isNearLimit ? 'text-amber-400' : 'text-emerald-400'}>${card.spent.toLocaleString()}</span>
            <span className="text-zinc-600"> / ${card.limit.toLocaleString()}</span>
          </div>
        </div>
        <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden relative">
          <div 
            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${isNearLimit ? 'bg-amber-500' : 'bg-indigo-500'}`} 
            style={{ width: `${pct}%` }} 
          />
        </div>
        <div className="flex justify-between text-[11px] text-zinc-500 tracking-wide">
          <span>Resets in 14 days</span>
          <button className="text-indigo-400 hover:text-indigo-300 spring-transition">Edit Limit</button>
        </div>
      </div>

      {/* Details List */}
      <div className="flex flex-col gap-4 mb-auto">
        <div className="flex justify-between items-center py-3 border-b border-white/[0.02]">
          <span className="text-[13px] text-zinc-400">Cardholder</span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden bg-zinc-900 shrink-0">
              <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${card.holder}&backgroundColor=transparent`} alt="" />
            </div>
            <span className="text-[13px] font-medium text-white">{card.holder}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b border-white/[0.02]">
          <span className="text-[13px] text-zinc-400">Card Number</span>
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => {
            if (isRevealed) {
              navigator.clipboard.writeText(`4111 2222 3333 ${card.last4}`);
              alert('Card number copied to clipboard!');
            }
          }}>
            <span className="text-[13px] font-mono text-white tracking-widest flex items-center gap-2">
              {isRevealing ? (
                <span className="flex items-center gap-2 text-indigo-400">
                  <Loader2 size={14} className="animate-spin" /> Decrypting...
                </span>
              ) : isRevealed ? (
                `4111 2222 3333 ${card.last4}`
              ) : (
                `•••• •••• •••• ${card.last4}`
              )}
            </span>
            {isRevealed && <Copy size={12} className="text-zinc-600 group-hover:text-white spring-transition" />}
          </div>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-white/[0.02]">
          <span className="text-[13px] text-zinc-400">Billing Address</span>
          <span className="text-[13px] text-white">Orbit HQ, NY</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-8">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReveal}
          disabled={isRevealing}
          className="flex-1 py-3 bg-white text-black rounded-xl text-[13px] font-medium transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-80"
        >
          {isRevealing ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />} 
          {isRevealing ? 'Decrypting...' : isRevealed ? 'Hide Details' : 'Reveal Details'}
        </motion.button>
        
        {currentStatus === 'Active' ? (
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFreezeToggle(true)}
            disabled={isFreezing}
            className="px-5 py-3 bg-white/5 text-white rounded-xl text-[13px] font-medium hover:bg-amber-500/10 hover:text-amber-400 transition-colors flex items-center justify-center gap-2 border border-white/5 hover:border-amber-500/20 disabled:opacity-80"
          >
            {isFreezing ? <Loader2 size={16} className="animate-spin text-amber-400" /> : <Snowflake size={16} />} 
            {isFreezing ? 'Freezing...' : 'Freeze'}
          </motion.button>
        ) : (
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFreezeToggle(false)}
            disabled={isFreezing}
            className="px-5 py-3 bg-white/5 text-white rounded-xl text-[13px] font-medium hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors flex items-center justify-center gap-2 border border-white/5 hover:border-emerald-500/20 disabled:opacity-80"
          >
            {isFreezing ? <Loader2 size={16} className="animate-spin text-emerald-400" /> : <Play size={16} />} 
            {isFreezing ? 'Unfreezing...' : 'Unfreeze'}
          </motion.button>
        )}
      </div>
    </div>
  );
}

export function CardTransactions({ card }: { card: CorporateCard }) {
  // Mock recent transactions based on the card id
  const recent = [
    { id: '1', date: 'Today, 14:30', merchant: 'AWS', amount: '-$12,450.00', status: 'Cleared' },
    { id: '2', date: 'Yesterday, 09:15', merchant: 'Cloudflare', amount: '-$200.00', status: 'Cleared' },
    { id: '3', date: 'Oct 10, 11:20', merchant: 'Datadog', amount: '-$850.00', status: 'Pending' },
  ];

  return (
    <div className="flex-[2] min-w-[400px] p-8 border border-white/[0.03] rounded-3xl bg-[#030303] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex flex-col stagger-3">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <Activity size={14} /> Recent Activity
        </h3>
        <button 
          onClick={() => window.location.href = '/transactions'}
          className="text-[13px] text-zinc-500 hover:text-white spring-transition flex items-center gap-1"
        >
          View Ledger <ArrowUpRight size={14} className="lucide lucide-arrow-up-right" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {recent.map(t => (
          <div key={t.id} className="p-4 border border-white/[0.02] rounded-2xl flex items-center justify-between hover:bg-white/[0.02] spring-transition cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[14px] font-medium text-white shrink-0 group-hover:scale-105 spring-transition">
                {t.merchant[0]}
              </div>
              <div>
                <p className="text-[13px] font-medium text-white tracking-tight">{t.merchant}</p>
                <p className="text-[11px] text-zinc-500 tracking-wide mt-0.5">{t.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[14px] font-mono tracking-tighter text-zinc-300">{t.amount}</p>
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">{t.status}</p>
            </div>
          </div>
        ))}

        {recent.length === 0 && (
          <div className="py-20 text-center text-zinc-500 text-[13px]">
            No recent transactions for this card.
          </div>
        )}
      </div>
    </div>
  );
}
