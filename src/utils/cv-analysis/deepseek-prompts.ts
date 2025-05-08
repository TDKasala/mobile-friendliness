
/**
 * Prompts for DeepSeek API
 */

/**
 * Generates a detailed CV analysis prompt
 */
export function generateCVAnalysisPrompt(cvText: string, jobDescription?: string): string {
  // Base prompt with detailed analysis instructions
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
          "id": "unique-id-1", 
          "category": "Category name (e.g., Keywords, Formatting, etc.)",
          "title": "Brief title for the recommendation",
          "description": "Detailed explanation with specific action items",
          "priority": "high/medium/low",
          "text": "Brief action item"
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

  return prompt;
}

/**
 * Generates a simple CV validation prompt
 */
export function generateCVValidationPrompt(cvText: string): string {
  return `
    Analyze this text and determine if it's a CV/resume. 
    Return a JSON object with: 
    {
      "isCV": true/false,
      "confidence": 0-100 (how confident are you),
      "reason": "brief explanation"
    }
    
    Text to analyze:
    ${cvText.substring(0, 1500)}
  `;
}
