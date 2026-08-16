import React, { useState } from 'react';
import { 
  ReadingTopic, 
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
  HelpCircle
} from 'lucide-react';

interface ReadingViewProps {
  onSaveReading: (reading: Reading) => void;
  onOpenSafetyModal: (safety: SafetyCheckResult) => void;
  preferences: UserPreferences;
}

type Step = 'topic' | 'spread' | 'draw' | 'reveal' | 'interpret';

export const ReadingView: React.FC<ReadingViewProps> = ({
  onSaveReading,
  onOpenSafetyModal,
  preferences
}) => {
  const [step, setStep] = useState<Step>('topic');
  const [selectedTopic, setSelectedTopic] = useState<ReadingTopic>('Personal Growth');
  const [userQuestion, setUserQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState(SPREADS[1]); // default 3-card
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
      icon: <Compass className="w-4 h-4 text-emerald-400" />,
      descVi: 'Khám phá tiềm năng, nhận diện điểm mù và định hướng cuộc sống.',
      descEn: 'Explore hidden potential, core values, and authentic direction.'
    },
    { 
      id: 'Current Emotions', 
      labelVi: 'Cảm Xúc Hiện Tại', 
      labelEn: 'Current Emotions', 
      icon: <Smile className="w-4 h-4 text-sky-400" />,
      descVi: 'Nhận diện trạng thái tâm trí, xoa dịu lo âu và lắng nghe chính mình.',
      descEn: 'Acknowledge emotions, soothe anxiety, and hold space for yourself.'
    },
    { 
      id: 'Work & Study', 
      labelVi: 'Công Việc & Học Tập', 
      labelEn: 'Work & Career', 
      icon: <Briefcase className="w-4 h-4 text-amber-400" />,
      descVi: 'Góc nhìn về dự án, sự nghiệp và động lực sáng tạo bền bỉ.',
      descEn: 'Gain perspective on projects, career dynamics, and focus.'
    },
    { 
      id: 'Love & Relationships', 
      labelVi: 'Tình Cảm & Mối Quan Hệ', 
      labelEn: 'Love & Connection', 
      icon: <Heart className="w-4 h-4 text-rose-400" />,
      descVi: 'Soi rọi sự gắn kết, ranh giới cảm xúc và sự thấu cảm.',
      descEn: 'Reflect on mutual understanding, boundaries, and emotional clarity.'
    },
    { 
      id: "A Decision I'm Considering", 
      labelVi: 'Cân Nhắc Quyết Định', 
      labelEn: 'A Decision I am Facing', 
      icon: <Scale className="w-4 h-4 text-indigo-400" />,
      descVi: 'Chiêm nghiệm các khía cạnh vô thức trước khi lựa chọn.',
      descEn: 'Examine motives and unconsidered angles before making a choice.'
    },
    { 
      id: 'General Reflection', 
      labelVi: 'Suy Ngẫm Tổng Quan', 
      labelEn: 'Mindful Reflection', 
      icon: <Sparkles className="w-4 h-4 text-amber-300" />,
      descVi: 'Khoảnh khắc tĩnh lặng để nhìn lại nhịp điệu sống ngày hôm nay.',
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
      position: spreadPositions[idx] ? spreadPositions[idx].index + 1 : idx + 1,
      positionLabel: spreadPositions[idx]
        ? (isVi ? spreadPositions[idx].labelVi : spreadPositions[idx].label)
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
    }
  };

  const handleFlipAll = () => {
    setActiveFlippedIndices(drawnCards.map((_, i) => i));
  };

  const handleSaveToJournal = () => {
    const spreadName = isVi ? selectedSpread.titleVi : selectedSpread.title;
    const newReading: Reading = {
      id: `reading-${Date.now()}`,
      date: new Date().toISOString(),
      topic: selectedTopic,
      question: userQuestion || (isVi ? 'Suy ngẫm tự do' : 'Open reflection'),
      spreadType: spreadName,
      cards: drawnCards,
      interpretation: Object.values(structuredInterpretations).map(i => i.reflection).join('\n\n'),
      personalNotes: userNotes,
      userReflections: userActionPlan,
      tags: [selectedTopic, spreadName],
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
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-12 px-4 space-y-10">
      {/* Progress Breadcrumb Navigation */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-3 text-xs select-none overflow-x-auto pb-1">
        <span className={`px-3 py-1 rounded-xl transition-all ${
          step === 'topic' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold' : 'text-slate-500'
        }`}>
          1. {isVi ? 'Chủ đề' : 'Topic'}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
        <span className={`px-3 py-1 rounded-xl transition-all ${
          step === 'spread' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold' : 'text-slate-500'
        }`}>
          2. {isVi ? 'Kiểu trải' : 'Spread'}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
        <span className={`px-3 py-1 rounded-xl transition-all ${
          step === 'draw' || step === 'reveal' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold' : 'text-slate-500'
        }`}>
          3. {isVi ? 'Rút & Lật bài' : 'Draw & Flip'}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
        <span className={`px-3 py-1 rounded-xl transition-all ${
          step === 'interpret' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold' : 'text-slate-500'
        }`}>
          4. {isVi ? 'Phản chiếu & Ghi chép' : 'Reflection & Journal'}
        </span>
      </div>

      {/* STEP 1: TOPIC & QUESTION SELECTION */}
      {step === 'topic' && (
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              {isVi ? 'Chọn Chủ Đề Soi Rọi' : 'Choose Your Reflective Focus'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isVi
                ? 'Dành một khoảnh khắc tĩnh tâm để xác định điều bạn muốn nhìn sâu vào lúc này.'
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
                      ? 'bg-amber-400/10 border-amber-400 ring-1 ring-amber-400/30 shadow-md'
                      : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                        {t.icon}
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm sm:text-base text-amber-100 mb-1">
                        {isVi ? t.labelVi : t.labelEn}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {isVi ? t.descVi : t.descEn}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Introspective Question / Focus Input */}
          <div className="max-w-xl mx-auto bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300">
              {isVi ? 'Câu hỏi hoặc điều bạn đang suy ngẫm (Tùy chọn)' : 'Your Introspective Question or Focus (Optional)'}
            </label>
            <textarea
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              rows={3}
              placeholder={
                isVi
                  ? 'Ví dụ: Tôi đang cảm thấy do dự về một bước ngoặt; điều gì đang là rào cản vô thức bên trong tôi?...'
                  : 'E.g., I am feeling hesitant about a new direction; what internal resistance might I be overlooking?...'
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 resize-none transition-colors"
            />
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400/70" />
              <span>
                {isVi
                  ? 'Tarot phản chiếu góc nhìn, không dự đoán tương lai hay đưa ra phán quyết.'
                  : 'Tarot reflects psychological perspectives, not prophetic outcomes.'}
              </span>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={handleProceedFromTopic}
              className="px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span>{isVi ? 'Tiếp tục chọn Kiểu trải bài' : 'Continue to Spread Selection'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SPREAD SELECTION */}
      {step === 'spread' && (
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              {isVi ? 'Chọn Kiểu Trải Bài' : 'Select a Spread'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isVi
                ? 'Lựa chọn độ sâu của bức tranh phản chiếu phù hợp với thời gian và nhu cầu của bạn.'
                : 'Choose the depth of inquiry that matches your current space and focus.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SPREADS.map((sp) => {
              const isSelected = selectedSpread.id === sp.id || selectedSpread.type === sp.type;
              return (
                <div
                  key={sp.id || sp.type}
                  onClick={() => setSelectedSpread(sp)}
                  className={`p-6 rounded-3xl cursor-pointer border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-400/10 border-amber-400 ring-1 ring-amber-400/30 shadow-xl'
                      : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold font-serif ${
                        isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-950 border border-slate-800 text-amber-300'
                      }`}>
                        {sp.cardCount || sp.positions.length} {isVi ? 'Lá Bài' : 'Cards'}
                      </span>
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          {isVi ? 'Đang chọn' : 'Selected'}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500">
                          {isVi ? 'Nhấn để chọn' : 'Select'}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-amber-100 mb-1.5">
                        {isVi ? sp.titleVi : sp.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {isVi ? sp.descriptionVi : sp.description}
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-slate-800/80 pt-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80">
                        {isVi ? 'Các vị trí soi rọi:' : 'Positions:'}
                      </h4>
                      {sp.positions.map((pos) => (
                        <div key={pos.index} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="font-serif text-amber-300 font-bold">{pos.index + 1}.</span>
                          <div>
                            <span className="font-medium text-slate-200">{isVi ? pos.labelVi : pos.label}</span>
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

          <div className="flex justify-between items-center max-w-lg mx-auto pt-4">
            <button
              onClick={() => setStep('topic')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors border border-slate-800"
            >
              {isVi ? '← Quay lại' : '← Back'}
            </button>
            <button
              onClick={() => setStep('draw')}
              className="px-7 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span>{isVi ? `Bắt đầu Rút ${selectedSpread.cardCount || selectedSpread.positions.length} Lá` : `Draw ${selectedSpread.cardCount || selectedSpread.positions.length} Cards`}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: INTERACTIVE DECK DRAW */}
      {step === 'draw' && (
        <div className="space-y-6">
          <div className="text-center max-w-lg mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              {isVi ? 'Rút Bài Tâm Thức' : 'Mindful Draw'}
            </h2>
            <p className="text-xs text-slate-400">
              {isVi 
                ? `Kiểu trải: ${selectedSpread.titleVi} (${selectedSpread.cardCount || selectedSpread.positions.length} lá bài)` 
                : `Spread: ${selectedSpread.title} (${selectedSpread.cardCount || selectedSpread.positions.length} cards)`}
            </p>
          </div>

          <DeckShuffleSpread
            requiredCount={selectedSpread.cardCount || selectedSpread.positions.length}
            spreadTitle={selectedSpread.title}
            spreadTitleVi={selectedSpread.titleVi}
            onCardsSelected={handleCardsDrawn}
            allowReversed={preferences.allowReversed}
            language={preferences.language}
          />
        </div>
      )}

      {/* STEP 4: CARD REVEAL */}
      {step === 'reveal' && (
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              {isVi ? 'Lật Bài & Quan Sát Biểu Tượng' : 'Reveal & Observe the Symbols'}
            </h2>
            <p className="text-xs text-slate-400">
              {isVi
                ? 'Nhấp vào từng lá bài để lật mở và cảm nhận rung cảm trực giác ban đầu.'
                : 'Click each card to reveal its symbol and observe your immediate intuition.'}
            </p>
          </div>

          {/* Cards Display Grid */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 py-4">
            {drawnCards.map((item, idx) => {
              const isFlipped = activeFlippedIndices.includes(idx);
              const cleanLabel = item.positionLabel.replace(/^\d+\.\s*/, '');

              return (
                <div key={`reveal-${item.card.id}-${item.position}`} className="flex flex-col items-center space-y-3">
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-amber-400/30 text-xs font-serif font-bold text-amber-300 text-center max-w-[200px] truncate shadow-sm">
                    {item.position}. {cleanLabel}
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
                      className="text-xs text-amber-400/90 hover:text-amber-300 flex items-center gap-1.5 transition-colors font-medium"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isVi ? 'Tra cứu biểu tượng' : 'Inspect Symbols'}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {activeFlippedIndices.length < drawnCards.length && (
              <button
                onClick={handleFlipAll}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                {isVi ? 'Lật tất cả các lá bài' : 'Flip All Cards'}
              </button>
            )}

            <button
              onClick={() => setStep('interpret')}
              disabled={activeFlippedIndices.length === 0}
              className="px-8 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <span>{isVi ? 'Xem Phản Chiếu 4 Lớp & Nhật Ký' : 'View 4-Layer Reflection & Journal'}</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: STRUCTURED 4-LAYER INTERPRETATION & CONTEMPLATIVE JOURNAL */}
      {step === 'interpret' && (
        <div className="space-y-10">
          {/* Header Summary */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-400/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                {isVi ? 'Trải bài Phản Tỉnh' : 'Reflective Spread'}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
                {selectedTopic} • {isVi ? selectedSpread.titleVi : selectedSpread.title}
              </h2>
              {userQuestion && (
                <p className="text-xs text-slate-400 italic">
                  "{userQuestion}"
                </p>
              )}
            </div>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isVi ? 'Trải bài mới' : 'New Reading'}</span>
            </button>
          </div>

          {/* Cards Breakdown with 4 Layers */}
          <div className="space-y-8">
            {drawnCards.map((item) => {
              const interpKey = `${item.card.id}-${item.position}`;
              const interp = structuredInterpretations[interpKey];
              const cleanPositionLabel = item.positionLabel.replace(/^\d+\.\s*/, '');

              return (
                <div
                  key={`interpret-${item.card.id}-${item.position}`}
                  className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row gap-6 items-start"
                >
                  {/* Card Visual */}
                  <div className="flex-shrink-0 flex flex-col items-center mx-auto md:mx-0">
                    <TarotCardView
                      card={item.card}
                      isReversed={item.isReversed}
                      isFlipped={true}
                      size="sm"
                      language={preferences.language}
                    />
                    <div className="text-center mt-2.5 max-w-[160px]">
                      <span className="text-xs font-serif font-bold text-amber-300 block">
                        {item.position}. {cleanPositionLabel}
                      </span>
                      <button
                        onClick={() => setInspectingCard(item.card)}
                        className="mt-1 text-[11px] text-slate-400 hover:text-amber-300 underline font-medium"
                      >
                        {isVi ? 'Xem biểu tượng gốc' : 'View Full Symbols'}
                      </button>
                    </div>
                  </div>

                  {/* 4 Layers Breakdown */}
                  <div className="flex-grow space-y-4 text-xs sm:text-sm w-full">
                    {/* Layer 1: Symbolic Meaning */}
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isVi ? 'Lớp 1: Ý Nghĩa Biểu Tượng & Nguyên Mẫu' : 'Layer 1: Symbolic Meaning & Archetype'}</span>
                      </h4>
                      <p className="text-slate-300 leading-relaxed font-sans">
                        {interp ? interp.symbolicMeaning : (isVi ? 'Đang phân tích biểu tượng...' : 'Analyzing symbolism...')}
                      </p>
                    </div>

                    {/* Layer 2: Psychological Reflection */}
                    <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-1">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{isVi ? 'Lớp 2: Góc Nhìn Phản Chiếu Tâm Lý' : 'Layer 2: Psychological Reflection'}</span>
                      </h4>
                      <p className="text-slate-200 leading-relaxed font-sans">
                        {interp ? interp.reflection : (isVi ? 'Đang kiến tạo góc nhìn soi rọi...' : 'Generating introspective reflection...')}
                      </p>
                    </div>

                    {/* Layer 3: Action Seed & Journal Prompt */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{isVi ? 'Lớp 3: Hành Động Nhỏ Hôm Nay' : 'Layer 3: Constructive Micro-Action'}</span>
                        </h4>
                        <p className="text-emerald-100 text-xs leading-relaxed font-sans">
                          {interp ? interp.positiveGuidance : '...'}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-1">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>{isVi ? 'Câu Hỏi Tự Vấn (Prompt)' : 'Reflection Question'}</span>
                        </h4>
                        <p className="text-amber-100 text-xs italic leading-relaxed font-serif">
                          "{interp ? interp.reflectionPrompt : '...'}"
                        </p>
                      </div>
                    </div>

                    {/* Layer 4: Autonomy Stamp */}
                    <div className="text-[11px] text-slate-500 italic pt-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      <span>{interp ? interp.closing : ''}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Integrated Personal Journal & Action Commitment */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-amber-400/25 space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-amber-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>{isVi ? 'Nhật Ký Suy Ngẫm Cá Nhân' : 'Personal Reflection & Commitment'}</span>
              </h3>
              <p className="text-xs text-slate-400">
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
                    <span>{isVi ? 'Đã lưu vào Nhật ký & Lịch sử!' : 'Saved to your Journal & History!'}</span>
                  </span>
                ) : (
                  (isVi ? 'Dữ liệu được lưu trữ riêng tư trên thiết bị của bạn.' : 'Data is stored privately on your device.')
                )}
              </span>

              <button
                onClick={handleSaveToJournal}
                className="px-7 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
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
