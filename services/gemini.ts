
import { GoogleGenAI } from "@google/genai";
import { TarotCard, ReadingTopic } from "../types";

export const getInterpretation = async (card: TarotCard, topic: ReadingTopic, historyCount: number): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Bạn là một người kể chuyện bằng biểu tượng (Symbolic Storyteller).
    Hãy diễn giải lá bài Tarot sau đây dựa trên tinh thần phản chiếu tâm lý và định hướng tích cực.
    
    THÔNG TIN ĐẦU VÀO:
    - Tên lá bài: ${card.name} (${card.arcana} - ${card.suit || "Không có bộ"})
    - Chủ đề: ${topic}
    - Chủ đề cốt lõi: ${card.core_theme.join(", ")}
    - Biểu tượng chính: ${card.symbols.map(s => `${s.name} (${s.meaning_psychological})`).join("; ")}
    - Khía cạnh tâm lý: ${card.psychological_dimensions.join(", ")}
    - Hồ sơ năng lượng: Tốc độ ${card.energy_profile.pace}, Hướng ${card.energy_profile.orientation}, Giọng điệu ${card.energy_profile.tone}
    - Ngữ cảnh chủ đề này: ${card.context_bias[topic === "Tình cảm" ? "love_focus" : topic === "Công việc" ? "work_focus" : topic === "Phát triển bản thân" ? "self_focus" : "emotional_focus"]}
    - Số lần đã rút trước đó: ${historyCount} (Dùng thông tin này để tinh chỉnh độ lặp, không nhắc trực tiếp con số)

    YÊU CẦU DIỄN GIẢI (BẮT BUỘC TUÂN THỦ):
    Hãy viết bằng tiếng Việt, giọng điệu nhẹ nhàng, tôn trọng, không khẳng định tuyệt đối, trình bày theo 4 phần:

    A. Ý NGHĨA BIỂU TƯỢNG (KHÁCH QUAN)
    Mô tả hình ảnh chính, màu sắc, hành động dựa trên biểu tượng đã cho. Trình bày như một biểu tượng văn hóa - tâm lý.

    B. THÔNG ĐIỆP TÂM LÝ (PHẢN CHIẾU)
    Diễn giải lá bài như một tấm gương nội tâm. Người dùng có thể đang cảm thấy gì? Có khuynh hướng hành vi nào đang lặp lại? (Sử dụng các 'khía cạnh tâm lý' và 'hồ sơ năng lượng' để phân tích).

    C. GỢI Ý TÍCH CỰC (HÀNH ĐỘNG NHỎ)
    Đưa ra 1-2 gợi ý thực tế, nhỏ, có thể làm ngay từ danh sách gợi ý: ${card.action_seeds.join(", ")}.

    D. LỜI ĐỘNG VIÊN CUỐI
    Nhấn mạnh quyền lựa chọn thuộc về người dùng. Tarot chỉ là một góc nhìn.

    RÀNG BUỘC:
    - Không dự đoán tương lai.
    - Không nói về tai họa, trừng phạt.
    - Không dùng từ huyền bí nặng nề.
    - Trình bày đẹp mắt bằng Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Xin lỗi, hiện tại tôi chưa thể kết nối với biểu tượng này. Hãy thử lại sau nhé.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Có lỗi xảy ra trong quá trình diễn giải. Hãy kiểm tra kết nối mạng của bạn.";
  }
};
