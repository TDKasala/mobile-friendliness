
import React from "react";
import { MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

interface WhatsAppSupportProps {
  phoneNumber?: string;
  message?: string;
  position?: "fixed" | "static"; 
  className?: string;
}

const WhatsAppSupport = ({ 
  phoneNumber = "+27123456789", 
  message = "Hi, I need help with ATSBoost",
  position = "fixed",
  className = ""
}: WhatsAppSupportProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  const handleSupportClick = () => {
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "WhatsApp Support",
      description: "Connecting you with our support team via WhatsApp",
    });
  };

  return (
    <button
      onClick={handleSupportClick}
      className={`${position === "fixed" ? "fixed bottom-4 right-4 z-50" : ""} 
                 bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue p-3 
                 rounded-full shadow-lg flex items-center justify-center
                 transition-all duration-300 hover:scale-105
                 ${className}`}
      aria-label="Chat with Support on WhatsApp"
    >
      <MessageSquare className="w-6 h-6" />
      {!isMobile && position !== "fixed" && (
        <span className="ml-2 font-medium">Chat with Support</span>
      )}
    </button>
  );
};

export default WhatsAppSupport;
