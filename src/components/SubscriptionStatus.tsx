
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Users, ShieldCheck } from "lucide-react";
import { SubscriptionTier } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionStatusProps {
  tier: SubscriptionTier;
  expiryDate?: string;
  showUpgradeButton?: boolean;
}

const SubscriptionStatus = ({ tier, expiryDate, showUpgradeButton = true }: SubscriptionStatusProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const tierInfo = {
    free: {
      title: "Free Tier",
      description: "Basic CV analysis with limited features",
      color: "bg-sa-blue/10",
      icon: Users,
      cta: "Upgrade for unlimited analyses!"
    },
    "pay-per-use": {
      title: "Pay-Per-Use",
      description: "Pay only for the features you need",
      color: "bg-sa-yellow/20",
      icon: Users,
      cta: "Get Premium for unlimited access!"
    },
    premium: {
      title: "Premium Subscription",
      description: "Full access to all ATSBoost features",
      color: "bg-sa-green/20",
      icon: ShieldCheck,
      cta: "Your subscription is active"
    }
  };

  const info = tierInfo[tier];

  const handleUpgrade = () => {
    navigate("/subscription");
    toast({
      title: "Subscription Options",
      description: "Check out our pricing plans for full access to ATSBoost features!",
    });
  };

  return (
    <div className={`rounded-lg p-4 ${info.color} border border-gray-200 shadow-sm`}>
      <div className="flex items-start space-x-3">
        <div className="rounded-full p-2 bg-white">
          <info.icon className="h-5 w-5 text-sa-blue" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sa-blue">
              {info.title}
            </h3>
            {tier === "premium" && expiryDate && (
              <span className="text-xs bg-sa-green/20 text-sa-green px-2 py-1 rounded-full">
                Expires {new Date(expiryDate).toLocaleDateString()}
              </span>
            )}
          </div>
          <p className="text-sm text-sa-gray mt-1">{info.description}</p>
          
          {tier !== "premium" && showUpgradeButton && (
            <div className="mt-3">
              <Button
                onClick={handleUpgrade}
                className="bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue"
                size="sm"
              >
                Upgrade Now
                <span className="ml-1 text-xs bg-white text-sa-blue px-1.5 py-0.5 rounded-full">
                  50% Off
                </span>
              </Button>
            </div>
          )}

          {tier === "premium" && (
            <p className="text-sm text-sa-green mt-2">
              {info.cta}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionStatus;
