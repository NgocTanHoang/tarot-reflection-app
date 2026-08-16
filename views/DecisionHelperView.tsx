import React, { useState } from 'react';
import { TarotCard, UserPreferences, Reading } from '../types';
import { TAROT_78_DECK } from '../data/tarotData';
import { TarotCardView } from '../components/TarotCardView';
import { CardDetailModal } from '../components/CardDetailModal';
import { 
  Scale, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Lightbulb, 
  ShieldCheck, 
  BookOpen, 
  Save, 
  Check, 
  HelpCircle 
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
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-3">
          <Scale className="w-3.5 h-3.5" />
          {isVi ? 'Gương Soi Quyết Định • Không Chọn Thay' : 'Decision Mirror • Personal Agency'}
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
          {isVi ? 'Soi Rọi Quyết Định Cá Nhân' : 'Dual-Path Decision Mirror'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          {isVi
            ? 'Tarot không chọn thay bạn con đường nào "tốt hơn". Mỗi lá bài giúp bạn lắng nghe động lực, nỗi sợ và giá trị cốt lõi đằng sau từng lựa chọn.'
            : 'Tarot does not choose for you. Each card reflects the underlying motives, psychological trade-offs, and core values of each path.'}
        </p>
      </div>

      {!isDrawn ? (
        /* Input options */
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in duration-300">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                {isVi ? 'Lựa chọn A (Con đường 1)' : 'Option A (Path 1)'}
              </label>
              <input
                type="text"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
                placeholder={isVi ? 'Ví dụ: Nhận lời đề nghị công việc mới...' : 'E.g., Accept the new job offer...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
                {isVi ? 'Lựa chọn B (Con đường 2)' : 'Option B (Path 2)'}
              </label>
              <input
                type="text"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
                placeholder={isVi ? 'Ví dụ: Tiếp tục ở lại vị trí hiện tại và học thêm...' : 'E.g., Stay at current company and upskill...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-400/50 transition-colors"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              {isVi
                ? 'Quyết định cuối cùng luôn thuộc về trực giác và sự tỉnh thức của bạn.'
                : 'The final decision always belongs to your intuition and sound judgment.'}
            </span>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={handleDrawDecision}
              disabled={!optionA.trim() || !optionB.trim()}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isVi ? 'Soi Rọi 2 Lựa Chọn' : 'Mirror Both Paths'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Top Reset button */}
          <div className="flex justify-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {isVi ? 'Cân nhắc quyết định khác' : 'Explore Another Decision'}
            </button>
          </div>

          {/* Paths comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Path A */}
            {cardA && (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-400/30 shadow-2xl flex flex-col justify-between space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-serif font-bold uppercase tracking-wider block w-fit mb-3">
                    {isVi ? 'Góc nhìn cho Lựa chọn A' : 'Perspective on Option A'}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-amber-100 mb-2">
                    "{optionA}"
                  </h3>

                  <div className="flex flex-col items-center my-6">
                    <TarotCardView
                      card={cardA}
                      isFlipped={true}
                      size="md"
                      language={preferences.language}
                    />
                    <button
                      onClick={() => setInspectingCard(cardA)}
                      className="mt-3 text-xs text-amber-400 hover:text-amber-300 underline"
                    >
                      {isVi ? 'Xem biểu tượng lá bài' : 'Inspect Symbolism'}
                    </button>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <strong className="text-amber-300 block mb-1">
                        {isVi ? 'Động lực & Tâm thế phản chiếu:' : 'Motives & Mindset:'}
                      </strong>
                      <p>{isVi ? cardA.uprightMeaningVi : cardA.uprightMeaning}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <strong className="text-slate-200 block mb-1">
                        {isVi ? 'Câu hỏi tự vấn:' : 'Self-Reflection Prompt:'}
                      </strong>
                      <p className="italic">"{isVi ? cardA.reflectionPromptsVi[0] : cardA.reflectionPrompts[0]}"</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Path B */}
            {cardB && (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-indigo-400/30 shadow-2xl flex flex-col justify-between space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-serif font-bold uppercase tracking-wider block w-fit mb-3">
                    {isVi ? 'Góc nhìn cho Lựa chọn B' : 'Perspective on Option B'}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-amber-100 mb-2">
                    "{optionB}"
                  </h3>

                  <div className="flex flex-col items-center my-6">
                    <TarotCardView
                      card={cardB}
                      isFlipped={true}
                      size="md"
                      language={preferences.language}
                    />
                    <button
                      onClick={() => setInspectingCard(cardB)}
                      className="mt-3 text-xs text-indigo-300 hover:text-indigo-200 underline"
                    >
                      {isVi ? 'Xem biểu tượng lá bài' : 'Inspect Symbolism'}
                    </button>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <strong className="text-indigo-300 block mb-1">
                        {isVi ? 'Động lực & Tâm thế phản chiếu:' : 'Motives & Mindset:'}
                      </strong>
                      <p>{isVi ? cardB.uprightMeaningVi : cardB.uprightMeaning}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <strong className="text-slate-200 block mb-1">
                        {isVi ? 'Câu hỏi tự vấn:' : 'Self-Reflection Prompt:'}
                      </strong>
                      <p className="italic">"{isVi ? cardB.reflectionPromptsVi[0] : cardB.reflectionPrompts[0]}"</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Anchor: Core Value Synthesis */}
          {cardCenter && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-400/20 shadow-xl flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <TarotCardView
                  card={cardCenter}
                  isFlipped={true}
                  size="sm"
                  language={preferences.language}
                />
              </div>
              <div className="space-y-2 text-center md:text-left">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                  {isVi ? 'Điểm Neo Giá Trị Cốt Lõi Chung' : 'Underlying Core Value Anchor'}
                </span>
                <h4 className="font-serif font-bold text-lg text-amber-100">
                  {isVi ? cardCenter.nameVi : cardCenter.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isVi
                    ? `Dù bạn chọn con đường nào, giá trị sâu thẳm cần gìn giữ là: ${cardCenter.uprightMeaningVi}`
                    : `Whichever path you embrace, the essential inner value to honor is: ${cardCenter.uprightMeaning}`}
                </p>
              </div>
            </div>
          )}

          {/* Notes & Journaling */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-serif font-bold text-lg text-amber-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              {isVi ? 'Đúc Kết Suy Ngẫm Của Tôi' : 'My Decision Journal & Realizations'}
            </h3>
            <textarea
              value={decisionNotes}
              onChange={(e) => setDecisionNotes(e.target.value)}
              rows={4}
              placeholder={
                isVi
                  ? 'Sau khi nhìn vào 2 góc nhìn biểu tượng, tôi nhận ra điều gì quan trọng nhất với mình?...'
                  : 'Having looked into both symbolic mirrors, what truth emerges for you?...'
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 resize-none transition-colors"
            />
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-400">
                {savedSuccess && (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    {isVi ? 'Đã lưu vào Nhật ký!' : 'Saved to Journal!'}
                  </span>
                )}
              </span>
              <button
                onClick={handleSaveDecision}
                className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{isVi ? 'Lưu Ghi Chép' : 'Save Notes'}</span>
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
