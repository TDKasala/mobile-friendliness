
// CV validation utilities to prevent non-CV files from being analyzed

// Track downloaded CVs for validation
const downloadedCVCache = new Map<string, boolean>();
const validationScoreCache = new Map<string, ValidationResult>();

type ValidationResult = {
  isValid: boolean;
  reason?: string;
  score?: number;
  detailedScores?: Record<string, number>;
  recommendations?: string[];
}

// File patterns that suggest this is a CV
const CV_PATTERNS = [
  /\b(?:education|degree|qualification|graduate|academic)\b/i,
  /\b(?:experience|work history|employment|position|role)\b/i,
  /\b(?:skill|proficient|knowledge|ability|competent)\b/i,
  /\b(?:phone|email|contact|address|tel)\b/i,
  /\b(?:resume|cv|curriculum vitae|professional profile)\b/i,
  /\b(?:objective|summary|profile|about me)\b/i,
  /\b(?:reference|certification|achievement|award)\b/i,
];

// Extract text from files - mock implementation for frontend
const extractTextFromFile = async (file: File): Promise<string> => {
  // For text files, we can read directly
  if (file.type === 'text/plain') {
    return await file.text();
  }
  
  // For PDFs and DOCXs, in a real implementation we'd use a library
  // Here we'll just check the name for mock implementation
  const fileName = file.name.toLowerCase();
  
  // Generate mock text based on filename to simulate different CV qualities
  let mockText = `This is placeholder text for ${file.name}.`;
  
  // Make the mock text reflect possible CV content with South African context
  if (fileName.includes('senior') || fileName.includes('manager')) {
    mockText += ` Senior professional with 10+ years experience in industry leadership.
      B-BBEE Level 2 contributor. NQF Level 8 qualification from University of Cape Town.
      Skills include: Strategic planning, team management, budget oversight, and stakeholder communication.
      Contact: email@example.com, +27 82 123 4567`;
  } else if (fileName.includes('graduate') || fileName.includes('junior')) {
    mockText += ` Recent graduate seeking entry-level position.
      B-BBEE Level 4. Completed Matric and National Diploma (NQF Level 6) from UNISA.
      Skills include: MS Office, communication, analytical thinking.
      References available upon request.`;
  } else {
    mockText += ` Professional with 5 years experience in the field.
      Education: Bachelor's degree from Wits University.
      Technical skills and certifications listed in detail.
      Previous employment at Standard Bank and Vodacom.`;
  }
  
  return mockText;
};

// Check if text content appears to be a CV
export const isValidCV = (text: string): {isValid: boolean, reason?: string} => {
  if (!text || text.length < 50) {
    return { isValid: false, reason: "Insufficient text content to analyze" };
  }
  
  // Count how many CV patterns match
  let patternMatches = 0;
  CV_PATTERNS.forEach(pattern => {
    if (pattern.test(text)) {
      patternMatches++;
    }
  });
  
  // If we match at least 3 patterns, it's likely a CV
  if (patternMatches >= 3) {
    return { isValid: true };
  }
  
  // Check for structured sections that indicate a CV
  const commonSections = /\b(Education|Experience|Skills|Work History|References|Qualifications|Achievements|Contact|Objective|Summary)\b/gi;
  const sections = text.match(commonSections);
  
  if (sections && sections.length >= 2) {
    return { isValid: true };
  }
  
  return { 
    isValid: false, 
    reason: "The content doesn't appear to be a CV. Please ensure you're uploading a resume/CV document."
  };
};

// Generate a simple hash for a file to use as cache key
const generateFileHash = async (file: File): Promise<string> => {
  // In a real implementation, you'd use a proper hashing algorithm
  // For now, we'll create a hash from file properties
  return `${file.name}-${file.size}-${file.lastModified}`;
};

// Validate a CV by analyzing its content
export const validateCVContent = async (file: File): Promise<ValidationResult> => {
  try {
    // Extract text content from the file
    const textContent = await extractTextFromFile(file);
    
    // Generate a file hash for caching
    const fileHash = await generateFileHash(file);
    
    // Check cache first
    if (validationScoreCache.has(fileHash)) {
      console.log("Using cached validation result");
      return validationScoreCache.get(fileHash) || { isValid: true };
    }
    
    // Run basic validation on the text content
    const validationResult = isValidCV(textContent);
    
    if (!validationResult.isValid) {
      return validationResult;
    }
    
    // In a real implementation, this would use the Gemini API
    // For now, we'll return a simple validation result
    return {
      isValid: true,
      reason: "CV validated successfully"
    };
  } catch (error) {
    console.error("Error validating CV content:", error);
    return {
      isValid: false,
      reason: "Error validating CV content"
    };
  }
};

// Validate a CV file based on metadata
export const validateCVFile = (file: File): {isValid: boolean, reason?: string} => {
  // Check file type
  const validExtensions = ['.pdf', '.docx', '.doc', '.txt', '.odt'];
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  const isValidExtension = validExtensions.includes(fileExtension);
  
  if (!isValidExtension) {
    return {
      isValid: false,
      reason: "File type not supported. Please upload a PDF, DOCX, TXT, or ODT file."
    };
  }
  
  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return {
      isValid: false,
      reason: "File size exceeds 5MB. Please upload a smaller file."
    };
  }
  
  return { isValid: true };
};

// Track CV downloads and validate in background
export const trackCVDownload = async (fileUrl: string, fileName: string): Promise<void> => {
  try {
    console.log(`Tracking CV download: ${fileName}`);
    
    // Check if we've already validated this file
    const cacheKey = `${fileName}-${fileUrl}`;
    if (downloadedCVCache.has(cacheKey)) {
      console.log("Using cached validation result for downloaded CV:", fileName);
      return;
    }
    
    // Add to cache to avoid re-validating
    downloadedCVCache.set(cacheKey, true);
    console.log(`CV download tracked: ${fileName}`);
  } catch (error) {
    console.error("Error tracking CV download:", error);
  }
};
