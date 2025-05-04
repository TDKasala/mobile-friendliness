
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// CORS headers for the function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Handle CORS preflight requests
function handleCors(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        ...corsHeaders,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }
}

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Get the webhook payload
    const data = await req.json();

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });

    // Process the webhook event
    if (data.event === "payment.succeeded") {
      const checkoutId = data.data.id;
      
      // Get the subscription record
      const { data: subscriptionData, error: fetchError } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("checkout_id", checkoutId)
        .single();

      if (fetchError) throw fetchError;

      // Update the subscription status
      const { error: updateError } = await supabase
        .from("subscriptions")
        .update({ 
          type: subscriptionData.type === "subscription" ? "premium" : "deep_analysis",
          // For subscriptions, set the next payment due date
          ...(subscriptionData.type === "subscription" && {
            next_payment_due: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          })
        })
        .eq("checkout_id", checkoutId);

      if (updateError) throw updateError;
      
      // For subscriptions, send a WhatsApp notification
      if (subscriptionData.type === "subscription") {
        // This would integrate with Twilio WhatsApp API
        // We'll just log it for now
        console.log(`Subscription payment succeeded for user ${subscriptionData.user_id}`);
        // TODO: Integrate with Twilio WhatsApp API for notifications
      }
    }

    // Return success
    return new Response(JSON.stringify({ status: "success" }), {
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
