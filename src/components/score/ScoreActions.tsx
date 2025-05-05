
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, ClipboardCheck } from "lucide-react";
import TierUpgrade from "../TierUpgrade";
import { SubscriptionTier } from "@/lib/types";

interface ScoreActionsProps {
  tier: SubscriptionTier;
  onDownloadReport: () => void;
  onGetDetailedReport?: () => void;
  onUploadNew?: () => void;
}

const ScoreActions: React.FC<ScoreActionsProps> = ({ 
  tier, 
  onDownloadReport, 
  onGetDetailedReport, 
  onUploadNew 
}) => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <div className="flex flex-col gap-4">
        <Button
          variant="outline"
          className="bg-sa-yellow text-sa-blue hover:bg-sa-yellow/90 border-sa-yellow font-medium"
          onClick={onDownloadReport}
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
  );
};

export default ScoreActions;
