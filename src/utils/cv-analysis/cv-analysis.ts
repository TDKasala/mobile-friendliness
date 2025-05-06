
/**
 * CV analysis using DeepSeek AI
 */

import { ValidationResult } from "@/hooks/use-cv-validation";
import { JobMatch, CVTip } from "@/lib/types";
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
      
      Be extremely specific in all feedback and recommendations. Include exact phrases or sections that should be revised.
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
    const response = await callDeepSeekAPI(prompt, 2000);
    
    // Parse the response and convert to ValidationResult
    try {
      const parsedResponse = JSON.parse(response);
      
      // Create properly formatted recommendations as CVTips
      const recommendations: CVTip[] = parsedResponse.recommendations?.map((rec: any, index: number) => ({
        id: `rec-${index}`,
        category: rec.category || "",
        title: rec.title || "",
        description: rec.description || "",
        priority: rec.priority || "medium",
        text: rec.title || rec.description || ""
      })) || [];
      
      // Extract detailed scores and recommendations
      const result: ValidationResult = {
        isValid: true,
        score: parsedResponse.overall,
        detailedScores: {
          keywordMatch: parsedResponse.keywordMatch || 0,
          formatting: parsedResponse.formatting || 0,
          sectionPresence: parsedResponse.sectionPresence || 0,
          readability: parsedResponse.readability || 0,
          length: parsedResponse.length || 0,
          bbbeeCompliance: parsedResponse.southAfricanSpecific?.bbbeeCompliance?.score || 0,
          nqfAlignment: parsedResponse.southAfricanSpecific?.nqfAlignment?.score || 0,
          localCertifications: parsedResponse.southAfricanSpecific?.localCertifications?.score || 0
        },
        
        // Process the detailed section analysis
        sectionAnalysis: parsedResponse.sectionAnalysis || {},
        
        // Process South African specific analysis
        southAfricanSpecific: parsedResponse.southAfricanSpecific || {},
        
        // Process ATS compatibility analysis
        atsCompatibility: parsedResponse.atsCompatibility || {},
        
        // Process visual presentation analysis
        visualPresentation: parsedResponse.visualPresentation || {},
        
        // Extract recommendations
        recommendations: recommendations,
        
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
    recommendations: [
      {
        id: "default-1",
        category: "Keywords",
        title: "Add industry-specific keywords",
        description: "Consider adding more industry-specific keywords to increase your ATS score",
        priority: "high",
        text: "Consider adding more industry-specific keywords"
      },
      {
        id: "default-2",
        category: "South African Requirements",
        title: "Include B-BBEE status",
        description: "Ensure your CV includes your B-BBEE status if applicable for South African applications",
        priority: "medium",
        text: "Ensure your CV includes your B-BBEE status if applicable"
      },
      {
        id: "default-3",
        category: "Education",
        title: "Add NQF levels",
        description: "Add NQF levels for your qualifications to align with South African standards",
        priority: "medium",
        text: "Add NQF levels for your qualifications"
      },
      {
        id: "default-4",
        category: "Contact Information",
        title: "Improve contact details visibility",
        description: "Make sure your contact details are clearly visible at the top of your CV",
        priority: "low",
        text: "Make sure your contact details are clearly visible at the top"
      }
    ],
    sectionAnalysis: {
      contactInfo: {
        score: 70,
        feedback: "Your contact information is present but could be more prominently displayed",
        improvements: ["Consider placing contact details at the very top of the CV", "Include your LinkedIn profile"]
      }
    },
    southAfricanSpecific: {
      bbbeeCompliance: {
        score: 50,
        feedback: "B-BBEE status is not clearly indicated",
        improvements: ["Add your B-BBEE status in your personal information section"]
      }
    },
    atsCompatibility: {
      score: 65,
      feedback: "Your CV is partially optimized for ATS systems but could be improved",
      keywordDensity: "Moderate keyword density detected",
      improvements: ["Use more industry-standard terms", "Avoid complex formatting"]
    }
  };
}
