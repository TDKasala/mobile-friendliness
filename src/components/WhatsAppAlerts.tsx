
import React from "react";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface WhatsAppAlertsProps {
  phoneNumber?: string;
  className?: string;
}

const WhatsAppAlerts = ({ 
  phoneNumber = "+27123456789", 
  className = ""
}: WhatsAppAlertsProps) => {
  const { toast } = useToast();
  
  const handleJoinAlerts = () => {
    const message = encodeURIComponent("I want to join ATSBoost alerts for job opportunities and CV tips");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "WhatsApp Alerts",
      description: "You're being redirected to WhatsApp to join our alerts service",
    });
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
