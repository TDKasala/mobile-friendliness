
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { SubscriptionTier } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, CreditCard } from "lucide-react";

interface TierUpgradeProps {
  currentTier: SubscriptionTier;
  onPurchaseAnalysis?: () => void;
}

const TierUpgrade = ({ currentTier, onPurchaseAnalysis }: TierUpgradeProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribeClick = () => {
    navigate("/subscription");
    toast({
      title: "Subscription Options",
      description: "Check out our pricing plans for full access to ATSBoost features!",
    });
  };

  const handlePurchaseAnalysis = () => {
    if (onPurchaseAnalysis) {
      onPurchaseAnalysis();
      toast({
        title: "Purchase Success",
        description: "You now have access to a detailed CV analysis!",
      });
    } else {
      toast({
        title: "Coming Soon",
        description: "Pay-per-use functionality will be available shortly.",
      });
    }
  };

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
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue font-medium mb-2"
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            Subscribe to Premium
            <span className="ml-1 text-xs bg-white text-sa-blue px-1.5 py-0.5 rounded-full">
              R200/m
            </span>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Premium Subscription</DialogTitle>
            <DialogDescription>
              Unlock all features including unlimited analyses, detailed reports, and premium CV templates.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg 
                  className="h-5 w-5 text-sa-green mr-2 flex-shrink-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Unlimited CV analyses</span>
              </li>
              <li className="flex items-start">
                <svg 
                  className="h-5 w-5 text-sa-green mr-2 flex-shrink-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Detailed ATS scoring reports</span>
              </li>
              <li className="flex items-start">
                <svg 
                  className="h-5 w-5 text-sa-green mr-2 flex-shrink-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">AI-powered recommendations</span>
              </li>
            </ul>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button 
              className="bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue" 
              onClick={handleSubscribeClick}
            >
              Subscribe Now
              <span className="ml-1 text-xs bg-white text-sa-blue px-1.5 py-0.5 rounded-full">
                50% Off
              </span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {currentTier === "free" && (
        <Button
          variant="outline"
          className="w-full border-sa-blue text-sa-blue hover:bg-sa-blue/10 dark:border-sa-green dark:text-sa-green"
          onClick={handlePurchaseAnalysis}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          One-time detailed analysis
          <span className="ml-1 text-xs bg-sa-blue/10 text-sa-blue px-1.5 py-0.5 rounded-full dark:bg-sa-green/10 dark:text-sa-green">
            R30
          </span>
        </Button>
      )}
    </div>
  );
};

export default TierUpgrade;
