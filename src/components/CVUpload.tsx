
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useCVValidation } from "@/hooks/use-cv-validation";
import { useJobMatch } from "@/hooks/use-job-match";
import { useRecommendations } from "@/hooks/use-recommendations";
import { useCVAnalysis } from "@/hooks/use-cv-analysis";
import { useAuth } from "@/contexts/AuthContext";
import { filesAreDifferent } from "@/lib/utils";

// Import component files
import UploadForm from "@/components/cv-upload/UploadForm";
import FileInfo from "@/components/cv-upload/FileInfo";
import ErrorDisplay from "@/components/cv-upload/ErrorDisplay";
import POPIAConsent from "@/components/cv-upload/POPIAConsent";
import SupportSection from "@/components/cv-upload/SupportSection";
import JobDescriptionToggle from "@/components/cv-upload/JobDescriptionToggle";

/**
 * CVUpload Component
 * Main component for CV uploading, validation, and analysis functionality
 */
const CVUpload = () => {
  // State management
  const [file, setFile] = useState<File | null>(null);
  const [previousFile, setPreviousFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showJobDescription, setShowJobDescription] = useState(true);
  const [showDifferentCVAlert, setShowDifferentCVAlert] = useState(false);
  
  // Hooks for CV functionality
  const { toast } = useToast();
  const { isValidating } = useCVValidation();
  const { isAnalyzing: isAnalyzingJob, jobMatch, analyzeJobDescription } = useJobMatch();
  const { isGenerating, recommendations, generateRecommendations } = useRecommendations();
  const { 
    isAnalyzing, 
    analysisStatus, 
    score, 
    error, 
    analyzeCV, 
    setError, 
    setAnalysisStatus,
    resetScore,
    detailedAnalysis,
    scoreExplanations,
    cvText
  } = useCVAnalysis();
  
  // Authentication and navigation
  const { user } = useAuth();
  const navigate = useNavigate();

  // Effect to detect if user uploads a different CV
  useEffect(() => {
    if (file && previousFile && filesAreDifferent(file, previousFile)) {
      setShowDifferentCVAlert(true);
      toast({
        title: "Different CV Detected",
        description: "We noticed you've uploaded a different CV. This will create a new analysis.",
        variant: "default"
      });
      
      // Auto-hide the alert after 5 seconds
      const timer = setTimeout(() => {
        setShowDifferentCVAlert(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [file, previousFile, toast]);

  /**
   * Toggle job description visibility
   */
  const toggleJobDescription = () => {
    setShowJobDescription(!showJobDescription);
  };

  /**
   * Handle CV analysis
   * This triggers the full analysis process including job matching if applicable
   */
  const handleAnalyzeCV = async () => {
    if (!file) return;
    
    // Start the analysis process
    await analyzeCV(file, jobDescription, user?.id);
    
    // If job description is provided, analyze it as well
    if (jobDescription.trim()) {
      await analyzeJobDescription(file.name, jobDescription);
    }
  };

  /**
   * Reset file and related states
   */
  const resetFile = () => {
    setPreviousFile(file); // Store the current file before resetting
    setFile(null);
    setJobDescription("");
    setShowJobDescription(true);
    resetScore(); // Reset score when selecting a new file
    setError(null); // Clear any errors
    setShowDifferentCVAlert(false); // Hide the alert
  };

  /**
   * Handle file selection from UploadForm
   */
  const handleFileSelection = (selectedFile: File) => {
    if (file) {
      setPreviousFile(file);
    }
    setFile(selectedFile);
  };

  // Effect to navigate to the ATS Score page once the analysis is complete
  if (score && analysisStatus === "complete") {
    // Get the ATS Match Report data from the analysis, if available
    const atsMatchReportData = detailedAnalysis?.atsMatchReport || null;
    
    // Navigate to the ATS Score page with the analysis data
    navigate("/ats-score", { 
      state: {
        score,
        recommendations,
        jobMatch,
        explanations: scoreExplanations || {},
        reportData: atsMatchReportData,
        tier: user ? "premium" : "free",
        cvText
      }
    });
    
    // Reset the score so we don't keep redirecting
    resetScore();
  }

  return (
    <section className="py-16 bg-white dark:bg-sa-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-sa-blue dark:text-white">
              Analyze Your CV
            </h2>
            <p className="text-sa-gray dark:text-gray-300">
              Upload your CV to get an instant ATS score and actionable feedback to improve your chances of getting hired.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-sa-blue/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-sa-blue/70">
            
            {/* Job Description Toggle - moved to top */}
            <div className="mb-6">
              <JobDescriptionToggle
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                showJobDescription={showJobDescription}
                toggleJobDescription={toggleJobDescription}
              />
            </div>

            {showDifferentCVAlert && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-700">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">New CV detected!</span>
                </div>
                <p className="mt-2 text-sm">You've uploaded a different CV. This will create a new analysis with its own recommendations.</p>
              </div>
            )}

            {!file ? (
              <UploadForm 
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                showJobDescription={false} // Don't show in UploadForm since it's now at top
                toggleJobDescription={toggleJobDescription}
                setFile={handleFileSelection}
                setError={setError}
                setAnalysisStatus={setAnalysisStatus}
              />
            ) : (
              <div className="text-center">
                <FileInfo 
                  file={file}
                  isValidating={isValidating}
                  isAnalyzing={isAnalyzing}
                  analysisStatus={analysisStatus}
                  jobDescription={jobDescription}
                  showJobDescription={false} // Don't show in FileInfo since it's now at top
                  toggleJobDescription={toggleJobDescription}
                  setJobDescription={setJobDescription}
                  analyzeCV={handleAnalyzeCV}
                  isAnalyzingJob={isAnalyzingJob}
                  resetFile={resetFile}
                />
              </div>
            )}

            <ErrorDisplay error={error} />
            
            {/* POPIA compliance consent checkbox - only show when not analyzing or displaying results */}
            {!score && !isAnalyzing && file && (
              <POPIAConsent />
            )}
            
            <SupportSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVUpload;
