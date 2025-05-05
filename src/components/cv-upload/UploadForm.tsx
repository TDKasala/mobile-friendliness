
import { useCallback, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useCVValidation } from "@/hooks/use-cv-validation";

// Import components
import DragAndDropArea from "./DragAndDropArea";
import JobDescriptionToggle from "./JobDescriptionToggle";
import WhatsAppUploadButton from "./WhatsAppUploadButton";
import ErrorDisplay from "./ErrorDisplay";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UploadFormProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  showJobDescription: boolean;
  toggleJobDescription: () => void;
  setFile: (file: File | null) => void;
  setError: (error: string | null) => void;
  setAnalysisStatus: (status: "validating" | "analyzing" | "complete" | "error") => void;
}

/**
 * Enhanced CV Upload Form Component
 * Handles file uploads, drag & drop, and job description input with improved validation
 */
const UploadForm: React.FC<UploadFormProps> = ({
  jobDescription,
  setJobDescription,
  showJobDescription,
  toggleJobDescription,
  setFile,
  setError,
  setAnalysisStatus
}) => {
  const { 
    validateCV, 
    isValidating, 
    fileValidationError,
    resetValidationErrors
  } = useCVValidation();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);

  // Process uploaded file
  const processFile = useCallback(async (file: File) => {
    resetValidationErrors();
    setError(null);
    setSelectedFile(file);
    
    // Check file type first (we allow PDF, DOCX, DOC, TXT, ODT)
    const validExtensions = ['.pdf', '.docx', '.doc', '.txt', '.odt'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      setError("Please upload a CV in PDF, DOCX, DOC, TXT or ODT format");
      setSelectedFile(null);
      return;
    }
    
    // Continue with validation
    setAnalysisStatus("validating");
    
    // Validate if the file is actually a CV
    const isValid = await validateCV(file);
    
    if (!isValid) {
      setError(fileValidationError || "The uploaded file doesn't appear to be a CV. Please check and try again.");
      setSelectedFile(null);
      setAnalysisStatus("error");
      return;
    }
    
    // Set the file for the parent component
    setFile(file);
  }, [validateCV, setFile, setError, setAnalysisStatus, fileValidationError, resetValidationErrors]);
  
  // Handle consent checkbox
  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsentGiven(e.target.checked);
  };
  
  // Handle final submit with consent
  const handleSubmit = () => {
    if (!selectedFile) {
      setError("Please select a CV file first");
      return;
    }
    
    if (!consentGiven) {
      setError("Please agree to the Privacy Policy to proceed");
      return;
    }
    
    // If we have a file and consent, proceed with analysis
    setFile(selectedFile);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Job Description Toggle */}
      <JobDescriptionToggle
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        showJobDescription={showJobDescription}
        toggleJobDescription={toggleJobDescription}
      />
      
      {/* File validation error display */}
      {fileValidationError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{fileValidationError}</AlertDescription>
        </Alert>
      )}

      {/* Drag & Drop Upload Area */}
      <DragAndDropArea 
        onFileSelected={processFile}
        isValidating={isValidating}
      />
      
      {/* Selected file info */}
      {selectedFile && !fileValidationError && (
        <div className="mt-2 p-3 bg-gray-50 dark:bg-sa-blue/30 rounded-lg border border-gray-200 dark:border-sa-blue/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                File Selected
              </Badge>
              <span className="font-medium text-sa-blue dark:text-white">
                {selectedFile.name}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </span>
          </div>
        </div>
      )}
      
      {/* POPIA consent checkbox */}
      {selectedFile && !fileValidationError && (
        <div className="mt-2">
          <label className="flex items-start space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-sa-blue focus:ring-sa-blue dark:border-gray-600 dark:bg-gray-800"
              checked={consentGiven}
              onChange={handleConsentChange}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              I agree to the processing of my CV as per the 
              <a href="/legal?section=privacy" className="text-sa-blue dark:text-sa-yellow hover:underline ml-1">
                Privacy Policy
              </a>
              . I understand that my CV will be analyzed by AI to generate ATS scores and recommendations.
            </span>
          </label>
        </div>
      )}
      
      {/* Submit button */}
      {selectedFile && !fileValidationError && (
        <div className="mt-2 flex justify-center">
          <Button 
            onClick={handleSubmit}
            disabled={!consentGiven || isValidating}
            className="bg-sa-blue hover:bg-sa-blue/90 text-white dark:bg-sa-green dark:hover:bg-sa-green/90"
          >
            Start CV Analysis
          </Button>
        </div>
      )}

      {/* Alternative WhatsApp upload */}
      <div className="flex justify-center mt-4">
        <WhatsAppUploadButton isValidating={isValidating} />
      </div>
    </div>
  );
};

export default UploadForm;
