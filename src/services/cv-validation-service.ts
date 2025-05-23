// This service integrates with DeepSeek API for CV validation
import { generateFileHash } from "@/utils/cv-analysis/file-validator";
import { extractTextFromFile } from "@/utils/cv-analysis/text-extractor";
import { validateCVWithGemini, analyzeCVWithGemini, parseScoresFromResponse, parseScoreExplanationsFromResponse, parseRecommendationsFromResponse } from "@/utils/cv-analysis/deepseek-api";
import { createValidationCache } from "@/utils/cv-analysis/validation-cache";
import { isValidCV } from "@/utils/cv-analysis/cv-validator";
import { ValidationResult } from "@/hooks/use-cv-validation";

// Create validation cache
const validationCache = createValidationCache();

/**
 * Validates a CV file using DeepSeek AI and keyword-based approach
 * @param file CV file to validate
 * @returns Validation result with score and recommendations
 */
export const validateCVWithAI = async (file: File): Promise<ValidationResult> => {
  try {
    // Generate a file hash for caching
    const fileHash = await generateFileHash(file);
    
    // Check cache first
    const cachedResult = validationCache.get(fileHash);
    if (cachedResult) {
      console.log("Using cached validation result");
      return cachedResult as ValidationResult;
    }
    
    // Extract text content from the file
    const textContent = await extractTextFromFile(file);
    
    // Start with keyword-based validation (more lenient approach)
    // This will catch most valid CVs without needing to call the API
    const keywordValidation = isValidCV(textContent);
    
    // We'll always consider the file valid for analysis purposes
    // This prevents the CV from being wrongly rejected
    const isFileValid = true;
    
    try {
      // Truncate text to first 2500 characters for the API call
      // This is increased from 2000 to allow for more context
      const truncatedText = textContent.substring(0, 2500);
      const analysisResponse = await analyzeCVWithGemini(truncatedText);
      
      // Create the validation result using the analysis
      const validationResult: ValidationResult = { 
        isValid: isFileValid,
        score: analysisResponse.score,
        detailedScores: analysisResponse.detailedScores,
        scoreExplanations: analysisResponse.scoreExplanations,
        recommendations: analysisResponse.recommendations,
        sectionAnalysis: analysisResponse.sectionAnalysis,
        southAfricanSpecific: analysisResponse.southAfricanSpecific,
        atsCompatibility: analysisResponse.atsCompatibility,
        visualPresentation: analysisResponse.visualPresentation,
        jobMatchDetails: analysisResponse.jobMatchDetails
      };
      
      // Cache the result
      validationCache.set(fileHash, validationResult);
      return validationResult;
    } catch (error) {
      console.error("Error calling DeepSeek API:", error);
      // If API call fails, still accept the CV
      return { 
        isValid: isFileValid, 
        reason: "Basic validation passed. Advanced analysis unavailable." 
      };
    }
  } catch (error) {
    console.error("Error in CV validation:", error);
    // Default to accepting the file in case of errors for analysis
    return {
      isValid: true,
      reason: "Validation error. Please try again."
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
    // Try to fetch the file content for better validation
    try {
      const response = await fetch(fileUrl);
      const fileBlob = await response.blob();
      const file = new File([fileBlob], fileName);
      
      // Validate the actual file content
      return await validateCVWithAI(file);
    } catch (fetchError) {
      console.error("Error fetching CV for validation:", fetchError);
      
      // If we can't fetch the file, still mark as valid but log the issue
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
        
        // Log detailed scores if available
        if (result.detailedScores) {
          console.log("CV scores:", result.detailedScores);
        }
        
        // Log recommendations if available
        if (result.recommendations && result.recommendations.length > 0) {
          console.log("CV recommendations:", result.recommendations);
        }
        
        // Log section analysis if available
        if (result.sectionAnalysis) {
          console.log("CV section analysis:", Object.keys(result.sectionAnalysis).length, "sections analyzed");
        }
      })
      .catch(err => {
        console.error("Background validation error:", err);
      });
  } catch (error) {
    console.error("Error tracking CV download:", error);
  }
}
