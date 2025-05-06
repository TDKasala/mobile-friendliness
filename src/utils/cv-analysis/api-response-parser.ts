
/**
 * Parse and process DeepSeek API responses
 */

import { CVTip } from "@/lib/types";

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
    
    // Add ATS compatibility scores if available
    if (parsedData.atsCompatibility && typeof parsedData.atsCompatibility.score === 'number') {
      scores.atsCompatibility = parsedData.atsCompatibility.score;
    }
    
    // Add visual presentation scores if available
    if (parsedData.visualPresentation && typeof parsedData.visualPresentation.score === 'number') {
      scores.visualPresentation = parsedData.visualPresentation.score;
    }
    
    // Add South African specific scores if available
    if (parsedData.southAfricanSpecific) {
      const sa = parsedData.southAfricanSpecific;
      
      if (sa.bbbeeCompliance && typeof sa.bbbeeCompliance.score === 'number') {
        scores.bbbeeCompliance = sa.bbbeeCompliance.score;
      }
      
      if (sa.nqfAlignment && typeof sa.nqfAlignment.score === 'number') {
        scores.nqfAlignment = sa.nqfAlignment.score;
      }
      
      if (sa.localCertifications && typeof sa.localCertifications.score === 'number') {
        scores.localCertifications = sa.localCertifications.score;
      }
      
      if (sa.localRelevance && typeof sa.localRelevance.score === 'number') {
        scores.localRelevance = sa.localRelevance.score;
      }
    }
    
    // Add section analysis scores if available
    if (parsedData.sectionAnalysis) {
      Object.entries(parsedData.sectionAnalysis).forEach(([sectionName, sectionData]: [string, any]) => {
        if (sectionData && typeof sectionData.score === 'number') {
          scores[`section_${sectionName}`] = sectionData.score;
        }
      });
    }
    
    // Add job match section scores if available
    if (parsedData.jobMatch && parsedData.jobMatch.sectionMatches) {
      Object.entries(parsedData.jobMatch.sectionMatches).forEach(([sectionName, score]: [string, any]) => {
        if (typeof score === 'number') {
          scores[`jobMatch_${sectionName}`] = score;
        }
      });
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
export const parseRecommendationsFromResponse = (response: string): CVTip[] => {
  try {
    const parsedData = JSON.parse(response);
    
    if (Array.isArray(parsedData.recommendations)) {
      return parsedData.recommendations.map((rec: any, index: number) => ({
        id: `parsed-rec-${index}`,
        category: rec.category || "",
        title: rec.title || "",
        description: rec.description || "",
        priority: rec.priority || "medium",
        text: rec.title || rec.description || "" // For backward compatibility
      }));
    }
    
    // Collect section-level recommendations for a more comprehensive list
    let allRecommendations: CVTip[] = [];
    
    // Extract recommendations from section analysis
    if (parsedData.sectionAnalysis) {
      Object.entries(parsedData.sectionAnalysis).forEach(([sectionName, sectionData]: [string, any], sectionIndex: number) => {
        if (sectionData && Array.isArray(sectionData.improvements)) {
          sectionData.improvements.forEach((improvement: string, impIndex: number) => {
            allRecommendations.push({
              id: `section-${sectionName}-${impIndex}`,
              category: sectionName.charAt(0).toUpperCase() + sectionName.slice(1),
              title: improvement,
              description: improvement,
              priority: sectionData.score < 50 ? "high" : sectionData.score < 70 ? "medium" : "low",
              text: improvement
            });
          });
        }
      });
    }
    
    // Extract recommendations from South African specific analysis
    if (parsedData.southAfricanSpecific) {
      Object.entries(parsedData.southAfricanSpecific).forEach(([aspectName, aspectData]: [string, any], aspectIndex: number) => {
        if (aspectData && Array.isArray(aspectData.improvements)) {
          aspectData.improvements.forEach((improvement: string, impIndex: number) => {
            allRecommendations.push({
              id: `sa-${aspectName}-${impIndex}`,
              category: "South African Requirements",
              title: improvement,
              description: improvement,
              priority: aspectData.score < 50 ? "high" : aspectData.score < 70 ? "medium" : "low",
              text: improvement
            });
          });
        }
      });
    }
    
    // Extract recommendations from ATS compatibility
    if (parsedData.atsCompatibility && Array.isArray(parsedData.atsCompatibility.improvements)) {
      parsedData.atsCompatibility.improvements.forEach((improvement: string, impIndex: number) => {
        allRecommendations.push({
          id: `ats-${impIndex}`,
          category: "ATS Compatibility",
          title: improvement,
          description: improvement,
          priority: parsedData.atsCompatibility.score < 50 ? "high" : parsedData.atsCompatibility.score < 70 ? "medium" : "low",
          text: improvement
        });
      });
    }
    
    // Limit recommendations to avoid overwhelming the user
    return allRecommendations.length > 0 ? allRecommendations.slice(0, 10) : [
      {
        id: "default-kw-1",
        category: "Keywords",
        title: "Add industry-specific keywords",
        description: "Consider adding more industry-specific keywords to increase your ATS score",
        priority: "high",
        text: "Consider adding more industry-specific keywords"
      },
      {
        id: "default-sa-1",
        category: "South African Requirements",
        title: "Include B-BBEE status",
        description: "Ensure your CV includes your B-BBEE status if applicable for South African applications",
        priority: "medium",
        text: "Ensure your CV includes your B-BBEE status if applicable"
      },
      {
        id: "default-ed-1",
        category: "Education",
        title: "Add NQF levels",
        description: "Add NQF levels for your qualifications to align with South African standards",
        priority: "medium",
        text: "Add NQF levels for your qualifications"
      },
      {
        id: "default-ci-1",
        category: "Contact Information",
        title: "Improve contact details visibility",
        description: "Make sure your contact details are clearly visible at the top of your CV",
        priority: "low",
        text: "Make sure your contact details are clearly visible at the top"
      }
    ];
  } catch (error) {
    console.error("Error parsing recommendations from response:", error);
    return [
      {
        id: "error-kw-1",
        category: "Keywords",
        title: "Add industry-specific keywords",
        description: "Consider adding more industry-specific keywords",
        priority: "high",
        text: "Consider adding more industry-specific keywords"
      },
      {
        id: "error-sa-1",
        category: "South African Requirements",
        title: "Include B-BBEE status",
        description: "Ensure your CV includes your B-BBEE status if applicable",
        priority: "medium",
        text: "Ensure your CV includes your B-BBEE status if applicable"
      },
      {
        id: "error-ed-1",
        category: "Education",
        title: "Add NQF levels",
        description: "Add NQF levels for your qualifications",
        priority: "medium",
        text: "Add NQF levels for your qualifications"
      },
      {
        id: "error-ci-1",
        category: "Contact Information",
        title: "Improve contact details visibility",
        description: "Make sure your contact details are clearly visible at the top",
        priority: "low",
        text: "Make sure your contact details are clearly visible at the top"
      }
    ];
  }
};
