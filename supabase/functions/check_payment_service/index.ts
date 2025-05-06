
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const YOCO_API_KEY = Deno.env.get('YOCO_API_KEY') || ''

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Check if YOCO_API_KEY is available
    if (!YOCO_API_KEY) {
      console.error('YOCO_API_KEY environment variable is not set')
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Payment service is not properly configured' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    // Make a simple ping to Yoco API to verify the key works
    // We're just checking if the API key format is valid, not making an actual transaction
    try {
      const response = await fetch('https://payments.yoco.com/api/health-check', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${YOCO_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      const status = response.status;
      const isValid = status !== 401; // 401 would indicate invalid API key
      
      return new Response(
        JSON.stringify({ 
          success: isValid, 
          message: isValid ? 'Payment service is properly configured' : 'Invalid payment service API key'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (error) {
      console.error('Error checking Yoco API connection:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Unable to connect to payment provider API' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
  } catch (error) {
    console.error('Error in check_payment_service:', error.message)
    
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
