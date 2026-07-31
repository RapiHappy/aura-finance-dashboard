import React from 'react';
import { LedgerTransaction } from '@/lib/api';
import { X, UploadCloud, MapPin, Receipt, Clock } from 'lucide-react';
import { Badge } from '../dashboard/Widgets';
import { useTranslation } from '@/lib/i18n';

export function SlideoverDetails({ 
  txn, 
  onClose 
}: { 
  txn: LedgerTransaction | null; 
  onClose: () => void;
}) {
  const { lang } = useTranslation();
  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 spring-transition ${
          txn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Slideover Panel */}
      <div className={`fixed top-0 right-0 h-full w-[400px] bg-[#050505] border-l border-white/5 z-50 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] spring-transition flex flex-col ${
        txn ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {txn && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-white/[0.03]">
              <h2 className="text-[13px] font-medium text-white tracking-tight">{lang === 'RU' ? 'Детали Транзакции' : 'Transaction Details'}</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 spring-transition"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col gap-8">
              
              {/* Header Info */}
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  {txn.merchant.initial}
                </div>
                <div>
                  <h3 className="text-2xl font-medium tracking-tight text-white mb-1">{txn.merchant.name}</h3>
                  <p className="text-[13px] font-mono tracking-tighter text-zinc-400">{txn.amount} USD</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={txn.status === 'cleared' ? 'default' : 'warning'}>{txn.status}</Badge>
                  <Badge variant="default">{txn.merchant.category}</Badge>
                </div>
              </div>

              {/* Receipt Upload Zone */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Receipt size={12} /> {lang === 'RU' ? 'Чек и Инвойс' : 'Receipt & Invoice'}
                </h4>
                {txn.compliance.hasReceipt ? (
                   <div className="p-4 border border-white/5 rounded-2xl bg-white/[0.02] flex items-center justify-between group cursor-pointer hover:border-white/10 spring-transition">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-indigo-500/10 rounded-lg border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                         <Receipt size={16} />
                       </div>
                       <div>
                         <p className="text-[13px] font-medium text-white tracking-tight">Invoice_{txn.merchant.name.replace(/\s+/g,'')}.pdf</p>
                         <p className="text-[11px] text-zinc-500 mt-0.5 tracking-wide">124 KB • {lang === 'RU' ? 'Загружено ' : 'Uploaded by '}{txn.user.name}</p>
                       </div>
                     </div>
                   </div>
                ) : (
                   <div className="p-6 border border-dashed border-amber-500/30 rounded-2xl bg-amber-500/5 flex flex-col items-center text-center gap-3 cursor-pointer hover:bg-amber-500/10 hover:border-amber-500/50 spring-transition group">
                     <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center group-hover:-translate-y-1 spring-transition">
                       <UploadCloud size={16} />
                     </div>
                     <div>
                       <p className="text-[13px] font-medium text-amber-500 tracking-tight mb-1">{lang === 'RU' ? 'Отсутствует чек' : 'Missing Receipt'}</p>
                       <p className="text-[11px] text-amber-500/70 tracking-wide max-w-[200px]">{lang === 'RU' ? 'Перетащите сюда инвойс или чек, чтобы прикрепить его.' : 'Drag and drop an invoice or receipt here to attach it.'}</p>
                     </div>
                   </div>
                )}
              </div>

              {/* Audit Trail */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Clock size={12} /> {lang === 'RU' ? 'История Аудита' : 'Audit Trail'}
                </h4>
                <div className="p-5 border border-white/5 rounded-2xl bg-white/[0.02] flex flex-col gap-4 relative">
                  <div className="absolute left-[29px] top-8 bottom-8 w-px bg-white/5" />
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    </div>
                    <div>
                      <p className="text-[13px] text-white tracking-tight">{lang === 'RU' ? 'Транзакция Подтверждена' : 'Transaction Cleared'}</p>
                      <p className="text-[11px] text-zinc-500 tracking-wide mt-0.5">{txn.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                    </div>
                    <div>
                      <p className="text-[13px] text-white tracking-tight">{lang === 'RU' ? 'Платеж Инициирован' : 'Payment Initiated'}</p>
                      <p className="text-[11px] text-zinc-500 tracking-wide mt-0.5">{lang === 'RU' ? '12 Окт, 14:29' : 'Oct 12, 14:29'}</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </>
  );
}
