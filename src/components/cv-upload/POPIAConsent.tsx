
import React from "react";

const POPIAConsent: React.FC = () => {
  return (
    <div className="mt-4 flex items-center justify-center">
      <label className="flex items-center text-xs text-sa-gray dark:text-gray-400">
        <input 
          type="checkbox" 
          className="mr-2 rounded border-gray-300" 
          required
        />
        <span>I consent to ATSBoost processing my CV data for analysis in accordance with <a href="/legal/privacy" className="underline hover:text-sa-blue dark:hover:text-white transition-colors">POPIA guidelines</a></span>
      </label>
    </div>
  );
};

export default POPIAConsent;
