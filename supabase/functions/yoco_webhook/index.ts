
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import * as base64 from "https://deno.land/std@0.190.0/encoding/base64.ts";

// CORS headers for the function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, yoco-signature, yoco-timestamp",
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

// Verify Yoco webhook signature
async function verifySignature(
  signature: string,
  timestamp: string,
  rawBody: string,
  webhookSecret: string
): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const signedPayload = `${timestamp}.${rawBody}`;
    const key = encoder.encode(webhookSecret);
    const message = encoder.encode(signedPayload);
    
    // Create HMAC using SHA-256
    const cryptoKey = await crypto.subtle.importKey(
      "raw", 
      key,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    
    const signature_bytes = await crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      message
    );
    
    // Convert to base64
    const signature_b64 = base64.encode(new Uint8Array(signature_bytes));
    
    // Compare signatures (timing-safe comparison)
    return signature === signature_b64;
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Get Yoco signature headers
    const signature = req.headers.get("yoco-signature");
    const timestamp = req.headers.get("yoco-timestamp");
    
    if (!signature || !timestamp) {
      return new Response(JSON.stringify({ error: "Missing signature headers" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Get the webhook payload
    const rawBody = await req.text();
    const data = JSON.parse(rawBody);
    
    // Get the webhook secret from environment variables
    const webhookSecret = Deno.env.get("YOCO_WEBHOOK_SECRET") || "";
    
    // Verify signature
    const isSignatureValid = await verifySignature(signature, timestamp, rawBody, webhookSecret);
    if (!isSignatureValid) {
      console.error("Invalid signature");
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });

    // Extract data from the webhook payload
    const eventType = data.event;
    const paymentData = data.data || {};
    const checkoutId = paymentData.id;
    const amount = paymentData.amount;
    const status = paymentData.status;
    
    // Get user_id from subscription record using checkout_id
    const { data: subscriptionData, error: fetchError } = await supabase
      .from("subscriptions")
      .select("user_id, type")
      .eq("checkout_id", checkoutId)
      .single();
    
    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching subscription:", fetchError);
    }
    
    const userId = subscriptionData?.user_id;
    
    // Log the payment event in payment_history table for auditing
    const { error: logError } = await supabase
      .from("payment_history")
      .insert({
        user_id: userId,
        checkout_id: checkoutId,
        amount: amount / 100, // Convert from cents to Rand
        status: status,
        payment_method: "yoco",
        payment_type: amount >= 10000 ? "subscription" : "one_time",
        currency: "ZAR"
      });
    
    if (logError) {
      console.error("Error logging payment:", logError);
    }

    // Process based on event type
    if (eventType === "payment.succeeded" && status === "succeeded") {
      // Determine subscription type based on payment amount
      const subscriptionType = amount >= 10000 ? "premium" : "deep_analysis";
      
      // Update the subscription status in Supabase
      if (userId) {
        const { error: updateError } = await supabase
          .from("subscriptions")
          .update({
            type: subscriptionType,
            // For premium subscriptions, set next payment due date to 30 days from now
            ...(subscriptionType === "premium" && {
              next_payment_due: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            })
          })
          .eq("user_id", userId);
        
        if (updateError) {
          console.error("Error updating subscription:", updateError);
        }
      }
    } else if (["payment.failed", "payment.cancelled"].includes(eventType)) {
      // Handle failed or cancelled payments
      if (userId) {
        const { error: updateError } = await supabase
          .from("subscriptions")
          .update({
            // Don't revert to free if it was just a deep_analysis attempt
            ...(subscriptionData?.type === "premium" && { type: "free" }),
            checkout_id: null
          })
          .eq("user_id", userId);
        
        if (updateError) {
          console.error("Error updating subscription after failure:", updateError);
        }
      }
    }

    // Return success response
    return new Response(JSON.stringify({ status: "success" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
