
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CVScore } from "@/lib/types";
import { useCVValidation } from "@/hooks/use-cv-validation";
import { useJobMatch } from "@/hooks/use-job-match";
import { useRecommendations } from "@/hooks/use-recommendations";
import { useAuth } from "@/contexts/AuthContext";
import { uploadCV, saveCVScore } from "@/services/database-service";
import { generateRealisticCVScore } from "@/utils/report-generator";
import { useNavigate } from "react-router-dom";

// Import component files
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
  const { isValidating, validateCVContent } = useCVValidation();
  const { isAnalyzing: isAnalyzingJob, jobMatch, analyzeJobDescription } = useJobMatch();
  const { isGenerating, recommendations, generateRecommendations } = useRecommendations();
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleJobDescription = () => {
    setShowJobDescription(!showJobDescription);
  };

  const analyzeCV = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    setAnalysisStatus("analyzing");
    // Reset any existing score before starting new analysis
    setScore(null);

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

      // Get the validation result with DeepSeek API
      const validationResult = await validateCVContent(file);
      
      // Only proceed if validation passes
      if (validationResult.isValid) {
        // Use the scores from DeepSeek if available, otherwise generate realistic scores
        if (validationResult.detailedScores && validationResult.score !== undefined) {
          setScore({
            overall: validationResult.score,
            keywordMatch: validationResult.detailedScores.keywordMatch || 0,
            formatting: validationResult.detailedScores.formatting || 0,
            sectionPresence: validationResult.detailedScores.sectionPresence || 0,
            readability: validationResult.detailedScores.readability || 0,
            length: validationResult.detailedScores.length || 0
          });
          
          setAnalysisStatus("complete");
          
          // Save score to database if user is logged in and CV was uploaded
          if (user && uploadId) {
            try {
              await saveCVScore(user.id, uploadId, {
                overall: validationResult.score,
                keywordMatch: validationResult.detailedScores.keywordMatch || 0,
                formatting: validationResult.detailedScores.formatting || 0,
                sectionPresence: validationResult.detailedScores.sectionPresence || 0,
                readability: validationResult.detailedScores.readability || 0,
                length: validationResult.detailedScores.length || 0
              });
            } catch (error) {
              console.error("Error saving CV score:", error);
              // Continue even if saving score fails
            }
          }
          
          toast({
            title: "CV Analysis Complete",
            description: `Your CV scored ${validationResult.score}% against ATS criteria.`,
          });
          
          // Generate recommendations based on validation results
          if (validationResult.recommendations && validationResult.recommendations.length > 0) {
            generateRecommendations(
              {
                overall: validationResult.score,
                keywordMatch: validationResult.detailedScores.keywordMatch || 0,
                formatting: validationResult.detailedScores.formatting || 0,
                sectionPresence: validationResult.detailedScores.sectionPresence || 0,
                readability: validationResult.detailedScores.readability || 0,
                length: validationResult.detailedScores.length || 0
              }, 
              validationResult.recommendations,
              user?.id ? "premium" : "free"
            );
          } else {
            // Fallback to generating recommendations based on the score
            generateRecommendations(
              {
                overall: validationResult.score,
                keywordMatch: validationResult.detailedScores.keywordMatch || 0,
                formatting: validationResult.detailedScores.formatting || 0,
                sectionPresence: validationResult.detailedScores.sectionPresence || 0,
                readability: validationResult.detailedScores.readability || 0,
                length: validationResult.detailedScores.length || 0
              },
              null,
              user?.id ? "premium" : "free"
            );
          }
        } else {
          // Extract text content for analysis as fallback
          const textContent = await file.text().catch(() => {
            // If we can't read the file as text, provide a placeholder
            return `CV content for ${file.name}`;
          });

          // Generate a realistic variable score based on the CV content
          const variableScore = generateRealisticCVScore(textContent, jobDescription);
          
          setScore(variableScore);
          setAnalysisStatus("complete");
          
          // Save score to database if user is logged in and CV was uploaded
          if (user && uploadId) {
            try {
              await saveCVScore(user.id, uploadId, variableScore);
            } catch (error) {
              console.error("Error saving CV score:", error);
              // Continue even if saving score fails
            }
          }
          
          toast({
            title: "CV Analysis Complete",
            description: `Your CV scored ${variableScore.overall}% against ATS criteria.`,
          });
          
          // Generate recommendations based on CV score
          generateRecommendations(variableScore, null, user?.id ? "premium" : "free");
        }
      } else {
        // Validation failed
        setError(validationResult.reason || "Invalid CV. Please try another file.");
        setAnalysisStatus("error");
      }
        
      // If job description is provided, analyze it as well
      if (jobDescription.trim()) {
        analyzeJobDescription(file.name, jobDescription);
      }
    } catch (error) {
      console.error("Error analyzing CV:", error);
      setError("An error occurred while analyzing your CV. Please try again.");
      setAnalysisStatus("error");
    } finally {
      setIsAnalyzing(false);
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
      description: "Redirecting to pricing plans for detailed reports.",
    });
    navigate("/pricing");
  };

  const resetFile = () => {
    setFile(null);
    setJobDescription("");
    setShowJobDescription(false);
    setScore(null); // Reset score when selecting a new file
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
                    analyzeCV={analyzeCV}
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
