
/**
 * DeepSeek API integration for CV validation and analysis
 * Main module that exports all DeepSeek API functionality
 */

// Import all functionality from refactored modules
import { validateCVWithDeepSeek } from "./cv-validation";
import { analyzeCVWithDeepSeek } from "./cv-analysis";
import { 
  parseScoresFromResponse, 
  parseScoreExplanationsFromResponse, 
  parseRecommendationsFromResponse 
} from "./response-parsers";

// Export the functions for backward compatibility
export {
  validateCVWithDeepSeek,
  analyzeCVWithDeepSeek,
  parseScoresFromResponse,
  parseScoreExplanationsFromResponse,
  parseRecommendationsFromResponse
};

// Export functions with appropriate aliases to maintain backward compatibility with Gemini naming
export {
  validateCVWithDeepSeek as validateCVWithGemini,
  analyzeCVWithDeepSeek as analyzeCVWithGemini
};
