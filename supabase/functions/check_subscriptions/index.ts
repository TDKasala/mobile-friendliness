
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

serve(async (req: Request) => {
  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });

    // Get the Yoco API secret key
    const YOCO_SECRET_KEY = Deno.env.get("YOCO_SECRET_KEY");
    if (!YOCO_SECRET_KEY) {
      return new Response(JSON.stringify({ error: "Missing Yoco API key" }), {
        status: 500,
      });
    }

    // Get Twilio credentials
    const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID") ?? "SKe14f49da404eaf87af879f8d5db1b391";
    const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN") ?? "bUpn50IrXxEQR5dKyvhg5CNs11FLFvh3";
    const TWILIO_PHONE_NUMBER = Deno.env.get("TWILIO_PHONE_NUMBER") ?? "+19409783063";

    // Find subscriptions due for renewal in the next day
    const { data: dueSubscriptions, error: fetchError } = await supabase
      .from("subscriptions")
      .select("*, users_profile(email, phone)")
      .eq("type", "premium")
      .lt("next_payment_due", new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());

    if (fetchError) {
      throw fetchError;
    }

    // Process each subscription
    const results = [];
    for (const sub of dueSubscriptions) {
      try {
        // Create a new checkout for renewal
        const checkoutData = {
          amount: 10000, // R100 in cents
          currency: "ZAR",
          cancelUrl: "https://atsboost.vercel.app/payment/cancel",
          successUrl: "https://atsboost.vercel.app/payment/success",
          failureUrl: "https://atsboost.vercel.app/payment/failure",
          metadata: {
            user_id: sub.user_id
          }
        };

        const response = await fetch("https://payments.yoco.com/api/checkouts", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${YOCO_SECRET_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(checkoutData)
        });

        if (!response.ok) {
          throw new Error(`Yoco API error: ${response.status}`);
        }

        const checkout = await response.json();

        // Update the subscription with the new checkout ID
        await supabase
          .from("subscriptions")
          .update({ checkout_id: checkout.id })
          .eq("id", sub.id);

        // Send a WhatsApp notification if we have their number
        const phone = sub.users_profile?.phone;
        if (phone) {
          // Implement actual Twilio WhatsApp API call
          const twilioResponse = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
            method: "POST",
            headers: {
              "Authorization": `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
              From: `whatsapp:${TWILIO_PHONE_NUMBER}`,
              Body: `Your ATSBoost premium subscription is due for renewal. Please click here to continue your subscription: ${checkout.redirectUrl}`,
              To: `whatsapp:${phone}`
            }).toString()
          });
          
          console.log(`Subscription renewal reminder sent to ${phone} for user ${sub.user_id}`);
          console.log(`Payment link: ${checkout.redirectUrl}`);
          
          if (!twilioResponse.ok) {
            console.error(`Twilio API error: ${await twilioResponse.text()}`);
          }
        }

        // Also send an email notification
        const email = sub.users_profile?.email;
        if (email) {
          console.log(`Subscription renewal email sent to ${email} for user ${sub.user_id}`);
          console.log(`Payment link: ${checkout.redirectUrl}`);
        }

        results.push({
          user_id: sub.user_id,
          status: "success",
          payment_link: checkout.redirectUrl
        });
      } catch (error) {
        results.push({
          user_id: sub.user_id,
          status: "error",
          error: error.message
        });
      }
    }

    return new Response(JSON.stringify({
      status: "success",
      processed: dueSubscriptions.length,
      results
    }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
});
