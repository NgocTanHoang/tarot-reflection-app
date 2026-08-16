import React, { useState } from 'react';
import { DailyReading, TarotCard, UserPreferences } from '../types';
import { TAROT_78_DECK } from '../data/tarotData';
import { TarotCardView } from '../components/TarotCardView';
import { CardDetailModal } from '../components/CardDetailModal';
import { 
  Calendar, 
  Sparkles, 
  BookOpen, 
  Check, 
  Flame, 
  Lightbulb, 
  ShieldCheck, 
  Save, 
  Share2, 
  Sun,
  Clock
} from 'lucide-react';

interface DailyCardViewProps {
  todaysDailyCard: DailyReading | null;
  onSaveDailyCard: (daily: DailyReading) => void;
  streakCount: number;
  preferences: UserPreferences;
}

export const DailyCardView: React.FC<DailyCardViewProps> = ({
  todaysDailyCard,
  onSaveDailyCard,
  streakCount,
  preferences
}) => {
  const [isFlipped, setIsFlipped] = useState(Boolean(todaysDailyCard));
  const [userNote, setUserNote] = useState(todaysDailyCard?.notes || '');
  const [userActionNote, setUserActionNote] = useState(todaysDailyCard?.actionCompleted ? 'Completed' : '');
  const [inspectingCard, setInspectingCard] = useState<TarotCard | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const isVi = preferences.language === 'vi';

  // Handle Drawing Daily Card
  const handleDrawDailyCard = () => {
    const randomIndex = Math.floor(Math.random() * TAROT_78_DECK.length);
    const card = TAROT_78_DECK[randomIndex];
    const isReversed = preferences.allowReversed ? Math.random() < 0.2 : false;

    const prompt = isVi
      ? (card.reflectionPromptsVi && card.reflectionPromptsVi[0]) || 'Hôm nay bạn muốn hướng sự chú ý và năng lượng của mình về đâu?'
      : (card.reflectionPrompts && card.reflectionPrompts[0]) || 'Where do you wish to direct your mindful focus today?';

    const newDaily: DailyReading = {
      id: `daily-${new Date().toISOString().split('T')[0]}`,
      date: new Date().toISOString().split('T')[0],
      card,
      isReversed,
      prompt,
      notes: '',
      actionCompleted: false
    };

    onSaveDailyCard(newDaily);
    setIsFlipped(true);
  };

  const handleSaveNotes = () => {
    if (!todaysDailyCard) return;

    const updated: DailyReading = {
      ...todaysDailyCard,
      notes: userNote,
      actionCompleted: Boolean(userActionNote)
    };

    onSaveDailyCard(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 space-y-10">
      {/* Header & Streak */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <Sun className="w-3.5 h-3.5" />
            {isVi ? 'Khoảnh Khắc Tĩnh Lặng Mỗi Ngày' : 'Daily Mindfulness Anchor'}
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
            {isVi ? 'Lá Bài Của Ngày' : 'Card of the Day'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isVi
              ? 'Rút 1 lá bài làm mỏ neo suy ngẫm và hành động trong suốt ngày hôm nay.'
              : 'Draw a single archetypal anchor for contemplation and deliberate action today.'}
          </p>
        </div>

        {/* Streak Badge */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-amber-400/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center">
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {isVi ? 'Chuỗi Phản Tỉnh' : 'Reflection Streak'}
            </span>
            <span className="text-lg font-serif font-bold text-amber-200">
              {streakCount} {isVi ? 'ngày' : 'days'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Card Drawing Area */}
      {!todaysDailyCard ? (
        <div className="p-10 sm:p-16 rounded-3xl bg-slate-900/60 border border-amber-500/20 text-center space-y-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center animate-pulse">
            <Sparkles className="w-8 h-8 text-amber-300" />
          </div>

          <div className="max-w-md">
            <h3 className="font-serif font-bold text-xl text-amber-100 mb-2">
              {isVi ? 'Sẵn Sàng Cho Nhịp Thở Hôm Nay?' : 'Ready to Anchor Your Day?'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isVi
                ? 'Hãy hít một hơi thật sâu, buông lỏng đôi vai và rút lá bài định hướng cho ngày hôm nay.'
                : 'Take a slow, deep breath, relax your shoulders, and draw your mindful reflection for today.'}
            </p>
          </div>

          <button
            onClick={handleDrawDailyCard}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4" />
            {isVi ? 'Rút Lá Bài Của Ngày' : 'Draw Card of the Day'}
          </button>
        </div>
      ) : (
        /* Card Drawn Today */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Anti-compulsion Mindful Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>
                {isVi
                  ? 'Bạn đã rút lá bài của ngày hôm nay. Hãy dành thời gian chiêm nghiệm và đồng hành cùng nó thay vì rút liên tục.'
                  : "You've drawn your card for today. Take time to sit with this reflection rather than drawing repeatedly."}
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400/60 hidden sm:inline">
              {new Date().toLocaleDateString(isVi ? 'vi-VN' : 'en-US')}
            </span>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-amber-400/30 shadow-2xl flex flex-col md:flex-row items-center gap-8">
            {/* Card Visual */}
            <div className="flex flex-col items-center flex-shrink-0">
              <TarotCardView
                card={todaysDailyCard.card}
                isReversed={todaysDailyCard.isReversed}
                isFlipped={isFlipped}
                size="lg"
                language={preferences.language}
              />
              <button
                onClick={() => setInspectingCard(todaysDailyCard.card)}
                className="mt-4 text-xs font-semibold text-amber-400/90 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isVi ? 'Xem chi tiết biểu tượng' : 'Explore Card Symbolism'}</span>
              </button>
            </div>

            {/* Daily Prompt & Guidance */}
            <div className="flex-grow space-y-6 text-slate-300 w-full">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                  {todaysDailyCard.card.arcana} Arcana {todaysDailyCard.card.suit ? `• ${todaysDailyCard.card.suit}` : ''}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 mt-1">
                  {isVi ? todaysDailyCard.card.nameVi : todaysDailyCard.card.name}
                  {todaysDailyCard.isReversed && (
                    <span className="text-xs font-sans font-medium text-indigo-300 ml-2 px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30">
                      {isVi ? 'Nội tâm' : 'Reversed'}
                    </span>
                  )}
                </h2>
              </div>

              {/* Reflection Prompt */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-400/20">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isVi ? 'Câu Hỏi Tự Vấn Ngày Hôm Nay' : 'Today’s Journaling Prompt'}
                </h4>
                <p className="font-serif italic text-amber-100 text-sm leading-relaxed">
                  "{todaysDailyCard.prompt}"
                </p>
              </div>

              {/* Micro-Action Seed */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5 mb-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  {isVi ? 'Hành Động Nhỏ Gợi Ý' : 'Suggested Daily Micro-Action'}
                </h4>
                <p className="text-emerald-100 text-xs leading-relaxed">
                  {isVi
                    ? (todaysDailyCard.card.positiveActionsVi && todaysDailyCard.card.positiveActionsVi[0]) || 'Dành 5 phút viết ra 3 điều bạn trân trọng.'
                    : (todaysDailyCard.card.positiveActions && todaysDailyCard.card.positiveActions[0]) || 'Take 5 minutes to write down 3 things you appreciate.'}
                </p>
              </div>

              {/* Autonomy Note */}
              <div className="text-[11px] text-slate-500 italic flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  {isVi
                    ? 'Lá bài là điểm tựa để bạn quan sát bản thân, không phải phán quyết tương lai.'
                    : 'The card is a tool for self-awareness, not a prophecy.'}
                </span>
              </div>
            </div>
          </div>

          {/* Daily Journal Note Input */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="font-serif font-bold text-lg text-amber-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              {isVi ? 'Ghi Chép Suy Ngẫm Hôm Nay' : 'Today’s Mindful Reflection'}
            </h3>

            <textarea
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              rows={4}
              placeholder={
                isVi
                  ? 'Ghi lại những cảm nhận, khoảnh khắc lắng đọng hoặc ý tưởng xuất hiện cùng lá bài hôm nay...'
                  : 'Capture any thoughts, feelings, or realizations arising from today’s reflection...'
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 resize-none transition-colors"
            />

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-xs text-slate-400">
                {savedSuccess && (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    {isVi ? 'Đã lưu ghi chép ngày!' : 'Daily reflection saved!'}
                  </span>
                )}
              </span>

              <button
                onClick={handleSaveNotes}
                className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{isVi ? 'Lưu Ghi Chép' : 'Save Reflection'}</span>
              </button>
            </div>
          </div>
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
