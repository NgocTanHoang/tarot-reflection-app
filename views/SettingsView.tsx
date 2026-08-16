import React from 'react';
import { UserPreferences } from '../types';
import { 
  Settings, 
  Globe, 
  RotateCw, 
  Volume2, 
  ShieldCheck, 
  Trash2, 
  Download, 
  Sparkles,
  HeartHandshake,
  Sun,
  Moon
} from 'lucide-react';
import { ETHICS_DISCLAIMER_VI, ETHICS_DISCLAIMER_EN } from '../services/safety';

interface SettingsViewProps {
  preferences: UserPreferences;
  onUpdatePreferences: (prefs: Partial<UserPreferences>) => void;
  onClearAllData: () => void;
  onOpenSafetyHelpline: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  preferences,
  onUpdatePreferences,
  onClearAllData,
  onOpenSafetyHelpline
}) => {
  const isVi = preferences.language === 'vi';
  const isDark = preferences.theme !== 'light';

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
          <Settings className="w-3.5 h-3.5" />
          {isVi ? 'Cấu Hình Trải Nghiệm' : 'Preferences & Charter'}
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
          {isVi ? 'Cài Đặt & Triết Lý Ứng Dụng' : 'Settings & Principles'}
        </h1>
      </div>

      {/* Preferences Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <h3 className="font-serif font-bold text-lg text-amber-100 flex items-center gap-2">
          <Settings className="w-5 h-5 text-amber-400" />
          {isVi ? 'Tùy Chọn Trải Nghiệm' : 'App Settings'}
        </h3>

        <div className="space-y-4">
          {/* Theme Selection */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-3">
              {isDark ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
              <div>
                <span className="font-medium text-xs sm:text-sm text-slate-200 block">
                  {isVi ? 'Giao diện (Theme)' : 'Theme Mode'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {isVi ? 'Chế độ Tối (Huyền bí) hoặc Sáng (Trang nhã)' : 'Dark (Mystic) or Light (Clean Warm)'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdatePreferences({ theme: 'dark' })}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isDark
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>{isVi ? 'Chế độ Tối' : 'Dark'}</span>
              </button>
              <button
                onClick={() => onUpdatePreferences({ theme: 'light' })}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  !isDark
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>{isVi ? 'Chế độ Sáng' : 'Light'}</span>
              </button>
            </div>
          </div>

          {/* Language selection */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-amber-400" />
              <div>
                <span className="font-medium text-xs sm:text-sm text-slate-200 block">
                  {isVi ? 'Ngôn ngữ hiển thị' : 'Display Language'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {isVi ? 'Tiếng Việt hoặc English' : 'Vietnamese or English'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdatePreferences({ language: 'vi' })}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isVi
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                Tiếng Việt
              </button>
              <button
                onClick={() => onUpdatePreferences({ language: 'en' })}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  !isVi
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Allow Reversed Cards */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-3">
              <RotateCw className="w-5 h-5 text-indigo-400" />
              <div>
                <span className="font-medium text-xs sm:text-sm text-slate-200 block">
                  {isVi ? 'Cho phép lá bài ngược (Góc nhìn chuyển hóa nội tâm)' : 'Allow Reversed Cards (Internalized Perspective)'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {isVi ? 'Lá bài ngược phản chiếu sự chiêm nghiệm bên trong' : 'Reversed cards represent introspective reflection'}
                </span>
              </div>
            </div>
            <button
              onClick={() => onUpdatePreferences({ allowReversed: !preferences.allowReversed })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                preferences.allowReversed ? 'bg-amber-400' : 'bg-slate-800'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-slate-950 absolute top-1 transition-transform ${
                  preferences.allowReversed ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Philosophy & Charter */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-400/20 space-y-4">
        <h3 className="font-serif font-bold text-lg text-amber-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          {isVi ? 'Hiến Chương Phản Tỉnh & An Toàn Tâm Lý' : 'Reflective & Safety Charter'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          {isVi ? ETHICS_DISCLAIMER_VI : ETHICS_DISCLAIMER_EN}
        </p>
        <button
          onClick={onOpenSafetyHelpline}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors"
        >
          <HeartHandshake className="w-4 h-4 text-rose-400" />
          {isVi ? 'Xem danh sách đường dây nóng hỗ trợ tâm lý' : 'View Crisis Support Helplines'}
        </button>
      </div>

      {/* Data Management & Danger Zone */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-serif font-bold text-lg text-rose-200 flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-rose-400" />
          {isVi ? 'Quản Lý Dữ Liệu Thiết Bị' : 'Device Data Management'}
        </h3>
        <p className="text-xs text-slate-400">
          {isVi
            ? 'Mọi nhật ký và lịch sử trải bài của bạn được lưu cục bộ an toàn trên trình duyệt này. Nếu muốn bắt đầu lại từ đầu, bạn có thể xóa toàn bộ dữ liệu.'
            : 'All readings and logs are saved privately in your local browser storage. You can wipe all local logs here.'}
        </p>
        <button
          onClick={() => {
            if (window.confirm(isVi ? 'Bạn có chắc chắn muốn xóa toàn bộ lịch sử và nhật ký?' : 'Are you sure you want to delete all readings and journal entries?')) {
              onClearAllData();
            }
          }}
          className="px-5 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs font-bold transition-colors"
        >
          {isVi ? 'Xóa Toàn Bộ Lịch Sử & Nhật Ký' : 'Clear All Local Data'}
        </button>
      </div>
    </div>
  );
};
