
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
    // Get the request body
    const { amount, user_id, type } = await req.json();

    // Validate the input
    if (!amount || !user_id || !type) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Create a Yoco API client (ideally this would be a separate module)
    const YOCO_SECRET_KEY = Deno.env.get("YOCO_SECRET_KEY");
    if (!YOCO_SECRET_KEY) {
      return new Response(JSON.stringify({ error: "Missing Yoco API key" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });

    // Prepare the Yoco checkout data with user_id in metadata
    const checkoutData = {
      amount: amount * 100, // Convert to cents (R30 = 3000, R100 = 10000)
      currency: "ZAR",
      cancelUrl: "https://atsboost.vercel.app/payment/cancel", // Update with your domain
      successUrl: "https://atsboost.vercel.app/payment/success",
      failureUrl: "https://atsboost.vercel.app/payment/failure",
      metadata: {
        user_id: user_id
      }
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
      throw new Error(`Yoco API error: ${response.status} ${errorText}`);
    }

    const checkout = await response.json();

    // Store checkout info in Supabase
    const { data, error } = await supabase
      .from("subscriptions")
      .upsert({
        user_id,
        checkout_id: checkout.id,
        type,
        start_date: new Date().toISOString(),
        // For subscriptions, set end date 1 month from now
        ...(type === "subscription" && { 
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
        })
      });

    if (error) throw error;

    // Return the checkout URL to redirect the user
    return new Response(JSON.stringify({
      redirectUrl: checkout.redirectUrl,
      checkoutId: checkout.id
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
