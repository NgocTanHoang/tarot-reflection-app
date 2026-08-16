import React from 'react';
import { TarotCard } from '../types';
import { Sparkles } from 'lucide-react';
import { TarotCardGraphic } from './TarotCardGraphic';

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
  const isVi = language === 'vi';

  // Dimension classes with explicit width and height
  const sizeClasses = {
    sm: 'w-28 sm:w-32 h-44 sm:h-52',
    md: 'w-48 sm:w-56 h-72 sm:h-84',
    lg: 'w-60 sm:w-68 h-92 sm:h-[400px]',
    xl: 'w-72 sm:w-80 h-[420px] sm:h-[480px]'
  }[size];

  return (
    <div
      onClick={onFlip}
      className={`perspective group select-none cursor-pointer flex items-center justify-center ${className}`}
      role="button"
      tabIndex={0}
      aria-label={card ? (isVi ? card.nameVi : card.name) : 'Tarot card'}
    >
      <div
        className={`relative ${sizeClasses} rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] shadow-2xl ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* CARD BACK */}
        <div className="absolute inset-0 w-full h-full rounded-2xl p-2 sm:p-2.5 [backface-visibility:hidden] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border-2 border-amber-500/30 shadow-inner flex items-center justify-center overflow-hidden">
          {/* Celestial background patterns */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent pointer-events-none" />
          <div className="w-full h-full border border-amber-400/25 rounded-xl flex flex-col items-center justify-center p-3 relative overflow-hidden bg-slate-900/40 backdrop-blur-sm">
            <div className="absolute top-2 left-2 text-[10px] font-serif text-amber-400/50">✦</div>
            <div className="absolute top-2 right-2 text-[10px] font-serif text-amber-400/50">✦</div>
            <div className="absolute bottom-2 left-2 text-[10px] font-serif text-amber-400/50">✦</div>
            <div className="absolute bottom-2 right-2 text-[10px] font-serif text-amber-400/50">✦</div>
            
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-amber-400/35 flex items-center justify-center bg-amber-500/10 shadow-inner">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-400/45 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
            </div>
            <span className="mt-3 text-[9px] sm:text-[10px] font-serif tracking-[0.25em] uppercase text-amber-300/70 text-center font-bold">
              Tarot Mirror
            </span>
          </div>
        </div>

        {/* CARD FRONT */}
        <div className="absolute inset-0 w-full h-full rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden flex items-center justify-center">
          {card && (
            <TarotCardGraphic
              card={card}
              isReversed={isReversed}
              size={size}
              showLabel={showLabel}
              language={language}
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};
