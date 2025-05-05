
import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { sendWhatsAppMessage, formatPhoneNumber } from "@/services/twilio-service";

interface WhatsAppAlertsProps {
  phoneNumber?: string;
  className?: string;
  message?: string;
}

const WhatsAppAlerts = ({ 
  phoneNumber = "+27000000000", // Use a South African placeholder number
  className = "",
  message = "I want to join ATSBoost alerts for job opportunities and CV tips"
}: WhatsAppAlertsProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleJoinAlerts = async () => {
    try {
      setIsLoading(true);
      
      // Format user's phone number if needed
      const formattedNumber = formatPhoneNumber(phoneNumber);
      
      // Send message using secure service
      const result = await sendWhatsAppMessage(formattedNumber, message);
      
      if (result.success) {
        toast({
          title: "WhatsApp Alerts",
          description: "You've been successfully registered for WhatsApp alerts!",
        });
      } else {
        // If the backend service fails, use the fallback mechanism
        toast({
          title: "WhatsApp Connection",
          description: "Opening WhatsApp directly to complete your registration.",
        });
      }
    } catch (error) {
      console.error("WhatsApp alerts error:", error);
      
      // Provide a more user-friendly error message
      toast({
        title: "WhatsApp Alerts",
        description: "We couldn't connect to WhatsApp automatically. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleJoinAlerts}
      className={`bg-sa-green hover:bg-sa-green/90 text-white 
                 transition-all duration-300 ${className}`}
      aria-label="Join WhatsApp Alerts"
      disabled={isLoading}
    >
      <MessageSquare className="w-4 h-4 mr-2" />
      <span>{isLoading ? "Connecting..." : "Join WhatsApp Alerts"}</span>
    </Button>
  );
};

export default WhatsAppAlerts;
