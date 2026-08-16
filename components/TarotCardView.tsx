import React, { useState } from 'react';
import { TarotCard } from '../types';
import { Sparkles, Eye, Compass, Moon, Sun, Flame, Droplets, Wind, Mountain } from 'lucide-react';

interface TarotCardViewProps {
  card?: TarotCard | null;
  isReversed?: boolean;
  isFlipped?: boolean;
  onFlip?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  className?: string;
  language?: 'vi' | 'en';
}

export const TarotCardView: React.FC<TarotCardViewProps> = ({
  card,
  isReversed = false,
  isFlipped = true,
  onFlip,
  size = 'md',
  showLabel = true,
  className = '',
  language = 'vi'
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-36',
    md: 'w-44 h-68',
    lg: 'w-60 h-92',
    xl: 'w-72 h-[420px]'
  }[size];

  const isVi = language === 'vi';

  const getSuitIcon = (suit: string | null) => {
    switch (suit) {
      case 'Wands': return <Flame className="w-4 h-4 text-amber-400" />;
      case 'Cups': return <Droplets className="w-4 h-4 text-cyan-400" />;
      case 'Swords': return <Wind className="w-4 h-4 text-sky-300" />;
      case 'Pentacles': return <Mountain className="w-4 h-4 text-emerald-400" />;
      default: return <Sparkles className="w-4 h-4 text-amber-300" />;
    }
  };

  return (
    <div
      onClick={onFlip}
      className={`perspective group select-none cursor-pointer ${className}`}
      role="button"
      tabIndex={0}
      aria-label={card ? (isVi ? card.nameVi : card.name) : 'Tarot card'}
    >
      <div
        className={`relative ${sizeClasses} rounded-2xl transition-all duration-700 [transform-style:preserve-3d] shadow-2xl ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* CARD BACK */}
        <div className="absolute inset-0 w-full h-full rounded-2xl p-2.5 [backface-visibility:hidden] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border-2 border-amber-500/30 shadow-inner flex items-center justify-center overflow-hidden">
          {/* Subtle celestial patterns */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent"></div>
          <div className="w-full h-full border border-amber-400/20 rounded-xl flex flex-col items-center justify-center p-3 relative overflow-hidden bg-slate-900/40 backdrop-blur-sm">
            <div className="absolute top-2 left-2 text-[10px] font-serif text-amber-400/40">✦</div>
            <div className="absolute top-2 right-2 text-[10px] font-serif text-amber-400/40">✦</div>
            <div className="absolute bottom-2 left-2 text-[10px] font-serif text-amber-400/40">✦</div>
            <div className="absolute bottom-2 right-2 text-[10px] font-serif text-amber-400/40">✦</div>
            
            <div className="w-16 h-16 rounded-full border border-amber-400/30 flex items-center justify-center bg-amber-500/5 shadow-inner">
              <div className="w-10 h-10 rounded-full border border-amber-400/40 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
            </div>
            <span className="mt-3 text-[10px] font-serif tracking-[0.3em] uppercase text-amber-300/60 text-center font-medium">
              Tarot Mirror
            </span>
          </div>
        </div>

        {/* CARD FRONT */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden bg-slate-900 border-2 border-amber-400/40 shadow-2xl flex flex-col ${
            isReversed ? 'rotate-180' : ''
          }`}
        >
          {card && (
            <>
              <div className="relative flex-grow w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                {!imageError ? (
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    loading="lazy"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Fallback SVG artistic display if image fails */
                  <div className="w-full h-full p-4 flex flex-col items-center justify-between bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-amber-100">
                    <div className="text-xs font-serif text-amber-400/70 tracking-widest uppercase">
                      {card.arcana} Arcana
                    </div>
                    <div className="w-20 h-20 rounded-full border-2 border-amber-400/40 flex items-center justify-center bg-amber-500/10">
                      {getSuitIcon(card.suit)}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-serif font-bold text-amber-200">{isVi ? card.nameVi : card.name}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{card.keywords[0]}</p>
                    </div>
                  </div>
                )}

                {/* Top badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/30 text-[10px] text-amber-300 font-serif">
                  {getSuitIcon(card.suit)}
                  <span>{card.rank !== null ? card.rank : card.number}</span>
                </div>

                {isReversed && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-indigo-950/90 backdrop-blur-md border border-indigo-400/40 text-[9px] text-indigo-300 font-medium tracking-wide uppercase">
                    {isVi ? 'Góc Nhìn Nội Tâm' : 'Reversed'}
                  </div>
                )}
              </div>

              {showLabel && (
                <div className="p-2.5 bg-slate-950/95 border-t border-amber-400/20 text-center">
                  <h4 className="text-amber-200 font-serif font-bold text-xs tracking-wider uppercase truncate">
                    {isVi ? card.nameVi : card.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 tracking-wide truncate mt-0.5">
                    {isVi ? card.keywordsVi.slice(0, 2).join(' • ') : card.keywords.slice(0, 2).join(' • ')}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
