
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Users, ShieldCheck, AlertCircle } from "lucide-react";
import SubscriptionHeader from "@/components/subscription/SubscriptionHeader";
import SubscriptionOption from "@/components/subscription/SubscriptionOption";
import DiscountInfo from "@/components/subscription/DiscountInfo";
import { createCheckoutSession } from "@/services/payment-services";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Subscription = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Add a remaining count state - in a real implementation, this would come from Supabase
  const [remainingDiscounts, setRemainingDiscounts] = useState(500);
  
  const subscriptionOptions = [
    {
      id: "premium",
      title: "Premium",
      price: "R200",
      discountPrice: "R100",
      period: "/month",
      features: [
        "Unlimited CV analyses",
        "Detailed ATS scoring reports",
        "CV version history",
        "AI-powered recommendations",
        "Industry-specific keyword suggestions",
        "Priority support",
      ],
      recommended: true,
      icon: ShieldCheck
    },
    {
      id: "pay-per-use",
      title: "Pay-Per-Use",
      price: "R30",
      period: "/analysis",
      features: [
        "Per-use pricing model",
        "Detailed ATS scoring reports",
        "CV version comparison",
        "Basic recommendations",
        "Standard support",
      ],
      recommended: false,
      icon: Users
    }
  ];

  const handleSubscribe = async (optionId: string) => {
    // Reset any previous error message
    setErrorMessage(null);
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue with your purchase.",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    if (!consentGiven) {
      toast({
        title: "Consent Required",
        description: "Please agree to the payment processing terms before continuing.",
        variant: "destructive"
      });
      return;
    }

    setSelectedOption(optionId);
    setLoading(true);

    try {
      // Calculate amount in cents (R100 = 10000 cents, R30 = 3000 cents)
      const amount = optionId === "premium" ? 10000 : 3000;
      const type = optionId === "premium" ? "subscription" : "deep_analysis";
      
      console.log(`Creating checkout session for ${type} with amount ${amount}`);
      
      // Use the payment service to create a checkout session
      const data = await createCheckoutSession(amount, type);
      
      // Redirect to Yoco checkout
      if (data && data.redirectUrl) {
        console.log("Redirecting to checkout:", data.redirectUrl);
        window.location.href = data.redirectUrl;
      } else {
        console.error("Invalid response from payment service:", data);
        throw new Error("Invalid response from payment service");
      }
      
    } catch (error) {
      console.error("Payment error:", error);
      
      // Display error alert
      setErrorMessage("Unable to process your payment request. Our team has been notified about this issue.");
      
      toast({
        title: "Payment Error",
        description: "Unable to process your payment request. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <SubscriptionHeader remainingDiscounts={remainingDiscounts} />

        {errorMessage && (
          <div className="container mx-auto px-4 py-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          </div>
        )}

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {subscriptionOptions.map((option) => (
                <SubscriptionOption 
                  key={option.id}
                  id={option.id}
                  title={option.title}
                  price={option.price}
                  discountPrice={option.discountPrice}
                  period={option.period}
                  features={option.features}
                  recommended={option.recommended}
                  icon={option.icon}
                  onSubscribe={handleSubscribe}
                  isLoading={loading}
                  selectedOption={selectedOption}
                  consentGiven={consentGiven}
                  onConsentChange={setConsentGiven}
                  remainingDiscounts={option.recommended ? remainingDiscounts : undefined}
                />
              ))}
            </div>
          </div>
        </section>
        
        <DiscountInfo remainingDiscounts={remainingDiscounts} />
      </div>
      <Footer />
    </div>
  );
};

export default Subscription;
