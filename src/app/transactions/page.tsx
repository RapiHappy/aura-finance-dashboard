"use client";

import React, { useState, useEffect } from 'react';
import { api, LedgerTransaction } from '@/lib/api';
import { SmartFilters } from '@/components/ledger/SmartFilters';
import { TransactionTable } from '@/components/ledger/TransactionTable';
import { SlideoverDetails } from '@/components/ledger/SlideoverDetails';
import { SlimSidebar } from '@/components/dashboard/Widgets';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<LedgerTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTxn, setSelectedTxn] = useState<LedgerTransaction | null>(null);

  useEffect(() => {
    api.getLedgerTransactions().then((data) => {
      setTransactions(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-indigo-500/30 relative">
      
      {/* Ambient Glows */}
      <div className="ambient-glow-purple top-[-20%] right-[-10%]" />

      <SlimSidebar />

      {/* Main Ledger Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative p-10 pl-28 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mask-image-linear-top" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 60%)' }} />

        <div className="max-w-[1800px] w-full mx-auto h-full flex flex-col relative z-10">
          <SmartFilters />
          <TransactionTable 
            transactions={transactions} 
            isLoading={isLoading} 
            onRowClick={(txn) => setSelectedTxn(txn)} 
          />
        </div>

      </main>

      <SlideoverDetails txn={selectedTxn} onClose={() => setSelectedTxn(null)} />
    </div>
  );
}
