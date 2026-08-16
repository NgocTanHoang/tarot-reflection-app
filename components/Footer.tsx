import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, BookOpen } from 'lucide-react';
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
    <footer className="w-full bg-slate-950 border-t border-slate-900 pt-12 pb-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Col 1: Philosophy */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <span className="font-serif font-bold text-amber-200 text-sm">
                Tarot Reflection
              </span>
            </div>
            <p className="font-serif italic text-slate-300 text-sm">
              "{isVi ? 'Tarot không phải là lời tiên tri. Tarot là tấm gương để phản tỉnh.' : 'Tarot is not prophecy. Tarot is a mirror for reflection.'}"
            </p>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              {isVi
                ? 'Một trải nghiệm khám phá bản thân dựa trên hệ thống biểu tượng tâm lý, khuyến khích suy ngẫm độc lập và quyền tự chủ cá nhân.'
                : 'A self-discovery experience rooted in archetypal symbolism, encouraging independent reflection and personal agency.'}
            </p>
          </div>

          {/* Col 2: Safety & Non-Predictive Charter */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-amber-300/90 uppercase tracking-widest text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              {isVi ? 'Cam kết Phi Tiên Tri' : 'Non-Predictive Charter'}
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              {isVi ? ETHICS_DISCLAIMER_VI : ETHICS_DISCLAIMER_EN}
            </p>
          </div>

          {/* Col 3: Support & Crisis Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-amber-300/90 uppercase tracking-widest text-xs flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-rose-400" />
              {isVi ? 'Hỗ trợ & Nguồn Trợ Giúp' : 'Support Resources'}
            </h4>
            <p className="text-slate-400 text-xs">
              {isVi
                ? 'Nếu bạn hoặc người thân đang trải qua khủng hoảng tâm lý, xin hãy tìm kiếm sự hỗ trợ chuyên môn.'
                : 'If you or someone you care about is facing a mental health crisis, please connect with professional help.'}
            </p>
            <button
              onClick={onOpenSafetyHelpline}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-rose-300 border border-rose-500/30 text-xs font-medium transition-colors"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
              {isVi ? 'Xem đường dây nóng hỗ trợ tâm lý' : 'View Crisis Helplines'}
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Tarot Reflection App. Mindful symbolic introspection.</p>
          <p className="italic">
            {isVi ? 'Thiết kế vì sự bình yên và tự chủ nội tâm.' : 'Designed for inner peace and conscious agency.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
