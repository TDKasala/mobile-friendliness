
// CV validation utilities with updated intelligent rules for better detection

// Keywords for identifying CVs
const PERSONAL_INFORMATION_KEYWORDS = [
  "name", "surname", "id number", "email", "phone", "address", "contact",
  "cell", "mobile", "telephone", "tel", "identity number", "id no"
];

const CV_INDICATORS = [
  "cv", "curriculum vitae", "resume", "résumé", "professional profile", 
  "professional summary", "personal statement"
];

const EDUCATION_KEYWORDS = [
  "education", "qualification", "qualifications", "degree", "diploma", 
  "certificate", "matric", "school", "college", "university", 
  "bachelor", "master", "phd", "doctorate", "nqf", "saqa"
];

const EXPERIENCE_KEYWORDS = [
  "experience", "work", "employment", "job", "career", "position",
  "responsibilities", "duties", "achievements", "projects", "role",
  "company", "organization", "department", "supervisor", "manager"
];

const SKILLS_KEYWORDS = [
  "skills", "abilities", "competencies", "expertise", "proficient", 
  "knowledge", "familiar with", "fluent in", "certificate", "certified",
  "technical", "soft skills", "interpersonal", "communication"
];

const SA_SPECIFIC_TERMS = [
  "bbbee", "b-bbee", "employment equity", "affirmative action", "equity candidate",
  "south african", "sa citizen", "id number", "matric", "nqf", "saqa"
];

// Combine all keywords
const ALL_CV_KEYWORDS = [
  ...PERSONAL_INFORMATION_KEYWORDS,
  ...CV_INDICATORS,
  ...EDUCATION_KEYWORDS,
  ...EXPERIENCE_KEYWORDS,
  ...SKILLS_KEYWORDS,
  ...SA_SPECIFIC_TERMS
];

export type ValidationResult = {
  isValid: boolean;
  reason?: string;
  score?: number;
  detailedScores?: Record<string, number>;
  recommendations?: string[];
}

/**
 * Enhanced CV validation function that intelligently identifies real CVs
 * Uses multiple heuristics and structural analysis for better accuracy
 * 
 * @param text The text content of the file
 * @returns Validation result with isValid flag and reason if invalid
 */
export const isValidCV = (text: string): {isValid: boolean, reason?: string} => {
  if (!text || text.length < 50) {
    return { isValid: false, reason: "Insufficient text content to analyze" };
  }
  
  const textLower = text.toLowerCase();
  
  // ANALYSIS 1: Keyword presence
  // Count keywords found in text
  const foundKeywords = ALL_CV_KEYWORDS.filter(keyword => 
    textLower.includes(keyword)
  );
  
  // Count CV indicator words found
  const foundCVIndicators = CV_INDICATORS.filter(indicator => 
    textLower.includes(indicator)
  );
  
  // ANALYSIS 2: Structural elements
  // Check for typical CV section headers
  const sectionHeaders = /\b(Education|Experience|Skills|Work History|References|Qualifications|Achievements|Contact|Objective|Summary|Profile|Personal Details)\b/i;
  const hasSections = sectionHeaders.test(text);
  
  // ANALYSIS 3: Email pattern - CVs almost always contain email addresses
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
  const hasEmail = emailPattern.test(text);
  
  // ANALYSIS 4: Phone number pattern - CVs typically contain phone numbers
  const phonePattern = /(\+\d{1,3}[ -]?)?\(?\d{2,4}\)?[ -]?\d{3}[ -]?\d{4}/;
  const hasPhone = phonePattern.test(text);
  
  // ANALYSIS 5: Date patterns that suggest work history or education timeline
  const datePattern = /\b(19|20)\d{2}\b|\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* (19|20)\d{2}\b/i;
  const hasDates = datePattern.test(text);
  
  // ANALYSIS 6: Check for SA-specific indicators
  const foundSATerms = SA_SPECIFIC_TERMS.filter(term => textLower.includes(term)).length;
  
  // Decision-making logic to determine if this is a valid CV
  // Create a confidence score based on multiple factors
  let confidenceScore = 0;
  
  // Keyword analysis (0-40 points)
  confidenceScore += Math.min(foundKeywords.length * 2, 25); 
  confidenceScore += foundCVIndicators.length > 0 ? 15 : 0;
  
  // Structure analysis (0-20 points)
  confidenceScore += hasSections ? 20 : 0;
  
  // Contact information (0-20 points)
  confidenceScore += hasEmail ? 10 : 0;
  confidenceScore += hasPhone ? 10 : 0;
  
  // Timeline analysis (0-10 points)
  confidenceScore += hasDates ? 10 : 0;
  
  // SA-specific terms (0-10 points)
  confidenceScore += Math.min(foundSATerms * 2, 10);
  
  // Console log for debugging
  console.log("CV Validation confidence score:", confidenceScore);
  
  // A CV must meet a minimum threshold for confidence (50 out of 100)
  if (confidenceScore >= 50) {
    return { isValid: true };
  }
  
  // Provide more informative feedback
  return { 
    isValid: false, 
    reason: "This doesn't appear to be a valid CV. Please ensure you're uploading a CV with personal details, education, work experience, and skills sections."
  };
};

// Track downloaded CVs for validation (for backwards compatibility)
export const downloadedCVCache = new Map<string, boolean>();
export const validationScoreCache = new Map<string, ValidationResult>();

// Generate a simple hash for a file to use as cache key
export const generateFileHash = async (file: File): Promise<string> => {
  return `${file.name}-${file.size}-${file.lastModified}`;
};

// Export all required functions and types for backwards compatibility
export const KEYWORDS = {
  PERSONAL_INFORMATION_KEYWORDS,
  CV_INDICATORS,
  EDUCATION_KEYWORDS,
  EXPERIENCE_KEYWORDS,
  SKILLS_KEYWORDS,
  SA_SPECIFIC_TERMS,
  ALL_CV_KEYWORDS
};
