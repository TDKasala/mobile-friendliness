
import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isPremium?: boolean;
}

const FeatureCard = ({
  icon,
  title,
  description,
  isPremium = false
}: FeatureCardProps) => {
  return (
    <div className="bg-white dark:bg-sa-blue/30 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-sa-blue/70 flex flex-col">
      <div className="mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          isPremium ? 'bg-sa-yellow/20 text-sa-yellow' : 'bg-sa-green/20 text-sa-green'
        }`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-sa-blue dark:text-white">
        {title}
        {isPremium && (
          <span className="ml-2 text-xs bg-sa-yellow text-white px-2 py-0.5 rounded-full">
            Premium
          </span>
        )}
      </h3>
      <p className="text-sa-gray dark:text-gray-300">{description}</p>
    </div>
  );
};

export default FeatureCard;
