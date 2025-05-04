import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { SubscriptionTier } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, CreditCard } from "lucide-react";
import { createCheckoutSession } from "@/services/database-service";
import { getCurrentUser } from "@/lib/supabase";

interface TierUpgradeProps {
  currentTier: SubscriptionTier;
  onPurchaseAnalysis?: () => void;
}

const TierUpgrade = ({ currentTier, onPurchaseAnalysis }: TierUpgradeProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  const handleSubscribeClick = async () => {
    if (!consentGiven) {
      toast({
        title: "Consent Required",
        description: "Please agree to the payment processing terms before continuing.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in before subscribing.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      // Create a Yoco checkout session for subscription
      const data = await createCheckoutSession(user.id, 100, "subscription");
      
      // Redirect to Yoco checkout
      window.location.href = data.redirectUrl;
      
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "Unable to process your payment request. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handlePurchaseAnalysis = async () => {
    if (!consentGiven) {
      toast({
        title: "Consent Required",
        description: "Please agree to the payment processing terms before continuing.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in before purchasing.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      // Create a Yoco checkout session for one-time payment
      const data = await createCheckoutSession(user.id, 30, "deep_analysis");
      
      // Redirect to Yoco checkout
      window.location.href = data.redirectUrl;
      
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "Unable to process your payment request. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
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
            disabled={loading || currentTier === "premium"}
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            {loading ? "Processing..." : currentTier === "premium" ? "Already Subscribed" : "Subscribe to Premium"}
            <span className="ml-1 text-xs bg-white text-sa-blue px-1.5 py-0.5 rounded-full">
              R100/m
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

            <div className="mt-4 flex items-center space-x-2">
              <Checkbox 
                id="payment-consent" 
                checked={consentGiven}
                onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
              />
              <label 
                htmlFor="payment-consent" 
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                I agree to payment processing by Yoco and accept the terms of service in accordance with POPIA regulations
              </label>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button 
              className="bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue" 
              onClick={handleSubscribeClick}
              disabled={loading}
            >
              {loading ? "Processing..." : "Subscribe Now"}
              <span className="ml-1 text-xs bg-white text-sa-blue px-1.5 py-0.5 rounded-full">
                50% Off
              </span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {currentTier === "free" && (
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full border-sa-blue text-sa-blue hover:bg-sa-blue/10 dark:border-sa-green dark:text-sa-green"
            onClick={handlePurchaseAnalysis}
            disabled={loading}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            {loading ? "Processing..." : "One-time detailed analysis"}
            <span className="ml-1 text-xs bg-sa-blue/10 text-sa-blue px-1.5 py-0.5 rounded-full dark:bg-sa-green/10 dark:text-sa-green">
              R30
            </span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="one-time-payment-consent" 
              checked={consentGiven}
              onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
            />
            <label 
              htmlFor="one-time-payment-consent" 
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              I agree to payment processing by Yoco in accordance with POPIA regulations
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default TierUpgrade;
