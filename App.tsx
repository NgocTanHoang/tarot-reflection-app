import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, ActiveView } from './components/Navbar';
import { Footer } from './components/Footer';
import { SafetyModal } from './components/SafetyModal';
import { HomeView } from './views/HomeView';
import { ReadingView } from './views/ReadingView';
import { DailyCardView } from './views/DailyCardView';
import { ExploreView } from './views/ExploreView';
import { LearningView } from './views/LearningView';
import { DecisionHelperView } from './views/DecisionHelperView';
import { JournalView } from './views/JournalView';
import { ProgressView } from './views/ProgressView';
import { SettingsView } from './views/SettingsView';
import { Reading, DailyReading, UserPreferences } from './types';
import { SafetyCheckResult } from './services/safety';

const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'vi',
  allowReversed: true,
  enableSound: true,
  dailyReminder: false,
  theme: 'dark'
};

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  
  // Stored state
  const [readings, setReadings] = useState<Reading[]>(() => {
    try {
      const saved = localStorage.getItem('tarot_reflection_readings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [dailyReadings, setDailyReadings] = useState<DailyReading[]>(() => {
    try {
      const saved = localStorage.getItem('tarot_reflection_daily');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('tarot_reflection_prefs');
      return saved ? { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) } : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  // Safety Modal
  const [safetyData, setSafetyData] = useState<SafetyCheckResult | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('tarot_reflection_readings', JSON.stringify(readings));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [readings]);

  useEffect(() => {
    try {
      localStorage.setItem('tarot_reflection_daily', JSON.stringify(dailyReadings));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [dailyReadings]);

  useEffect(() => {
    try {
      localStorage.setItem('tarot_reflection_prefs', JSON.stringify(preferences));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [preferences]);

  // Today's daily card
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysDailyCard = useMemo(() => {
    return dailyReadings.find(d => d.date === todayStr) || null;
  }, [dailyReadings, todayStr]);

  // Calculate streak count
  const streakCount = useMemo(() => {
    if (dailyReadings.length === 0) return 0;
    const sortedDates = Array.from(new Set(dailyReadings.map(d => d.date))).sort().reverse();
    let streak = 0;
    let checkDate = new Date();

    for (const dStr of sortedDates) {
      const d = new Date(dStr);
      const diffDays = Math.floor((checkDate.getTime() - d.getTime()) / (1000 * 3600 * 24));
      if (diffDays <= 1) {
        streak++;
        checkDate = d;
      } else {
        break;
      }
    }
    return Math.max(streak, todaysDailyCard ? 1 : 0);
  }, [dailyReadings, todaysDailyCard]);

  // Set data-theme attribute on document root
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', preferences.theme);
    if (preferences.theme === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    } else {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    }
  }, [preferences.theme]);

  // Handlers
  const handleSaveReading = (newReading: Reading) => {
    setReadings(prev => [newReading, ...prev]);
  };

  const handleSaveDailyCard = (daily: DailyReading) => {
    setDailyReadings(prev => {
      const exists = prev.findIndex(d => d.date === daily.date);
      if (exists >= 0) {
        const next = [...prev];
        next[exists] = daily;
        return next;
      }
      return [daily, ...prev];
    });
  };

  const handleDeleteReading = (id: string) => {
    setReadings(prev => prev.filter(r => r.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setReadings(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  const handleUpdatePreferences = (prefs: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  };

  const handleClearAllData = () => {
    setReadings([]);
    setDailyReadings([]);
    localStorage.removeItem('tarot_reflection_readings');
    localStorage.removeItem('tarot_reflection_daily');
  };

  const handleOpenSafetyHelpline = () => {
    setSafetyData({
      isCrisis: true,
      messageVi: "Nếu bạn hoặc người thân đang trải qua bất kỳ thời khắc thử thách tâm lý nào, xin hãy liên hệ ngay với các nguồn trợ giúp dưới đây.",
      messageEn: "If you or someone you care about is experiencing difficult emotional times, please reach out to trusted professionals below.",
      hotlines: [
        { name: "Tổng đài Quốc gia Bảo vệ & Khủng hoảng (Việt Nam)", contact: "111 hoặc 1800 1567", note: "Miễn phí 24/7" },
        { name: "Đường dây nóng Ngày Mai (Hỗ trợ người trầm cảm)", contact: "096 306 1414", note: "13:00 - 20:30 hàng ngày" },
        { name: "Befrienders Worldwide International Crisis Support", contact: "befrienders.org", note: "Emotional support worldwide" },
        { name: "Cấp cứu Y tế Khẩn cấp", contact: "115 (VN) / 911 / 112", note: "Hỗ trợ y tế khẩn cấp" }
      ]
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        preferences={preferences}
        onUpdatePreferences={handleUpdatePreferences}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <HomeView
            onNavigate={setCurrentView}
            todaysDailyCard={todaysDailyCard}
            preferences={preferences}
          />
        )}

        {currentView === 'reading' && (
          <ReadingView
            onSaveReading={handleSaveReading}
            onOpenSafetyModal={setSafetyData}
            preferences={preferences}
          />
        )}

        {currentView === 'daily' && (
          <DailyCardView
            todaysDailyCard={todaysDailyCard}
            onSaveDailyCard={handleSaveDailyCard}
            streakCount={streakCount}
            preferences={preferences}
          />
        )}

        {currentView === 'explore' && (
          <ExploreView
            preferences={preferences}
            onSelectForReading={() => setCurrentView('reading')}
          />
        )}

        {currentView === 'learn' && (
          <LearningView preferences={preferences} />
        )}

        {currentView === 'decision' && (
          <DecisionHelperView
            onSaveReading={handleSaveReading}
            preferences={preferences}
          />
        )}

        {currentView === 'journal' && (
          <JournalView
            readings={readings}
            dailyReadings={dailyReadings}
            onDeleteReading={handleDeleteReading}
            onToggleFavorite={handleToggleFavorite}
            preferences={preferences}
          />
        )}

        {currentView === 'progress' && (
          <ProgressView
            readings={readings}
            dailyReadings={dailyReadings}
            streakCount={streakCount}
            preferences={preferences}
          />
        )}

        {currentView === 'settings' && (
          <SettingsView
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
            onClearAllData={handleClearAllData}
            onOpenSafetyHelpline={handleOpenSafetyHelpline}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenSafetyHelpline={handleOpenSafetyHelpline}
        language={preferences.language}
      />

      {/* Safety & Crisis Protection Modal */}
      <SafetyModal
        safetyData={safetyData}
        isOpen={Boolean(safetyData)}
        onClose={() => setSafetyData(null)}
        language={preferences.language}
      />
    </div>
  );
};

export default App;
