
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Loader2, ChevronUp, ChevronDown } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";

interface FileInfoProps {
  file: File;
  isValidating: boolean;
  isAnalyzing: boolean;
  analysisStatus: "validating" | "analyzing" | "complete" | "error";
  jobDescription: string;
  showJobDescription: boolean;
  toggleJobDescription: () => void;
  setJobDescription: (description: string) => void;
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
  // Show loading animation during validation or analysis
  if (isValidating || isAnalyzing) {
    return (
      <div className="mb-6">
        <LoadingAnimation status={analysisStatus} />
        
        {/* Information text */}
        <p className="mt-4 text-sm text-sa-gray dark:text-gray-400">
          {analysisStatus === "validating" 
            ? "We're checking that your file is a valid CV..." 
            : "Our AI is analyzing your CV against South African ATS systems..."}
        </p>
      </div>
    );
  }

  // File information and job description input
  return (
    <>
      {/* File information box */}
      <div className="bg-sa-blue/10 dark:bg-sa-blue/30 rounded-lg p-4 mb-6">
        <p className="font-medium text-sa-blue dark:text-white">
          {file.name}
        </p>
        <p className="text-sm text-sa-gray dark:text-gray-300">
          {(file.size / 1024).toFixed(1)} KB
        </p>
      </div>
      
      {/* Job Description Input */}
      {!jobDescription && (
        <div className="mb-6">
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
        </div>
      )}
      
      {/* Action buttons */}
      <div className="space-y-4">
        <Button
          variant="default"
          className="bg-sa-green hover:bg-sa-green/90 text-white dark:bg-sa-yellow dark:hover:bg-sa-yellow/90 w-full"
          onClick={analyzeCV}
          disabled={isAnalyzing || isAnalyzingJob}
        >
          {isAnalyzing || isAnalyzingJob ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              {isAnalyzing ? "Analyzing..." : "Matching job description..."}
            </>
          ) : (
            "Analyze CV"
          )}
        </Button>
        <Button
          variant="outline"
          className="border-sa-gray text-sa-gray hover:bg-sa-gray/10 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-700/30 w-full"
          onClick={resetFile}
          disabled={isAnalyzing}
        >
          Choose Another File
        </Button>
      </div>
    </>
  );
};

export default FileInfo;
