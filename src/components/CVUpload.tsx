
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CVScore } from "@/lib/types";
import { useCVValidation } from "@/hooks/use-cv-validation";
import { useJobMatch } from "@/hooks/use-job-match";
import { useRecommendations } from "@/hooks/use-recommendations";
import { useAuth } from "@/contexts/AuthContext";
import { uploadCV, saveCVScore } from "@/services/database-service";

// Import our new component files
import UploadForm from "@/components/cv-upload/UploadForm";
import FileInfo from "@/components/cv-upload/FileInfo";
import ResultsSection from "@/components/cv-upload/ResultsSection";
import ErrorDisplay from "@/components/cv-upload/ErrorDisplay";
import POPIAConsent from "@/components/cv-upload/POPIAConsent";
import SupportSection from "@/components/cv-upload/SupportSection";

const CVUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showJobDescription, setShowJobDescription] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<"validating" | "analyzing" | "complete" | "error">("validating");
  const [score, setScore] = useState<CVScore | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { isValidating, validateCV } = useCVValidation();
  const { isAnalyzing: isAnalyzingJob, jobMatch, analyzeJobDescription } = useJobMatch();
  const { isGenerating, recommendations, generateRecommendations } = useRecommendations();
  const { user } = useAuth();

  const toggleJobDescription = () => {
    setShowJobDescription(!showJobDescription);
  };

  const analyzeCV = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    setAnalysisStatus("analyzing");

    try {
      // If user is signed in, upload CV to Supabase
      let uploadId = null;
      if (user) {
        try {
          const uploadData = await uploadCV(file, user.id);
          uploadId = uploadData.id;
        } catch (error) {
          console.error("Error uploading CV to storage:", error);
          // Continue with analysis even if storage upload fails
        }
      }

      // Simulate API call to analyze CV with enhanced ATS scoring
      setTimeout(async () => {
        // Enhanced mock result with more detailed scoring
        const mockScore = {
          overall: 68,
          keywordMatch: 62,
          formatting: 75,
          sectionPresence: 80,
          readability: 70,
          length: 55
        };
        
        setScore(mockScore);
        setAnalysisStatus("complete");
        
        // Save score to database if user is logged in and CV was uploaded
        if (user && uploadId) {
          try {
            await saveCVScore(user.id, uploadId, mockScore);
          } catch (error) {
            console.error("Error saving CV score:", error);
            // Continue even if saving score fails
          }
        }
        
        setIsAnalyzing(false);
        
        toast({
          title: "CV Analysis Complete",
          description: "Your CV has been scored against ATS criteria.",
        });
        
        // Generate recommendations based on CV score
        generateRecommendations(mockScore, null, user?.id ? "premium" : "free");
        
        // If job description is provided, analyze it as well
        if (jobDescription.trim()) {
          analyzeJobDescription(file.name, jobDescription);
        }
      }, 3000); // 3 seconds delay to show animation
    } catch (error) {
      console.error("Error analyzing CV:", error);
      setError("An error occurred while analyzing your CV. Please try again.");
      setIsAnalyzing(false);
      setAnalysisStatus("error");
    }
  };

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
      description: "This will redirect to payment for the detailed report.",
    });
    // Here you would typically redirect to a payment page or modal
  };

  const resetFile = () => {
    setFile(null);
    setJobDescription("");
    setShowJobDescription(false);
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
                isValidating={isValidating}
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
                {score ? (
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
                    analyzeCV={analyzeCV}
                    isAnalyzingJob={isAnalyzingJob}
                    resetFile={resetFile}
                  />
                )}
              </div>
            )}

            <ErrorDisplay error={error} />
            
            {/* POPIA compliance consent checkbox */}
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
