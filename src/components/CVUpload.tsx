import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useCVValidation } from "@/hooks/use-cv-validation";
import { useJobMatch } from "@/hooks/use-job-match";
import { useRecommendations } from "@/hooks/use-recommendations";
import { useCVAnalysis } from "@/hooks/use-cv-analysis";
import { useAuth } from "@/contexts/AuthContext";
import { JobMatch, CVTip } from "@/lib/types";

// Import component files
import UploadForm from "@/components/cv-upload/UploadForm";
import FileInfo from "@/components/cv-upload/FileInfo";
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
  const [showJobDescription, setShowJobDescription] = useState(true); // Always show job description by default
  
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
    setFile(null);
    setJobDescription("");
    setShowJobDescription(true);
    resetScore(); // Reset score when selecting a new file
    setError(null); // Clear any errors
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
