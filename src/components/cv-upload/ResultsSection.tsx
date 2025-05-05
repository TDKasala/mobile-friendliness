
import React from "react";
import ATSScore from "@/components/ATSScore";
import JobMatchResults from "@/components/JobMatchResults";
import { CVScore, CVTip, JobMatch } from "@/lib/types";

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
  return (
    <>
      <ATSScore 
        score={score} 
        recommendations={recommendations}
        onGetDetailedReport={getDetailedReport}
        onUploadNew={resetUpload}
        tier={userTier}
      />
      
      {/* Job Match Results */}
      {jobMatch && (
        <JobMatchResults 
          jobMatch={jobMatch}
          jobDescription={jobDescription}
          recommendations={recommendations}
          userTier={userTier}
          onGetPremiumInsights={getDetailedReport}
        />
      )}
    </>
  );
};

export default ResultsSection;
