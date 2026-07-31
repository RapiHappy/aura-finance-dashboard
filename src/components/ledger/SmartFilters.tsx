import React, { useState } from 'react';
import { Search, Filter, Download, X, FileText, Table, Code, Check, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';

export function SmartFilters() {
  const { t, lang } = useTranslation();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [isExporting, setIsExporting] = useState(false);

  const tabs = [
    { name: lang === 'RU' ? 'Все Транзакции' : 'All Transactions', count: 1402, active: true },
    { name: lang === 'RU' ? 'Нет чека' : 'Missing Receipts', count: 12, alert: true },
    { name: lang === 'RU' ? 'Вне политики' : 'Out of Policy', count: 3, error: true },
  ];

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Mock File Download trigger
      let content = "";
      let filename = `aura_ledger_${new Date().toISOString().slice(0, 10)}`;
      let mimeType = "text/plain";

      if (exportFormat === 'csv') {
        content = "Date,Merchant,Category,Amount,Status,User\n2026-07-28,AWS,Cloud Infrastructure,-$4200.00,cleared,Alex M.\n2026-07-27,Stripe,Payment Processing,-$840.50,cleared,System\n2026-07-26,Figma,Design Tools,-$120.00,cleared,Sarah K.";
        filename += ".csv";
        mimeType = "text/csv";
      } else if (exportFormat === 'json') {
        content = JSON.stringify([
          { date: '2026-07-28', merchant: 'AWS', category: 'Cloud Infrastructure', amount: -4200, status: 'cleared', user: 'Alex M.' },
          { date: '2026-07-27', merchant: 'Stripe', category: 'Payment Processing', amount: -840.5, status: 'cleared', user: 'System' }
        ], null, 2);
        filename += ".json";
        mimeType = "application/json";
      } else {
        content = "%PDF-1.4 Aura Finance Ledger Export Mock Data";
        filename += ".pdf";
        mimeType = "application/pdf";
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsExporting(false);
      setIsExportModalOpen(false);
    }, 1200);
  };

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  return (
    <div className="flex flex-col gap-6 mb-8 w-full stagger-2 relative">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-medium tracking-tight text-white">{t.smartLedger}</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-indigo-400 spring-transition" />
            <input 
              type="text" 
              placeholder={t.searchTxn} 
              className="pl-9 pr-12 py-2 bg-[#050505] border border-white/[0.05] rounded-xl text-[13px] text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 w-64 spring-transition placeholder:text-zinc-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md text-[10px] font-mono">⌘</kbd>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md text-[10px] font-mono">K</kbd>
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
              className={`p-2.5 bg-[#050505] border rounded-xl spring-transition shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] active:scale-95 ${
                isFilterModalOpen || filterCategory !== 'all' || filterStatus !== 'all'
                  ? 'text-indigo-400 border-indigo-500/50 bg-indigo-500/10' 
                  : 'text-zinc-400 border-white/[0.05] hover:text-white hover:border-white/10'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>

            {/* Filter Popover */}
            <AnimatePresence>
              {isFilterModalOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-72 glass-panel-heavy rounded-2xl p-5 border border-white/10 shadow-2xl z-30 flex flex-col gap-4"
                >
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-xs font-medium text-white tracking-tight">{lang === 'RU' ? 'Фильтры' : 'Filters'}</span>
                    <button 
                      onClick={() => { setFilterCategory('all'); setFilterStatus('all'); }}
                      className="text-[11px] text-zinc-400 hover:text-indigo-400 transition-colors font-mono"
                    >
                      {lang === 'RU' ? 'Сбросить' : 'Reset'}
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">{lang === 'RU' ? 'Категория' : 'Category'}</label>
                    <select 
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500/50"
                    >
                      <option value="all">{lang === 'RU' ? 'Все категории' : 'All Categories'}</option>
                      <option value="Cloud Infrastructure">{lang === 'RU' ? 'Облачная Инфраструктура' : 'Cloud Infrastructure'}</option>
                      <option value="Payment Processing">{lang === 'RU' ? 'Платежи' : 'Payment Processing'}</option>
                      <option value="Design Tools">{lang === 'RU' ? 'Дизайн и ПО' : 'Design Tools'}</option>
                      <option value="Marketing">{lang === 'RU' ? 'Маркетинг' : 'Marketing'}</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">{lang === 'RU' ? 'Статус' : 'Status'}</label>
                    <select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500/50"
                    >
                      <option value="all">{lang === 'RU' ? 'Все статусы' : 'All Statuses'}</option>
                      <option value="cleared">{lang === 'RU' ? 'Проведена' : 'Cleared'}</option>
                      <option value="pending">{lang === 'RU' ? 'В обработке' : 'Pending'}</option>
                    </select>
                  </div>

                  <button 
                    onClick={() => setIsFilterModalOpen(false)}
                    className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-xs font-medium spring-transition active:scale-95 mt-1"
                  >
                    {lang === 'RU' ? 'Применить' : 'Apply Filters'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={() => setIsExportModalOpen(true)}
            className="px-4 py-2.5 bg-white text-black rounded-xl text-[13px] font-medium hover:scale-[1.02] active:scale-95 spring-transition flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <Download className="w-4 h-4" /> 
            {lang === 'RU' ? 'Экспорт' : 'Export'}
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-white/[0.03] w-full pb-px">
        {tabs.map((tab) => (
          <button 
            key={tab.name}
            className={`px-4 py-3 text-[13px] font-medium flex items-center gap-2 relative spring-transition ${
              tab.active ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab.name}
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono tracking-tighter ${
              tab.alert ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
              tab.error ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
              'bg-white/5 text-zinc-400 border border-white/5'
            }`}>
              {tab.count}
            </span>
            {tab.active && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-t-full shadow-[0_-2px_10px_rgba(255,255,255,0.5)]" />
            )}
          </button>
        ))}
      </div>

      {/* Export Report Modal */}
      <AnimatePresence>
        {isExportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExportModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-md glass-panel-heavy rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl z-10 flex flex-col gap-6"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-white tracking-tight">{lang === 'RU' ? 'Экспорт Выписки' : 'Export Ledger Report'}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{lang === 'RU' ? 'Выберите формат файла для выгрузки' : 'Select a file format to download transactions'}</p>
                </div>
                <button 
                  onClick={() => setIsExportModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 spring-transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Format Options */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setExportFormat('csv')}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 spring-transition ${
                    exportFormat === 'csv' ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400' : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:border-white/10'
                  }`}
                >
                  <Table size={24} />
                  <span className="text-xs font-medium">CSV</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Excel/Sheets</span>
                </button>

                <button
                  onClick={() => setExportFormat('json')}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 spring-transition ${
                    exportFormat === 'json' ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400' : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:border-white/10'
                  }`}
                >
                  <Code size={24} />
                  <span className="text-xs font-medium">JSON</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Raw Data</span>
                </button>

                <button
                  onClick={() => setExportFormat('pdf')}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 spring-transition ${
                    exportFormat === 'pdf' ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400' : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:border-white/10'
                  }`}
                >
                  <FileText size={24} />
                  <span className="text-xs font-medium">PDF</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Audit PDF</span>
                </button>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>{lang === 'RU' ? 'Записей:' : 'Records:'} 1,402</span>
                <span>{lang === 'RU' ? 'Размер:' : 'Size:'} ~45 KB</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setIsExportModalOpen(false)}
                  className="flex-1 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-medium hover:bg-white/10 spring-transition active:scale-95"
                >
                  {t.cancel}
                </button>
                <button 
                  disabled={isExporting}
                  onClick={handleDownload}
                  className="flex-1 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-xs font-medium spring-transition active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-50"
                >
                  {isExporting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {lang === 'RU' ? 'Скачивание...' : 'Downloading...'}
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      {lang === 'RU' ? 'Скачать отчет' : 'Download Report'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
