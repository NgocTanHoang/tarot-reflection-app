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
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-amber-400/15 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo / Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-amber-400/30 flex items-center justify-center shadow-md group-hover:border-amber-400/60 transition-colors">
              <span className="font-serif italic text-base font-bold text-amber-300">✦</span>
            </div>
            <div>
              <span className="font-serif font-bold text-base sm:text-lg text-amber-100 tracking-tight block leading-tight">
                Tarot Reflection
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-[0.18em] font-medium block">
                {isVi ? 'Tấm Gương Tự Phản Tỉnh' : 'Symbolic Mirror'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium">
            {primaryNavItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  {item.icon}
                  <span>{isVi ? item.labelVi : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle, Language & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            {/* Quick theme toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? (isVi ? 'Chuyển sang giao diện Sáng' : 'Switch to Light Theme') : (isVi ? 'Chuyển sang giao diện Tối' : 'Switch to Dark Theme')}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-400/30 text-xs text-slate-300 flex items-center justify-center transition-colors"
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
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-400/30 text-xs text-slate-300 flex items-center gap-1.5 transition-colors font-mono"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-[11px] uppercase">{preferences.language}</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-amber-400/20 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {primaryNavItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-2.5 rounded-xl text-left text-xs flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-amber-400/15 text-amber-300 border border-amber-400/40 font-semibold'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-900 border border-slate-800/80'
                  }`}
                >
                  <span className="text-amber-400">{item.icon}</span>
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
