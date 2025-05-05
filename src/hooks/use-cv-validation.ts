
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
 * Handles validation of CV files and their content
 */
export function useCVValidation(): CVValidationHook {
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [fileValidationError, setFileValidationError] = useState<string | null>(null);
  const { toast } = useToast();

  // Reset validation errors
  const resetValidationErrors = useCallback(() => {
    setFileValidationError(null);
  }, []);

  // Main CV validation function
  const validateCV = useCallback(async (file: File): Promise<boolean> => {
    setIsValidating(true);
    resetValidationErrors();
    
    try {
      // Check file metadata first
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
      
      // Validate CV content with AI
      const result = await validateCVWithAI(file);
      
      if (!result.isValid) {
        setFileValidationError(result.reason || "Invalid CV content");
        toast({
          title: "Invalid CV",
          description: result.reason || "The uploaded file doesn't appear to be a CV. Please check and try again.",
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "CV Validated",
        description: "Your CV has been validated and is ready for analysis.",
      });
      
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

  // More detailed CV content validation
  const validateCVContent = useCallback(async (file: File): Promise<ValidationResult> => {
    try {
      // First validate file metadata
      const metadataValidation = validateFileMetadata(file);
      if (!metadataValidation.isValid) {
        return metadataValidation;
      }
      
      // Then validate content with AI
      return await validateCVWithAI(file);
    } catch (error) {
      console.error("Error validating CV content:", error);
      return {
        isValid: false,
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
