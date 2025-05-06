
import { supabase } from "@/integrations/supabase/client";

// Get payment history
export async function getPaymentHistory(userId: string) {
  try {
    const { data, error } = await supabase
      .from("payment_history")
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
    const { data, error } = await supabase
      .from("subscriptions")
      .select("type")
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    return data?.type === "premium";
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }
}
