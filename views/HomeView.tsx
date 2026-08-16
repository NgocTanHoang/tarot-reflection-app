import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Calendar, 
  BookOpen, 
  Scale, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  Lightbulb,
  HeartHandshake
} from 'lucide-react';
import { ActiveView } from '../components/Navbar';
import { DailyReading, UserPreferences } from '../types';
import { TarotCardView } from '../components/TarotCardView';

interface HomeViewProps {
  onNavigate: (view: ActiveView) => void;
  todaysDailyCard: DailyReading | null;
  preferences: UserPreferences;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  todaysDailyCard,
  preferences
}) => {
  const isVi = preferences.language === 'vi';

  return (
    <div className="w-full max-w-6xl mx-auto space-y-16 sm:space-y-20 py-8 sm:py-14 px-4 sm:px-6">
      {/* Editorial Hero Section */}
      <section className="relative text-center max-w-3xl mx-auto space-y-6 pt-4">
        {/* Subtle radial ambient warmth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isVi ? 'Biểu tượng • Phản tỉnh • Quyền tự chủ' : 'Symbolism • Reflection • Autonomy'}</span>
        </div>

        <div className="max-w-2xl mx-auto space-y-2.5">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-amber-100 leading-[1.25] tracking-normal">
            {isVi ? 'Tarot không phải lời tiên tri.' : 'Tarot is not prophecy.'}
          </h1>
          <p className="text-xl sm:text-3xl md:text-4xl font-serif italic text-amber-300/95 leading-[1.3] tracking-normal font-normal">
            {isVi ? 'Tarot là tấm gương để phản tỉnh.' : 'Tarot is a mirror for reflection.'}
          </p>
        </div>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
          {isVi
            ? 'Rút một lá bài. Dừng lại một nhịp thở. Lắng nghe cảm xúc và suy ngẫm chân thật bên trong bạn để chủ động đưa ra những lựa chọn tỉnh thức.'
            : 'Draw a card. Pause for a quiet breath. Observe your honest inner landscape to navigate decisions with conscious clarity.'}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <button
            onClick={() => onNavigate('reading')}
            className="px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/15 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Layers className="w-4 h-4" />
            <span>{isVi ? 'Bắt đầu Trải Bài' : 'Begin a Reading'}</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>

          <button
            onClick={() => onNavigate('daily')}
            className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-amber-400/30 text-amber-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{isVi ? 'Lá Bài Của Ngày' : 'Card of the Day'}</span>
          </button>
        </div>
      </section>

      {/* Daily Card Spotlight (If drawn today) */}
      {todaysDailyCard && (
        <section className="max-w-2xl mx-auto">
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-amber-400/25 shadow-xl flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <TarotCardView
                card={todaysDailyCard.card}
                isReversed={todaysDailyCard.isReversed}
                isFlipped={true}
                size="sm"
                language={preferences.language}
              />
            </div>
            <div className="flex-grow text-center sm:text-left space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 text-[11px] font-semibold">
                <Calendar className="w-3 h-3" />
                <span>{isVi ? 'Lá bài suy ngẫm hôm nay của bạn' : "Today's Reflective Anchor"}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-100">
                {isVi ? todaysDailyCard.card.nameVi : todaysDailyCard.card.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{todaysDailyCard.prompt}"
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onNavigate('daily')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 transition-colors"
                >
                  <span>{isVi ? 'Xem chi tiết nhật ký' : 'Open Daily Log'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Asymmetric Core Spaces */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-amber-400/15 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              {isVi ? 'Các Không Gian Soi Rọi' : 'Contemplative Spaces'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isVi ? 'Chọn phương thức tiếp cận phù hợp với tâm trạng và câu hỏi của bạn' : 'Select an introspective mode matching your current inquiry'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Featured Large Card: Multidimensional Reading Spreads */}
          <div
            onClick={() => onNavigate('reading')}
            className="md:col-span-7 p-7 sm:p-8 rounded-3xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-amber-400">
                  {isVi ? 'Phương thức chính' : 'Core Practice'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 group-hover:text-amber-200 transition-colors">
                  {isVi ? 'Trải Bài Phản Tỉnh Đa Chiều' : 'Multidimensional Spreads'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg">
                {isVi
                  ? 'Trải 1 lá (Điểm tựa), 3 lá (Quá khứ - Hiện tại - Định hướng) hoặc 5 lá (Toàn cảnh nội tâm). Phân tích 4 tầng nghĩa tâm lý kết hợp hành động nhỏ thiết thực.'
                  : 'Choose 1-card, 3-card, or 5-card spreads. Receive 4-layer psychological interpretations paired with actionable micro-habits.'}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-1.5 text-xs font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
              <span>{isVi ? 'Bắt đầu trải bài' : 'Begin Spread'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Side Card: Decision Helper */}
          <div
            onClick={() => onNavigate('decision')}
            className="md:col-span-5 p-7 rounded-3xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                <Scale className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-indigo-300">
                  {isVi ? 'So sánh song song' : 'Dual-Path Inquiry'}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-100 group-hover:text-amber-200 transition-colors">
                  {isVi ? 'Soi Rọi Quyết Định' : 'Decision Mirror'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {isVi
                  ? 'Đặt hai ngã rẽ A và B lên bàn cân biểu tượng để bóc tách động lực tiềm ẩn, nỗi sợ vô hình và giá trị neo giữ.'
                  : 'Examine two paths side-by-side to uncover hidden motivations, unacknowledged fears, and anchor values.'}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-indigo-300 group-hover:translate-x-1 transition-transform">
              <span>{isVi ? 'Cân nhắc hai lựa chọn' : 'Examine Dual Paths'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: 78 Cards Library */}
          <div
            onClick={() => onNavigate('explore')}
            className="md:col-span-6 p-7 rounded-3xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-emerald-400">
                  {isVi ? 'Bách khoa toàn thư' : 'Encyclopedia'}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-100 group-hover:text-amber-200 transition-colors">
                  {isVi ? 'Thư Viện 78 Lá Bài' : '78 Card Archetypes'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {isVi
                  ? 'Tra cứu biểu tượng hình ảnh, câu hỏi gợi mở, chiều xuôi và chiều ngược của Bộ Ẩn Chính cùng 4 Bộ Ẩn Phụ.'
                  : 'Look up detailed visual symbolism, self-inquiry prompts, upright and reversed perspectives for all 78 cards.'}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-300 group-hover:translate-x-1 transition-transform">
              <span>{isVi ? 'Khám phá thư viện' : 'Browse Deck'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: Learning Mode */}
          <div
            onClick={() => onNavigate('learn')}
            className="md:col-span-6 p-7 rounded-3xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-amber-400">
                  {isVi ? 'Tri thức & Thực hành' : 'Philosophy & Practice'}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-100 group-hover:text-amber-200 transition-colors">
                  {isVi ? 'Học Biểu Tượng & Tâm Lý Học' : 'Symbolic Mastery'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {isVi
                  ? 'Tìm hiểu 4 nguyên tố (Lửa, Nước, Khí, Đất), Hành trình Chàng Khờ (Fool’s Journey) và thực hành bài tập tình huống.'
                  : 'Understand the 4 elements, the Hero’s psychological journey, and practical case reflections.'}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
              <span>{isVi ? 'Bắt đầu học' : 'Learn Symbols'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Principles / Core Philosophy */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-amber-400/15 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isVi ? 'Cam kết chất lượng trải nghiệm' : 'Mindful Reflection Charter'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
            {isVi ? '4 Trụ Cột Tự Phản Tỉnh' : '4 Pillars of Inner Inquiry'}
          </h2>
          <p className="text-xs text-slate-400">
            {isVi
              ? 'Xây dựng trên nền tảng tâm lý học biểu tượng, tôn trọng hoàn toàn tự do ý chí của bạn.'
              : 'Grounded in archetypal psychology with total respect for your personal sovereignty.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-850 space-y-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 font-serif font-bold text-xs">
              I
            </div>
            <h4 className="font-serif font-bold text-slate-200 text-sm">
              {isVi ? 'Phi Tiên Tri' : 'Non-Predictive'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isVi
                ? 'Không phán đoán tương lai hay tạo cảm giác phụ thuộc. Lá bài là phương tiện để nhìn sâu vào hiện tại.'
                : 'Never attempts to predict the future. The cards are mirrors to illuminate the present moment.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-850 space-y-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 font-serif font-bold text-xs">
              II
            </div>
            <h4 className="font-serif font-bold text-slate-200 text-sm">
              {isVi ? 'Tâm Lý & Biểu Tượng' : 'Jungian Archetypes'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isVi
                ? 'Dựa trên hệ thống biểu tượng vô thức tập thể để thấu hiểu cảm xúc, động lực và nhu cầu chưa gọi tên.'
                : 'Draws upon archetypal psychology to understand latent emotions, motives, and unspoken needs.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-850 space-y-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 font-serif font-bold text-xs">
              III
            </div>
            <h4 className="font-serif font-bold text-slate-200 text-sm">
              {isVi ? 'Hành Động Nhỏ' : 'Micro-Action'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isVi
                ? 'Mỗi lần suy ngẫm luôn đi kèm 1 hạt mầm hành động thiết thực, giúp biến nhận thức thành sự chuyển hóa.'
                : 'Every reflection offers a concrete micro-action, turning insights into real-life positive momentum.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-850 space-y-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 font-serif font-bold text-xs">
              IV
            </div>
            <h4 className="font-serif font-bold text-slate-200 text-sm">
              {isVi ? 'Quyền Tự Chủ' : 'Personal Agency'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isVi
                ? 'Bạn luôn là người làm chủ đời sống của mình. Lá bài gợi mở góc nhìn, quyết định luôn thuộc về bạn.'
                : 'You are the author of your life. The cards offer perspectives; the choice is always yours.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
