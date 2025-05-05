
/**
 * CV analysis using DeepSeek AI
 */

import { ValidationResult } from "@/hooks/use-cv-validation";
import { JobMatch } from "@/lib/types";
import { createValidationCache } from "./validation-cache";
import { callDeepSeekAPI, hashString } from "./api-client";

// Cache system for API responses
const apiCache = createValidationCache();

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
          matches: parsedResponse.matchedKeywords?.map((keyword: string) => ({ 
            keyword, 
            present: true 
          })) || [],
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
