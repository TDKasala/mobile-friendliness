
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCVValidation } from "@/hooks/use-cv-validation";
import { uploadCV, saveCVScore } from "@/services/database-service";
import { generateRealisticCVScore } from "@/utils/report-generator";
import { extractTextFromFile } from "@/utils/cv-analysis/text-extractor";
import { CVScore } from "@/lib/types";

export interface CVAnalysisHook {
  isAnalyzing: boolean;
  analysisStatus: "validating" | "analyzing" | "complete" | "error";
  score: CVScore | null;
  error: string | null;
  analyzeCV: (file: File, jobDescription: string, userId?: string) => Promise<void>;
  setError: (error: string | null) => void;
  setAnalysisStatus: (status: "validating" | "analyzing" | "complete" | "error") => void;
  resetScore: () => void;
  detailedAnalysis: any | null; // Store the full detailed analysis result
  scoreExplanations: Record<string, string> | null; // Store score explanations
  cvText: string | null; // Store the extracted CV text
}

export const useCVAnalysis = (): CVAnalysisHook => {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStatus, setAnalysisStatus] = useState<"validating" | "analyzing" | "complete" | "error">("validating");
  const [score, setScore] = useState<CVScore | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [detailedAnalysis, setDetailedAnalysis] = useState<any | null>(null);
  const [scoreExplanations, setScoreExplanations] = useState<Record<string, string> | null>(null);
  const [cvText, setCvText] = useState<string | null>(null);
  const { toast } = useToast();
  const { validateCVContent } = useCVValidation();

  const resetScore = useCallback(() => {
    setScore(null);
    setDetailedAnalysis(null);
    setScoreExplanations(null);
    setCvText(null);
  }, []);

  const analyzeCV = useCallback(async (file: File, jobDescription: string, userId?: string) => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysisStatus("analyzing");
    // Reset any existing score before starting new analysis
    setScore(null);
    setDetailedAnalysis(null);
    setScoreExplanations(null);
    setCvText(null);

    try {
      // Extract text content from the file
      const extractedText = await extractTextFromFile(file);
      setCvText(extractedText);
      
      // If user is signed in, upload CV to Supabase
      let uploadId = null;
      if (userId) {
        try {
          const uploadData = await uploadCV(file, userId);
          uploadId = uploadData.id;
        } catch (error) {
          console.error("Error uploading CV to storage:", error);
          // Continue with analysis even if storage upload fails
        }
      }

      // Get the enhanced validation result with DeepSeek API
      const validationResult = await validateCVContent(file);
      
      // Only proceed if validation passes
      if (validationResult.isValid) {
        // Store the full detailed analysis result
        setDetailedAnalysis(validationResult);
        
        // Store score explanations if available
        if (validationResult.scoreExplanations) {
          setScoreExplanations(validationResult.scoreExplanations);
        }
        
        // Use the scores from DeepSeek if available, otherwise generate realistic scores
        if (validationResult.detailedScores && validationResult.score !== undefined) {
          const newScore: CVScore = {
            overall: validationResult.score,
            keywordMatch: validationResult.detailedScores.keywordMatch || 0,
            formatting: validationResult.detailedScores.formatting || 0,
            sectionPresence: validationResult.detailedScores.sectionPresence || 0,
            readability: validationResult.detailedScores.readability || 0,
            length: validationResult.detailedScores.length || 0,
            bbbeeCompliance: validationResult.detailedScores.bbbeeCompliance || 0,
            contentRelevance: validationResult.detailedScores.atsCompatibility || 0,
            saQualifications: validationResult.detailedScores.nqfAlignment || 0
          };
          
          setScore(newScore);
          setAnalysisStatus("complete");
          
          // Save score to database if user is logged in and CV was uploaded
          if (userId && uploadId) {
            try {
              await saveCVScore(userId, uploadId, newScore);
            } catch (error) {
              console.error("Error saving CV score:", error);
              // Continue even if saving score fails
            }
          }
          
          toast({
            title: "CV Analysis Complete",
            description: `Your CV scored ${validationResult.score}% against ATS criteria.`,
          });
        } else {
          // Generate a realistic variable score based on the CV content
          const variableScore = generateRealisticCVScore(extractedText, jobDescription);
          
          setScore(variableScore);
          setAnalysisStatus("complete");
          
          // Save score to database if user is logged in and CV was uploaded
          if (userId && uploadId) {
            try {
              await saveCVScore(userId, uploadId, variableScore);
            } catch (error) {
              console.error("Error saving CV score:", error);
              // Continue even if saving score fails
            }
          }
          
          toast({
            title: "CV Analysis Complete",
            description: `Your CV scored ${variableScore.overall}% against ATS criteria.`,
          });
        }
      } else {
        // Validation failed
        setError(validationResult.reason || "Invalid CV. Please try another file.");
        setAnalysisStatus("error");
      }
    } catch (error) {
      console.error("Error analyzing CV:", error);
      setError("An error occurred while analyzing your CV. Please try again.");
      setAnalysisStatus("error");
    } finally {
      setIsAnalyzing(false);
    }
  }, [toast, validateCVContent]);

  return {
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
  };
};
