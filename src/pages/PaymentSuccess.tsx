
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define a type for the payment record to avoid type errors
interface Payment {
  id: number;
  user_id: string;
  checkout_id: string;
  status: string;
  // Add other payment fields as needed
}

const PaymentSuccessContent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const checkoutId = searchParams.get("checkoutId");
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    // Redirect if no checkout ID
    if (!checkoutId) {
      toast({
        title: "Invalid checkout",
        description: "No checkout information found. Please try again.",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }

    // Update payment status to 'completed' in database
    const updatePaymentStatus = async () => {
      if (!user || !checkoutId) return;
      
      setIsUpdating(true);
      
      try {
        console.log(`Updating payment status for checkout: ${checkoutId}, user: ${user.id}`);
        
        // Check if the payment record exists first
        const { data: paymentExists, error: checkError } = await supabase
          .from('payments')
          .select('id, status')
          .eq('checkout_id', checkoutId)
          .eq('user_id', user.id)
          .single();
        
        if (checkError) {
          console.error("Error checking payment:", checkError);
          
          // Special handling for not_found errors
          if (checkError.code === 'PGRST116') {
            setError("Payment record not found. Your account will be updated shortly when our system processes the payment.");
            // Try to create a payment record if it doesn't exist
            const { error: insertError } = await supabase
              .from('payments')
              .insert({
                user_id: user.id,
                checkout_id: checkoutId,
                status: 'completed',
                amount: 10000 // Default to premium amount
              });
            
            if (!insertError) {
              setUpdateSuccess(true);
              return;
            }
          } else {
            setError("Could not find your payment record. Your account may still be updated shortly.");
          }
          return;
        }
        
        if (paymentExists && paymentExists.status === 'completed') {
          console.log("Payment already marked as completed");
          toast({
            title: "Payment already processed",
            description: "Your payment was already successfully processed.",
          });
          setUpdateSuccess(true);
          return;
        }
        
        // Update the payment status in the 'payments' table
        const { error } = await supabase
          .from('payments')
          .update({ status: 'completed' })
          .eq('checkout_id', checkoutId)
          .eq('user_id', user.id);
        
        if (error) {
          console.error("Error updating payment:", error);
          setError("Your payment was successful, but we couldn't update your account. Please contact support.");
          toast({
            title: "Error updating payment",
            description: "Your payment was successful, but we couldn't update your account. Please contact support.",
            variant: "destructive",
          });
        } else {
          console.log("Payment status updated successfully");
          setUpdateSuccess(true);
          toast({
            title: "Payment successful",
            description: "Thank you for your payment. Your premium features have been unlocked.",
          });
        }
      } catch (error) {
        console.error("Exception updating payment:", error);
        setError("An unexpected error occurred. Please contact support.");
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
  }, [user, checkoutId, toast, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Payment Successful | ATSBoost</title>
        <meta name="description" content="Your payment was successfully processed. Thank you for supporting ATSBoost." />
      </Helmet>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-sa-blue/20 rounded-lg shadow-md p-6 text-center">
          {isUpdating && (
            <div className="mb-4 flex flex-col items-center">
              <Loader2 className="h-8 w-8 text-sa-blue animate-spin mb-2" />
              <p className="text-sa-gray dark:text-gray-300">Processing your payment...</p>
            </div>
          )}
          
          {error ? (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
          
          {(updateSuccess || !isUpdating) && (
            <>
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                <CheckCircle className="h-10 w-10 text-sa-green" />
              </div>
              
              <h1 className="text-2xl font-bold text-sa-blue dark:text-white mb-2">
                Payment Successful!
              </h1>
              
              <p className="text-sa-gray dark:text-gray-300 mb-6">
                Thank you for your payment. Your ATSBoost features have been unlocked.
              </p>
            </>
          )}
          
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
    </div>
  );
};

// Wrap the payment success page with authentication protection
const PaymentSuccess = () => {
  return (
    <ProtectedRoute>
      <PaymentSuccessContent />
    </ProtectedRoute>
  );
};

export default PaymentSuccess;
