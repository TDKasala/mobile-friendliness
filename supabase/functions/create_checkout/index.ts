
import 'https://deno.land/x/xhr@0.1.0/mod.ts'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SUPABASE_URL = 'https://gwuexaxuvcmtdcyrjzzz.supabase.co'
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const YOCO_API_KEY = Deno.env.get('YOCO_API_KEY') || ''
const SITE_URL = 'https://atsboost.co.za'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Create a Supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  try {
    // Get the JWT from the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.error('No authorization header provided')
      return new Response(
        JSON.stringify({ error: 'No authorization header provided' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the JWT
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)

    if (userError || !user) {
      console.error('JWT verification error:', userError)
      return new Response(
        JSON.stringify({ error: 'Invalid JWT token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Log authenticated user for debugging
    console.log(`Authenticated user: ${user.id}, email: ${user.email}`)

    // Parse request body
    const requestBody = await req.json()
    const { amount, type } = requestBody
    
    if (!amount) {
      console.error('Missing required field: amount')
      return new Response(
        JSON.stringify({ error: 'Missing required field: amount' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Validate YOCO_API_KEY is available
    if (!YOCO_API_KEY) {
      console.error('YOCO_API_KEY environment variable is not set')
      return new Response(
        JSON.stringify({ error: 'Payment configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Default to deep analysis if no type is provided
    const checkoutType = type || 'deep_analysis'
    // Default to 3000 cents (R30) if no amount is provided or if amount is invalid
    const checkoutAmount = typeof amount === 'number' ? amount : 3000
    
    console.log(`Creating checkout for user ${user.id} with amount ${checkoutAmount} and type ${checkoutType}`)
    
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
        successUrl: `${SITE_URL}/payment-success?checkoutId={{id}}`,
        failureUrl: `${SITE_URL}/payment-failure?checkoutId={{id}}`,
        cancelUrl: `${SITE_URL}/payment-cancel?checkoutId={{id}}`
      })
    })

    // Log response status for debugging
    console.log(`Yoco API response status: ${yocoResponse.status}`)

    if (!yocoResponse.ok) {
      const yocoErrorText = await yocoResponse.text()
      console.error('Yoco error:', yocoErrorText)
      return new Response(
        JSON.stringify({ 
          error: `Yoco API error: ${yocoResponse.status}`,
          details: yocoErrorText 
        }),
        { 
          status: yocoResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const yocoData = await yocoResponse.json()
    console.log('Yoco checkout created:', JSON.stringify(yocoData))
    
    const { id: checkoutId, redirectUrl } = yocoData

    if (!checkoutId || !redirectUrl) {
      console.error('Invalid Yoco response:', yocoData)
      return new Response(
        JSON.stringify({ error: 'Invalid response from payment provider' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Save payment info to Supabase
    const paymentData = {
      user_id: user.id,
      checkout_id: checkoutId,
      amount: checkoutAmount,
      status: 'pending',
      // Only include fields that exist in the table schema
    }

    const { error: dbError } = await supabase
      .from('payments')
      .insert(paymentData)

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
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
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
