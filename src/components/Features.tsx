
import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import FeatureCard from "./features/FeatureCard";
import PremiumFeatures from "./features/PremiumFeatures";
import { featureItems } from "./features/FeatureData";
import CollapsibleFeatures from "./features/CollapsibleFeatures";

const Features = () => {
  const isMobile = useIsMobile();

  return (
    <section id="features" className="py-12 sm:py-16 bg-gray-50 dark:bg-sa-blue/10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-sa-blue dark:text-white">
            Features to Boost Your CV's Success
          </h2>
          <p className="text-sa-gray dark:text-gray-300">
            ATSBoost offers powerful tools to help South African job seekers create CVs that get noticed 
            and shortlisted by employers.
          </p>
        </div>

        {isMobile ? (
          <CollapsibleFeatures features={featureItems} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureItems.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                isPremium={feature.isPremium}
              />
            ))}
          </div>
        )}
        
        <PremiumFeatures />
      </div>
    </section>
  );
};

export default Features;
