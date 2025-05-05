
import React from "react";
import { Progress } from "@/components/ui/progress";
import { CVScore } from "@/lib/types";

interface ScoreDetailsProps {
  score: CVScore;
}

const ScoreDetails: React.FC<ScoreDetailsProps> = ({ score }) => {
  const scoreItems = [
    { label: "Keyword Match", value: score.keywordMatch },
    { label: "Formatting", value: score.formatting },
    { label: "Section Presence", value: score.sectionPresence },
    { label: "Readability", value: score.readability },
    { label: "Length", value: score.length }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {scoreItems.map((item) => 
        item.value !== undefined && (
          <div key={item.label} className="bg-white dark:bg-sa-blue/20 p-4 rounded-lg">
            <p className="text-sm text-sa-gray dark:text-gray-300">
              {item.label}
            </p>
            <div className="flex items-center mt-1">
              <div className="text-xl font-semibold text-sa-blue dark:text-white w-14">
                {item.value}%
              </div>
              <div className="flex-1">
                <Progress 
                  value={item.value} 
                  className="h-2 bg-gray-200 dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ScoreDetails;
