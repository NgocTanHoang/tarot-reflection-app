export type Arcana = "Major" | "Minor";
export type Suit = "Wands" | "Cups" | "Swords" | "Pentacles" | null;
export type Rank = number | "Ace" | "Page" | "Knight" | "Queen" | "King";

export type ReadingTopic = 
  | "Love & Relationships" 
  | "Work & Study" 
  | "Personal Growth" 
  | "Current Emotions" 
  | "A Decision I'm Considering" 
  | "General Reflection";

export type ReadingTopicVi =
  | "Tình cảm & Mối quan hệ"
  | "Công việc & Học tập"
  | "Phát triển bản thân"
  | "Cảm xúc hiện tại"
  | "Cân nhắc quyết định"
  | "Suy ngẫm tổng quan";

export type SpreadType = "1-card" | "3-card" | "5-card" | "decision-path";

export interface SpreadPosition {
  index: number;
  label: string;
  labelVi: string;
  description: string;
  descriptionVi: string;
}

export interface SpreadConfig {
  id: string;
  type: SpreadType;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  cardCount: number;
  positions: SpreadPosition[];
}

export interface SymbolDetail {
  name: string;
  nameVi: string;
  meaning: string;
  meaningVi: string;
}

export interface ContextualReflection {
  love: string;
  work: string;
  growth: string;
  emotion: string;
  decision: string;
  general: string;
}

export interface TarotCard {
  id: string; // e.g. "major-00", "wands-01"
  number: number;
  name: string;
  nameVi: string;
  arcana: Arcana;
  suit: Suit;
  rank: Rank;
  imageUrl: string;
  keywords: string[];
  keywordsVi: string[];
  symbolism: string;
  symbolismVi: string;
  symbols: SymbolDetail[];
  psychologicalThemes: string[];
  psychologicalThemesVi: string[];
  uprightMeaning: string;
  uprightMeaningVi: string;
  reversedMeaning: string;
  reversedMeaningVi: string;
  reflectionPrompts: string[];
  reflectionPromptsVi: string[];
  positiveActions: string[];
  positiveActionsVi: string[];
  contextualInsights: {
    en: ContextualReflection;
    vi: ContextualReflection;
  };
  cautionContext: string;
  cautionContextVi: string;
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  position: number;
  positionLabel: string;
  positionLabelVi?: string;
  customReflection?: {
    symbolicMeaning: string;
    reflection: string;
    positiveGuidance: string;
    reflectionPrompt: string;
    closing: string;
  };
}

export interface Reading {
  id: string;
  date: string;
  createdAt?: number;
  topic: string;
  theme?: string;
  themeVi?: string;
  question: string;
  spreadType: string;
  cards: DrawnCard[];
  interpretation?: string;
  personalNotes?: string;
  userReflections?: string;
  tags?: string[];
  isFavorite?: boolean;
}

export interface DailyReading {
  id: string;
  date: string;
  card: TarotCard;
  isReversed: boolean;
  prompt: string;
  notes?: string;
  actionCompleted?: boolean;
}

export interface UserPreferences {
  language: "vi" | "en";
  allowReversed: boolean;
  enableSound: boolean;
  reduceMotion?: boolean;
  theme: "dark" | "light";
  dailyReminder?: boolean;
  cardBackStyle?: "celestial" | "minimal-gold" | "deep-cosmos";
}

export interface UserStats {
  totalReadings: number;
  totalDailyCards: number;
  streakDays: number;
  lastActiveDate: string;
  themeCounts: Record<string, number>;
  drawnCardCounts: Record<string, number>;
}

