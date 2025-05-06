
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Get payment history
export async function getPaymentHistory(userId: string) {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching payment history:", error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return [];
  }
}

// Create a checkout session
export async function createCheckoutSession(amount: number, type: "subscription" | "deep_analysis") {
  try {
    // Get the current session to include the JWT token
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error("Session error:", sessionError);
      throw new Error("Failed to get user session. Please try logging in again.");
    }
    
    if (!sessionData.session) {
      throw new Error("No active session. User must be logged in.");
    }
    
    console.log(`Creating checkout session: amount=${amount}, type=${type}`);
    
    // First check if payment service is properly configured
    const serviceCheck = await verifyPaymentServiceConnection();
    if (!serviceCheck) {
      throw new Error("Payment service is not properly configured. Please try again later.");
    }
    
    const { data, error } = await supabase.functions.invoke("create_checkout", {
      body: {
        amount,
        type
      }
    });
    
    if (error) {
      console.error("Error creating checkout:", error);
      // Send more detailed error info for debugging
      if (error.message.includes("500")) {
        console.error("Server error. The Yoco API key may be missing or invalid.");
        throw new Error("Payment service unavailable. Our team has been notified.");
      }
      throw error;
    }
    
    if (!data) {
      throw new Error("No data returned from checkout function");
    }
    
    console.log("Checkout session created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    // Provide more user-friendly error messages
    if (error instanceof Error) {
      if (error.message.includes("Yoco API error")) {
        toast({
          title: "Payment Service Error",
          description: "There was an issue connecting to our payment provider. Please try again later.",
          variant: "destructive"
        });
      }
      throw error;
    }
    throw new Error("Failed to process payment. Please try again later.");
  }
}

// Check if a subscription is active with improved error handling
export async function isSubscriptionActive(userId: string): Promise<boolean> {
  try {
    if (!userId) {
      console.error("No user ID provided to isSubscriptionActive");
      return false;
    }
    
    const { data, error } = await supabase
      .from('payments')
      .select("*")
      .eq("user_id", userId)
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(1);
      
    if (error) {
      console.error("Error checking subscription status:", error);
      throw error;
    }
    
    // If there's a recent completed payment with sufficient amount, consider subscription active
    if (data && data.length > 0) {
      const lastPayment = data[0];
      // Check if it's a premium payment (R100 or more, which is 10000 cents)
      return lastPayment.amount >= 10000;
    }
    
    return false;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }
}

// New function to verify Yoco API connection
export async function verifyPaymentServiceConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke("check_payment_service", {
      body: {}
    });
    
    if (error) {
      console.error("Payment service verification failed:", error);
      return false;
    }
    
    return data?.success === true;
  } catch (error) {
    console.error("Error verifying payment service:", error);
    return false;
  }
}
