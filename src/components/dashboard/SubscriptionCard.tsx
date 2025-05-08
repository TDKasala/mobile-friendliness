
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubscriptionCardProps {
  subscription: { tier: string; expiryDate?: string } | null;
  isLoading: boolean;
}

const SubscriptionCard = ({ subscription, isLoading }: SubscriptionCardProps) => {
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
              <p className="text-sm text-sa-gray mt-1">
                Expires: {new Date(subscription.expiryDate).toLocaleDateString()}
              </p>
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
