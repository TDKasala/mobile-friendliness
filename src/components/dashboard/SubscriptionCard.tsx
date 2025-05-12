
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";

interface SubscriptionCardProps {
  subscription: { tier: string; expiryDate?: string } | null;
  isLoading: boolean;
  analysisCount?: number;
  totalAnalysisAllowed?: number;
}

const SubscriptionCard = ({ 
  subscription, 
  isLoading,
  analysisCount = 0,
  totalAnalysisAllowed = 100
}: SubscriptionCardProps) => {
  const isPremium = subscription?.tier === "premium";
  const usagePercentage = isPremium ? (analysisCount / totalAnalysisAllowed) * 100 : 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="text-xl font-bold text-sa-green capitalize">
              {subscription?.tier || "Free"} Plan
            </p>
            {subscription?.tier === "premium" && subscription?.expiryDate && (
              <>
                <p className="text-sm text-sa-gray mt-1">
                  Expires: {new Date(subscription.expiryDate).toLocaleDateString()}
                </p>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>CV Analysis Usage</span>
                    <span className={analysisCount >= totalAnalysisAllowed ? "text-red-500 font-medium" : ""}>
                      {analysisCount}/{totalAnalysisAllowed}
                    </span>
                  </div>
                  <Progress 
                    value={usagePercentage} 
                    className={`h-2 ${usagePercentage > 90 ? 'bg-red-100' : 'bg-sa-green/10'}`} 
                  />
                  
                  {analysisCount >= totalAnalysisAllowed && (
                    <div className="mt-2 text-xs flex items-start text-red-500">
                      <AlertCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                      <span>You've reached your monthly limit. Analysis will reset next billing cycle.</span>
                    </div>
                  )}
                  
                  {analysisCount > 0.8 * totalAnalysisAllowed && analysisCount < totalAnalysisAllowed && (
                    <div className="mt-2 text-xs flex items-start text-amber-500">
                      <AlertCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                      <span>You're approaching your monthly limit!</span>
                    </div>
                  )}
                </div>
              </>
            )}
            {subscription?.tier !== "premium" && (
              <Button 
                className="mt-3 bg-sa-green hover:bg-sa-green/90 text-white w-full"
                onClick={() => window.location.href = "/subscription"}
              >
                Upgrade to Premium
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
