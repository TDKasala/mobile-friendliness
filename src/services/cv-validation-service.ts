
// This service integrates with Google's Gemini API for CV validation
import { validateCVFile, validateCVContent } from "@/utils/cv-analysis/cv-validator";
import { validateCVWithGemini, analyzeCVWithGemini, parseScoresFromResponse, parseRecommendationsFromResponse } from "@/utils/cv-analysis/gemini-api";
import { validateFileMetadata, generateFileHash } from "@/utils/cv-analysis/file-validator";
import { extractTextFromFile } from "@/utils/cv-analysis/text-extractor";
import { downloadedCVCache, validationScoreCache } from "@/utils/cv-analysis/validation-cache";

export type ValidationResult = {
  isValid: boolean;
  reason?: string;
  score?: number;
  detailedScores?: Record<string, number>;
  recommendations?: string[];
}

/**
 * Validates a CV file using AI
 * @param file CV file to validate
 * @returns Validation result with score and recommendations
 */
export const validateCVWithAI = async (file: File): Promise<ValidationResult> => {
  try {
    // Step 1: Validate file metadata (type and size)
    const fileValidation = validateFileMetadata(file);
    if (!fileValidation.isValid) {
      return fileValidation;
    }
    
    // Extract text content from the file
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

/**
 * Validates CVs that are downloaded or accessed from toolkit
 * @param fileUrl URL of the file to validate
 * @param fileName Name of the file
 * @returns Validation result
 */
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

/**
 * Tracks CV downloads and triggers background validation
 * @param fileUrl URL of the downloaded file
 * @param fileName Name of the downloaded file
 */
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
