import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { 
  Sparkles, 
  Flame, 
  Droplets, 
  Wind, 
  Mountain, 
  Compass, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface LearningViewProps {
  preferences: UserPreferences;
}

export const LearningView: React.FC<LearningViewProps> = ({ preferences }) => {
  const [activeTab, setActiveTab] = useState<'elements' | 'foolsJourney' | 'quiz'>('elements');
  
  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const isVi = preferences.language === 'vi';

  const quizQuestions = [
    {
      scenarioVi: 'Bạn đang bị kẹt giữa nhiều ý kiến mâu thuẫn, tâm trí rối bời bởi những suy nghĩ thái quá và sự phán xét từ người khác.',
      scenarioEn: 'You are caught in conflicting thoughts, feeling overwhelmed by overthinking and mental chatter.',
      questionVi: 'Nguyên mẫu Tarot nào đại diện cho việc cắt đứt sự hoang mang bằng tư duy rõ ràng và sự thật khách quan?',
      questionEn: 'Which Tarot archetype represents cutting through confusion with mental clarity and objective truth?',
      optionsVi: [
        { text: 'Ace of Swords (Kiếm)', isCorrect: true, reason: 'Nguyên tố Khí (Swords) đại diện cho lý trí, sự sáng tỏ trong tư duy và khả năng nhìn nhận sự thật không thiên vị.' },
        { text: 'Ten of Cups (Cốc)', isCorrect: false, reason: 'Cốc đại diện cho sự hòa hợp cảm xúc, không chuyên về việc phân định tư duy lý trí.' },
        { text: 'Knight of Pentacles (Tiền)', isCorrect: false, reason: 'Tiền đại diện cho tính kiên nhẫn và hành động vật chất, không chuyên về làm sạch mớ bòng bong suy nghĩ.' },
        { text: 'Three of Wands (Gậy)', isCorrect: false, reason: 'Gậy đại diện cho khát vọng và tầm nhìn tương lai.' }
      ],
      optionsEn: [
        { text: 'Ace of Swords', isCorrect: true, reason: 'The Air element (Swords) symbolizes mental clarity, discernment, and objective truth.' },
        { text: 'Ten of Cups', isCorrect: false, reason: 'Cups focus on emotional harmony rather than cognitive discernment.' },
        { text: 'Knight of Pentacles', isCorrect: false, reason: 'Pentacles represent practical routines and grounded work.' },
        { text: 'Three of Wands', isCorrect: false, reason: 'Wands represent creative drive and visionary expansion.' }
      ]
    },
    {
      scenarioVi: 'Một dự án quan trọng bạn làm việc suốt 6 tháng vừa bị hủy bỏ đột ngột. Bạn cảm thấy bàng hoàng nhưng nhận ra cấu trúc cũ vốn có nhiều lỗ hổng.',
      scenarioEn: 'A project you worked on for months suddenly collapsed. You feel shocked, but realize the old foundation was unstable.',
      questionVi: 'Lá bài nào là biểu tượng của sự sụp đổ cấu trúc ảo tưởng để nhường chỗ cho sự thật vững chắc hơn?',
      questionEn: 'Which archetype symbolizes the sudden collapse of false structures to reveal a firmer reality?',
      optionsVi: [
        { text: 'The Tower (Tòa Tháp)', isCorrect: true, reason: 'The Tower không phải tai họa vô cớ; nó phản chiếu sự tan rã cần thiết của những gì được xây dựng trên nền móng không vững bền để bạn tái tạo tự do.' },
        { text: 'The Empress (Hoàng Hậu)', isCorrect: false, reason: 'The Empress đại diện cho sự nuôi dưỡng, trù phú và sáng tạo dịu dàng.' },
        { text: 'The Sun (Mặt Trời)', isCorrect: false, reason: 'The Sun là sự hân hoan, tràn đầy sinh lực và nhận thức rực rỡ.' },
        { text: 'Two of Pentacles (Tiền)', isCorrect: false, reason: 'Two of Pentacles là nghệ thuật giữ thăng bằng giữa nhiều ưu tiên.' }
      ],
      optionsEn: [
        { text: 'The Tower', isCorrect: true, reason: 'The Tower is not a curse; it reflects the necessary breakdown of unstable illusions to pave way for authenticity.' },
        { text: 'The Empress', isCorrect: false, reason: 'The Empress embodies maternal nurturing and abundant creativity.' },
        { text: 'The Sun', isCorrect: false, reason: 'The Sun signifies joyous clarity and vitality.' },
        { text: 'Two of Pentacles', isCorrect: false, reason: 'Two of Pentacles is about balancing everyday priorities.' }
      ]
    },
    {
      scenarioVi: 'Bạn nhận được rất nhiều lời khen ngợi và cơ hội mới, nhưng trong lòng luôn cảm thấy kiệt sức vì đã cho đi quá nhiều và quên chăm sóc chính mình.',
      scenarioEn: 'You receive praise and opportunities, but feel exhausted inside because you neglected your own emotional boundaries.',
      questionVi: 'Nguyên mẫu nào nhắc nhở bạn dừng lại, rút lui vào không gian tĩnh lặng để kết nối lại với ngọn đèn nội tâm?',
      questionEn: 'Which archetype gently calls you to step back into solitude to reconnect with your inner lantern?',
      optionsVi: [
        { text: 'The Hermit (Ẩn Sĩ)', isCorrect: true, reason: 'The Hermit đại diện cho sự tĩnh lặng có ý thức, lùi lại khỏi ồn ào xã hội để lắng nghe chân lý bên trong.' },
        { text: 'The Chariot (Cỗ Xe)', isCorrect: false, reason: 'The Chariot thôi thúc tiến về phía trước bằng kỷ luật và ý chí mạnh mẽ.' },
        { text: 'Eight of Wands (Gậy)', isCorrect: false, reason: 'Eight of Wands đại diện cho tốc độ, chuyển động nhanh và sự dồn dập.' },
        { text: 'The Magician (Ảo Thuật Gia)', isCorrect: false, reason: 'The Magician đại diện cho hành động chủ động và sử dụng các công cụ bên ngoài.' }
      ],
      optionsEn: [
        { text: 'The Hermit', isCorrect: true, reason: 'The Hermit symbolizes conscious solitude, stepping back from noise to consult inner wisdom.' },
        { text: 'The Chariot', isCorrect: false, reason: 'The Chariot represents determined forward momentum and willpower.' },
        { text: 'Eight of Wands', isCorrect: false, reason: 'Eight of Wands represents rapid developments and swift velocity.' },
        { text: 'The Magician', isCorrect: false, reason: 'The Magician represents resourcefulness and manifestation in the outer world.' }
      ]
    }
  ];

  const currentQ = quizQuestions[currentQuestionIndex];
  const options = isVi ? currentQ.optionsVi : currentQ.optionsEn;

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (options[idx].isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finished
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          {isVi ? 'Học Biểu Tượng • Không Bói Toán' : 'Symbolic Mastery • No Superstition'}
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
          {isVi ? 'Học Biểu Tượng & Nguyên Mẫu Tâm Lý' : 'Tarot as a Symbolic Language'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          {isVi
            ? 'Khám phá triết lý đằng sau 4 nguyên tố, hành trình phát triển tâm thức và cách áp dụng vào cuộc sống.'
            : 'Understand the psychological framework behind the 4 elements, the archetypal Hero’s journey, and mindful self-inquiry.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('elements')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'elements'
              ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>{isVi ? '4 Nguyên Tố Tâm Lý' : 'The 4 Elements'}</span>
        </button>

        <button
          onClick={() => setActiveTab('foolsJourney')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'foolsJourney'
              ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4 text-indigo-400" />
          <span>{isVi ? 'Hành Trình Chàng Khờ' : "The Fool's Journey"}</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'quiz'
              ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span>{isVi ? 'Thử Thách Biểu Tượng' : 'Symbolic Practice Quiz'}</span>
        </button>
      </div>

      {/* TAB 1: 4 ELEMENTS */}
      {activeTab === 'elements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
          {/* Fire */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <Flame className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-amber-100">
                  {isVi ? 'Lửa (Wands • Gậy)' : 'Fire (Wands)'}
                </h3>
                <span className="text-xs text-amber-400 font-medium">
                  {isVi ? 'Ý Chí • Đam Mê • Sáng Tạo' : 'Willpower • Passion • Creative Drive'}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isVi
                ? 'Đại diện cho ngọn lửa nội tâm, động lực hành động, sự nhiệt huyết và tinh thần dấn thân. Trong tâm lý học, đây là năng lượng thôi thúc bạn bắt đầu những thử nghiệm mới và vượt qua sức ì.'
                : 'Embodying inner vitality, motivation, and creative spark. Psychologically, Fire is the drive to initiate, express authentic passion, and conquer stagnation.'}
            </p>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400">
              <strong className="text-amber-300">{isVi ? 'Câu hỏi phản tỉnh:' : 'Key Reflection:'}</strong>{' '}
              {isVi ? 'Điều gì đang thực sự thắp sáng năng lượng và động lực của tôi lúc này?' : 'What is genuinely sparking my motivation and vitality right now?'}
            </div>
          </div>

          {/* Water */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
                <Droplets className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-amber-100">
                  {isVi ? 'Nước (Cups • Cốc)' : 'Water (Cups)'}
                </h3>
                <span className="text-xs text-cyan-400 font-medium">
                  {isVi ? 'Cảm Xúc • Sự Gắn Kết • Trực Giác' : 'Emotions • Connection • Empathy'}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isVi
                ? 'Đại diện cho thế giới nội cảm, tình yêu thương, sự thấu cảm và các mối quan hệ giữa con người. Nước nhắc nhở chúng ta đón nhận mọi cảm xúc mà không phán xét, từ niềm vui đến nỗi buồn.'
                : 'Reflecting emotional landscapes, vulnerability, relationships, and intuition. Water teaches us to hold space for our feelings without judgment.'}
            </p>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400">
              <strong className="text-cyan-300">{isVi ? 'Câu hỏi phản tỉnh:' : 'Key Reflection:'}</strong>{' '}
              {isVi ? 'Trái tim tôi đang cảm thấy thế nào và tôi có đang lắng nghe cảm xúc thật của mình?' : 'How is my emotional heart feeling, and am I honoring my true boundaries?'}
            </div>
          </div>

          {/* Air */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-sky-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30">
                <Wind className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-amber-100">
                  {isVi ? 'Khí (Swords • Kiếm)' : 'Air (Swords)'}
                </h3>
                <span className="text-xs text-sky-400 font-medium">
                  {isVi ? 'Tư Duy • Giao Tiếp • Sự Thật' : 'Intellect • Truth • Perspective'}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isVi
                ? 'Đại diện cho tâm trí lý tính, khả năng phân tích, giao tiếp và những suy nghĩ định hình nhận thức của chúng ta. Khí là công cụ cắt đứt sự ngộ nhận nhưng cũng cảnh báo nguy cơ suy nghĩ thái quá.'
                : 'Representing cognition, communication, logic, and beliefs. Air cuts through deception with truth, while cautioning against anxiety and overthinking.'}
            </p>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400">
              <strong className="text-sky-300">{isVi ? 'Câu hỏi phản tỉnh:' : 'Key Reflection:'}</strong>{' '}
              {isVi ? 'Suy nghĩ này là sự thật khách quan hay chỉ là một câu chuyện tôi tự dệt nên?' : 'Is this thought an objective truth or a story I am telling myself?'}
            </div>
          </div>

          {/* Earth */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <Mountain className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-amber-100">
                  {isVi ? 'Đất (Pentacles • Tiền)' : 'Earth (Pentacles)'}
                </h3>
                <span className="text-xs text-emerald-400 font-medium">
                  {isVi ? 'Hiện Thực • Cơ Thể • Thói Quen' : 'Physical Grounding • Habits • Health'}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isVi
                ? 'Đại diện cho thế giới vật chất thực tế, sức khỏe thể chất, thói quen hàng ngày và sự kiên nhẫn tích lũy. Đất giúp ta đưa những ý tưởng trên trời neo đậu vững chắc vào đời sống thường nhật.'
                : 'Embodying physical well-being, material stability, daily habits, and patience. Earth anchors ethereal ideas into realistic, consistent daily actions.'}
            </p>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400">
              <strong className="text-emerald-300">{isVi ? 'Câu hỏi phản tỉnh:' : 'Key Reflection:'}</strong>{' '}
              {isVi ? 'Hôm nay tôi đã chăm sóc cơ thể và hiện thực hóa mục tiêu bằng hành động cụ thể nào?' : 'How am I caring for my body and grounding my goals into practical routines today?'}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FOOL'S JOURNEY */}
      {activeTab === 'foolsJourney' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800">
            <h3 className="font-serif font-bold text-xl text-amber-100 mb-3">
              {isVi ? 'Hành Trình Chàng Khờ: 3 Giai Đoạn Trưởng Thành Tâm Lý' : "The Fool's Journey: 3 Developmental Stages"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isVi
                ? '22 lá bài Bộ Ẩn Chính (Major Arcana) mô tả ẩn dụ về sự tiến hóa của tâm thức con người từ sự thơ ngây ban đầu (The Fool) đến sự trọn vẹn, giác ngộ và tích hợp bản ngã (The World).'
                : 'The 22 Major Arcana cards map the psychological evolution of human consciousness from naive openness (The Fool) to holistic integration and self-actualization (The World).'}
            </p>
          </div>

          <div className="space-y-6">
            {/* Stage 1 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-amber-400/20 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                {isVi ? 'Giai Đoạn 1 (Lá 0 – 7)' : 'Stage 1 (Cards 0 – 7)'}
              </span>
              <h4 className="font-serif font-bold text-lg text-amber-100">
                {isVi ? 'Định Hình Bản Ngã & Thế Giới Xã Hội' : 'Ego Formation & Social Integration'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isVi
                  ? 'Bắt đầu từ sự ngây thơ (The Fool), học hỏi công cụ (Magician), lắng nghe tiềm thức (High Priestess), đón nhận sự nuôi dưỡng (Empress) và thiết lập ranh giới xã hội (Emperor, Hierophant, Lovers, Chariot).'
                  : 'Starting with pure openness (The Fool), discovering agency (The Magician), intuition (High Priestess), nurturing (Empress), and social mastery (Emperor to Chariot).'}
              </p>
            </div>

            {/* Stage 2 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-indigo-400/20 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
                {isVi ? 'Giai Đoạn 2 (Lá 8 – 14)' : 'Stage 2 (Cards 8 – 14)'}
              </span>
              <h4 className="font-serif font-bold text-lg text-amber-100">
                {isVi ? 'Khủng Hoảng Nội Tâm & Chiêm Nghiệm Cá Nhân' : 'Inner Crisis, Solitude & Transformation'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isVi
                  ? 'Đối diện với sự kiên định (Strength), lùi lại tĩnh lặng (The Hermit), chấp nhận quy luật vô thường (Wheel of Fortune), nhìn nhận công bằng (Justice), buông bỏ góc nhìn cũ (Hanged Man) và chuyển hóa sâu sắc (Death, Temperance).'
                  : 'Confronting inner resilience (Strength), conscious solitude (The Hermit), impermanence (Wheel of Fortune), surrendered perspectives (Hanged Man), and deep metamorphosis (Death).'}
              </p>
            </div>

            {/* Stage 3 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-400/20 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                {isVi ? 'Giai Đoạn 3 (Lá 15 – 21)' : 'Stage 3 (Cards 15 – 21)'}
              </span>
              <h4 className="font-serif font-bold text-lg text-amber-100">
                {isVi ? 'Giải Thoát Bản Thân & Sự Trọn Vẹn Hợp Nhất' : 'Transcendence & Holistic Integration'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isVi
                  ? 'Nhận diện chiếc bóng tâm lý (The Devil), phá vỡ ảo tưởng giả tạo (The Tower), thắp sáng niềm hy vọng (The Star), đi qua bóng tối vô thức (The Moon), rực rỡ thức tỉnh (The Sun), đánh giá cuộc đời (Judgement) và hòa nhập viên mãn (The World).'
                  : 'Integrating shadow dynamics (The Devil), shattering false structures (The Tower), rekindling hope (The Star), traversing unconscious fears (The Moon), celebrating vitality (The Sun), and completing wholeness (The World).'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRACTICE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-400/30 shadow-2xl space-y-6">
            <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-bold text-amber-400 uppercase tracking-wider">
                {isVi ? `Tình huống ${currentQuestionIndex + 1}/${quizQuestions.length}` : `Question ${currentQuestionIndex + 1}/${quizQuestions.length}`}
              </span>
              <span>
                {isVi ? `Điểm phản tỉnh: ${score}` : `Score: ${score}`}
              </span>
            </div>

            {/* Scenario Box */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                {isVi ? 'Tình huống đời sống:' : 'Life Scenario:'}
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {isVi ? currentQ.scenarioVi : currentQ.scenarioEn}
              </p>
            </div>

            <h3 className="font-serif font-bold text-base sm:text-lg text-amber-100">
              {isVi ? currentQ.questionVi : currentQ.questionEn}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {options.map((opt, idx) => {
                const isChosen = selectedOption === idx;
                let btnStyle = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300';
                
                if (showExplanation) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                  } else if (isChosen) {
                    btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={showExplanation}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="flex-grow">
                      <span>{opt.text}</span>
                      {showExplanation && isChosen && (
                        <p className="text-xs mt-2 text-slate-300 font-normal leading-relaxed pt-2 border-t border-slate-800">
                          {opt.reason}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            {showExplanation && (
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg"
                >
                  <span>
                    {currentQuestionIndex + 1 < quizQuestions.length
                      ? (isVi ? 'Tình huống tiếp theo' : 'Next Scenario')
                      : (isVi ? 'Làm lại từ đầu' : 'Restart Quiz')}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
