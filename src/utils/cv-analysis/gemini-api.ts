/**
 * Utilities for integrating with DeepSeek API
 * Replaced Gemini API with DeepSeek API for CV validation and scoring
 */

import { createValidationCache } from "./validation-cache";
import { ValidationResult } from "@/hooks/use-cv-validation";

// Cache system for API responses
const apiCache = createValidationCache();

/**
 * DeepSeek API URL and models
 */
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DEEPSEEK_API_KEY = "sk-f89f3e7c942043059b94bde104ccbd82"; 
const DEEPSEEK_MODEL = "deepseek-chat";

/**
 * Validates CV text content with DeepSeek AI
 */
export const validateCVWithGemini = async (cvText: string): Promise<ValidationResult> => {
  try {
    // Generate cache key from CV content
    const cacheKey = `validate-${hashString(cvText.substring(0, 1000))}`;
    
    // Check cache first
    const cachedResult = apiCache.get(cacheKey);
    if (cachedResult) {
      console.log("Using cached CV validation result");
      return cachedResult;
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

    const response = await callDeepSeekAPI(prompt);
    
    // Parse the response (with error handling for malformed JSON)
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
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

/**
 * Analyzes CV text content for ATS scoring
 */
export const analyzeCVWithGemini = async (cvText: string): Promise<ValidationResult> => {
  try {
    // Generate cache key from CV content
    const cacheKey = `analyze-${hashString(cvText.substring(0, 1000))}`;
    
    // Check cache first
    const cachedResult = apiCache.get(cacheKey);
    if (cachedResult) {
      console.log("Using cached CV analysis result");
      return cachedResult;
    }

    const prompt = `
      Analyze this CV for ATS compatibility in South Africa. Provide a detailed analysis in JSON format:
      
      {
        "overall": number from 0-100 (overall ATS score, average of below scores),
        "keywordMatch": number from 0-100 (score for ATS keywords),
        "formatting": number from 0-100 (score for structure, length, readability),
        "sectionPresence": number from 0-100 (score for having all required sections),
        "readability": number from 0-100 (score for grammar, spelling, clarity),
        "length": number from 0-100 (score for appropriate length),
        "recommendations": [array of specific improvement suggestions based on South African job market],
        "southAfricanSpecific": {
          "bbbeeCompliance": number from 0-100 (score for B-BBEE status inclusion),
          "nqfAlignment": number from 0-100 (score for NQF level specification),
          "localCertifications": number from 0-100 (score for SA specific certifications)
        }
      }
      
      Focus on South African job market specifics like B-BBEE status, NQF levels, SAICA membership, etc.
      Make recommendations specific to South African market.

      CV text:
      ${cvText}
    `;

    const response = await callDeepSeekAPI(prompt);
    
    try {
      const parsedData = JSON.parse(response);
      
      // Convert to ValidationResult format
      const result: ValidationResult = {
        isValid: true,
        score: parsedData.overall,
        detailedScores: {
          keywordMatch: parsedData.keywordMatch || 0,
          formatting: parsedData.formatting || 0,
          sectionPresence: parsedData.sectionPresence || 0,
          readability: parsedData.readability || 0,
          length: parsedData.length || 0,
          bbbeeCompliance: parsedData.southAfricanSpecific?.bbbeeCompliance || 0,
          nqfAlignment: parsedData.southAfricanSpecific?.nqfAlignment || 0,
          localCertifications: parsedData.southAfricanSpecific?.localCertifications || 0
        },
        recommendations: parsedData.recommendations || []
      };
      
      // Cache the result
      apiCache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error("Error parsing JSON from DeepSeek response:", error);
      // Return default analysis if parsing fails
      return {
        isValid: true,
        score: 65,
        detailedScores: {
          keywordMatch: 60,
          formatting: 70,
          sectionPresence: 65,
          readability: 75,
          length: 65,
          bbbeeCompliance: 50,
          nqfAlignment: 60,
          localCertifications: 55
        },
        recommendations: [
          "Consider adding more industry-specific keywords",
          "Ensure your CV includes your B-BBEE status if applicable",
          "Add NQF levels for your qualifications",
          "Make sure your contact details are clearly visible at the top"
        ]
      };
    }
  } catch (error) {
    console.error("Error analyzing CV with DeepSeek:", error);
    // Return default analysis if API call fails
    return {
      isValid: true,
      score: 65,
      detailedScores: {
        keywordMatch: 60,
        formatting: 70,
        sectionPresence: 65,
        readability: 75,
        length: 65,
        bbbeeCompliance: 50,
        nqfAlignment: 60,
        localCertifications: 55
      },
      recommendations: [
        "Consider adding more industry-specific keywords",
        "Ensure your CV includes your B-BBEE status if applicable",
        "Add NQF levels for your qualifications",
        "Make sure your contact details are clearly visible at the top"
      ]
    };
  }
};

/**
 * Helper function to call DeepSeek API
 */
async function callDeepSeekAPI(prompt: string): Promise<string> {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepSeek API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Parse scores from the AI response
 */
export const parseScoresFromResponse = (response: string): Record<string, number> => {
  try {
    const parsedData = JSON.parse(response);
    
    // Extract all number scores from the response
    const scores: Record<string, number> = {};
    
    // Add main scores
    if (typeof parsedData.overall === 'number') scores.overall = parsedData.overall;
    if (typeof parsedData.keywordMatch === 'number') scores.keywordMatch = parsedData.keywordMatch;
    if (typeof parsedData.formatting === 'number') scores.formatting = parsedData.formatting;
    if (typeof parsedData.sectionPresence === 'number') scores.sectionPresence = parsedData.sectionPresence;
    if (typeof parsedData.readability === 'number') scores.readability = parsedData.readability;
    if (typeof parsedData.length === 'number') scores.length = parsedData.length;
    
    // Add South African specific scores if available
    if (parsedData.southAfricanSpecific) {
      const sa = parsedData.southAfricanSpecific;
      if (typeof sa.bbbeeCompliance === 'number') scores.bbbeeCompliance = sa.bbbeeCompliance;
      if (typeof sa.nqfAlignment === 'number') scores.nqfAlignment = sa.nqfAlignment;
      if (typeof sa.localCertifications === 'number') scores.localCertifications = sa.localCertifications;
    }
    
    return scores;
  } catch (error) {
    console.error("Error parsing scores from response:", error);
    // Return default scores if parsing fails
    return {
      overall: 65,
      keywordMatch: 60,
      formatting: 70,
      sectionPresence: 65,
      readability: 75,
      length: 65,
      bbbeeCompliance: 50,
      nqfAlignment: 60,
      localCertifications: 55
    };
  }
};

/**
 * Parse recommendations from the AI response
 */
export const parseRecommendationsFromResponse = (response: string): string[] => {
  try {
    const parsedData = JSON.parse(response);
    
    if (Array.isArray(parsedData.recommendations)) {
      return parsedData.recommendations;
    }
    
    return [];
  } catch (error) {
    console.error("Error parsing recommendations from response:", error);
    return [
      "Consider adding more industry-specific keywords",
      "Ensure your CV includes your B-BBEE status if applicable",
      "Add NQF levels for your qualifications",
      "Make sure your contact details are clearly visible at the top"
    ];
  }
};

/**
 * Simple hash function for caching
 */
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(16);
}

// Keep export names consistent with the previous implementation
export { validateCVWithGemini as validateCVWithDeepSeek };
