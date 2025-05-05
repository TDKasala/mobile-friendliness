
import { supabase } from "@/lib/supabase";

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
export async function createCheckoutSession(userId: string, amount: number, type: "subscription" | "deep_analysis") {
  try {
    const response = await fetch("/api/create_checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        amount,
        type
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creating checkout: ${response.status} ${errorText}`);
    }

    const data = await response.json();
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
