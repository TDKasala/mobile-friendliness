
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, X, FileText, ChevronDown, ChevronUp, AlertTriangle, Loader2 } from "lucide-react";
import ATSMatchReportSection from "./ATSMatchReportSection";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FileInfoProps {
  file: File;
  isValidating: boolean;
  isAnalyzing: boolean;
  analysisStatus: "validating" | "analyzing" | "complete" | "error";
  jobDescription: string;
  showJobDescription: boolean;
  toggleJobDescription: () => void;
  setJobDescription: (text: string) => void;
  analyzeCV: () => void;
  isAnalyzingJob: boolean;
  resetFile: () => void;
}

const FileInfo: React.FC<FileInfoProps> = ({
  file,
  isValidating,
  isAnalyzing,
  analysisStatus,
  jobDescription,
  showJobDescription,
  toggleJobDescription,
  setJobDescription,
  analyzeCV,
  isAnalyzingJob,
  resetFile
}) => {
  const [jobDescError, setJobDescError] = useState<string | null>(null);
  
  // Get file extension for icon display
  const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
  
  // Determine file type for styling
  const getFileTypeStyles = () => {
    switch (fileExtension) {
      case 'pdf':
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
      case 'docx':
      case 'doc':
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  // Validate and handle CV analysis
  const handleAnalyzeCV = () => {
    // Check if job description is provided
    if (!jobDescription.trim()) {
      setJobDescError("Job description is required for CV analysis");
      // Ensure job description field is visible
      if (!showJobDescription) {
        toggleJobDescription();
      }
      return;
    }
    
    // Clear any previous error
    setJobDescError(null);
    
    // Proceed with analysis
    analyzeCV();
  };

  return (
    <div className="w-full">
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-md ${getFileTypeStyles()}`}>
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {file.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {(file.size / 1024).toFixed(1)} KB · {fileExtension.toUpperCase()}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFile}
            disabled={isValidating || isAnalyzing}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mb-4">
          <div 
            className="flex items-center justify-between py-2 cursor-pointer" 
            onClick={toggleJobDescription}
          >
            <span className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
              <span className="mr-2">Job Description</span>
              <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded ml-1">
                Required
              </span>
              {jobDescription && (
                <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
              )}
            </span>
            {showJobDescription ? (
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          
          {showJobDescription && (
            <div className="mt-2">
              <Textarea 
                placeholder="Paste job description here for accurate analysis and recommendations..."
                className="min-h-[120px]"
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  if (e.target.value.trim()) {
                    setJobDescError(null);
                  }
                }}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                A job description is required to receive tailored recommendations for this specific position.
              </p>
            </div>
          )}
          
          {jobDescError && (
            <Alert variant="destructive" className="mt-2">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <AlertDescription>{jobDescError}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex flex-col space-y-3">
          {analysisStatus === "validating" && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
              <span>Your CV will be analyzed by DeepSeek AI in compliance with POPIA.</span>
            </div>
          )}
          
          <Button 
            onClick={handleAnalyzeCV} 
            disabled={isValidating || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing || isValidating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isValidating ? "Validating..." : "Analyzing..."}
              </>
            ) : (
              "Analyze My CV"
            )}
          </Button>
        </div>
      </div>
      
      {/* ATS Match Report Section - only show if CV is uploaded and job description is provided */}
      <ATSMatchReportSection 
        cvText={file ? URL.createObjectURL(file).toString() : ""}
        jobDescription={jobDescription}
        isReady={!!file && !!jobDescription && !isValidating && !isAnalyzing}
      />
    </div>
  );
};

export default FileInfo;
