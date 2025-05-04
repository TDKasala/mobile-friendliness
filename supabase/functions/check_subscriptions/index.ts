
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// CORS headers for the function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });

    // Get users with subscriptions due soon (within 3 days)
    const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    const { data: dueSubscriptions, error } = await supabase
      .from("subscriptions")
      .select("user_id, type, next_payment_due")
      .eq("type", "premium")
      .lte("next_payment_due", threeDaysFromNow)
      .gte("next_payment_due", new Date().toISOString());

    if (error) throw error;
    
    // Process each subscription
    for (const subscription of dueSubscriptions) {
      // Get user contact details
      const { data: userData, error: userError } = await supabase
        .from("users_profile")
        .select("phone")
        .eq("id", subscription.user_id)
        .single();
        
      if (userError) {
        console.error(`Error getting user data for ${subscription.user_id}: ${userError.message}`);
        continue;
      }
      
      if (!userData.phone) {
        console.error(`No phone number for user ${subscription.user_id}`);
        continue;
      }
      
      // Create a Yoco checkout for renewal
      const YOCO_SECRET_KEY = Deno.env.get("YOCO_SECRET_KEY");
      
      if (!YOCO_SECRET_KEY) {
        throw new Error("Missing Yoco API key");
      }
      
      // Prepare the Yoco checkout data for renewal
      const checkoutData = {
        amount: 10000, // R100 in cents
        currency: "ZAR",
        cancelUrl: "https://atsboost.vercel.app/payment/cancel", // Update with your domain
        successUrl: "https://atsboost.vercel.app/payment/success",
        failureUrl: "https://atsboost.vercel.app/payment/failure"
      };
      
      // Create the Yoco checkout session
      const response = await fetch("https://payments.yoco.com/api/checkouts", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${YOCO_SECRET_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(checkoutData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Yoco API error for user ${subscription.user_id}: ${response.status} ${errorText}`);
        continue;
      }
      
      const checkout = await response.json();
      
      // Update checkout ID in the subscription
      await supabase
        .from("subscriptions")
        .update({ checkout_id: checkout.id })
        .eq("user_id", subscription.user_id);
      
      // Send WhatsApp notification - this would use Twilio in production
      // Here we're just logging it
      console.log(`Sending renewal reminder to ${userData.phone} with payment link ${checkout.redirectUrl}`);
      
      // TODO: Integrate with Twilio WhatsApp API
      // Sample code (would require Twilio credentials):
      /*
      const twilio = new Twilio(Deno.env.get("TWILIO_ACCOUNT_SID"), Deno.env.get("TWILIO_AUTH_TOKEN"));
      await twilio.messages.create({
        body: `Your ATSBoost premium subscription is due for renewal soon. Pay R100 to continue enjoying premium features: ${checkout.redirectUrl}`,
        from: 'whatsapp:+14155238886',  // Replace with your Twilio WhatsApp number
        to: `whatsapp:${userData.phone}`
      });
      */
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: `Processed ${dueSubscriptions.length} subscription reminders` 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
