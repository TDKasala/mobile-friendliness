import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CVScore, CVTip, SubscriptionTier } from "@/lib/types";
import { ClipboardCheck, FileText, Download } from "lucide-react";
import { generatePdfReport } from "@/utils/report-generator";
import { useToast } from "@/hooks/use-toast";
import TierUpgrade from "./TierUpgrade";

interface ATSScoreProps {
  score: CVScore;
  recommendations?: CVTip[];
  onGetDetailedReport?: () => void;
  onUploadNew?: () => void;
  tier: SubscriptionTier;
}

const ATSScore = ({ score, recommendations = [], onGetDetailedReport, onUploadNew, tier = "free" }: ATSScoreProps) => {
  const { toast } = useToast();
  
  // Helper function to determine score color
  const getScoreColor = (value: number) => {
    if (value >= 80) return "bg-sa-green dark:bg-sa-yellow";
    if (value >= 60) return "bg-sa-yellow dark:bg-sa-yellow/80";
    return "bg-orange-500";
  };

  // Helper function to get score description
  const getScoreDescription = (value: number) => {
    if (value >= 80) return "Excellent! Your CV is ATS-friendly.";
    if (value >= 60) return "Good start. Follow our tips to improve further.";
    return "Needs improvement. See our recommendations below.";
  };

  // Generate tips based on scores
  const generateTips = (): CVTip[] => {
    const tips: CVTip[] = [];
    
    if (score.keywordMatch && score.keywordMatch < 60) {
      tips.push({
        category: "Keywords",
        title: "Improve keyword matching",
        description: "Include relevant industry-specific keywords throughout your CV to improve ATS detection.",
        priority: "high"
      });
    }
    
    if (score.formatting && score.formatting < 70) {
      tips.push({
        category: "Formatting",
        title: "Simplify formatting",
        description: "Use simple, consistent formatting. Avoid headers, footers, tables and complex layouts.",
        priority: "medium"
      });
    }
    
    if (score.sectionPresence && score.sectionPresence < 75) {
      tips.push({
        category: "Structure",
        title: "Add missing sections",
        description: "Ensure your CV includes Contact Details, Work Experience, Education, and Skills sections.",
        priority: "high"
      });
    }
    
    if (score.readability && score.readability < 65) {
      tips.push({
        category: "Readability",
        title: "Improve readability",
        description: "Use clear language, bullet points and avoid overly complex sentences.",
        priority: "medium"
      });
    }
    
    if (score.length && score.length < 80) {
      tips.push({
        category: "Length",
        title: "Optimize CV length",
        description: "Keep your CV between 1-2 pages for optimal ATS scanning.",
        priority: "low"
      });
    }
    
    return tips;
  };

  const displayTips = recommendations.length > 0 ? recommendations : generateTips();
  
  // Filter tips based on subscription tier
  const filteredTips = tier === "free" ? displayTips.slice(0, 2) : displayTips;
  
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
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-white dark:bg-sa-blue/50 border-4 border-sa-green dark:border-sa-yellow flex items-center justify-center mb-4">
          <span className="text-4xl font-bold text-sa-blue dark:text-white">
            {score.overall}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-sa-blue dark:text-white">
          Your ATS Score
        </h3>
        <p className="text-sa-gray dark:text-gray-300 mt-1">
          {getScoreDescription(score.overall)}
        </p>
      </div>

      {/* Only show subscores for premium users */}
      {(tier === "premium" || tier === "pay-per-use") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {score.keywordMatch !== undefined && (
            <div className="bg-white dark:bg-sa-blue/20 p-4 rounded-lg">
              <p className="text-sm text-sa-gray dark:text-gray-300">
                Keyword Match
              </p>
              <div className="flex items-center mt-1">
                <div className="text-xl font-semibold text-sa-blue dark:text-white w-14">
                  {score.keywordMatch}%
                </div>
                <div className="flex-1">
                  <Progress 
                    value={score.keywordMatch} 
                    className="h-2 bg-gray-200 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}
          
          {score.formatting !== undefined && (
            <div className="bg-white dark:bg-sa-blue/20 p-4 rounded-lg">
              <p className="text-sm text-sa-gray dark:text-gray-300">
                Formatting
              </p>
              <div className="flex items-center mt-1">
                <div className="text-xl font-semibold text-sa-blue dark:text-white w-14">
                  {score.formatting}%
                </div>
                <div className="flex-1">
                  <Progress 
                    value={score.formatting} 
                    className="h-2 bg-gray-200 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}
          
          {score.sectionPresence !== undefined && (
            <div className="bg-white dark:bg-sa-blue/20 p-4 rounded-lg">
              <p className="text-sm text-sa-gray dark:text-gray-300">
                Section Presence
              </p>
              <div className="flex items-center mt-1">
                <div className="text-xl font-semibold text-sa-blue dark:text-white w-14">
                  {score.sectionPresence}%
                </div>
                <div className="flex-1">
                  <Progress 
                    value={score.sectionPresence} 
                    className="h-2 bg-gray-200 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}
          
          {score.readability !== undefined && (
            <div className="bg-white dark:bg-sa-blue/20 p-4 rounded-lg">
              <p className="text-sm text-sa-gray dark:text-gray-300">
                Readability
              </p>
              <div className="flex items-center mt-1">
                <div className="text-xl font-semibold text-sa-blue dark:text-white w-14">
                  {score.readability}%
                </div>
                <div className="flex-1">
                  <Progress 
                    value={score.readability} 
                    className="h-2 bg-gray-200 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}
          
          {score.length !== undefined && (
            <div className="bg-white dark:bg-sa-blue/20 p-4 rounded-lg">
              <p className="text-sm text-sa-gray dark:text-gray-300">
                Length
              </p>
              <div className="flex items-center mt-1">
                <div className="text-xl font-semibold text-sa-blue dark:text-white w-14">
                  {score.length}%
                </div>
                <div className="flex-1">
                  <Progress 
                    value={score.length} 
                    className="h-2 bg-gray-200 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tips Section */}
      {filteredTips.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-sa-blue dark:text-white mb-3">
            Improvement Tips
          </h4>
          <div className="space-y-3">
            {filteredTips.map((tip, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-sa-blue/20 p-4 rounded-lg border-l-4 border-sa-yellow"
              >
                <div className="flex items-center gap-2">
                  <span className={`
                    text-xs font-medium uppercase px-2 py-1 rounded-full
                    ${tip.priority === "high" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" : 
                      tip.priority === "medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" : 
                      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"}
                  `}>
                    {tip.priority}
                  </span>
                  <h5 className="text-sa-blue dark:text-white font-medium">{tip.title}</h5>
                </div>
                <p className="text-sa-gray dark:text-gray-300 text-sm mt-1">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Show upgrade message for free tier */}
          {tier === "free" && displayTips.length > 2 && (
            <div className="mt-3 bg-sa-blue/10 p-4 rounded-lg text-sm text-sa-blue dark:text-sa-yellow border border-sa-blue/20 dark:border-sa-yellow/20">
              <p>
                <strong>{displayTips.length - 2} more recommendations</strong> are available with Premium subscription.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="bg-sa-yellow text-sa-blue hover:bg-sa-yellow/90 border-sa-yellow font-medium"
            onClick={handleDownloadReport}
          >
            <Download className="mr-2 h-4 w-4" /> Download {tier === "free" ? "Basic" : "Detailed"} Report
          </Button>
          
          {tier === "free" && (
            <TierUpgrade 
              currentTier={tier} 
              onPurchaseAnalysis={onGetDetailedReport}
            />
          )}
          
          <Button 
            variant="outline"
            className="border-sa-blue text-sa-blue hover:bg-sa-blue/10 dark:border-sa-green dark:text-sa-green dark:hover:bg-sa-green/10"
            onClick={onUploadNew}
          >
            <ClipboardCheck className="mr-2 h-4 w-4" /> Upload New CV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ATSScore;
