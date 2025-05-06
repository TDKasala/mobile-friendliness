
import { supabase } from "@/integrations/supabase/client";

// Get payment history
export async function getPaymentHistory(userId: string) {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
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
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) {
      throw new Error("No active session. User must be logged in.");
    }
    
    const { data, error } = await supabase.functions.invoke("create_checkout", {
      body: {
        amount,
        type
      }
    });
    
    if (error) {
      console.error("Error creating checkout:", error);
      throw error;
    }
    
    if (!data) {
      throw new Error("No data returned from checkout function");
    }
    
    return data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}

// Check if a subscription is active
export async function isSubscriptionActive(userId: string): Promise<boolean> {
  try {
    // For now, since we don't have the 'subscriptions' table in our types,
    // let's implement a basic check against the payments table
    const { data, error } = await supabase
      .from('payments')
      .select("*")
      .eq("user_id", userId)
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(1);
      
    if (error) throw error;
    
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
