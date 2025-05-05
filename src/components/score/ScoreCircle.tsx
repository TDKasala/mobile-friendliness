
import React from "react";

interface ScoreCircleProps {
  score: number;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ score }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 rounded-full bg-white dark:bg-sa-blue/50 border-4 border-sa-green dark:border-sa-yellow flex items-center justify-center mb-4">
        <span className="text-4xl font-bold text-sa-blue dark:text-white">
          {score}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-sa-blue dark:text-white">
        Your ATS Score
      </h3>
      <p className="text-sa-gray dark:text-gray-300 mt-1">
        {score >= 80
          ? "Excellent! Your CV is ATS-friendly."
          : score >= 60
          ? "Good start. Follow our tips to improve further."
          : "Needs improvement. See our recommendations below."}
      </p>
    </div>
  );
};

export default ScoreCircle;
