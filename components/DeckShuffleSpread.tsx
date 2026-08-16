import React, { useState, useEffect } from 'react';
import { TarotCard } from '../types';
import { Shuffle, Sparkles, Hand, Check, RefreshCw } from 'lucide-react';
import { TAROT_78_DECK } from '../data/tarotData';

interface DeckShuffleSpreadProps {
  requiredCount: number;
  onCardsSelected: (selectedCards: Array<{ card: TarotCard; isReversed: boolean }>) => void;
  allowReversed?: boolean;
  language?: 'vi' | 'en';
}

export const DeckShuffleSpread: React.FC<DeckShuffleSpreadProps> = ({
  requiredCount,
  onCardsSelected,
  allowReversed = true,
  language = 'vi'
}) => {
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const isVi = language === 'vi';

  // Initialize and shuffle deck
  const shuffleDeck = () => {
    setIsShuffling(true);
    setSelectedIndices([]);

    setTimeout(() => {
      const deck = [...TAROT_78_DECK];
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      setShuffledDeck(deck);
      setIsShuffling(false);
    }, 600);
  };

  useEffect(() => {
    shuffleDeck();
  }, []);

  const handleCardClick = (index: number) => {
    if (isShuffling) return;
    if (selectedIndices.includes(index)) return;
    if (selectedIndices.length >= requiredCount) return;

    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    if (newSelected.length === requiredCount) {
      // Build selected cards with randomized reversal if allowed
      const result = newSelected.map((idx) => {
        const isRev = allowReversed ? Math.random() < 0.25 : false;
        return {
          card: shuffledDeck[idx],
          isReversed: isRev
        };
      });

      // Brief delay so user sees selection before proceeding
      setTimeout(() => {
        onCardsSelected(result);
      }, 500);
    }
  };

  const handleAutoDraw = () => {
    if (isShuffling) return;
    const available = shuffledDeck.map((_, i) => i);
    const chosen: number[] = [];
    while (chosen.length < requiredCount && available.length > 0) {
      const randIdx = Math.floor(Math.random() * available.length);
      chosen.push(available.splice(randIdx, 1)[0]);
    }
    setSelectedIndices(chosen);

    const result = chosen.map((idx) => {
      const isRev = allowReversed ? Math.random() < 0.25 : false;
      return {
        card: shuffledDeck[idx],
        isReversed: isRev
      };
    });

    setTimeout(() => {
      onCardsSelected(result);
    }, 500);
  };

  // We display a visual spread arc of 24 cards representing the full deck
  const displayCardCount = 24;

  return (
    <div className="w-full flex flex-col items-center py-6">
      {/* Instructions & Counter */}
      <div className="text-center mb-6 max-w-lg">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
          <Hand className="w-3.5 h-3.5" />
          {isVi
            ? `Hãy chọn ${requiredCount} lá bài bằng trực giác và sự bình tâm`
            : `Select ${requiredCount} card(s) mindfully`}
        </div>
        <p className="text-xs text-slate-400">
          {isVi
            ? `Đã chọn: ${selectedIndices.length}/${requiredCount} lá bài`
            : `Selected: ${selectedIndices.length}/${requiredCount} card(s)`}
        </p>
      </div>

      {/* Interactive Deck Fan Area */}
      <div className="relative w-full max-w-4xl h-56 sm:h-72 flex items-center justify-center overflow-hidden my-2">
        <div className="relative w-full h-full flex items-center justify-center">
          {shuffledDeck.slice(0, displayCardCount).map((card, idx) => {
            const isSelected = selectedIndices.includes(idx);
            // Calculate arc rotation and offset
            const angle = (idx - displayCardCount / 2) * 3.8;
            const xOffset = (idx - displayCardCount / 2) * 18;
            const yOffset = Math.abs(idx - displayCardCount / 2) * 2.5;

            return (
              <div
                key={idx}
                onClick={() => handleCardClick(idx)}
                style={{
                  transform: isSelected
                    ? `translateY(-40px) scale(1.1) rotate(0deg)`
                    : isShuffling
                    ? `translate(0px, 0px) rotate(${Math.sin(idx) * 10}deg)`
                    : `translate(${xOffset}px, ${yOffset}px) rotate(${angle}deg)`,
                  zIndex: isSelected ? 40 : idx,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
                className={`absolute w-20 sm:w-28 h-32 sm:h-44 rounded-xl cursor-pointer select-none border-2 shadow-lg transition-transform ${
                  isSelected
                    ? 'border-amber-400 ring-4 ring-amber-400/30 bg-amber-950'
                    : 'border-amber-500/30 hover:border-amber-400 hover:-translate-y-6 hover:scale-105 bg-slate-950'
                }`}
              >
                {/* Back pattern */}
                <div className="w-full h-full rounded-lg p-1.5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="w-full h-full border border-amber-400/20 rounded-md flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-400/50" />
                  </div>
                  {isSelected && (
                    <div className="absolute inset-0 bg-amber-400/20 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Controls: Shuffle & Auto-draw */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <button
          onClick={shuffleDeck}
          disabled={isShuffling}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Shuffle className={`w-3.5 h-3.5 text-amber-400 ${isShuffling ? 'animate-spin' : ''}`} />
          {isVi ? 'Xào lại bộ bài' : 'Shuffle Deck'}
        </button>

        <button
          onClick={handleAutoDraw}
          disabled={isShuffling || selectedIndices.length >= requiredCount}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {isVi ? 'Rút ngẫu nhiên tự động' : 'Auto Pick Cards'}
        </button>
      </div>
    </div>
  );
};
