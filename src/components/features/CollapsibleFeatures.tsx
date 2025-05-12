
import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import FeatureCard from "./FeatureCard";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  isPremium?: boolean;
}

interface CollapsibleFeaturesProps {
  features: FeatureItem[];
}

const CollapsibleFeatures = ({ features }: CollapsibleFeaturesProps) => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {features.map((feature, index) => (
        <Collapsible
          key={index}
          open={openItem === index}
          onOpenChange={() => toggleItem(index)}
          className="border border-gray-200 dark:border-sa-blue/20 rounded-lg overflow-hidden bg-white dark:bg-sa-blue/30 shadow-sm"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                feature.isPremium ? 'bg-sa-yellow/20 text-sa-yellow' : 'bg-sa-green/20 text-sa-green'
              }`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="font-medium text-sa-blue dark:text-white flex items-center">
                  {feature.title}
                  {feature.isPremium && (
                    <span className="ml-2 text-xs bg-sa-yellow text-white px-2 py-0.5 rounded-full">
                      Premium
                    </span>
                  )}
                </h3>
              </div>
            </div>
            {openItem === index ? 
              <ChevronUp className="h-5 w-5 text-sa-gray" /> : 
              <ChevronDown className="h-5 w-5 text-sa-gray" />
            }
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4 pt-1">
            <p className="text-sa-gray dark:text-gray-300">{feature.description}</p>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default CollapsibleFeatures;
