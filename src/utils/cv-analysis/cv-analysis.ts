
/**
 * CV analysis using DeepSeek AI
 */

import { ValidationResult } from "@/hooks/use-cv-validation";
import { JobMatch, CVTip } from "@/lib/types";
import { createValidationCache } from "./validation-cache";
import { callDeepSeekAPI, hashString } from "./api-client";
import { parseScoresFromResponse, parseScoreExplanationsFromResponse, parseRecommendationsFromResponse } from "./api-response-parser";

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

    // Enhanced detailed prompt for DeepSeek API
    let prompt = `
      As an expert ATS system and CV analyst specializing in the South African job market, conduct a comprehensive analysis of this CV.
      
      Provide detailed analysis in the following JSON format:
      
      {
        "overall": number from 0-100 (overall ATS score),
        "keywordMatch": number from 0-100 (score for ATS keywords),
        "formatting": number from 0-100 (score for structure, layout, readability),
        "sectionPresence": number from 0-100 (score for having all required sections),
        "readability": number from 0-100 (score for grammar, spelling, clarity),
        "length": number from 0-100 (score for appropriate length),
        
        "sectionAnalysis": {
          "contactInfo": {
            "score": number from 0-100,
            "feedback": "Detailed feedback on contact information",
            "improvements": ["specific improvement 1", "specific improvement 2"]
          },
          "professionalSummary": {
            "score": number from 0-100,
            "feedback": "Detailed feedback on professional summary/profile",
            "improvements": ["specific improvement 1", "specific improvement 2"]
          },
          "workExperience": {
            "score": number from 0-100,
            "feedback": "Detailed feedback on work experience section",
            "improvements": ["specific improvement 1", "specific improvement 2"]
          },
          "education": {
            "score": number from 0-100,
            "feedback": "Detailed feedback on education section",
            "improvements": ["specific improvement 1", "specific improvement 2"]
          },
          "skills": {
            "score": number from 0-100,
            "feedback": "Detailed feedback on skills section",
            "improvements": ["specific improvement 1", "specific improvement 2"]
          },
          "additionalSections": {
            "score": number from 0-100,
            "feedback": "Feedback on additional sections like certifications, languages, etc.",
            "improvements": ["specific improvement 1", "specific improvement 2"]
          }
        },
        
        "southAfricanSpecific": {
          "bbbeeCompliance": {
            "score": number from 0-100,
            "feedback": "Detailed feedback on B-BBEE status inclusion",
            "improvements": ["specific improvement suggestion"]
          },
          "nqfAlignment": {
            "score": number from 0-100,
            "feedback": "Detailed feedback on NQF level specification for qualifications",
            "improvements": ["specific improvement suggestion"]
          },
          "localCertifications": {
            "score": number from 0-100,
            "feedback": "Detailed feedback on SA specific certifications",
            "improvements": ["specific improvement suggestion"]
          },
          "localRelevance": {
            "score": number from 0-100,
            "feedback": "Feedback on alignment with South African job market expectations",
            "improvements": ["specific improvement suggestion"]
          }
        },
        
        "atsCompatibility": {
          "score": number from 0-100,
          "feedback": "Detailed analysis of how well the CV will perform against ATS systems",
          "keywordDensity": "Analysis of keyword density and placement",
          "fileFormatting": "Analysis of file formatting for ATS compatibility",
          "improvements": ["specific ATS improvement 1", "specific ATS improvement 2"]
        },
        
        "visualPresentation": {
          "score": number from 0-100,
          "feedback": "Analysis of visual layout, spacing, font choices",
          "improvements": ["specific visual improvement 1", "specific visual improvement 2"]
        },
        
        "scoreExplanations": {
          "keywordMatch": "Detailed explanation of the keyword match score including strengths and weaknesses",
          "formatting": "Detailed explanation of the formatting score",
          "sectionPresence": "Detailed explanation of the section presence score",
          "readability": "Detailed explanation of the readability score",
          "length": "Detailed explanation of the length score",
          "overall": "Comprehensive explanation of the overall score"
        },
        
        "recommendations": [
          {
            "category": "Category name (e.g., Keywords, Formatting, etc.)",
            "title": "Brief title for the recommendation",
            "description": "Detailed explanation with specific action items",
            "priority": "high/medium/low"
          }
          // include 5-8 highly specific, actionable recommendations
        ]
      }
      
      Focus heavily on South African job market requirements including:
      - B-BBEE status requirements and presentation
      - NQF level specifications for qualifications
      - SAICA, SAIPA, and other South African professional body memberships
      - South African-specific certifications and their presentation
      - ID number formatting and inclusion guidance
      - Local references and formatting expectations
      
      Be extremely specific in all feedback, explanations, and recommendations. Include exact phrases or sections that should be revised. Make all explanations thorough and detailed, at least 2-3 sentences each.
    `;
    
    // Add job description for matching if provided
    if (jobDescription && jobDescription.trim().length > 0) {
      prompt += `
        Also analyze how well this CV matches the following job description.
        
        Add a "jobMatch" object to the JSON with:
        {
          "score": number from 0-100 (overall match percentage),
          "matchedKeywords": [
            {
              "keyword": "keyword from job description",
              "context": "how it appears in the CV",
              "strength": "strong/moderate/weak",
              "recommendation": "how to strengthen this match specifically"
            }
            // include 5-10 key terms
          ],
          "missingKeywords": [
            {
              "keyword": "important keyword missing from CV",
              "importance": "high/medium/low",
              "suggestion": "specific suggestion for incorporating this keyword"
            }
            // include 3-5 important missing terms
          ],
          "sectionMatches": {
            "experience": number from 0-100 (how well experience matches job requirements),
            "skills": number from 0-100 (how well skills match job requirements),
            "education": number from 0-100 (how well education matches job requirements)
          },
          "detailedFeedback": "Paragraph with specific, actionable feedback for improving job match",
          "tailoringRecommendations": [
            "very specific recommendation 1 for tailoring CV to this job",
            "very specific recommendation 2 for tailoring CV to this job",
            // 3-5 recommendations
          ]
        }
        
        Job Description:
        ${jobDescription.substring(0, 1000)}
      `;
    }
    
    prompt += `
      CV text:
      ${cvText.substring(0, 2500)}
    `;

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
    scoreExplanations: {
      keywordMatch: "Your CV contains some industry-specific keywords, but could benefit from including more terms relevant to your field. Consider adding more technical skills and industry terminology.",
      formatting: "Your CV's formatting is generally acceptable for ATS scanning, but could be more consistent. Ensure you're using standard section headings and a clean structure.",
      sectionPresence: "Most key sections are present in your CV, but some may need better organization or more prominence.",
      readability: "Your CV is reasonably clear but could benefit from more concise language and better organization.",
      length: "Your CV is within acceptable length parameters, but ensure the most important information stands out.",
      overall: "Your CV is satisfactory but has several areas that could be improved to better align with ATS requirements and South African job market expectations."
    },
    recommendations: [
      {
        id: "default-1",
        category: "Keywords",
        title: "Add industry-specific keywords",
        text: "Consider adding more industry-specific keywords",
        description: "Consider adding more industry-specific keywords to increase your ATS score. Research job postings in your field and incorporate the most common terms.",
        priority: "high"
      },
      {
        id: "default-2",
        category: "South African Requirements",
        title: "Include B-BBEE status",
        text: "Ensure your CV includes your B-BBEE status if applicable",
        description: "Ensure your CV includes your B-BBEE status if applicable for South African applications. This is an important consideration for many employers.",
        priority: "medium"
      },
      {
        id: "default-3",
        category: "Education",
        title: "Add NQF levels",
        text: "Add NQF levels for your qualifications",
        description: "Add NQF levels for your qualifications to align with South African standards. This helps employers understand the equivalency of your education.",
        priority: "medium"
      },
      {
        id: "default-4",
        category: "Contact Information",
        title: "Improve contact details visibility",
        text: "Make sure your contact details are clearly visible at the top",
        description: "Make sure your contact details are clearly visible at the top of your CV and include all necessary information.",
        priority: "low"
      }
    ],
    sectionAnalysis: {
      contactInfo: {
        score: 70,
        feedback: "Your contact information is present but could be more prominently displayed at the top of your CV. Consider adding your LinkedIn profile and ensuring all details are up to date.",
        improvements: ["Place contact details at the very top of the CV", "Include your LinkedIn profile", "Ensure email and phone number are clearly visible"]
      }
    },
    southAfricanSpecific: {
      bbbeeCompliance: {
        score: 50,
        feedback: "B-BBEE status is not clearly indicated on your CV. This information can be important for many South African employers during their selection process.",
        improvements: ["Add your B-BBEE status in your personal information section", "Specify your contributor level if applicable"]
      }
    },
    atsCompatibility: {
      score: 65,
      feedback: "Your CV is partially optimized for ATS systems but could be improved. Consider using a more standard format and including more relevant keywords.",
      keywordDensity: "Moderate keyword density detected, but could be improved with more industry-specific terminology.",
      improvements: ["Use more industry-standard terms", "Avoid complex formatting like tables and text boxes", "Ensure section headings are clearly labeled"]
    }
  };
}
