export type SubscriptionTier = "free" | "pay-per-use" | "premium";

export type BadgeLevel = "ATS Rookie" | "CV Pro" | "Job Master";

export interface UserGameProgress {
  tasksCompleted: string[];
  points: number;
  badgeLevel: BadgeLevel;
  unlockedRewards: string[];
}

export interface CVScore {
  overall: number;
  keywordMatch: number;
  formatting: number;
  sectionPresence: number;
  readability: number;
  length: number;
}

export interface CVTip {
  id: string;
  category: string;
  text: string;
  priority: "high" | "medium" | "low";
}

export interface JobMatch {
  score: number;
  matchedKeywords: {
    keyword: string;
    present: boolean;
    importance: "high" | "medium" | "low";
  }[];
  missingKeywords: {
    keyword: string;
    present: boolean;
    importance: "high" | "medium" | "low";
  }[];
  suggestions: string[];
}
