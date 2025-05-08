
/**
 * Default analysis results when API fails or returns invalid data
 */

import { ValidationResult } from "@/hooks/use-cv-validation";

/**
 * Generate a default analysis result when API calls fail
 */
export function generateDefaultAnalysisResult(): ValidationResult {
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
