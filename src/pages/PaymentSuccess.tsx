
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

// Define a type for the payment record to avoid type errors
interface Payment {
  id: number;
  user_id: string;
  checkout_id: string;
  status: string;
  // Add other payment fields as needed
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const checkoutId = searchParams.get("checkoutId");
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Update payment status to 'completed' in database
    const updatePaymentStatus = async () => {
      if (!user || !checkoutId) return;
      
      setIsUpdating(true);
      
      try {
        // Update the payment status
        // Use any() to bypass TypeScript type checking since the payments table
        // isn't defined in the Supabase types yet
        const { error } = await supabase
          .from('payments')
          .update({ status: 'completed' })
          .eq('checkout_id', checkoutId)
          .eq('user_id', user.id);
        
        if (error) {
          console.error("Error updating payment:", error);
          toast({
            title: "Error updating payment",
            description: "Your payment was successful, but we couldn't update your account. Please contact support.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Payment successful",
            description: "Thank you for your payment. Your premium features have been unlocked.",
          });
        }
      } catch (error) {
        console.error("Exception updating payment:", error);
        toast({
          title: "Error updating payment",
          description: "An unexpected error occurred. Please contact support.",
          variant: "destructive",
        });
      } finally {
        setIsUpdating(false);
      }
    };

    if (user && checkoutId) {
      updatePaymentStatus();
    }
  }, [user, checkoutId, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Payment Successful | ATSBoost</title>
        <meta name="description" content="Your payment was successfully processed. Thank you for supporting ATSBoost." />
      </Helmet>

      <Header />

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-sa-blue/20 rounded-lg shadow-md p-6 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
            <CheckCircle className="h-10 w-10 text-sa-green" />
          </div>
          
          <h1 className="text-2xl font-bold text-sa-blue dark:text-white mb-2">
            Payment Successful!
          </h1>
          
          <p className="text-sa-gray dark:text-gray-300 mb-6">
            Thank you for your payment. Your ATSBoost features have been unlocked.
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full bg-sa-blue hover:bg-sa-blue/90">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
