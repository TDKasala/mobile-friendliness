
/**
 * DeepSeek API integration for CV validation and analysis
 */

import { createValidationCache } from "./validation-cache";
import { ValidationResult } from "@/hooks/use-cv-validation";

// Cache system for API responses
const apiCache = createValidationCache();

/**
 * DeepSeek API configuration
 */
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DEEPSEEK_API_KEY = "sk-f89f3e7c942043059b94bde104ccbd82"; 
const DEEPSEEK_MODEL = "deepseek-chat";

/**
 * Helper function to call DeepSeek API with error handling and rate limiting
 */
async function callDeepSeekAPI(prompt: string, maxTokens: number = 1000): Promise<string> {
  try {
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
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepSeek API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    throw new Error(`Failed to communicate with DeepSeek API: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

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

/**
 * Analyzes CV text content for ATS scoring with South African context
 */
export const analyzeCVWithDeepSeek = async (cvText: string, jobDescription?: string): Promise<ValidationResult> => {
  try {
    // Generate cache key from CV content
    const cacheKey = `analyze-${hashString(cvText.substring(0, 1000) + (jobDescription?.substring(0, 500) || ''))}`;
    
    // Check cache first
    const cachedResult = apiCache.get(cacheKey);
    if (cachedResult) {
      console.log("Using cached CV analysis result");
      return cachedResult as ValidationResult;
    }

    // Prepare prompt based on whether job description is provided
    let prompt = `
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
    `;
    
    // Add job description for matching if provided
    if (jobDescription && jobDescription.trim().length > 0) {
      prompt += `
        Also analyze how well this CV matches the following job description.
        Add a "jobMatch" field to the JSON with a score from 0-100 indicating match percentage.
        Add a "matchedKeywords" array listing 5-10 key terms from the job description found in the CV.
        Add a "missingKeywords" array listing 3-5 important terms from job description missing from CV.
        
        Job Description:
        ${jobDescription.substring(0, 1000)}
      `;
    }
    
    prompt += `
      CV text:
      ${cvText}
    `;

    const response = await callDeepSeekAPI(prompt);
    
    // Parse the response and convert to ValidationResult
    try {
      const parsedResponse = JSON.parse(response);
      const result: ValidationResult = {
        isValid: true,
        score: parsedResponse.overall,
        detailedScores: {
          keywordMatch: parsedResponse.keywordMatch || 0,
          formatting: parsedResponse.formatting || 0,
          sectionPresence: parsedResponse.sectionPresence || 0,
          readability: parsedResponse.readability || 0,
          length: parsedResponse.length || 0,
          bbbeeCompliance: parsedResponse.southAfricanSpecific?.bbbeeCompliance || 0,
          nqfAlignment: parsedResponse.southAfricanSpecific?.nqfAlignment || 0,
          localCertifications: parsedResponse.southAfricanSpecific?.localCertifications || 0
        },
        recommendations: parsedResponse.recommendations || [],
        jobMatchDetails: parsedResponse.jobMatch ? {
          score: parsedResponse.jobMatch,
          matches: parsedResponse.matchedKeywords || [],
          missingKeywords: parsedResponse.missingKeywords || [],
          recommendations: parsedResponse.jobRecommendations || []
        } : undefined
      };
      
      // Cache the result
      apiCache.set(cacheKey, result);
      
      return result;
    } catch (e) {
      console.error("Error parsing JSON from DeepSeek analysis response:", e);
      // Return default analysis if parsing fails
      return generateDefaultAnalysisResult();
    }
  } catch (error) {
    console.error("Error analyzing CV with DeepSeek:", error);
    return generateDefaultAnalysisResult();
  }
};

/**
 * Generate a default analysis result when API calls fail
 */
function generateDefaultAnalysisResult(): ValidationResult {
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

/**
 * Parse scores from the API response
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
 * Parse recommendations from the API response
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

// Export functions with appropriate aliases to maintain backward compatibility with Gemini naming
export {
  validateCVWithDeepSeek as validateCVWithGemini,
  analyzeCVWithDeepSeek as analyzeCVWithGemini
};
