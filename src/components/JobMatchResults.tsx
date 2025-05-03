
import { JobMatch } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface JobMatchResultsProps {
  jobMatch: JobMatch;
  jobDescription: string;
  isPremium?: boolean;
  onGetPremiumInsights?: () => void;
}

const JobMatchResults = ({ 
  jobMatch, 
  jobDescription, 
  isPremium = false,
  onGetPremiumInsights 
}: JobMatchResultsProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const truncatedDescription = jobDescription.length > 150 
    ? `${jobDescription.substring(0, 150)}...` 
    : jobDescription;

  return (
    <div className="space-y-4 mt-6">
      <div className="bg-gray-50 dark:bg-sa-blue/20 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-sa-blue dark:text-white">Job Description Match</h3>
          <Badge 
            className={`${
              jobMatch.score >= 80 
                ? "bg-sa-green dark:bg-sa-green" 
                : jobMatch.score >= 60 
                ? "bg-sa-yellow dark:bg-sa-yellow" 
                : "bg-orange-500 dark:bg-orange-500"
            } text-white`}
          >
            {jobMatch.score}% Match
          </Badge>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-sa-gray dark:text-gray-300">
            {showFullDescription ? jobDescription : truncatedDescription}
          </p>
          {jobDescription.length > 150 && (
            <button 
              onClick={() => setShowFullDescription(!showFullDescription)} 
              className="text-xs text-sa-blue dark:text-sa-green font-medium mt-1 hover:underline"
            >
              {showFullDescription ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2 text-sa-blue dark:text-white">Matched Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {jobMatch.matchedKeywords.length > 0 ? (
                jobMatch.matchedKeywords.map((keyword, idx) => (
                  <Badge 
                    key={idx}
                    variant="outline" 
                    className="bg-green-50 text-sa-green border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {keyword.keyword}
                  </Badge>
                ))
              ) : (
                <p className="text-xs text-sa-gray dark:text-gray-400">No keyword matches found.</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 text-sa-blue dark:text-white">Missing Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {jobMatch.missingKeywords.length > 0 ? (
                jobMatch.missingKeywords.slice(0, isPremium ? undefined : 3).map((keyword, idx) => (
                  <Badge 
                    key={idx}
                    variant="outline" 
                    className="bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800 flex items-center gap-1"
                  >
                    <XCircle className="w-3 h-3" />
                    {keyword.keyword}
                    {keyword.importance === 'high' && (
                      <span className="bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200 text-[10px] px-1 py-0.5 rounded-full">
                        Critical
                      </span>
                    )}
                  </Badge>
                ))
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">No missing keywords found.</p>
              )}
              {!isPremium && jobMatch.missingKeywords.length > 3 && (
                <Badge variant="outline" className="bg-gray-50 text-sa-gray border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
                  +{jobMatch.missingKeywords.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {jobMatch.suggestions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 text-sa-blue dark:text-white">Suggestions</h4>
              <ul className="space-y-2">
                {jobMatch.suggestions.slice(0, isPremium ? undefined : 2).map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-sa-gray dark:text-gray-300">
                    <AlertCircle className="w-4 h-4 text-sa-yellow flex-shrink-0 mt-0.5" />
                    {suggestion}
                  </li>
                ))}
              </ul>
              {!isPremium && jobMatch.suggestions.length > 2 && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <Button 
                    onClick={onGetPremiumInsights}
                    size="sm"
                    className="bg-sa-blue hover:bg-sa-blue/90 text-white dark:bg-sa-green dark:hover:bg-sa-green/90 w-full"
                  >
                    Get Premium Insights (R30)
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobMatchResults;
