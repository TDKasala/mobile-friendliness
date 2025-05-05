
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { validateCVWithAI } from "@/services/cv-validation-service";
import { validateFileMetadata } from "@/utils/cv-analysis/file-validator";

// Types for CV validation
export interface ValidationResult {
  isValid: boolean;
  reason?: string;
  score?: number;
}

export interface CVValidationHook {
  isValidating: boolean;
  validateCV: (file: File) => Promise<boolean>;
  validateCVContent: (file: File) => Promise<ValidationResult>;
  fileValidationError: string | null;
  resetValidationErrors: () => void;
}

/**
 * Hook for CV validation functionality
 * Handles validation of CV files and their content using DeepSeek API
 */
export function useCVValidation(): CVValidationHook {
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [fileValidationError, setFileValidationError] = useState<string | null>(null);
  const { toast } = useToast();

  // Reset validation errors
  const resetValidationErrors = useCallback(() => {
    setFileValidationError(null);
  }, []);

  // Main CV validation function - now more lenient
  const validateCV = useCallback(async (file: File): Promise<boolean> => {
    setIsValidating(true);
    resetValidationErrors();
    
    try {
      // Check file metadata first (size, type)
      const metadataValidation = validateFileMetadata(file);
      if (!metadataValidation.isValid) {
        setFileValidationError(metadataValidation.reason || "Invalid file");
        toast({
          title: "Invalid File",
          description: metadataValidation.reason || "The file doesn't meet our requirements.",
          variant: "destructive",
        });
        return false;
      }
      
      // For better user experience, accept all files that pass basic validation
      // The actual AI validation will happen during the analysis step
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setFileValidationError("Validation error");
      toast({
        title: "Validation Error",
        description: `Failed to validate your CV: ${errorMessage}`,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [toast, resetValidationErrors]);

  // More detailed CV content validation with DeepSeek
  const validateCVContent = useCallback(async (file: File): Promise<ValidationResult> => {
    try {
      // First validate file metadata
      const metadataValidation = validateFileMetadata(file);
      if (!metadataValidation.isValid) {
        return metadataValidation;
      }
      
      // Then validate content with DeepSeek - now just for analysis, not blocking upload
      return await validateCVWithAI(file);
    } catch (error) {
      console.error("Error validating CV content:", error);
      return {
        isValid: true, // Default to accepting the file even if validation fails
        reason: "Error validating CV content"
      };
    }
  }, []);

  return {
    isValidating,
    validateCV,
    validateCVContent,
    fileValidationError,
    resetValidationErrors
  };
}
