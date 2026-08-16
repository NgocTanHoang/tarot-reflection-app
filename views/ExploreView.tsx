import React, { useState, useMemo } from 'react';
import { TarotCard, UserPreferences } from '../types';
import { TAROT_78_DECK } from '../data/tarotData';
import { TarotCardView } from '../components/TarotCardView';
import { CardDetailModal } from '../components/CardDetailModal';
import { 
  Search, 
  Sparkles, 
  Flame, 
  Droplets, 
  Wind, 
  Mountain, 
  BookOpen, 
  X
} from 'lucide-react';

interface ExploreViewProps {
  preferences: UserPreferences;
  onSelectForReading?: (card: TarotCard) => void;
}

type FilterCategory = 'all' | 'Major' | 'Wands' | 'Cups' | 'Swords' | 'Pentacles';

export const ExploreView: React.FC<ExploreViewProps> = ({
  preferences,
  onSelectForReading
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  const isVi = preferences.language === 'vi';

  const categories: Array<{ id: FilterCategory; labelVi: string; labelEn: string; icon: React.ReactNode }> = [
    { id: 'all', labelVi: 'Tất cả (78 lá)', labelEn: 'All (78 Cards)', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'Major', labelVi: 'Bộ Ẩn Chính (22)', labelEn: 'Major Arcana (22)', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'Wands', labelVi: 'Gậy • Lửa (14)', labelEn: 'Wands • Fire (14)', icon: <Flame className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'Cups', labelVi: 'Cốc • Nước (14)', labelEn: 'Cups • Water (14)', icon: <Droplets className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'Swords', labelVi: 'Kiếm • Khí (14)', labelEn: 'Swords • Air (14)', icon: <Wind className="w-3.5 h-3.5 text-sky-400" /> },
    { id: 'Pentacles', labelVi: 'Tiền • Đất (14)', labelEn: 'Pentacles • Earth (14)', icon: <Mountain className="w-3.5 h-3.5 text-emerald-400" /> }
  ];

  // Filter and search logic
  const filteredCards = useMemo(() => {
    return TAROT_78_DECK.filter((card) => {
      // Category filter
      if (selectedCategory === 'Major') {
        if (card.arcana !== 'Major') return false;
      } else if (selectedCategory !== 'all') {
        if (card.suit !== selectedCategory) return false;
      }

      // Search query
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchName = card.name.toLowerCase().includes(q) || card.nameVi.toLowerCase().includes(q);
      const matchKeywords = card.keywords.some(k => k.toLowerCase().includes(q)) || card.keywordsVi.some(k => k.toLowerCase().includes(q));
      const matchSymbolism = card.symbolism.toLowerCase().includes(q) || card.symbolismVi.toLowerCase().includes(q);

      return matchName || matchKeywords || matchSymbolism;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isVi ? 'Bách Khoa Biểu Tượng Tâm Lý' : 'Symbolic Tarot Encyclopedia'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
          {isVi ? 'Thư Viện 78 Lá Bài Tarot' : '78 Card Archetype Library'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {isVi
            ? 'Khám phá ý nghĩa biểu tượng, câu hỏi tự suy ngẫm và góc nhìn tâm lý của từng lá bài.'
            : 'Explore the archetypal symbolism, psychological depth, and reflection prompts of all 78 cards.'}
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isVi
                ? 'Tìm kiếm theo tên lá bài (The Fool, The Sun...), từ khóa, hoặc ý nghĩa biểu tượng...'
                : 'Search by card name, keywords, or archetypal symbols...'
            }
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-10 py-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/50 transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-500 hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 flex-wrap">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-850'
                }`}
              >
                {cat.icon}
                <span>{isVi ? cat.labelVi : cat.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2 max-w-7xl mx-auto border-b border-slate-800/80 pb-2">
        <span>
          {isVi
            ? `Hiển thị ${filteredCards.length} lá bài`
            : `Showing ${filteredCards.length} cards`}
        </span>
        {searchQuery && (
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="text-amber-400 hover:underline"
          >
            {isVi ? 'Xóa bộ lọc' : 'Clear filters'}
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="group cursor-pointer flex flex-col items-center p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1 shadow-md"
            >
              <div className="w-full flex justify-center mb-2.5">
                <TarotCardView
                  card={card}
                  isReversed={false}
                  isFlipped={true}
                  size="sm"
                  showLabel={false}
                  language={preferences.language}
                />
              </div>
              <div className="w-full text-center">
                <h4 className="font-serif font-bold text-xs text-amber-100 group-hover:text-amber-300 transition-colors truncate">
                  {isVi ? card.nameVi : card.name}
                </h4>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {isVi ? card.keywordsVi.slice(0, 2).join(' • ') : card.keywords.slice(0, 2).join(' • ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500 space-y-3">
          <BookOpen className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm">
            {isVi ? 'Không tìm thấy lá bài phù hợp với từ khóa tìm kiếm.' : 'No cards found matching your query.'}
          </p>
        </div>
      )}

      {/* Card Detail Modal */}
      <CardDetailModal
        card={selectedCard}
        isOpen={Boolean(selectedCard)}
        onClose={() => setSelectedCard(null)}
        onSelectForReading={onSelectForReading}
        language={preferences.language}
      />
    </div>
  );
};
