
import React from "react";
import { Button } from "@/components/ui/button";
import { MessagesSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WhatsAppUploadButtonProps {
  isValidating: boolean;
}

/**
 * WhatsApp upload option button component
 */
const WhatsAppUploadButton: React.FC<WhatsAppUploadButtonProps> = ({ isValidating }) => {
  const { toast } = useToast();

  // Open WhatsApp upload option
  const openWhatsAppUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Open WhatsApp with pre-filled message
    window.open("https://wa.me/+27123456789?text=I'd like to upload my CV for analysis", "_blank");
    
    toast({
      title: "WhatsApp Upload",
      description: "Send your CV as a file attachment to this number to analyze it.",
    });
  };

  return (
    <Button
      variant="outline"
      className="border-sa-gray text-sa-gray hover:bg-sa-gray/10 flex items-center justify-center gap-2"
      onClick={openWhatsAppUpload}
      disabled={isValidating}
    >
      <MessagesSquare className="h-4 w-4" /> Upload via WhatsApp
    </Button>
  );
};

export default WhatsAppUploadButton;
