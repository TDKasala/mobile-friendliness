
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Users, ShieldCheck } from "lucide-react";
import SubscriptionHeader from "@/components/subscription/SubscriptionHeader";
import SubscriptionOption from "@/components/subscription/SubscriptionOption";
import DiscountInfo from "@/components/subscription/DiscountInfo";

const Subscription = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  
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
      // Create a Yoco checkout session
      const amount = optionId === "premium" ? 100 : 30;
      const type = optionId === "premium" ? "subscription" : "deep_analysis";
      
      const response = await fetch("/api/create_checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount, 
          user_id: "current_user_id", // This would be replaced with the actual user ID in production
          type
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }
      
      const data = await response.json();
      // Redirect to Yoco checkout
      window.location.href = data.redirectUrl;
      
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "Unable to process your payment request. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <SubscriptionHeader remainingDiscounts={remainingDiscounts} />

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
