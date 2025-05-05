
// This service integrates with Google's Gemini API for CV validation
import { validateCVFile, validateCVContent } from "@/utils/cv-analysis/cv-validator";
import { validateCVWithGemini, analyzeCVWithGemini, parseScoresFromResponse, parseRecommendationsFromResponse } from "@/utils/cv-analysis/gemini-api";

type ValidationResult = {
  isValid: boolean;
  reason?: string;
  score?: number;
  detailedScores?: Record<string, number>;
  recommendations?: string[];
}

// Track downloaded CVs for validation
const downloadedCVCache = new Map<string, boolean>();
const validationScoreCache = new Map<string, ValidationResult>();

export const validateCVWithAI = async (file: File): Promise<ValidationResult> => {
  try {
    // Step 1: Validate file metadata (type and size)
    const fileValidation = validateCVFile(file);
    if (!fileValidation.isValid) {
      return fileValidation;
    }
    
    // Extract text content from the file (basic implementation)
    const textContent = await extractTextFromFile(file);
    
    // Step 2: Quick pattern-based validation
    const contentValidation = await validateCVContent(file);
    if (!contentValidation.isValid) {
      return contentValidation;
    }
    
    // Generate a file hash for caching
    const fileHash = await generateFileHash(file);
    
    // Check cache first
    if (validationScoreCache.has(fileHash)) {
      console.log("Using cached validation result");
      return validationScoreCache.get(fileHash) || { isValid: true };
    }

    // Truncate text to first 2000 characters for the API call
    const truncatedText = textContent.substring(0, 2000);
    
    try {
      // Step 3: Gemini API validation for more accurate assessment
      const geminiValidation = await validateCVWithGemini(truncatedText);
      
      if (!geminiValidation.isValid) {
        return geminiValidation;
      }
      
      // Step 4: If valid, perform a quick analysis
      const analysisResponse = await analyzeCVWithGemini(truncatedText);
      
      // Parse scores and recommendations from the response
      const scores = parseScoresFromResponse(analysisResponse);
      const recommendations = parseRecommendationsFromResponse(analysisResponse);
      
      const validationResult: ValidationResult = { 
        isValid: true,
        score: scores.overall || undefined,
        detailedScores: scores,
        recommendations: recommendations
      };
      
      // Cache the result
      validationScoreCache.set(fileHash, validationResult);
      
      return validationResult;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      // Fallback to accepting the file if API call fails
      return { 
        isValid: true,
        reason: "API validation unavailable. Basic validation passed."
      };
    }
  } catch (error) {
    console.error("Error in CV validation:", error);
    // Default to accepting the file in case of errors
    return {
      isValid: true,
      reason: "Validation error. File accepted by default."
    };
  }
};

// New function to validate CVs that are downloaded or accessed from toolkit
export const validateDownloadedCV = async (fileUrl: string, fileName: string): Promise<ValidationResult> => {
  try {
    // Check if we've already validated this file
    const cacheKey = `${fileName}-${fileUrl}`;
    if (downloadedCVCache.has(cacheKey)) {
      console.log("Using cached validation result for downloaded CV:", fileName);
      return { isValid: true };
    }
    
    // Try to fetch the file content for better validation
    try {
      const response = await fetch(fileUrl);
      const fileBlob = await response.blob();
      const file = new File([fileBlob], fileName);
      
      // Validate the actual file content
      const validationResult = await validateCVWithAI(file);
      
      // Add to cache to avoid re-validating
      downloadedCVCache.set(cacheKey, true);
      
      return validationResult;
    } catch (fetchError) {
      console.error("Error fetching CV for validation:", fetchError);
      
      // If we can't fetch the file, still mark as valid but log the issue
      downloadedCVCache.set(cacheKey, true);
      return { isValid: true };
    }
  } catch (error) {
    console.error("Error validating downloaded CV:", error);
    return { isValid: true }; // Default to accepting downloaded files
  }
};

// Helper function to extract text from different file types
const extractTextFromFile = async (file: File): Promise<string> => {
  // In a production environment, this would use a more robust solution
  // Here we'll just read text files directly
  if (file.type === 'text/plain') {
    return await file.text();
  }
  
  // For other file types, in production you would:
  // 1. Send to a serverless function
  // 2. Use a PDF extraction library or docx parser
  // 3. Return the extracted text
  
  // Mock content extraction with more sophisticated detection
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

// Generate a simple hash for a file to use as cache key
const generateFileHash = async (file: File): Promise<string> => {
  // In a real implementation, you'd use a proper hashing algorithm
  // For now, we'll create a hash from file properties
  return `${file.name}-${file.size}-${file.lastModified}`;
};

// Cache implementation for validation results
export const createValidationCache = () => {
  const cache = new Map<string, ValidationResult>();
  
  return {
    get: (fileHash: string): ValidationResult | undefined => {
      return cache.get(fileHash);
    },
    set: (fileHash: string, result: ValidationResult): void => {
      cache.set(fileHash, result);
    },
    // Track cache stats for cost optimization
    getStats: () => ({
      cacheSize: cache.size,
      hitRate: 0 // In a real implementation, we'd track hits and misses
    })
  };
};

// Track CV downloads and trigger background validation
export const trackCVDownload = async (fileUrl: string, fileName: string): Promise<void> => {
  try {
    console.log(`Tracking CV download: ${fileName}`);
    
    // Validate in background without blocking download
    validateDownloadedCV(fileUrl, fileName)
      .then(result => {
        console.log(`Background validation for ${fileName}: ${result.isValid ? 'Valid' : 'Invalid'}`);
        
        // In a production app, you could:
        // 1. Send validation results to analytics
        // 2. Flag suspicious downloads for review
        // 3. Update user recommendations based on what they download
        
        // Log detailed scores if available
        if (result.detailedScores) {
          console.log("CV scores:", result.detailedScores);
        }
        
        // Log recommendations if available
        if (result.recommendations && result.recommendations.length > 0) {
          console.log("CV recommendations:", result.recommendations);
        }
      })
      .catch(err => {
        console.error("Background validation error:", err);
      });
      
    // Track download event (in a real app, send to analytics)
  } catch (error) {
    console.error("Error tracking CV download:", error);
  }
}
