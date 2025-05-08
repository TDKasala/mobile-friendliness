
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { SubscriptionTier } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, CreditCard } from "lucide-react";

interface TierUpgradeProps {
  currentTier: SubscriptionTier;
  onPurchaseAnalysis?: () => void;
  largeButtons?: boolean;
  showDiscount?: boolean;
}

const TierUpgrade = ({ 
  currentTier, 
  onPurchaseAnalysis,
  largeButtons = false,
  showDiscount = true
}: TierUpgradeProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribeClick = () => {
    navigate("/subscription");
    toast({
      title: "Pricing Options",
      description: "Choose a plan that works best for you.",
    });
  };

  const handlePurchaseAnalysis = () => {
    if (onPurchaseAnalysis) {
      onPurchaseAnalysis();
    } else {
      navigate("/subscription");
      toast({
        title: "Pay-Per-Use Option",
        description: "Get a one-time detailed analysis for R30.",
      });
    }
  };

  // Show premium badge for premium users
  if (currentTier === "premium") {
    return (
      <div className="flex items-center justify-center p-3 bg-sa-green/10 rounded-lg border border-sa-green/30 text-sa-green">
        <ShieldCheck className="h-5 w-5 mr-2" />
        <span className="font-medium">Premium features active</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-sa-blue/20 rounded-lg border border-gray-200 dark:border-sa-blue/50 p-4 shadow-sm">
      <Button
        className={`w-full bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue font-medium mb-2 ${largeButtons ? 'py-6' : ''}`}
        onClick={handleSubscribeClick}
      >
        <ShieldCheck className="h-4 w-4 mr-2" />
        Subscribe to Premium
        {showDiscount ? (
          <span className="ml-1 text-xs bg-white text-sa-blue px-1.5 py-0.5 rounded-full">
            R100/m
          </span>
        ) : null}
      </Button>
      
      {currentTier === "free" && (
        <div>
          <Button
            variant="outline"
            className={`w-full border-sa-blue text-sa-blue hover:bg-sa-blue/10 dark:border-sa-green dark:text-sa-green ${largeButtons ? 'py-6 mt-2' : ''}`}
            onClick={onPurchaseAnalysis || handlePurchaseAnalysis}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            One-time detailed analysis
            <span className="ml-1 text-xs bg-sa-blue/10 text-sa-blue px-1.5 py-0.5 rounded-full dark:bg-sa-green/10 dark:text-sa-green">
              R30
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default TierUpgrade;
