
import { CVScore, CVTip } from "@/lib/types";
import { generatePdfReport } from "./cv-analysis/pdf-generator";
import { generateRealisticCVScore } from "./cv-analysis/score-generator";
import { isValidCV } from "./cv-analysis/cv-validator";
import { 
  validateCVWithGemini, 
  analyzeCVWithGemini, 
  parseScoresFromResponse, 
  parseRecommendationsFromResponse 
} from "./cv-analysis/deepseek-api";

// Export all functions to maintain backward compatibility
export { 
  generatePdfReport,
  generateRealisticCVScore,
  validateCVWithGemini,
  analyzeCVWithGemini,
  parseScoresFromResponse,
  parseRecommendationsFromResponse,
  isValidCV
};

// This specific function has been moved to cv-validation-service.ts but we
// re-export it here to maintain backwards compatibility
export { validateCVWithAI, trackCVDownload, validateDownloadedCV } from "@/services/cv-validation-service";
