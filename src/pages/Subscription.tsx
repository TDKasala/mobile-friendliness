
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
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

  const handleSubscribe = (optionId: string) => {
    setSelectedOption(optionId);
    // In a real implementation, this would connect to PayFast
    toast({
      title: "Coming Soon!",
      description: "PayFast integration will be available shortly.",
    });
    
    // Normally would process payment first, then show success
    setTimeout(() => {
      toast({
        title: "Subscription Activated!",
        description: "Thank you for upgrading to " + optionId + "!",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <section className="pt-24 pb-12 bg-gradient-to-b from-white to-gray-50 dark:from-sa-blue dark:to-sa-blue/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 mb-4 text-sm bg-sa-yellow/30 text-sa-blue rounded-full">
                50% Off Launch Special!
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
                      RECOMMENDED OPTION
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
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSubscribe(option.id)}
                      className={`w-full ${
                        option.recommended 
                          ? "bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue" 
                          : "bg-sa-blue hover:bg-sa-blue/90 text-white"
                      }`}
                    >
                      {option.id === "premium" ? "Subscribe Now" : "Buy Credits"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Subscription;
