import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ETHICS_DISCLAIMER_VI, ETHICS_DISCLAIMER_EN } from '../services/safety';

interface FooterProps {
  onOpenSafetyHelpline: () => void;
  language?: 'vi' | 'en';
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSafetyHelpline,
  language = 'vi'
}) => {
  const isVi = language === 'vi';

  return (
    <footer className="w-full bg-slate-950 border-t border-amber-400/15 pt-10 pb-12 text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                <span className="font-serif italic text-xs font-bold text-amber-300">✦</span>
              </div>
              <span className="font-serif font-bold text-amber-200 text-sm tracking-tight">
                Tarot Reflection
              </span>
            </div>
            <p className="font-serif italic text-slate-300 text-xs sm:text-sm leading-relaxed">
              "{isVi ? 'Tarot không phải là lời tiên tri. Tarot là tấm gương để phản tỉnh.' : 'Tarot is not prophecy. Tarot is a mirror for reflection.'}"
            </p>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              {isVi
                ? 'Công cụ tự chiêm nghiệm dựa trên hệ thống biểu tượng tâm lý học, tôn trọng quyền tự chủ và tư duy độc lập của bạn.'
                : 'A contemplative tool rooted in archetypal psychology, honoring your personal agency and conscious judgment.'}
            </p>
          </div>

          {/* Col 2: Non-predictive charter */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-amber-300/90 uppercase tracking-widest text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {isVi ? 'Cam kết Phi Tiên Tri' : 'Non-Predictive Charter'}
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              {isVi ? ETHICS_DISCLAIMER_VI : ETHICS_DISCLAIMER_EN}
            </p>
          </div>

          {/* Col 3: Crisis Support */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-amber-300/90 uppercase tracking-widest text-[11px] flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
              {isVi ? 'Hỗ Trợ Tâm Lý & Khủng Hoảng' : 'Support & Crisis Helplines'}
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              {isVi
                ? 'Nếu bạn hoặc người thân đang trải qua thời khắc thử thách tâm lý, hãy tìm kiếm sự hỗ trợ chuyên môn kịp thời.'
                : 'If you or a loved one is navigating emotional hardship, please connect with professional crisis support.'}
            </p>
            <div>
              <button
                onClick={onOpenSafetyHelpline}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-rose-300 border border-rose-500/25 text-xs font-medium transition-colors"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
                <span>{isVi ? 'Đường dây nóng hỗ trợ tâm lý' : 'Mental Health Helplines'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Tarot Reflection. Introspective Symbolic Mirror.</p>
          <p className="italic">
            {isVi ? 'Tĩnh lặng • Thấu cảm • Tự chủ' : 'Stillness • Empathy • Agency'}
          </p>
        </div>
      </div>
    </footer>
  );
};
