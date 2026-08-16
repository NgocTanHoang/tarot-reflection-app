export interface SafetyCheckResult {
  isCrisis: boolean;
  crisisType?: "mental_health" | "medical" | "legal" | "fatalism";
  messageVi?: string;
  messageEn?: string;
  hotlines?: Array<{ name: string; contact: string; note: string }>;
}

const CRISIS_PATTERNS = [
  /\b(tự tử|tự sát|suicide|kill myself|end my life|muốn chết|self-harm|tự hại|cắt tay)\b/i,
  /\b(bệnh hiểm nghèo|ung thư|chữa khỏi bệnh|stop medication|uống thuốc gì|khám bệnh)\b/i,
  /\b(sắp chết|chết khi nào|khi nào tôi chết|will i die|ai sẽ chết)\b/i,
  /\b(bị bạo hành|bị đánh đập|abuse|domestic violence|bị lạm dụng)\b/i
];

export const checkSensitiveCrisisQuery = (query: string): SafetyCheckResult => {
  if (!query || !query.trim()) {
    return { isCrisis: false };
  }

  const normalized = query.toLowerCase();

  for (const pattern of CRISIS_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        isCrisis: true,
        crisisType: "mental_health",
        messageVi: "Chúng tôi nhận thấy bạn đang trải qua những cảm xúc rất khó khăn hoặc tình huống nhạy cảm. Tarot là một công cụ phản tỉnh tượng trưng và không thể thay thế sự trợ giúp y tế, tâm lý hay can thiệp khủng hoảng chuyên nghiệp. Xin hãy liên hệ với các nguồn hỗ trợ thực tế dưới đây để được đồng hành an toàn.",
        messageEn: "We recognize you may be going through a deeply challenging moment. Tarot is a symbolic tool for reflection and cannot replace professional medical, psychological, or crisis care. Please reach out to trusted professionals or the support lines below.",
        hotlines: [
          {
            name: "Tổng đài Quốc gia Bảo vệ Trẻ em & Hỗ trợ Khủng hoảng (Việt Nam)",
            contact: "111 hoặc 1800 1567",
            note: "Miễn phí 24/7"
          },
          {
            name: "Đường dây nóng Ngày Mai (Hỗ trợ người trầm cảm & khủng hoảng tâm lý)",
            contact: "096 306 1414",
            note: "13:00 - 20:30 hàng ngày"
          },
          {
            name: "International Crisis Hotline (Befrienders Worldwide)",
            contact: "befrienders.org",
            note: "Free, confidential emotional support worldwide"
          },
          {
            name: "Cấp cứu Y tế Khẩn cấp",
            contact: "115 (Việt Nam) / 911 / 112",
            note: "Hỗ trợ y tế khẩn cấp ngay lập tức"
          }
        ]
      };
    }
  }

  return { isCrisis: false };
};

// Sanitizes and strips deterministic, predictive, or fear-based language
export const sanitizeInterpretationOutput = (text: string): string => {
  if (!text) return "";

  let cleaned = text;

  // Replace fear-based and fortune-telling absolute claims with reflective framing
  const replacements: Array<[RegExp, string]> = [
    [/\b(chắc chắn bạn sẽ|bạn sẽ chắc chắn|you will definitely|you are destined to)\b/gi, "bạn có thể đang hướng sự chú ý về việc"],
    [/\b(điềm báo tai họa|điềm xấu|vận xui|tai ương|disaster is coming)\b/gi, "một thử thách đòi hỏi sự bình tĩnh và kiên cường"],
    [/\b(người yêu sẽ phản bội|bạn sẽ bị lừa|bạn sắp mất việc)\b/gi, "nhu cầu xem xét lại sự an tâm và các cuộc trò chuyện thẳng thắn"],
    [/\b(không thể thay đổi được số phận|số mệnh đã định)\b/gi, "mọi lựa chọn vẫn luôn nằm trong tay bạn"],
    [/\b(bạn phải làm theo lá bài|lá bài quyết định)\b/gi, "lá bài chỉ đóng vai trò một góc nhìn gợi mở"]
  ];

  for (const [regex, rep] of replacements) {
    cleaned = cleaned.replace(regex, rep);
  }

  return cleaned;
};

export const ETHICS_DISCLAIMER_VI = "Tarot tại đây được sử dụng như một công cụ biểu tượng để tự phản tỉnh, khám phá cảm xúc và suy ngẫm cá nhân. Ứng dụng không dự đoán tương lai và không thay thế các lời khuyên y tế, tâm lý, pháp lý hay tài chính.";
export const ETHICS_DISCLAIMER_EN = "Tarot here is used solely as a symbolic mirror for self-reflection, mindfulness, and personal insight. It does not predict the future or replace professional medical, psychological, legal, or financial counsel.";
