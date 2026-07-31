import React, { useRef, useState } from 'react';
import { CorporateCard } from '@/lib/api';
import { Snowflake } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function VirtualCard({ card, isSelected, onClick }: { card: CorporateCard, isSelected: boolean, onClick: () => void }) {
  const { t, lang } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-15 to 15 degrees)
    const rotateY = -15 + (x / rect.width) * 30;
    const rotateX = 15 - (y / rect.height) * 30;
    
    setRotation({ x: rotateX, y: rotateY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare({ ...glare, opacity: 0 });
  };

  return (
    <div 
      className={`shrink-0 cursor-pointer perspective-1000 transition-all duration-500 ease-out group ${
        isSelected ? 'scale-105 z-10' : 'scale-95 opacity-60 hover:opacity-100 hover:scale-100'
      }`}
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-[320px] h-[200px] rounded-2xl relative overflow-hidden transition-transform duration-200 ease-out shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/10"
        style={{
          transform: isSelected ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'rotateX(0) rotateY(0)',
          transformStyle: 'preserve-3d',
          background: `linear-gradient(135deg, ${card.colorStart}, ${card.colorEnd})`,
        }}
      >
        {/* Frozen Overlay */}
        {card.status === 'Frozen' && (
          <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center">
            <Snowflake className="w-8 h-8 text-blue-300 mb-2 opacity-80" />
            <span className="text-[13px] font-medium text-blue-200 tracking-widest uppercase">{t.frozen}</span>
          </div>
        )}

        {/* Glare Effect */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 60%)`,
            opacity: isSelected ? glare.opacity : 0,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Card Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
          <div className="flex justify-between items-start">
            <div>
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-black font-bold text-xs mb-3">A</div>
              <h3 className="text-white font-medium text-[15px] tracking-tight">{card.name}</h3>
              <p className="text-white/50 text-[11px] tracking-widest uppercase mt-1">
                {card.type === 'Virtual' ? (lang === 'RU' ? 'Виртуальная' : 'Virtual Card') : (lang === 'RU' ? 'Физическая' : 'Physical Card')}
              </p>
            </div>
            {/* NFC Icon / Chip */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-50">
              <path d="M4 8C6.5 6.5 9.5 6 12 6C14.5 6 17.5 6.5 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 12C8 11 10 10.5 12 10.5C14 10.5 16 11 18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 16C9.5 15.5 10.5 15 12 15C13.5 15 14.5 15.5 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <div>
            <div className="flex justify-between items-end">
              <div className="flex gap-4 items-center">
                <span className="text-white/60 font-mono text-[14px] tracking-[0.2em]">••••</span>
                <span className="text-white/60 font-mono text-[14px] tracking-[0.2em]">••••</span>
                <span className="text-white/60 font-mono text-[14px] tracking-[0.2em]">••••</span>
                <span className="text-white font-mono text-[16px] tracking-widest">{card.last4}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-white/80 font-medium text-[13px] tracking-tight">{card.holder}</span>
              <span className="text-white/60 font-bold italic text-[15px] tracking-tighter">{card.network}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
