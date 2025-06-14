
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useCVValidation } from "@/hooks/use-cv-validation";
import { useJobMatch } from "@/hooks/use-job-match";
import { useRecommendations } from "@/hooks/use-recommendations";
import { useCVAnalysis } from "@/hooks/use-cv-analysis";
import { useAuth } from "@/contexts/AuthContext";
import { filesAreDifferent } from "@/lib/utils";
import { Upload, Sparkles, TrendingUp, FileText, Briefcase } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
    <section id="analyze-cv" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-sa-blue/5 dark:via-sa-blue/10 dark:to-sa-blue/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sa-blue/10 to-sa-green/10 text-sa-blue px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered CV Analysis</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sa-blue to-sa-green bg-clip-text text-transparent">
                Optimize Your CV
              </span>
              <br />
              <span className="text-gray-800 dark:text-white">Get Hired Faster</span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Upload your CV to get an instant ATS compatibility score, personalized feedback, 
              and actionable recommendations to boost your job application success.
            </p>

            {/* Features highlights */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { icon: TrendingUp, text: "Instant ATS Score" },
                { icon: Sparkles, text: "AI-Powered Analysis" },
                { icon: Upload, text: "Easy Upload Process" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white dark:bg-sa-blue/20 px-4 py-2 rounded-lg shadow-sm">
                  <feature.icon className="h-5 w-5 text-sa-green" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Job Description Section */}
          <div className="bg-white/80 dark:bg-sa-blue/20 backdrop-blur-lg rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-green-50 text-sa-blue px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Briefcase className="h-4 w-4" />
                <span>Step 1: Target Your Application</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Paste Your Job Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Add the job description to get targeted CV optimization recommendations that match the specific role you're applying for.
              </p>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Paste the complete job description here for targeted CV optimization..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[150px] border-2 border-gray-200 dark:border-gray-600 focus:border-sa-blue dark:focus:border-sa-green rounded-xl p-4 text-base"
              />
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{jobDescription.length} characters</span>
                <span className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>Recommended: 200+ characters for best results</span>
                </span>
              </div>
            </div>
          </div>

          {/* Main Upload Section */}
          <div className="bg-white/80 dark:bg-sa-blue/20 backdrop-blur-lg rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-blue-50 text-sa-green px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Upload className="h-4 w-4" />
                <span>Step 2: Upload Your CV</span>
              </div>
            </div>

            {showDifferentCVAlert && (
              <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">New CV Detected!</h4>
                    <p className="text-blue-700">You've uploaded a different CV. This will create a fresh analysis with personalized recommendations.</p>
                  </div>
                </div>
              </div>
            )}

            {!file ? (
              <UploadForm 
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                showJobDescription={showJobDescription}
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
              <div className="mt-8">
                <POPIAConsent />
              </div>
            )}
            
            <div className="mt-8">
              <SupportSection />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVUpload;
