
export type Arcana = "Major" | "Minor";
export type Suit = "Wands" | "Cups" | "Swords" | "Pentacles" | null;
export type Rank = number | "Page" | "Knight" | "Queen" | "King" | null;

export interface SymbolInfo {
  name: string;
  meaning_psychological: string;
  visual_note: string;
}

export interface EnergyProfile {
  pace: "chậm" | "trung bình" | "nhanh";
  orientation: "hướng nội" | "hướng ngoại";
  tone: "mềm" | "trung tính" | "mạnh";
}

export interface ContextBias {
  love_focus: string;
  work_focus: string;
  self_focus: string;
  emotional_focus: string;
}

export interface TarotCard {
  id: number;
  name: string;
  arcana: Arcana;
  suit: Suit;
  rank: Rank;
  imageUrl: string;
  core_theme: string[];
  symbols: SymbolInfo[];
  psychological_dimensions: string[];
  energy_profile: EnergyProfile;
  context_bias: ContextBias;
  action_seeds: string[];
  reflection_prompts: string[];
}

export type ReadingTopic = "Tình cảm" | "Công việc" | "Phát triển bản thân" | "Tâm trạng";

export interface Reading {
  id: string;
  date: number;
  topic: ReadingTopic;
  cardId: number;
  interpretation: string;
}

export interface UserState {
  name: string;
  history: Reading[];
}
