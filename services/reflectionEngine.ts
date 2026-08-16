import { TarotCard, ReadingTopic, DrawnCard } from '../types';
import { ALL_TAROT_CARDS, TAROT_78_DECK } from '../data/tarotData';
import { sanitizeInterpretationOutput } from './safety';

export interface StructuredInterpretation {
  symbolicMeaning: string;
  reflection: string;
  positiveGuidance: string;
  reflectionPrompt: string;
  closing: string;
}

export const generateLocalFallbackInterpretation = (
  card: TarotCard,
  topic: ReadingTopic,
  positionLabel: string,
  isReversed: boolean,
  language: "vi" | "en" = "vi"
): StructuredInterpretation => {
  const isVi = language === "vi";

  // Layer 1: Symbolic Meaning
  const symbolicMeaning = isVi
    ? `Biểu tượng của **${card.nameVi}**${isReversed ? " (ở góc độ chuyển hóa nội tâm)" : ""}: ${card.symbolismVi} ${
        card.symbols.length > 0
          ? `Chi tiết đáng chú ý là ${card.symbols[0].nameVi} — gợi nhắc đến ${card.symbols[0].meaningVi}.`
          : ""
      }`
    : `The symbolism of **${card.name}**${isReversed ? " (viewed as internalized energy)" : ""}: ${card.symbolism} ${
        card.symbols.length > 0
          ? `Notice the ${card.symbols[0].name}, embodying ${card.symbols[0].meaning}.`
          : ""
      }`;

  // Layer 2: Reflection (Contextualized by topic and spread position)
  const contextTopicKey = topic === "Love & Relationships" ? "love"
    : topic === "Work & Study" ? "work"
    : topic === "Personal Growth" ? "growth"
    : topic === "Current Emotions" ? "emotion"
    : topic === "A Decision I'm Considering" ? "decision"
    : "general";

  const contextNote = isVi
    ? card.contextualInsights.vi[contextTopicKey] || card.uprightMeaningVi
    : card.contextualInsights.en[contextTopicKey] || card.uprightMeaning;

  const coreMeaning = isReversed
    ? (isVi ? card.reversedMeaningVi : card.reversedMeaning)
    : (isVi ? card.uprightMeaningVi : card.uprightMeaning);

  const reflection = isVi
    ? `Ở vị trí **${positionLabel}** trong bối cảnh **${topic}**, lá bài đóng vai trò một tấm gương phản chiếu: ${contextNote} ${coreMeaning} ${
        card.cautionContextVi ? `Một góc nhìn hữu ích là: ${card.cautionContextVi}` : ""
      }`
    : `In the position of **${positionLabel}** within the theme of **${topic}**, this card serves as an introspective mirror: ${contextNote} ${coreMeaning} ${
        card.cautionContext ? `A helpful awareness to keep in mind: ${card.cautionContext}` : ""
      }`;

  // Layer 3: Action (Action seeds)
  const actionSeed = card.positiveActionsVi && card.positiveActionsVi.length > 0
    ? (isVi ? card.positiveActionsVi[0] : card.positiveActions[0])
    : (isVi ? "Dành 5 phút viết nhật ký suy ngẫm về những điều bạn có thể chủ động thay đổi." : "Take 5 quiet minutes to journal on what is within your influence.");

  const positiveGuidance = isVi
    ? `Gợi ý hành động nhỏ: **${actionSeed}**`
    : `Suggested micro-action: **${actionSeed}**`;

  // Reflection Prompt
  const promptSeed = card.reflectionPromptsVi && card.reflectionPromptsVi.length > 0
    ? (isVi ? card.reflectionPromptsVi[0] : card.reflectionPrompts[0])
    : (isVi ? "Điều gì đang thực sự nằm trong tầm kiểm soát của bạn ngay lúc này?" : "What part of this situation is genuinely within your control right now?");

  // Layer 4: Closing Autonomy
  const closing = isVi
    ? "Lá bài không quyết định câu trả lời hay tương lai của bạn. Bạn luôn là người hiểu rõ hoàn cảnh và có trọn vẹn quyền lựa chọn con đường của mình."
    : "The card offers a perspective, not a prescription. You remain the author of your choices and understand your circumstances best.";

  return {
    symbolicMeaning: sanitizeInterpretationOutput(symbolicMeaning),
    reflection: sanitizeInterpretationOutput(reflection),
    positiveGuidance: sanitizeInterpretationOutput(positiveGuidance),
    reflectionPrompt: sanitizeInterpretationOutput(promptSeed),
    closing: closing
  };
};

export const fetchAIInterpretation = async (
  card: TarotCard,
  topic: ReadingTopic,
  positionLabel: string,
  isReversed: boolean,
  userQuestion?: string,
  language: "vi" | "en" = "vi"
): Promise<StructuredInterpretation> => {
  try {
    const response = await fetch('/api/gemini/reflect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cardId: card.id,
        cardName: card.name,
        cardNameVi: card.nameVi,
        arcana: card.arcana,
        suit: card.suit,
        topic,
        positionLabel,
        isReversed,
        userQuestion,
        language
      })
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();
    if (data && data.symbolicMeaning && data.reflection) {
      return {
        symbolicMeaning: sanitizeInterpretationOutput(data.symbolicMeaning),
        reflection: sanitizeInterpretationOutput(data.reflection),
        positiveGuidance: sanitizeInterpretationOutput(data.positiveGuidance),
        reflectionPrompt: sanitizeInterpretationOutput(data.reflectionPrompt),
        closing: data.closing || (language === "vi" 
          ? "Lá bài chỉ là một góc nhìn phản chiếu. Quyền quyết định luôn thuộc về bạn." 
          : "The card offers a reflective mirror. The choice is always yours.")
      };
    }

    // Fallback if data format differs
    return generateLocalFallbackInterpretation(card, topic, positionLabel, isReversed, language);
  } catch (err) {
    console.warn("AI reflection service unavailable, using local reflective engine:", err);
    return generateLocalFallbackInterpretation(card, topic, positionLabel, isReversed, language);
  }
};
