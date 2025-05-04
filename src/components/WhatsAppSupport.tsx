
import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { sendWhatsAppMessage, formatPhoneNumber } from "@/services/twilio-service";

interface WhatsAppSupportProps {
  phoneNumber?: string;
  message?: string;
  position?: "fixed" | "static"; 
  className?: string;
}

const WhatsAppSupport = ({ 
  phoneNumber = "+27000000000", // Use a South African placeholder number
  message = "Hi, I need help with ATSBoost",
  position = "fixed",
  className = ""
}: WhatsAppSupportProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSupportClick = async () => {
    try {
      setIsLoading(true);
      // Format phone number if needed
      const formattedNumber = formatPhoneNumber(phoneNumber);
      
      // Send message using secure service
      const result = await sendWhatsAppMessage(formattedNumber, message);
      
      if (result.success) {
        toast({
          title: "WhatsApp Support",
          description: "Message sent successfully. Our support team will respond shortly.",
        });
      } else {
        toast({
          title: "WhatsApp Connection",
          description: "Opening WhatsApp directly to connect with support.",
        });
      }
    } catch (error) {
      console.error("WhatsApp support error:", error);
      
      toast({
        title: "WhatsApp Support",
        description: "Error connecting to WhatsApp service. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
      disabled={isLoading}
    >
      <MessageSquare className="w-6 h-6" />
      {!isMobile && position !== "fixed" && (
        <span className="ml-2 font-medium">{isLoading ? "Connecting..." : "Chat with Support"}</span>
      )}
    </button>
  );
};

export default WhatsAppSupport;
