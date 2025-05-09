
/**
 * CV analysis using DeepSeek AI
 */

import { ValidationResult } from "@/hooks/use-cv-validation";
import { createValidationCache } from "./validation-cache";
import { callDeepSeekAPI, hashString } from "./api-client";
import { parseScoresFromResponse, parseScoreExplanationsFromResponse, parseRecommendationsFromResponse } from "./response-parsers";
import { generateCVAnalysisPrompt } from "./deepseek-prompts";
import { generateDefaultAnalysisResult } from "./default-results";
import { KEYWORDS, isValidCV } from "./cv-validator";
import { generateRealisticCVScore } from "@/utils/report-generator";

// Cache system for API responses
const apiCache = createValidationCache();

/**
 * Analyzes CV text content for ATS scoring with South African context
 */
export const analyzeCVWithDeepSeek = async (cvText: string, jobDescription?: string): Promise<ValidationResult> => {
  try {
    // First, check if this is a valid CV
    const validationResult = isValidCV(cvText);
    if (!validationResult.isValid) {
      return {
        isValid: false,
        reason: validationResult.reason || "This doesn't appear to be a valid CV",
        score: 0
      };
    }
    
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

    try {
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
        // Use fallback score generation if parsing fails
        return generateFallbackAnalysis(cvText, jobDescription);
      }
    } catch (error) {
      console.error("Error calling DeepSeek API:", error);
      return generateFallbackAnalysis(cvText, jobDescription);
    }
  } catch (error) {
    console.error("Error analyzing CV with DeepSeek:", error);
    return generateDefaultAnalysisResult();
  }
};

/**
 * Generate fallback analysis when API calls fail
 * Uses the generateRealisticCVScore function to create appropriate scores
 */
const generateFallbackAnalysis = (cvText: string, jobDescription?: string): ValidationResult => {
  // Generate realistic scores based on actual CV content
  const scores = generateRealisticCVScore(cvText, jobDescription);
  
  // Create feedback based on scores
  const generateFeedback = (score: number, aspect: string): string => {
    if (score >= 85) return `Your CV has excellent ${aspect}`;
    if (score >= 70) return `Your CV has good ${aspect}`;
    if (score >= 50) return `Your CV has average ${aspect} and could be improved`;
    return `Your CV needs significant improvement in ${aspect}`;
  };
  
  return {
    isValid: true,
    score: scores.overall,
    detailedScores: {
      keywordMatch: scores.keywordMatch || 0,
      formatting: scores.formatting || 0,
      sectionPresence: scores.sectionPresence || 0,
      readability: scores.readability || 0,
      length: scores.length || 0,
      atsCompatibility: scores.contentRelevance || 0,
      nqfAlignment: scores.saQualifications || 0
    },
    scoreExplanations: {
      keywordMatch: generateFeedback(scores.keywordMatch || 0, "keyword optimization"),
      formatting: generateFeedback(scores.formatting || 0, "formatting"),
      sectionPresence: generateFeedback(scores.sectionPresence || 0, "structure"),
      readability: generateFeedback(scores.readability || 0, "readability"),
      length: generateFeedback(scores.length || 0, "length"),
      atsCompatibility: generateFeedback(scores.contentRelevance || 0, "ATS compatibility"),
      nqfAlignment: generateFeedback(scores.saQualifications || 0, "South African qualification alignment")
    },
    recommendations: [
      {
        id: "kw-1",
        text: scores.keywordMatch < 70 ? "Add more industry-specific keywords to improve ATS match rate" : "Your keyword usage is good",
        priority: scores.keywordMatch < 70 ? "high" : "low",
        category: "Keywords"
      },
      {
        id: "fmt-1",
        text: scores.formatting < 70 ? "Improve your CV formatting to be more ATS-friendly" : "Your formatting is good",
        priority: scores.formatting < 70 ? "high" : "low",
        category: "Formatting"
      },
      {
        id: "str-1",
        text: scores.sectionPresence < 70 ? "Ensure all key sections are included in your CV" : "Your CV structure is good",
        priority: scores.sectionPresence < 70 ? "high" : "low",
        category: "Structure"
      }
    ]
  };
};
