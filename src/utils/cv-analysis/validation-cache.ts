
import { ValidationResult } from "@/services/cv-validation-service";

/**
 * Enhanced cache implementation for CV validation results with statistics tracking
 */
export const createValidationCache = () => {
  const cache = new Map<string, ValidationResult>();
  let hits = 0;
  let misses = 0;
  
  return {
    /**
     * Get a validation result from cache
     * @param fileHash Unique hash for the file
     * @returns Cached validation result or undefined if not found
     */
    get: (fileHash: string): ValidationResult | undefined => {
      const result = cache.get(fileHash);
      if (result) {
        hits++;
      } else {
        misses++;
      }
      return result;
    },
    
    /**
     * Store a validation result in cache
     * @param fileHash Unique hash for the file
     * @param result Validation result to cache
     */
    set: (fileHash: string, result: ValidationResult): void => {
      cache.set(fileHash, result);
    },
    
    /**
     * Get cache statistics for monitoring
     * @returns Object with cache size and hit rate
     */
    getStats: () => ({
      cacheSize: cache.size,
      hits,
      misses,
      hitRate: hits + misses > 0 ? hits / (hits + misses) : 0
    }),
    
    /**
     * Clear the cache
     */
    clear: () => {
      cache.clear();
      hits = 0;
      misses = 0;
    }
  };
};

// For backward compatibility
export const downloadedCVCache = new Map<string, boolean>();
export const validationScoreCache = new Map<string, ValidationResult>();
