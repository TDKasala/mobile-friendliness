
import { CVScore, CVTip } from "@/lib/types";
import { generatePdfReport } from "./cv-analysis/pdf-generator";
import { generateRealisticCVScore } from "./cv-analysis/score-generator";
import { validateCVContent, validateCVFile, trackCVDownload } from "./cv-analysis/cv-validator";
import { 
  callGeminiAPI, 
  validateCVWithGemini, 
  analyzeCVWithGemini, 
  parseScoresFromResponse, 
  parseRecommendationsFromResponse 
} from "./cv-analysis/gemini-api";

// Export all functions to maintain backward compatibility
export { 
  generatePdfReport,
  generateRealisticCVScore,
  validateCVContent,
  validateCVFile,
  trackCVDownload,
  callGeminiAPI,
  validateCVWithGemini,
  analyzeCVWithGemini,
  parseScoresFromResponse,
  parseRecommendationsFromResponse
};

// This specific function has been moved to cv-validation-service.ts but we
// re-export it here to maintain backwards compatibility
export { validateCVWithAI } from "@/services/cv-validation-service";
