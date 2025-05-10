
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
    
    # ATS Boost Match Report Instructions
    Generate a detailed ATS Boost Match Report that evaluates how well the CV aligns with ATS requirements and (if provided) the job description. Calculate an overall score from 1-100% based on the following weighted criteria:
    - 40% hard skills match
    - 20% soft skills match
    - 20% searchability/ATS compatibility
    - 20% recruiter tips compliance
    
    Provide detailed feedback in JSON format with the following structure:
    
    {
      "overall": number from 0-100 (overall ATS score),
      
      "searchability": {
        "score": number from 0-100,
        "issues": number of issues found,
        "contactInformation": {
          "status": "Found" or "Not Found" or "Partial",
          "feedback": "Detailed feedback on contact information",
          "recommendation": "Specific action to improve"
        },
        "sectionHeadings": {
          "status": "Found" or "Not Found" or "Partial",
          "feedback": "Detailed feedback on section headings",
          "recommendation": "Specific action to improve"
        },
        "jobTitleMatch": {
          "status": "Found" or "Not Found",
          "feedback": "Detailed feedback on job title match",
          "recommendation": "Specific action to improve"
        },
        "dateFormatting": {
          "status": "Good" or "Inconsistent" or "Missing",
          "feedback": "Detailed feedback on date formatting",
          "recommendation": "Specific action to improve"
        },
        "educationMatch": {
          "status": "Good" or "Partial" or "Missing",
          "feedback": "Detailed feedback on education requirements",
          "recommendation": "Specific action to improve"
        },
        "fileTypeCompatibility": {
          "status": "Good" or "Potential Issues",
          "feedback": "Detailed feedback on file format",
          "recommendation": "Specific action to improve"
        }
      },
      
      "hardSkills": {
        "score": number from 0-100,
        "issues": number of issues found,
        "matches": [
          {
            "skill": "skill name from job description",
            "resumeCount": number or 0,
            "jobCount": number
          }
        ],
        "missingSkills": ["skill1", "skill2"],
        "feedback": "Overall feedback on hard skills match",
        "recommendation": "Specific action to improve hard skills match"
      },
      
      "softSkills": {
        "score": number from 0-100,
        "issues": number of issues found,
        "matches": [
          {
            "skill": "soft skill name from job description",
            "resumeCount": number or 0,
            "jobCount": number
          }
        ],
        "missingSkills": ["skill1", "skill2"],
        "feedback": "Overall feedback on soft skills match",
        "recommendation": "Specific action to improve soft skills match"
      },
      
      "recruiterTips": {
        "score": number from 0-100,
        "issues": number of issues found,
        "jobLevelMatch": {
          "observation": "Detailed observation on job level match",
          "recommendation": "Specific action to improve"
        },
        "measurableResults": {
          "observation": "Detailed observation on measurable results",
          "recommendation": "Specific action to improve"
        },
        "resumeTone": {
          "observation": "Detailed observation on resume tone",
          "recommendation": "Specific action to improve"
        },
        "webPresence": {
          "observation": "Detailed observation on web presence",
          "recommendation": "Specific action to improve"
        },
        "wordCount": {
          "observation": "Detailed observation on word count",
          "recommendation": "Specific action to improve"
        }
      },
      
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
        "jobTitle": "extracted job title from the job description",
        "company": "extracted company name from the job description if available",
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

/**
 * Generates a detailed ATS match report prompt
 * This is specifically for generating a comprehensive ATS Match Report
 */
export function generateATSMatchReportPrompt(cvText: string, jobDescription: string, companyName?: string, companyWebsite?: string): string {
  return `
    # ATS Boost Match Report Generation
    
    Generate a comprehensive ATS Boost Match Report that evaluates how well the provided resume matches the job description and ATS requirements. The report should be professional, concise, and provide clear, actionable recommendations.
    
    ## Input Data
    Resume Text: The resume text is provided below.
    Job Description: The job description text is provided below.
    Company: ${companyName || "Not specified"}
    Company Website: ${companyWebsite || "Not specified"}
    
    ## Output Requirements
    Generate a structured ATS Boost Match Report in JSON format with the following sections:
    
    {
      "reportTitle": "ATS Boost Match Report",
      "jobTitle": "Extract job title from job description",
      "company": "${companyName || "Not specified"}",
      "overallScore": {
        "score": number from 1-100,
        "explanation": "Brief explanation of the score",
        "recommendation": "Brief overall recommendation"
      },
      "searchability": {
        "issuesFound": number of issues found,
        "atsTip": "Feedback on ATS compatibility",
        "contactInformation": {
          "status": "Found/Not Found/Partial",
          "feedback": "Why this is important",
          "recommendation": "Specific action to improve"
        },
        "summary": {
          "status": "Found/Not Found/Partial", 
          "feedback": "Why this is important",
          "recommendation": "Specific action to improve"
        },
        "sectionHeadings": {
          "status": "Found/Not Found/Partial", 
          "feedback": "Why this is important",
          "recommendation": "Specific action to improve"
        },
        "jobTitleMatch": {
          "status": "Found/Not Found", 
          "feedback": "Why this is important",
          "recommendation": "Specific action to improve"
        },
        "dateFormatting": {
          "status": "Good/Inconsistent/Missing", 
          "feedback": "Why this is important",
          "recommendation": "Specific action to improve"
        },
        "educationMatch": {
          "status": "Good/Partial/Missing", 
          "feedback": "Why this is important",
          "recommendation": "Specific action to improve"
        },
        "fileType": {
          "status": "Good/Potential Issues", 
          "feedback": "Why this is important",
          "recommendation": "Specific action to improve"
        }
      },
      "hardSkills": {
        "issuesFound": number of issues found,
        "skills": [
          {
            "skill": "Skill name",
            "resumeCount": number or "×",
            "jobCount": number
          }
        ],
        "feedback": "Overall feedback on hard skills match",
        "recommendation": "Specific action to improve hard skills match"
      },
      "softSkills": {
        "issuesFound": number of issues found,
        "skills": [
          {
            "skill": "Soft skill name",
            "resumeCount": number or "×",
            "jobCount": number
          }
        ],
        "feedback": "Overall feedback on soft skills match",
        "recommendation": "Specific action to improve soft skills match"
      },
      "recruiterTips": {
        "issuesFound": number of issues found,
        "jobLevelMatch": {
          "observation": "Detailed observation on job level match",
          "recommendation": "Specific action to improve"
        },
        "measurableResults": {
          "observation": "Detailed observation on measurable results",
          "recommendation": "Specific action to improve"
        },
        "resumeTone": {
          "observation": "Detailed observation on resume tone",
          "recommendation": "Specific action to improve"
        },
        "webPresence": {
          "observation": "Detailed observation on web presence",
          "recommendation": "Specific action to improve"
        },
        "wordCount": {
          "observation": "Detailed observation on word count",
          "recommendation": "Specific action to improve"
        }
      },
      "southAfricanSpecific": {
        "bbbeeStatus": {
          "observation": "Observation about B-BBEE status",
          "recommendation": "Specific recommendation"
        },
        "nqfLevels": {
          "observation": "Observation about NQF levels",
          "recommendation": "Specific recommendation"
        },
        "localRelevance": {
          "observation": "Observation about South African market relevance",
          "recommendation": "Specific recommendation"
        }
      }
    }
    
    ## Guidelines
    - Calculate an overall score from 1-100% based on how well the resume matches the job description.
      - Use a weighted formula: 40% hard skills, 20% soft skills, 20% searchability, 20% recruiter tips.
      - If below 75%, indicate it needs improvement; recommend 75%+ for better interview chances.
    - For searchability, assess ATS compatibility factors like contact info, section headings, job title match, etc.
    - For hard skills, compare skills in the job description to those in the resume.
    - For soft skills, identify soft skills mentioned in the job description and check if they appear in the resume.
    - For recruiter tips, provide actionable insights on job level match, measurable results, resume tone, etc.
    - For South African specific items, assess B-BBEE status, NQF qualifications, and local market relevance.
    - Be specific and actionable in all feedback and recommendations.
    
    ## Resume Text:
    ${cvText.substring(0, 2500)}
    
    ## Job Description:
    ${jobDescription.substring(0, 1000)}
  `;
}

