import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Compass, 
  Calendar, 
  RotateCcw, 
  Scale, 
  Settings, 
  Layers, 
  Menu, 
  X, 
  TrendingUp,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { UserPreferences } from '../types';

export type ActiveView = 
  | 'home' 
  | 'reading' 
  | 'daily' 
  | 'explore' 
  | 'learn' 
  | 'decision' 
  | 'journal' 
  | 'progress' 
  | 'settings';

interface NavbarProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  preferences: UserPreferences;
  onUpdatePreferences: (prefs: Partial<UserPreferences>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  preferences,
  onUpdatePreferences
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isVi = preferences.language === 'vi';
  const isDark = preferences.theme !== 'light';

  const primaryNavItems: Array<{ id: ActiveView; labelVi: string; labelEn: string; icon: React.ReactNode }> = [
    { id: 'home', labelVi: 'Trang chủ', labelEn: 'Home', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'reading', labelVi: 'Trải bài', labelEn: 'Spreads', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'daily', labelVi: 'Lá bài ngày', labelEn: 'Daily Card', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'decision', labelVi: 'Soi rọi quyết định', labelEn: 'Decision', icon: <Scale className="w-3.5 h-3.5" /> },
    { id: 'explore', labelVi: 'Thư viện 78 lá', labelEn: '78 Cards', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'learn', labelVi: 'Học biểu tượng', labelEn: 'Learn', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'journal', labelVi: 'Nhật ký', labelEn: 'Journal', icon: <RotateCcw className="w-3.5 h-3.5" /> },
    { id: 'progress', labelVi: 'Tiến trình', labelEn: 'Insights', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'settings', labelVi: 'Cài đặt', labelEn: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> }
  ];

  const handleNavClick = (view: ActiveView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    onUpdatePreferences({ language: isVi ? 'en' : 'vi' });
  };

  const toggleTheme = () => {
    onUpdatePreferences({ theme: isDark ? 'light' : 'dark' });
  };

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200 ${
      isDark
        ? 'bg-slate-950/90 border-amber-400/15'
        : 'bg-[#faf7f2]/95 border-amber-900/10 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2">
          {/* Logo / Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-sm transition-colors ${
              isDark
                ? 'bg-slate-900 border-amber-400/30 group-hover:border-amber-400/60'
                : 'bg-white border-amber-500/30 group-hover:border-amber-600/60'
            }`}>
              <span className={`font-serif italic text-base font-bold ${
                isDark ? 'text-amber-300' : 'text-amber-600'
              }`}>✦</span>
            </div>
            <div>
              <span className={`font-serif font-bold text-base sm:text-lg block leading-tight ${
                isDark ? 'text-amber-100' : 'text-slate-900'
              }`}>
                Tarot Reflection
              </span>
              <span className={`text-[11px] font-medium block leading-tight ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {isVi ? 'Tấm gương tự phản tỉnh' : 'Symbolic Mirror'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs xl:text-[13px] font-medium overflow-hidden">
            {primaryNavItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2 xl:px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isActive
                      ? isDark
                        ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 font-semibold'
                        : 'bg-amber-100 text-amber-900 border border-amber-300/80 font-semibold shadow-xs'
                      : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-amber-500/10'
                  }`}
                >
                  <span className={isActive ? (isDark ? 'text-amber-300' : 'text-amber-700') : (isDark ? 'text-slate-400' : 'text-slate-500')}>
                    {item.icon}
                  </span>
                  <span>{isVi ? item.labelVi : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle, Language & Mobile Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick theme toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? (isVi ? 'Chuyển sang giao diện Sáng' : 'Switch to Light Theme') : (isVi ? 'Chuyển sang giao diện Tối' : 'Switch to Dark Theme')}
              className={`p-2 rounded-lg border text-xs flex items-center justify-center transition-colors ${
                isDark
                  ? 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-amber-300 hover:border-amber-400/30'
                  : 'bg-white hover:bg-amber-50/80 border-slate-200 text-slate-700 hover:border-amber-400/40 shadow-xs'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Quick language toggle */}
            <button
              onClick={toggleLanguage}
              title={isVi ? 'Chuyển sang tiếng Anh' : 'Switch to Vietnamese'}
              className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors font-mono font-bold ${
                isDark
                  ? 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300 hover:border-amber-400/30'
                  : 'bg-white hover:bg-amber-50/80 border-slate-200 text-slate-700 hover:border-amber-400/40 shadow-xs'
              }`}
            >
              <Globe className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
              <span className="text-[11px] uppercase">{preferences.language}</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-3 transition-colors ${
          isDark
            ? 'bg-slate-950/98 border-amber-400/20'
            : 'bg-[#faf7f2] border-amber-900/10 shadow-lg'
        }`}>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {primaryNavItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-2.5 rounded-xl text-left text-xs flex items-center gap-2 transition-all ${
                    isActive
                      ? isDark
                        ? 'bg-amber-400/15 text-amber-300 border border-amber-400/40 font-semibold'
                        : 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold shadow-xs'
                      : isDark
                        ? 'bg-slate-900/60 text-slate-300 hover:bg-slate-900 border border-slate-800/80'
                        : 'bg-white text-slate-700 hover:bg-amber-50/50 border border-slate-200 shadow-xs'
                  }`}
                >
                  <span className={isDark ? 'text-amber-400' : 'text-amber-600'}>{item.icon}</span>
                  <span className="truncate">{isVi ? item.labelVi : item.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
