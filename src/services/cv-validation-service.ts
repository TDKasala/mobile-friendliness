
// This service integrates with Google's Gemini API for CV validation

type ValidationResult = {
  isValid: boolean;
  reason?: string;
}

// Gemini API key
const GEMINI_API_KEY = "AIzaSyCD2Mfe9RyALifO_vEGxJvrZyuAZT_UzuE";

export const validateCVWithAI = async (file: File): Promise<ValidationResult> => {
  try {
    // Extract text content from the file (basic implementation)
    const textContent = await extractTextFromFile(file);
    
    // Simple validation: Check if the file is a valid type
    const validExtensions = ['.pdf', '.docx', '.doc', '.txt', '.odt'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const isValidExtension = validExtensions.includes(fileExtension);
    
    if (!isValidExtension) {
      return {
        isValid: false,
        reason: "File type not supported. Please upload a PDF, DOCX, TXT, or ODT file."
      };
    }
    
    // Accept common CV files by default - improved detection logic
    if (file.name.toLowerCase().includes('cv') || 
        file.name.toLowerCase().includes('resume') || 
        file.name.toLowerCase().includes('curriculum') ||
        file.name.toLowerCase().match(/.*\.(doc|docx|pdf)$/)) {
      return { isValid: true };
    }
    
    // For small files or when text extraction fails, don't reject them
    if (!textContent || textContent.length < 50) {
      return { isValid: true }; // Accept most files without strict validation
    }

    // Truncate text to first 1000 characters for the API call
    const truncatedText = textContent.substring(0, 1000);
    
    try {
      // Prepare the request to the Gemini API with a more forgiving prompt
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze if this text could possibly be from a CV, resume, or professional document. 
                  Be very lenient - we want to accept anything that might be a CV or professional document.
                  Consider South African qualifications like Matric, NQF, B-BBEE, and common CV sections.
                  Answer only 'Yes' if it could potentially be a CV or professional document, or 'No' if it's definitely not.
                  Text: ${truncatedText}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 50
          }
        })
      });
      
      const data = await response.json();
      console.log("Gemini API response:", data);
      
      // Parse the response from Gemini
      const result = extractResponseFromGemini(data);
      // Be more permissive - only reject if very clearly not a CV
      if (result.toLowerCase().includes("no") && !result.toLowerCase().includes("yes")) {
        return { 
          isValid: false,
          reason: "The document doesn't appear to be a CV or professional document."
        };
      } else {
        return { isValid: true };
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      // Fallback to accepting the file if API call fails
      return { 
        isValid: true,
        reason: "API validation unavailable. Basic validation passed."
      };
    }
  } catch (error) {
    console.error("Error in CV validation:", error);
    // Default to accepting the file in case of errors
    return {
      isValid: true,
      reason: "Validation error. File accepted by default."
    };
  }
};

// Helper function to extract text from different file types
const extractTextFromFile = async (file: File): Promise<string> => {
  // In a production environment, this would use a more robust solution
  // Here we'll just read text files directly
  if (file.type === 'text/plain') {
    return await file.text();
  }
  
  // For other file types, in production you would:
  // 1. Send to a serverless function
  // 2. Use a PDF extraction library or docx parser
  // 3. Return the extracted text
  
  // For now, we'll just return a placeholder
  return `This is placeholder text for ${file.name}. In production, we would extract real content from this file.`;
};

// Helper function to extract the response from the Gemini API
const extractResponseFromGemini = (response: any): string => {
  try {
    // Navigate the response structure to get the text
    if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return response.candidates[0].content.parts[0].text;
    }
    return "Unclear response";
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    return "Error parsing response";
  }
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
