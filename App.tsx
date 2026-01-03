
import React, { useState, useEffect } from 'react';
import { ReadingTopic, Reading, UserState } from './types';
import { TAROT_DECK, TOPICS } from './constants';
import { getInterpretation } from './services/gemini';
import { marked } from 'marked';

const App: React.FC = () => {
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('tarot_user_state');
    return saved ? JSON.parse(saved) : { name: '', history: [] };
  });

  const [selectedTopic, setSelectedTopic] = useState<ReadingTopic>("Tâm trạng");
  const [isReading, setIsReading] = useState(false);
  const [currentReading, setCurrentReading] = useState<Reading | null>(null);
  const [view, setView] = useState<'home' | 'reading' | 'history'>('home');
  const [flipped, setFlipped] = useState(false);
  const [deckSpread, setDeckSpread] = useState(false);

  useEffect(() => {
    localStorage.setItem('tarot_user_state', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (view === 'reading') {
      const timer = setTimeout(() => setDeckSpread(true), 300);
      return () => clearTimeout(timer);
    } else {
      setDeckSpread(false);
    }
  }, [view]);

  const handleStartReading = () => {
    setView('reading');
    setFlipped(false);
    setCurrentReading(null);
  };

  const handlePickCard = async (index: number) => {
    if (isReading || currentReading) return;
    setIsReading(true);

    const randomIndex = Math.floor(Math.random() * TAROT_DECK.length);
    const card = TAROT_DECK[randomIndex];
    
    const historyCount = user.history.filter(h => h.cardId === card.id).length;

    const interpretation = await getInterpretation(card, selectedTopic, historyCount);
    
    const newReading: Reading = {
      id: Math.random().toString(36).substring(7),
      date: Date.now(),
      topic: selectedTopic,
      cardId: card.id,
      interpretation: interpretation
    };

    setCurrentReading(newReading);
    setIsReading(false);
    setFlipped(true);

    setUser(prev => ({
      ...prev,
      history: [newReading, ...prev.history].slice(0, 50)
    }));
  };

  const currentCard = currentReading ? TAROT_DECK.find(c => c.id === currentReading.cardId) : null;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-12">
      <header className="max-w-5xl w-full flex justify-between items-center mb-16 px-4">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('home')}>
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-[#d4af37] font-serif italic text-2xl shadow-xl transition-transform group-hover:rotate-12">T</div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight hidden sm:block">Tarot Tâm Lý</h1>
        </div>
        <nav className="flex gap-10 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          <button onClick={() => setView('home')} className={`relative pb-1 transition-colors ${view === 'home' ? 'text-slate-900' : 'hover:text-slate-600'}`}>
            Trang chủ
            {view === 'home' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37] animate-in slide-in-from-left duration-300"></div>}
          </button>
          <button onClick={() => setView('history')} className={`relative pb-1 transition-colors ${view === 'history' ? 'text-slate-900' : 'hover:text-slate-600'}`}>
            Lịch sử
            {view === 'history' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37] animate-in slide-in-from-left duration-300"></div>}
          </button>
        </nav>
      </header>

      <main className="max-w-5xl w-full flex-grow flex flex-col items-center transition-page">
        {view === 'home' && (
          <div className="text-center py-20 px-10 bg-white/40 backdrop-blur-md rounded-[4rem] border border-white shadow-2xl relative w-full overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]"></div>
            
            <div className="inline-block px-4 py-2 bg-slate-100 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">
              Người kể chuyện bằng biểu tượng
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-10 italic leading-tight">Góc nhỏ phản chiếu<br/>tâm hồn</h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-20 leading-relaxed">
              Một không gian tĩnh lặng để bạn đối thoại với chính mình thông qua hệ biểu tượng Tarot Rider-Waite truyền thống.
            </p>

            <div className="mb-20">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-10">Bạn muốn suy ngẫm về chủ đề nào?</p>
              <div className="flex flex-wrap justify-center gap-6">
                {TOPICS.map(topic => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-10 py-6 rounded-[2rem] border-2 transition-all duration-500 font-bold text-sm tracking-wide ${
                      selectedTopic === topic 
                      ? 'border-slate-900 bg-slate-900 text-[#d4af37] shadow-2xl scale-110' 
                      : 'border-white bg-white text-slate-400 hover:border-slate-200 shadow-sm'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStartReading}
              className="px-20 py-8 bg-slate-900 text-[#d4af37] rounded-full font-bold text-xl hover:bg-slate-800 transition-all shadow-2xl hover:shadow-[#d4af37]/30 transform hover:-translate-y-2 active:scale-95 border border-[#d4af37]/20"
            >
              Rút bài ngay
            </button>
          </div>
        )}

        {view === 'reading' && (
          <div className="flex flex-col items-center w-full">
            <div className="mb-16 text-center">
                <span className="text-slate-400 uppercase tracking-[0.4em] text-[10px] font-bold block mb-4 opacity-60">Bạn đã chọn suy ngẫm về</span>
                <h3 className="text-4xl font-serif font-bold italic text-slate-900">{selectedTopic}</h3>
            </div>

            {/* Deck spread animation */}
            <div className={`relative h-[450px] w-full max-w-3xl mb-20 flex justify-center items-center overflow-visible`}>
              {!currentReading ? (
                <div className="relative w-full flex justify-center perspective">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      onClick={() => handlePickCard(i)}
                      className={`deck-card absolute w-48 h-72 rounded-xl transition-all duration-700 cursor-pointer border-[3px] border-slate-900/10 hover:border-[#d4af37] ${isReading ? 'pointer-events-none' : ''}`}
                      style={{
                        zIndex: i,
                        transform: deckSpread 
                          ? `translateX(${(i - 3) * 110}px) rotate(${(i - 3) * 4}deg)` 
                          : `translateX(0) rotate(0deg)`,
                        opacity: deckSpread ? 1 : 0,
                      }}
                    >
                      <div className="card-face card-back w-full h-full p-2">
                        <div className="w-full h-full border border-[#d4af37]/20 rounded-lg bg-[#1e2030] flex items-center justify-center relative overflow-hidden shadow-2xl">
                          <div className="absolute inset-0 bg-[radial-gradient(circle,#d4af37_0.5px,transparent_0.5px)] bg-[length:14px_14px] opacity-10"></div>
                          <div className="w-12 h-12 border-2 border-[#d4af37]/10 rounded-full flex items-center justify-center">
                            <span className="text-[#d4af37] opacity-20 text-2xl font-serif">?</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative w-64 h-96 perspective z-50 animate-in zoom-in-90 duration-500">
                  <div className={`card-inner relative w-full h-full ${flipped ? 'card-flipped' : ''}`}>
                    <div className="card-face card-back absolute w-full h-full p-2 border-[6px] border-[#2d3142]">
                      <div className="w-full h-full bg-[#1e2030] rounded-lg flex items-center justify-center border border-[#d4af37]/10">
                         <div className="text-[#d4af37] text-6xl opacity-20 font-serif italic">?</div>
                      </div>
                    </div>
                    <div className="card-face card-front absolute w-full h-full p-1 border-[6px] border-slate-900 shadow-2xl overflow-hidden">
                      {currentCard?.imageUrl && (
                         <div className="w-full h-full relative">
                           <img src={currentCard.imageUrl} className="w-full h-full object-cover" alt={currentCard.name} />
                           <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/95 backdrop-blur-md border-t border-[#d4af37]/40 text-center">
                             <h4 className="text-[#d4af37] font-serif font-bold text-xs tracking-[0.3em] uppercase">{currentCard.name}</h4>
                           </div>
                         </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {isReading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-[60]">
                   <div className="w-16 h-16 border-[5px] border-slate-100 border-t-[#d4af37] rounded-full animate-spin shadow-2xl"></div>
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] animate-pulse">Đang kết nối biểu tượng...</p>
                </div>
              )}
            </div>

            {flipped && currentReading && (
                <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-[4rem] p-12 md:p-20 shadow-2xl border border-white animate-in fade-in slide-in-from-bottom-12 duration-1000 relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-8 py-2 rounded-full border border-slate-100 shadow-sm text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
                      Thông điệp phản chiếu
                    </div>
                    <div 
                      className="prose prose-slate prose-xl max-w-none prose-p:text-slate-600 prose-headings:text-slate-900"
                      dangerouslySetInnerHTML={{ __html: marked.parse(currentReading.interpretation) }}
                    />
                    <div className="mt-24 flex flex-col items-center gap-8 border-t border-slate-100 pt-16">
                         <p className="text-slate-400 text-sm italic italic">Hy vọng thông điệp này mang lại cho bạn sự nhẹ nhàng.</p>
                         <button 
                            onClick={() => setView('home')}
                            className="px-14 py-6 border-2 border-slate-900 text-slate-900 rounded-full font-bold hover:bg-slate-900 hover:text-[#d4af37] transition-all transform hover:scale-110 shadow-lg"
                         >
                            Hoàn tất buổi trò chuyện
                         </button>
                    </div>
                </div>
            )}
          </div>
        )}

        {view === 'history' && (
          <div className="w-full bg-white/60 backdrop-blur-md rounded-[4rem] p-12 md:p-16 border border-white shadow-xl">
            <h2 className="text-4xl font-serif font-bold italic text-slate-900 mb-16 border-l-4 border-[#d4af37] pl-8">Lịch sử suy ngẫm</h2>
            {user.history.length === 0 ? (
                <div className="py-32 text-center opacity-40">
                    <div className="text-6xl mb-8">🕯️</div>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Không gian trống - Bạn chưa rút lá bài nào</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {user.history.map((h) => {
                        const card = TAROT_DECK.find(c => c.id === h.cardId);
                        return (
                            <div key={h.id} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-[#d4af37]/30 transition-all cursor-default shadow-sm hover:shadow-2xl hover:-translate-y-2">
                                <div className="flex gap-8">
                                    <div className="w-20 h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner flex-shrink-0">
                                        {card?.imageUrl && <img src={card.imageUrl} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />}
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{new Date(h.date).toLocaleDateString('vi-VN')}</span>
                                                <span className="text-[9px] font-bold px-3 py-1 bg-slate-50 text-slate-500 rounded-full uppercase border border-slate-100">{h.topic}</span>
                                            </div>
                                            <h4 className="text-2xl font-serif font-bold italic text-slate-800 group-hover:text-slate-900">{card?.name}</h4>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                setCurrentReading(h);
                                                setView('reading');
                                                setFlipped(true);
                                            }}
                                            className="mt-4 text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.2em] border-b border-[#d4af37]/0 hover:border-[#d4af37] pb-1 w-fit transition-all"
                                        >
                                            Xem lại thông điệp
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-32 py-16 border-t border-slate-200 w-full max-w-5xl flex flex-col items-center gap-10">
          <div className="flex gap-16 opacity-30">
              <span className="text-[9px] font-bold uppercase tracking-[0.8em]">Trực giác</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.8em]">Biểu tượng</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.8em]">Phản chiếu</span>
          </div>
          <p className="text-slate-400 text-sm italic font-medium max-w-lg text-center leading-relaxed">
            "Sự thật không nằm ở các lá bài, nó nằm ở cách trái tim bạn rung động trước những biểu tượng ấy."
          </p>
          <p className="text-slate-300 text-[10px] font-bold tracking-[0.6em] uppercase">
            © 2024 NGƯỜI KỂ CHUYỆN BIỂU TƯỢNG
          </p>
      </footer>
    </div>
  );
};

export default App;
