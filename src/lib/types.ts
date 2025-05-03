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
  title: string;          
  description: string;    
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

export interface QuizQuestion {
  id: string;
  text: string;
  type: "text" | "select" | "radio";
  options?: string[];
}

export interface QuizAnswer {
  questionId: string;
  answer: string;
}

export interface JobFitQuizData {
  email: string;
  answers: QuizAnswer[];
}

export type BlogArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  authorTitle: string;
  publishDate: string;
  coverImage: string;
  category: string;
};

// Referral system types
export interface ReferralData {
  referralCode: string;
  referralLink: string;
  signups: number;
  freeAnalysesEarned: number;
}

// CV Templates types
export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  downloadUrl: string;
  tier: SubscriptionTier;
  category: string;
  format: "docx" | "pdf" | "both";
  popularityScore: number;
  industry?: string;
  color?: string;
}
