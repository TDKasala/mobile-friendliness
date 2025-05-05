
import 'https://deno.land/x/xhr@0.1.0/mod.ts'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SUPABASE_URL = 'https://gwuexaxuvcmtdcyrjzzz.supabase.co'
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_KEY') || ''
const YOCO_API_KEY = Deno.env.get('YOCO_API_KEY') || 'sk_live_c2e036cdL1oP2O6f789409c84555'
const SITE_URL = 'https://atsboost.co.za'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Create a Supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  try {
    // Get the JWT from the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header provided' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the JWT
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid JWT token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request body
    const { amount, type } = await req.json()
    
    // Default to deep analysis if no type is provided
    const checkoutType = type || 'deep_analysis'
    // Default to 900 cents (R30) for deep analysis if no amount is provided
    const checkoutAmount = amount || 900
    
    // Create a Yoco checkout session
    const yocoResponse = await fetch('https://payments.yoco.com/api/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${YOCO_API_KEY}`
      },
      body: JSON.stringify({
        amount: checkoutAmount,
        currency: 'ZAR',
        successUrl: `${SITE_URL}/payment-success`,
        failureUrl: `${SITE_URL}/payment-failure`,
        cancelUrl: `${SITE_URL}/payment-cancel`
      })
    })

    if (!yocoResponse.ok) {
      const yocoError = await yocoResponse.text()
      console.error('Yoco error:', yocoError)
      throw new Error(`Yoco API error: ${yocoResponse.status}`)
    }

    const yocoData = await yocoResponse.json()
    const { id: checkoutId, redirectUrl } = yocoData

    // Save payment info to Supabase
    const { error: dbError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        checkout_id: checkoutId,
        amount: checkoutAmount,
        status: 'pending',
        checkout_url: redirectUrl,
        type: checkoutType
      })

    if (dbError) {
      console.error('Database error:', dbError)
      // Still continue with the checkout even if db save fails
    }

    // Return the redirect URL to the client
    return new Response(
      JSON.stringify({ redirectUrl, checkoutId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error.message)
    
    // Log the error to Supabase
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
      await supabase
        .from('issues')
        .insert({
          feature: 'Yoco Checkout',
          issue: `Checkout failed: ${error.message}`,
          solution: 'Check API key or payload',
          status: 'Pending'
        })
    } catch (logError) {
      console.error('Error logging to database:', logError)
    }
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
