
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { validateCVWithAI } from "@/services/cv-validation-service";

interface UseValidationReturn {
  isValidating: boolean;
  validateCV: (file: File) => Promise<boolean>;
}

export function useCVValidation(): UseValidationReturn {
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const { toast } = useToast();

  const validateCV = async (file: File): Promise<boolean> => {
    setIsValidating(true);
    
    try {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 5MB. Please compress your CV and try again.",
          variant: "destructive",
        });
        return false;
      }
      
      // In a real implementation, this would call a backend API with Gemini integration
      const result = await validateCVWithAI(file);
      
      if (!result.isValid) {
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
      toast({
        title: "Validation Error",
        description: "Failed to validate your CV. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  return {
    isValidating,
    validateCV
  };
}
