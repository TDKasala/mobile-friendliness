
import React from "react";
import WhatsAppSupport from "@/components/WhatsAppSupport";

const SupportSection: React.FC = () => {
  return (
    <>
      <div className="mt-4 text-center text-xs text-sa-gray dark:text-gray-400">
        <p>Supported formats: PDF, DOCX, TXT, ODT | Maximum file size: 5MB</p>
      </div>
      
      {/* Add WhatsApp support button */}
      <div className="mt-6 flex justify-center border-t border-gray-200 dark:border-gray-700 pt-6">
        <WhatsAppSupport 
          position="static" 
          message="Hi, I need help uploading my CV to ATSBoost"
          className="flex items-center px-4 py-2"
        />
      </div>
    </>
  );
};

export default SupportSection;
