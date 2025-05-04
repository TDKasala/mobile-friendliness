
import React from "react";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { sendWhatsAppMessage, formatPhoneNumber } from "@/services/twilio-service";

interface WhatsAppAlertsProps {
  phoneNumber?: string;
  className?: string;
}

const WhatsAppAlerts = ({ 
  phoneNumber = "+19409783063", // Updated to use Twilio number
  className = ""
}: WhatsAppAlertsProps) => {
  const { toast } = useToast();
  
  const handleJoinAlerts = async () => {
    try {
      const message = "I want to join ATSBoost alerts for job opportunities and CV tips";
      
      // Format user's phone number if needed
      const formattedNumber = formatPhoneNumber(phoneNumber);
      
      // Send message using Twilio API
      const result = await sendWhatsAppMessage(formattedNumber, message);
      
      if (result.success) {
        toast({
          title: "WhatsApp Alerts",
          description: "You've been successfully registered for WhatsApp alerts!",
        });
      } else {
        toast({
          title: "WhatsApp Error",
          description: result.message || "Failed to register for alerts. Please try again later.",
          variant: "destructive"
        });
        
        // Fallback to WhatsApp link
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${formattedNumber.replace('+', '')}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
      }
    } catch (error) {
      console.error("WhatsApp alerts error:", error);
      
      // Fallback to standard WhatsApp link
      const message = encodeURIComponent("I want to join ATSBoost alerts for job opportunities and CV tips");
      const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;
      window.open(whatsappUrl, "_blank");
      
      toast({
        title: "WhatsApp Alerts",
        description: "Opening WhatsApp directly due to an error with our messaging service.",
      });
    }
  };

  return (
    <Button
      onClick={handleJoinAlerts}
      className={`bg-sa-green hover:bg-sa-green/90 text-white 
                 transition-all duration-300 ${className}`}
      aria-label="Join WhatsApp Alerts"
    >
      <MessageSquare className="w-4 h-4 mr-2" />
      <span>Join WhatsApp Alerts</span>
    </Button>
  );
};

export default WhatsAppAlerts;
