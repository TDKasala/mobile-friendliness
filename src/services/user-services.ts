
import { supabase } from "@/lib/supabase";
import { SubscriptionTier } from "@/lib/types";

// User subscriptions
export async function getUserSubscription(userId: string): Promise<{ tier: SubscriptionTier, expiryDate?: string } | null> {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("type, end_date")
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    
    if (!data) return { tier: "free" };
    
    return {
      tier: data.type as SubscriptionTier,
      expiryDate: data.end_date,
    };
  } catch (error) {
    console.error("Error fetching user subscription:", error);
    return { tier: "free" };
  }
}

// Save Job Fit Quiz response
export async function saveQuizResponse(userId: string, email: string, industry: string, experience: string) {
  try {
    const { data, error } = await supabase
      .from("quiz_responses")
      .insert([
        {
          user_id: userId,
          email,
          industry,
          experience,
        }
      ]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error saving quiz response:", error);
    return false;
  }
}

// Generate and save referral code
export async function generateReferralCode(userId: string) {
  try {
    // Check if user already has a referral code
    const { data: existingCode } = await supabase
      .from("referrals")
      .select("referral_code")
      .eq("user_id", userId)
      .single();

    if (existingCode?.referral_code) {
      return existingCode.referral_code;
    }

    // Generate a new code
    const code = `ATSBOOST${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const { error } = await supabase
      .from("referrals")
      .insert([
        {
          user_id: userId,
          referral_code: code,
          signups: 0,
        }
      ]);

    if (error) throw error;
    return code;
  } catch (error) {
    console.error("Error generating referral code:", error);
    throw error;
  }
}
