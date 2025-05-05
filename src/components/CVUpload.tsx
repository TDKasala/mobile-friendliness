
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCVValidation } from "@/hooks/use-cv-validation";
import { useJobMatch } from "@/hooks/use-job-match";
import { useRecommendations } from "@/hooks/use-recommendations";
import { useCVAnalysis } from "@/hooks/use-cv-analysis";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { JobMatch } from "@/lib/types";

// Import component files
import UploadForm from "@/components/cv-upload/UploadForm";
import FileInfo from "@/components/cv-upload/FileInfo";
import ResultsSection from "@/components/cv-upload/ResultsSection";
import ErrorDisplay from "@/components/cv-upload/ErrorDisplay";
import POPIAConsent from "@/components/cv-upload/POPIAConsent";
import SupportSection from "@/components/cv-upload/SupportSection";

/**
 * CVUpload Component
 * Main component for CV uploading, validation, and analysis functionality
 */
const CVUpload = () => {
  // State management
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showJobDescription, setShowJobDescription] = useState(false);
  
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
    resetScore
  } = useCVAnalysis();
  
  // Authentication and navigation
  const { user } = useAuth();
  const navigate = useNavigate();

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
      analyzeJobDescription(file.name, jobDescription);
    }
    
    // Generate recommendations if we have a score
    if (score) {
      // Check if score has recommendations from the API
      const validationResult = await useCVValidation().validateCVContent(file);
      if (validationResult.recommendations && validationResult.recommendations.length > 0) {
        generateRecommendations(score, validationResult.recommendations, user?.id ? "premium" : "free");
      } else {
        // Fallback to generating recommendations based on the score
        generateRecommendations(score, null, user?.id ? "premium" : "free");
      }
    }
  };

  /**
   * Redirect to pricing for premium report access
   */
  const getDetailedReport = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in or create an account to access detailed reports.",
      });
      return;
    }

    toast({
      title: "Premium Feature",
      description: "Redirecting to pricing plans for detailed reports.",
    });
    navigate("/pricing");
  };

  /**
   * Reset file and related states
   */
  const resetFile = () => {
    setFile(null);
    setJobDescription("");
    setShowJobDescription(false);
    resetScore(); // Reset score when selecting a new file
    setError(null); // Clear any errors
  };

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
            {!file ? (
              <UploadForm 
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                showJobDescription={showJobDescription}
                toggleJobDescription={toggleJobDescription}
                setFile={setFile}
                setError={setError}
                setAnalysisStatus={setAnalysisStatus}
              />
            ) : (
              <div className="text-center">
                {/* Only show results if analysis is complete and score is available */}
                {score && analysisStatus === "complete" ? (
                  <ResultsSection 
                    score={score}
                    jobMatch={jobMatch}
                    jobDescription={jobDescription}
                    recommendations={recommendations}
                    userTier={user ? "premium" : "free"}
                    getDetailedReport={getDetailedReport}
                    resetUpload={resetFile}
                  />
                ) : (
                  <FileInfo 
                    file={file}
                    isValidating={isValidating}
                    isAnalyzing={isAnalyzing}
                    analysisStatus={analysisStatus}
                    jobDescription={jobDescription}
                    showJobDescription={showJobDescription}
                    toggleJobDescription={toggleJobDescription}
                    setJobDescription={setJobDescription}
                    analyzeCV={handleAnalyzeCV}
                    isAnalyzingJob={isAnalyzingJob}
                    resetFile={resetFile}
                  />
                )}
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
