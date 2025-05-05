
/**
 * Parse and process DeepSeek API responses
 */

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
    
    // Add South African specific scores if available
    if (parsedData.southAfricanSpecific) {
      const sa = parsedData.southAfricanSpecific;
      if (typeof sa.bbbeeCompliance === 'number') scores.bbbeeCompliance = sa.bbbeeCompliance;
      if (typeof sa.nqfAlignment === 'number') scores.nqfAlignment = sa.nqfAlignment;
      if (typeof sa.localCertifications === 'number') scores.localCertifications = sa.localCertifications;
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
export const parseRecommendationsFromResponse = (response: string): string[] => {
  try {
    const parsedData = JSON.parse(response);
    
    if (Array.isArray(parsedData.recommendations)) {
      return parsedData.recommendations;
    }
    
    return [];
  } catch (error) {
    console.error("Error parsing recommendations from response:", error);
    return [
      "Consider adding more industry-specific keywords",
      "Ensure your CV includes your B-BBEE status if applicable",
      "Add NQF levels for your qualifications",
      "Make sure your contact details are clearly visible at the top"
    ];
  }
};
