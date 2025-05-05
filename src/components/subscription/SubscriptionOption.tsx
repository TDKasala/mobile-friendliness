
import React from "react";
import { LucideIcon, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface SubscriptionOptionProps {
  id: string;
  title: string;
  price: string;
  discountPrice?: string;
  period: string;
  features: string[];
  recommended: boolean;
  icon: LucideIcon;
  onSubscribe: (optionId: string) => void;
  isLoading: boolean;
  selectedOption: string | null;
  consentGiven: boolean;
  onConsentChange: (checked: boolean) => void;
  remainingDiscounts?: number;
}

const SubscriptionOption: React.FC<SubscriptionOptionProps> = ({
  id,
  title,
  price,
  discountPrice,
  period,
  features,
  recommended,
  icon: Icon,
  onSubscribe,
  isLoading,
  selectedOption,
  consentGiven,
  onConsentChange,
  remainingDiscounts,
}) => {
  return (
    <Card 
      className={`overflow-hidden transition-all ${
        recommended ? "border-sa-yellow/50 shadow-lg" : "border-gray-200"
      }`}
    >
      {recommended && (
        <div className="bg-sa-yellow text-sa-blue text-xs font-medium py-1 text-center">
          RECOMMENDED OPTION - 50% OFF LAUNCH SPECIAL
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-full p-1.5 bg-sa-blue/10">
              <Icon className="h-5 w-5 text-sa-blue" />
            </div>
            <CardTitle>{title}</CardTitle>
          </div>
          <div className="text-right">
            {discountPrice ? (
              <>
                <div className="text-2xl font-bold text-sa-blue">
                  {discountPrice}
                  <span className="text-sm font-normal text-sa-gray">{period}</span>
                </div>
                <div className="text-sm line-through text-sa-gray">
                  {price}{period}
                </div>
              </>
            ) : (
              <div className="text-2xl font-bold text-sa-blue">
                {price}
                <span className="text-sm font-normal text-sa-gray">{period}</span>
              </div>
            )}
          </div>
        </div>
        <CardDescription>
          {id === "premium" 
            ? "Unlimited access to all ATSBoost features" 
            : "Pay only for what you need"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
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
        
        {recommended && remainingDiscounts && (
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
            id={`consent-${id}`} 
            checked={consentGiven}
            onCheckedChange={(checked) => onConsentChange(checked as boolean)}
          />
          <label 
            htmlFor={`consent-${id}`} 
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            I agree to payment processing by Yoco in accordance with POPIA
          </label>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSubscribe(id)}
          disabled={isLoading}
          className={`w-full ${
            recommended 
              ? "bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue" 
              : "bg-sa-blue hover:bg-sa-blue/90 text-white"
          }`}
        >
          {isLoading && selectedOption === id ? "Processing..." : id === "premium" ? "Subscribe Now" : "Buy Credits"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionOption;
