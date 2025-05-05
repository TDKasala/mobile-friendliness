
import React from "react";
import { CVScore, CVTip, SubscriptionTier } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { generatePdfReport } from "@/utils/report-generator";
import ScoreCircle from "./score/ScoreCircle";
import ScoreDetails from "./score/ScoreDetails";
import TipsList from "./score/TipsList";
import ScoreActions from "./score/ScoreActions";

interface ATSScoreProps {
  score: CVScore;
  recommendations?: CVTip[];
  onGetDetailedReport?: () => void;
  onUploadNew?: () => void;
  tier: SubscriptionTier;
}

const ATSScore = ({ 
  score, 
  recommendations = [], 
  onGetDetailedReport, 
  onUploadNew, 
  tier = "free" 
}: ATSScoreProps) => {
  const { toast } = useToast();
  
  // Generate tips based on scores if no recommendations provided
  const generateTips = (): CVTip[] => {
    const tips: CVTip[] = [];
    
    if (score.keywordMatch && score.keywordMatch < 60) {
      tips.push({
        id: "keywords-1",
        category: "Keywords",
        title: "Improve keyword matching",
        text: "Include relevant industry-specific keywords throughout your CV to improve ATS detection.",
        description: "Include relevant industry-specific keywords throughout your CV to improve ATS detection.",
        priority: "high"
      });
    }
    
    if (score.formatting && score.formatting < 70) {
      tips.push({
        id: "format-1",
        category: "Formatting",
        title: "Simplify formatting",
        text: "Use simple, consistent formatting. Avoid headers, footers, tables and complex layouts.",
        description: "Use simple, consistent formatting. Avoid headers, footers, tables and complex layouts.",
        priority: "medium"
      });
    }
    
    if (score.sectionPresence && score.sectionPresence < 75) {
      tips.push({
        id: "structure-1",
        category: "Structure",
        title: "Add missing sections",
        text: "Ensure your CV includes Contact Details, Work Experience, Education, and Skills sections.",
        description: "Ensure your CV includes Contact Details, Work Experience, Education, and Skills sections.",
        priority: "high"
      });
    }
    
    if (score.readability && score.readability < 65) {
      tips.push({
        id: "read-1",
        category: "Readability",
        title: "Improve readability",
        text: "Use clear language, bullet points and avoid overly complex sentences.",
        description: "Use clear language, bullet points and avoid overly complex sentences.",
        priority: "medium"
      });
    }
    
    if (score.length && score.length < 80) {
      tips.push({
        id: "length-1",
        category: "Length",
        title: "Optimize CV length",
        text: "Keep your CV between 1-2 pages for optimal ATS scanning.",
        description: "Keep your CV between 1-2 pages for optimal ATS scanning.",
        priority: "low"
      });
    }
    
    return tips;
  };

  const displayTips = recommendations.length > 0 ? recommendations : generateTips();
  
  const handleDownloadReport = () => {
    try {
      generatePdfReport(score, displayTips, tier);
      toast({
        title: "Report Generated",
        description: `Your ${tier === "free" ? "basic" : "detailed"} ATS report has been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Score Circle with overall score */}
      <ScoreCircle score={score.overall} />

      {/* Detailed scores for premium users */}
      {(tier === "premium" || tier === "pay-per-use") && (
        <ScoreDetails score={score} />
      )}

      {/* Tips Section */}
      {displayTips.length > 0 && (
        <TipsList 
          tips={displayTips} 
          tier={tier} 
          displayCount={2} 
        />
      )}

      {/* Actions Section */}
      <ScoreActions 
        tier={tier}
        onDownloadReport={handleDownloadReport}
        onGetDetailedReport={onGetDetailedReport}
        onUploadNew={onUploadNew}
      />
    </div>
  );
};

export default ATSScore;
