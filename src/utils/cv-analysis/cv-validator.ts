
// CV validation utilities with updated lenient rules

// Keywords for identifying CVs
const PERSONAL_INFORMATION_KEYWORDS = [
  "name", "surname", "id number", "email", "phone", "address", "contact"
];

const CV_INDICATORS = [
  "cv", "curriculum vitae", "resume"
];

const OTHER_COMMON_TERMS = [
  "education", "experience", "skills", "qualifications", "work", "job", 
  "career", "profile", "references", "achievements", "history", "employment",
  "objective", "summary", "certificate", "degree", "diploma"
];

// Combine all keywords
const ALL_CV_KEYWORDS = [
  ...PERSONAL_INFORMATION_KEYWORDS,
  ...CV_INDICATORS,
  ...OTHER_COMMON_TERMS
];

type ValidationResult = {
  isValid: boolean;
  reason?: string;
  score?: number;
  detailedScores?: Record<string, number>;
  recommendations?: string[];
}

/**
 * Check if text content appears to be a CV using updated lenient rules
 * @param text The text content of the file
 * @returns Validation result with isValid flag and reason if invalid
 */
export const isValidCV = (text: string): {isValid: boolean, reason?: string} => {
  if (!text || text.length < 50) {
    return { isValid: false, reason: "Insufficient text content to analyze" };
  }
  
  const textLower = text.toLowerCase();
  
  // Count keywords found in text
  const foundKeywords = ALL_CV_KEYWORDS.filter(keyword => 
    textLower.includes(keyword)
  );
  
  // Count CV indicator words found
  const foundCVIndicators = CV_INDICATORS.filter(indicator => 
    textLower.includes(indicator)
  );
  
  // Rule 1: Accept if it contains "cv" or "curriculum vitae" and at least 2 other keywords
  if (foundCVIndicators.length > 0 && foundKeywords.length >= 2) {
    return { isValid: true };
  }
  
  // Rule 2: Accept if it contains 4 or more keywords, even without CV indicators
  if (foundKeywords.length >= 4) {
    return { isValid: true };
  }
  
  // Check for structured sections that likely indicate a CV
  const commonSections = /\b(Education|Experience|Skills|Work History|References|Qualifications|Achievements|Contact|Objective|Summary)\b/i;
  const hasSections = commonSections.test(text);
  
  if (hasSections && foundKeywords.length >= 2) {
    return { isValid: true };
  }
  
  return { 
    isValid: false, 
    reason: "This doesn't appear to be a CV. Please upload a valid CV in PDF, DOCX, or ODT format."
  };
};

// Track downloaded CVs for validation (for backwards compatibility)
export const downloadedCVCache = new Map<string, boolean>();
export const validationScoreCache = new Map<string, ValidationResult>();

// Generate a simple hash for a file to use as cache key
export const generateFileHash = async (file: File): Promise<string> => {
  return `${file.name}-${file.size}-${file.lastModified}`;
};
