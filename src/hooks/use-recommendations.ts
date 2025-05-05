
import { useState } from "react";
import { CVScore, CVTip, JobMatch, KeywordMatch } from "@/lib/types";

export function useRecommendations() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<CVTip[]>([]);

  /**
   * Generate recommendations based on CV score and job match
   */
  const generateRecommendations = async (
    score: CVScore,
    jobMatch: JobMatch | null,
    tier: "free" | "premium" | "pay-per-use" = "free"
  ) => {
    setIsGenerating(true);
    
    try {
      // Generate recommendations based on CV score and job match
      const cvRecommendations = generateCVRecommendations(score);
      
      // Generate job match recommendations if job match data exists
      const jobMatchRecommendations = 
        jobMatch ? generateJobMatchRecommendations(jobMatch) : [];
        
      // Combine all recommendations
      const allRecommendations = [...cvRecommendations, ...jobMatchRecommendations];
      
      // Sort by priority
      const sortedRecommendations = allRecommendations.sort((a, b) => {
        const priorityValue = { high: 3, medium: 2, low: 1 };
        return priorityValue[b.priority] - priorityValue[a.priority];
      });
      
      // Limit recommendations based on tier
      const limitedRecommendations = 
        tier === "free" ? sortedRecommendations.slice(0, 3) :
        tier === "pay-per-use" ? sortedRecommendations.slice(0, 5) :
        sortedRecommendations;
      
      setRecommendations(limitedRecommendations);
    } catch (error) {
      console.error("Error generating recommendations:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    recommendations,
    generateRecommendations,
    clearRecommendations: () => setRecommendations([])
  };
}

/**
 * Generate recommendations based on CV score
 */
function generateCVRecommendations(score: CVScore): CVTip[] {
  const recommendations: CVTip[] = [];

  // Add recommendations based on formatting score
  if (score.formatting < 70) {
    recommendations.push({
      id: "format-1",
      title: "Improve CV Formatting",
      text: "Use clear section headings and bullet points for better readability.",
      priority: "high",
      section: "formatting"
    });
  }

  // Add recommendations based on keyword match score
  if (score.keywordMatch < 70) {
    recommendations.push({
      id: "keyword-1",
      title: "Enhance ATS Keywords",
      text: "Add more industry-specific keywords relevant to your target positions.",
      priority: "high",
      section: "keywords"
    });
  }

  // Add recommendations based on section presence score
  if (score.sectionPresence < 70) {
    recommendations.push({
      id: "section-1",
      title: "Add Missing Sections",
      text: "Ensure your CV includes all key sections: Summary, Experience, Skills, Education.",
      priority: "medium",
      section: "structure"
    });
  }

  // Add recommendations based on readability score
  if (score.readability < 70) {
    recommendations.push({
      id: "read-1",
      title: "Improve Readability",
      text: "Use shorter sentences and bullet points to improve readability.",
      priority: "medium",
      section: "content"
    });
  }

  // Add recommendations based on length score
  if (score.length < 70) {
    recommendations.push({
      id: "length-1",
      title: "Optimize CV Length",
      text: "Your CV should ideally be 1-2 pages for most positions.",
      priority: "low",
      section: "formatting"
    });
  }
  
  // South African specific recommendations
  if (score.bbbeeCompliance !== undefined && score.bbbeeCompliance < 70) {
    recommendations.push({
      id: "za-1",
      title: "Add B-BBEE Information",
      text: "Include your B-BBEE status level to improve South African job applications.",
      priority: "medium",
      section: "south-africa"
    });
  }
  
  if (score.saQualifications !== undefined && score.saQualifications < 70) {
    recommendations.push({
      id: "za-2",
      title: "Specify NQF Levels",
      text: "Include NQF levels for all qualifications to align with SA requirements.",
      priority: "medium",
      section: "education"
    });
  }

  return recommendations;
}

/**
 * Generate recommendations based on job match
 */
function generateJobMatchRecommendations(jobMatch: JobMatch): CVTip[] {
  const recommendations: CVTip[] = [];
  
  // Add recommendation based on overall match score
  if (jobMatch.score < 70) {
    recommendations.push({
      id: "job-1",
      title: "Tailor Your CV",
      text: "Your CV needs more customization for this specific job.",
      priority: "high",
      section: "job-match"
    });
  }
  
  // Add recommendations for missing keywords
  if (jobMatch.missingKeywords && jobMatch.missingKeywords.length > 0) {
    recommendations.push({
      id: "job-2",
      title: "Add Missing Keywords",
      text: `Consider adding these missing keywords: ${jobMatch.missingKeywords.slice(0, 3).join(", ")}${jobMatch.missingKeywords.length > 3 ? "..." : ""}`,
      priority: "high",
      section: "keywords"
    });
  }
  
  // Add recommendations based on high importance missing keywords
  if (jobMatch.matchedKeywords && jobMatch.matchedKeywords.length > 0) {
    const missingHighImportance = jobMatch.matchedKeywords
      .filter(k => !k.present && k.importance === "high")
      .map(k => k.keyword);
      
    if (missingHighImportance.length > 0) {
      recommendations.push({
        id: "job-3",
        title: "Critical Keywords Missing",
        text: `Add these critical keywords: ${missingHighImportance.join(", ")}`,
        priority: "high",
        section: "keywords"
      });
    }
  }
  
  return recommendations;
}
