
import React from "react";
import { CVTip } from "@/lib/types";

interface TipsListProps {
  tips: CVTip[];
  tier: string;
  displayCount: number;
}

const TipsList: React.FC<TipsListProps> = ({ tips, tier, displayCount }) => {
  const filteredTips = tier === "free" ? tips.slice(0, displayCount) : tips;
  
  return (
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
              <h5 className="text-sa-blue dark:text-white font-medium">{tip.title || tip.text}</h5>
            </div>
            <p className="text-sa-gray dark:text-gray-300 text-sm mt-1">
              {tip.description || tip.text}
            </p>
          </div>
        ))}
      </div>
      
      {/* Show upgrade message for free tier */}
      {tier === "free" && tips.length > displayCount && (
        <div className="mt-3 bg-sa-blue/10 p-4 rounded-lg text-sm text-sa-blue dark:text-sa-yellow border border-sa-blue/20 dark:border-sa-yellow/20">
          <p>
            <strong>{tips.length - displayCount} more recommendations</strong> are available with Premium subscription.
          </p>
        </div>
      )}
    </div>
  );
};

export default TipsList;
