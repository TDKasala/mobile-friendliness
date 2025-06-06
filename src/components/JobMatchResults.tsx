
import React from "react";
import { Badge } from "@/components/ui/badge";
import { KeywordMatch, JobMatch } from "@/lib/types";

interface JobMatchResultsProps {
  jobTitle: string;
  company: string;
  matchPercentage?: number;
  keywords?: string[] | { keyword: string; importance: string }[] | KeywordMatch[];
  jobMatch?: JobMatch;
  onClose?: () => void;
  isLoading?: boolean;
}

/**
 * Job Match Results Component
 * Displays the results of a job match analysis, including match percentage and keyword analysis.
 */
const JobMatchResults: React.FC<JobMatchResultsProps> = ({
  jobTitle,
  company,
  matchPercentage,
  keywords,
  jobMatch,
  onClose,
  isLoading,
}) => {
  // Use matchPercentage from props or from jobMatch if provided
  const score = matchPercentage || (jobMatch ? jobMatch.score : 0);
  
  // Use keywords from props or from jobMatch if provided
  const keywordsToRender = keywords || 
    (jobMatch && jobMatch.matchedKeywords ? 
      jobMatch.matchedKeywords : 
      []);

  // Determine badge color based on match percentage
  let badgeColor = "bg-red-500";
  if (score >= 50) {
    badgeColor = "bg-yellow-500";
  }
  if (score >= 75) {
    badgeColor = "bg-green-500";
  }

  // Check if keywords is an array of strings or objects
  const renderKeywords = () => {
    if (isLoading) {
      return <p className="text-gray-500">Analyzing keywords...</p>;
    }
    
    if (!keywordsToRender || keywordsToRender.length === 0) {
      return <p className="text-gray-500">No keywords detected</p>;
    }

    // Check if keywords are objects with keyword property or just strings
    const isKeywordObject = typeof keywordsToRender[0] !== 'string';

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {keywordsToRender.map((item, index) => {
          // Handle both string keywords and object keywords with importance or KeywordMatch objects
          const keywordText = isKeywordObject ? (item as any).keyword : item;
          let importance = 'medium'; // default
          
          // Check for importance in different object types
          if (isKeywordObject) {
            if ((item as any).importance) {
              importance = (item as any).importance;
            } else if ((item as any).strength) {
              // Map strength to importance if it's a KeywordMatch object
              const strength = (item as any).strength;
              if (strength === 'strong') importance = 'high';
              else if (strength === 'weak') importance = 'low';
            }
          }
          
          // Determine badge color based on importance
          let badgeColor = "bg-blue-100 text-blue-800"; // default for medium or string keywords
          if (isKeywordObject) {
            if (importance === 'high') {
              badgeColor = "bg-green-100 text-green-800";
            } else if (importance === 'low') {
              badgeColor = "bg-gray-100 text-gray-800";
            }
          }
          
          return (
            <span key={index} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}>
              {keywordText}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Job Match Analysis
        </h3>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            &times;
          </button>
        )}
      </div>
      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">Job Title:</span> {jobTitle}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">Company:</span> {company}
        </p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Match Percentage:
        </span>
        <Badge className={badgeColor}>{isLoading ? "Analyzing..." : `${score}%`}</Badge>
      </div>
      <div>
        <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
          Key Matched Keywords:
        </h4>
        {renderKeywords()}
      </div>
    </div>
  );
};

export default JobMatchResults;
