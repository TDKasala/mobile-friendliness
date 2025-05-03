
import React from 'react';

interface StatisticsAnimationProps {
  value: number;
  label: string;
}

const StatisticsAnimation: React.FC<StatisticsAnimationProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center sm:items-start">
      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-sa-blue dark:text-sa-yellow animate-number-count">
        {value}%
      </span>
      <span className="text-xs sm:text-sm text-sa-gray dark:text-gray-300 text-center sm:text-left">
        {label}
      </span>
    </div>
  );
};

export default StatisticsAnimation;
