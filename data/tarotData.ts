import { TarotCard } from '../types';

export const ALL_TAROT_CARDS: TarotCard[] = [
  // ==========================================
  // MAJOR ARCANA (0 - 21)
  // ==========================================
  {
    id: "major-00",
    number: 0,
    name: "The Fool",
    nameVi: "The Fool (Kẻ Khờ)",
    arcana: "Major",
    suit: null,
    rank: 0,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
    keywords: ["Beginnings", "Innocence", "Spontaneity", "Potential", "Open-mindedness"],
    keywordsVi: ["Khởi đầu mới", "Sự ngây thơ", "Tự do nội tâm", "Tiềm năng", "Sẵn sàng học hỏi"],
    symbolism: "A traveler poised at the edge of a cliff, accompanied by a white dog, carrying a white rose and a small knapsack.",
    symbolismVi: "Chàng lãng tử đứng trước mép vực với chú chó trắng trung thành, tay cầm cành hồng trắng và chiếc tay nải nhỏ.",
    symbols: [
      { name: "Cliff Edge", nameVi: "Mép vực", meaning: "The threshold of the unknown and uncharted experiences", meaningVi: "Ngưỡng cửa của những điều chưa biết và trải nghiệm mới" },
      { name: "White Dog", nameVi: "Chú chó trắng", meaning: "Instinctive guidance and self-protection", meaningVi: "Bản năng và tiếng nói nhắc nhở bên trong" },
      { name: "White Rose", nameVi: "Bông hồng trắng", meaning: "Purity of intention and fresh curiosity", meaningVi: "Ý định thuần khiết và sự tò mò trong sáng" }
    ],
    psychologicalThemes: ["Beginner's Mind", "Tolerance for Uncertainty", "Freedom from Presumptions"],
    psychologicalThemesVi: ["Tâm thế người mới bắt đầu", "Chấp nhận sự mơ hồ", "Giải phóng khỏi định kiến"],
    uprightMeaning: "An invitation to embrace a fresh start with curiosity rather than fear. You are at the threshold of a new chapter.",
    uprightMeaningVi: "Lời mời gọi đón nhận khởi đầu mới với lòng tò mò thay vì âu lo. Bạn đang đứng trước một cánh cửa mới.",
    reversedMeaning: "A reminder to balance spontaneity with mindfulness; pausing to check if you are rushing without noticing your surroundings.",
    reversedMeaningVi: "Lời nhắc giữ sự cân bằng giữa ngẫu hứng và cẩn trọng; hãy dừng lại xem xét liệu mình có đang vội vã mà quên quan sát xung quanh.",
    reflectionPrompts: [
      "What would you try if you were not afraid of looking inexperienced?",
      "Where in your life is it time to adopt a beginner's curiosity?",
      "What old assumption are you ready to unlearn?"
    ],
    reflectionPromptsVi: [
      "Bạn sẽ thử điều gì nếu không sợ cảm giác mình còn non nớt?",
      "Khía cạnh nào trong đời sống bạn cần một góc nhìn mới mẻ của người mới bắt đầu?",
      "Định kiến cũ nào bạn đã sẵn sàng buông xuống để học lại từ đầu?"
    ],
    positiveActions: [
      "Take one small, playful first step toward a lingering idea.",
      "Write down 3 things you are genuinely curious to learn this month."
    ],
    positiveActionsVi: [
      "Thực hiện một bước đi nhỏ, nhẹ nhàng cho một ý tưởng bạn đã ấp ủ.",
      "Ghi lại 3 điều bạn thực sự tò mò muốn khám phá trong tháng này."
    ],
    contextualInsights: {
      en: {
        love: "Approach connections with freshness; let go of previous baggage and see the person as they are.",
        work: "Embrace innovative concepts or a new project with enthusiasm; keep an open mind to feedback.",
        growth: "Allow yourself to be a novice again without self-judgment.",
        emotion: "Feelings of excitement and liberation mixed with healthy butterflies.",
        decision: "Evaluate if fear of making a mistake is keeping you frozen at the starting line.",
        general: "A gentle breeze of new possibilities inviting your authentic curiosity."
      },
      vi: {
        love: "Tiếp cận mối quan hệ với sự trong trẻo; buông gánh nặng cũ để nhìn nhận đối phương chân thật.",
        work: "Đón nhận dự án hay ý tưởng mới với sự nhiệt thành; sẵn sàng lắng nghe và học hỏi.",
        growth: "Cho phép bản thân được là người học việc mà không tự phán xét.",
        emotion: "Cảm giác háo hức, tự do xen lẫn chút rung động trước chân trời mới.",
        decision: "Xem xét liệu nỗi sợ phạm lỗi có đang giữ chân bạn ở vạch xuất phát không.",
        general: "Làn gió của những khả năng mới đang mời gọi sự khám phá chân thành của bạn."
      }
    },
    cautionContext: "Notice whether you are leaping impulsively to escape discomfort rather than moving with deliberate curiosity.",
    cautionContextVi: "Hãy quan sát xem bạn có đang bộc phát để trốn tránh cảm giác khó chịu thay vì bước đi với sự tỉnh thức."
  },
  {
    id: "major-01",
    number: 1,
    name: "The Magician",
    nameVi: "The Magician (Nhà Ảo Thuật)",
    arcana: "Major",
    suit: null,
    rank: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
    keywords: ["Resourcefulness", "Agency", "Focus", "Manifestation", "Intentional Action"],
    keywordsVi: ["Năng lực thực thi", "Chủ động", "Tập trung", "Sử dụng nguồn lực", "Hành động có chủ đích"],
    symbolism: "A figure with an infinity symbol above the head, pointing one hand to heaven and one to earth, with tools of all four suits on the table.",
    symbolismVi: "Nhân vật với dấu vô cực trên đầu, một tay hướng trời một tay chỉ đất, trước mặt là bàn đạo cụ đủ cả 4 bộ.",
    symbols: [
      { name: "Four Suit Tools", nameVi: "Bốn công cụ", meaning: "Mind (Swords), Heart (Cups), Passion (Wands), Reality (Pentacles)", meaningVi: "Tâm trí (Kiếm), Cảm xúc (Cốc), Ý chí (Gậy), Thực tiễn (Tiền)" },
      { name: "Infinity Sign", nameVi: "Dấu vô cực", meaning: "Limitless focus and conscious alignment", meaningVi: "Sự tập trung và khả năng kết nối ý tưởng với thực tại" }
    ],
    psychologicalThemes: ["Self-Efficacy", "Focusing Energy", "Bridging Thought and Action"],
    psychologicalThemesVi: ["Cảm giác tự tin vào năng lực", "Tập trung năng lượng", "Nối liền suy nghĩ và hành động"],
    uprightMeaning: "You possess the internal tools and clarity to shape your current circumstances through deliberate, focused action.",
    uprightMeaningVi: "Bạn đang có sẵn những công cụ và sự sáng suốt cần thiết để định hình hoàn cảnh bằng hành động cụ thể.",
    reversedMeaning: "A prompt to check if your energy is scattered or if you are doubting your capabilities; realign your focus on one single task.",
    reversedMeaningVi: "Lời nhắc kiểm tra xem năng lượng của bạn có đang bị phân tán hay tự nghi ngờ; hãy gom sự chú ý vào một việc cụ thể.",
    reflectionPrompts: [
      "What internal resource or skill have you underutilized recently?",
      "How can you translate your abstract thought into one concrete step today?",
      "Where can you take active ownership of your situation?"
    ],
    reflectionPromptsVi: [
      "Kỹ năng hay nguồn lực nào bạn đang sẵn có nhưng chưa tận dụng?",
      "Làm thế nào để chuyển một ý nghĩ trừu tượng thành một hành động cụ thể hôm nay?",
      "Khía cạnh nào bạn có thể chủ động đứng ra làm chủ tình thế?"
    ],
    positiveActions: [
      "Select one important priority and dedicate 25 distraction-free minutes to it.",
      "List 3 resources (skills, contacts, habits) readily available to you right now."
    ],
    positiveActionsVi: [
      "Chọn ra 1 ưu tiên then chốt và dành 25 phút tập trung trọn vẹn không xao nhãng.",
      "Liệt kê 3 nguồn lực (kỹ năng, người hỗ trợ, thói quen) bạn đang có sẵn ngay lúc này."
    ],
    contextualInsights: {
      en: {
        love: "Communicate your intentions clearly; bring active care and authentic expression to your bonds.",
        work: "Leverage your core competencies to deliver tangible progress on your projects.",
        growth: "Recognize that your agency is your greatest asset in self-development.",
        emotion: "A state of alert mental clarity and ready engagement.",
        decision: "Look at the practical instruments and facts in front of you to guide your choice.",
        general: "Channel your creative will into meaningful, grounded manifestations."
      },
      vi: {
        love: "Giao tiếp rõ ràng ý định; mang sự chủ động quan tâm và chân thành vào các mối quan hệ.",
        work: "Vận dụng thế mạnh cốt lõi để tạo bước tiến rõ rệt cho công việc.",
        growth: "Nhận ra năng lực tự chủ là tài sản quý giá nhất trong sự phát triển cá nhân.",
        emotion: "Trạng thái tỉnh táo, tập trung và sẵn sàng hành động.",
        decision: "Nhìn vào các công cụ thực tế và dữ liệu trước mắt để đưa ra lựa chọn.",
        general: "Dẫn dắt ý chí sáng tạo vào những kết quả thiết thực, có ý nghĩa."
      }
    },
    cautionContext: "Ensure your focus is grounded in ethics and sincerity rather than attempting to manipulate outcomes.",
    cautionContextVi: "Hãy đảm bảo năng lực của bạn bắt nguồn từ sự chân thành thay vì cố gắng thao túng kết quả."
  },
  {
    id: "major-02",
    number: 2,
    name: "The High Priestess",
    nameVi: "The High Priestess (Nữ Đại Tư Tế)",
    arcana: "Major",
    suit: null,
    rank: 2,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
    keywords: ["Intuition", "Inner Knowing", "Subconscious", "Stillness", "Mystery"],
    keywordsVi: ["Trực giác", "Hiểu biết nội tâm", "Tiềm thức", "Sự tĩnh lặng", "Lắng nghe sâu"],
    symbolism: "A seated woman between pillars of dark and light (Boaz and Jachin), holding a sacred scroll, with a veil of pomegranates behind her.",
    symbolismVi: "Người phụ nữ ngồi giữa hai trụ cột đen và trắng, tay giữ cuộn thư tín, phía sau là tấm màn dệt trái lựu.",
    symbols: [
      { name: "Two Pillars", nameVi: "Hai cột trụ", meaning: "Duality and balance between conscious logic and unconscious wisdom", meaningVi: "Sự cân bằng giữa lý trí ý thức và trí tuệ tiềm thức" },
      { name: "Pomegranate Veil", nameVi: "Màn trái lựu", meaning: "Hidden depth and fertile internal insights", meaningVi: "Chiều sâu ẩn giấu và những hạt mầm nhận thức bên trong" }
    ],
    psychologicalThemes: ["Intuitive Processing", "Holding Space", "Listening Beyond Noise"],
    psychologicalThemesVi: ["Xử lý trực giác", "Giữ không gian tĩnh", "Lắng nghe vượt qua tiếng ồn"],
    uprightMeaning: "A reminder to pause external searching and tune in to your quiet inner signals and unspoken truths.",
    uprightMeaningVi: "Lời nhắc tạm dừng việc tìm kiếm bên ngoài để lắng nghe những tín hiệu tĩnh lặng từ trực giác và chiều sâu nội tâm.",
    reversedMeaning: "A sign that external opinions or constant chatter may be drowning out your inner compass; grant yourself quiet space.",
    reversedMeaningVi: "Dấu hiệu cho thấy tiếng ồn bên ngoài có thể đang lấn át tiếng nói trực giác; hãy dành cho mình khoảng lặng để tái kết nối.",
    reflectionPrompts: [
      "What truth have you been sensing intuitively but hesitating to acknowledge?",
      "How often do you sit in silence without reaching for a phone or distraction?",
      "What is your body or gut feeling trying to tell you?"
    ],
    reflectionPromptsVi: [
      "Sự thật nào bạn đã cảm nhận được từ lâu nhưng còn ngần ngại thừa nhận?",
      "Bạn có thường dành cho mình những phút tĩnh lặng hoàn toàn không thiết bị công nghệ?",
      "Cảm nhận cơ thể hoặc trực giác đang muốn gửi gắm thông điệp gì đến bạn?"
    ],
    positiveActions: [
      "Spend 10 minutes journaling your raw, uncensored impressions without editing.",
      "Take a quiet walk in nature or sit near a window in stillness."
    ],
    positiveActionsVi: [
      "Dành 10 phút viết nhật ký tự do ghi lại mọi cảm nhận chân thật nhất.",
      "Dành một khoảng thời gian đi bộ chậm rãi hoặc ngồi tĩnh lặng bên cửa sổ."
    ],
    contextualInsights: {
      en: {
        love: "Observe the emotional undertones in your relationship; what is felt beneath spoken words?",
        work: "Trust your diagnostic insight before jumping to rapid conclusions.",
        growth: "Deepen your self-awareness through contemplative practices or reflective writing.",
        emotion: "A gentle, deep undercurrent of intuition waiting for validation.",
        decision: "Sleep on the dilemma; allow your subconscious mind to synthesize the options.",
        general: "The answers you seek may require listening rather than striving."
      },
      vi: {
        love: "Quan sát những tầng cảm xúc sâu sắc; điều gì đang hiện diện bên dưới những lời nói bề mặt?",
        work: "Tin tưởng vào sự nhạy bén và quan sát kỹ lưỡng trước khi vội vàng kết luận.",
        growth: "Làm sâu sắc nhận thức bản thân qua việc suy ngẫm và đối thoại nội tâm.",
        emotion: "Dòng chảy cảm xúc sâu lắng đang cần được bạn lắng nghe và tôn trọng.",
        decision: "Hãy cho bản thân thời gian suy ngẫm qua đêm để tiềm thức sắp xếp các mảnh ghép.",
        general: "Câu trả lời bạn tìm kiếm đôi khi cần sự lắng đọng hơn là sự gắng sức."
      }
    },
    cautionContext: "Avoid retreating so far into silence that you become emotionally detached or dismissive of practical realities.",
    cautionContextVi: "Tránh việc chìm quá sâu vào tĩnh lặng đến mức xa rời thực tế hoặc ngắt kết nối với người xung quanh."
  },
  {
    id: "major-03",
    number: 3,
    name: "The Empress",
    nameVi: "The Empress (Nữ Hoàng)",
    arcana: "Major",
    suit: null,
    rank: 3,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
    keywords: ["Nurturance", "Abundance", "Creativity", "Embodiment", "Compassion"],
    keywordsVi: ["Nuôi dưỡng", "Sự trù phú", "Sáng tạo tự nhiên", "Chăm sóc thân tâm", "Lòng trắc ẩn"],
    symbolism: "A serene queen seated in a lush grain field surrounded by flowing water, a crown of twelve stars, and a shield bearing the Venus symbol.",
    symbolismVi: "Người mẹ hiền hòa ngồi giữa đồng lúa mì vàng óng bên dòng suối chảy, vương miện 12 ngôi sao và tấm khiên biểu tượng Sao Kim.",
    symbols: [
      { name: "Golden Wheat", nameVi: "Lúa mì vàng", meaning: "Natural harvest, fertility, and organic growth in due time", meaningVi: "Mùa màng bội thu và sự phát triển tự nhiên theo thời gian" },
      { name: "Flowing Stream", nameVi: "Dòng suối chảy", meaning: "Emotional nourishment and vital life force", meaningVi: "Nguồn nuôi dưỡng cảm xúc và sinh khí dồi dào" }
    ],
    psychologicalThemes: ["Self-Care", "Generosity", "Creative Germination"],
    psychologicalThemesVi: ["Tự chăm sóc bản thân", "Sự hào phóng ấm áp", "Ươm mầm ý tưởng sáng tạo"],
    uprightMeaning: "An invitation to nourish yourself and your surroundings. Cultivate your projects with warmth, patience, and sensory appreciation.",
    uprightMeaningVi: "Lời mời gọi chăm sóc bản thân và môi trường sống. Hãy nuôi dưỡng các dự định bằng sự kiên nhẫn và tình yêu thương.",
    reversedMeaning: "A reminder to check if you are depleting your own reserves by giving endlessly, or neglecting your physical and emotional wellbeing.",
    reversedMeaningVi: "Lời nhắc kiểm tra xem bạn có đang cạn kiệt vì cho đi quá nhiều hoặc bỏ quên nhu cầu thể chất và tinh thần của chính mình.",
    reflectionPrompts: [
      "How can you offer yourself the same compassion you extend to others?",
      "What creative or personal seed needs your gentle nourishment right now?",
      "In what way can you make your daily environment more comfortable and restorative?"
    ],
    reflectionPromptsVi: [
      "Làm sao để bạn đối đãi với chính mình dịu dàng như cách bạn chăm sóc người khác?",
      "Ý tưởng hay dự định nào đang cần bạn kiên nhẫn vun đắp từng ngày?",
      "Bạn có thể làm gì để không gian sống và làm việc trở nên dễ chịu, thư thái hơn?"
    ],
    positiveActions: [
      "Prepare or enjoy a wholesome, nourishing meal with full mindfulness.",
      "Spend time caring for a plant, your physical body, or a cozy space at home."
    ],
    positiveActionsVi: [
      "Thưởng thức một bữa ăn lành mạnh, đủ chất với trọn vẹn sự chú tâm.",
      "Dành thời gian chăm sóc cơ thể, một chậu cây nhỏ hoặc dọn dẹp góc làm việc ấm cúng."
    ],
    contextualInsights: {
      en: {
        love: "Foster warmth, emotional safety, and mutual appreciation in your relationships.",
        work: "Allow ideas time to mature organically rather than forcing rapid results.",
        growth: "Embrace the joy of being human; celebrate small sensory pleasures.",
        emotion: "Gentle contentment and grounded self-worth.",
        decision: "Choose the path that offers sustainable nourishment over exhausting depletion.",
        general: "Nature and patience are powerful allies in your journey."
      },
      vi: {
        love: "Xây dựng sự ấm áp, an toàn cảm xúc và thấu hiểu trong mối quan hệ.",
        work: "Để ý tưởng có thời gian trưởng thành tự nhiên thay vì thúc ép kết quả ngay lập tức.",
        growth: "Tận hưởng niềm vui bình dị và trân trọng từng khoảnh khắc cuộc sống.",
        emotion: "Cảm giác an yên, đủ đầy và kết nối ấm áp với bản thân.",
        decision: "Chọn con đường mang lại sự bền vững lâu dài thay vì sự kiệt quệ nhất thời.",
        general: "Sự kiên nhẫn và hòa hợp với tự nhiên sẽ mang lại quả ngọt xứng đáng."
      }
    },
    cautionContext: "Be mindful not to smother growth with overprotectiveness or overextend your personal boundaries.",
    cautionContextVi: "Cẩn trọng đừng kiểm soát quá mức vì lo lắng hoặc để bản thân bị quá tải do không biết từ chối."
  },
  {
    id: "major-04",
    number: 4,
    name: "The Emperor",
    nameVi: "The Emperor (Hoàng Đế)",
    arcana: "Major",
    suit: null,
    rank: 4,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
    keywords: ["Structure", "Stability", "Boundaries", "Leadership", "Discipline"],
    keywordsVi: ["Cấu trúc", "Sự vững chãi", "Ranh giới cá nhân", "Tính kỷ luật", "Trách nhiệm"],
    symbolism: "A commanding figure seated on a stone throne carved with rams' heads, holding a scepter and orb against barren mountains.",
    symbolismVi: "Bậc quân vương ngồi trên ngai đá khắc đầu cừu đực, tay cầm vương trượng và quả cầu quyền lực trước dãy núi đá kiên cố.",
    symbols: [
      { name: "Stone Throne", nameVi: "Ngai đá", meaning: "Solid foundations, stability, and enduring principles", meaningVi: "Nền tảng vững chắc, sự ổn định và nguyên tắc sống" },
      { name: "Ram Heads", nameVi: "Đầu cừu đực", meaning: "Determination, pioneering spirit, and healthy resolve", meaningVi: "Ý chí kiên định, tinh thần tiên phong và quyết đoán" }
    ],
    psychologicalThemes: ["Establishing Boundaries", "Constructive Organization", "Inner Authority"],
    psychologicalThemesVi: ["Thiết lập ranh giới lành mạnh", "Tổ chức cuộc sống có trật tự", "Thẩm quyền nội tâm"],
    uprightMeaning: "An encouragement to bring order, clarity, and healthy structure into your affairs. Stand firm in your constructive principles.",
    uprightMeaningVi: "Lời khích lệ mang lại trật tự, kỷ luật và cấu trúc rõ ràng cho đời sống. Hãy kiên định với những nguyên tắc đúng đắn.",
    reversedMeaning: "A prompt to notice if rigidity, over-control, or fear of disorder is making you inflexible; cultivate adaptability.",
    reversedMeaningVi: "Lời nhắc xem xét liệu sự cứng nhắc, thói quen kiểm soát quá mức có đang làm bạn căng thẳng; hãy học cách linh hoạt.",
    reflectionPrompts: [
      "Where in your life would a clear routine or boundary bring you peace?",
      "What does healthy self-discipline look like for you today?",
      "Are you leading your life according to your values or reacting to external pressure?"
    ],
    reflectionPromptsVi: [
      "Thiết lập một ranh giới rõ ràng ở đâu sẽ mang lại sự nhẹ nhõm cho bạn?",
      "Tính kỷ luật tự giác lành mạnh có ý nghĩa như thế nào đối với bạn hôm nay?",
      "Bạn đang chủ động dẫn dắt cuộc sống theo giá trị cốt lõi hay đang bị động phản ứng?"
    ],
    positiveActions: [
      "Organize one chaotic area of your calendar or workspace.",
      "Politely and firmly define one personal boundary that protects your energy."
    ],
    positiveActionsVi: [
      "Sắp xếp lại lịch trình hoặc bàn làm việc ngăn nắp, rõ ràng.",
      "Thiết lập một ranh giới lịch sự nhưng kiên định để bảo vệ năng lượng cá nhân."
    ],
    contextualInsights: {
      en: {
        love: "Provide emotional consistency, reliability, and clear mutual expectations.",
        work: "Create an actionable project plan with defined milestones and accountability.",
        growth: "Build sustainable habits that support long-term goals.",
        emotion: "Feelings of grounded resolve and readiness to take responsibility.",
        decision: "Base your choice on logic, practical feasibility, and long-term stability.",
        general: "True strength lies in steady foundations and calm self-governance."
      },
      vi: {
        love: "Mang lại sự nhất quán, đáng tin cậy và kỳ vọng rõ ràng trong mối quan hệ.",
        work: "Lập kế hoạch công việc chi tiết với các cột mốc cụ thể và trách nhiệm rõ ràng.",
        growth: "Xây dựng những thói quen bền bỉ làm bệ phóng cho mục tiêu dài hạn.",
        emotion: "Cảm giác vững vàng, tự chủ và sẵn sàng gánh vác trách nhiệm.",
        decision: "Dựa trên lý trí, tính khả thi thực tế và sự ổn định lâu dài.",
        general: "Sức mạnh thực sự đến từ nền tảng vững chắc và khả năng làm chủ chính mình."
      }
    },
    cautionContext: "Ensure structure serves growth rather than becoming a cage of perfectionism or stubborn inflexibility.",
    cautionContextVi: "Hãy nhớ rằng kỷ luật là để phục vụ sự tự do, đừng biến nó thành chiếc lồng của chủ nghĩa hoàn hảo."
  },
  {
    id: "major-05",
    number: 5,
    name: "The Hierophant",
    nameVi: "The Hierophant (Đại Đạo Sư)",
    arcana: "Major",
    suit: null,
    rank: 5,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
    keywords: ["Tradition", "Mentorship", "Shared Values", "Wisdom Systems", "Beliefs"],
    keywordsVi: ["Truyền thống", "Học hỏi từ người đi trước", "Hệ giá trị chung", "Tri thức hệ thống", "Niềm tin"],
    symbolism: "A spiritual teacher seated between two pillars, blessing two initiates with crossed keys at his feet.",
    symbolismVi: "Bậc thầy tinh thần ngồi giữa hai trụ giáo đường, truyền dạy cho hai đệ tử với đôi chìa khóa bắt chéo dưới chân.",
    symbols: [
      { name: "Crossed Keys", nameVi: "Đôi chìa khóa", meaning: "Unlocking conscious understanding and shared knowledge", meaningVi: "Mở khóa nhận thức và chia sẻ tri thức tinh hoa" },
      { name: "Triple Crown", nameVi: "Vương miện ba tầng", meaning: "Integration of mind, spirit, and social practice", meaningVi: "Sự kết hợp giữa tâm trí, tinh thần và hành động xã hội" }
    ],
    psychologicalThemes: ["Constructive Mentorship", "Examining Inherited Beliefs", "Community Wisdom"],
    psychologicalThemesVi: ["Tìm kiếm người hướng dẫn", "Xem xét lại niềm tin kế thừa", "Trí tuệ cộng đồng"],
    uprightMeaning: "An invitation to learn from proven wisdom, seek sound guidance, or reflect on the values that anchor your decisions.",
    uprightMeaningVi: "Lời mời học hỏi từ những người có kinh nghiệm, tìm kiếm lời khuyên thấu đáo hoặc nhìn nhận lại hệ giá trị cốt lõi của bạn.",
    reversedMeaning: "A sign to question dogmas or traditions that no longer resonate; find your authentic personal philosophy.",
    reversedMeaningVi: "Lời nhắc xem xét lại những định kiến hay khuôn mẫu không còn phù hợp để xây dựng tiếng nói và triết lý sống riêng.",
    reflectionPrompts: [
      "Whose guidance or experience could help shed light on your current question?",
      "Which inherited rule or expectation is ready to be re-evaluated?",
      "What core value do you want to stand for, regardless of popular opinion?"
    ],
    reflectionPromptsVi: [
      "Kinh nghiệm của người thầy hay người bạn nào có thể soi sáng cho băn khoăn của bạn?",
      "Quy tắc hay kỳ vọng nào từ quá khứ bạn cảm thấy đã đến lúc cần nhìn nhận lại?",
      "Giá trị cốt lõi nào bạn muốn kiên trì giữ gìn bất kể quan điểm số đông?"
    ],
    positiveActions: [
      "Read a chapter from a thoughtful book or consult a trusted mentor.",
      "Write down your top 3 non-negotiable personal values."
    ],
    positiveActionsVi: [
      "Đọc một chương sách giá trị hoặc trò chuyện xin lời khuyên từ người bạn tin cậy.",
      "Ghi lại 3 giá trị sống quan trọng nhất định hình con người bạn."
    ],
    contextualInsights: {
      en: {
        love: "Align on shared principles and deep mutual respect in your partnerships.",
        work: "Follow sound methodologies or seek mentorship from seasoned professionals.",
        growth: "Deepen your understanding through structured learning.",
        emotion: "Seeking clarity and grounded purpose.",
        decision: "Weigh your choices against your fundamental ethical code.",
        general: "Honor the lessons of the past while remaining open to personal truth."
      },
      vi: {
        love: "Thống nhất về các nguyên tắc cốt lõi và sự tôn trọng lẫn nhau trong mối quan hệ.",
        work: "Tuân theo phương pháp bài bản hoặc tìm kiếm sự cố vấn từ người đi trước.",
        growth: "Làm sâu sắc hiểu biết thông qua việc học tập có hệ thống.",
        emotion: "Nhu cầu tìm kiếm sự rõ ràng, hướng đi và điểm tựa đạo đức.",
        decision: "Đo lường các lựa chọn dựa trên bộ quy chuẩn giá trị trung thực của bạn.",
        general: "Tôn trọng những bài học quý báu và giữ vững la bàn đạo đức bên trong."
      }
    },
    cautionContext: "Do not surrender your critical thinking to rigid dogmas or blindly follow authority without reflection.",
    cautionContextVi: "Đừng từ bỏ tư duy phản biện để mù quáng tuân theo những giáo điều hay áp lực xã hội."
  },
  {
    id: "major-06",
    number: 6,
    name: "The Lovers",
    nameVi: "The Lovers (Tình Nhân)",
    arcana: "Major",
    suit: null,
    rank: 6,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
    keywords: ["Alignment", "Values Choice", "Harmony", "Vulnerability", "Mutual Trust"],
    keywordsVi: ["Sự hòa hợp", "Lựa chọn giá trị", "Gắn kết chân thành", "Mở lòng", "Tin cậy lẫn nhau"],
    symbolism: "A man and woman standing beneath the angel Raphael, with the Tree of Life and Tree of Knowledge behind them.",
    symbolismVi: "Đôi tình nhân đứng dưới đôi cánh chở che của thiên thần Raphael, phía sau là Cây Sự Sống và Cây Tri Thức.",
    symbols: [
      { name: "Angel Raphael", nameVi: "Thiên thần Raphael", meaning: "Healing through authentic connection and truth", meaningVi: "Sự chữa lành qua kết nối chân thành và sự thật" },
      { name: "Two Trees", nameVi: "Hai thân cây", meaning: "Conscious choice between instinct and ethical wisdom", meaningVi: "Lựa chọn có ý thức giữa bản năng và sự sáng suốt" }
    ],
    psychologicalThemes: ["Value-Based Decisions", "Vulnerable Connection", "Internal Integration"],
    psychologicalThemesVi: ["Quyết định dựa trên giá trị", "Kết nối dễ tổn thương", "Hòa hợp hai mặt nội tâm"],
    uprightMeaning: "A reminder that authentic connection and meaningful decisions stem from alignment with your honest personal values.",
    uprightMeaningVi: "Lời nhắc rằng sự gắn kết chân thật và quyết định đúng đắn bắt nguồn từ việc sống thật với hệ giá trị của chính mình.",
    reversedMeaning: "A gentle check on internal conflict, misalignment of values, or avoiding an honest conversation with yourself or a partner.",
    reversedMeaningVi: "Lời nhắc kiểm tra sự mâu thuẫn nội tâm hoặc sự né tránh một cuộc đối thoại chân thành với chính mình hoặc đối phương.",
    reflectionPrompts: [
      "What choice are you facing that asks you to define who you truly want to be?",
      "Where in your relationships can you bring more vulnerability and honesty?",
      "Are your current actions in harmony with your deepest moral values?"
    ],
    reflectionPromptsVi: [
      "Lựa chọn nào trước mắt đang đòi hỏi bạn xác định rõ con người bạn muốn trở thành?",
      "Bạn có thể mang thêm sự cởi mở và chân thành vào mối quan hệ nào?",
      "Hành động hiện tại của bạn có đang đồng điệu với giá trị đạo đức sâu kín nhất không?"
    ],
    positiveActions: [
      "Initiate one honest, caring conversation about what truly matters to you.",
      "Identify which option in a current decision resonates with your authentic self."
    ],
    positiveActionsVi: [
      "Bắt đầu một cuộc trò chuyện chân thành, ấm áp về điều thực sự có ý nghĩa với bạn.",
      "Xác định phương án nào trong quyết định hiện tại thể hiện đúng con người thật của bạn."
    ],
    contextualInsights: {
      en: {
        love: "Deepen intimacy through active listening, shared vulnerability, and mutual appreciation.",
        work: "Collaborate with partners whose ethical standards match your own.",
        growth: "Integrate opposing sides of your personality into a harmonious whole.",
        emotion: "Openness to connection and tender self-acceptance.",
        decision: "Choose the path that honors your integrity, not just short-term convenience.",
        general: "True union begins with making peace with all parts of yourself."
      },
      vi: {
        love: "Làm sâu sắc tình cảm qua việc lắng nghe, cởi mở chia sẻ và tôn trọng đối phương.",
        work: "Hợp tác với những cộng sự có chung tiêu chuẩn đạo đức và định hướng.",
        growth: "Dung hòa các khía cạnh đối lập trong tính cách để tạo nên sự thống nhất.",
        emotion: "Sự cởi mở, ấm áp và chấp nhận bản thân trọn vẹn.",
        decision: "Hãy chọn phương án giữ gìn được sự chính trực thay vì tiện ích nhất thời.",
        general: "Sự hòa hợp đích thực bắt đầu từ việc bạn làm hòa với chính nội tâm mình."
      }
    },
    cautionContext: "Avoid losing your individuality or abandoning your core boundaries in the name of pleasing others.",
    cautionContextVi: "Tránh việc đánh mất cá tính hoặc nhượng bộ ranh giới cốt lõi chỉ để làm hài lòng người khác."
  },
  {
    id: "major-07",
    number: 7,
    name: "The Chariot",
    nameVi: "The Chariot (Cỗ Xe Chiến Thắng)",
    arcana: "Major",
    suit: null,
    rank: 7,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
    keywords: ["Direction", "Self-Determination", "Focus", "Overcoming Obstacles", "Momentum"],
    keywordsVi: ["Định hướng", "Quyết tâm", "Tập trung ý chí", "Vượt qua trở ngại", "Lực đẩy hành động"],
    symbolism: "An armored prince riding a chariot drawn by two contrasting sphinxes (black and white), holding no reins but guiding with intent.",
    symbolismVi: "Chiến binh kiên cường trên cỗ xe được kéo bởi hai nhân sư đen và trắng, không cầm dây cương mà điều khiển bằng ý chí tập trung.",
    symbols: [
      { name: "Black and White Sphinxes", nameVi: "Nhân sư đen trắng", meaning: "Opposing impulses channeled in one coherent direction", meaningVi: "Những xung động trái ngược được định hướng về một mục tiêu chung" },
      { name: "Canopy of Stars", nameVi: "Màn sao che", meaning: "Higher purpose guiding earthly determination", meaningVi: "Mục đích cao đẹp dẫn dắt ý chí kiên định" }
    ],
    psychologicalThemes: ["Emotional Self-Regulation", "Intentional Drive", "Overcoming Hesitation"],
    psychologicalThemesVi: ["Điều hòa cảm xúc", "Động lực có chủ đích", "Vượt qua sự do dự"],
    uprightMeaning: "An invitation to harness your focus and drive. Steer conflicting emotions toward your chosen purpose with confidence.",
    uprightMeaningVi: "Lời mời gọi tập trung ý chí và năng lượng. Hãy dẫn dắt những cảm xúc đối lập hướng về mục tiêu bạn đã chọn.",
    reversedMeaning: "A reminder to reassess your trajectory; check whether you are forcing an outcome prematurely or feeling pulled in opposite directions.",
    reversedMeaningVi: "Lời nhắc xem lại hướng đi; kiểm tra xem bạn có đang thúc ép kết quả quá mức hoặc bị giằng xé giữa các ý muốn trái ngược.",
    reflectionPrompts: [
      "What is your primary destination or focus right now?",
      "How can you guide contradictory desires (e.g. comfort vs. growth) in harmony?",
      "Where do you need steady perseverance rather than bursts of impatience?"
    ],
    reflectionPromptsVi: [
      "Đích đến hay ưu tiên số một của bạn ngay lúc này là gì?",
      "Làm thế nào để điều hòa những mong muốn trái ngược (như an nhàn vs bứt phá)?",
      "Khía cạnh nào bạn cần sự bền bỉ kiên trì thay vì nóng vội nhất thời?"
    ],
    positiveActions: [
      "Define one clear milestone for the week and eliminate two non-essential distractions.",
      "Remind yourself of the deeper 'why' behind your current effort."
    ],
    positiveActionsVi: [
      "Xác định 1 cột mốc rõ ràng trong tuần và loại bỏ 2 nguồn gây xao nhãng không cần thiết.",
      "Nhắc nhở bản thân về lý do ý nghĩa thôi thúc bạn bắt đầu hành trình này."
    ],
    contextualInsights: {
      en: {
        love: "Move forward together with shared intentions; navigate relationship differences with steady respect.",
        work: "Drive forward key initiatives through disciplined milestones and clear focus.",
        growth: "Cultivate grit and emotional stamina when facing developmental learning curves.",
        emotion: "Energized determination and purposeful drive.",
        decision: "Commit wholeheartedly once your decision is made; avoid half-hearted steps.",
        general: "Guiding your inner forces with clarity creates unstinting forward momentum."
      },
      vi: {
        love: "Cùng nhau tiến bước với sự đồng thuận; dung hòa những điểm khác biệt bằng sự tôn trọng.",
        work: "Thúc đẩy các nhiệm vụ then chốt với sự kỷ luật và tập trung cao độ.",
        growth: "Rèn luyện sự bền bỉ và bản lĩnh khi đối diện với thử thách học hỏi mới.",
        emotion: "Cảm giác quyết tâm, tràn đầy sinh khí và sẵn sàng bứt phá.",
        decision: "Khi đã cân nhắc kỹ, hãy kiên định hành động và tránh sự chần chừ dao động.",
        general: "Khi bạn làm chủ được tâm trí và cảm xúc, mọi lực cản đều trở thành bước đệm."
      }
    },
    cautionContext: "Ensure your drive does not turn into stubborn aggression or steamrolling the feelings of others.",
    cautionContextVi: "Cẩn trọng đừng để ý chí mạnh mẽ biến thành sự áp đặt độc đoán hay phớt lờ cảm xúc của người xung quanh."
  },
  {
    id: "major-08",
    number: 8,
    name: "Strength",
    nameVi: "Strength (Sức Mạnh Nội Tâm)",
    arcana: "Major",
    suit: null,
    rank: 8,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
    keywords: ["Compassion", "Patience", "Inner Resilience", "Gentle Mastery", "Courage"],
    keywordsVi: ["Lòng trắc ẩn", "Kiên nhẫn", "Bản lĩnh dịu dàng", "Làm chủ cảm xúc", "Lòng can đảm"],
    symbolism: "A serene woman crowned with flowers and infinity gently taming a fierce lion through calm touch rather than physical force.",
    symbolismVi: "Người phụ nữ dịu hiền đội vòng hoa và dấu vô cực nhẹ nhàng vuốt ve chú sư tử dũng mãnh bằng sự từ ái thay vì vũ lực.",
    symbols: [
      { name: "The Lion", nameVi: "Chú sư tử", meaning: "Raw instinct, passions, fears, and vital impulses", meaningVi: "Bản năng nguyên sơ, đam mê, nỗi sợ và cảm xúc mãnh liệt" },
      { name: "Gentle Touch", nameVi: "Cái chạm dịu dàng", meaning: "Compassionate integration rather than violent suppression", meaningVi: "Sự thấu cảm và chuyển hóa thay vì đè nén, triệt tiêu" }
    ],
    psychologicalThemes: ["Emotional Regulation", "Befriending Vulnerability", "Quiet Confidence"],
    psychologicalThemesVi: ["Điều tiết cảm xúc lành mạnh", "Làm bạn với phần dễ tổn thương", "Sự tự tin thầm lặng"],
    uprightMeaning: "True power comes from gentle resilience, patient acceptance, and compassion toward your own internal doubts and fears.",
    uprightMeaningVi: "Sức mạnh đích thực đến từ lòng kiên nhẫn, sự dịu dàng và lòng trắc ẩn đối với những nỗi sợ hay sự bối rối bên trong bạn.",
    reversedMeaning: "A reminder to treat yourself kindly if you are feeling depleted or emotionally raw; replace harsh self-criticism with gentle care.",
    reversedMeaningVi: "Lời nhắc hãy đối xử dịu dàng với bản thân nếu bạn đang mệt mỏi; thay thế sự tự trách gay gắt bằng lòng bao dung.",
    reflectionPrompts: [
      "What difficult emotion (anger, fear, sadness) needs your gentle acceptance right now?",
      "How can you handle a challenging situation with patience rather than force?",
      "What does being kind to yourself in moments of weakness look like?"
    ],
    reflectionPromptsVi: [
      "Cảm xúc khó khăn nào (giận dữ, sợ hãi, bồn chồn) đang cần sự đón nhận dịu dàng của bạn?",
      "Làm thế nào để bạn xử lý một khúc mắc bằng sự mềm mỏng thay vì đối đầu gay gắt?",
      "Đối xử tử tế với chính mình trong lúc yếu mềm có ý nghĩa như thế nào với bạn?"
    ],
    positiveActions: [
      "Practice deep breathing when feeling triggered before reacting.",
      "Speak an affirming, gentle sentence to yourself in the mirror."
    ],
    positiveActionsVi: [
      "Hít thở sâu vài nhịp chậm rãi khi cảm thấy căng thẳng trước khi phản ứng.",
      "Tự nói với chính mình một câu động viên nhẹ nhàng, ấm áp."
    ],
    contextualInsights: {
      en: {
        love: "Respond with patience and empathy; defuse tensions through genuine understanding.",
        work: "Persist through obstacles with calm composure and steady diplomacy.",
        growth: "Transform harsh self-judgment into self-compassion.",
        emotion: "A warm, steady inner warmth that calms turmoil.",
        decision: "Choose the path of dignified patience rather than impulsive reaction.",
        general: "Softness and endurance outlast rigid force."
      },
      vi: {
        love: "Phản hồi bằng sự lắng nghe và thấu hiểu; xoa dịu căng thẳng bằng tình thương chân thành.",
        work: "Kiên trì vượt qua khó khăn bằng sự điềm tĩnh và khéo léo.",
        growth: "Chuyển hóa sự phán xét bản thân thành lòng trắc ẩn tự thân.",
        emotion: "Nguồn nhiệt huyết ấm áp, bình thản xoa dịu những xáo trộn.",
        decision: "Hãy chọn phương án mềm dẻo, bền vững thay vì phản ứng bốc đồng.",
        general: "Sự mềm mại và kiên nhẫn luôn có sức bền lớn hơn vũ lực cứng nhắc."
      }
    },
    cautionContext: "Do not confuse gentle patience with silent suffering; maintain your boundaries while staying calm.",
    cautionContextVi: "Đừng nhầm lẫn sự nhẫn nại với việc cam chịu chịu đựng; hãy giữ vững ranh giới bằng thái độ hòa nhã."
  },
  {
    id: "major-09",
    number: 9,
    name: "The Hermit",
    nameVi: "The Hermit (Ẩn Sĩ)",
    arcana: "Major",
    suit: null,
    rank: 9,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
    keywords: ["Introspection", "Solitude", "Inner Guidance", "Soul-Searching", "Clarity"],
    keywordsVi: ["Tĩnh lặng nội tâm", "Chiêm nghiệm", "Ngọn đèn soi sáng", "Lắng nghe chính mình", "Sự sáng tỏ"],
    symbolism: "An elder standing alone on a snow-capped peak, holding a lantern containing a glowing six-pointed star and a staff.",
    symbolismVi: "Vị hiền triết đứng một mình trên đỉnh núi tuyết, tay nâng ngọn đèn chứa ngôi sao 6 cánh và chống cây trượng vững chãi.",
    symbols: [
      { name: "Lantern Star", nameVi: "Ngôi sao trong lồng đèn", meaning: "Inner wisdom illuminating the next immediate step", meaningVi: "Trí tuệ nội tâm soi sáng từng bước đi trước mắt" },
      { name: "Solitary Peak", nameVi: "Đỉnh núi cô độc", meaning: "Elevated perspective away from social noise", meaningVi: "Tầm nhìn bao quát, tĩnh tại, cách xa tiếng ồn xã hội" }
    ],
    psychologicalThemes: ["Constructive Solitude", "Inner Reflection", "Authentic Self-Knowledge"],
    psychologicalThemesVi: ["Khoảng lặng xây dựng", "Tự chiêm nghiệm sâu sắc", "Hiểu mình chân thật"],
    uprightMeaning: "An invitation to withdraw from external noise to find clarity and reconnect with your personal truth and wisdom.",
    uprightMeaningVi: "Lời mời gọi tạm rời xa những ồn ào bên ngoài để tìm lại sự tĩnh lặng và lắng nghe tiếng nói trí tuệ bên trong bạn.",
    reversedMeaning: "A reminder to check if solitude is turning into isolating avoidance; remember that seeking connection is also healthy.",
    reversedMeaningVi: "Lời nhắc kiểm tra xem sự tĩnh lặng có đang biến thành việc tự cô lập hay trốn tránh; hãy nhớ kết nối với người khác cũng rất quý giá.",
    reflectionPrompts: [
      "What answer do you already know within yourself when the noise stops?",
      "How can you create 15 minutes of uninterrupted solitude today?",
      "What light can your past experience shed on your present situation?"
    ],
    reflectionPromptsVi: [
      "Câu trả lời nào bạn vốn đã biết rõ khi mọi ồn ào lắng xuống?",
      "Làm thế nào để bạn tạo cho mình 15 phút tĩnh lặng hoàn toàn hôm nay?",
      "Kinh nghiệm trong quá khứ có thể soi sáng điều gì cho hoàn cảnh hiện tại của bạn?"
    ],
    positiveActions: [
      "Take a digital detox evening: disconnect from feeds and reflect or read.",
      "Write down the core insight that emerges in your quietest moments."
    ],
    positiveActionsVi: [
      "Thực hiện một buổi tối rời xa mạng xã hội để đọc sách hoặc suy ngẫm.",
      "Ghi lại nhận thức sâu sắc nhất hiện lên khi tâm trí bạn lắng dịu."
    ],
    contextualInsights: {
      en: {
        love: "Understand your own emotional needs first before seeking validation from another.",
        work: "Engage in deep focused work, independent research, or strategic reflection.",
        growth: "Soul-searching that leads to authentic self-alignment.",
        emotion: "Calm, reflective tranquility and peaceful solitude.",
        decision: "Step back from group pressure to make a decision rooted in your own truth.",
        general: "Your inner light is sufficient to show the next step on the path."
      },
      vi: {
        love: "Thấu hiểu nhu cầu cảm xúc của chính mình trước khi tìm kiếm sự bù đắp từ người khác.",
        work: "Dành thời gian nghiên cứu độc lập, suy nghĩ chiến lược và tập trung sâu.",
        growth: "Hành trình quay về bên trong để tìm thấy sự thật của chính mình.",
        emotion: "Sự bình yên, thanh tịnh và tĩnh lặng trong tâm hồn.",
        decision: "Tách mình khỏi ý kiến đám đông để đưa ra lựa chọn đúng với lòng mình.",
        general: "Ngọn đèn trí tuệ bên trong bạn đủ sáng để dẫn lối từng bước một."
      }
    },
    cautionContext: "Ensure your retreat is for seeking wisdom and restoration, not running away from life's responsibilities.",
    cautionContextVi: "Hãy đảm bảo việc bạn lui về là để nạp lại năng lượng và tìm kiếm sự sáng suốt, chứ không phải để trốn tránh thực tại."
  },
  {
    id: "major-10",
    number: 10,
    name: "Wheel of Fortune",
    nameVi: "Wheel of Fortune (Vòng Quay Số Phận)",
    arcana: "Major",
    suit: null,
    rank: 10,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
    keywords: ["Cycles", "Change", "Adaptability", "Perspective", "Impermanence"],
    keywordsVi: ["Chu kỳ cuộc sống", "Sự thay đổi", "Tính thích ứng", "Góc nhìn bao quát", "Vô thường"],
    symbolism: "A revolving wheel inscribed with mystical letters, flanked by creatures reading books in the four corners, representing life's shifting rhythms.",
    symbolismVi: "Bánh xe luân chuyển khắc những ký tự biểu tượng, bốn góc là các sinh vật cầm sách tượng trưng cho quy luật chuyển động của vạn vật.",
    symbols: [
      { name: "The Rotating Wheel", nameVi: "Bánh xe quay", meaning: "The natural ebb and flow of life and external circumstances", meaningVi: "Quy luật thăng trầm tự nhiên của hoàn cảnh và thời gian" },
      { name: "Stable Center", nameVi: "Tâm trục ổn định", meaning: "Finding inner calm amidst external movement", meaningVi: "Giữ tâm thế bình thản ngay giữa những biến động bên ngoài" }
    ],
    psychologicalThemes: ["Acceptance of Impermanence", "Agility and Resilience", "Non-Attachment"],
    psychologicalThemesVi: ["Chấp nhận quy luật vô thường", "Tính linh hoạt và kiên cường", "Tâm không dính mắc"],
    uprightMeaning: "A reminder that life moves in natural cycles. Focus on what is within your center of control while gracefully adapting to external shifts.",
    uprightMeaningVi: "Lời nhắc rằng cuộc sống luôn vận hành theo chu kỳ. Hãy tập trung vào những gì bạn làm chủ được và linh hoạt thích ứng với đổi thay.",
    reversedMeaning: "A prompt to notice if you are resisting unavoidable change; let go of trying to control the uncontrollable and adjust your sails.",
    reversedMeaningVi: "Lời nhắc xem xét liệu bạn có đang gồng mình chống lại sự thay đổi tự nhiên; hãy buông bỏ việc kiểm soát những thứ ngoài tầm tay và nương theo dòng chảy.",
    reflectionPrompts: [
      "What cycle in your life is currently reaching a turning point?",
      "How can you stay centered at the hub of the wheel when the rim is spinning?",
      "What opportunity is hidden within this current phase of change?"
    ],
    reflectionPromptsVi: [
      "Chu kỳ nào trong cuộc sống của bạn đang bước vào giai đoạn chuyển biến?",
      "Làm sao để bạn giữ được sự bình an ở tâm điểm khi mọi thứ xung quanh đang xoay chuyển?",
      "Cơ hội hay bài học quý giá nào đang ẩn chứa bên trong sự thay đổi này?"
    ],
    positiveActions: [
      "Write down 3 things you cannot control and consciously choose to release worry over them.",
      "Identify one small adaptive action you can take to make the most of today."
    ],
    positiveActionsVi: [
      "Viết ra 3 điều ngoài tầm kiểm soát và chủ động buông bỏ nỗi bận tâm về chúng.",
      "Xác định một việc nhỏ bạn có thể làm ngay để thích ứng tốt nhất với tình thế hiện tại."
    ],
    contextualInsights: {
      en: {
        love: "Embrace the changing phases in your relationship; growth requires movement.",
        work: "Be flexible with changing market conditions or project scopes.",
        growth: "Develop equanimity toward life's highs and lows.",
        emotion: "Acceptance of life's fluid nature.",
        decision: "Recognize the timing of things; act when the window of opportunity opens.",
        general: "This too shall pass; maintain your center of calm through every season."
      },
      vi: {
        love: "Đón nhận những giai đoạn thay đổi trong mối quan hệ; sự phát triển luôn cần sự chuyển động.",
        work: "Linh hoạt trước những biến chuyển của hoàn cảnh và công việc.",
        growth: "Rèn luyện tâm thế an nhiên trước những thăng trầm của đời sống.",
        emotion: "Sự bình thản đón nhận dòng chảy tự nhiên.",
        decision: "Nhận biết thời điểm thích hợp để đưa ra hành động kịp thời.",
        general: "Mọi trạng thái rồi cũng sẽ qua đi; hãy giữ cho mình một tâm thế vững vàng qua mọi mùa."
      }
    },
    cautionContext: "Do not become passive or fatalistic; you cannot stop the wheel, but you can always steer your own choices.",
    cautionContextVi: "Đừng phó mặc cho số phận hay trở nên thụ động; bạn không thể ngăn thời gian trôi nhưng luôn có quyền chọn cách mình ứng xử."
  },
  {
    id: "major-11",
    number: 11,
    name: "Justice",
    nameVi: "Justice (Công Lý & Cân Bằng)",
    arcana: "Major",
    suit: null,
    rank: 11,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
    keywords: ["Fairness", "Truth", "Accountability", "Clarity", "Cause and Effect"],
    keywordsVi: ["Sự công bằng", "Chân lý", "Trách nhiệm cá nhân", "Sự sáng suốt", "Nhân quả & Cân bằng"],
    symbolism: "A seated figure holding upright scales in one hand and a double-edged sword in the other, framed by purple curtains.",
    symbolismVi: "Nhân vật ngồi nghiêm trang, một tay nâng cán cân thăng bằng, tay kia giơ cao thanh kiếm hai lưỡi giữa hai bức rèm tím.",
    symbols: [
      { name: "The Scales", nameVi: "Cán cân", meaning: "Weighing perspectives, balance, and objective truth", meaningVi: "Cân nhắc đa chiều, sự công tâm và chân lý khách quan" },
      { name: "Double-Edged Sword", nameVi: "Thanh kiếm hai lưỡi", meaning: "Clear discernment cutting through illusion and rationalization", meaningVi: "Sự sắc bén phân định rõ ràng giữa sự thật và ngụy biện" }
    ],
    psychologicalThemes: ["Self-Accountability", "Cognitive Fairness", "Ethical Integrity"],
    psychologicalThemesVi: ["Tinh thần tự chịu trách nhiệm", "Tư duy công tâm", "Sự chính trực đạo đức"],
    uprightMeaning: "An invitation to look at reality with objective clarity, take responsibility for your choices, and act with integrity.",
    uprightMeaningVi: "Lời mời gọi nhìn nhận sự việc một cách khách quan, thẳng thắn nhận trách nhiệm và hành xử dựa trên sự công bằng, chính trực.",
    reversedMeaning: "A reminder to examine where bias, defensiveness, or avoidance of accountability might be clouding your judgment.",
    reversedMeaningVi: "Lời nhắc kiểm tra xem sự thiên vị, phản ứng tự vệ hay việc né tránh trách nhiệm có đang làm mờ đi sự sáng suốt của bạn.",
    reflectionPrompts: [
      "What is the objective, unbiased truth of this situation when you strip away emotional stories?",
      "Where do your past decisions connect with your present results?",
      "How can you be both fair and compassionate with yourself and others?"
    ],
    reflectionPromptsVi: [
      "Đâu là sự thật khách quan của câu chuyện này khi gạt bỏ những định kiến cảm xúc?",
      "Những lựa chọn trong quá khứ đang dẫn đến kết quả hiện tại như thế nào?",
      "Làm sao để bạn vừa công bằng, thẳng thắn lại vừa giữ được lòng trắc ẩn?"
    ],
    positiveActions: [
      "Acknowledge one mistake or oversight openly and take a constructive step to rectify it.",
      "Evaluate a difficult dilemma using a balanced pros and cons list rooted in facts."
    ],
    positiveActionsVi: [
      "Thẳng thắn thừa nhận một thiếu sót nhỏ và chủ động có hành động khắc phục cụ thể.",
      "Đánh giá một khúc mắc dựa trên các sự thật khách quan thay vì giả định."
    ],
    contextualInsights: {
      en: {
        love: "Practice transparent communication and mutual equity in emotional labor.",
        work: "Ensure all agreements, contracts, and promises are fulfilled with thoroughness.",
        growth: "Own your story and the consequences of your choices without making excuses.",
        emotion: "Clarity, balance, and moral equilibrium.",
        decision: "Make the decision that aligns with truth and fairness, regardless of short-term comfort.",
        general: "Honesty with oneself is the foundation of all authentic peace."
      },
      vi: {
        love: "Thực hành giao tiếp minh bạch và bình đẳng, tôn trọng lẫn nhau trong mối quan hệ.",
        work: "Đảm bảo các thỏa thuận và cam kết công việc được thực hiện chuẩn mực, rõ ràng.",
        growth: "Tự làm chủ cuộc đời và chịu trách nhiệm cho các lựa chọn của chính mình.",
        emotion: "Sự thanh thản, minh triết và thăng bằng nội tâm.",
        decision: "Đưa ra quyết định dựa trên sự thật và công bằng, không bị lung lay bởi cảm xúc nhất thời.",
        general: "Sự trung thực với chính mình là gốc rễ của mọi sự an yên lâu dài."
      }
    },
    cautionContext: "Do not let pursuit of fairness become harsh, cold self-punishment or moral superiority.",
    cautionContextVi: "Đừng để sự công bằng biến thành sự phán xét khắt khe, lạnh lùng đối với bản thân hay người khác."
  },
  {
    id: "major-12",
    number: 12,
    name: "The Hanged Man",
    nameVi: "The Hanged Man (Người Treo Ngược)",
    arcana: "Major",
    suit: null,
    rank: 12,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
    keywords: ["Perspective Shift", "Surrender", "Patience", "Letting Go of Control", "Pause"],
    keywordsVi: ["Đổi góc nhìn", "Sự buông lỏng", "Tạm dừng có chủ đích", "Thả lỏng sự kiểm soát", "Sáng tỏ qua kiên nhẫn"],
    symbolism: "A serene figure hanging upside down from a living wooden cross by one ankle, with a golden halo around his head.",
    symbolismVi: "Nhân vật treo ngược từ thân cây sống động, gương mặt toát lên vẻ an nhiên với vầng hào quang tỏa sáng quanh đầu.",
    symbols: [
      { name: "Inverted Position", nameVi: "Tư thế đảo ngược", meaning: "Viewing the world from a completely novel angle", meaningVi: "Nhìn nhận thế giới từ một lăng kính hoàn toàn mới mẻ" },
      { name: "Golden Halo", nameVi: "Vầng hào quang", meaning: "Enlightenment and breakthrough gained through surrender", meaningVi: "Sự khai sáng và thấu suốt đạt được khi biết buông bỏ áp lực" }
    ],
    psychologicalThemes: ["Reframing Paradoxes", "Constructive Waiting", "Relinquishing Ego-Control"],
    psychologicalThemesVi: ["Tái định hình góc nhìn", "Sự kiên nhẫn tích cực", "Buông lỏng sự cố chấp"],
    uprightMeaning: "A call to pause the struggle, surrender the urge to force outcomes, and look at your circumstance from a fresh, inverted angle.",
    uprightMeaningVi: "Lời mời gọi tạm dừng sự vùng vẫy, buông bớt nhu cầu thúc ép kết quả và thử nhìn nhận hoàn cảnh từ một góc độ hoàn toàn khác.",
    reversedMeaning: "A reminder to check if waiting has turned into passive stagnation or resistance to necessary sacrifice.",
    reversedMeaningVi: "Lời nhắc kiểm tra xem sự chờ đợi có đang trở thành sự trì hoãn thụ động hay bạn đang ngần ngại buông bỏ điều không còn cần thiết.",
    reflectionPrompts: [
      "If you stopped trying to force a resolution today, what new perspective might emerge?",
      "What belief would you discover if you turned your assumption upside down?",
      "What are you willing to let go of to gain greater peace of mind?"
    ],
    reflectionPromptsVi: [
      "Nếu hôm nay bạn tạm dừng cố gắng thúc ép mọi chuyện, góc nhìn mới nào có thể mở ra?",
      "Điều gì sẽ xảy ra nếu bạn thử lật ngược lại những giả định bấy lâu nay của mình?",
      "Bạn sẵn sàng buông bỏ điều gì để đổi lấy sự thanh thản trong tâm hồn?"
    ],
    positiveActions: [
      "Consciously take a step back from a stressful problem for 24 hours without intervening.",
      "Ask someone with an opposing viewpoint to explain their perspective without debating them."
    ],
    positiveActionsVi: [
      "Chủ động lùi lại một bước khỏi vấn đề căng thẳng trong 24 giờ mà không can thiệp.",
      "Lắng nghe một góc nhìn khác biệt với tâm thế tò mò muốn hiểu thay vì tranh luận."
    ],
    contextualInsights: {
      en: {
        love: "Give the relationship space to breathe; let go of needing to be right in arguments.",
        work: "Step back from a deadlock; innovation often appears when striving stops.",
        growth: "Learn the power of letting go of rigid expectations.",
        emotion: "Serene release of accumulated tension.",
        decision: "Wait until the dust settles and fresh clarity dawns before executing major moves.",
        general: "Sometimes the most productive action is intentional stillness."
      },
      vi: {
        love: "Cho mối quan hệ khoảng không gian để thở; buông bỏ nhu cầu phải thắng trong tranh luận.",
        work: "Tạm lùi lại khi gặp bế tắc; ý tưởng đột phá thường nảy sinh khi tâm trí được thả lỏng.",
        growth: "Học bài học sâu sắc về việc buông bỏ những kỳ vọng cứng nhắc.",
        emotion: "Sự nhẹ nhõm khi giải tỏa được những gồng gánh bấy lâu.",
        decision: "Hãy đợi cho đến khi góc nhìn thực sự sáng tỏ rồi mới tiến hành quyết định lớn.",
        general: "Đôi khi hành động hiệu quả nhất chính là sự tĩnh lặng có ý thức."
      }
    },
    cautionContext: "Do not slip into martyrdom or feel that suffering endlessly without purpose is a virtue.",
    cautionContextVi: "Đừng biến sự nhẫn nại thành tâm lý nạn nhân hay nghĩ rằng chịu đựng vô ích là một đức tính."
  },
  {
    id: "major-13",
    number: 13,
    name: "Death",
    nameVi: "Death (Chuyển Hóa & Khép Lại)",
    arcana: "Major",
    suit: null,
    rank: 13,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
    keywords: ["Transformation", "Endings", "Letting Go", "Transition", "Renewal"],
    keywordsVi: ["Chuyển hóa", "Khép lại một chương", "Buông bỏ cái cũ", "Giai đoạn chuyển tiếp", "Tái sinh"],
    symbolism: "An armored skeletal rider bearing a black banner with a white rose, riding past kings and children as the sun rises between distant towers.",
    symbolismVi: "Hiệp sĩ giáp sắt cầm lá cờ hoa hồng trắng năm cánh cưỡi ngựa đi qua, đằng xa nơi chân trời mặt trời đang rạng ngời mọc lên giữa hai tòa tháp.",
    symbols: [
      { name: "Rising Sun on Horizon", nameVi: "Mặt trời mọc", meaning: "New life and dawn following the natural completion of a cycle", meaningVi: "Bình minh mới luôn xuất hiện sau khi một chu kỳ tự nhiên khép lại" },
      { name: "White Rose Banner", nameVi: "Lá cờ hoa hồng trắng", meaning: "Purification and the fertile renewal of life", meaningVi: "Sự thanh lọc và hạt mầm tươi mới của cuộc sống" }
    ],
    psychologicalThemes: ["Processing Grief & Closure", "Releasing Outgrown Identities", "Psychological Rebirth"],
    psychologicalThemesVi: ["Khép lại quá khứ", "Buông bỏ danh tính cũ không còn phù hợp", "Tái sinh tâm lý"],
    uprightMeaning: "A symbolic marker of profound transformation. A chapter or habit is naturally coming to a close to create fertile ground for the new.",
    uprightMeaningVi: "Biểu tượng của sự chuyển hóa sâu sắc. Một giai đoạn hay thói quen cũ đang tự nhiên đi đến hồi kết để dọn chỗ cho những điều mới mẻ sinh sôi.",
    reversedMeaning: "A compassionate prompt to notice if you are clinging to something whose time has passed; gently open your hands to the future.",
    reversedMeaningVi: "Lời nhắc dịu dàng xem xét liệu bạn có đang níu kéo một điều gì đó đã hoàn thành sứ mệnh; hãy nhẹ nhàng mở lòng đón nhận tương lai.",
    reflectionPrompts: [
      "What chapter, belief, or pattern in your life is ready to be honorably concluded?",
      "What are you holding onto out of comfort that no longer helps you grow?",
      "What new space opens up when you allow the past to be past?"
    ],
    reflectionPromptsVi: [
      "Chương sách, niềm tin hay khuôn mẫu nào đã đến lúc được khép lại trong sự trân trọng?",
      "Điều gì bạn đang cố bám giữ chỉ vì sự quen thuộc dù nó không còn giúp bạn phát triển?",
      "Khoảng không gian mới nào sẽ mở ra khi bạn cho phép quá khứ ngủ yên?"
    ],
    positiveActions: [
      "Declutter one drawer or discard an old object that holds stagnant emotional weight.",
      "Write a short gratitude letter to an old phase of life and mentally bid it farewell."
    ],
    positiveActionsVi: [
      "Dọn dẹp một ngăn kéo hoặc bỏ đi một món đồ cũ mang năng lượng nặng nề.",
      "Viết vài dòng cảm ơn chặng đường đã qua và mỉm cười nói lời tạm biệt với nó."
    ],
    contextualInsights: {
      en: {
        love: "Allow outgrown dynamics or past resentments to end so genuine intimacy can restart.",
        work: "Wrap up an obsolete approach or project to pivot toward invigorating new work.",
        growth: "Shed the old skin of who you used to be.",
        emotion: "Cathartic release and quiet readiness for renewal.",
        decision: "Accept that a certain door has closed so you can walk through the opening one.",
        general: "Endings in nature are never failures; they are the compost for spring's blooming."
      },
      vi: {
        love: "Cho phép những ấm ức cũ khép lại để tình cảm có cơ hội được làm mới và hồi sinh.",
        work: "Mạnh dạn kết thúc một phương thức làm việc lỗi thời để chuyển hướng sang cơ hội mới.",
        growth: "Cởi bỏ lớp vỏ cũ kỹ của con người trong quá khứ.",
        emotion: "Cảm giác trút bỏ gánh nặng và sẵn sàng cho sự tái sinh.",
        decision: "Chấp nhận rằng một cánh cửa đã khép lại để bạn vững bước sang cánh cửa mới.",
        general: "Sự kết thúc trong tự nhiên không phải mất mát; đó là đất màu mỡ cho mầm xanh mùa xuân."
      }
    },
    cautionContext: "Do not fear this card; it represents psychological renewal, transition, and shedding the unnecessary, never literal harm.",
    cautionContextVi: "Tuyệt đối không lo sợ lá bài này; nó đại diện cho sự chuyển hóa tâm lý, tái sinh và buông bỏ điều cũ, không bao giờ là điềm gở."
  },
  {
    id: "major-14",
    number: 14,
    name: "Temperance",
    nameVi: "Temperance (Hòa Hợp & Điều Độ)",
    arcana: "Major",
    suit: null,
    rank: 14,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
    keywords: ["Balance", "Moderation", "Integration", "Patience", "Alchemy"],
    keywordsVi: ["Cân bằng", "Điều độ", "Dung hòa", "Kiên nhẫn", "Chuyển hóa êm dịu"],
    symbolism: "A winged angel with one foot in water and one on land, pouring liquid continuously between two cups without spilling a single drop.",
    symbolismVi: "Thiên thần có cánh một chân chạm nước một chân trên đất, nhẹ nhàng rót dòng nước luân chuyển giữa hai chiếc cốc mà không làm rơi rớt một giọt.",
    symbols: [
      { name: "Pouring Water Between Cups", nameVi: "Rót nước giữa hai cốc", meaning: "Harmonious blending of opposites into a golden middle path", meaningVi: "Hòa quyện khéo léo những yếu tố đối lập thành con đường trung dung" },
      { name: "Foot on Land and Water", nameVi: "Chân trên đất và nước", meaning: "Grounded in physical reality while attuned to emotional depths", meaningVi: "Vừa vững chãi trong thực tế vừa thấu hiểu cảm xúc sâu sắc" }
    ],
    psychologicalThemes: ["Emotional Equilibrium", "Finding Middle Ground", "Sustainable Pacing"],
    psychologicalThemesVi: ["Cân bằng cảm xúc", "Tìm tiếng nói chung", "Duy trì nhịp độ bền vững"],
    uprightMeaning: "An invitation to bring moderation, emotional blending, and patience to your life. Find the calm middle path between extremes.",
    uprightMeaningVi: "Lời mời gọi mang lại sự chừng mực, hòa hợp và kiên nhẫn. Hãy tìm kiếm con đường trung dung an hòa giữa những thái cực.",
    reversedMeaning: "A signal to notice where excess, impatience, or internal friction is draining you; restore balance through gentle adjustments.",
    reversedMeaningVi: "Lời nhắc kiểm tra xem sự thái quá, nóng vội hay căng thẳng nội tâm có đang làm bạn hao tổn; hãy tái lập cân bằng bằng những điều chỉnh nhỏ.",
    reflectionPrompts: [
      "Where in your life have you been swinging between extremes of all-or-nothing?",
      "How can you combine two seemingly contradictory aspects of your life in harmony?",
      "What does a patient, sustainable pace feel like today?"
    ],
    reflectionPromptsVi: [
      "Khía cạnh nào trong đời bạn đang bị rơi vào bẫy cực đoan (hoặc tất cả, hoặc không có gì)?",
      "Làm sao để bạn kết hợp hai yếu tố tưởng chừng trái ngược trong cuộc sống một cách êm đẹp?",
      "Nhịp điệu sống kiên nhẫn và bền vững có ý nghĩa như thế nào với bạn hôm nay?"
    ],
    positiveActions: [
      "Practice moderation in one daily habit (sleep, screen time, work hours).",
      "Seek a win-win compromise in a current discussion rather than insisting on total victory."
    ],
    positiveActionsVi: [
      "Thực hành sự điều độ trong 1 thói quen (giờ giấc ngủ, thời gian dùng điện thoại, làm việc).",
      "Tìm kiếm một giải pháp dung hòa trong một cuộc trao đổi thay vì cố giành phần thắng."
    ],
    contextualInsights: {
      en: {
        love: "Blend different perspectives with patience, mutual compromise, and emotional gentleness.",
        work: "Coordinate cross-functional ideas smoothly; maintain steady workflow without burnout.",
        growth: "Cultivate inner equanimity and mental peace.",
        emotion: "Tranquil balance and inner harmony.",
        decision: "Choose the moderate, measured approach rather than dramatic leaps.",
        general: "Great harmony is created through daily mindful adjustments."
      },
      vi: {
        love: "Dung hòa những khác biệt bằng sự kiên nhẫn, thấu cảm và sự dịu dàng trong giao tiếp.",
        work: "Phối hợp nhịp nhàng các đầu việc; duy trì tiến độ ổn định mà không bị kiệt sức.",
        growth: "Nuôi dưỡng sự an tịnh và thăng bằng trong nội tâm.",
        emotion: "Cảm giác êm đềm, thanh thoát và hòa hợp.",
        decision: "Chọn giải pháp dung hòa, có tính toán cẩn trọng thay vì quyết định cảm tính.",
        general: "Sự hòa hợp vĩ đại được dệt nên từ những điều chỉnh nhỏ đầy chánh niệm mỗi ngày."
      }
    },
    cautionContext: "Moderation does not mean dull apathy; it is the active art of maintaining your equilibrium.",
    cautionContextVi: "Sự điều độ không có nghĩa là buông xuôi tẻ nhạt; đó là nghệ thuật làm chủ và giữ thăng bằng nội tâm."
  },
  {
    id: "major-15",
    number: 15,
    name: "The Devil",
    nameVi: "The Devil (Ràng Buộc & Tự Giải Phóng)",
    arcana: "Major",
    suit: null,
    rank: 15,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
    keywords: ["Attachment", "Shadow Self", "Illusion of Trap", "Self-Awareness", "Liberation"],
    keywordsVi: ["Sự dính mắc", "Bóng tối nội tâm", "Ảo tưởng bị giam cầm", "Tự nhận thức", "Giải phóng bản thân"],
    symbolism: "A horned figure on an altar, with a man and woman chained loosely by their necks, their chains large enough to easily slip off.",
    symbolismVi: "Hình tượng nhân vật trên bệ đá, hai con người bị buộc dây xích lỏng lẻo quanh cổ, những chiếc vòng đủ rộng để tự tháo ra bất cứ lúc nào.",
    symbols: [
      { name: "Loose Chains", nameVi: "Dây xích lỏng", meaning: "The illusion of powerlessness; the power to walk away is always yours", meaningVi: "Ảo tưởng về sự bất lực; quyền tự tháo xích và bước đi luôn thuộc về bạn" },
      { name: "Inverted Pentagram", nameVi: "Ngôi sao ngược", meaning: "Fixation on material anxiety over internal freedom", meaningVi: "Sự mắc kẹt trong nỗi sợ hãi và ám ảnh vật chất" }
    ],
    psychologicalThemes: ["Recognizing Limiting Patterns", "Befriending the Shadow", "Reclaiming Personal Power"],
    psychologicalThemesVi: ["Nhận diện thói quen tự giới hạn", "Soi rọi bóng tối nội tâm", "Lấy lại quyền làm chủ bản thân"],
    uprightMeaning: "An invitation to examine unconscious habits, compulsive attachments, or self-imposed traps. You have more freedom to choose than you realize.",
    uprightMeaningVi: "Lời mời gọi soi rọi những thói quen vô thức, sự bám chấp hay cái bẫy do chính mình tự tạo ra. Bạn tự do hơn bạn tưởng rất nhiều.",
    reversedMeaning: "A powerful sign of breaking free from limiting patterns, acknowledging toxic habits, and stepping back into self-sovereignty.",
    reversedMeaningVi: "Dấu hiệu tích cực của việc cởi bỏ ràng buộc cũ, thức tỉnh trước thói quen có hại và lấy lại quyền tự chủ cho đời mình.",
    reflectionPrompts: [
      "What habit, fear, or attachment is making you feel trapped when in reality you can choose otherwise?",
      "What uncomfortable truth about your desires or avoidance are you ready to look at honestly?",
      "How would you live today if you slipped off the invisible chain of others' approval?"
    ],
    reflectionPromptsVi: [
      "Thói quen, nỗi sợ hay sự bám chấp nào đang làm bạn thấy bất lực dù bạn hoàn toàn có quyền lựa chọn khác?",
      "Sự thật nào về mong muốn hay sự trốn tránh của bản thân bạn đã sẵn sàng đối diện thẳng thắn?",
      "Bạn sẽ sống như thế nào nếu tháo bỏ chiếc vòng xích vô hình mang tên 'sự phán xét của người khác'?"
    ],
    positiveActions: [
      "Identify one compulsive habit (scrolling, overspending, ruminating) and take a 3-day conscious break from it.",
      "Remind yourself aloud: 'I have the power to say no and choose my own path.'"
    ],
    positiveActionsVi: [
      "Nhận diện 1 thói quen vô thức (lướt mạng vô bổ, suy nghĩ luẩn quẩn) và tạm ngưng nó trong 3 ngày.",
      "Tự nhắc nhở bản thân: 'Tôi có quyền từ chối và lựa chọn con đường mang lại tự do cho mình.'"
    ],
    contextualInsights: {
      en: {
        love: "Examine co-dependency or obsessive patterns; foster healthy autonomy within the relationship.",
        work: "Notice if workaholic burnout or fear of scarcity is driving your decisions.",
        growth: "Integrate your shadow side with self-awareness rather than shame.",
        emotion: "Unmasking hidden anxieties to dissolve their power over you.",
        decision: "Do not choose out of fear, addiction, or peer pressure; choose what frees your spirit.",
        general: "Awareness of the chain is the first step of genuine freedom."
      },
      vi: {
        love: "Quan sát sự phụ thuộc cảm xúc hoặc thói quen kiểm soát; nuôi dưỡng sự tự do lành mạnh trong tình yêu.",
        work: "Nhận ra liệu nỗi sợ thiếu thốn hay thói quen làm việc quá sức có đang chi phối bạn.",
        growth: "Thấu hiểu và chuyển hóa những góc khuất nội tâm bằng sự bao dung thay vì chối bỏ.",
        emotion: "Soi rọi những lo âu ẩn giấu để chúng không còn quyền lực chi phối bạn.",
        decision: "Đừng chọn vì sợ hãi hay áp lực bên ngoài; hãy chọn điều mang lại sự thanh thản, tự do.",
        general: "Nhận thức được sợi xích trói buộc chính là bước đầu tiên để bước ra ánh sáng tự do."
      }
    },
    cautionContext: "This card points to internal psychological habits and attachments to be gently examined, never evil forces or curses.",
    cautionContextVi: "Lá bài này phản chiếu những thói quen tâm lý và sự bám chấp cần được nhìn nhận thấu đáo, tuyệt đối không mang ý nghĩa ma quỷ hay vận xui."
  },
  {
    id: "major-16",
    number: 16,
    name: "The Tower",
    nameVi: "The Tower (Sự Thức Tỉnh & Đập Tan Ảo Tưởng)",
    arcana: "Major",
    suit: null,
    rank: 16,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
    keywords: ["Sudden Insight", "Breakthrough", "Rebuilding", "Releasing Illusions", "Truth"],
    keywordsVi: ["Thức tỉnh bất ngờ", "Đột phá nhận thức", "Tái thiết nền móng", "Gỡ bỏ ảo tưởng", "Sự thật giải phóng"],
    symbolism: "A lightning bolt striking a stone tower on a rocky summit, blowing off its golden crown while figures leap into the air, revealing real ground beneath.",
    symbolismVi: "Tia sét xé tan đỉnh tòa tháp xây trên vách đá, đánh rơi chiếc vương miện giả tạo, mở đường cho ánh sáng chân lý soi rọi nền móng thực sự.",
    symbols: [
      { name: "Lightning Bolt", nameVi: "Tia sét", meaning: "A sudden flash of clear truth breaking through artificial illusions", meaningVi: "Tia chớp của sự thật bất ngờ làm tan biến những giả định sai lầm" },
      { name: "Falling Crown", nameVi: "Vương miện rơi", meaning: "Ego and outdated assumptions falling away to reveal reality", meaningVi: "Bản ngã và các cấu trúc lỗi thời sụp đổ để lộ ra thực tế chân thật" }
    ],
    psychologicalThemes: ["Cognitive Dissonance Resolution", "Resilience through Crisis", "Rebuilding on Truth"],
    psychologicalThemesVi: ["Vượt qua cú sốc nhận thức", "Bản lĩnh sau biến cố", "Xây dựng lại trên nền tảng sự thật"],
    uprightMeaning: "A reminder that when a fragile illusion or outdated assumption breaks, it clears the way for authentic growth built on genuine foundations.",
    uprightMeaningVi: "Lời nhắc rằng khi một niềm tin mong manh hay cấu trúc cũ không còn phù hợp sụp đổ, đó là cơ hội quý giá để bạn xây dựng lại trên nền móng chân thật.",
    reversedMeaning: "A sign of averting unnecessary disaster by voluntarily updating your perspectives, or recovering smoothly after a sudden realization.",
    reversedMeaningVi: "Dấu hiệu của việc chủ động thay đổi trước khi khủng hoảng xảy ra, hoặc đang hồi phục vững vàng sau một bước ngoặt nhận thức.",
    reflectionPrompts: [
      "What outdated assumption in your life has recently been shaken or dismantled?",
      "How does this sudden realization free you to build something much more authentic?",
      "Where can you find your unshakable core strength when external plans shift?"
    ],
    reflectionPromptsVi: [
      "Giả định hay niềm tin cũ kỹ nào trong cuộc sống của bạn vừa bị lung lay?",
      "Sự thật mới mẻ này đang giải phóng bạn để bạn xây dựng lại điều gì chân thật hơn?",
      "Đâu là điểm tựa sức mạnh nội tâm không gì lay chuyển được của bạn khi kế hoạch thay đổi?"
    ],
    positiveActions: [
      "Acknowledge one hard truth you've been avoiding and take a deep, grounding breath.",
      "List 3 rock-solid personal strengths that remain intact no matter what happens around you."
    ],
    positiveActionsVi: [
      "Thẳng thắn nhìn nhận một sự thật bạn từng né tránh và thở phào nhẹ nhõm.",
      "Ghi lại 3 phẩm chất vững vàng nhất của bạn mà không biến cố nào có thể lấy đi."
    ],
    contextualInsights: {
      en: {
        love: "Clear out accumulated pretenses; rebuild communication on raw, beautiful honesty.",
        work: "Pivot from a flawed system; embrace the chance to innovate on stronger foundations.",
        growth: "Breakthrough that shatters the comfort zone and accelerates maturity.",
        emotion: "Initial shock settling into clarifying relief.",
        decision: "Do not cling to a cracking structure; choose the courageous path of truth.",
        general: "What falls was never truly real; what remains is your authentic essence."
      },
      vi: {
        love: "Gỡ bỏ những lớp mặt nạ gượng ép; xây dựng lại mối quan hệ trên sự chân thật trọn vẹn.",
        work: "Rời bỏ một mô hình không còn hiệu quả để tái cấu trúc trên nền tảng vững chắc hơn.",
        growth: "Bước đột phá phá vỡ vùng an toàn, thúc đẩy sự trưởng thành vượt bậc.",
        emotion: "Cảm giác bừng tỉnh sau những bối rối ban đầu, mang lại sự nhẹ nhõm.",
        decision: "Đừng cố chắp vá một cấu trúc đã rạn nứt; hãy dũng cảm chọn con đường chân lý.",
        general: "Những gì sụp đổ vốn không thuộc về bạn; những gì còn lại chính là bản lĩnh đích thực của bạn."
      }
    },
    cautionContext: "The Tower represents psychological realizations and structural clarity, never physical danger, disasters, or bad luck.",
    cautionContextVi: "The Tower đại diện cho sự thức tỉnh nhận thức và tái thiết đời sống, tuyệt đối không phải tai họa hay điềm xui xẻo."
  },
  {
    id: "major-17",
    number: 17,
    name: "The Star",
    nameVi: "The Star (Ngôi Sao Hy Vọng & Chữa Lành)",
    arcana: "Major",
    suit: null,
    rank: 17,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
    keywords: ["Hope", "Healing", "Inspiration", "Serenity", "Faith in Self"],
    keywordsVi: ["Hy vọng", "Chữa lành", "Cảm hứng", "Sự thanh thản", "Niềm tin nội tại"],
    symbolism: "A naked maiden pouring water from two jugs onto land and pool beneath a brilliant eight-pointed central star and seven smaller stars.",
    symbolismVi: "Cô gái trong trẻo nhẹ nhàng nghiêng hai bình nước đổ xuống mặt đất và lòng hồ dưới ánh sáng rực rỡ của ngôi sao 8 cánh giữa trời đêm.",
    symbols: [
      { name: "Large Central Star", nameVi: "Ngôi sao trung tâm", meaning: "Guidance from inner truth and renewed hope for the future", meaningVi: "Ánh sáng dẫn lối từ nội tâm và niềm hy vọng trong sáng vào ngày mai" },
      { name: "Water on Earth and Pool", nameVi: "Nước đổ xuống đất và hồ", meaning: "Generous nourishment of subconscious feelings and practical life", meaningVi: "Sự tưới mát cho cảm xúc và nuôi dưỡng thực tại đời sống" }
    ],
    psychologicalThemes: ["Post-Traumatic Growth", "Emotional Rejuvenation", "Self-Acceptance"],
    psychologicalThemesVi: ["Sự hồi phục sau biến động", "Tái tạo năng lượng cảm xúc", "Chấp nhận bản thân thuần khiết"],
    uprightMeaning: "A peaceful reminder that healing, calm inspiration, and gentle hope are available to you. Trust in your natural resilience.",
    uprightMeaningVi: "Lời nhắc bình an rằng sự chữa lành, cảm hứng và hy vọng dịu dàng đang ở bên bạn. Hãy tin tưởng vào sức mạnh hồi phục tự nhiên của mình.",
    reversedMeaning: "A reminder to rekindle quiet faith if you are feeling discouraged; allow yourself to rest without losing sight of your light.",
    reversedMeaningVi: "Lời nhắc thắp lại niềm tin dịu dàng nếu bạn đang thấy nản lòng; hãy cho phép mình được nghỉ ngơi mà không quên ánh sáng bên trong.",
    reflectionPrompts: [
      "What brings you a deep sense of peaceful hope and emotional restoration?",
      "How can you let your genuine, unmasked self shine without fear of judgment?",
      "What small dream or vision is gently calling for your faith?"
    ],
    reflectionPromptsVi: [
      "Điều gì mang lại cho bạn cảm giác bình yên, hy vọng và nuôi dưỡng tâm hồn nhất?",
      "Làm sao để bạn sống thật với con người chân thật của mình mà không sợ phán xét?",
      "Ước mơ hay dự định nhỏ nào đang mời gọi niềm tin của bạn?"
    ],
    positiveActions: [
      "Spend 10 quiet minutes stargazing, listening to ambient soothing music, or meditating.",
      "Write down 3 things you are genuinely looking forward to in the coming weeks."
    ],
    positiveActionsVi: [
      "Dành 10 phút ngắm nhìn bầu trời đêm, nghe bản nhạc êm dịu hoặc tĩnh tâm.",
      "Ghi lại 3 điều ấm áp bạn đang háo hức chờ đón trong thời gian tới."
    ],
    contextualInsights: {
      en: {
        love: "Nurture mutual trust, tender vulnerability, and serene mutual appreciation.",
        work: "Reconnect with your deeper sense of calling and inspirational purpose.",
        growth: "Embrace steady emotional healing and holistic renewal.",
        emotion: "Gentle relief, expansive peace, and pure clarity.",
        decision: "Choose the direction that inspires your highest self and long-term values.",
        general: "After the storm, the night sky is clearer than ever."
      },
      vi: {
        love: "Nuôi dưỡng sự tin tưởng, mở lòng dịu dàng và trân trọng nhau sâu sắc.",
        work: "Tìm lại cảm hứng và ý nghĩa cao đẹp trong công việc bạn làm.",
        growth: "Đón nhận hành trình chữa lành nhẹ nhàng và tái tạo tâm hồn.",
        emotion: "Sự thanh thản, nhẹ nhõm và sáng tỏ tuyệt đối.",
        decision: "Hãy chọn hướng đi thắp sáng niềm tin và mang lại giá trị bền lâu.",
        general: "Sau cơn mưa, bầu trời đêm luôn lấp lánh những vì sao sáng nhất."
      }
    },
    cautionContext: "Do not let idealized wishing replace practical everyday steps; ground your inspiration in small actions.",
    cautionContextVi: "Đừng để niềm hy vọng chỉ dừng lại ở sự mơ mộng; hãy biến cảm hứng thành những bước hành động nhỏ mỗi ngày."
  },
  {
    id: "major-18",
    number: 18,
    name: "The Moon",
    nameVi: "The Moon (Tiềm Thức & Vượt Qua Ảo Ảnh)",
    arcana: "Major",
    suit: null,
    rank: 18,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
    keywords: ["Subconscious", "Dreams", "Illusion", "Facing Uncertainty", "Intuitive Depth"],
    keywordsVi: ["Tiềm thức", "Giấc mơ", "Ảo ảnh & Lo âu", "Đối diện sự mơ hồ", "Trực giác sâu lắng"],
    symbolism: "A full moon with a face shedding golden dewdrops between two distant towers, with a dog and wolf howling, and a crayfish emerging from water onto a path.",
    symbolismVi: "Mặt trăng tròn tỏa sương vàng giữa hai tòa tháp, chú chó và chó sói tru dưới trăng, một chú tôm từ đáy nước bò lên con đường mòn uốn lượn.",
    symbols: [
      { name: "Crayfish from the Deep", nameVi: "Chú tôm từ đáy nước", meaning: "Unconscious feelings and primal memories surfacing for processing", meaningVi: "Cảm xúc từ đáy tiềm thức trồi lên để được bạn lắng nghe và xoa dịu" },
      { name: "Dog and Wolf", nameVi: "Chó nhà và chó sói", meaning: "Tamed logic and wild instincts learning to coexist", meaningVi: "Lý trí thuần thục và bản năng hoang dã tìm cách hòa hợp" }
    ],
    psychologicalThemes: ["Navigating Ambiguity", "Deconstructing Anxious Projections", "Dream Work"],
    psychologicalThemesVi: ["Vượt qua sự bất định", "Gỡ bỏ những phóng chiếu lo âu", "Thấu hiểu thế giới nội tâm"],
    uprightMeaning: "An invitation to walk gently through uncertainty without letting anxious imaginations magnify fear. Trust your internal radar.",
    uprightMeaningVi: "Lời mời gọi bước đi vững vàng giữa sự mơ hồ mà không để trí tưởng tượng phóng đại nỗi sợ. Hãy tin vào trực giác nhưng kiểm chứng sự thật.",
    reversedMeaning: "A sign that confusion is clearing, self-deception is dissolving, and clarity is returning to light your path.",
    reversedMeaningVi: "Dấu hiệu cho thấy màn sương bối rối đang tan dần, sự thật đang lộ diện và bạn đang lấy lại sự sáng suốt.",
    reflectionPrompts: [
      "What fear or worry in your mind is an imagined story rather than a confirmed fact?",
      "How can you feel safe while navigating an unclear or ambiguous transition?",
      "What symbolic dream or deep intuition is asking for your attentive listening?"
    ],
    reflectionPromptsVi: [
      "Nỗi sợ nào trong tâm trí bạn thực chất chỉ là kịch bản tự vẽ ra chứ chưa phải sự thật?",
      "Làm sao để bạn cảm thấy vững tâm ngay cả khi chặng đường trước mắt còn mờ sương?",
      "Trực giác hay cảm xúc sâu thẳm nào đang muốn được bạn lắng nghe thấu đáo?"
    ],
    positiveActions: [
      "Write down your immediate worries, then separate them strictly into 'Confirmed Facts' vs 'Imagined Assumptions'.",
      "Take a grounding evening walk without jumping to hasty conclusions."
    ],
    positiveActionsVi: [
      "Viết ra các mối lo, sau đó phân loại rạch ròi thành 'Sự thật đã xác thực' và 'Giả định do lo âu tự nghĩ ra'.",
      "Dành thời gian thư giãn buổi tối, tránh đưa ra kết luận vội vàng khi tâm trạng còn xáo trộn."
    ],
    contextualInsights: {
      en: {
        love: "Check if unspoken insecurities are projecting onto your partner; communicate with gentle curiosity.",
        work: "Verify ambiguous data and avoid signing rushed agreements in uncertain conditions.",
        growth: "Explore subconscious patterns with compassion rather than terror.",
        emotion: "Emotional tides that peak and recede like the moon.",
        decision: "Wait until daylight clarity arrives before committing to high-stakes choices.",
        general: "The moonlit path requires slow, careful steps and deep self-compassion."
      },
      vi: {
        love: "Quan sát xem liệu sự bất an có đang khiến bạn nghi ngờ đối phương; hãy trò chuyện thẳng thắn với sự dịu dàng.",
        work: "Kiểm chứng kỹ lưỡng các số liệu và tránh ký kết vội vàng khi thông tin chưa minh bạch.",
        growth: "Khám phá chiều sâu nội tâm và giải mã những giấc mơ bằng sự trắc ẩn.",
        emotion: "Những đợt sóng cảm xúc lên xuống tự nhiên như thủy triều.",
        decision: "Hãy đợi cho đến khi ánh sáng rõ ràng xuất hiện trước khi đưa ra quyết định hệ trọng.",
        general: "Đi trên con đường dưới ánh trăng cần những bước chân chậm rãi và sự vững tâm."
      }
    },
    cautionContext: "Do not mistake anxiety for prophecy; acknowledge your feelings while seeking grounded facts.",
    cautionContextVi: "Đừng nhầm lẫn cảm giác lo âu với điềm báo; hãy tôn trọng cảm xúc nhưng luôn kiểm chứng bằng thực tế khách quan."
  },
  {
    id: "major-19",
    number: 19,
    name: "The Sun",
    nameVi: "The Sun (Ánh Dương & Rạng Rỡ)",
    arcana: "Major",
    suit: null,
    rank: 19,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
    keywords: ["Joy", "Vitality", "Clarity", "Warmth", "Self-Expression"],
    keywordsVi: ["Niềm vui", "Sức sống rạng ngời", "Sự sáng tỏ", "Sự ấm áp", "Tự tin tỏa sáng"],
    symbolism: "A beaming, radiant sun shining over a smiling child riding a gentle white horse, backed by a wall of golden sunflowers.",
    symbolismVi: "Mặt trời rực rỡ tỏa muôn tia nắng ấm áp xuống đứa trẻ tươi cười cưỡi chú ngựa trắng trước bức tường hoa hướng dương vàng rực.",
    symbols: [
      { name: "Smiling Child", nameVi: "Đứa trẻ tươi cười", meaning: "Uninhibited authentic joy and innocence in the present moment", meaningVi: "Niềm vui thuần khiết, tự nhiên và trọn vẹn trong khoảnh khắc hiện tại" },
      { name: "Golden Sunflowers", nameVi: "Hoa hướng dương", meaning: "Vitality, warmth, and full alignment with life's light", meaningVi: "Sinh khí dồi dào, sự ấm áp và hướng về ánh sáng tích cực" }
    ],
    psychologicalThemes: ["Authentic Joy", "Unconditional Positive Regard", "Energized Presence"],
    psychologicalThemesVi: ["Niềm vui tự thân chân thật", "Tâm thế tích cực không điều kiện", "Hiện diện tràn đầy năng lượng"],
    uprightMeaning: "An embrace of vitality, transparent joy, and success. Allow your genuine warmth to illuminate your path and uplift others.",
    uprightMeaningVi: "Đón nhận niềm vui, sự sáng tỏ và năng lượng tích cực dồi dào. Hãy để sự ấm áp chân thành của bạn tỏa sáng và lan tỏa đến xung quanh.",
    reversedMeaning: "A reminder that your inner light is still present even behind temporary clouds; celebrate small victories to re-engage your joy.",
    reversedMeaningVi: "Lời nhắc rằng ánh sáng nội tâm vẫn luôn ở đó dù có đám mây tạm thời che phủ; hãy trân trọng những niềm vui nhỏ để nhen nhóm lại sự phấn chấn.",
    reflectionPrompts: [
      "What brings out your most genuine, child-like joy and laughter?",
      "How can you share your warmth and appreciation with someone today?",
      "What positive achievement or quality in yourself deserve your celebration?"
    ],
    reflectionPromptsVi: [
      "Điều gì mang lại cho bạn nụ cười rạng rỡ và niềm vui hồn nhiên nhất?",
      "Làm thế nào để bạn lan tỏa sự ấm áp và lời khen chân thành đến người xung quanh hôm nay?",
      "Phẩm chất tốt đẹp hay thành tựu nhỏ nào của bản thân xứng đáng được bạn tự hào ăn mừng?"
    ],
    positiveActions: [
      "Step outside into natural sunlight for 15 minutes and take in the warmth.",
      "Send a heartfelt compliment or note of gratitude to someone you value."
    ],
    positiveActionsVi: [
      "Bước ra ngoài đón ánh nắng tự nhiên trong 15 phút và cảm nhận nguồn sinh khí.",
      "Gửi một lời cảm ơn hay lời khen chân thành đến một người bạn trân quý."
    ],
    contextualInsights: {
      en: {
        love: "Bask in openhearted joy, affectionate playfulness, and transparent communication.",
        work: "Thrive in your endeavors with confidence, clarity, and creative enthusiasm.",
        growth: "Reclaim your inner child's curiosity and vibrant self-worth.",
        emotion: "Radiant warmth, unburdened happiness, and vitality.",
        decision: "Choose the transparent, life-affirming path that brings genuine peace and energy.",
        general: "Let your authentic self shine without apology."
      },
      vi: {
        love: "Tận hưởng niềm vui ấm áp, sự gắn kết vui vẻ và tình cảm chân thành, cởi mở.",
        work: "Phát triển công việc với sự tự tin, minh bạch và nhiệt huyết sáng tạo.",
        growth: "Kết nối lại với 'đứa trẻ bên trong' đầy hào hứng và yêu đời.",
        emotion: "Cảm giác ấm áp rực rỡ, nhẹ nhõm và tràn đầy sinh lực.",
        decision: "Hãy chọn con đường minh bạch, mang lại niềm vui và sự an tâm trọn vẹn.",
        general: "Hãy tự tin tỏa sáng với con người chân thật nhất của bạn."
      }
    },
    cautionContext: "Enjoy confidence and positivity without slipping into superficial optimism or ignoring real feelings.",
    cautionContextVi: "Tận hưởng niềm vui nhưng đừng rơi vào sự lạc quan tếu hay phớt lờ những cảm xúc cần được xử lý."
  },
  {
    id: "major-20",
    number: 20,
    name: "Judgement",
    nameVi: "Judgement (Thức Tỉnh & Đón Nhận Tiếng Gọi)",
    arcana: "Major",
    suit: null,
    rank: 20,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
    keywords: ["Calling", "Awakening", "Self-Forgiveness", "Reckoning", "New Horizon"],
    keywordsVi: ["Tiếng gọi nội tâm", "Sự thức tỉnh", "Tha thứ cho chính mình", "Bước sang trang mới", "Giải phóng quá khứ"],
    symbolism: "An angel sounding a golden trumpet from the heavens while figures rise joyfully from stone graves with open arms.",
    symbolismVi: "Thiên thần thổi hồi kèn vàng vang vọng từ trời cao, con người từ lòng đất vươn mình đứng dậy với đôi tay dang rộng đón chào sự sống mới.",
    symbols: [
      { name: "Golden Trumpet", nameVi: "Tiếng kèn vàng", meaning: "A clarion call to awake to your higher purpose and personal truth", meaningVi: "Tiếng chuông thức tỉnh đánh thức sứ mệnh và chân giá trị bên trong bạn" },
      { name: "Open Arms", nameVi: "Đôi tay dang rộng", meaning: "Total readiness to release past guilt and step forward", meaningVi: "Sự sẵn sàng buông bỏ mọi ân hận quá khứ để bước vào tương lai" }
    ],
    psychologicalThemes: ["Self-Forgiveness", "Integrating Life Lessons", "Answering Inner Calling"],
    psychologicalThemesVi: ["Tha thứ cho bản thân", "Đúc kết bài học đời sống", "Đáp lại tiếng gọi phát triển"],
    uprightMeaning: "A profound moment of self-forgiveness and awakening. Release old regrets and step forward into your authentic life purpose.",
    uprightMeaningVi: "Khoảnh khắc thức tỉnh và tha thứ cho chính mình. Hãy buông bỏ những ân hận cũ để tự tin bước tiếp trên con đường bạn đã chọn.",
    reversedMeaning: "A reminder to cease harsh self-criticism or second-guessing; forgive past mistakes as necessary stepping stones.",
    reversedMeaningVi: "Lời nhắc dừng việc tự trách móc hay phán xét bản thân quá mức; hãy xem những vấp ngã cũ là bài học quý báu để trưởng thành.",
    reflectionPrompts: [
      "What past mistake or regret are you finally ready to forgive yourself for?",
      "What higher calling or meaningful direction is whispering to you right now?",
      "How have your past trials shaped you into a wiser, more resilient person?"
    ],
    reflectionPromptsVi: [
      "Sai lầm hay nuối tiếc nào trong quá khứ bạn đã sẵn sàng tha thứ trọn vẹn cho chính mình?",
      "Tiếng gọi hay hướng đi ý nghĩa nào đang thôi thúc bạn bước tiếp?",
      "Những thử thách đã qua đã tôi luyện bạn thành một con người sáng suốt và bản lĩnh hơn ra sao?"
    ],
    positiveActions: [
      "Write down one old self-criticism and consciously replace it with a statement of self-forgiveness.",
      "Take one concrete step answering a long-delayed personal aspiration."
    ],
    positiveActionsVi: [
      "Viết ra một lời tự trách cũ và thay thế bằng lời tha thứ, bao dung với chính mình.",
      "Thực hiện một hành động cụ thể để đáp lại một ước mơ bạn từng trì hoãn."
    ],
    contextualInsights: {
      en: {
        love: "Release old relationship grievances; grant each other a clean, forgiving slate.",
        work: "Step into higher responsibility or pivot toward work that feels truly meaningful.",
        growth: "Deep psychological integration and self-liberation.",
        emotion: "Unburdened clarity, elevated purpose, and profound lightness.",
        decision: "Make the life-defining choice that aligns with your ultimate integrity.",
        general: "The past has served its purpose; your future is calling."
      },
      vi: {
        love: "Buông bỏ những giận hờn cũ; trao cho nhau sự tha thứ chân thành để cùng bước tiếp.",
        work: "Sẵn sàng đón nhận trách nhiệm lớn hơn hoặc chuyển hướng sang công việc có ý nghĩa thật sự.",
        growth: "Sự trưởng thành tâm lý sâu sắc và giải phóng nguồn năng lượng tích cực.",
        emotion: "Sự nhẹ nhõm, thanh thản và cảm giác được tái sinh.",
        decision: "Đưa ra quyết định quan trọng mang tính bước ngoặt phù hợp với giá trị sống của bạn.",
        general: "Quá khứ đã hoàn thành sứ mệnh dạy bạn bài học; tương lai tươi sáng đang vẫy gọi bạn."
      }
    },
    cautionContext: "Judgement is about self-forgiveness and awakening, not critical punishment or condemning others.",
    cautionContextVi: "Judgement mang ý nghĩa tha thứ và thức tỉnh tâm hồn, tuyệt đối không phải sự phán xét trừng phạt."
  },
  {
    id: "major-21",
    number: 21,
    name: "The World",
    nameVi: "The World (Thế Giới Tròn Đầy & Hoàn Thiện)",
    arcana: "Major",
    suit: null,
    rank: 21,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
    keywords: ["Completion", "Wholeness", "Integration", "Achievement", "New Cycle"],
    keywordsVi: ["Hoàn thiện", "Sự trọn vẹn", "Hòa hợp tổng thể", "Thành tựu", "Chu kỳ viên mãn"],
    symbolism: "A dancing figure draped in purple, holding two wands inside a green laurel wreath, surrounded by the four creatures of the elements in the corners.",
    symbolismVi: "Nhân vật múa điệu tự do giữa vòng nguyệt quế xanh tươi, tay cầm đôi trượng ánh sáng, bốn góc là biểu tượng 4 nguyên tố hòa hợp.",
    symbols: [
      { name: "Laurel Wreath", nameVi: "Vòng nguyệt quế", meaning: "Successful completion of a major learning cycle and journey", meaningVi: "Sự hoàn thành trọn vẹn một chặng đường học hỏi và trải nghiệm lớn" },
      { name: "Four Corner Figures", nameVi: "Bốn sinh vật bốn góc", meaning: "Harmonious balance of thoughts, feelings, passions, and reality", meaningVi: "Sự hòa hợp giữa suy nghĩ, cảm xúc, ý chí và thực tiễn đời sống" }
    ],
    psychologicalThemes: ["Self-Actualization", "Sense of Wholeness", "Embracing Closure"],
    psychologicalThemesVi: ["Hiện thực hóa tiềm năng", "Cảm giác trọn vẹn", "Đón nhận sự viên mãn"],
    uprightMeaning: "Celebration of completion, integration, and wholeness. You have traveled far, integrated vital lessons, and stand ready for the next level.",
    uprightMeaningVi: "Sự chúc mừng cho thành tựu, sự trọn vẹn và hòa hợp. Bạn đã đi một chặng đường dài, đúc kết những bài học quý giá và sẵn sàng cho tầm cao mới.",
    reversedMeaning: "A reminder to tie up lingering loose ends before starting anew; celebrate how far you have come even if minor details remain.",
    reversedMeaningVi: "Lời nhắc hoàn tất nốt những chi tiết nhỏ còn dang dở trước khi bước sang trang mới; hãy ghi nhận chặng đường bạn đã đi qua.",
    reflectionPrompts: [
      "What major cycle or milestone in your life has recently come to fruition?",
      "How can you honor and celebrate your growth and perseverance?",
      "As this chapter completes, what vision opens up for your next adventure?"
    ],
    reflectionPromptsVi: [
      "Chu kỳ hay cột mốc quan trọng nào trong đời bạn vừa được hoàn thành viên mãn?",
      "Làm sao để bạn trân trọng và ăn mừng sự nỗ lực, bền bỉ của chính mình?",
      "Khi chương này khép lại trọn vẹn, chân trời mới nào đang mở ra cho bạn?"
    ],
    positiveActions: [
      "Take time to celebrate a personal milestone with a special self-reward or celebration.",
      "Reflect on the key lessons learned throughout this completed cycle and write them down."
    ],
    positiveActionsVi: [
      "Dành thời gian tự thưởng hoặc ăn mừng một cột mốc ý nghĩa bạn đã đạt được.",
      "Ghi lại những bài học quý báu nhất bạn đã gặt hái được từ chặng đường vừa qua."
    ],
    contextualInsights: {
      en: {
        love: "Experience deep harmony, emotional maturity, and mutual fulfillment.",
        work: "Celebrate the successful culmination of a significant project or milestone.",
        growth: "Attain a sense of grounded wholeness and self-unity.",
        emotion: "Expansive gratitude, fulfillment, and serene completeness.",
        decision: "Step forward with confidence; you have all the wisdom needed to succeed.",
        general: "You are whole, complete, and ready for whatever the universe has in store."
      },
      vi: {
        love: "Trải nghiệm sự hòa hợp sâu sắc, thấu cảm và viên mãn trong tình cảm.",
        work: "Gặt hái thành quả xứng đáng sau quá trình nỗ lực bền bỉ cho mục tiêu lớn.",
        growth: "Cảm nhận sự trọn vẹn và bình an tự thân từ bên trong.",
        emotion: "Lòng biết ơn sâu sắc, sự viên mãn và thanh thản.",
        decision: "Tự tin tiến bước; bạn đã có đủ trải nghiệm và trí tuệ để bước tiếp thành công.",
        general: "Bạn vốn đã là một chỉnh thể trọn vẹn, sẵn sàng đón nhận những điều tuyệt vời phía trước."
      }
    },
    cautionContext: "Do not delay celebrating your progress waiting for an impossible definition of perfection.",
    cautionContextVi: "Đừng ngần ngại ghi nhận sự tiến bộ của bản thân chỉ vì mải mê chờ đợi một sự hoàn hảo không tưởng."
  }
];

// Generate Minor Arcana helper to ensure all 56 cards exist with rich structured data
const SUITS: Array<{ suit: "Wands" | "Cups" | "Swords" | "Pentacles"; element: string; elementVi: string; theme: string; themeVi: string }> = [
  { suit: "Wands", element: "Fire", elementVi: "Lửa", theme: "Passion, creativity, energy, willpower, enterprise", themeVi: "Nhiệt huyết, sáng tạo, ý chí, năng lượng hành động" },
  { suit: "Cups", element: "Water", elementVi: "Nước", theme: "Emotions, intuition, love, relationships, empathy", themeVi: "Cảm xúc, trực giác, tình yêu, mối quan hệ, sự thấu cảm" },
  { suit: "Swords", element: "Air", elementVi: "Khí", theme: "Mind, truth, clarity, communication, challenges", themeVi: "Tâm trí, sự thật, giao tiếp, lý trí, vượt qua thử thách" },
  { suit: "Pentacles", element: "Earth", elementVi: "Đất", theme: "Practicality, resources, body, work, material stability", themeVi: "Thực tiễn, tài chính, cơ thể, công việc, sự ổn định" }
];

const RANKS = [
  { rank: "Ace", num: 1, nameVi: "Át", meaning: "Seed, new potential, raw energy", meaningVi: "Hạt mầm, tiềm năng mới, cơ hội khởi đầu" },
  { rank: 2, num: 2, nameVi: "2", meaning: "Duality, choice, planning, balance", meaningVi: "Lựa chọn, cân nhắc, lập kế hoạch, cân bằng" },
  { rank: 3, num: 3, nameVi: "3", meaning: "Collaboration, early results, creative growth", meaningVi: "Hợp tác, kết quả bước đầu, mở rộng" },
  { rank: 4, num: 4, nameVi: "4", meaning: "Stability, boundaries, resting, consolidation", meaningVi: "Sự ổn định, củng cố nền tảng, nghỉ ngơi" },
  { rank: 5, num: 5, nameVi: "5", meaning: "Challenge, friction, growth through tension", meaningVi: "Thử thách, xung đột nhỏ, bài học thích ứng" },
  { rank: 6, num: 6, nameVi: "6", meaning: "Harmony, transition, sharing, mutual support", meaningVi: "Hòa hợp, chuyển tiếp, sẻ chia, hồi phục" },
  { rank: 7, num: 7, nameVi: "7", meaning: "Assessment, perseverance, strategy, patience", meaningVi: "Đánh giá, kiên trì, chiến lược, xem xét lại" },
  { rank: 8, num: 8, nameVi: "8", meaning: "Movement, skill development, mastery, focus", meaningVi: "Chuyển động nhanh, rèn luyện kỹ năng, chuyên tâm" },
  { rank: 9, num: 9, nameVi: "9", meaning: "Resilience, fulfillment, wisdom, boundary strength", meaningVi: "Kiên cường, gần đến đích, sự vững vàng" },
  { rank: 10, num: 10, nameVi: "10", meaning: "Culmination, transition to new chapter, full cycle", meaningVi: "Đỉnh điểm, hoàn tất chu kỳ, sẵn sàng chuyển giao" },
  { rank: "Page", num: 11, nameVi: "Page (Thị Tùng)", meaning: "Curiosity, youthful learning, fresh message", meaningVi: "Sự tò mò của người học việc, thông điệp mới" },
  { rank: "Knight", num: 12, nameVi: "Knight (Hiệp Sĩ)", meaning: "Action, focused pursuit, dynamic momentum", meaningVi: "Hành động quyết liệt, theo đuổi mục tiêu" },
  { rank: "Queen", num: 13, nameVi: "Queen (Hoàng Hậu)", meaning: "Inner mastery, mature empathy, nurturing wisdom", meaningVi: "Làm chủ nội tâm, sự thấu hiểu và nuôi dưỡng" },
  { rank: "King", num: 14, nameVi: "King (Quốc Vương)", meaning: "External mastery, strategic vision, leadership", meaningVi: "Năng lực lãnh đạo, tầm nhìn chiến lược, sự vững vàng" }
];

// Helper to construct minor card data cleanly
export const MINOR_ARCANA_CARDS: TarotCard[] = [];

SUITS.forEach(s => {
  RANKS.forEach(r => {
    const cardId = `${s.suit.toLowerCase()}-${String(r.num).padStart(2, '0')}`;
    const rankName = typeof r.rank === 'string' ? r.rank : String(r.rank);
    const fullName = `${rankName} of ${s.suit}`;
    const fullNameVi = `${r.nameVi} ${s.suit === 'Wands' ? 'Gậy' : s.suit === 'Cups' ? 'Cốc' : s.suit === 'Swords' ? 'Kiếm' : 'Tiền'}`;
    
    // Standard public domain Wikimedia URLs
    const suitCode = s.suit === 'Wands' ? 'Wands' : s.suit === 'Cups' ? 'Cups' : s.suit === 'Swords' ? 'Swords' : 'Pents';
    const numCode = String(r.num).padStart(2, '0');
    const imageUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/${s.suit === 'Wands' ? '1/11/Wands' : s.suit === 'Cups' ? '3/36/RWS_Tarot_01_Cups.jpg' : s.suit === 'Swords' ? '0/0b/Swords' : 'f/fd/Pents'}${numCode}.jpg/300px-${suitCode}${numCode}.jpg`;

    // High quality contextual descriptions
    const minorCard: TarotCard = {
      id: cardId,
      number: r.num,
      name: fullName,
      nameVi: `${fullName} (${fullNameVi})`,
      arcana: "Minor",
      suit: s.suit,
      rank: r.rank as any,
      imageUrl: `https://upload.wikimedia.org/wikipedia/commons/${s.suit === 'Wands' ? '1/11/Wands' : s.suit === 'Cups' ? '3/36/Cups' : s.suit === 'Swords' ? '0/0b/Swords' : 'f/fd/Pents'}${numCode}.jpg`,
      keywords: [s.suit, rankName, r.meaning],
      keywordsVi: [s.suit === 'Wands' ? 'Gậy' : s.suit === 'Cups' ? 'Cốc' : s.suit === 'Swords' ? 'Kiếm' : 'Tiền', r.nameVi, r.meaningVi],
      symbolism: `Depicts the ${rankName} of the ${s.suit} suit, embodying the ${s.element} element with themes of ${s.theme}.`,
      symbolismVi: `Biểu trưng cho lá ${r.nameVi} của bộ ${s.suit === 'Wands' ? 'Gậy' : s.suit === 'Cups' ? 'Cốc' : s.suit === 'Swords' ? 'Kiếm' : 'Tiền'}, mang nguyên tố ${s.elementVi} gắn liền với ${s.themeVi}.`,
      symbols: [
        { name: `${s.suit} Icon`, nameVi: `Biểu tượng bộ ${s.suit === 'Wands' ? 'Gậy' : s.suit === 'Cups' ? 'Cốc' : s.suit === 'Swords' ? 'Kiếm' : 'Tiền'}`, meaning: s.theme, meaningVi: s.themeVi },
        { name: "Numerology & Rank", nameVi: "Ý nghĩa số học/cấp bậc", meaning: r.meaning, meaningVi: r.meaningVi }
      ],
      psychologicalThemes: [`${s.suit} Energy`, r.meaning],
      psychologicalThemesVi: [`Năng lượng ${s.suit === 'Wands' ? 'Gậy' : s.suit === 'Cups' ? 'Cốc' : s.suit === 'Swords' ? 'Kiếm' : 'Tiền'}`, r.meaningVi],
      uprightMeaning: `An invitation to channel the constructive qualities of ${s.theme.toLowerCase()}: ${r.meaning.toLowerCase()}.`,
      uprightMeaningVi: `Lời mời gọi phát huy những phẩm chất tích cực của ${s.themeVi.toLowerCase()}: ${r.meaningVi.toLowerCase()}.`,
      reversedMeaning: `A gentle prompt to bring balance to this energy; check whether it is blocked, overextended, or asking for internal reflection.`,
      reversedMeaningVi: `Lời nhắc kiểm tra sự cân bằng của nguồn năng lượng này; xem xét liệu nó có đang bị tắc nghẽn hay cần được điều chỉnh nhẹ nhàng.`,
      reflectionPrompts: [
        `How does the energy of ${s.theme.toLowerCase()} manifest in your life today?`,
        `Where can you bring more ${r.meaning.toLowerCase()} into your current circumstance?`
      ],
      reflectionPromptsVi: [
        `Năng lượng của ${s.themeVi.toLowerCase()} đang hiện diện trong đời sống của bạn ra sao?`,
        `Bạn có thể mang thêm ${r.meaningVi.toLowerCase()} vào hoàn cảnh hiện tại như thế nào?`
      ],
      positiveActions: [
        `Take one mindful action that expresses healthy ${s.theme.toLowerCase()}.`,
        `Pause and reflect on how ${r.meaning.toLowerCase()} can serve your current goals.`
      ],
      positiveActionsVi: [
        `Thực hiện một hành động cụ thể nuôi dưỡng ${s.themeVi.toLowerCase()}.`,
        `Dành vài phút suy ngẫm xem ${r.meaningVi.toLowerCase()} có thể hỗ trợ mục tiêu của bạn thế nào.`
      ],
      contextualInsights: {
        en: {
          love: `Bring conscious awareness to your connections with ${s.theme.toLowerCase()}.`,
          work: `Apply ${r.meaning.toLowerCase()} to steady your professional progress.`,
          growth: `Embrace this phase as a constructive step in self-understanding.`,
          emotion: `Acknowledge your current state without rush or self-criticism.`,
          decision: `Evaluate your options with practical respect for ${s.theme.toLowerCase()}.`,
          general: `A symbolic reflection inviting your deliberate, mindful participation.`
        },
        vi: {
          love: `Nuôi dưỡng sự kết nối chân thành bằng năng lượng ${s.themeVi.toLowerCase()}.`,
          work: `Vận dụng ${r.meaningVi.toLowerCase()} để thúc đẩy công việc vững chắc.`,
          growth: `Xem giai đoạn này như một bước đệm ý nghĩa để thấu hiểu bản thân.`,
          emotion: `Lắng nghe cảm xúc hiện tại mà không vội vàng phán xét.`,
          decision: `Đưa ra lựa chọn tôn trọng thực tế và ${s.themeVi.toLowerCase()}.`,
          general: "Một biểu tượng phản chiếu mời gọi sự suy ngẫm và chủ động của bạn."
        }
      },
      cautionContext: `Notice whether you are forcing results or ignoring balanced self-care.`,
      cautionContextVi: `Hãy quan sát xem bạn có đang thúc ép kết quả hay quên chăm sóc bản thân cân bằng.`
    };

    MINOR_ARCANA_CARDS.push(minorCard);
  });
});

// Full 78-card verified deck
export const TAROT_78_DECK: TarotCard[] = [...ALL_TAROT_CARDS, ...MINOR_ARCANA_CARDS];

export const SPREADS = [
  {
    type: "1-card" as const,
    title: "Quick Reflection",
    titleVi: "Rút 1 Lá — Suy Ngẫm Nhanh",
    description: "A single card for immediate focus and mindful presence.",
    descriptionVi: "Một lá bài duy nhất để soi rọi góc nhìn và sự chú tâm ngay lúc này.",
    positions: [
      {
        index: 0,
        label: "What is worth noticing right now?",
        labelVi: "Điều gì đáng để bạn lưu tâm ngay lúc này?",
        description: "A focal point for quiet contemplation and present awareness.",
        descriptionVi: "Điểm tựa để lắng đọng và quan sát thực tại."
      }
    ]
  },
  {
    type: "3-card" as const,
    title: "Perspective Spread",
    titleVi: "Trải 3 Lá — Đa Chiều Góc Nhìn",
    description: "Context, perspective, and constructive action.",
    descriptionVi: "Bối cảnh hiện tại, góc nhìn gợi mở và hành động xây dựng.",
    positions: [
      {
        index: 0,
        label: "Context & What is worth noticing",
        labelVi: "1. Bối cảnh & Điều đáng lưu tâm",
        description: "The underlying landscape of your current situation.",
        descriptionVi: "Bức tranh tổng thể và bối cảnh bạn đang trải nghiệm."
      },
      {
        index: 1,
        label: "Perspective & What could help",
        labelVi: "2. Góc nhìn & Điều có thể hỗ trợ",
        description: "A fresh angle or insight that broadens your horizon.",
        descriptionVi: "Một lăng kính mới hoặc điều bạn có thể đang bỏ quên."
      },
      {
        index: 2,
        label: "Constructive Action & Where your influence lies",
        labelVi: "3. Hành động nhỏ & Điều trong tầm tay",
        description: "A tangible, positive micro-step you can choose to take.",
        descriptionVi: "Một bước hành động thiết thực bạn hoàn toàn có thể chủ động."
      }
    ]
  },
  {
    type: "5-card" as const,
    title: "Reflection Journey",
    titleVi: "Trải 5 Lá — Hành Trình Tự Khám Phá",
    description: "Deep exploration of situation, influences, blind spots, control, and next steps.",
    descriptionVi: "Khám phá sâu sắc: Hiện trạng, Yếu tố tác động, Điểm mù, Quyền kiểm soát và Bước đi tiếp theo.",
    positions: [
      {
        index: 0,
        label: "1. Current situation & internal state",
        labelVi: "1. Hiện trạng & Trạng thái nội tâm",
        description: "Where you find yourself right now.",
        descriptionVi: "Điểm khởi đầu và cảm nhận thực tại của bạn."
      },
      {
        index: 1,
        label: "2. Influences & underlying dynamics",
        labelVi: "2. Yếu tố tác động & Động lực ngầm",
        description: "What has shaped or influenced this moment.",
        descriptionVi: "Những yếu tố đang tác động đến suy nghĩ hay hoàn cảnh."
      },
      {
        index: 2,
        label: "3. Blind spot / What you may be overlooking",
        labelVi: "3. Điểm mù / Điều có thể đang bị bỏ sót",
        description: "An unexamined assumption or hidden opportunity.",
        descriptionVi: "Một giả định chưa được kiểm chứng hoặc một góc nhìn bị khuất."
      },
      {
        index: 3,
        label: "4. Where your power & influence lies",
        labelVi: "4. Quyền làm chủ & Điều bạn kiểm soát được",
        description: "The domain of your autonomy and genuine choice.",
        descriptionVi: "Vùng tự chủ và những gì thực sự nằm trong tầm tay bạn."
      },
      {
        index: 4,
        label: "5. A constructive next step",
        labelVi: "5. Bước đi tiếp theo mang tính xây dựng",
        description: "A grounded, realistic action to carry forward.",
        descriptionVi: "Một hành động tích cực, thực tế để bạn vững bước."
      }
    ]
  }
];

export const TOPIC_CONFIGS: Array<{
  en: "Love & Relationships" | "Work & Study" | "Personal Growth" | "Current Emotions" | "A Decision I'm Considering" | "General Reflection";
  vi: "Tình cảm & Mối quan hệ" | "Công việc & Học tập" | "Phát triển bản thân" | "Cảm xúc hiện tại" | "Cân nhắc quyết định" | "Suy ngẫm tổng quan";
  descriptionEn: string;
  descriptionVi: string;
  iconName: string;
}> = [
  {
    en: "Personal Growth",
    vi: "Phát triển bản thân",
    descriptionEn: "Exploring habits, self-awareness, personal values, and inner resilience.",
    descriptionVi: "Khám phá thói quen, nhận thức bản thân, hệ giá trị và nội lực.",
    iconName: "Compass"
  },
  {
    en: "Current Emotions",
    vi: "Cảm xúc hiện tại",
    descriptionEn: "Holding space for what you are feeling, validating your emotional landscape.",
    descriptionVi: "Lắng nghe và ôm ấp cảm xúc, tìm kiếm sự an tịnh và sáng tỏ.",
    iconName: "HeartHandshake"
  },
  {
    en: "Work & Study",
    vi: "Công việc & Học tập",
    descriptionEn: "Reflecting on projects, creative direction, energy management, and career focus.",
    descriptionVi: "Suy ngẫm về dự án, định hướng sáng tạo, quản lý năng lượng và công việc.",
    iconName: "Briefcase"
  },
  {
    en: "Love & Relationships",
    vi: "Tình cảm & Mối quan hệ",
    descriptionEn: "Examining communication, boundaries, empathy, and mutual understanding.",
    descriptionVi: "Giao tiếp chân thành, ranh giới lành mạnh, sự thấu cảm và gắn kết.",
    iconName: "Heart"
  },
  {
    en: "A Decision I'm Considering",
    vi: "Cân nhắc quyết định",
    descriptionEn: "Weighing perspectives, clarifying motivations, and testing underlying assumptions.",
    descriptionVi: "Cân nhắc các khía cạnh, làm rõ động lực và kiểm tra các giả định ngầm.",
    iconName: "Scale"
  },
  {
    en: "General Reflection",
    vi: "Suy ngẫm tổng quan",
    descriptionEn: "An open, mindful pause to reflect on life's current rhythms and gifts.",
    descriptionVi: "Khoảng lặng chánh niệm để nhìn lại nhịp điệu cuộc sống và bài học hiện tại.",
    iconName: "Sparkles"
  }
];
