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
  ShieldCheck, 
  TrendingUp,
  Globe
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

  const navItems: Array<{ id: ActiveView; labelVi: string; labelEn: string; icon: React.ReactNode }> = [
    { id: 'home', labelVi: 'Trang chủ', labelEn: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'reading', labelVi: 'Trải bài', labelEn: 'Readings', icon: <Layers className="w-4 h-4" /> },
    { id: 'daily', labelVi: 'Lá bài ngày', labelEn: 'Daily Card', icon: <Calendar className="w-4 h-4" /> },
    { id: 'explore', labelVi: 'Thư viện 78 lá', labelEn: '78 Cards', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'learn', labelVi: 'Học biểu tượng', labelEn: 'Learning', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'decision', labelVi: 'Soi rọi quyết định', labelEn: 'Decision Mirror', icon: <Scale className="w-4 h-4" /> },
    { id: 'journal', labelVi: 'Nhật ký & Lịch sử', labelEn: 'Journal', icon: <RotateCcw className="w-4 h-4" /> },
    { id: 'progress', labelVi: 'Tiến trình', labelEn: 'Insights', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'settings', labelVi: 'Cài đặt', labelEn: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const handleNavClick = (view: ActiveView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    onUpdatePreferences({ language: isVi ? 'en' : 'vi' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-amber-500/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 border border-amber-400/40 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300">
              <span className="font-serif italic text-xl font-bold text-amber-300">T</span>
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-amber-100 tracking-tight block">
                Tarot Reflection
              </span>
              <span className="text-[10px] text-amber-400/60 uppercase tracking-[0.2em] font-medium block">
                {isVi ? 'Tấm gương tự phản tỉnh' : 'Symbolic Mirror'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1.5 text-xs font-semibold tracking-wide">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30 shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  {item.icon}
                  <span>{isVi ? item.labelVi : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Language & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick language toggle */}
            <button
              onClick={toggleLanguage}
              title={isVi ? 'Chuyển sang tiếng Anh' : 'Switch to Vietnamese'}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/30 text-xs text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold uppercase text-[11px]">{preferences.language}</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/95 border-b border-amber-400/20 px-4 pt-3 pb-6 space-y-1.5 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-3 rounded-2xl flex items-center gap-2.5 text-left text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-slate-850'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
                    {item.icon}
                  </div>
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
