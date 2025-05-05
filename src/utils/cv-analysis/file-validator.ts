
/**
 * Utility functions for validating file metadata
 */

/**
 * Validates file type and size
 * @param file File to validate
 * @returns Validation result with isValid flag and optional reason
 */
export const validateFileMetadata = (file: File): { isValid: boolean; reason?: string } => {
  // Check file type
  const validExtensions = ['.pdf', '.docx', '.doc', '.txt', '.odt'];
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  const isValidExtension = validExtensions.includes(fileExtension);
  
  if (!isValidExtension) {
    return {
      isValid: false,
      reason: "File type not supported. Please upload a PDF, DOCX, TXT, or ODT file."
    };
  }
  
  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return {
      isValid: false,
      reason: "File size exceeds 5MB. Please upload a smaller file."
    };
  }
  
  return { isValid: true };
};

/**
 * Generate a simple hash for a file to use as cache key
 * @param file File to hash
 * @returns Simple hash string based on file properties
 */
export const generateFileHash = async (file: File): Promise<string> => {
  // In a real implementation, you'd use a proper hashing algorithm
  // For now, we'll create a hash from file properties
  return `${file.name}-${file.size}-${file.lastModified}`;
};
