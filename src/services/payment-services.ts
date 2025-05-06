
import { supabase } from "@/integrations/supabase/client";

// Get payment history
export async function getPaymentHistory(userId: string) {
  try {
    // We need to use 'from' instead of directly accessing tables that aren't in the TypeScript types
    const { data, error } = await supabase
      .from('payments') // Use the 'payments' table which exists in the types
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
    
    if (error) throw error;
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
    // let's always return false. In a real implementation, this would check
    // the user's subscription status.
    
    // This will be updated when the types are properly set up
    console.log(`Checking subscription status for user: ${userId}`);
    return false;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }
}
