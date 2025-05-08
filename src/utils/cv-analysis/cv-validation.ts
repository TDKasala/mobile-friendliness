
/**
 * CV validation using DeepSeek AI
 */

import { ValidationResult } from "@/hooks/use-cv-validation";
import { createValidationCache } from "./validation-cache";
import { callDeepSeekAPI, hashString } from "./api-client";
import { generateCVValidationPrompt } from "./deepseek-prompts";

// Cache system for API responses
const validationCache = createValidationCache();

/**
 * Validates CV text content with DeepSeek AI
 */
export const validateCVWithDeepSeek = async (cvText: string): Promise<ValidationResult> => {
  try {
    // Generate hash for cache key
    const cacheKey = `validate-${hashString(cvText.substring(0, 500))}`;
    
    // Check cache first
    const cachedResult = validationCache.get(cacheKey);
    if (cachedResult) {
      console.log("Using cached CV validation result");
      return cachedResult as ValidationResult;
    }

    // Generate prompt for validation
    const prompt = generateCVValidationPrompt(cvText);
    
    // Call DeepSeek API
    const response = await callDeepSeekAPI(prompt, 500);
    
    try {
      const parsedResponse = JSON.parse(response);
      const result: ValidationResult = {
        isValid: parsedResponse.isCV === true,
        reason: parsedResponse.reason || "Unknown reason"
      };
      
      // Cache the result
      validationCache.set(cacheKey, result);
      return result;
    } catch (e) {
      console.error("Error parsing JSON from DeepSeek validation response:", e);
      // Default to true for better user experience
      return { isValid: true, reason: "Error occurred during validation" };
    }
  } catch (error) {
    console.error("Error validating CV with DeepSeek:", error);
    // Default to true for better user experience
    return { isValid: true, reason: "Error occurred during validation" };
  }
};
