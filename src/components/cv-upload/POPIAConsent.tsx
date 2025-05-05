
import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const POPIAConsent: React.FC = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="mt-4 flex items-center justify-center">
      <label className="flex items-center text-xs text-sa-gray dark:text-gray-400">
        <input 
          type="checkbox" 
          className="mr-2 rounded border-gray-300" 
          required
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span>
          I consent to ATSBoost processing my CV data for analysis in accordance with 
          <a href="/legal/privacy" className="underline hover:text-sa-blue dark:hover:text-white transition-colors mx-1">POPIA guidelines</a>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex items-center cursor-help">
                  <Info className="h-3 w-3 ml-1" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">
                  Your CV data is processed securely and only used for the purpose of providing ATS optimization feedback. 
                  We don't sell your personal data to third parties.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      </label>
    </div>
  );
};

export default POPIAConsent;
