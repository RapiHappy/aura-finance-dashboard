import React, { useState } from 'react';
import { LedgerTransaction } from '@/lib/api';
import { Paperclip, MoreHorizontal, FileWarning, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '../dashboard/Widgets';
import { useTranslation } from '@/lib/i18n';

export function TransactionRow({ 
  txn, 
  isSelected, 
  onSelect,
  onClick
}: { 
  txn: LedgerTransaction; 
  isSelected: boolean; 
  onSelect: (id: string) => void;
  onClick: (txn: LedgerTransaction) => void;
}) {
  const { t, lang } = useTranslation();
  const amountNum = parseFloat(txn.amount.replace(/[^0-9.-]+/g,""));
  const isPositive = amountNum > 0;

  return (
    <tr 
      onClick={() => onClick(txn)}
      className={`group cursor-pointer border-b border-white/[0.02] spring-transition relative ${
        isSelected ? 'bg-indigo-500/[0.08]' : 'hover:bg-white/[0.02]'
      }`}
    >
      {/* Accent line for selection */}
      <td className="w-0 p-0 absolute left-0 top-0 h-full">
        <div className={`h-full w-0.5 spring-transition ${isSelected ? 'bg-indigo-500' : 'bg-transparent group-hover:bg-white/10'}`} />
      </td>

      <td className="py-4 pl-6 pr-4" onClick={(e) => e.stopPropagation()}>
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => onSelect(txn.id)}
          className="w-4 h-4 rounded border-white/10 bg-black text-indigo-500 focus:ring-indigo-500/50 focus:ring-offset-black cursor-pointer appearance-none checked:bg-indigo-500 checked:border-indigo-500 relative before:content-[''] before:absolute before:inset-0 checked:before:bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExLjY2NjYgMy41TDUuMjQ5OTIgOS45MTY2N0wyLjMzMzI1IDciIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] before:bg-center before:bg-no-repeat transition-colors"
        />
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[13px] font-medium text-white shrink-0">
            {txn.merchant.initial}
          </div>
          <div>
            <p className="text-[13px] font-medium text-white tracking-tight">{txn.merchant.name}</p>
            <p className="text-[11px] text-zinc-500 tracking-wide mt-0.5">{txn.merchant.category}</p>
          </div>
        </div>
      </td>

      <td className="py-4 px-4">
        <p className="text-[13px] text-zinc-400 tracking-wide">{txn.date}</p>
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          {txn.user.name !== 'System' && (
             <div className="w-5 h-5 rounded-full overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
               <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${txn.user.name}&backgroundColor=transparent`} alt="" />
             </div>
          )}
          <span className="text-[13px] text-zinc-300">{txn.user.name}</span>
        </div>
      </td>

      <td className="py-4 px-4 text-right">
        <span className={`text-[13px] font-mono tracking-tighter ${isPositive ? 'text-emerald-400' : 'text-zinc-200'}`}>
          {txn.amount}
        </span>
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
           <Badge variant={txn.status === 'cleared' ? 'default' : 'warning'}>
             {txn.status === 'cleared' ? t.cleared : t.pending}
           </Badge>
           {txn.compliance.outOfPolicy && <Badge variant="critical">{lang === 'RU' ? 'Политика' : 'Policy'}</Badge>}
        </div>
      </td>

      <td className="py-4 pl-4 pr-6">
        <div className="flex items-center justify-end gap-3">
          {txn.compliance.hasReceipt ? (
            <div className="w-8 h-8 flex items-center justify-center text-zinc-500">
               <Paperclip size={14} />
            </div>
          ) : (
            <div className="w-8 h-8 flex items-center justify-center text-amber-500/80 bg-amber-500/10 rounded-lg border border-amber-500/20" title="Missing Receipt">
               <FileWarning size={14} />
            </div>
          )}
          
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 spring-transition opacity-0 group-hover:opacity-100 focus:opacity-100">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function TransactionTable({ 
  transactions, 
  isLoading,
  onRowClick
}: { 
  transactions: LedgerTransaction[]; 
  isLoading: boolean;
  onRowClick: (txn: LedgerTransaction) => void;
}) {
  const { t, lang } = useTranslation();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [actionState, setActionState] = useState<string | null>(null);

  const handleBulkAction = (actionName: string) => {
    setActionState(actionName);
    setTimeout(() => {
      setActionState(null);
      setSelectedIds(new Set());
    }, 1500);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(transactions.map(t => t.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
    <div className="w-full relative flex-1 min-h-0 bg-[#030303] border border-white/[0.03] rounded-2xl overflow-hidden stagger-3 flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
      
      {/* Scrollable Table Area */}
      <div className="flex-1 overflow-auto no-scrollbar relative">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-[#030303]/90 backdrop-blur-md z-10 border-b border-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <tr>
              <th className="py-4 pl-6 pr-4 w-12">
                <input 
                  type="checkbox" 
                  checked={selectedIds.size === transactions.length && transactions.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-white/10 bg-black text-indigo-500 focus:ring-indigo-500/50 appearance-none checked:bg-indigo-500 checked:border-indigo-500 relative before:content-[''] before:absolute before:inset-0 checked:before:bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExLjY2NjYgMy41TDUuMjQ5OTIgOS45MTY2N0wyLjMzMzI1IDciIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] before:bg-center before:bg-no-repeat transition-colors cursor-pointer"
                />
              </th>
              <th className="py-4 px-4 text-[10px] uppercase tracking-widest text-zinc-500 font-mono font-medium">{t.merchant}</th>
              <th className="py-4 px-4 text-[10px] uppercase tracking-widest text-zinc-500 font-mono font-medium">{t.date}</th>
              <th className="py-4 px-4 text-[10px] uppercase tracking-widest text-zinc-500 font-mono font-medium">User / {lang === 'RU' ? 'Сотрудник' : 'User'}</th>
              <th className="py-4 px-4 text-[10px] uppercase tracking-widest text-zinc-500 font-mono font-medium text-right">{t.amount}</th>
              <th className="py-4 px-4 text-[10px] uppercase tracking-widest text-zinc-500 font-mono font-medium">{t.status}</th>
              <th className="py-4 pl-4 pr-6 text-[10px] uppercase tracking-widest text-zinc-500 font-mono font-medium text-right">Receipt / {lang === 'RU' ? 'Чек' : 'Receipt'}</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
               Array.from({ length: 10 }).map((_, i) => (
                 <tr key={i} className="border-b border-white/[0.02]">
                   <td className="py-4 px-6"><div className="w-4 h-4 bg-white/[0.02] rounded animate-pulse" /></td>
                   <td className="py-4 px-4"><div className="w-32 h-8 bg-white/[0.02] rounded animate-pulse" /></td>
                   <td className="py-4 px-4"><div className="w-20 h-4 bg-white/[0.02] rounded animate-pulse" /></td>
                   <td className="py-4 px-4"><div className="w-24 h-5 bg-white/[0.02] rounded animate-pulse" /></td>
                   <td className="py-4 px-4"><div className="w-20 h-4 bg-white/[0.02] rounded animate-pulse ml-auto" /></td>
                   <td className="py-4 px-4"><div className="w-16 h-5 bg-white/[0.02] rounded animate-pulse" /></td>
                   <td className="py-4 px-6"><div className="w-8 h-8 bg-white/[0.02] rounded animate-pulse ml-auto" /></td>
                 </tr>
               ))
            ) : transactions.length === 0 ? (
               <tr>
                 <td colSpan={7} className="py-32 text-center text-zinc-500">
                   <div className="flex flex-col items-center gap-3">
                     <AlertCircle className="w-8 h-8 text-zinc-700" />
                     <p className="text-[13px] tracking-wide">{lang === 'RU' ? 'Транзакции не найдены.' : 'No transactions found.'}</p>
                   </div>
                 </td>
               </tr>
            ) : (
               transactions.map(txn => (
                 <TransactionRow 
                   key={txn.id} 
                   txn={txn} 
                   isSelected={selectedIds.has(txn.id)} 
                   onSelect={handleSelect}
                   onClick={onRowClick}
                 />
               ))
            )}
          </tbody>
        </table>
      </div>

      {/* Floating Bulk Action Bar */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 glass-panel-heavy rounded-2xl px-2 py-2 flex items-center gap-3 spring-transition z-20 ${
        selectedIds.size > 0 ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}>
         <div className="px-4 py-1.5 bg-white/10 rounded-xl">
           <span className="text-[13px] font-medium text-white">{selectedIds.size}</span>
           <span className="text-[13px] text-zinc-400 ml-1">{lang === 'RU' ? 'выбрано' : 'selected'}</span>
         </div>
         <div className="w-px h-6 bg-white/10 mx-1" />
         <button 
           disabled={actionState !== null}
           onClick={() => handleBulkAction('categorize')}
           className="px-4 py-2 hover:bg-white/10 rounded-xl text-[13px] font-medium text-white spring-transition active:scale-95 disabled:opacity-50"
         >
           {actionState === 'categorize' ? (lang === 'RU' ? 'Обработка...' : 'Categorizing...') : (lang === 'RU' ? 'Категоризовать' : 'Categorize')}
         </button>
         <button 
           disabled={actionState !== null}
           onClick={() => handleBulkAction('export')}
           className="px-4 py-2 hover:bg-white/10 rounded-xl text-[13px] font-medium text-white spring-transition active:scale-95 disabled:opacity-50"
         >
           {actionState === 'export' ? (lang === 'RU' ? 'Экспорт...' : 'Exporting...') : (lang === 'RU' ? 'Экспорт' : 'Export')}
         </button>
         <button 
           disabled={actionState !== null}
           onClick={() => handleBulkAction('ping')}
           className="px-4 py-2 hover:bg-amber-500/10 hover:text-amber-400 rounded-xl text-[13px] font-medium text-white spring-transition active:scale-95 disabled:opacity-50"
         >
           {actionState === 'ping' ? (lang === 'RU' ? 'Отправка...' : 'Sending...') : (lang === 'RU' ? 'Пинг' : 'Ping Owners')}
         </button>
      </div>
    </div>
  );
}
