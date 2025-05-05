
import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="mt-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-md flex items-start">
      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
      <span>{error}</span>
    </div>
  );
};

export default ErrorDisplay;
