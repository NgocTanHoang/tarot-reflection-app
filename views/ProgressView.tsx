import React, { useMemo } from 'react';
import { Reading, DailyReading, UserPreferences } from '../types';
import { 
  TrendingUp, 
  Flame, 
  Layers, 
  Sparkles, 
  Award, 
  Compass, 
  Droplets,
  Wind,
  Mountain
} from 'lucide-react';

interface ProgressViewProps {
  readings: Reading[];
  dailyReadings: DailyReading[];
  streakCount: number;
  preferences: UserPreferences;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  readings,
  dailyReadings,
  streakCount,
  preferences
}) => {
  const isVi = preferences.language === 'vi';

  // Calculate topic counts
  const topicStats = useMemo(() => {
    const counts: Record<string, number> = {
      'Personal Growth': 0,
      'Current Emotions': 0,
      'Work & Study': 0,
      'Love & Relationships': 0,
      "A Decision I'm Considering": 0,
      'General Reflection': 0
    };

    readings.forEach((r) => {
      if (counts[r.topic] !== undefined) {
        counts[r.topic]++;
      }
    });

    return counts;
  }, [readings]);

  // Calculate suit/element distribution
  const elementStats = useMemo(() => {
    const counts = {
      Major: 0,
      Wands: 0,
      Cups: 0,
      Swords: 0,
      Pentacles: 0
    };

    readings.forEach((r) => {
      r.cards.forEach((c) => {
        if (c.card.arcana === 'Major') {
          counts.Major++;
        } else if (c.card.suit && counts[c.card.suit] !== undefined) {
          counts[c.card.suit]++;
        }
      });
    });

    dailyReadings.forEach((d) => {
      if (d.card.arcana === 'Major') {
        counts.Major++;
      } else if (d.card.suit && counts[d.card.suit] !== undefined) {
        counts[d.card.suit]++;
      }
    });

    return counts;
  }, [readings, dailyReadings]);

  const totalSessions = readings.length + dailyReadings.length;

  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-12 px-4 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{isVi ? 'Tiến Trình • Thấu Hiểu Bản Thân' : 'Self-Discovery Insights'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
          {isVi ? 'Nhật Trình Phản Tỉnh Cá Nhân' : 'Your Reflection Landscape'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {isVi
            ? 'Quan sát các chủ đề và nguyên mẫu bạn thường kết nối nhất trong hành trình tự chiêm nghiệm.'
            : 'Observe the life themes and archetypal energies you connect with most often.'}
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
            <Layers className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {isVi ? 'Tổng Phiên Phản Tỉnh' : 'Total Reflections'}
            </span>
            <span className="text-2xl font-serif font-bold text-amber-100">
              {totalSessions}
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-400/10 border border-rose-400/30 flex items-center justify-center">
            <Flame className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {isVi ? 'Chuỗi Ngày Tĩnh Thức' : 'Daily Streak'}
            </span>
            <span className="text-2xl font-serif font-bold text-amber-100">
              {streakCount} {isVi ? 'ngày' : 'days'}
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {isVi ? 'Ghi Chép Nhật Ký' : 'Journal Entries'}
            </span>
            <span className="text-2xl font-serif font-bold text-amber-100">
              {readings.filter(r => r.personalNotes).length + dailyReadings.filter(d => d.notes).length}
            </span>
          </div>
        </div>
      </div>

      {/* Theme Distribution */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <h3 className="font-serif font-bold text-base sm:text-lg text-amber-100 flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>{isVi ? 'Phân Bổ Lĩnh Vực Soi Rọi' : 'Reflective Themes Breakdown'}</span>
        </h3>

        <div className="space-y-4">
          {Object.entries(topicStats).map(([topicName, count]) => {
            const percentage = readings.length > 0 ? Math.round((count / readings.length) * 100) : 0;
            return (
              <div key={topicName} className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>{topicName}</span>
                  <span className="font-bold text-amber-400">{count} ({percentage}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                  <div
                    style={{ width: `${percentage}%` }}
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Element & Archetype Resonance */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <h3 className="font-serif font-bold text-base sm:text-lg text-amber-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{isVi ? 'Nguyên Tố & Năng Lượng Biểu Tượng' : 'Archetypal Elements Encountered'}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-400/20 text-center space-y-1">
            <Sparkles className="w-5 h-5 mx-auto text-amber-300" />
            <span className="text-[11px] font-bold text-slate-300 block">{isVi ? 'Ẩn Chính' : 'Major'}</span>
            <span className="text-lg font-serif font-bold text-amber-200">{elementStats.Major}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/20 text-center space-y-1">
            <Flame className="w-5 h-5 mx-auto text-amber-500" />
            <span className="text-[11px] font-bold text-slate-300 block">{isVi ? 'Lửa (Gậy)' : 'Fire (Wands)'}</span>
            <span className="text-lg font-serif font-bold text-amber-200">{elementStats.Wands}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-400/20 text-center space-y-1">
            <Droplets className="w-5 h-5 mx-auto text-cyan-400" />
            <span className="text-[11px] font-bold text-slate-300 block">{isVi ? 'Nước (Cốc)' : 'Water (Cups)'}</span>
            <span className="text-lg font-serif font-bold text-amber-200">{elementStats.Cups}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-sky-400/20 text-center space-y-1">
            <Wind className="w-5 h-5 mx-auto text-sky-400" />
            <span className="text-[11px] font-bold text-slate-300 block">{isVi ? 'Khí (Kiếm)' : 'Air (Swords)'}</span>
            <span className="text-lg font-serif font-bold text-amber-200">{elementStats.Swords}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-400/20 text-center space-y-1 col-span-2 sm:col-span-1">
            <Mountain className="w-5 h-5 mx-auto text-emerald-400" />
            <span className="text-[11px] font-bold text-slate-300 block">{isVi ? 'Đất (Tiền)' : 'Earth (Pentacles)'}</span>
            <span className="text-lg font-serif font-bold text-amber-200">{elementStats.Pentacles}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
