
import React from "react";
import ATSScore from "@/components/ATSScore";
import JobMatchResults from "@/components/JobMatchResults";
import { CVScore, CVTip, JobMatch, KeywordMatch } from "@/lib/types";

interface ResultsSectionProps {
  score: CVScore;
  jobMatch: JobMatch | null;
  jobDescription: string;
  recommendations: CVTip[];
  userTier: "free" | "premium";
  getDetailedReport: () => void;
  resetUpload: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  score,
  jobMatch,
  jobDescription,
  recommendations,
  userTier,
  getDetailedReport,
  resetUpload
}) => {
  // Don't render until score is available
  if (!score) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      <ATSScore 
        score={score} 
        recommendations={recommendations}
        onGetDetailedReport={getDetailedReport}
        onUploadNew={resetUpload}
        tier={userTier}
      />
      
      {/* Job Match Results */}
      {jobMatch && jobMatch.score !== undefined && (
        <JobMatchResults 
          jobTitle={jobMatch.matches && jobMatch.matches.length > 0 ? 
            jobMatch.matches[0]?.keyword || "Not specified" : 
            "Not specified"}
          company={"Not specified"} // Using default value since it's not in JobMatch type
          matchPercentage={jobMatch.score || 0}
          keywords={jobMatch.matchedKeywords || []}
        />
      )}
      
      {/* POPIA Compliance Note */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        <p>Your CV was analyzed by DeepSeek AI in compliance with POPIA.</p>
        <p>Data is stored securely and can be deleted upon request.</p>
      </div>
    </div>
  );
};

export default ResultsSection;
