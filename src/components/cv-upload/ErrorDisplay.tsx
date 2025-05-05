
import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorDisplayProps {
  error: string | null;
  onDismiss?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onDismiss }) => {
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className="mt-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-md">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
        <AlertDescription>{error}</AlertDescription>
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="ml-auto text-red-800 dark:text-red-300 hover:text-red-900 dark:hover:text-red-200"
            aria-label="Dismiss error"
          >
            <span className="sr-only">Dismiss</span>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path>
            </svg>
          </button>
        )}
      </div>
    </Alert>
  );
};

export default ErrorDisplay;
