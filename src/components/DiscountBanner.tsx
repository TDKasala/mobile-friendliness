
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DiscountBannerProps {
  className?: string;
}

const DiscountBanner = ({ className = "" }: DiscountBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Check if banner was dismissed before
  useEffect(() => {
    const bannerDismissed = localStorage.getItem("discountBannerDismissed");
    if (!bannerDismissed) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("discountBannerDismissed", "true");
  };

  const handleSubscribe = () => {
    navigate("/subscription");
    handleDismiss();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`fixed bottom-4 left-4 right-4 md:bottom-8 md:left-auto md:right-8 md:max-w-md bg-sa-yellow text-sa-blue p-4 rounded-lg shadow-lg z-50 animate-fade-up ${className}`}
    >
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="font-bold text-base mb-1">Launch Discount: 50% OFF!</h3>
          <p className="text-sm">
            Get premium for only R100/month - limited to the first 500 subscribers!
          </p>
          <Button 
            className="mt-3 bg-sa-blue hover:bg-sa-blue/90 text-white"
            size="sm"
            onClick={handleSubscribe}
          >
            Claim Discount
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 rounded-full" 
          onClick={handleDismiss}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  );
};

export default DiscountBanner;
