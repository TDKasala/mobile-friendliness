
/**
 * DeepSeek API integration for CV validation and analysis
 * Main module that exports all DeepSeek API functionality
 */

// Import all functionality from other modules
import { validateCVWithDeepSeek } from "./cv-validation";
import { analyzeCVWithDeepSeek } from "./cv-analysis";
import { parseScoresFromResponse, parseRecommendationsFromResponse } from "./api-response-parser";

// Export the functions for backward compatibility
export {
  validateCVWithDeepSeek,
  analyzeCVWithDeepSeek,
  parseScoresFromResponse,
  parseRecommendationsFromResponse
};

// Export functions with appropriate aliases to maintain backward compatibility with Gemini naming
export {
  validateCVWithDeepSeek as validateCVWithGemini,
  analyzeCVWithDeepSeek as analyzeCVWithGemini
};
