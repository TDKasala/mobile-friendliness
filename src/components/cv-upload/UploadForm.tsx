
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Loader2, Briefcase, ChevronDown, ChevronUp, MessagesSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCVValidation } from "@/hooks/use-cv-validation";

interface UploadFormProps {
  isValidating: boolean;
  jobDescription: string;
  setJobDescription: (value: string) => void;
  showJobDescription: boolean;
  toggleJobDescription: () => void;
  setFile: (file: File | null) => void;
  setError: (error: string | null) => void;
  setAnalysisStatus: (status: "validating" | "analyzing" | "complete" | "error") => void;
}

const UploadForm: React.FC<UploadFormProps> = ({
  isValidating,
  jobDescription,
  setJobDescription,
  showJobDescription,
  toggleJobDescription,
  setFile,
  setError,
  setAnalysisStatus
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const { validateCV } = useCVValidation();

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    processFile(droppedFile);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, []);

  const processFile = async (file: File) => {
    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.oasis.opendocument.text'];
    
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF, DOCX, TXT, or ODT file.");
      setFile(null);
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB. Please upload a smaller file.");
      setFile(null);
      return;
    }
    
    // Set file and start validation
    setFile(file);
    setError(null);
    
    // Validate if the file is actually a CV
    setAnalysisStatus("validating");
    const isValid = await validateCV(file);
    if (!isValid) {
      setError("The uploaded file doesn't appear to be a CV. Please check and try again.");
      setFile(null);
      setAnalysisStatus("error");
      return;
    }

    toast({
      title: "CV Received!",
      description: "Your CV was uploaded successfully.",
    });
  };

  const openWhatsAppUpload = () => {
    // Open WhatsApp with pre-filled message
    window.open("https://wa.me/+27123456789?text=I'd like to upload my CV for analysis", "_blank");
    
    toast({
      title: "WhatsApp Upload",
      description: "Send your CV as a file attachment to this number to analyze it.",
    });
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full mb-4 justify-between py-2.5 text-sa-blue dark:text-gray-300"
        onClick={toggleJobDescription}
      >
        <div className="flex items-center">
          <Briefcase className="h-4 w-4 mr-2" />
          <span>{showJobDescription ? "Hide Job Description" : "Add Job Description (Optional)"}</span>
        </div>
        {showJobDescription ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      
      {showJobDescription && (
        <div className="mb-4">
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste a job description to get tailored feedback on how well your CV matches the requirements..."
            className="min-h-[100px] mb-1"
          />
          <p className="text-xs text-sa-gray dark:text-gray-400">
            Adding a job description helps us provide more targeted recommendations for your CV
          </p>
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-lg ${
          isDragging
            ? "border-sa-green bg-sa-green/5 dark:border-sa-yellow dark:bg-sa-yellow/5"
            : "border-gray-300 dark:border-gray-600"
        } p-8 text-center cursor-pointer transition-colors duration-200`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          className="hidden"
          accept=".pdf,.docx,.doc,.txt,.odt"
          onChange={handleFileInput}
        />
        <div className="flex flex-col items-center justify-center py-6">
          {isValidating ? (
            <>
              <Loader2 size={48} className="animate-spin text-sa-gray dark:text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2 text-sa-blue dark:text-white">
                Validating your CV...
              </h3>
              <p className="text-sa-gray dark:text-gray-400 mb-4">
                We're checking that your file is a valid CV
              </p>
            </>
          ) : (
            <>
              <Upload 
                size={48} 
                className="text-sa-gray dark:text-gray-400 mb-4" 
              />
              <h3 className="text-lg font-medium mb-2 text-sa-blue dark:text-white">
                Drag & drop your CV here
              </h3>
              <p className="text-sa-gray dark:text-gray-400 mb-4">
                Supports PDF, DOCX, TXT, and ODT files (max 5MB)
              </p>
            </>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="default" 
              className="bg-sa-blue hover:bg-sa-blue/90 text-white dark:bg-sa-green dark:hover:bg-sa-green/90"
              disabled={isValidating}
            >
              {isValidating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Validating...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" /> Select File
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="border-sa-gray text-sa-gray hover:bg-sa-gray/10 flex items-center justify-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                openWhatsAppUpload();
              }}
              disabled={isValidating}
            >
              <MessagesSquare className="h-4 w-4" /> Upload via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadForm;
