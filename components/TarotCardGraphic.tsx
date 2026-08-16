import React from 'react';
import { TarotCard } from '../types';
import { Sparkles, Flame, Droplets, Wind, Mountain, Moon, Sun, Star, Eye, Shield, Crown, Feather, Zap } from 'lucide-react';

interface TarotCardGraphicProps {
  card: TarotCard;
  isReversed?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  className?: string;
  language?: 'vi' | 'en';
}

export const TarotCardGraphic: React.FC<TarotCardGraphicProps> = ({
  card,
  isReversed = false,
  size = 'md',
  showLabel = true,
  className = '',
  language = 'vi'
}) => {
  const isVi = language === 'vi';
  const isMajor = card.arcana === 'Major';

  // Dimensions
  const dimensions = {
    sm: { w: 'w-28 sm:w-32', h: 'h-44 sm:h-52', text: 'text-[11px]', title: 'text-xs', icon: 'w-4 h-4' },
    md: { w: 'w-48 sm:w-56', h: 'h-72 sm:h-84', text: 'text-xs', title: 'text-sm', icon: 'w-6 h-6' },
    lg: { w: 'w-60 sm:w-68', h: 'h-92 sm:h-[400px]', text: 'text-xs sm:text-sm', title: 'text-base', icon: 'w-8 h-8' },
    xl: { w: 'w-72 sm:w-80', h: 'h-[420px] sm:h-[480px]', text: 'text-sm', title: 'text-lg', icon: 'w-10 h-10' }
  }[size];

  // Colors & Themes by Suit
  const getTheme = () => {
    if (isMajor) {
      return {
        border: 'border-amber-400/60',
        bg: 'from-slate-900 via-indigo-950/80 to-slate-950',
        accent: 'text-amber-300',
        glow: 'rgba(212, 175, 55, 0.15)',
        banner: 'bg-amber-400/15 border-amber-400/30 text-amber-200'
      };
    }
    switch (card.suit) {
      case 'Wands':
        return {
          border: 'border-amber-500/60',
          bg: 'from-amber-950/40 via-stone-900 to-slate-950',
          accent: 'text-amber-400',
          glow: 'rgba(245, 158, 11, 0.15)',
          banner: 'bg-amber-500/15 border-amber-500/30 text-amber-200'
        };
      case 'Cups':
        return {
          border: 'border-cyan-400/60',
          bg: 'from-cyan-950/40 via-slate-900 to-slate-950',
          accent: 'text-cyan-300',
          glow: 'rgba(6, 182, 212, 0.15)',
          banner: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-200'
        };
      case 'Swords':
        return {
          border: 'border-sky-400/60',
          bg: 'from-sky-950/40 via-slate-900 to-slate-950',
          accent: 'text-sky-300',
          glow: 'rgba(56, 189, 248, 0.15)',
          banner: 'bg-sky-500/15 border-sky-500/30 text-sky-200'
        };
      case 'Pentacles':
        return {
          border: 'border-emerald-400/60',
          bg: 'from-emerald-950/40 via-stone-900 to-slate-950',
          accent: 'text-emerald-300',
          glow: 'rgba(16, 185, 129, 0.15)',
          banner: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200'
        };
      default:
        return {
          border: 'border-amber-400/60',
          bg: 'from-slate-900 via-indigo-950 to-slate-950',
          accent: 'text-amber-300',
          glow: 'rgba(212, 175, 55, 0.15)',
          banner: 'bg-amber-400/15 border-amber-400/30 text-amber-200'
        };
    }
  };

  const theme = getTheme();

  // Get Roman Numeral or Rank Display
  const getRankBadge = () => {
    if (isMajor) {
      const romanNumerals = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
      return romanNumerals[card.number] || String(card.number);
    }
    if (typeof card.rank === 'string') return card.rank.toUpperCase();
    return String(card.number);
  };

  // Center Illustrative Emblem
  const renderEmblem = () => {
    if (isMajor) {
      switch (card.number) {
        case 0: return <Sun className="w-10 h-10 sm:w-14 sm:h-14 text-amber-300 animate-spin-slow" />;
        case 1: return <Zap className="w-10 h-10 sm:w-14 sm:h-14 text-amber-400" />;
        case 2: return <Moon className="w-10 h-10 sm:w-14 sm:h-14 text-indigo-300" />;
        case 3: return <Crown className="w-10 h-10 sm:w-14 sm:h-14 text-emerald-300" />;
        case 4: return <Shield className="w-10 h-10 sm:w-14 sm:h-14 text-amber-400" />;
        case 17: return <Star className="w-10 h-10 sm:w-14 sm:h-14 text-cyan-300 animate-pulse" />;
        case 18: return <Moon className="w-10 h-10 sm:w-14 sm:h-14 text-sky-300" />;
        case 19: return <Sun className="w-10 h-10 sm:w-14 sm:h-14 text-amber-300" />;
        default: return <Sparkles className="w-10 h-10 sm:w-14 sm:h-14 text-amber-300" />;
      }
    }

    switch (card.suit) {
      case 'Wands':
        return (
          <div className="flex flex-col items-center">
            <Flame className="w-10 h-10 sm:w-14 sm:h-14 text-amber-400 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <div className="flex gap-1 mt-2">
              {Array.from({ length: Math.min(Number(card.number) || 1, 5) }).map((_, i) => (
                <div key={i} className="w-1.5 h-6 rounded-full bg-gradient-to-t from-amber-600 to-amber-300 shadow-sm" />
              ))}
            </div>
          </div>
        );
      case 'Cups':
        return (
          <div className="flex flex-col items-center">
            <Droplets className="w-10 h-10 sm:w-14 sm:h-14 text-cyan-400 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            <div className="flex gap-1.5 mt-2">
              {Array.from({ length: Math.min(Number(card.number) || 1, 5) }).map((_, i) => (
                <div key={i} className="w-2.5 h-3 rounded-b-full border border-cyan-400 bg-cyan-500/20" />
              ))}
            </div>
          </div>
        );
      case 'Swords':
        return (
          <div className="flex flex-col items-center">
            <Wind className="w-10 h-10 sm:w-14 sm:h-14 text-sky-300 filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
            <div className="flex gap-1 mt-2">
              {Array.from({ length: Math.min(Number(card.number) || 1, 5) }).map((_, i) => (
                <div key={i} className="w-1 h-7 bg-gradient-to-t from-sky-400 to-slate-200 shadow-sm" />
              ))}
            </div>
          </div>
        );
      case 'Pentacles':
        return (
          <div className="flex flex-col items-center">
            <Mountain className="w-10 h-10 sm:w-14 sm:h-14 text-emerald-400 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <div className="flex gap-1.5 mt-2">
              {Array.from({ length: Math.min(Number(card.number) || 1, 5) }).map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 rounded-full border border-emerald-400/80 bg-emerald-500/20 flex items-center justify-center text-[7px] text-emerald-300">★</div>
              ))}
            </div>
          </div>
        );
      default:
        return <Sparkles className="w-10 h-10 sm:w-14 sm:h-14 text-amber-300" />;
    }
  };

  return (
    <div
      className={`relative ${dimensions.w} ${dimensions.h} rounded-2xl p-2 sm:p-2.5 bg-gradient-to-b ${theme.bg} border-2 ${theme.border} shadow-2xl flex flex-col justify-between overflow-hidden select-none transition-transform duration-300 ${
        isReversed ? 'rotate-180' : ''
      } ${className}`}
      style={{
        boxShadow: `0 10px 25px -5px ${theme.glow}, 0 0 15px 1px rgba(0,0,0,0.4)`
      }}
    >
      {/* Golden Inner Frame */}
      <div className="absolute inset-1.5 sm:inset-2 rounded-xl border border-amber-400/30 pointer-events-none" />
      <div className="absolute top-3 left-3 text-[9px] text-amber-400/40 font-serif">✦</div>
      <div className="absolute top-3 right-3 text-[9px] text-amber-400/40 font-serif">✦</div>
      <div className="absolute bottom-3 left-3 text-[9px] text-amber-400/40 font-serif">✦</div>
      <div className="absolute bottom-3 right-3 text-[9px] text-amber-400/40 font-serif">✦</div>

      {/* Top Bar: Arcana & Rank */}
      <div className="relative z-10 flex items-center justify-between w-full px-2 pt-1">
        <span className="px-2 py-0.5 rounded-full bg-slate-950/80 border border-amber-400/30 text-[10px] sm:text-xs font-serif font-bold text-amber-300">
          {getRankBadge()}
        </span>
        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-300/80">
          {isMajor ? 'Major Arcana' : card.suit}
        </span>
      </div>

      {/* Center Artwork Canvas */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-2 py-2">
        {/* Mystic Aura Ring */}
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-amber-400/30 flex items-center justify-center bg-slate-950/60 shadow-inner">
          <div className="absolute inset-1 rounded-full border border-dashed border-amber-400/20" />
          {renderEmblem()}
        </div>

        {/* Essential Arcana Meaning or Keywords */}
        <div className="mt-3 max-w-[90%]">
          <p className="text-[10px] sm:text-xs font-serif font-semibold text-slate-200 line-clamp-1">
            {isVi ? (card.keywordsVi && card.keywordsVi[0]) : card.keywords[0]}
          </p>
          <span className="text-[9px] sm:text-[10px] text-amber-300/70 font-medium block truncate">
            {isVi ? (card.keywordsVi && card.keywordsVi[1]) : card.keywords[1]}
          </span>
        </div>
      </div>

      {/* Bottom Name Banner */}
      {showLabel && (
        <div className="relative z-10 w-full text-center pb-1 pt-1.5 border-t border-amber-400/20 bg-slate-950/90 rounded-b-lg">
          <h4 className="font-serif font-bold text-[11px] sm:text-xs text-amber-200 tracking-wide truncate px-1">
            {isVi ? card.nameVi : card.name}
          </h4>
          {isReversed && (
            <span className="inline-block mt-0.5 text-[8px] sm:text-[9px] font-bold text-indigo-300 uppercase tracking-widest px-1.5 py-0.2 rounded bg-indigo-950/80 border border-indigo-500/30">
              {isVi ? 'Nội tâm' : 'Reversed'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
