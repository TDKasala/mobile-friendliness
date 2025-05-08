
import React from "react";
import { Progress } from "@/components/ui/progress";
import { CVScore } from "@/lib/types";

interface ScoreDetailsProps {
  score: CVScore;
  explanations?: Record<string, string>;
}

const ScoreDetails: React.FC<ScoreDetailsProps> = ({ score, explanations = {} }) => {
  const scoreItems = [
    { key: "keywordMatch", label: "Keyword Match", value: score.keywordMatch },
    { key: "formatting", label: "Formatting", value: score.formatting },
    { key: "sectionPresence", label: "Section Presence", value: score.sectionPresence },
    { key: "readability", label: "Readability", value: score.readability },
    { key: "length", label: "Length", value: score.length },
    { key: "bbbeeCompliance", label: "B-BBEE Compliance", value: score.bbbeeCompliance },
    { key: "nqfAlignment", label: "NQF Alignment", value: score.nqfAlignment },
    { key: "localCertifications", label: "Local Certifications", value: score.localCertifications }
  ];

  const getColorClass = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getExplanation = (key: string) => {
    // Look for explanation from API first
    if (explanations[key]) return explanations[key];
    if (explanations[`sa_${key}`]) return explanations[`sa_${key}`];
    
    // Default explanations if none provided
    const defaultExplanations: Record<string, string> = {
      keywordMatch: "This measures how well your CV includes industry-specific keywords that ATS systems scan for.",
      formatting: "This evaluates the structure and layout of your CV for optimal ATS scanning.",
      sectionPresence: "This indicates whether your CV includes all standard sections expected by employers.",
      readability: "This measures how easy your CV is to read and understand.",
      length: "This evaluates if your CV has an appropriate length (typically 1-2 pages).",
      bbbeeCompliance: "This indicates how well your CV addresses South African B-BBEE requirements.",
      nqfAlignment: "This measures the inclusion of proper NQF levels for South African qualifications.",
      localCertifications: "This evaluates the inclusion of relevant South African certifications."
    };
    
    return defaultExplanations[key] || "";
  };

  return (
    <div className="space-y-6">
      {scoreItems.filter(item => item.value !== undefined).map((item) => (
        <div key={item.key} className="bg-white dark:bg-sa-blue/20 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-sa-gray dark:text-gray-300">
              {item.label}
            </p>
            <div className="text-lg font-semibold text-sa-blue dark:text-white">
              {item.value}%
            </div>
          </div>
          <Progress 
            value={item.value} 
            className={`h-2 bg-gray-200 dark:bg-gray-700`}
            indicatorClassName={getColorClass(item.value || 0)}
          />
          <p className="text-xs mt-2 text-sa-gray dark:text-gray-400">
            {getExplanation(item.key)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ScoreDetails;
