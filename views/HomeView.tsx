import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Calendar, 
  BookOpen, 
  Scale, 
  ShieldCheck, 
  Brain, 
  Compass, 
  ArrowRight, 
  HeartHandshake,
  Lightbulb
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
    <div className="w-full space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4">
        {/* Subtle background glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          {isVi ? 'Biểu tượng • Phản tỉnh • Tự chủ' : 'Symbolism • Reflection • Agency'}
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-amber-100 tracking-tight leading-tight mb-6">
          {isVi ? (
            <>
              Tarot không phải lời tiên tri. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 italic">
                Tarot là tấm gương phản tỉnh.
              </span>
            </>
          ) : (
            <>
              Tarot is not prophecy. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 italic">
                Tarot is a mirror for reflection.
              </span>
            </>
          )}
        </h1>

        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-8">
          {isVi
            ? 'Rút một lá bài, dừng lại một nhịp thở, quan sát cảm xúc và suy nghĩ bên trong bạn. Khám phá các góc nhìn mới và tự mình đưa ra những quyết định sáng suốt.'
            : 'Draw a card, pause for a quiet breath, and observe your inner landscape. Uncover fresh perspectives and navigate life with conscious clarity.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('reading')}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Layers className="w-4 h-4" />
            {isVi ? 'Bắt đầu Trải Bài Phản Tỉnh' : 'Begin a Reflective Reading'}
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('daily')}
            className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-amber-400/30 text-amber-200 font-semibold text-sm flex items-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            {isVi ? 'Lá Bài Của Ngày' : 'Card of the Day'}
          </button>
        </div>
      </section>

      {/* Daily Card Spotlight (If drawn today) */}
      {todaysDailyCard && (
        <section className="max-w-3xl mx-auto px-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-amber-400/30 shadow-2xl flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="flex-shrink-0">
              <TarotCardView
                card={todaysDailyCard.card}
                isReversed={todaysDailyCard.isReversed}
                isFlipped={true}
                size="md"
                language={preferences.language}
              />
            </div>
            <div className="flex-grow text-center sm:text-left space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                {isVi ? 'Lá bài suy ngẫm hôm nay của bạn' : "Today's Mindful Anchor"}
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
                {isVi ? todaysDailyCard.card.nameVi : todaysDailyCard.card.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{todaysDailyCard.prompt}"
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('daily')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 transition-colors"
                >
                  {isVi ? 'Mở trang nhật ký ngày' : 'Open Daily Journal'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feature Navigation Cards */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
            {isVi ? 'Không Gian Soi Rọi Nội Tâm' : 'Introspective Spaces'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isVi
              ? 'Lựa chọn phương thức khám phá phù hợp với nhu cầu hiện tại của bạn'
              : 'Choose the mode of reflection that fits your current moment'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Spreads */}
          <div
            onClick={() => onNavigate('reading')}
            className="p-6 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="font-serif font-bold text-lg text-amber-100 mb-2">
                {isVi ? 'Trải Bài Đa Chiều' : 'Reflective Spreads'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isVi
                  ? 'Trải 1 lá, 3 lá hoặc 5 lá bài để khám phá các góc nhìn trong tình cảm, sự nghiệp, cảm xúc hay định hướng cá nhân.'
                  : 'Draw 1, 3, or 5 cards to reflect deeply on relationships, work, emotions, or personal alignment.'}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>{isVi ? 'Rút bài ngay' : 'Begin Reading'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Decision Helper */}
          <div
            onClick={() => onNavigate('decision')}
            className="p-6 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="font-serif font-bold text-lg text-amber-100 mb-2">
                {isVi ? 'Soi Rọi Quyết Định' : 'Decision Mirror'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isVi
                  ? 'Đặt hai lựa chọn A & B lên bàn cân biểu tượng để khám phá động lực tiềm ẩn, nỗi sợ vô hình và giá trị cốt lõi.'
                  : 'Examine Option A vs. Option B to clarify underlying motives, fears, and authentic values.'}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-indigo-300 group-hover:translate-x-1 transition-transform">
              <span>{isVi ? 'Cân nhắc lựa chọn' : 'Weigh Options'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: 78 Cards Library */}
          <div
            onClick={() => onNavigate('explore')}
            className="p-6 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="font-serif font-bold text-lg text-amber-100 mb-2">
                {isVi ? 'Thư Viện 78 Lá Bài' : '78 Card Library'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isVi
                  ? 'Tra cứu chi tiết biểu tượng, câu hỏi suy ngẫm, góc nhìn xuôi/ngược và bài học tâm lý của trọn bộ 78 lá.'
                  : 'Explore complete visual symbolism, reflection prompts, upright/inverted angles, and psychological depth.'}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-emerald-300 group-hover:translate-x-1 transition-transform">
              <span>{isVi ? 'Tra cứu thư viện' : 'Browse Deck'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Learning Mode */}
          <div
            onClick={() => onNavigate('learn')}
            className="p-6 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-rose-300" />
              </div>
              <h3 className="font-serif font-bold text-lg text-amber-100 mb-2">
                {isVi ? 'Học Biểu Tượng' : 'Symbolic Learning'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isVi
                  ? 'Tìm hiểu 4 nguyên tố (Lửa, Nước, Khí, Đất), Hành trình Chàng Khờ (Fool’s Journey) và bài tập nhận diện biểu tượng.'
                  : 'Master the 4 psychological elements, the Fool’s Journey archetype, and interactive reflection exercises.'}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-rose-300 group-hover:translate-x-1 transition-transform">
              <span>{isVi ? 'Bắt đầu học' : 'Start Learning'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Principles / Core Philosophy Banner */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-amber-500/20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              {isVi ? '4 Nguyên Tắc Cốt Lõi Của Trải Nghiệm' : '4 Core Pillars of Reflection'}
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              {isVi
                ? 'Được thiết kế với sự tôn trọng tuyệt đối dành cho quyền tự chủ và tư duy phản biện của bạn.'
                : 'Built with absolute respect for personal agency, critical thinking, and emotional safety.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 font-bold text-xs">
                1
              </div>
              <h4 className="font-serif font-bold text-slate-200 text-sm">
                {isVi ? 'Phi Tiên Tri' : 'Non-Predictive'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isVi
                  ? 'Không khẳng định tương lai. Lá bài là ngôn ngữ biểu tượng giúp soi rọi hiện tại.'
                  : 'Never claims to foresee destiny. Tarot is a symbolic language for exploring the present.'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-400/10 border border-indigo-400/30 flex items-center justify-center text-indigo-300 font-bold text-xs">
                2
              </div>
              <h4 className="font-serif font-bold text-slate-200 text-sm">
                {isVi ? 'Tâm Lý & Phản Tỉnh' : 'Self-Reflection'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isVi
                  ? 'Kết nối với các nguyên mẫu tâm lý của Carl Jung để thấu hiểu cảm xúc và nhu cầu bên trong.'
                  : 'Connects with psychological archetypes to understand inner emotions and unspoken needs.'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-300 font-bold text-xs">
                3
              </div>
              <h4 className="font-serif font-bold text-slate-200 text-sm">
                {isVi ? 'Hành Động Nhỏ' : 'Constructive Action'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isVi
                  ? 'Mỗi trải bài luôn khép lại với 1 hành động thực tế, giúp bạn chủ động kiến tạo đời sống.'
                  : 'Every reading provides a tangible micro-action so you maintain active momentum.'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-rose-400/10 border border-rose-400/30 flex items-center justify-center text-rose-300 font-bold text-xs">
                4
              </div>
              <h4 className="font-serif font-bold text-slate-200 text-sm">
                {isVi ? 'Quyền Tự Chủ' : 'Personal Autonomy'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isVi
                  ? 'Bạn là người hiểu hoàn cảnh của mình nhất. Lá bài là gợi mở, bạn là người quyết định.'
                  : 'You know yourself best. The cards offer a mirror; the power to choose is always yours.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
