
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2, FileCheck, AlertCircle } from "lucide-react";

interface LoadingAnimationProps {
  status: "validating" | "analyzing" | "complete" | "error";
  message?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  status = "validating",
  message
}) => {
  const [progress, setProgress] = useState(0);
  
  // Simulate progress based on status
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (status === "validating") {
      // Faster progress for validation (up to 40%)
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 3;
          return newProgress > 40 ? 40 : newProgress;
        });
      }, 200);
    } else if (status === "analyzing") {
      // Slower progress for analysis (40% to 95%)
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 2;
          return newProgress > 95 ? 95 : newProgress;
        });
      }, 300);
    } else if (status === "complete") {
      // Jump to 100% on completion
      setProgress(100);
    }
    
    return () => clearInterval(interval);
  }, [status]);

  // Set color based on status
  const getStatusColorClass = () => {
    switch(status) {
      case "validating": return "text-sa-blue";
      case "analyzing": return "text-sa-green";
      case "complete": return "text-sa-green";
      case "error": return "text-red-500";
      default: return "text-sa-blue";
    }
  };

  // Get icon based on status
  const renderIcon = () => {
    switch(status) {
      case "validating":
      case "analyzing":
        return <Loader2 className={`animate-spin ${getStatusColorClass()} mr-2 h-5 w-5`} />;
      case "complete":
        return <FileCheck className="text-sa-green mr-2 h-5 w-5" />;
      case "error":
        return <AlertCircle className="text-red-500 mr-2 h-5 w-5" />;
    }
  };

  // Get status message
  const getStatusMessage = () => {
    if (message) return message;
    
    switch(status) {
      case "validating": return "Validating your CV...";
      case "analyzing": return "Analyzing CV content with AI...";
      case "complete": return "Analysis complete!";
      case "error": return "An error occurred";
      default: return "Processing...";
    }
  };

  return (
    <div className="w-full p-4 bg-gray-50 dark:bg-sa-blue/30 border border-gray-200 dark:border-sa-blue/40 rounded-lg shadow-sm animate-fade-in">
      <div className="flex items-center mb-3">
        {renderIcon()}
        <h3 className={`font-medium ${getStatusColorClass()}`}>
          {getStatusMessage()}
        </h3>
      </div>
      
      {status !== "complete" && status !== "error" && (
        <div className="space-y-2">
          <Progress 
            value={progress} 
            className="h-2 bg-sa-blue/20 dark:bg-white/10" 
          />
          <div className="flex justify-between items-center text-xs text-sa-gray dark:text-gray-300">
            <span>{Math.round(progress)}% complete</span>
            <span className="text-sa-green">{status === "validating" ? "Checking format..." : "Assessing keywords..."}</span>
          </div>
        </div>
      )}
      
      {status === "error" && (
        <p className="text-sm text-red-500 mt-2">
          {message || "Failed to analyze your CV. Please try again."}
        </p>
      )}
    </div>
  );
};

export default LoadingAnimation;
