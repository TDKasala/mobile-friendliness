
// This is a mock service that simulates how the CV validation would work with Gemini API
// In a real implementation, this would call a backend service that uses Gemini API

type ValidationResult = {
  isValid: boolean;
  reason?: string;
}

export const validateCVWithAI = async (file: File): Promise<ValidationResult> => {
  // In production, this would:
  // 1. Send the file to a serverless function
  // 2. The function would extract text from the PDF/DOCX
  // 3. Send the first 500 characters to Gemini API with a prompt to classify as CV or non-CV
  // 4. Return the result
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Checking file extension (basic validation - in real app, we'd use content)
  const validExtensions = ['.pdf', '.docx', '.doc', '.txt', '.odt'];
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  const isValidExtension = validExtensions.includes(fileExtension);
  
  if (!isValidExtension) {
    return {
      isValid: false,
      reason: "File type not supported. Please upload a PDF, DOCX, TXT, or ODT file."
    };
  }
  
  // Mock Gemini API response (90% success rate)
  // In production, this would analyze text content for CV sections
  const mockGeminiResponse = Math.random() > 0.1;
  
  if (!mockGeminiResponse) {
    return {
      isValid: false,
      reason: "The uploaded file doesn't appear to contain typical CV sections like Experience, Education, or Skills."
    };
  }
  
  // Example of what a real Gemini prompt would look like:
  /*
  prompt = `Is this text from a CV? Look for sections like Contact Information, 
    Experience, Education, Skills, or terms like Matric, NQF, B-BBEE. 
    Respond with 'Yes' or 'No' and a brief reason.
    Text: ${first500Chars}`
  */
  
  return {
    isValid: true
  };
};

// In a real implementation, we might implement caching to reduce API calls
// This would store hashes of previously validated files to avoid re-validation
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
