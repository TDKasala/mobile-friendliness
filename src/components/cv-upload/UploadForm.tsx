
import { useCallback } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useCVValidation } from "@/hooks/use-cv-validation";

// Import components
import DragAndDropArea from "./DragAndDropArea";
import JobDescriptionToggle from "./JobDescriptionToggle";
import WhatsAppUploadButton from "./WhatsAppUploadButton";
import ErrorDisplay from "./ErrorDisplay";

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
 * CV Upload Form Component
 * Handles file uploads, drag & drop, and job description input
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

  // Process uploaded file
  const processFile = useCallback(async (file: File) => {
    resetValidationErrors();
    setError(null);
    
    // Set file and start validation
    setFile(file);
    setAnalysisStatus("validating");
    
    // Validate if the file is actually a CV
    const isValid = await validateCV(file);
    
    if (!isValid) {
      setError(fileValidationError || "The uploaded file doesn't appear to be a CV. Please check and try again.");
      setFile(null);
      setAnalysisStatus("error");
      return;
    }
    
    // Continue with the analysis flow - parent component will handle this
  }, [validateCV, setFile, setError, setAnalysisStatus, fileValidationError, resetValidationErrors]);

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

      {/* WhatsApp upload alternative */}
      <div className="flex justify-center mt-4">
        <WhatsAppUploadButton isValidating={isValidating} />
      </div>
    </div>
  );
};

export default UploadForm;
