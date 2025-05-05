
/**
 * CV validation using DeepSeek AI
 */

import { ValidationResult } from "@/hooks/use-cv-validation";
import { createValidationCache } from "./validation-cache";
import { callDeepSeekAPI, hashString } from "./api-client";

// Cache system for API responses
const apiCache = createValidationCache();

/**
 * Validates CV text content with DeepSeek AI
 */
export const validateCVWithDeepSeek = async (cvText: string): Promise<ValidationResult> => {
  try {
    // Generate cache key from CV content
    const cacheKey = `validate-${hashString(cvText.substring(0, 1000))}`;
    
    // Check cache first
    const cachedResult = apiCache.get(cacheKey);
    if (cachedResult) {
      console.log("Using cached CV validation result");
      return cachedResult as ValidationResult;
    }

    const prompt = `
      Is the following text a CV/resume? Check for keywords like name, surname, ID number, email, 
      phone, address, contact, education, experience, skills, qualifications, work, job, 
      CV, curriculum vitae. 
      
      Respond with JSON in this exact format:
      {"isValid": boolean, "reason": string}
      
      Be lenient in your validation. If the text contains at least 4 keywords from the list above,
      or contains CV/curriculum vitae plus 2 more keywords, consider it valid.

      CV text:
      ${cvText.substring(0, 1000)}
    `;

    const response = await callDeepSeekAPI(prompt, 200);
    
    // Parse the response (with error handling for malformed JSON)
    try {
      const parsedResponse = JSON.parse(response);
      // Convert to ValidationResult format
      const result: ValidationResult = {
        isValid: parsedResponse.isValid,
        reason: parsedResponse.reason
      };
      
      // Cache the result
      apiCache.set(cacheKey, result);
      
      return result;
    } catch (e) {
      console.error("Error parsing JSON from DeepSeek response:", response);
      // Return default response if parsing fails
      return { isValid: true, reason: "Error validating but proceeding with analysis" };
    }
  } catch (error) {
    console.error("Error validating CV with DeepSeek:", error);
    // Default to accepting the CV even if validation fails
    return { isValid: true, reason: "Error validating but proceeding with analysis" };
  }
};
