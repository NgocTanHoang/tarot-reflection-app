import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TarotCard } from '../types';
import { Shuffle, Sparkles, Hand, Check, ChevronRight } from 'lucide-react';
import { TAROT_78_DECK } from '../data/tarotData';

interface DeckShuffleSpreadProps {
  requiredCount: number;
  spreadTitle?: string;
  spreadTitleVi?: string;
  onCardsSelected: (selectedCards: Array<{ card: TarotCard; isReversed: boolean }>) => void;
  allowReversed?: boolean;
  language?: 'vi' | 'en';
}

export const DeckShuffleSpread: React.FC<DeckShuffleSpreadProps> = ({
  requiredCount,
  spreadTitle,
  spreadTitleVi,
  onCardsSelected,
  allowReversed = true,
  language = 'vi'
}) => {
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>(() => {
    const initial = [...TAROT_78_DECK];
    for (let i = initial.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [initial[i], initial[j]] = [initial[j], initial[i]];
    }
    return initial;
  });

  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const isVi = language === 'vi';

  // Shuffle deck with crisp animation
  const shuffleDeck = useCallback(() => {
    setIsShuffling(true);
    setSelectedIndices([]);
    setIsCompleted(false);

    const timer = setTimeout(() => {
      const deck = [...TAROT_78_DECK];
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      setShuffledDeck(deck);
      setIsShuffling(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  const triggerCompletion = useCallback((finalIndices: number[], deckToUse: TarotCard[]) => {
    setIsCompleted(true);
    const result = finalIndices.map((idx) => {
      const isRev = allowReversed ? Math.random() < 0.25 : false;
      return {
        card: deckToUse[idx] || TAROT_78_DECK[idx % TAROT_78_DECK.length],
        isReversed: isRev
      };
    });

    const timer = setTimeout(() => {
      onCardsSelected(result);
    }, 600);

    return () => clearTimeout(timer);
  }, [allowReversed, onCardsSelected]);

  const handleCardClick = (index: number) => {
    if (isShuffling || isCompleted) return;
    if (selectedIndices.includes(index)) return;
    if (selectedIndices.length >= requiredCount) return;

    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    if (newSelected.length === requiredCount) {
      triggerCompletion(newSelected, shuffledDeck);
    }
  };

  const handleAutoDraw = () => {
    if (isShuffling || isCompleted) return;
    const available = Array.from({ length: 24 }, (_, i) => i);
    const chosen: number[] = [];
    
    // Keep already selected cards
    selectedIndices.forEach(idx => {
      chosen.push(idx);
      const pos = available.indexOf(idx);
      if (pos >= 0) available.splice(pos, 1);
    });

    while (chosen.length < requiredCount && available.length > 0) {
      const randIdx = Math.floor(Math.random() * available.length);
      chosen.push(available.splice(randIdx, 1)[0]);
    }

    setSelectedIndices(chosen);
    triggerCompletion(chosen, shuffledDeck);
  };

  // Helper for dynamic instruction copy
  const getPromptText = () => {
    if (isVi) {
      if (requiredCount === 1) return 'Chọn một lá bài bằng trực giác, hoặc để hệ thống rút ngẫu nhiên.';
      if (requiredCount === 3) return 'Chọn 3 lá bài bằng trực giác, hoặc để hệ thống rút ngẫu nhiên cho bạn.';
      if (requiredCount === 5) return 'Chọn 5 lá bài bằng trực giác, hoặc để hệ thống rút ngẫu nhiên cho bạn.';
      return `Chọn ${requiredCount} lá bài bằng trực giác, hoặc để hệ thống rút ngẫu nhiên cho bạn.`;
    } else {
      if (requiredCount === 1) return 'Pick 1 card intuitively, or let the system draw randomly.';
      if (requiredCount === 3) return 'Pick 3 cards intuitively, or let the system draw for you.';
      if (requiredCount === 5) return 'Pick 5 cards intuitively, or let the system draw for you.';
      return `Pick ${requiredCount} cards intuitively, or draw randomly.`;
    }
  };

  const displayCardCount = 22;

  return (
    <div className="w-full flex flex-col items-center py-4 select-none">
      {/* Header Info & Spread Indicator */}
      {(spreadTitleVi || spreadTitle) && (
        <div className="mb-2 text-center">
          <span className="text-xs sm:text-sm font-serif font-bold text-amber-300 px-4 py-1.5 rounded-full bg-slate-900 border border-amber-400/30 inline-block">
            {isVi ? (spreadTitleVi || spreadTitle) : (spreadTitle || spreadTitleVi)} · {requiredCount} {isVi ? 'lá bài' : 'cards'}
          </span>
        </div>
      )}

      {/* Instructions & Counter Banner */}
      <div className="text-center mb-4 max-w-xl px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium mb-2.5">
          <Hand className="w-4 h-4 text-amber-400" />
          <span>{getPromptText()}</span>
        </div>
        
        {/* Crisp Progress Counter */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-300">
            {isVi ? 'Đã chọn:' : 'Selected:'}{' '}
            <span className="text-amber-300 font-serif font-bold text-base px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800">
              {selectedIndices.length} / {requiredCount}
            </span>{' '}
            {isVi ? 'lá bài' : 'cards'}
          </span>
        </div>
      </div>

      {/* Interactive Deck Fan Area */}
      <div className="relative w-full max-w-4xl h-60 sm:h-72 flex items-center justify-center overflow-hidden my-3">
        <div className="relative w-full h-full flex items-center justify-center">
          {shuffledDeck.slice(0, displayCardCount).map((_, idx) => {
            const isSelected = selectedIndices.includes(idx);
            const selectionOrder = selectedIndices.indexOf(idx);

            // Compute arc geometry
            const normalizedIndex = idx - displayCardCount / 2;
            const angle = normalizedIndex * 3.4;
            const xOffset = normalizedIndex * 19;
            const yOffset = Math.pow(Math.abs(normalizedIndex), 1.6) * 1.2;

            return (
              <div
                key={idx}
                onClick={() => handleCardClick(idx)}
                style={{
                  transform: isSelected
                    ? `translate3d(0, -36px, 0) scale(1.12) rotate(0deg)`
                    : isShuffling
                    ? `translate3d(0, 0, 0) rotate(${Math.sin(idx * 2) * 12}deg)`
                    : `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(${angle}deg)`,
                  zIndex: isSelected ? 50 : idx,
                  willChange: 'transform'
                }}
                className={`absolute w-20 sm:w-28 h-32 sm:h-44 rounded-2xl cursor-pointer select-none border-2 shadow-xl transition-all duration-300 ease-out ${
                  isSelected
                    ? 'border-amber-400 ring-4 ring-amber-400/40 bg-amber-950 scale-105'
                    : 'border-amber-500/30 hover:border-amber-400 hover:-translate-y-6 hover:scale-105 bg-slate-950'
                }`}
              >
                {/* Mystic card back */}
                <div className="w-full h-full rounded-xl p-1.5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="w-full h-full border border-amber-400/30 rounded-lg flex flex-col items-center justify-center relative">
                    <Sparkles className="w-4 h-4 text-amber-400/60" />
                    <div className="w-6 h-6 rounded-full border border-amber-400/20 mt-1 opacity-60" />
                  </div>
                  
                  {isSelected && (
                    <div className="absolute inset-0 bg-amber-950/70 backdrop-blur-[1px] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200">
                      <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-lg">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-[10px] font-serif font-bold text-amber-200 mt-1">
                        #{selectionOrder + 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Button if all drawn */}
      {selectedIndices.length === requiredCount && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 mb-4">
          <button
            onClick={() => triggerCompletion(selectedIndices, shuffledDeck)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl ring-2 ring-amber-400/30 active:scale-95 transition-all"
          >
            <span>{isVi ? 'Xem kết quả phản chiếu' : 'Proceed to Reflection'}</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      )}

      {/* Bottom Controls: Shuffle & Auto-draw */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        <button
          onClick={shuffleDeck}
          disabled={isShuffling || isCompleted}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Shuffle className={`w-3.5 h-3.5 text-amber-400 ${isShuffling ? 'animate-spin' : ''}`} />
          <span>{isVi ? 'Xào lại bộ bài' : 'Shuffle Deck'}</span>
        </button>

        <button
          onClick={handleAutoDraw}
          disabled={isShuffling || isCompleted || selectedIndices.length >= requiredCount}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isVi ? 'Rút ngẫu nhiên tự động' : 'Auto Draw'}</span>
        </button>
      </div>
    </div>
  );
};
