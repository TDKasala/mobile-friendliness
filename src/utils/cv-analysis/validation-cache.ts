
import { ValidationResult } from "@/services/cv-validation-service";

/**
 * Cache implementation for CV validation results
 */
export const createValidationCache = () => {
  const cache = new Map<string, ValidationResult>();
  
  return {
    get: (fileHash: string): ValidationResult | undefined => {
      return cache.get(fileHash);
    },
    set: (fileHash: string, result: ValidationResult): void => {
      cache.set(fileHash, result);
    },
    // Track cache stats for cost optimization
    getStats: () => ({
      cacheSize: cache.size,
      hitRate: 0 // In a real implementation, we'd track hits and misses
    })
  };
};

// Track downloaded CVs for validation
export const downloadedCVCache = new Map<string, boolean>();
export const validationScoreCache = new Map<string, ValidationResult>();
