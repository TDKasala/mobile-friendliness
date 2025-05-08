
/**
 * CV analysis using DeepSeek AI
 */

import { ValidationResult } from "@/hooks/use-cv-validation";
import { createValidationCache } from "./validation-cache";
import { callDeepSeekAPI, hashString } from "./api-client";
import { parseScoresFromResponse, parseScoreExplanationsFromResponse, parseRecommendationsFromResponse } from "./response-parsers";
import { generateCVAnalysisPrompt } from "./deepseek-prompts";
import { generateDefaultAnalysisResult } from "./default-results";

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

    // Generate prompt for DeepSeek API
    const prompt = generateCVAnalysisPrompt(cvText, jobDescription);

    // Increase max tokens to handle more detailed response
    const response = await callDeepSeekAPI(prompt, 2500);
    
    try {
      const parsedResponse = JSON.parse(response);
      
      // Process the different parts of the response
      const detailedScores = parseScoresFromResponse(response);
      const scoreExplanations = parseScoreExplanationsFromResponse(response);
      const recommendations = parseRecommendationsFromResponse(response);
      
      // Extract detailed scores and recommendations
      const result: ValidationResult = {
        isValid: true,
        score: parsedResponse.overall,
        detailedScores,
        scoreExplanations,
        
        // Process the detailed section analysis
        sectionAnalysis: parsedResponse.sectionAnalysis || {},
        
        // Process South African specific analysis
        southAfricanSpecific: parsedResponse.southAfricanSpecific || {},
        
        // Process ATS compatibility analysis
        atsCompatibility: parsedResponse.atsCompatibility || {},
        
        // Process visual presentation analysis
        visualPresentation: parsedResponse.visualPresentation || {},
        
        // Extract recommendations
        recommendations,
        
        // Handle job match if present
        jobMatchDetails: parsedResponse.jobMatch ? {
          score: parsedResponse.jobMatch.score || 0,
          matches: parsedResponse.jobMatch.matchedKeywords?.map((kw: any) => ({ 
            keyword: kw.keyword || "", 
            present: true,
            context: kw.context || "",
            strength: kw.strength || "moderate"
          })) || [],
          missingKeywords: parsedResponse.jobMatch.missingKeywords?.map((kw: any) => 
            kw.keyword || ""
          ) || [],
          recommendations: parsedResponse.jobMatch.tailoringRecommendations || [],
          sectionMatches: {
            experience: parsedResponse.jobMatch.sectionMatches?.experience,
            skills: parsedResponse.jobMatch.sectionMatches?.skills,
            education: parsedResponse.jobMatch.sectionMatches?.education
          },
          detailedFeedback: parsedResponse.jobMatch.detailedFeedback || ""
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
