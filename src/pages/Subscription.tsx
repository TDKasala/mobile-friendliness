
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Users, BadgeCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

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
        <section className="pt-24 pb-12 bg-gradient-to-b from-white to-gray-50 dark:from-sa-blue dark:to-sa-blue/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 mb-4 text-sm bg-sa-yellow/30 text-sa-blue rounded-full">
                50% Off Launch Special! <span className="font-bold">Only {remainingDiscounts} spots left</span>
              </span>
              <h1 className="text-4xl font-bold mb-4 text-sa-blue dark:text-white">
                Choose Your Plan
              </h1>
              <p className="text-sa-gray dark:text-gray-300 mb-6">
                Upgrade to get advanced ATS features, detailed reports, and unlimited CV analyses
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {subscriptionOptions.map((option) => (
                <Card 
                  key={option.id} 
                  className={`overflow-hidden transition-all ${
                    option.recommended ? "border-sa-yellow/50 shadow-lg" : "border-gray-200"
                  }`}
                >
                  {option.recommended && (
                    <div className="bg-sa-yellow text-sa-blue text-xs font-medium py-1 text-center">
                      RECOMMENDED OPTION - 50% OFF LAUNCH SPECIAL
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="rounded-full p-1.5 bg-sa-blue/10">
                          <option.icon className="h-5 w-5 text-sa-blue" />
                        </div>
                        <CardTitle>{option.title}</CardTitle>
                      </div>
                      <div className="text-right">
                        {option.discountPrice ? (
                          <>
                            <div className="text-2xl font-bold text-sa-blue">
                              {option.discountPrice}
                              <span className="text-sm font-normal text-sa-gray">{option.period}</span>
                            </div>
                            <div className="text-sm line-through text-sa-gray">
                              {option.price}{option.period}
                            </div>
                          </>
                        ) : (
                          <div className="text-2xl font-bold text-sa-blue">
                            {option.price}
                            <span className="text-sm font-normal text-sa-gray">{option.period}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <CardDescription>
                      {option.id === "premium" 
                        ? "Unlimited access to all ATSBoost features" 
                        : "Pay only for what you need"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {option.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg 
                            className="h-5 w-5 text-sa-green mr-2 flex-shrink-0" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sa-gray text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {option.recommended && (
                      <div className="mt-4 p-3 bg-sa-yellow/20 rounded-md text-xs">
                        <div className="flex items-center">
                          <BadgeCheck className="h-4 w-4 text-sa-yellow mr-2" />
                          <span className="font-medium text-sa-blue">Limited Time Discount</span>
                        </div>
                        <p className="mt-1 text-sa-gray">
                          Only {remainingDiscounts} discounted subscriptions remaining!
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-4 flex items-center space-x-2">
                      <Checkbox 
                        id={`consent-${option.id}`} 
                        checked={consentGiven}
                        onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
                      />
                      <label 
                        htmlFor={`consent-${option.id}`} 
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        I agree to payment processing by Yoco in accordance with POPIA
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSubscribe(option.id)}
                      disabled={loading}
                      className={`w-full ${
                        option.recommended 
                          ? "bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue" 
                          : "bg-sa-blue hover:bg-sa-blue/90 text-white"
                      }`}
                    >
                      {loading && selectedOption === option.id ? "Processing..." : option.id === "premium" ? "Subscribe Now" : "Buy Credits"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Info section about the discount */}
        <section className="py-8 pb-16 bg-gray-50 dark:bg-sa-blue/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl font-bold mb-4 text-sa-blue dark:text-white">
                About Our Launch Discount
              </h2>
              <p className="text-sa-gray dark:text-gray-300 mb-6">
                To celebrate our launch, we're offering a 50% discount on our Premium plan for the first 500 subscribers. 
                That's only R100/month instead of R200/month! Subscribe now to secure your discount!
              </p>
              <div className="flex justify-center">
                <div className="bg-white dark:bg-sa-blue/50 p-4 rounded-lg shadow-sm inline-block">
                  <div className="text-sa-blue dark:text-white font-medium">Discount Remaining</div>
                  <div className="text-2xl font-bold text-sa-green dark:text-sa-yellow">{remainingDiscounts}/500</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Subscription;
