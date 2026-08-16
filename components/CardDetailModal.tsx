import React, { useState } from 'react';
import { TarotCard } from '../types';
import { X, Sparkles, Compass, Heart, Briefcase, Smile, Scale, RotateCw, Lightbulb, BookOpen } from 'lucide-react';
import { TarotCardView } from './TarotCardView';

interface CardDetailModalProps {
  card: TarotCard | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForReading?: (card: TarotCard) => void;
  language?: 'vi' | 'en';
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  isOpen,
  onClose,
  onSelectForReading,
  language = 'vi'
}) => {
  const [isReversedView, setIsReversedView] = useState(false);
  const [activeTab, setActiveTab] = useState<'symbolism' | 'psychology' | 'context' | 'prompts'>('symbolism');

  if (!isOpen || !card) return null;

  const isVi = language === 'vi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-amber-400/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left column: Card Visual & Controls */}
        <div className="w-full md:w-5/12 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/40 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800">
          <div className="my-auto py-4 flex flex-col items-center">
            <TarotCardView
              card={card}
              isReversed={isReversedView}
              isFlipped={true}
              size="lg"
              language={language}
            />

            <button
              onClick={() => setIsReversedView(!isReversedView)}
              className="mt-4 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium flex items-center gap-2 border border-amber-400/20 transition-all active:scale-95 shadow-md"
            >
              <RotateCw className="w-3.5 h-3.5" />
              {isReversedView
                ? (isVi ? 'Xem góc thẳng (Upright)' : 'View Upright')
                : (isVi ? 'Xem góc nội tâm (Reversed)' : 'View Inverted Perspective')}
            </button>
          </div>

          <div className="w-full text-center mt-2">
            <span className="text-xs font-medium text-amber-400/80">
              {card.arcana} Arcana {card.suit ? `• ${card.suit}` : ''}
            </span>
          </div>
        </div>

        {/* Right column: Rich Meaning & Tabs */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col overflow-y-auto max-h-[85vh] md:max-h-[90vh]">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              {isVi ? card.nameVi : card.name}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {(isVi ? card.keywordsVi : card.keywords).map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-medium border border-amber-400/20"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 mb-6 gap-2 sm:gap-4 text-xs font-medium text-slate-400">
            <button
              onClick={() => setActiveTab('symbolism')}
              className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'symbolism'
                  ? 'text-amber-300 border-amber-400 font-semibold'
                  : 'border-transparent hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isVi ? 'Biểu Tượng' : 'Symbolism'}</span>
            </button>
            <button
              onClick={() => setActiveTab('psychology')}
              className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'psychology'
                  ? 'text-amber-300 border-amber-400'
                  : 'border-transparent hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              {isVi ? 'Phản Chiếu' : 'Reflection'}
            </button>
            <button
              onClick={() => setActiveTab('context')}
              className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'context'
                  ? 'text-amber-300 border-amber-400'
                  : 'border-transparent hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              {isVi ? 'Ngữ Cảnh' : 'Context'}
            </button>
            <button
              onClick={() => setActiveTab('prompts')}
              className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'prompts'
                  ? 'text-amber-300 border-amber-400'
                  : 'border-transparent hover:text-slate-200'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              {isVi ? 'Gợi Ý' : 'Prompts & Actions'}
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-grow space-y-6 text-slate-300 text-sm leading-relaxed">
            {activeTab === 'symbolism' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400/80 mb-2">
                    {isVi ? 'Mô tả biểu tượng tổng quan' : 'Visual Symbolism'}
                  </h4>
                  <p className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                    {isVi ? card.symbolismVi : card.symbolism}
                  </p>
                </div>

                {card.symbols && card.symbols.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400/80 mb-2">
                      {isVi ? 'Ý nghĩa các chi tiết cốt lõi' : 'Key Symbolic Elements'}
                    </h4>
                    <div className="space-y-2">
                      {card.symbols.map((sym, idx) => (
                        <div key={idx} className="p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                          <span className="font-serif font-bold text-amber-200">
                            {isVi ? sym.nameVi : sym.name}:
                          </span>{' '}
                          <span className="text-slate-300">{isVi ? sym.meaningVi : sym.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'psychology' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {isVi ? 'Góc nhìn xuôi (Upright Interpretation)' : 'Upright Interpretation'}
                  </h4>
                  <p className="text-slate-200 mt-2">{isVi ? card.uprightMeaningVi : card.uprightMeaning}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-indigo-500/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                    {isVi ? 'Góc nhìn chuyển hóa / nội tâm (Reversed)' : 'Internalized / Reversed Perspective'}
                  </h4>
                  <p className="text-slate-200 mt-2">{isVi ? card.reversedMeaningVi : card.reversedMeaning}</p>
                  <p className="text-xs text-indigo-300/70 mt-2 italic">
                    {isVi
                      ? 'Lưu ý: Lá bài ngược đại diện cho năng lượng cần được chiêm nghiệm bên trong, tuyệt đối không phải điềm xấu.'
                      : 'Note: Reversed cards invite introspective self-inquiry rather than indicating misfortune.'}
                  </p>
                </div>

                {card.cautionContext && (
                  <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90">
                    <strong className="font-semibold text-amber-300">
                      {isVi ? 'Lưu tâm lành mạnh:' : 'Constructive Awareness:'}
                    </strong>{' '}
                    {isVi ? card.cautionContextVi : card.cautionContext}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'context' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-200">
                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300 mb-1.5">
                    <Heart className="w-3.5 h-3.5" />
                    {isVi ? 'Tình cảm' : 'Love & Relationships'}
                  </div>
                  <p className="text-xs text-slate-300">
                    {isVi ? card.contextualInsights.vi.love : card.contextualInsights.en.love}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    {isVi ? 'Công việc' : 'Work & Study'}
                  </div>
                  <p className="text-xs text-slate-300">
                    {isVi ? card.contextualInsights.vi.work : card.contextualInsights.en.work}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    {isVi ? 'Phát triển bản thân' : 'Personal Growth'}
                  </div>
                  <p className="text-xs text-slate-300">
                    {isVi ? card.contextualInsights.vi.growth : card.contextualInsights.en.growth}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-300 mb-1.5">
                    <Smile className="w-3.5 h-3.5" />
                    {isVi ? 'Cảm xúc' : 'Current Emotions'}
                  </div>
                  <p className="text-xs text-slate-300">
                    {isVi ? card.contextualInsights.vi.emotion : card.contextualInsights.en.emotion}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'prompts' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-2 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    {isVi ? 'Câu hỏi tự suy ngẫm (Journal Prompts)' : 'Self-Reflection Prompts'}
                  </h4>
                  <ul className="space-y-2">
                    {(isVi ? card.reflectionPromptsVi : card.reflectionPrompts).map((p, idx) => (
                      <li
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 font-serif italic text-amber-100/90 text-sm"
                      >
                        "{p}"
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400/90 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-3.5 h-3.5" />
                    {isVi ? 'Hành động nhỏ có thể làm ngay' : 'Positive Micro-Actions'}
                  </h4>
                  <ul className="space-y-2">
                    {(isVi ? card.positiveActionsVi : card.positiveActions).map((act, idx) => (
                      <li
                        key={idx}
                        className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-slate-200 text-xs flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Footer of modal */}
          <div className="pt-6 border-t border-slate-800 flex justify-between items-center mt-6">
            <span className="text-[11px] text-slate-500 italic">
              {isVi
                ? 'Tarot là tấm gương phản chiếu, quyền quyết định luôn là của bạn.'
                : 'Tarot is a mirror; you always hold the power to choose.'}
            </span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold tracking-wider uppercase transition-colors"
            >
              {isVi ? 'Đóng' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
