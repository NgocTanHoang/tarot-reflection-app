import React from 'react';
import { SafetyCheckResult, ETHICS_DISCLAIMER_VI } from '../services/safety';
import { HeartHandshake, PhoneCall, X, ShieldAlert, LifeBuoy } from 'lucide-react';

interface SafetyModalProps {
  safetyData: SafetyCheckResult | null;
  isOpen: boolean;
  onClose: () => void;
  language?: 'vi' | 'en';
}

export const SafetyModal: React.FC<SafetyModalProps> = ({
  safetyData,
  isOpen,
  onClose,
  language = 'vi'
}) => {
  if (!isOpen || !safetyData || !safetyData.isCrisis) return null;

  const isVi = language === 'vi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 text-rose-400 mb-4">
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <HeartHandshake className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-rose-200">
              {isVi ? 'Không gian An toàn & Chăm sóc' : 'A Safe & Caring Space'}
            </h3>
            <p className="text-xs text-rose-400/80">
              {isVi ? 'Bạn luôn xứng đáng nhận được sự hỗ trợ tận tâm' : 'You deserve genuine care and support'}
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
          {isVi ? safetyData.messageVi : safetyData.messageEn}
        </p>

        {safetyData.hotlines && safetyData.hotlines.length > 0 && (
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <LifeBuoy className="w-3.5 h-3.5 text-amber-400" />
              {isVi ? 'Các đường dây nóng hỗ trợ khẩn cấp & miễn phí' : 'Free & Confidential Support Lines'}
            </h4>
            <div className="space-y-2">
              {safetyData.hotlines.map((hl, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <p className="font-medium text-slate-200 text-xs">{hl.name}</p>
                    <p className="text-[11px] text-slate-400">{hl.note}</p>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-amber-300 text-sm bg-slate-900 px-3 py-1.5 rounded-lg border border-amber-400/20 self-start sm:self-center">
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                    <span>{hl.contact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-slate-400 italic text-center sm:text-left">
            {isVi
              ? 'Hãy chia sẻ với một người bạn tin tưởng hoặc chuyên gia y tế.'
              : 'Please reach out to a trusted professional or loved one.'}
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            {isVi ? 'Tôi đã hiểu' : 'I Understand'}
          </button>
        </div>
      </div>
    </div>
  );
};
