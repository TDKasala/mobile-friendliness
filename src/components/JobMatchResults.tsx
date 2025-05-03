
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { CVTip, JobMatch } from "@/lib/types";

interface JobMatchResultsProps {
  jobMatch: JobMatch;
  jobDescription: string;
  onGetPremiumInsights: () => void;
  recommendations?: CVTip[];
  userTier?: "free" | "pay-per-use" | "premium";
}

const JobMatchResults: React.FC<JobMatchResultsProps> = ({ 
  jobMatch, 
  jobDescription, 
  onGetPremiumInsights,
  recommendations = [],
  userTier = "free"
}) => {
  const [showAllKeywords, setShowAllKeywords] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Calculate the total number of keywords
  const totalKeywords = jobMatch.matchedKeywords.length + jobMatch.missingKeywords.length;
  
  // Function to determine class based on importance
  const getImportanceClass = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-sa-gray dark:text-gray-400';
      default:
        return '';
    }
  };

  // Get job-specific recommendations
  const jobRecommendations = recommendations.filter(tip => tip.category === 'Job Match');

  return (
    <div className="mt-8 bg-gray-50 dark:bg-sa-blue/20 rounded-xl p-6 border border-gray-200 dark:border-sa-blue/60">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-sa-blue dark:text-white flex items-center">
            Job Match Analysis
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 ml-2">
                {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </CollapsibleTrigger>
          </h3>
          <div className="text-3xl font-bold text-sa-green dark:text-sa-yellow">
            {jobMatch.score}%
          </div>
        </div>

        <CollapsibleContent>
          <div className="mt-4">
            <Progress value={jobMatch.score} className="h-2 bg-gray-200 dark:bg-gray-700" />
          </div>
          
          <div className="mt-6 space-y-4">
            {/* Job-specific recommendations */}
            {jobRecommendations.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3 text-sa-blue dark:text-white">
                  Recommended Improvements
                </h4>
                <ul className="space-y-3">
                  {jobRecommendations.map((tip, index) => (
                    <li key={index} className="bg-sa-green/10 dark:bg-sa-green/20 p-3 rounded-md">
                      <h5 className="font-medium text-sa-blue dark:text-white mb-1">{tip.title}</h5>
                      <p className="text-sa-gray dark:text-gray-300 text-sm">{tip.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="text-lg font-medium mb-3 text-sa-blue dark:text-white">
                Keywords Analysis
              </h4>
              <p className="text-sa-gray dark:text-gray-300 mb-4">
                {`Your CV matches ${jobMatch.matchedKeywords.length} out of ${totalKeywords} important keywords from this job description.`}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Matched Keywords */}
                <div>
                  <h5 className="font-medium text-sa-blue dark:text-white mb-2 flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-sa-green mr-1" />
                    Matched Keywords 
                    <span className="ml-2 text-sm font-normal text-sa-gray dark:text-gray-400">
                      ({jobMatch.matchedKeywords.length})
                    </span>
                  </h5>
                  <ul className="space-y-1">
                    {jobMatch.matchedKeywords.slice(0, showAllKeywords ? undefined : 5).map((keyword, index) => (
                      <li 
                        key={index} 
                        className={`text-sm flex items-center ${getImportanceClass(keyword.importance)}`}
                      >
                        <span className="mr-2">•</span> {keyword.keyword}
                        {keyword.importance === 'high' && (
                          <span className="ml-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-1.5 py-0.5 rounded">
                            critical
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Missing Keywords */}
                <div>
                  <h5 className="font-medium text-sa-blue dark:text-white mb-2 flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-1" />
                    Missing Keywords
                    <span className="ml-2 text-sm font-normal text-sa-gray dark:text-gray-400">
                      ({jobMatch.missingKeywords.length})
                    </span>
                  </h5>
                  <ul className="space-y-1">
                    {jobMatch.missingKeywords.slice(0, showAllKeywords ? undefined : 5).map((keyword, index) => (
                      <li 
                        key={index} 
                        className={`text-sm flex items-center ${getImportanceClass(keyword.importance)}`}
                      >
                        <span className="mr-2">•</span> {keyword.keyword}
                        {keyword.importance === 'high' && (
                          <span className="ml-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-1.5 py-0.5 rounded">
                            critical
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Show more/less button */}
              {(jobMatch.matchedKeywords.length > 5 || jobMatch.missingKeywords.length > 5) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-3 text-sa-blue dark:text-sa-green"
                  onClick={() => setShowAllKeywords(!showAllKeywords)}
                >
                  {showAllKeywords ? "Show Less" : "Show All Keywords"}
                </Button>
              )}
            </div>
            
            {/* Additional suggestions */}
            <div>
              <h4 className="text-lg font-medium mb-3 text-sa-blue dark:text-white">
                Improvement Suggestions
              </h4>
              <ul className="space-y-2">
                {jobMatch.suggestions.slice(0, userTier === "premium" ? undefined : 2).map((suggestion, index) => (
                  <li key={index} className="text-sm text-sa-gray dark:text-gray-300">
                    <span className="mr-2">•</span> {suggestion}
                  </li>
                ))}
              </ul>
              
              {userTier !== "premium" && jobMatch.suggestions.length > 2 && (
                <div className="mt-4">
                  <Button
                    variant="default"
                    className="bg-sa-blue hover:bg-sa-blue/90 text-white dark:bg-sa-green dark:hover:bg-sa-green/90"
                    onClick={onGetPremiumInsights}
                  >
                    Get Premium Insights
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-xs text-sa-gray dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
            <p>
              Job description length: {jobDescription.length} characters • 
              Analysis completed on {new Date().toLocaleDateString()}
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default JobMatchResults;
