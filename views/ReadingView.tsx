import React, { useState } from 'react';
import { 
  ReadingTopic, 
  SpreadConfig, 
  TarotCard, 
  DrawnCard, 
  Reading, 
  UserPreferences 
} from '../types';
import { SPREADS } from '../data/tarotData';
import { DeckShuffleSpread } from '../components/DeckShuffleSpread';
import { TarotCardView } from '../components/TarotCardView';
import { CardDetailModal } from '../components/CardDetailModal';
import { fetchAIInterpretation, StructuredInterpretation } from '../services/reflectionEngine';
import { checkSensitiveCrisisQuery, SafetyCheckResult } from '../services/safety';
import { 
  Heart, 
  Briefcase, 
  Compass, 
  Smile, 
  Scale, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  RotateCcw, 
  Check, 
  BookOpen, 
  Save, 
  Lightbulb, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface ReadingViewProps {
  onSaveReading: (reading: Reading) => void;
  onOpenSafetyModal: (safety: SafetyCheckResult) => void;
  preferences: UserPreferences;
}

type Step = 'topic' | 'spread' | 'draw' | 'reveal' | 'interpret' | 'journal';

export const ReadingView: React.FC<ReadingViewProps> = ({
  onSaveReading,
  onOpenSafetyModal,
  preferences
}) => {
  const [step, setStep] = useState<Step>('topic');
  const [selectedTopic, setSelectedTopic] = useState<ReadingTopic>('Personal Growth');
  const [userQuestion, setUserQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState<SpreadConfig>(SPREADS[1]); // default 3-card spread
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [activeFlippedIndices, setActiveFlippedIndices] = useState<number[]>([]);
  const [inspectingCard, setInspectingCard] = useState<TarotCard | null>(null);
  
  // Interpretation loading state
  const [isLoadingInterpretation, setIsLoadingInterpretation] = useState(false);
  const [structuredInterpretations, setStructuredInterpretations] = useState<Record<string, StructuredInterpretation>>({});
  
  // User Journaling state
  const [userNotes, setUserNotes] = useState('');
  const [userActionPlan, setUserActionPlan] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const isVi = preferences.language === 'vi';

  const topics: Array<{ id: ReadingTopic; labelVi: string; labelEn: string; icon: React.ReactNode; descVi: string; descEn: string }> = [
    { 
      id: 'Personal Growth', 
      labelVi: 'Phát Triển Bản Thân', 
      labelEn: 'Personal Growth', 
      icon: <Compass className="w-5 h-5 text-emerald-400" />,
      descVi: 'Khám phá tiềm năng, bài học nội tâm và mục tiêu cuộc sống.',
      descEn: 'Explore hidden potential, core values, and authentic direction.'
    },
    { 
      id: 'Current Emotions', 
      labelVi: 'Cảm Xúc Hiện Tại', 
      labelEn: 'Current Emotions', 
      icon: <Smile className="w-5 h-5 text-sky-400" />,
      descVi: 'Nhận diện trạng thái tâm trí, xoa dịu lo âu và lắng nghe chính mình.',
      descEn: 'Acknowledge emotions, soothe anxiety, and hold space for yourself.'
    },
    { 
      id: 'Work & Study', 
      labelVi: 'Công Việc & Học Tập', 
      labelEn: 'Work & Career', 
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      descVi: 'Góc nhìn về dự án, định hướng nghề nghiệp và động lực sáng tạo.',
      descEn: 'Gain perspective on projects, workplace dynamics, and focus.'
    },
    { 
      id: 'Love & Relationships', 
      labelVi: 'Tình Cảm & Mối Quan Hệ', 
      labelEn: 'Love & Connection', 
      icon: <Heart className="w-5 h-5 text-rose-400" />,
      descVi: 'Soi rọi sự gắn kết, ranh giới cảm xúc và giao tiếp chân thành.',
      descEn: 'Reflect on mutual understanding, boundaries, and emotional clarity.'
    },
    { 
      id: "A Decision I'm Considering", 
      labelVi: 'Cân Nhắc Quyết Định', 
      labelEn: 'A Decision I am Facing', 
      icon: <Scale className="w-5 h-5 text-indigo-400" />,
      descVi: 'Chiêm nghiệm các khía cạnh chưa nhìn thấy trước khi lựa chọn.',
      descEn: 'Examine motives and unconsidered angles before making a choice.'
    },
    { 
      id: 'General Reflection', 
      labelVi: 'Suy Ngẫm Tổng Quan', 
      labelEn: 'Mindful Reflection', 
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      descVi: 'Một khoảnh khắc tĩnh lặng để nhìn lại bức tranh tổng thể ngày hôm nay.',
      descEn: 'A quiet pause to observe your current life rhythm and mindset.'
    }
  ];

  // Handle Question Submit & Safety Check
  const handleProceedFromTopic = () => {
    if (userQuestion.trim()) {
      const safetyCheck = checkSensitiveCrisisQuery(userQuestion);
      if (safetyCheck.isCrisis) {
        onOpenSafetyModal(safetyCheck);
        return;
      }
    }
    setStep('spread');
  };

  // Card Selection Handlers
  const handleCardsDrawn = async (pickedCards: Array<{ card: TarotCard; isReversed: boolean }>) => {
    const spreadPositions = selectedSpread.positions;
    const drawn: DrawnCard[] = pickedCards.map((item, idx) => ({
      card: item.card,
      isReversed: item.isReversed,
      position: spreadPositions[idx] ? spreadPositions[idx].id : idx + 1,
      positionLabel: spreadPositions[idx]
        ? (isVi ? spreadPositions[idx].nameVi : spreadPositions[idx].name)
        : `Position ${idx + 1}`
    }));

    setDrawnCards(drawn);
    setActiveFlippedIndices([]);
    setStep('reveal');

    // Automatically trigger interpretation generation
    setIsLoadingInterpretation(true);
    const interpretationsMap: Record<string, StructuredInterpretation> = {};

    for (const d of drawn) {
      const interp = await fetchAIInterpretation(
        d.card,
        selectedTopic,
        d.positionLabel,
        d.isReversed,
        userQuestion,
        preferences.language
      );
      interpretationsMap[`${d.card.id}-${d.position}`] = interp;
    }

    setStructuredInterpretations(interpretationsMap);
    setIsLoadingInterpretation(false);
  };

  const handleFlipCard = (index: number) => {
    if (!activeFlippedIndices.includes(index)) {
      const next = [...activeFlippedIndices, index];
      setActiveFlippedIndices(next);
      if (next.length === drawnCards.length) {
        // All flipped!
      }
    }
  };

  const handleFlipAll = () => {
    setActiveFlippedIndices(drawnCards.map((_, i) => i));
  };

  const handleSaveToJournal = () => {
    const newReading: Reading = {
      id: `reading-${Date.now()}`,
      date: new Date().toISOString(),
      topic: selectedTopic,
      question: userQuestion || (isVi ? 'Suy ngẫm tự do' : 'Open reflection'),
      spreadType: selectedSpread.name,
      cards: drawnCards,
      interpretation: Object.values(structuredInterpretations).map(i => i.reflection).join('\n\n'),
      personalNotes: userNotes,
      userReflections: userActionPlan,
      tags: [selectedTopic, selectedSpread.name],
      isFavorite: false
    };

    onSaveReading(newReading);
    setSavedSuccess(true);
  };

  const handleReset = () => {
    setStep('topic');
    setUserQuestion('');
    setDrawnCards([]);
    setActiveFlippedIndices([]);
    setStructuredInterpretations({});
    setUserNotes('');
    setUserActionPlan('');
    setSavedSuccess(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Progress breadcrumbs */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-400 select-none overflow-x-auto pb-2">
        <span className={`px-3 py-1 rounded-full ${step === 'topic' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-slate-900'}`}>
          1. {isVi ? 'Chủ đề' : 'Theme'}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className={`px-3 py-1 rounded-full ${step === 'spread' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-slate-900'}`}>
          2. {isVi ? 'Kiểu trải' : 'Spread'}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className={`px-3 py-1 rounded-full ${step === 'draw' || step === 'reveal' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-slate-900'}`}>
          3. {isVi ? 'Rút & Lật bài' : 'Draw'}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className={`px-3 py-1 rounded-full ${step === 'interpret' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-slate-900'}`}>
          4. {isVi ? 'Phản chiếu & Ghi chép' : 'Reflection'}
        </span>
      </div>

      {/* STEP 1: TOPIC & QUESTION SELECTION */}
      {step === 'topic' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              {isVi ? 'Chọn Lĩnh Vực Bạn Muốn Soi Rọi' : 'Choose a Reflective Focus'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              {isVi
                ? 'Hãy dành một khoảnh khắc tĩnh tâm để xác định điều đang chiếm nhiều tâm trí bạn lúc này.'
                : 'Take a quiet moment to identify the theme you wish to explore.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((t) => {
              const isSelected = selectedTopic === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTopic(t.id)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-400/10 border-amber-400 ring-2 ring-amber-400/20 shadow-lg'
                      : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                        {t.icon}
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-serif font-bold text-base text-amber-100 mb-1">
                      {isVi ? t.labelVi : t.labelEn}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {isVi ? t.descVi : t.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Introspective Question / Focus Input */}
          <div className="max-w-2xl mx-auto bg-slate-900/80 p-6 rounded-3xl border border-slate-800 space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300">
              {isVi ? 'Câu hỏi hoặc điều bạn đang suy ngẫm (Tùy chọn)' : 'Your Introspective Question or Focus (Optional)'}
            </label>
            <textarea
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              rows={3}
              placeholder={
                isVi
                  ? 'Ví dụ: Tôi đang cảm thấy mông lung về dự án sắp tới, tôi có thể nhìn nhận lại điều này thế nào?...'
                  : 'E.g., I am feeling hesitant about an upcoming transition; what perspective might help me understand my resistance?...'
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 resize-none transition-colors"
            />
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-amber-400/70" />
              <span>
                {isVi
                  ? 'Tarot phản chiếu góc nhìn, không dự đoán tương lai hay đưa ra phán quyết.'
                  : 'Tarot reflects psychological perspectives, not prophetic verdicts.'}
              </span>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={handleProceedFromTopic}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <span>{isVi ? 'Tiếp tục chọn Kiểu trải bài' : 'Continue to Spread Selection'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SPREAD SELECTION */}
      {step === 'spread' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              {isVi ? 'Chọn Kiểu Trải Bài' : 'Select a Spread'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              {isVi
                ? 'Mỗi kiểu trải bài mang đến một cấu trúc soi rọi với các vị trí ý nghĩa khác nhau.'
                : 'Each spread provides a structured frame of reference for your reflection.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SPREADS.map((sp) => {
              const isSelected = selectedSpread.id === sp.id;
              return (
                <div
                  key={sp.id}
                  onClick={() => setSelectedSpread(sp)}
                  className={`p-6 rounded-3xl cursor-pointer border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-400/10 border-amber-400 ring-2 ring-amber-400/20 shadow-xl'
                      : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-amber-300 text-xs font-bold font-serif">
                        {sp.cardCount} {isVi ? 'Lá Bài' : 'Cards'}
                      </span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-lg text-amber-100 mb-2">
                      {isVi ? sp.nameVi : sp.name}
                    </h3>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                      {isVi ? sp.descriptionVi : sp.description}
                    </p>

                    <div className="space-y-2 border-t border-slate-800/80 pt-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-amber-400/70">
                        {isVi ? 'Các vị trí soi rọi:' : 'Positions:'}
                      </h4>
                      {sp.positions.map((pos) => (
                        <div key={pos.id} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="font-serif text-amber-300/80 font-bold">{pos.id}.</span>
                          <div>
                            <span className="font-medium text-slate-200">{isVi ? pos.nameVi : pos.name}</span>
                            <span className="text-[11px] text-slate-500 block">{isVi ? pos.descriptionVi : pos.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center max-w-xl mx-auto pt-4">
            <button
              onClick={() => setStep('topic')}
              className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors"
            >
              {isVi ? 'Quay lại chọn chủ đề' : 'Back to Theme'}
            </button>
            <button
              onClick={() => setStep('draw')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <span>{isVi ? 'Bắt đầu Rút Bài' : 'Proceed to Card Draw'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: INTERACTIVE DECK DRAW */}
      {step === 'draw' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              {isVi ? 'Rút Bài Tâm Thức' : 'Mindful Draw'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isVi ? `Đang trải kiểu: ${selectedSpread.nameVi} (${selectedSpread.cardCount} lá bài)` : `Spread: ${selectedSpread.name}`}
            </p>
          </div>

          <DeckShuffleSpread
            requiredCount={selectedSpread.cardCount}
            onCardsSelected={handleCardsDrawn}
            allowReversed={preferences.allowReversed}
            language={preferences.language}
          />
        </div>
      )}

      {/* STEP 4: CARD REVEAL */}
      {step === 'reveal' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              {isVi ? 'Lật Bài & Quan Sát Biểu Tượng' : 'Reveal & Observe the Symbols'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isVi
                ? 'Nhấp vào từng lá bài để lật mở, hoặc lật tất cả để chiêm nghiệm bức tranh tổng thể.'
                : 'Click each card to reveal its symbol, or flip all together.'}
            </p>
          </div>

          {/* Cards Display Grid */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 py-4">
            {drawnCards.map((item, idx) => {
              const isFlipped = activeFlippedIndices.includes(idx);
              return (
                <div key={idx} className="flex flex-col items-center space-y-3">
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-serif font-bold text-amber-300 text-center max-w-[200px] truncate">
                    {item.position}. {item.positionLabel}
                  </span>

                  <TarotCardView
                    card={item.card}
                    isReversed={item.isReversed}
                    isFlipped={isFlipped}
                    onFlip={() => handleFlipCard(idx)}
                    size="md"
                    language={preferences.language}
                  />

                  {isFlipped && (
                    <button
                      onClick={() => setInspectingCard(item.card)}
                      className="text-[11px] text-amber-400/80 hover:text-amber-300 flex items-center gap-1 transition-colors"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>{isVi ? 'Chi tiết lá bài' : 'Inspect Details'}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {activeFlippedIndices.length < drawnCards.length && (
              <button
                onClick={handleFlipAll}
                className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                {isVi ? 'Lật tất cả các lá bài' : 'Flip All Cards'}
              </button>
            )}

            <button
              onClick={() => setStep('interpret')}
              disabled={activeFlippedIndices.length === 0}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              <span>{isVi ? 'Xem Phản Chiếu 4 Lớp & Nhật Ký' : 'View 4-Layer Reflection & Journal'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: STRUCTURED 4-LAYER INTERPRETATION & JOURNALING */}
      {step === 'interpret' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Header Summary */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-400/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                {isVi ? 'Trải bài Phản Tỉnh' : 'Reflective Spread'}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
                {selectedTopic} • {isVi ? selectedSpread.nameVi : selectedSpread.name}
              </h2>
              {userQuestion && (
                <p className="text-xs text-slate-400 mt-1 italic">
                  "{userQuestion}"
                </p>
              )}
            </div>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {isVi ? 'Trải bài mới' : 'New Reading'}
            </button>
          </div>

          {/* Cards Breakdown with 4 Layers */}
          <div className="space-y-8">
            {drawnCards.map((item, idx) => {
              const interpKey = `${item.card.id}-${item.position}`;
              const interp = structuredInterpretations[interpKey];

              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col lg:flex-row gap-6 sm:gap-8 items-start"
                >
                  {/* Card Visual Thumbnail & Details Trigger */}
                  <div className="w-full lg:w-48 flex-shrink-0 flex flex-col items-center">
                    <TarotCardView
                      card={item.card}
                      isReversed={item.isReversed}
                      isFlipped={true}
                      size="sm"
                      language={preferences.language}
                    />
                    <div className="text-center mt-3">
                      <span className="text-[11px] font-serif font-bold text-amber-300 block">
                        {item.position}. {item.positionLabel}
                      </span>
                      <button
                        onClick={() => setInspectingCard(item.card)}
                        className="mt-1 text-[10px] text-slate-400 hover:text-amber-300 underline"
                      >
                        {isVi ? 'Xem biểu tượng gốc' : 'View Full Symbols'}
                      </button>
                    </div>
                  </div>

                  {/* 4 Layers Breakdown */}
                  <div className="flex-grow space-y-4 text-xs sm:text-sm">
                    {/* Layer 1: Symbolic Meaning */}
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400/90 flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {isVi ? 'Lớp 1: Ý Nghĩa Biểu Tượng & Nguyên Mẫu' : 'Layer 1: Symbolic Meaning & Archetype'}
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        {interp ? interp.symbolicMeaning : (isVi ? 'Đang phân tích biểu tượng...' : 'Analyzing symbolism...')}
                      </p>
                    </div>

                    {/* Layer 2: Psychological Reflection */}
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-indigo-500/20">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5 mb-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        {isVi ? 'Lớp 2: Góc Nhìn Phản Chiếu Tâm Lý' : 'Layer 2: Psychological Reflection'}
                      </h4>
                      <p className="text-slate-200 leading-relaxed">
                        {interp ? interp.reflection : (isVi ? 'Đang kiến tạo góc nhìn soi rọi...' : 'Generating introspective reflection...')}
                      </p>
                    </div>

                    {/* Layer 3: Action Seed & Journal Prompt */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5 mb-1.5">
                          <Lightbulb className="w-3.5 h-3.5" />
                          {isVi ? 'Lớp 3: Hành Động Nhỏ Hôm Nay' : 'Layer 3: Constructive Micro-Action'}
                        </h4>
                        <p className="text-emerald-100 text-xs leading-relaxed">
                          {interp ? interp.positiveGuidance : '...'}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-1.5">
                          <HelpCircle className="w-3.5 h-3.5" />
                          {isVi ? 'Câu Hỏi Tự Vấn (Prompt)' : 'Reflection Question'}
                        </h4>
                        <p className="text-amber-100 text-xs italic leading-relaxed">
                          "{interp ? interp.reflectionPrompt : '...'}"
                        </p>
                      </div>
                    </div>

                    {/* Layer 4: Autonomy Stamp */}
                    <div className="text-[11px] text-slate-500 italic pt-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                      <span>{interp ? interp.closing : ''}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Integrated Personal Journal & Action Commitment */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 border border-amber-400/30 shadow-2xl space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-amber-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                {isVi ? 'Nhật Ký Suy Ngẫm Cá Nhân' : 'Personal Reflection & Commitment'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isVi
                  ? 'Ghi lại cảm nhận, bài học và hành động bạn chọn thực hiện sau khi nhìn vào tấm gương Tarot này.'
                  : 'Capture your takeaways, emotional insights, and chosen next steps.'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  {isVi ? 'Cảm xúc & Góc nhìn tôi nhận ra:' : 'My Inner Insights & Realizations:'}
                </label>
                <textarea
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  rows={4}
                  placeholder={
                    isVi
                      ? 'Lá bài này gợi nhắc tôi về điều gì? Tôi nhận ra điều gì trong cảm xúc của mình?...'
                      : 'What does this symbol bring to light? What feelings or truths resonated with you?...'
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 resize-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
                  {isVi ? 'Hành động nhỏ tôi chọn làm:' : 'One Micro-Action I Commit to Today:'}
                </label>
                <input
                  type="text"
                  value={userActionPlan}
                  onChange={(e) => setUserActionPlan(e.target.value)}
                  placeholder={
                    isVi
                      ? 'Ví dụ: Dành 10 phút đi dạo không dùng điện thoại; nói chuyện thẳng thắn với đồng nghiệp...'
                      : 'E.g., Take a 10-minute walk without my phone; send an honest email...'
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-400/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                {savedSuccess ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    {isVi ? 'Đã lưu vào Nhật ký & Lịch sử!' : 'Saved to your Journal & History!'}
                  </span>
                ) : (
                  (isVi ? 'Dữ liệu được lưu trữ riêng tư trên thiết bị của bạn.' : 'Data is stored privately on your device.')
                )}
              </span>

              <button
                onClick={handleSaveToJournal}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>{savedSuccess ? (isVi ? 'Cập nhật ghi chép' : 'Update Journal') : (isVi ? 'Lưu vào Nhật ký' : 'Save to Journal')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Detail Modal */}
      <CardDetailModal
        card={inspectingCard}
        isOpen={Boolean(inspectingCard)}
        onClose={() => setInspectingCard(null)}
        language={preferences.language}
      />
    </div>
  );
};
