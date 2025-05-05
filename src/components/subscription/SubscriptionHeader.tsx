
import React from "react";

interface SubscriptionHeaderProps {
  remainingDiscounts: number;
}

const SubscriptionHeader: React.FC<SubscriptionHeaderProps> = ({ remainingDiscounts }) => {
  return (
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
  );
};

export default SubscriptionHeader;
