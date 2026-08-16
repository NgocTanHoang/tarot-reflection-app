import React, { useState } from 'react';
import { TarotCard, UserPreferences, Reading } from '../types';
import { TAROT_78_DECK } from '../data/tarotData';
import { TarotCardView } from '../components/TarotCardView';
import { CardDetailModal } from '../components/CardDetailModal';
import { 
  Scale, 
  Sparkles, 
  RotateCcw, 
  Lightbulb, 
  ShieldCheck, 
  BookOpen, 
  Save, 
  Check, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface DecisionHelperViewProps {
  onSaveReading: (reading: Reading) => void;
  preferences: UserPreferences;
}

export const DecisionHelperView: React.FC<DecisionHelperViewProps> = ({
  onSaveReading,
  preferences
}) => {
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [isDrawn, setIsDrawn] = useState(false);
  const [cardA, setCardA] = useState<TarotCard | null>(null);
  const [cardB, setCardB] = useState<TarotCard | null>(null);
  const [cardCenter, setCardCenter] = useState<TarotCard | null>(null);
  const [inspectingCard, setInspectingCard] = useState<TarotCard | null>(null);
  const [decisionNotes, setDecisionNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const isVi = preferences.language === 'vi';

  const handleDrawDecision = () => {
    if (!optionA.trim() || !optionB.trim()) return;

    // Pick 3 unique cards
    const deckCopy = [...TAROT_78_DECK];
    const picked: TarotCard[] = [];
    for (let i = 0; i < 3; i++) {
      const randIdx = Math.floor(Math.random() * deckCopy.length);
      picked.push(deckCopy.splice(randIdx, 1)[0]);
    }

    setCardA(picked[0]);
    setCardB(picked[1]);
    setCardCenter(picked[2]);
    setIsDrawn(true);
  };

  const handleSaveDecision = () => {
    if (!cardA || !cardB || !cardCenter) return;

    const newReading: Reading = {
      id: `decision-${Date.now()}`,
      date: new Date().toISOString(),
      topic: "A Decision I'm Considering",
      question: `${isVi ? 'Soi rọi quyết định' : 'Decision Mirror'}: [A: ${optionA}] vs [B: ${optionB}]`,
      spreadType: 'Decision Mirror',
      cards: [
        { card: cardA, isReversed: false, position: 1, positionLabel: `Lựa chọn A: ${optionA}` },
        { card: cardB, isReversed: false, position: 2, positionLabel: `Lựa chọn B: ${optionB}` },
        { card: cardCenter, isReversed: false, position: 3, positionLabel: 'Điểm Neo Giá Trị Cốt Lõi' }
      ],
      interpretation: `A: ${cardA.nameVi} - ${cardA.uprightMeaningVi}\nB: ${cardB.nameVi} - ${cardB.uprightMeaningVi}\nCore: ${cardCenter.nameVi} - ${cardCenter.uprightMeaningVi}`,
      personalNotes: decisionNotes,
      tags: ['Decision Mirror', 'Reflection'],
      isFavorite: false
    };

    onSaveReading(newReading);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    setOptionA('');
    setOptionB('');
    setIsDrawn(false);
    setCardA(null);
    setCardB(null);
    setCardCenter(null);
    setDecisionNotes('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-12 px-4 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/25 text-indigo-300 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>{isVi ? 'Gương Soi Quyết Định • Không Chọn Thay' : 'Decision Mirror • Personal Agency'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
          {isVi ? 'Soi Rọi Quyết Định Cá Nhân' : 'Dual-Path Decision Mirror'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {isVi
            ? 'Tarot không chọn thay bạn con đường nào "tốt hơn". Mỗi lá bài giúp bạn lắng nghe động lực, nỗi sợ và giá trị cốt lõi đằng sau từng lựa chọn.'
            : 'Tarot does not dictate which path is better. Each archetype reflects the underlying motives, psychological trade-offs, and core values of each choice.'}
        </p>
      </div>

      {!isDrawn ? (
        /* Input options */
        <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-amber-300 mb-2">
                {isVi ? 'Lựa chọn A (Con đường 1)' : 'Option A (Path 1)'}
              </label>
              <input
                type="text"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
                placeholder={isVi ? 'Ví dụ: Nhận lời đề nghị chuyển việc mới...' : 'E.g., Accept the new job offer...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-indigo-300 mb-2">
                {isVi ? 'Lựa chọn B (Con đường 2)' : 'Option B (Path 2)'}
              </label>
              <input
                type="text"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
                placeholder={isVi ? 'Ví dụ: Ở lại vị trí hiện tại và học thêm kỹ năng mới...' : 'E.g., Stay in current role and pursue upskilling...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-400/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-amber-400/70" />
            <span>
              {isVi
                ? 'Công cụ tôn trọng hoàn toàn quyền tự do ý chí và sự lựa chọn độc lập của bạn.'
                : 'Built with complete respect for your free will and independent judgment.'}
            </span>
          </div>

          <button
            onClick={handleDrawDecision}
            disabled={!optionA.trim() || !optionB.trim()}
            className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isVi ? 'Rút Bài Soi Rọi 2 Lựa Chọn' : 'Draw Decision Mirror'}</span>
          </button>
        </div>
      ) : (
        /* Decision Cards Revealed */
        <div className="space-y-10">
          <div className="flex justify-between items-center bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                {isVi ? 'So Sánh Song Song' : 'Dual-Path Analysis'}
              </span>
              <p className="text-xs sm:text-sm font-serif font-bold text-amber-100 mt-0.5">
                [A: {optionA}] <span className="text-slate-500 font-sans font-normal">vs</span> [B: {optionB}]
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isVi ? 'Đặt câu hỏi khác' : 'New Question'}</span>
            </button>
          </div>

          {/* 3 Cards Display (Choice A - Core Anchor - Choice B) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            {/* Card A */}
            {cardA && (
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-400/20 flex flex-col items-center space-y-4">
                <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-serif font-bold text-center">
                  {isVi ? `Lựa chọn A: ${optionA}` : `Option A: ${optionA}`}
                </span>
                <TarotCardView
                  card={cardA}
                  isFlipped={true}
                  size="sm"
                  language={preferences.language}
                />
                <div className="text-center space-y-1">
                  <h4 className="font-serif font-bold text-sm text-amber-100">
                    {isVi ? cardA.nameVi : cardA.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isVi ? cardA.uprightMeaningVi : cardA.uprightMeaning}
                  </p>
                </div>
                <button
                  onClick={() => setInspectingCard(cardA)}
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>{isVi ? 'Chi tiết biểu tượng' : 'Inspect Details'}</span>
                </button>
              </div>
            )}

            {/* Center Core Anchor */}
            {cardCenter && (
              <div className="p-6 rounded-3xl bg-indigo-950/20 border border-indigo-500/25 flex flex-col items-center space-y-4">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-serif font-bold text-center">
                  {isVi ? 'Điểm Neo Giá Trị Cốt Lõi' : 'Core Value Anchor'}
                </span>
                <TarotCardView
                  card={cardCenter}
                  isFlipped={true}
                  size="sm"
                  language={preferences.language}
                />
                <div className="text-center space-y-1">
                  <h4 className="font-serif font-bold text-sm text-amber-100">
                    {isVi ? cardCenter.nameVi : cardCenter.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isVi ? cardCenter.symbolismVi : cardCenter.symbolism}
                  </p>
                </div>
                <button
                  onClick={() => setInspectingCard(cardCenter)}
                  className="text-[11px] text-indigo-300 hover:underline flex items-center gap-1 font-medium"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>{isVi ? 'Chi tiết biểu tượng' : 'Inspect Details'}</span>
                </button>
              </div>
            )}

            {/* Card B */}
            {cardB && (
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-indigo-400/20 flex flex-col items-center space-y-4">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-serif font-bold text-center">
                  {isVi ? `Lựa chọn B: ${optionB}` : `Option B: ${optionB}`}
                </span>
                <TarotCardView
                  card={cardB}
                  isFlipped={true}
                  size="sm"
                  language={preferences.language}
                />
                <div className="text-center space-y-1">
                  <h4 className="font-serif font-bold text-sm text-amber-100">
                    {isVi ? cardB.nameVi : cardB.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isVi ? cardB.uprightMeaningVi : cardB.uprightMeaning}
                  </p>
                </div>
                <button
                  onClick={() => setInspectingCard(cardB)}
                  className="text-[11px] text-indigo-300 hover:underline flex items-center gap-1 font-medium"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>{isVi ? 'Chi tiết biểu tượng' : 'Inspect Details'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Synthesis Reflection Notes */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="font-serif font-bold text-base sm:text-lg text-amber-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{isVi ? 'Ghi Chép Phản Chiếu Sau Khi Quan Sát 2 Lựa Chọn' : 'My Decision Reflections'}</span>
            </h3>

            <textarea
              value={decisionNotes}
              onChange={(e) => setDecisionNotes(e.target.value)}
              rows={4}
              placeholder={
                isVi
                  ? 'Tôi nhận thấy điều gì về cảm xúc của mình với lựa chọn A? Lựa chọn B chạm vào nỗi sợ hay khát vọng nào? Điểm neo giá trị cốt lõi nhắc nhở tôi điều gì?...'
                  : 'What internal feelings surface with Option A vs. Option B? What does the Core Value anchor remind you of?...'
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 resize-none transition-colors"
            />

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-xs text-slate-400">
                {savedSuccess && (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>{isVi ? 'Đã lưu vào Nhật ký!' : 'Saved to Journal!'}</span>
                  </span>
                )}
              </span>

              <button
                onClick={handleSaveDecision}
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>{isVi ? 'Lưu Vào Nhật Ký' : 'Save to Journal'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <CardDetailModal
        card={inspectingCard}
        isOpen={Boolean(inspectingCard)}
        onClose={() => setInspectingCard(null)}
        language={preferences.language}
      />
    </div>
  );
};
