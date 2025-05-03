
export type SubscriptionTier = "free" | "pay-per-use" | "premium";

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
