import React, { useState, useMemo } from 'react';
import { Reading, DailyReading, UserPreferences, TarotCard } from '../types';
import { CardDetailModal } from '../components/CardDetailModal';
import { 
  BookOpen, 
  Search, 
  Heart, 
  Trash2, 
  Download, 
  Calendar, 
  Layers, 
  Sparkles, 
  Eye, 
  Share2,
  Tag
} from 'lucide-react';

interface JournalViewProps {
  readings: Reading[];
  dailyReadings: DailyReading[];
  onDeleteReading: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  preferences: UserPreferences;
}

export const JournalView: React.FC<JournalViewProps> = ({
  readings,
  dailyReadings,
  onDeleteReading,
  onToggleFavorite,
  preferences
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [inspectingCard, setInspectingCard] = useState<TarotCard | null>(null);

  const isVi = preferences.language === 'vi';

  // Filtered readings
  const filteredReadings = useMemo(() => {
    return readings.filter((r) => {
      if (showOnlyFavorites && !r.isFavorite) return false;
      if (filterTopic !== 'all' && r.topic !== filterTopic) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTopic = r.topic.toLowerCase().includes(q);
      const matchQuestion = r.question.toLowerCase().includes(q);
      const matchNotes = r.personalNotes?.toLowerCase().includes(q) || false;
      const matchCards = r.cards.some(c => c.card.name.toLowerCase().includes(q) || c.card.nameVi.toLowerCase().includes(q));

      return matchTopic || matchQuestion || matchNotes || matchCards;
    });
  }, [readings, searchQuery, filterTopic, showOnlyFavorites]);

  // Export all journal entries to JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ readings, dailyReadings }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `tarot_reflection_journal_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            {isVi ? 'Nhật Ký & Dấu Ấn Nội Tâm' : 'Reflection Journal & Logs'}
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
            {isVi ? 'Lịch Sử & Nhật Ký Phản Tỉnh' : 'Reading History & Journal'}
          </h1>
        </div>

        <button
          onClick={handleExportJSON}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>{isVi ? 'Xuất dữ liệu (.json)' : 'Export Journal (.json)'}</span>
        </button>
      </div>

      {/* Controls: Search, Filter, Favorite Toggle */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isVi ? 'Tìm kiếm theo câu hỏi, lá bài, ghi chú...' : 'Search questions, cards, or notes...'}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/50 transition-colors"
          />
        </div>

        {/* Favorite toggle */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`w-full sm:w-auto px-4 py-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
              showOnlyFavorites
                ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-rose-400 text-rose-400' : ''}`} />
            <span>{isVi ? 'Chỉ xem Yêu thích' : 'Favorites Only'}</span>
          </button>
        </div>
      </div>

      {/* Readings List */}
      {filteredReadings.length > 0 ? (
        <div className="space-y-6">
          {filteredReadings.map((r) => (
            <div
              key={r.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/30 transition-all duration-300 shadow-xl space-y-6"
            >
              {/* Header of reading entry */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 text-xs font-semibold">
                      {r.topic}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(r.date).toLocaleDateString(isVi ? 'vi-VN' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-amber-100 mt-2">
                    "{r.question}"
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleFavorite(r.id)}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${r.isFavorite ? 'fill-rose-400 text-rose-400' : ''}`} />
                  </button>
                  <button
                    onClick={() => onDeleteReading(r.id)}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Cards drawn */}
              <div className="flex flex-wrap gap-4 items-center">
                {r.cards.map((c, idx) => (
                  <div
                    key={idx}
                    onClick={() => setInspectingCard(c.card)}
                    className="cursor-pointer p-3 rounded-2xl bg-slate-950 border border-slate-850 hover:border-amber-400/40 flex items-center gap-3 transition-colors"
                  >
                    <img
                      src={c.card.imageUrl}
                      alt={c.card.name}
                      className="w-10 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/70 block">
                        {c.positionLabel}
                      </span>
                      <span className="text-xs font-serif font-bold text-slate-200">
                        {isVi ? c.card.nameVi : c.card.name}
                      </span>
                      {c.isReversed && (
                        <span className="text-[10px] text-indigo-300 block">
                          ({isVi ? 'Nội tâm' : 'Reversed'})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Personal Notes / Realizations */}
              {r.personalNotes && (
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/80 block">
                    {isVi ? 'Ghi chép suy ngẫm cá nhân:' : 'Personal Realizations:'}
                  </span>
                  <p className="whitespace-pre-line leading-relaxed">{r.personalNotes}</p>
                </div>
              )}

              {/* Action plan committed */}
              {r.userReflections && (
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200 flex items-center gap-2">
                  <span className="font-bold">{isVi ? 'Hành động cam kết:' : 'Committed Action:'}</span>
                  <span>{r.userReflections}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500 space-y-3 bg-slate-900/40 rounded-3xl border border-slate-800">
          <BookOpen className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm">
            {isVi ? 'Chưa có ghi chép phản tỉnh nào được lưu.' : 'No journal reflections found.'}
          </p>
        </div>
      )}

      {/* Detail Modal */}
      <CardDetailModal
        card={inspectingCard}
        isOpen={Boolean(inspectingCard)}
        onClose={() => setInspectingCard(null)}
        language={preferences.language}
      />
    </div>
  );
};
