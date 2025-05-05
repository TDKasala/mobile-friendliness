export type SubscriptionTier = "free" | "premium" | "pay-per-use";

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
  bbbeeCompliance?: number;
  contentRelevance?: number;
  saQualifications?: number;
}

export interface CVTip {
  title?: string;
  text: string;
  description?: string;
  priority: "high" | "medium" | "low";
  section?: string;
}

export interface JobMatch {
  score: number;
  matches: Array<{
    keyword: string;
    present: boolean;
  }>;
  missingKeywords: string[];
  recommendations: string[];
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

// Success Stories types
export interface SuccessStory {
  id: string;
  name: string;
  story: string;
  imageUrl?: string;
  jobTitle?: string;
  company?: string;
  approved: boolean;
  scoreImprovement?: string;
  dateSubmitted: string;
}

// Job Seeker Toolkit types
export interface ToolkitDownload {
  id: string;
  email: string;
  downloadDate: string;
  ipAddress?: string;
  referrer?: string;
}

// Job Listings types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  postDate: string;
  jobType: "full-time" | "part-time" | "contract" | "remote";
  industry: string;
  url: string;
  logoUrl?: string;
}

// Document type for CV and job description files
export interface DocumentMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  userId?: string;
}

// Gemini API response interface for CV analysis
export interface GeminiCVAnalysis {
  totalScore: number;
  subscores: {
    formatting: number;
    keywords: number;
    contentRelevance: number;
    bbbeeCompliance: number;
    readability: number;
  };
  recommendations: {
    formatting: string;
    keywords: string;
    contentRelevance: string;
    bbbeeCompliance: string;
    readability: string;
  };
  examples: {
    formatting: string;
    keywords: string;
    contentRelevance: string;
    bbbeeCompliance: string;
    readability: string;
  };
}
