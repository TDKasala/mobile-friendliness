
import { useCallback } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useCVValidation } from "@/hooks/use-cv-validation";

// Import smaller components
import DragAndDropArea from "./DragAndDropArea";
import JobDescriptionToggle from "./JobDescriptionToggle";
import WhatsAppUploadButton from "./WhatsAppUploadButton";

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
  }, [validateCV, setFile, setError, setAnalysisStatus, fileValidationError, resetValidationErrors]);

  return (
    <>
      {/* Job Description Toggle */}
      <JobDescriptionToggle
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        showJobDescription={showJobDescription}
        toggleJobDescription={toggleJobDescription}
      />
      
      {/* File validation error display */}
      {fileValidationError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{fileValidationError}</AlertDescription>
        </Alert>
      )}

      {/* Drag & Drop Upload Area */}
      <DragAndDropArea 
        onFileSelected={processFile}
        isValidating={isValidating}
      />

      {/* WhatsApp upload button outside the drag area */}
      <div className="mt-4 flex justify-center">
        <WhatsAppUploadButton isValidating={isValidating} />
      </div>
    </>
  );
};

export default UploadForm;
