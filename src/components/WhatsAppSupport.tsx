
import React from "react";
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
  phoneNumber = "+19409783063", // Updated to use the Twilio number
  message = "Hi, I need help with ATSBoost",
  position = "fixed",
  className = ""
}: WhatsAppSupportProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const handleSupportClick = async () => {
    try {
      // Format phone number if needed
      const formattedNumber = formatPhoneNumber(phoneNumber);
      
      // Send message using Twilio API
      const result = await sendWhatsAppMessage(formattedNumber, message);
      
      if (result.success) {
        toast({
          title: "WhatsApp Support",
          description: "Message sent successfully. Our support team will respond shortly.",
        });
      } else {
        toast({
          title: "WhatsApp Error",
          description: result.message || "Failed to send message. Please try again later.",
          variant: "destructive"
        });
        
        // Fallback to WhatsApp link if Twilio API fails
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${formattedNumber.replace('+', '')}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
      }
    } catch (error) {
      console.error("WhatsApp support error:", error);
      
      // Fallback to WhatsApp direct link
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
      
      toast({
        title: "WhatsApp Support",
        description: "Opening WhatsApp directly due to an error with our messaging service.",
      });
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
    >
      <MessageSquare className="w-6 h-6" />
      {!isMobile && position !== "fixed" && (
        <span className="ml-2 font-medium">Chat with Support</span>
      )}
    </button>
  );
};

export default WhatsAppSupport;
