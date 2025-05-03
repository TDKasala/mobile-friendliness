
export interface CVScore {
  overall: number;
  keywordMatch?: number;
  formatting?: number;
  sectionPresence?: number;
  readability?: number;
  length?: number;
}

export interface CVTip {
  category: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export type SubscriptionTier = "free" | "pay-per-use" | "premium";

export interface Keyword {
  keyword: string;
  present: boolean;
  importance: "high" | "medium" | "low";
}

export interface JobMatch {
  score: number;
  matchedKeywords: Keyword[];
  missingKeywords: Keyword[];
  suggestions: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
}
